import { loadedFetch } from '$lib/utils/api';
import { getAuthCookies } from '$lib/utils/auth';
import type { Handle, GetSession } from '@sveltejs/kit/types/hooks';
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
	event.locals.jwt = jwt;

	let setCookies: string[] = [];

	if (!user && (jwt || refreshToken)) {
		setCookies = await updateToken(event);
	}

	event.locals.fetch = loadedFetch({ cookies, token: jwt });

	let response = await resolve(event);

	if (response.status === 401 && refreshToken) {
		setCookies = await updateToken(event);
		response = await resolve(event);
	}

	setCookies.map(c => response.headers.append('set-cookie', c));

	return response;
};

const updateToken = async (event) => {
	let setCookies: string[] = [];
	let res: Response;

	const cookies = event.request.headers.get('cookie');
	const { jwt } = parse(cookies || '');


	if (jwt) {
		res = await loadedFetch({ token: jwt }).get({ path: USER_API + 'user' });
	} else {
		res = await loadedFetch({ cookies }).get({ path: USER_API + 'refresh' });
	}

	if (res.ok) {
		const { data } = await res.json();
		const { user, jwt } = data;
		setCookies = getAuthCookies({
			user: user
		});
		event.locals.user = user;
		event.locals.jwt = jwt;
		event.locals.fetch = loadedFetch({ token: jwt });
		res.headers.raw()['set-cookie'] && setCookies.push(res.headers.raw()['set-cookie']);
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
