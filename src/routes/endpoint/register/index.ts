import type { RequestHandler } from '@sveltejs/kit';
import * as api from '$lib/utils/api';

export const post: RequestHandler = async ({ body, locals }) => {
	const res = await api.post({
		path: locals.USER_API + 'accounts/register', data: body
	});
	const data = await res.json();
	if (!res.ok) {
		return {
			status: res.status,
			body: data,
		};
	}

	return {
		body: data,
	};
};
