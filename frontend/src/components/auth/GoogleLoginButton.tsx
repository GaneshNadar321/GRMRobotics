'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

interface GoogleLoginButtonProps {
  className?: string;
  disabled?: boolean;
}

declare global {
  interface Window {
    google: any;
    gapi: any;
  }
}

export function GoogleLoginButton({ className = '', disabled = false }: GoogleLoginButtonProps) {
  const router = useRouter();
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  const googleAuthMutation = useMutation({
    mutationFn: async (accessToken: string) => {
      const response = await api.post('/auth/google', { accessToken });
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
      const message = error.response?.data?.error || 'Google login failed. Please try again.';
      toast.error(message);
    },
  });

  useEffect(() => {
    // Load Google Identity Services
    if (typeof window !== 'undefined' && !window.google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google) {
          setIsGoogleLoaded(true);
        }
      };
      document.head.appendChild(script);
    } else if (window.google) {
      setIsGoogleLoaded(true);
    }
  }, []);

  const handleGoogleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      toast.error('Google login is not configured. Please contact support.');
      return;
    }

    if (!window.google) {
      toast.error('Google services are not loaded. Please try again.');
      return;
    }

    // Create a popup for Google OAuth
    const popup = window.open(
      `https://accounts.google.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(window.location.origin)}&response_type=token&scope=email profile`,
      'google-login',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );

    // Listen for the popup to close or send a message
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed);
        // Handle popup closed without completion
      }
    }, 1000);

    // Listen for messages from the popup
    const messageListener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        clearInterval(checkClosed);
        popup?.close();
        googleAuthMutation.mutate(event.data.accessToken);
        window.removeEventListener('message', messageListener);
      } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
        clearInterval(checkClosed);
        popup?.close();
        toast.error('Google login failed. Please try again.');
        window.removeEventListener('message', messageListener);
      }
    };

    window.addEventListener('message', messageListener);
  };

  // Fallback: Simple redirect method if popup doesn't work
  const handleGoogleLoginFallback = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    if (!clientId || clientId === 'your-google-client-id.apps.googleusercontent.com') {
      toast('Google OAuth setup required. Check OAUTH_SETUP_GUIDE.md for instructions.', {
        icon: 'ℹ️',
        duration: 5000,
      });
      return;
    }

    // If client ID is configured, show that it's ready but needs full setup
    toast('Google OAuth configured! Complete the setup in Google Cloud Console.', {
      icon: '🔧',
      duration: 4000,
    });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLoginFallback}
      disabled={disabled || googleAuthMutation.isPending}
      className={`btn btn-secondary flex items-center justify-center gap-2 ${className}`}
    >
      {googleAuthMutation.isPending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      )}
      <span>{googleAuthMutation.isPending ? 'Signing in...' : 'Google'}</span>
    </button>
  );
}