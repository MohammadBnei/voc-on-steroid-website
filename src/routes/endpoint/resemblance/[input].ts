import * as api from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url, locals, params }) => {
	const res = await api.get({ path: `${locals.WORD_API}suggestion/${params.input}${url.search || ''}` });
	const data = await api.handleRes(res, 'Endpoit:resemblance');

	return {
		status: res.status,
		body: data,
	};
};
