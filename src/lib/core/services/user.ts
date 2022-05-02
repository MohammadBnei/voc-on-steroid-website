import { session } from '$app/stores';
import { UserModel } from '$lib/models';
import { post, handleRes } from '$lib/utils/api';

export async function login(identity: string, password: string): Promise<void> {
	const res = await post({ path: 'login', data: { identity, password } });
	const data = await handleRes(res);
	if (res.ok) {
		const user = new UserModel().deserialize(data.user);
		session.update((s) => ({ ...s, user }));
	} else {
		throw new Error(data?.message || "Quelque chose s'est mal passé");
	}
}

export async function register(newUser: { username: string; password: string; email: string }): Promise<void> {
	const res = await post({ path: 'register', data: newUser });
	const data = await handleRes(res);
	if (res.ok) {
		const user = new UserModel().deserialize(data.user);
		session.update((s) => ({ ...s, user }));
	} else {
		throw new Error(data?.message || "Quelque chose s'est mal passé");
	}
}
