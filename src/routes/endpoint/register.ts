import type { RequestHandler } from '@sveltejs/kit';
import * as api from '$lib/utils/api';
import { getAuthCookies } from '$lib/utils/auth';

export const post: RequestHandler = async ({ request, locals }) => {
	const res = await locals.fetch.post({
		path: locals.USER_API + 'register',
		data: await api.getBody(request),
	});

	const data = await res.json();
	if (!res.ok) {
		return {
			status: res.status,
			body: data,
		};
	}
	const cookies = getAuthCookies({ user: data.user });
	return {
		...api.handleResponseCookies(res, ...cookies),
		body: data.data,
	};
};
