/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // ここに他の環境変数を追加
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
