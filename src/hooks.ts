import * as cookie from 'cookie';
import { Buffer } from 'buffer';
import type { Handle, GetSession } from '@sveltejs/kit/types/hooks';
import * as api from '$lib/utils/api';
import { AuthData, handleAuthResponse } from '$lib/utils/auth';

export const handle: Handle = async ({ request, resolve }) => {
	const { user, jwt, refreshToken } = cookie.parse(request.headers.cookie || '');
	let setCookie = null;
	// code here happends before the endpoint or page is called
	request.locals.user = user && JSON.parse(Buffer.from(user, 'base64').toString('utf-8'));
	request.locals.jwt = jwt;

	if (!jwt && refreshToken) {
		const res = await api.post(api.USER_API + 'accounts/refresh-token', {
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
	}

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
