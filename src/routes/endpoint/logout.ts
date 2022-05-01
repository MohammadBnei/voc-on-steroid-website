import type { RequestHandler } from '@sveltejs/kit';
import { deleteCookies } from '$lib/utils/auth';

export const get: RequestHandler = async ({ locals }) => {
	await locals.fetch.get({ path: locals.USER_API + 'logout' });

	return {
		status: 200,
		headers: {
			'set-cookie': deleteCookies,
		},
		maxage: 0,
	};
};
