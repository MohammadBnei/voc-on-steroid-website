import * as api from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals, params }) => {
	const { id } = params;
	const res = await api.get({ path: `${locals.WORD_API}get?term=${id}` });
	const data = await api.handleRes(res, 'Endpoit:Words');
	return {
		status: res.status,
		body: data,
		maxage: 60 * 10,
	};
};
