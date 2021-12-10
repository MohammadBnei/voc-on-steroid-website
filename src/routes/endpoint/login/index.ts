import type { RequestHandler } from '@sveltejs/kit';
import { AuthData, handleAuthResponse } from '$lib/utils/auth';
import * as api from '$lib/utils/api';

export const post: RequestHandler = async ({ body, locals }) => {
	const res = await api.post(locals.USER_API + 'accounts/authenticate', body);

	const data = await api.handleRes(res, 'Auth');
	if (!res.ok) {
		return {
			status: res.status,
			body: data,
		};
	}

	const { headers, user } = handleAuthResponse({
		jwt: data.jwtToken,
		refreshToken: data.refreshToken,
		user: data,
	} as unknown as AuthData);

	return {
		headers,
		body: user as unknown as Record<string, string>,
	};
};
