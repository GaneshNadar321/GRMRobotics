'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Search, Mail, MailOpen, Trash2, Reply, User, Calendar, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminMessagesPage() {
  const { user, isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ['admin-messages', searchQuery, filterStatus],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (filterStatus !== 'all') params.append('status', filterStatus);
      
      const response = await api.get(`/admin/messages?${params.toString()}`);
      return response.data;
    },
    enabled: isAuthenticated() && user?.role === 'ADMIN',
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/admin/messages/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
      toast.success('Message marked as read');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/messages/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
      toast.success('Message deleted successfully');
      setSelectedMessage(null);
    },
  });

  if (!isAuthenticated() || user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">
              Customer inquiries and contact messages • {messages?.length || 0} messages
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages by name, email, or subject..."
                className="input pl-10 w-full"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages List */}
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ) : messages && messages.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {messages.map((message: any) => (
              <div
                key={message.id}
                className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !message.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    !message.isRead ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {!message.isRead ? (
                      <Mail className="w-5 h-5 text-blue-600" />
                    ) : (
                      <MailOpen className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                            {message.name}
                          </h3>
                          <span className="text-sm text-gray-500">{message.email}</span>
                        </div>
                        <h4 className={`font-medium mb-2 ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.subject}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {message.message}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                          {message.phone && (
                            <span>📞 {message.phone}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!message.isRead && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsReadMutation.mutate(message.id);
                            }}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <MailOpen className="w-4 h-4 text-blue-600" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this message?')) {
                              deleteMutation.mutate(message.id);
                            }
                          }}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
            <p className="text-gray-600">Customer messages will appear here when they contact you</p>
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Message Details</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedMessage.name}</h3>
                    <p className="text-sm text-gray-600">{selectedMessage.email}</p>
                    {selectedMessage.phone && (
                      <p className="text-sm text-gray-600">📞 {selectedMessage.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Subject</h4>
                  <p className="text-gray-700">{selectedMessage.subject}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Message</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <p>Received: {new Date(selectedMessage.createdAt).toLocaleString()}</p>
                  <p>Status: {selectedMessage.isRead ? 'Read' : 'Unread'}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`;
                  }}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Reply className="w-4 h-4" />
                  Reply via Email
                </button>
                {!selectedMessage.isRead && (
                  <button
                    onClick={() => {
                      markAsReadMutation.mutate(selectedMessage.id);
                      setSelectedMessage({ ...selectedMessage, isRead: true });
                    }}
                    className="btn btn-secondary flex items-center gap-2"
                  >
                    <MailOpen className="w-4 h-4" />
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => {
                    if (confirm('Delete this message?')) {
                      deleteMutation.mutate(selectedMessage.id);
                    }
                  }}
                  className="btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}