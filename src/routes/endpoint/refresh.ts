import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
	const res = await locals.fetch.get({ path: locals.USER_API + 'refresh' });

	return res;
};
