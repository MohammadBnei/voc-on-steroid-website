import type { RequestHandler } from '@sveltejs/kit';
import * as api from '$lib/utils/api';
import {  handleAuthResponse } from '$lib/utils/auth';

export const post: RequestHandler = async ({ request, locals }) => {
	const res = await api.post({ path: locals.USER_API + 'login', data: await request.json() });

	return handleAuthResponse(res);
};
