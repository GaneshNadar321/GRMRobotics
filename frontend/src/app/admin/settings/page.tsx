'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Save, User, Mail, Lock, Bell, Globe, CreditCard, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'site', label: 'Site Settings', icon: Globe },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'shipping', label: 'Shipping', icon: Truck },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Manage your admin settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="card">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        defaultValue={user?.firstName}
                        className="input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        defaultValue={user?.lastName}
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="input"
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+91 93077 20916"
                      className="input"
                    />
                  </div>
                  <button className="btn btn-primary">
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Security Settings</h2>
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input type="password" className="input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input type="password" className="input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" className="input" />
                  </div>
                  <button className="btn btn-primary">
                    <Lock className="w-5 h-5 mr-2" />
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Email Configuration</h2>
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">SMTP Host</label>
                    <input
                      type="text"
                      defaultValue="smtp.gmail.com"
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">SMTP Port</label>
                    <input
                      type="number"
                      defaultValue="587"
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">SMTP User</label>
                    <input
                      type="email"
                      defaultValue="infogrmrobotics@gmail.com"
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">SMTP Password</label>
                    <input type="password" className="input" />
                  </div>
                  <button className="btn btn-primary">
                    <Save className="w-5 h-5 mr-2" />
                    Save Email Settings
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'site' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Site Settings</h2>
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Site Name</label>
                    <input
                      type="text"
                      defaultValue="GRM Robotics"
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Site Description</label>
                    <textarea
                      className="input min-h-[100px]"
                      defaultValue="Student-friendly robotics kits with video tutorials"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Email</label>
                    <input
                      type="email"
                      defaultValue="grmrobotic@gmail.com"
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Phone</label>
                    <input
                      type="tel"
                      defaultValue="+91 93077 20916"
                      className="input"
                    />
                  </div>
                  <button className="btn btn-primary">
                    <Save className="w-5 h-5 mr-2" />
                    Save Site Settings
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <div>
                      <span className="font-medium">Order Notifications</span>
                      <p className="text-sm text-gray-600">Receive email when new orders are placed</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <div>
                      <span className="font-medium">Low Stock Alerts</span>
                      <p className="text-sm text-gray-600">Get notified when products are low on stock</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <div>
                      <span className="font-medium">New Customer Signups</span>
                      <p className="text-sm text-gray-600">Receive notifications for new customer registrations</p>
                    </div>
                  </label>
                  <button className="btn btn-primary">
                    <Save className="w-5 h-5 mr-2" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
