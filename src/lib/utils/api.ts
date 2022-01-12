import { LoggerUtils } from '$lib/utils';
import { browser, dev } from '$app/env';
import { session } from '$app/stores';
import { toast } from '$lib/shared/ui/components/toast';
import { isFetching } from '$stores';

const base = '/endpoint';

interface Opts {
	method: string;
	data?: unknown;
	path?: string;
	token?: string;
	endpointFetch?(info: RequestInfo, init?: RequestInit): Promise<Response>;
}

async function send({ method, path, data, endpointFetch, token }: Opts): Promise<Response> {
	isFetching.update(() => true);
	const opts: RequestInit = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.headers['Accept'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) opts.headers['Authorization'] = `Bearer ${token}`;

	const url = path.startsWith('http') ? path : `${base}/${path}`;
	const res = endpointFetch ? await endpointFetch(url, opts) : await fetch(url, opts);
	isFetching.update(() => false);
	return res;
}

interface Get {
	path: string;
	fetch?(info: RequestInfo, init?: RequestInit): Promise<Response>;
	token?: string
}

export function get({ path, fetch, token }: Get): Promise<Response> {
	return send({ method: 'GET', path, endpointFetch: fetch, token });
}

export function del({ path, fetch, token }: Get): Promise<Response> {
	return send({ method: 'DELETE', path, endpointFetch: fetch, token });
}

interface Post extends Get {
	data: unknown;
}

export function post({ path, data, fetch, token }: Post): Promise<Response> {
	return send({ method: 'POST', path, data, endpointFetch: fetch, token });
}

export function put({ path, data, fetch, token }: Post): Promise<Response> {
	return send({ method: 'PUT', path, data, endpointFetch: fetch, token });
}

export async function handleRes(res: Response, loggerInstance?: string): Promise<Record<string, string> | null> {
	try {
		const data = await res.json();
		if (browser && res.status === 401) {
			toast.push('Unauthorized. You must log out and back in.');
			session.update((s) => ({ ...s, user: null }));
			return data;
		}

		if (!res.ok) {
			const errMsg = data?.message || 'Something went wrong';
			browser && toast.push(errMsg, { dismissable: true });
		}

		return data;
	} catch (error) {
		dev && loggerInstance && LoggerUtils.getInstance(loggerInstance).error(error);
		return error;
	}
}
