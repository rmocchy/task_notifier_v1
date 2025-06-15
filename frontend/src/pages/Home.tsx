import React, { useEffect, useState } from 'react';
import { DefaultService as SsoAuthService } from '../../generated/api/backend/sso-auth';
import { DefaultService as UserService } from '../../generated/api/backend/user';

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [authUrl, setAuthUrl] = useState<string>('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // ユーザー数を取得してみることで認証状態を確認
        const response = await UserService.userCount();
        setUserCount(response.count);
        setIsAuthenticated(true);
      } catch (error) {
        // 認証エラーの場合
        setIsAuthenticated(false);
        // 認証用URLを取得
        try {
          const authUrlResponse = await SsoAuthService.googleAuthUri();
          setAuthUrl(authUrlResponse.url);
        } catch (err) {
          console.error('認証URLの取得に失敗しました', err);
        }
      }
    };

    checkAuth();
  }, []);

  const handleSignIn = () => {
    if (authUrl) {
      window.location.href = authUrl;
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1>タスク通知アプリ</h1>
      {isAuthenticated ? (
        <div>
          <p>ログイン中です</p>
          {userCount !== null && (
            <p>システム内のユーザー数: {userCount}</p>
          )}
        </div>
      ) : (
        <div>
          <p>サインインしてください</p>
          <button 
            onClick={handleSignIn}
            style={{
              padding: '10px 15px',
              backgroundColor: '#4285F4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Googleでサインイン
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
