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
	headers?: Record<string, string>;
}

async function send({ method, path, data, endpointFetch, token, cookies, headers }: Opts): Promise<Response> {
	isFetching.update(() => true);
	const opts: RequestInit = { method, headers: {} };

	opts.headers['Accept'] = 'application/json';

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = 'Bearer ' + token;
	}

	if (cookies) {
		opts.headers['cookie'] = cookies;
	}

	if (headers) {
		for (const [key, value] of Object.entries(headers)) {
			opts.headers[key] = value;
		}
	}

	const url = path.startsWith('http') ? path : `${base}/${path}`;
	const res = endpointFetch ? await endpointFetch(url, opts) : await fetch(url, opts);

	isFetching.update(() => false);
	return res;
}

interface Get {
	path: string;
	fetch?(info: RequestInfo, init?: RequestInit): Promise<Response>;
	token?: string;
	cookies?: string;
	headers?: Record<string, string>;
}

export function get(opts: Get): Promise<Response> {
	return send({ ...opts, method: 'GET', endpointFetch: fetch });
}

interface Post extends Get {
	data: unknown;
}

export function del(opts: Post): Promise<Response> {
	return send({ method: 'DELETE', ...opts, endpointFetch: fetch });
}

export function post(opts: Post): Promise<Response> {
	return send({ method: 'POST', ...opts, endpointFetch: fetch });
}

export function put(opts: Post): Promise<Response> {
	return send({ method: 'PUT', ...opts, endpointFetch: fetch });
}

export async function handleRes(res: Response, loggerInstance?: string): Promise<Record<string, any> | null> {
	try {
		const data = await res.json();

		if (!res.ok) {
			const errMsg = data?.message || 'Something went wrong';
			browser && toast.push(errMsg, { dismissable: true });
			console.error(errMsg);
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
				'set-cookie': setCookie,
			},
		};
	}

	return {};
};

interface loadedFetchI {
	path: string;
	fetch?(info: RequestInfo, init?: RequestInit): Promise<Response>;
	data?: Record<string, any>;
}

export const loadedFetch = (opts: { cookies?: string; token?: string; headers?: Record<string, string> }) => ({
	get: ({ path, fetch }: loadedFetchI) => get({ path, fetch, ...opts }),
	del: ({ path, fetch, data }: loadedFetchI) => del({ path, fetch, data, ...opts }),
	post: ({ path, fetch, data }: loadedFetchI) => post({ path, fetch, data, ...opts }),
	put: ({ path, fetch, data }: loadedFetchI) => put({ path, fetch, data, ...opts }),
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
