import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosInstance } from 'axios';

// Axiosのカスタムインスタンスを提供するフック
export const useAxiosInstance = (): AxiosInstance => {
  const [instance, setInstance] = useState<AxiosInstance>(() => {
    // 環境変数またはデフォルト値からAPIのベースURLを設定
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
    
    // カスタムAxiosインスタンスを作成
    return axios.create({
      baseURL: apiBaseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  });
  
  // インスタンスの設定
  useEffect(() => {
    // リクエストインターセプター
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        // リクエスト前の処理（認証トークンの追加など）
        console.log(`Sending request to: ${config.baseURL}${config.url}`);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    
    // レスポンスインターセプター
    const responseInterceptor = instance.interceptors.response.use(
      (response) => {
        // 成功レスポンスの処理
        return response;
      },
      (error) => {
        // エラーレスポンスの処理
        console.error('API request failed:', error);
        return Promise.reject(error);
      }
    );
    
    // クリーンアップ関数
    return () => {
      // インターセプターをアンマウント時に削除
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [instance]);
  
  return instance;
};
