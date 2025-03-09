import React, { useState } from 'react';
import { PieChart, BarChart, FileText, Download, Filter } from 'lucide-react';

const Reports: React.FC = () => {
  const [activeReport, setActiveReport] = useState('income');
  const [year, setYear] = useState('2025');
  const [quarter, setQuarter] = useState('Q1');

  // Sample data for charts
  const incomeData = [
    { month: 'Jan', amount: 120000 },
    { month: 'Feb', amount: 125000 },
    { month: 'Mar', amount: 130000 },
    { month: 'Apr', amount: 128000 },
    { month: 'May', amount: 135000 },
    { month: 'Jun', amount: 140000 },
  ];

  const taxData = [
    { category: 'Income Tax', amount: 250000 },
    { category: 'Property Tax', amount: 45000 },
    { category: 'Capital Gains', amount: 75000 },
    { category: 'GST', amount: 120000 },
  ];

  const deductionsData = [
    { category: '80C', amount: 150000 },
    { category: '80D', amount: 25000 },
    { category: '80G', amount: 10000 },
    { category: 'HRA', amount: 120000 },
    { category: 'Other', amount: 45000 },
  ];

  // Format currency
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
        <h2 className="text-2xl font-bold">📊 Tax Reports & Analysis</h2>
        <p className="mt-2 text-blue-100">View and download your tax reports and financial analysis</p>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Filter size={18} className="mr-2 text-blue-900" />
            <span className="font-medium text-gray-700">Filters:</span>
          </div>
          
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="quarter" className="block text-sm font-medium text-gray-700 mb-1">
              Quarter
            </label>
            <select
              id="quarter"
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Q1">Q1 (Jan-Mar)</option>
              <option value="Q2">Q2 (Apr-Jun)</option>
              <option value="Q3">Q3 (Jul-Sep)</option>
              <option value="Q4">Q4 (Oct-Dec)</option>
            </select>
          </div>
          
          <button className="ml-auto bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center">
            <Download size={18} className="mr-2" />
            Export Report
          </button>
        </div>

        {/* Report Type Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveReport('income')}
            className={`px-4 py-2 font-medium ${
              activeReport === 'income'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-500 hover:text-blue-900'
            }`}
          >
            <div className="flex items-center">
              <BarChart size={18} className="mr-2" />
              Income Analysis
            </div>
          </button>
          <button
            onClick={() => setActiveReport('tax')}
            className={`px-4 py-2 font-medium ${
              activeReport === 'tax'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-500 hover:text-blue-900'
            }`}
          >
            <div className="flex items-center">
              <PieChart size={18} className="mr-2" />
              Tax Breakdown
            </div>
          </button>
          <button
            onClick={() => setActiveReport('deductions')}
            className={`px-4 py-2 font-medium ${
              activeReport === 'deductions'
                ? 'text-blue-900 border-b-2 border-blue-900'
                : 'text-gray-500 hover:text-blue-900'
            }`}
          >
            <div className="flex items-center">
              <FileText size={18} className="mr-2" />
              Deductions
            </div>
          </button>
        </div>

        {/* Income Analysis */}
        {activeReport === 'income' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-blue-700">Total Income ({year})</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(778000)}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-blue-700">Average Monthly</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(129667)}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-blue-700">Growth (YoY)</p>
                <p className="text-2xl font-bold text-green-600">+8.5%</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Monthly Income Trend ({quarter}, {year})</h3>
              
              <div className="h-64 flex items-end space-x-4 mt-8 mb-4 px-4">
                {incomeData.map((item) => (
                  <div key={item.month} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-600 rounded-t-md hover:bg-blue-700 transition-all duration-300"
                      style={{ height: `${(item.amount / 150000) * 100}%` }}
                    ></div>
                    <div className="text-xs font-medium text-gray-600 mt-2">{item.month}</div>
                    <div className="text-sm font-semibold text-gray-800">{formatCurrency(item.amount)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Income Sources</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount (₹)
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Salary</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(650000)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">83.5%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Investments</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(85000)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">10.9%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rental Income</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(43000)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">5.6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tax Breakdown */}
        {activeReport === 'tax' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-blue-700">Total Tax Paid ({year})</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(490000)}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-blue-700">Effective Tax Rate</p>
                <p className="text-2xl font-bold text-blue-900">25.8%</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-blue-700">Tax Savings</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(87500)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Tax Distribution</h3>
                
                <div className="space-y-4">
                  {taxData.map((item) => (
                    <div key={item.category}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.category}</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(item.amount)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${(item.amount / 490000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Quarterly Tax Payments</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quarter
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount (₹)
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q1 (Jan-Mar)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(122500)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q2 (Apr-Jun)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(122500)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q3 (Jul-Sep)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(122500)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Upcoming
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q4 (Oct-Dec)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(122500)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Pending
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Tax Saving Opportunities</h3>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="text-md font-semibold text-green-800 mb-2">💡 Potential Tax Savings</h4>
                <ul className="list-disc pl-5 text-sm text-green-800 space-y-2">
                  <li>Increase your 80C investments by ₹25,000 to reach the maximum limit</li>
                  <li>Consider investing ₹50,000 in NPS for additional tax benefits under 80CCD(1B)</li>
                  <li>Claim health insurance premium deduction under Section 80D</li>
                  <li>Potential savings: <span className="font-bold">{formatCurrency(18750)}</span></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Deductions */}
        {activeReport === 'deductions' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-blue-700">Total Deductions ({year})</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(350000)}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-blue-700">Tax Saved</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(87500)}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-blue-700">Deduction Limit Used</p>
                <p className="text-2xl font-bold text-blue-900">85%</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Deductions Breakdown</h3>
              
              <div className="space-y-4">
                {deductionsData.map((item) => (
                  <div key={item.category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(item.amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${(item.amount / 350000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Section 80C Investments</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Investment
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount (₹)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PPF</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(50000)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ELSS</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(60000)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Life Insurance Premium</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(25000)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">EPF</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(15000)}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">Total</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">{formatCurrency(150000)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Deduction Opportunities</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-800">Section 80D - Health Insurance</h4>
                    <p className="text-sm text-yellow-700 mt-1">You can claim up to ₹25,000 for health insurance premiums.</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>₹0</span>
                        <span>₹25,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800">Section 80CCD(1B) - NPS</h4>
                    <p className="text-sm text-blue-700 mt-1">Additional ₹50,000 deduction for NPS investments.</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>₹0</span>
                        <span>₹50,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800">Section 80G - Donations</h4>
                    <p className="text-sm text-purple-700 mt-1">Deduction for donations to approved charities.</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>₹10,000</span>
                        <span>No Limit</span>
                      </div>
                    </div>
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

export default Reports;