import { createContext, useContext, useMemo, ReactNode } from "react";
import { DefaultApi as ssoAPI } from "../../../generated/api_backend/sso-auth";
import { DefaultApi as userAPI } from "../../../generated/api_backend/user";
import { DefaultApi as healthAPI } from "../../../generated/api_backend/health";

import getCustomAPI from "./_get_custom_api";

// FEで使えるAPIをここで登録する
// baseURLやaxiosの設定はgetCustomAPIGeneratorで行います
const apis = {
  authApi: getCustomAPI(ssoAPI),
  userApi: getCustomAPI(userAPI),
  healthApi: getCustomAPI(healthAPI),
};

// =======================================
// ここから下はAPI定義の変更では触らないでください
// =======================================

// 関数戻り値をマッピングする
type ApiClients = {
  [K in keyof typeof apis]: typeof apis[K]
};

const ApiContext = createContext<ApiClients | undefined>(undefined);

// Provider定義
export function ApiProvider({ children }:{children: ReactNode}) {
  return (
    <ApiContext.Provider value={apis}>
      {children}
    </ApiContext.Provider>
  )
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw new Error('useApi must be used within ApiProvider');
  return context
}