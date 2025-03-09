import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Clock } from 'lucide-react';

const Finances: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  // Sample data
  const accountBalance = 250000;
  const investments = 500000;
  const expenses = 75000;
  const transactions = [
    {
      id: 1,
      type: 'credit',
      description: 'Salary Deposit',
      amount: 85000,
      date: '2025-03-15',
    },
    {
      id: 2,
      type: 'debit',
      description: 'Tax Payment',
      amount: 25000,
      date: '2025-03-10',
    },
    {
      id: 3,
      type: 'credit',
      description: 'Investment Returns',
      amount: 15000,
      date: '2025-03-05',
    },
    {
      id: 4,
      type: 'debit',
      description: 'Insurance Premium',
      amount: 8000,
      date: '2025-03-01',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-bold">💰 Financial Dashboard</h2>
        <p className="mt-2 text-blue-100">Track your finances, investments, and expenses</p>
      </div>

      <div className="p-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-900">Account Balance</h3>
              <DollarSign className="text-blue-900" size={24} />
            </div>
            <p className="text-3xl font-bold text-blue-900">{formatCurrency(accountBalance)}</p>
            <p className="text-sm text-blue-700 mt-2">Available Balance</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-800">Investments</h3>
              <TrendingUp className="text-green-800" size={24} />
            </div>
            <p className="text-3xl font-bold text-green-800">{formatCurrency(investments)}</p>
            <p className="text-sm text-green-700 mt-2">Total Investment Value</p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border border-red-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-800">Expenses</h3>
              <TrendingDown className="text-red-800" size={24} />
            </div>
            <p className="text-3xl font-bold text-red-800">{formatCurrency(expenses)}</p>
            <p className="text-sm text-red-700 mt-2">Monthly Expenses</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-blue-900">Recent Transactions</h3>
            <Clock className="text-blue-900" size={24} />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                      <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.type === 'credit'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.type === 'credit' ? 'Credit' : 'Debit'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investment Portfolio */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-6">Investment Portfolio</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-4">Asset Allocation</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Equity</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Debt</span>
                    <span>30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Gold</span>
                    <span>10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-4">Top Investments</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">HDFC Bank</p>
                    <p className="text-sm text-gray-500">Banking</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+12.5%</p>
                    <p className="text-sm text-gray-500">₹75,000</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">TCS</p>
                    <p className="text-sm text-gray-500">Technology</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+8.3%</p>
                    <p className="text-sm text-gray-500">₹62,000</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">SBI Mutual Fund</p>
                    <p className="text-sm text-gray-500">Mutual Fund</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+15.2%</p>
                    <p className="text-sm text-gray-500">₹1,25,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finances;