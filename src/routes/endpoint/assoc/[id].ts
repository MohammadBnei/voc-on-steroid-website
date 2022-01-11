import type { RequestHandler } from '@sveltejs/kit';
import * as api from '$lib/utils/api';

export const get: RequestHandler = async ({ params, locals }) => {
	const res = await api.get({ path: locals.ASSOC_API + params.id, token: locals.jwt });
	const data = await api.handleRes(res, 'Endpoit:Assoc');

	return {
		status: res.status,
		body: data,
	};
};
