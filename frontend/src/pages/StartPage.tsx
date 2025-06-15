import React, { useEffect } from 'react';
import { DefaultService } from '../../generated/api/backend/sso-auth';

const StartPage: React.FC = () => {
  useEffect(() => {
    const startAuth = async () => {
      try {
        // 認証URLを取得してリダイレクト
        const response = await DefaultService.googleAuthUri();
        window.location.href = response.url;
      } catch (error) {
        console.error('認証URLの取得に失敗しました', error);
        // エラー時はホームに戻る
        window.location.href = '/';
      }
    };

    startAuth();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>認証ページにリダイレクトしています...</p>
    </div>
  );
};

export default StartPage;
