'use client';

import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isHydrated } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for the store to hydrate from localStorage
    if (isHydrated) {
      setIsLoading(false);
      
      // Check authentication after hydration
      if (!isAuthenticated() || user?.role !== 'ADMIN') {
        router.push('/login');
      }
    }
  }, [isHydrated, isAuthenticated, user, router]);

  // Show loading while waiting for hydration
  if (isLoading || !isHydrated) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated() || user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
