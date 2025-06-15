import { AxiosInstance } from "axios";
import getAxiosCustom from "./_get_axios_custom";

// getCustomAPI はカスタムAPIインスタンスを取得する関数を返します
// axiosやBaseAPIの設定を行った上でapiクラスのインスタンスを返す関数です。
function getCustomAPIGenerator<T>(
  apiClass: new (conf?: any, baseUrl?: string, axios?: AxiosInstance) => T,
): () => T {
  const axiosInstance = getAxiosCustom();
  return () => new apiClass(undefined, undefined, axiosInstance);
}

export default getCustomAPIGenerator;