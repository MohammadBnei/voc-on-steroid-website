/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
	VITE_API_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	interface Locals {
		USER_API?: string;
		WORD_API?: string;
		ASSOC_API?: string;
		user?: Record<string, string | Date>;
		refreshToken?: boolean;
		fetch?: Record<unknown>;
	}

	interface Session {
		user?: UserModel;
	}
}
