import type { RequestHandler } from '@sveltejs/kit';
import * as api from '$lib/utils/api';

const getCatUrl = (locals: App.Locals): string => `${locals.ASSOC_API}/category`;

export const put: RequestHandler = async ({ request, locals }) => {
	const res = await locals.fetch.put({ path: getCatUrl(locals), data: await api.getBody(request) });
	const data = await api.handleRes(res, 'Endpoit:Category');

	return {
		...api.handleResponseCookies(res),
		status: res.status,
		body: data,
	};
};

export const del: RequestHandler = async ({ request, locals }) => {
	const res = await locals.fetch.del({ path: getCatUrl(locals), data: await api.getBody(request) });
	const data = await api.handleRes(res, 'Endpoit:Category');

	return {
		...api.handleResponseCookies(res),
		status: res.status,
		body: data,
	};
};
