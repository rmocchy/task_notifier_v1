import { createContext, useContext, useMemo, ReactNode } from "react";
import { DefaultApi as ssoAPI } from "../../../generated/api_backend/sso-auth";
import { DefaultApi as userAPI } from "../../../generated/api_backend/user";
import { DefaultApi as healthAPI } from "../../../generated/api_backend/health";

import getCustomAPIGenerator from "./_get_custom_api";

// FEで使えるAPIをここで登録する
// baseURLやaxiosの設定はgetCustomAPIGeneratorで行います
const apiFactories = {
  authApi: getCustomAPIGenerator(ssoAPI),
  userApi: getCustomAPIGenerator(userAPI),
  healthApi: getCustomAPIGenerator(healthAPI),
};

// =======================================
// ここから下はAPI定義の変更では触らないでください
// =======================================

// 関数戻り値をマッピングする
type ApiClients = {
  [K in keyof typeof apiFactories]: ReturnType<typeof apiFactories[K]>
};

const ApiContext = createContext<ApiClients | undefined>(undefined);

export function ApiProvider({ children }:{children: ReactNode}) {
  const clients = useMemo(() => {
    return Object.fromEntries(
      Object.entries(apiFactories).map(([key, factory]) => [key, factory()])
    ) as ApiClients;
  }, []);

  return (
    <ApiContext.Provider value={clients}>
      {children}
    </ApiContext.Provider>
  )
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) throw new Error('useApi must be used within ApiProvider');
  return context
}