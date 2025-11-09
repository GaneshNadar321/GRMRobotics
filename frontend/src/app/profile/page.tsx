'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { User, Mail, Phone, MapPin, Lock, Package, Edit3, Save, X, Shield, Calendar, Settings, Heart, ShoppingBag, CreditCard, Bell, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await api.get('/auth/profile');
      return response.data;
    },
    enabled: mounted && isAuthenticated(),
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await api.put('/auth/profile', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully');
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to update profile');
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (data: typeof passwordData) => {
      const response = await api.put('/auth/change-password', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Password changed successfully');
      setShowPasswordForm(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || 'Failed to change password');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    changePasswordMutation.mutate(passwordData);
  };

  if (!mounted) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="h-64 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <User className="w-16 h-16 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Please login to view your profile</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Sign in to your account to access your profile, orders, and account settings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Login to Continue
              </Link>
              <Link href="/register" className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="h-64 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-gray-100 transition-colors">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <h2 className="text-lg font-semibold">
                    {profile?.firstName} {profile?.lastName}
                  </h2>
                  <p className="text-blue-100 text-sm">{profile?.email}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                    profile?.role === 'ADMIN' 
                      ? 'bg-purple-500/20 text-purple-100 border border-purple-400/30' 
                      : 'bg-green-500/20 text-green-100 border border-green-400/30'
                  }`}>
                    {profile?.role === 'ADMIN' ? 'Administrator' : 'Customer'}
                  </span>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="p-4">
                <nav className="space-y-1">
                  <Link 
                    href="/orders" 
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
                  >
                    <Package className="w-5 h-5 group-hover:text-blue-600" />
                    <span className="font-medium">My Orders</span>
                  </Link>
                  <Link 
                    href="/wishlist" 
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
                  >
                    <Heart className="w-5 h-5 group-hover:text-blue-600" />
                    <span className="font-medium">Wishlist</span>
                  </Link>
                  <button className="w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group">
                    <Bell className="w-5 h-5 group-hover:text-blue-600" />
                    <span className="font-medium">Notifications</span>
                  </button>
                  {profile?.role === 'ADMIN' && (
                    <Link 
                      href="/admin" 
                      className="flex items-center gap-3 p-3 text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                    >
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Admin Dashboard</span>
                    </Link>
                  )}
                </nav>
              </div>

              {/* Account Stats */}
              <div className="border-t border-gray-200 p-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-2">Member since</p>
                  <p className="text-sm font-medium text-gray-900">
                    {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    }) : 'Recently'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                <p className="text-gray-600 text-sm">Update your personal details and contact information</p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input"
                    placeholder="+91XXXXXXXXXX"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    {updateProfileMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        firstName: profile?.firstName || '',
                        lastName: profile?.lastName || '',
                        email: profile?.email || '',
                        phone: profile?.phone || '',
                      });
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Full Name</p>
                      <p className="text-gray-600">{profile?.firstName} {profile?.lastName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email Address</p>
                      <p className="text-gray-600">{profile?.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone Number</p>
                      <p className="text-gray-600">{profile?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Member Since</p>
                      <p className="text-gray-600">
                        {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Security Settings
                </h2>
                <p className="text-gray-600 text-sm">Manage your password and security preferences</p>
              </div>
              {!showPasswordForm && (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </button>
              )}
            </div>

            {showPasswordForm ? (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="input"
                    required
                    minLength={8}
                  />
                  <p className="text-sm text-gray-600 mt-1">Minimum 8 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="input"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={changePasswordMutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    {changePasswordMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Changing...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        Update Password
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Password</p>
                        <p className="text-gray-600">Last updated recently</p>
                      </div>
                    </div>
                    <div className="text-2xl text-gray-400">••••••••</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-700">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Account Secured</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Your account is protected with a strong password</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Bell className="w-4 h-4" />
                      <span className="text-sm font-medium">Login Alerts</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">Get notified of new login attempts</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                href="/orders" 
                className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 hover:from-blue-100 hover:to-blue-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">View Orders</p>
                    <p className="text-sm text-blue-700">Track your purchases</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                href="/wishlist" 
                className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-lg p-4 hover:from-pink-100 hover:to-pink-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-pink-900">Wishlist</p>
                    <p className="text-sm text-pink-700">Saved items</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                href="/products" 
                className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 hover:from-green-100 hover:to-green-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">Shop Now</p>
                    <p className="text-sm text-green-700">Browse products</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
