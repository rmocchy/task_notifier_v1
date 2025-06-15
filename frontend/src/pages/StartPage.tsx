import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useApi } from '../providers/api_provider';

const StartPage: React.FC = () => {
  // Google認証の開始ページ
  // ここでは、GoogleのOAuth認証を開始するためのリンクを提供します。
  const ssoAuthApi = useApi().authApi
  const {} = useQuery({
    queryKey: ['startAuth'],
    queryFn: async () => {
      const res = await ssoAuthApi.googleAuthUri()
      // 認証URIを取得してリダイレクト
      window.location.href = res.data.uri
    },
    enabled: true, // コンポーネントがマウントされたときに自動的に実行される
  })
  return (<></>)
};

export default StartPage;
