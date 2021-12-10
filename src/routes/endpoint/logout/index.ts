import type { RequestHandler } from '@sveltejs/kit';
import * as api from '$lib/utils/api';
import { deleteCookies, extractTokenFromCookie } from '$lib/utils/auth';

export const get: RequestHandler = async (req) => {
	const { refreshToken } = extractTokenFromCookie(req);
	const res = await api.post(api.USER_API + 'accounts/revoke-token', { token: refreshToken }, req.locals.jwt);

	const data = await api.handleRes(res, 'Auth');
	const headers = {
		'set-cookie': deleteCookies,
	};
	if (!res.ok) {
		return {
			status: res.status,
			body: data,
			headers,
		};
	}

	return {
		headers,
	};
};
