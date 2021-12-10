/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_USER_API: string;
    VITE_WORD_API: string;
    VITE_ASSOC_API: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}