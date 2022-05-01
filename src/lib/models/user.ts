import type { IDeserializable } from '$models/interfaces/ideserializable.interface';
import type { User } from './interfaces';

export class UserModel implements IDeserializable<User> {
	public id: string;
	public email: string;
	public username: string;
	public createdAt: Date;

	deserialize(input: User): this {
		const d = new Date(0);
		d.setSeconds(input.createdAt.seconds);
		Object.assign(this, { ...input, createdAt: d });
		return this;
	}
}
