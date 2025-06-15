import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

const getAxiosCustom = (): AxiosInstance => {
  const ax = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // withCredentials: true, TODO: 将来, cookieセッション管理を導入したらここを有効にする
  });
  // TODO: リトライやトークンリフレッシュなどのハンドリングを追加する
  return ax;
};

export default getAxiosCustom;