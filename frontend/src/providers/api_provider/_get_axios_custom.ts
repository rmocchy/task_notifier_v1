import axios, { AxiosInstance } from "axios";

// 注意: 副作用実装禁止
const getAxiosCustom = (): AxiosInstance => {
  const ax = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    // withCredentials: true, TODO: 将来, cookieセッション管理を導入したらここを有効にする
  });
  // TODO: リトライやトークンリフレッシュなどのハンドリングを追加する
  return ax;
};

export default getAxiosCustom;