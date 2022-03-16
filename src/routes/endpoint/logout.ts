import type { RequestHandler } from '@sveltejs/kit';
import { deleteCookies } from '$lib/utils/auth';
import { handleRes } from '$lib/utils/api';

export const get: RequestHandler = async ({ locals }) => {
	const res = await locals.fetch.get({ path: locals.USER_API + 'logout' });

	await handleRes(res, 'Logout');
	
	return {
		headers: {
			'set-cookie': deleteCookies,
		},
	};
};
