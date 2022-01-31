import * as cookie from 'cookie';
import { Buffer } from 'buffer';
import { handleRes, handleResponseCookies } from './api';

export interface AuthData {
	user?: User;
	jwt?: string;
	refreshToken?: string;
}

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	created: Date;
	isVerified: boolean;
	jwtToken?: string;
	refreshToken?: string;
}

interface AuthResponse {
	status?: number;
	headers?: {
		'set-cookie': string[];
	};
	body?: Record<string, any>;
}

export const getAuthCookies = (authResponse: AuthData): string[] => {
	const jwt = authResponse.jwt
		? cookie.serialize('jwt', authResponse.jwt, {
			httpOnly: true,
			path: '/',
			expires: new Date(Date.now() + 5 * 60 * 1000),
		})
		: '';

	const refreshToken = authResponse.refreshToken
		? cookie.serialize('refreshToken', authResponse.refreshToken, {
			httpOnly: true,
			path: '/',
			expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		})
		: '';

	const user = authResponse.user
		? cookie.serialize('user', Buffer.from(JSON.stringify(authResponse.user)).toString('base64'), {
			httpOnly: true,
			path: '/',
			expires: new Date(Date.now() + 5 * 60 * 1000),
		})
		: '';

	return [
		jwt,
		refreshToken,
		user,
	].filter(c => c!== '');
};

export const handleAuthResponse = async (res: Response): Promise<AuthResponse> => {
	const { data } = await handleRes(res, 'Auth');

	if (!res.ok) {
		return {
			status: res.status,
			body: await res.json()
		};
	}

	const { jwt, user } = data as any;

	const cookies = getAuthCookies({ jwt, user });

	return {
		...handleResponseCookies(res, ...cookies),
		body: { user },
	};
};

export const deleteCookies = [
	'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
	'user=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
	'refreshToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
];
