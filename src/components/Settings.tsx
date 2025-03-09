import React, { useState } from 'react';
import { Bell, Lock, Sliders } from 'lucide-react';

interface UserData {
  notifications: {
    email: boolean;
    sms: boolean;
    taxReminders: boolean;
    dueDate: boolean;
    promotions: boolean;
  };
  security: {
    twoFactor: boolean;
    loginAlerts: boolean;
    sessionTimeout: string;
  };
  preferences: {
    language: string;
    theme: string;
    currency: string;
    dateFormat: string;
  };
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [userData, setUserData] = useState<UserData>({
    notifications: {
      email: true,
      sms: false,
      taxReminders: true,
      dueDate: true,
      promotions: false,
    },
    security: {
      twoFactor: false,
      loginAlerts: true,
      sessionTimeout: '30',
    },
    preferences: {
      language: 'english',
      theme: 'light',
      currency: 'inr',
      dateFormat: 'dd/mm/yyyy',
    },
  });

  const handleInputChange = (section: keyof UserData, field: string, value: any) => {
    setUserData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-bold">⚙️ Settings</h2>
        <p className="mt-2 text-blue-100">Manage your account settings and preferences</p>
      </div>

      <div className="p-6">
        {/* Settings Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center px-4 py-2 font-medium ${
              activeTab === 'notifications'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-500 hover:text-blue-900'
            }`}
          >
            <Bell size={18} className="mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center px-4 py-2 font-medium ${
              activeTab === 'security'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-500 hover:text-blue-900'
            }`}
          >
            <Lock size={18} className="mr-2" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center px-4 py-2 font-medium ${
              activeTab === 'preferences'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-500 hover:text-blue-900'
            }`}
          >
            <Sliders size={18} className="mr-2" />
            Preferences
          </button>
        </div>

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div>
            <h3 className="text-xl font-semibold text-blue-900 mb-6">Notification Settings</h3>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-4">Email Notifications</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="emailNotifications" className="font-medium text-gray-700">Email Notifications</label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="emailNotifications" 
                      checked={userData.notifications.email}
                      onChange={(e) => handleInputChange('notifications', 'email', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label 
                      htmlFor="emailNotifications" 
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                        userData.notifications.email ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="smsNotifications" className="font-medium text-gray-700">SMS Notifications</label>
                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="smsNotifications" 
                      checked={userData.notifications.sms}
                      onChange={(e) => handleInputChange('notifications', 'sms', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label 
                      htmlFor="smsNotifications" 
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                        userData.notifications.sms ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    ></label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-4">Notification Types</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="taxReminders" className="font-medium text-gray-700">Tax Filing Reminders</label>
                    <p className="text-sm text-gray-500">Reminders about upcoming tax filing deadlines</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="taxReminders" 
                      checked={userData.notifications.taxReminders}
                      onChange={(e) => handleInputChange('notifications', 'taxReminders', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label 
                      htmlFor="taxReminders" 
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                        userData.notifications.taxReminders ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="dueDate" className="font-medium text-gray-700">Due Date Alerts</label>
                    <p className="text-sm text-gray-500">Alerts about payment and filing due dates</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="dueDate" 
                      checked={userData.notifications.dueDate}
                      onChange={(e) => handleInputChange('notifications', 'dueDate', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label 
                      htmlFor="dueDate" 
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                        userData.notifications.dueDate ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    ></label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="promotions" className="font-medium text-gray-700">Promotional Notifications</label>
                    <p className="text-sm text-gray-500">Updates about new features and offers</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="promotions" 
                      checked={userData.notifications.promotions}
                      onChange={(e) => handleInputChange('notifications', 'promotions', e.target.checked)}
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label 
                      htmlFor="promotions" 
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                        userData.notifications.promotions ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    ></label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-4">Notification Frequency</h4>
              
              <div className="mb-4">
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Notification Frequency
                </label>
                <select
                  id="frequency"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Immediately</option>
                  <option>Daily Digest</option>
                  <option>Weekly Digest</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="quietHours" className="block text-sm font-medium text-gray-700 mb-1">
                  Quiet Hours
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startTime" className="block text-xs text-gray-500">Start Time</label>
                    <input
                      type="time"
                      id="startTime"
                      defaultValue="22:00"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="endTime" className="block text-xs text-gray-500">End Time</label>
                    <input
                      type="time"
                      id="endTime"
                      defaultValue="08:00"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition duration-300">
                Save Notification Settings
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div>
            <h3 className="text-xl font-semibold text-blue-900 mb-6">Security Settings</h3>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h4 className="font-medium text-blue-900 mb-4">Password Management</h4>
              
              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  placeholder="Enter your current password"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Enter new password"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                <p className="font-medium mb-1">Password requirements:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Minimum 8 characters</li>
                  <li>At least one uppercase letter</li>
                  <li>At least one number</li>
                  <li>At least one special character</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition duration-300">
                  Update Password
                </button>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h4 className="font-medium text-blue-900 mb-4">Two-Factor Authentication</h4>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium text-gray-700">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="twoFactor" 
                    checked={userData.security.twoFactor}
                    onChange={(e) => handleInputChange('security', 'twoFactor', e.target.checked)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label 
                    htmlFor="twoFactor" 
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                      userData.security.twoFactor ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  ></label>
                </div>
              </div>
              
              {!userData.security.twoFactor && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-800">
                  We strongly recommend enabling two-factor authentication to protect your account and sensitive tax information.
                </div>
              )}
              
              {userData.security.twoFactor && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 text-sm text-green-800">
                  Two-factor authentication is enabled. Your account is more secure.
                </div>
              )}
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-4">Session Management</h4>
              
              <div className="mb-4">
                <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">
                  Session Timeout (minutes)
                </label>
                <select
                  id="sessionTimeout"
                  value={userData.security.sessionTimeout}
                  onChange={(e) => handleInputChange('security', 'sessionTimeout', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </div>
              
              <div className="flex items-center mb-4">
                <input
                  id="loginAlerts"
                  type="checkbox"
                  checked={userData.security.loginAlerts}
                  onChange={(e) => handleInputChange('security', 'loginAlerts', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="loginAlerts" className="ml-2 block text-sm text-gray-700">
                  Receive alerts for new login attempts
                </label>
              </div>
              
              <div className="mt-4">
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300">
                  Log Out of All Devices
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition duration-300">
                Save Security Settings
              </button>
            </div>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div>
            <h3 className="text-xl font-semibold text-blue-900 mb-6">Application Preferences</h3>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h4 className="font-medium text-blue-900 mb-4">Display Settings</h4>
              
              <div className="mb-4">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  id="language"
                  value={userData.preferences.language}
                  onChange={(e) => handleInputChange('preferences', 'language', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline -none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="tamil">Tamil</option>
                  <option value="telugu">Telugu</option>
                  <option value="bengali">Bengali</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                  Theme
                </label>
                <select
                  id="theme"
                  value={userData.preferences.theme}
                  onChange={(e) => handleInputChange('preferences', 'theme', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h4 className="font-medium text-blue-900 mb-4">Regional Settings</h4>
              
              <div className="mb-4">
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  id="currency"
                  value={userData.preferences.currency}
                  onChange={(e) => handleInputChange('preferences', 'currency', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="inr">Indian Rupee (₹)</option>
                  <option value="usd">US Dollar ($)</option>
                  <option value="eur">Euro (€)</option>
                  <option value="gbp">British Pound (£)</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">
                  Date Format
                </label>
                <select
                  id="dateFormat"
                  value={userData.preferences.dateFormat}
                  onChange={(e) => handleInputChange('preferences', 'dateFormat', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                  <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                  <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-blue-900 mb-4">Dashboard Preferences</h4>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="showTaxSummary"
                    type="checkbox"
                    checked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="showTaxSummary" className="ml-2 block text-sm text-gray-700">
                    Show Tax Summary on Dashboard
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="showUpcomingDates"
                    type="checkbox"
                    checked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="showUpcomingDates" className="ml-2 block text-sm text-gray-700">
                    Show Upcoming Due Dates
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="showTaxSavings"
                    type="checkbox"
                    checked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="showTaxSavings" className="ml-2 block text-sm text-gray-700">
                    Show Tax Saving Recommendations
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition duration-300">
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;