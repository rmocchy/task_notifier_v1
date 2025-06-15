import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DefaultService } from '../../generated/api/backend/sso-auth';

const CallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get('code');
      
      if (!code) {
        setError('認証コードがありません');
        // 数秒後にホームにリダイレクト
        setTimeout(() => navigate('/'), 3000);
        return;
      }

      try {
        // コードをトークンに交換
        await DefaultService.tokenExchange({ code });
        // 認証成功後、ホームページにリダイレクト
        navigate('/');
      } catch (err) {
        console.error('トークン交換中にエラーが発生しました', err);
        setError('認証処理中にエラーが発生しました');
        // 数秒後にホームにリダイレクト
        setTimeout(() => navigate('/'), 3000);
      }
    };

    processCallback();
  }, [searchParams, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>認証処理中です...</p>
      )}
      <p>ホームページに戻ります</p>
    </div>
  );
};

export default CallbackPage;
