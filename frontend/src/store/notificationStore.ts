import { create } from 'zustand';
import api from '@/lib/api';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  fetchUnreadCount: () => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAsRead: (id) => {
    set((state) => {
      const notifications = state.notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      );
      const unreadCount = notifications.filter((notif) => !notif.read).length;
      return { notifications, unreadCount };
    });
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notif) => ({ ...notif, read: true })),
      unreadCount: 0,
    }));
  },

  removeNotification: (id) => {
    set((state) => {
      const notifications = state.notifications.filter((notif) => notif.id !== id);
      const unreadCount = notifications.filter((notif) => !notif.read).length;
      return { notifications, unreadCount };
    });
  },

  clearAll: () => {
    set({ notifications: [], unreadCount: 0 });
  },

  fetchUnreadCount: async () => {
    try {
      const response = await api.get('/admin/messages?status=unread');
      const unreadMessages = response.data;
      set({ unreadCount: unreadMessages.length });
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  },
}));