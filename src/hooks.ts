import * as cookie from 'cookie';
import { Buffer } from 'buffer';
import type { Handle, GetSession } from '@sveltejs/kit/types/hooks';
import * as api from '$lib/utils/api';
import { AuthData, deleteCookies, handleAuthResponse } from '$lib/utils/auth';
import { LoggerUtils } from '$lib/utils';

const VITE_API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

const USER_API = VITE_API_URL + 'api/auth/';
const WORD_API = VITE_API_URL + 'api/words/';
const ASSOC_API = VITE_API_URL + 'api/assoc/';

export const handle: Handle = async ({ request, resolve }) => {
	const { user, jwt, refreshToken } = cookie.parse(request.headers.cookie || '');
	let setCookie = null;
	// code here happends before the endpoint or page is called
	request.locals.user = user && JSON.parse(Buffer.from(user, 'base64').toString('utf-8'));
	request.locals.jwt = jwt;

	if (!jwt && refreshToken) {
		try {

			const res = await api.post(USER_API + 'accounts/refresh-token', {
				refreshToken,
			});
			const data = await api.handleRes(res, 'Auth');
			if (res.ok) {
				const { headers, user: freshUser } = handleAuthResponse({
					jwt: data.jwtToken,
					refreshToken: data.refreshToken,
					user: data,
				} as unknown as AuthData);

				setCookie = headers['set-cookie'];
				request.locals.user = freshUser;
				request.locals.jwt = data.jwtToken;
			}
		} catch (error) {
			LoggerUtils.getInstance('Hooks').error(error);
			setCookie = deleteCookies;
			request.locals.user = null;
			request.locals.jwt = null;
		}
	}

	request.locals.USER_API = USER_API;
	request.locals.WORD_API = WORD_API;
	request.locals.ASSOC_API = ASSOC_API;

	const response = await resolve(request);

	if (setCookie) {
		response.headers['set-cookie'] = setCookie;
	}

	return response;
};

export const getSession: GetSession = (request) => {
	return {
		user: request.locals.user,
	};
};
