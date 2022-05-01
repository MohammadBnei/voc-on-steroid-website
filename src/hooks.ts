import { loadedFetch } from '$lib/utils/api';
import { deleteCookies, getAuthCookies } from '$lib/utils/auth';
import type { GetSession, Handle } from '@sveltejs/kit';
import { parse } from 'cookie';

const VITE_API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

const USER_API = VITE_API_URL + 'api/auth/';
const WORD_API = VITE_API_URL + 'api/words/';
const ASSOC_API = VITE_API_URL + 'api/assoc/';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.USER_API = USER_API;
	event.locals.WORD_API = WORD_API;
	event.locals.ASSOC_API = ASSOC_API;

	const cookies = event.request.headers.get('cookie');

	const { user, jwt, refreshToken } = parse(cookies || '');

	event.locals.user = user && JSON.parse(Buffer.from(user, 'base64').toString('utf-8'));
	event.locals.refreshToken = !!refreshToken;

	let setCookies: string[] = [];

	event.locals.fetch = loadedFetch({ cookies, token: jwt });

	let response = await resolve(event);

	if ((response.status === 401 && refreshToken) || ((!user || !jwt) && (jwt || refreshToken))) {
		setCookies = await updateToken(event);
		response = await resolve(event);
	}

	setCookies.map((c) => response.headers.append('set-cookie', c));

	return response;
};

const updateToken = async (event) => {
	let setCookies: string[] = [];

	const cookies = event.request.headers.get('cookie');

	const res = await loadedFetch({ cookies }).get({ path: USER_API + 'refresh' });

	if (res.ok) {
		const { data } = await res.json();
		const { user, jwt } = data;
		setCookies = getAuthCookies({
			user: user,
			jwt,
		});
		event.locals.user = user;
		event.locals.jwt = jwt;
		event.locals.fetch = loadedFetch({ token: jwt });
	} else {
		setCookies = deleteCookies;
		event.locals.user = null;
	}

	return setCookies.flat();
};

export const getSession: GetSession = (request) => {
	if (request.locals.user) {
		return {
			user: request.locals.user,
		};
	}

	return {};
};
