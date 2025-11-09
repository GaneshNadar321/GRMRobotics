'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

interface FacebookLoginButtonProps {
  className?: string;
  disabled?: boolean;
}

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export function FacebookLoginButton({ className = '', disabled = false }: FacebookLoginButtonProps) {
  const router = useRouter();
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  const facebookAuthMutation = useMutation({
    mutationFn: async (accessToken: string) => {
      const response = await api.post('/auth/facebook', { accessToken });
      return response.data;
    },
    onSuccess: (data) => {
      const { setAuth } = useAuthStore.getState();
      setAuth(data.user, data.accessToken, data.refreshToken);
      toast.success(`Welcome ${data.user.firstName}!`);
      
      setTimeout(() => {
        if (data.user.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/products');
        }
      }, 100);
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Facebook login failed. Please try again.';
      toast.error(message);
    },
  });

  useEffect(() => {
    // Load Facebook SDK
    if (typeof window !== 'undefined' && !window.FB) {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
        setIsSDKLoaded(true);
      };

      // Load the SDK asynchronously
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      document.head.appendChild(script);
    } else if (window.FB) {
      setIsSDKLoaded(true);
    }
  }, []);

  const handleFacebookLogin = () => {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    
    if (!appId || appId === 'your-facebook-app-id') {
      toast('Facebook OAuth setup required. Check OAUTH_SETUP_GUIDE.md for instructions.', {
        icon: 'ℹ️',
        duration: 5000,
      });
      return;
    }

    // If app ID is configured, show that it's ready but needs full setup
    toast('Facebook OAuth configured! Complete the setup in Facebook Developers.', {
      icon: '🔧',
      duration: 4000,
    });
  };

  return (
    <button
      type="button"
      onClick={handleFacebookLogin}
      disabled={disabled || facebookAuthMutation.isPending || !isSDKLoaded}
      className={`btn btn-secondary flex items-center justify-center gap-2 ${className}`}
    >
      {facebookAuthMutation.isPending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )}
      <span>{facebookAuthMutation.isPending ? 'Signing in...' : 'Facebook'}</span>
    </button>
  );
}