import type { RequestHandler } from '@sveltejs/kit';
import * as api from '$lib/utils/api';

export const post: RequestHandler = async ({ body, locals }) => {
	const res = await api.post({ path: locals.ASSOC_API, data: body, token: locals.jwt });
	const data = await api.handleRes(res, 'Endpoit:Assoc');

	return {
		status: res.status,
		body: data,
	};
};

export const del: RequestHandler = async ({ url, locals }) => {
	const res = await api.del({ path: locals.ASSOC_API + url.searchParams.get('word'), token: locals.jwt });
	const data = await api.handleRes(res, 'Endpoit:Assoc');

	return {
		status: res.status,
		body: data,
	};
};
