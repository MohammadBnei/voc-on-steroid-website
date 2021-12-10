import * as api from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ query, locals }) => {
	const res = await api.get(`${locals.WORD_API}resemblance?${query.toString()}`);
	const data = await api.handleRes(res, 'Endpoit:resemblance');
	return {
		status: res.status,
		body: data,
	};
};
