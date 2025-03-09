import React, { useState } from 'react';
import { Calculator, Home, Settings as SettingsIcon } from 'lucide-react';
import TaxCalculator from './TaxCalculator';
import SettingsPage from './Settings';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white">
        <div className="p-4 border-b border-blue-800">
          <h2 className="text-xl font-bold">Tax Guru Dashboard</h2>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <button 
                onClick={() => setActiveTab('home')}
                className={`flex items-center w-full px-4 py-3 ${activeTab === 'home' ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200`}
              >
                <Home size={20} className="mr-3" />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center w-full px-4 py-3 ${activeTab === 'calculator' ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200`}
              >
                <Calculator size={20} className="mr-3" />
                <span>Tax Calculator</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex items-center w-full px-4 py-3 ${activeTab === 'settings' ? 'bg-blue-800' : 'hover:bg-blue-800'} transition duration-200`}
              >
                <SettingsIcon size={20} className="mr-3" />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'calculator' && <TaxCalculator />}
        {activeTab === 'settings' && <SettingsPage />}
        {activeTab === 'home' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Welcome to Tax Guru</h2>
            <p className="text-gray-700 mb-6">Your personal tax assistant. Navigate through the sidebar to access different features.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col items-center text-center">
                <div className="bg-blue-900 p-3 rounded-full mb-3">
                  <Calculator size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">Tax Calculator</h3>
                <p className="text-sm text-gray-600">Calculate your income tax liability with our easy-to-use calculator</p>
                <button 
                  onClick={() => setActiveTab('calculator')}
                  className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition duration-300 text-sm"
                >
                  Calculate Now
                </button>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex flex-col items-center text-center">
                <div className="bg-yellow-600 p-3 rounded-full mb-3">
                  <SettingsIcon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-yellow-800 mb-2">Account Settings</h3>
                <p className="text-sm text-gray-600">Manage your profile, preferences, and security settings</p>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-300 text-sm"
                >
                  Update Settings
                </button>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Important Tax Dates</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="py-2 px-4 text-left text-blue-900">Due Date</th>
                      <th className="py-2 px-4 text-left text-blue-900">Description</th>
                      <th className="py-2 px-4 text-left text-blue-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4">July 31, 2025</td>
                      <td className="py-3 px-4">Income Tax Return Filing Deadline</td>
                      <td className="py-3 px-4">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Upcoming
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">June 15, 2025</td>
                      <td className="py-3 px-4">Advance Tax Payment (First Installment)</td>
                      <td className="py-3 px-4">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">September 15, 2025</td>
                      <td className="py-3 px-4">Advance Tax Payment (Second Installment)</td>
                      <td className="py-3 px-4">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Pending
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Tax Saving Tips</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">1</span>
                    <p className="text-gray-700">Maximize your 80C investments (up to ₹1,50,000)</p>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">2</span>
                    <p className="text-gray-700">Consider investing in tax-saving instruments like ELSS, PPF, or NPS</p>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">3</span>
                    <p className="text-gray-700">Claim deductions for health insurance premiums under Section 80D</p>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">4</span>
                    <p className="text-gray-700">If you have a home loan, claim interest deduction under Section 24</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Recent Updates</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-blue-800">New Tax Regime Changes</h4>
                    <p className="text-sm text-gray-700 mt-1">The government has announced changes to the new tax regime effective from April 1, 2025.</p>
                    <p className="text-xs text-gray-500 mt-1">June 10, 2025</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800">ITR Forms for AY 2025-26 Released</h4>
                    <p className="text-sm text-gray-700 mt-1">The Income Tax Department has released the ITR forms for Assessment Year 2025-26.</p>
                    <p className="text-xs text-gray-500 mt-1">May 25, 2025</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800">Tax Guru App Update</h4>
                    <p className="text-sm text-gray-700 mt-1">We've added new features to help you manage your finances better.</p>
                    <p className="text-xs text-gray-500 mt-1">May 15, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;