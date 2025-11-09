'use client';

import { useEffect } from 'react';

interface OAuthProviderProps {
  children: React.ReactNode;
}

export function OAuthProvider({ children }: OAuthProviderProps) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
  const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '';

  useEffect(() => {
    // Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('OAuth Provider initialized');
      console.log('Google Client ID configured:', !!googleClientId);
      console.log('Facebook App ID configured:', !!facebookAppId);
    }

    if (!googleClientId) {
      console.warn('Google Client ID not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID in your environment variables.');
    }

    if (!facebookAppId) {
      console.warn('Facebook App ID not configured. Please set NEXT_PUBLIC_FACEBOOK_APP_ID in your environment variables.');
    }
  }, [googleClientId, facebookAppId]);

  return <>{children}</>;
}