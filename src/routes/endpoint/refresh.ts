import type { RequestHandler } from '@sveltejs/kit';
import * as api from '$lib/utils/api';

export const get: RequestHandler = async ({ locals }) => {
	const res = await locals.fetch.get({ path: locals.USER_API + 'refresh' });
	const { data } = await api.handleRes(res, 'Refresh');

	return {
		status: res.status,
		body: data,
	};

};
