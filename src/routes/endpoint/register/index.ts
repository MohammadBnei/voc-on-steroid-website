import { USER_API } from '$lib/utils/api';
import type {  RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ body }) => {
	const res = await fetch(USER_API + 'accounts/register', {
		body: JSON.stringify(body),
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
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
