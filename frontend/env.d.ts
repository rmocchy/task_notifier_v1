// env.d.ts
/// <reference types="vite/client" />

// viteで環境変数を扱いたい場合はここに登録する
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
