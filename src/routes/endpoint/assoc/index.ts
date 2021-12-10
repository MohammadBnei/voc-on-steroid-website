import type { RequestHandler } from '@sveltejs/kit';
import * as api from '$lib/utils/api';

export const post: RequestHandler = async ({ body, locals }) => {
	const res = await api.post(api.WORD_MANAGAER_API, body, locals.jwt);
	const data = await api.handleRes(res, 'Endpoit:Assoc');

	return {
		status: res.status,
		body: data,
	};
};

export const del: RequestHandler = async ({ query, locals }) => {
	const res = await api.del(api.WORD_MANAGAER_API + query.get('word'), locals.jwt);
	const data = await api.handleRes(res, 'Endpoit:Assoc');

	return {
		status: res.status,
		body: data,
	};
};
