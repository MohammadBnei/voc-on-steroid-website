import type { RequestHandler } from '@sveltejs/kit';
import { deleteCookies } from '$lib/utils/auth';

export const get: RequestHandler = async ({ locals }) => {
	locals.fetch.get({ path: locals.USER_API + 'logout', token: locals.jwt });

	const headers = {
		'set-cookie': deleteCookies,
	};

	return {
		headers,
	};
};
