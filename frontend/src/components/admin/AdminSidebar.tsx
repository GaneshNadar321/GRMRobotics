'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Video,
  FileText,
  Star,
  Tag,
  Settings,
  BarChart3,
  MessageSquare,
  Image,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user, isAuthenticated } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Fetch real dashboard stats for badge counts
  const { data: stats } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: async () => {
      const response = await api.get('/admin/dashboard');
      return response.data;
    },
    enabled: isAuthenticated() && user?.role === 'ADMIN',
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch unread messages count
  const { data: unreadMessages } = useQuery({
    queryKey: ['admin-unread-messages'],
    queryFn: async () => {
      const response = await api.get('/admin/messages?status=unread');
      return response.data;
    },
    enabled: isAuthenticated() && user?.role === 'ADMIN',
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const menuSections = [
    {
      title: 'Overview',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', badge: null },
        { icon: BarChart3, label: 'Analytics', href: '/admin/analytics', badge: null },
      ]
    },
    {
      title: 'Commerce',
      items: [
        { icon: Package, label: 'Products', href: '/admin/products', badge: stats?.lowStockProducts > 0 ? stats.lowStockProducts.toString() : null },
        { icon: ShoppingBag, label: 'Orders', href: '/admin/orders', badge: stats?.pendingOrders > 0 ? stats.pendingOrders.toString() : null },
        { icon: Users, label: 'Customers', href: '/admin/customers', badge: null },
        { icon: Tag, label: 'Coupons', href: '/admin/coupons', badge: null },
      ]
    },
    {
      title: 'Content',
      items: [
        { icon: Video, label: 'Tutorials', href: '/admin/tutorials', badge: null },
        { icon: FileText, label: 'Manuals', href: '/admin/manuals', badge: null },
        { icon: Star, label: 'Reviews', href: '/admin/reviews', badge: null },
        { icon: Image, label: 'Media', href: '/admin/media', badge: null },
      ]
    },
    {
      title: 'Communication',
      items: [
        { icon: MessageSquare, label: 'Messages', href: '/admin/messages', badge: unreadMessages?.length > 0 ? unreadMessages.length.toString() : null },
      ]
    },
    {
      title: 'System',
      items: [
        { icon: Settings, label: 'Settings', href: '/admin/settings', badge: null },
      ]
    }
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 min-h-screen sticky top-0 transition-all duration-300`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/admin" className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-lg text-gray-900">GRM Robotics</h2>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            )}
          </Link>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-6">
          {menuSections.map((section) => (
            <div key={section.title}>
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700 font-medium shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <item.icon className={`w-5 h-5 ${isActive(item.href) ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {isCollapsed && item.badge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
