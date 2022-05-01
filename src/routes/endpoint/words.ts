import * as api from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url, locals }) => {
	const res = await api.get({ path: `${locals.WORD_API}get?${url.searchParams.toString()}` });
	const data = await api.handleRes(res, 'Endpoit:Words');
	return {
		status: res.status,
		body: data,
		headers: {
			'cache-control': 's-maxage=1, stale-while-revalidate=59',
		},
		maxage: 60 * 10,
	};
};
