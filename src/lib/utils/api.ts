import { LoggerUtils } from '$lib/utils';
import { browser } from '$app/env';
import { session } from '$app/stores';
import { toast } from '$lib/shared/ui/components/toast';
import { isFetching } from '$stores';

const base = '/endpoint';

interface Opts {
	method: string;
	data?: unknown;
	path?: string;
	token?: string;
}

async function send({ method, path, data, token }: Opts): Promise<Response> {
	isFetching.update(() => true);
	const opts: RequestInit = { method, headers: {} };
	
	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.headers['Accept'] = 'application/json';
		opts.body = JSON.stringify(data);
	}
	
	if (token) opts.headers['Authorization'] = `Bearer ${token}`;
	
	const url = path.startsWith('http') ? path : `${base}/${path}`;
	const res = await fetch(url, opts);
	isFetching.update(() => false);
	return res;
}

export function get(path: string, token?: string): Promise<Response> {
	return send({ method: 'GET', path, token });
}

export function del(path: string, token?: string): Promise<Response> {
	return send({ method: 'DELETE', path, token });
}

export function post(path: string, data: unknown, token?: string): Promise<Response> {
	return send({ method: 'POST', path, data, token });
}

export function put(path: string, data: unknown, token?: string): Promise<Response> {
	return send({ method: 'PUT', path, data, token });
}

export async function handleRes(res: Response, loggerInstance?: string): Promise<Record<string, string> | null> {
	const data = await res.json();
	if (browser && res.status === 401) {
		toast.push('Unauthorized. You must log out and back in.');
		session.update((s) => ({ ...s, user: null }));
		return data;
	}

	if (!res.ok) {
		const errMsg = data?.message || 'Something went wrong';
		loggerInstance && LoggerUtils.getInstance(loggerInstance).error(errMsg);
		browser && toast.push(errMsg, { dismissable: true });
	}

	return data;
}

export const USER_API = 'http://user-api:4000/';
export const WORD_MANAGAER_API = 'http://word-manager:4000/';
export const WORD_API = 'http://word-api:3000/';
