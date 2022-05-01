import type { RequestHandler } from '@sveltejs/kit';
import * as api from '$lib/utils/api';
import { getAuthCookies } from '$lib/utils/auth';

export const post: RequestHandler = async ({ request, locals }) => {
	const res = await locals.fetch.post({ path: locals.USER_API + 'login', data: await api.getBody(request) });

	const data = await api.handleRes(res, 'Auth');

	if (!res.ok) {
		return {
			status: res.status,
			body: data,
		};
	}

	const { user } = data.data as any;

	const cookies = getAuthCookies({ user });

	return {
		...api.handleResponseCookies(res, ...cookies),
		body: { user },
	};
};
