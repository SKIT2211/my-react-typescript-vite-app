/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_AUTHENTICATION_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}