export interface User {
	id: string;
	email: string;
	username: string;
	createdAt: {
		nanos: number;
		seconds: number;
	};
}
