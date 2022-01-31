import { LoggerUtils } from '$lib/utils';
import { browser, mode } from '$app/env';
import { toast } from '$lib/shared/ui/components/toast';
import { isFetching } from '$stores';

const base = '/endpoint';

interface Opts {
	method: string;
	data?: unknown;
	path?: string;
	token?: string;
	cookies?: string;
	endpointFetch?(info: RequestInfo, init?: RequestInit): Promise<Response>;
}

async function send({ method, path, data, endpointFetch, token, cookies }: Opts): Promise<Response> {
	isFetching.update(() => true);
	const opts: RequestInit = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.headers['Accept'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = 'Bearer ' + token;
	}

	if (cookies) {
		opts.headers['cookie'] = cookies;
	}

	const url = path.startsWith('http') ? path : `${base}/${path}`;
	const res = endpointFetch ? await endpointFetch(url, opts) : await fetch(url, opts);

	isFetching.update(() => false);
	return res;
}

interface Get {
	path: string;
	fetch?(info: RequestInfo, init?: RequestInit): Promise<Response>;
	token?: string
	cookies?: string
}


export function get({ path, fetch, token, cookies }: Get): Promise<Response> {
	return send({ method: 'GET', path, endpointFetch: fetch, token, cookies });
}


interface Post extends Get {
	data: unknown;
}

export function del({ path, data, fetch, token, cookies }: Post): Promise<Response> {
	return send({ method: 'DELETE', path, data, endpointFetch: fetch, token, cookies });
}

export function post({ path, data, fetch, token, cookies }: Post): Promise<Response> {
	return send({ method: 'POST', path, data, endpointFetch: fetch, token, cookies });
}

export function put({ path, data, fetch, token, cookies }: Post): Promise<Response> {
	return send({ method: 'PUT', path, data, endpointFetch: fetch, token, cookies });
}

export async function handleRes(res: Response, loggerInstance?: string): Promise<Record<string, any> | null> {
	try {
		const data = await res.json();

		if (!res.ok) {
			const errMsg = data?.message || 'Something went wrong';
			browser && toast.push(errMsg, { dismissable: true });
		}

		return data;
	} catch (error) {
		mode === 'dev' && loggerInstance && LoggerUtils.getInstance(loggerInstance).error(error);
		return error;
	}
}

export const handleResponseCookies = (res: Response, ...cookies) => {
	const setCookie = res.headers.raw()['set-cookie'] || [];

	setCookie.push(...cookies);

	if (setCookie && !!setCookie.length) {
		return {
			headers: {
				'set-cookie': setCookie
			}
		};
	}

	return {};
};

interface loadedFetchI {
	path: string;
	fetch?(info: RequestInfo, init?: RequestInit): Promise<Response>;
	data?: Record<string, any>;
}

export const loadedFetch = ({ cookies, token }: { cookies?: string, token?: string }) => ({
	get: ({ path, fetch }: loadedFetchI) => get(({ path, fetch, token, cookies })),
	del: ({ path, fetch, data }: loadedFetchI) => del(({ path, fetch, data, token, cookies })),
	post: ({ path, fetch, data }: loadedFetchI) => post(({ path, fetch, data, token, cookies })),
	put: ({ path, fetch, data }: loadedFetchI) => put(({ path, fetch, data, token, cookies }))
});

export const getBody = async (request: Request) => {
	const clRequest = request.clone();
	let body;
	try {
		body = await clRequest.json();
	} catch (error) {
		body = await request.json();
	}

	return body;
};