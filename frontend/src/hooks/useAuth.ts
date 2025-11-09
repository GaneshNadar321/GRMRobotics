import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated, isAdmin } = useAuthStore();

  useEffect(() => {
    // Wait for zustand persist to hydrate
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    user,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    isLoading,
  };
}
