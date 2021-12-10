import * as cookie from 'cookie';
import { Buffer } from 'buffer';
import type { Request } from '@sveltejs/kit';

interface Tokens {
	jwt: string;
	refreshToken: string;
}

export interface AuthData extends Tokens {
	user: User;
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

interface AuthHeader extends Tokens {
	user: string;
}

interface AuthResponse {
	headers: {
		'set-cookie': string[];
	};
	user: User;
}

export const getAuthCookies = (authResponse: AuthData): AuthHeader => {
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

	return {
		jwt,
		refreshToken,
		user,
	};
};

export const handleAuthResponse = ({ jwt, refreshToken, user }: AuthData): AuthResponse => {
	user.jwtToken && delete user.jwtToken;
	user.refreshToken && delete user.refreshToken;
	
	const { ...cookies } = getAuthCookies({ jwt, refreshToken, user });

	return {
		headers: {
			'set-cookie': Object.values(cookies),
		},
		user,
	};
};

export const extractTokenFromCookie = (req: Request): Tokens => {
	const { jwt, refreshToken } = cookie.parse(req.headers.cookie || '');
	return { jwt, refreshToken };
};

export const deleteCookies = [
	'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
	'user=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
	'refreshToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
];
