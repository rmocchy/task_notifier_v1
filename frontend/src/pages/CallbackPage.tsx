import { useMutation } from '@tanstack/react-query';
import React, {useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApi } from '../providers/api_provider';

const CallbackPage: React.FC = () => {
  //  Google認証のコールバックページ
  // urlからcodeを取得
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const authApi = useApi().authApi;

  const { mutate } = useMutation({
    mutationKey: ['callbackAuth'],
    mutationFn: async () => {
      if (!code) {
        throw new Error('認証コードが提供されていません');
      }
      // 認証コードをサーバーに送信してトークンを取得
      const res = await authApi.tokenExchange({
        code: code,
      });
      return res.data;
    },
    onSuccess: (data) => {
      // トークンをローカルストレージに保存
      localStorage.setItem('token', data.access_token);
      // ホームページにリダイレクト
      window.location.href = '/';
    },
    onError: (error) => {
      console.error('認証エラー:', error);
      window.location.href = '/';
    },
  })

  useEffect(() => {
    if (code) {
      mutate();
    }
  }, [code]);

  return (<>checking...</>)
};

export default CallbackPage;
