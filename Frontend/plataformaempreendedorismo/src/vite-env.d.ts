/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string
  readonly VITE_API_URL: string
  readonly VITE_BASE_URL: string
  readonly VITE_AVALIADOR_ID: number
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}