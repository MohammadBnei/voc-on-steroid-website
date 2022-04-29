import type { RequestHandler } from '@sveltejs/kit';
import * as api from '$lib/utils/api';

export const put: RequestHandler = async ({ request, locals }) => {

	const res = await locals.fetch.put({ path: locals.ASSOC_API, data: await api.getBody(request) });
	const data = await api.handleRes(res, 'Endpoit:Assoc');

	return {
		...api.handleResponseCookies(res),
		status: res.status,
		body: data,
	};
};

export const del: RequestHandler = async ({ request, locals }) => {
	const res = await locals.fetch.del({ path: locals.ASSOC_API, data: await api.getBody(request) });
	const data = await api.handleRes(res, 'Endpoit:Assoc');

	return {
		...api.handleResponseCookies(res),
		status: res.status,
		body: data,
	};
};

export const get: RequestHandler = async ({ locals }) => {
	const res = await locals.fetch.get({ path: locals.ASSOC_API });
	const data = await api.handleRes(res, 'Endpoit:Assoc');

	return {
		...api.handleResponseCookies(res),
		status: res.status,
		body: data,
	};
};

