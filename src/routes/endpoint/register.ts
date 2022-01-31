import type { RequestHandler } from '@sveltejs/kit';
import * as api from '$lib/utils/api';

export const post: RequestHandler = async ({ request, locals }) => {
	const res = await api.post({
		path: locals.USER_API + 'register', data: await request.json()
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
