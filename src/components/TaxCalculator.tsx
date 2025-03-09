import React, { useState, useEffect } from 'react';

const TaxCalculator: React.FC = () => {
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  const [income, setIncome] = useState(1000000);
  const [hraReceived, setHraReceived] = useState(200000);
  const [rentPaid, setRentPaid] = useState(150000);
  const [basicSalary, setBasicSalary] = useState(500000);
  const [isMetro, setIsMetro] = useState(false);
  const [deductions80C, setDeductions80C] = useState(150000);
  const [deductionsOther, setDeductionsOther] = useState(50000);
  const [isSenior, setIsSenior] = useState(false);
  const [savingsInterest, setSavingsInterest] = useState(5000);
  const [fdInterest, setFdInterest] = useState(10000);

  // State for calculated values
  const [hraExemption, setHraExemption] = useState(0);
  const [interestDeduction, setInterestDeduction] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [taxableIncome, setTaxableIncome] = useState(0);
  const [tax, setTax] = useState(0);
  const [cess, setCess] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [taxPaidPercentage, setTaxPaidPercentage] = useState(0);
  const [newRegimeTax, setNewRegimeTax] = useState(0);
  const [oldRegimeTax, setOldRegimeTax] = useState(0);

  // Handle 80C deduction input with limit
  const handle80CDeduction = (value: number) => {
    const limitedValue = Math.min(value, 150000);
    setDeductions80C(limitedValue);
  };

  // Calculate tax for old regime
  const calculateOldRegimeTax = (taxableIncome: number) => {
    let tax = 0;
    let remainingIncome = taxableIncome;

    if (remainingIncome > 1000000) {
      tax += (remainingIncome - 1000000) * 0.30;
      remainingIncome = 1000000;
    }
    if (remainingIncome > 500000) {
      tax += (remainingIncome - 500000) * 0.20;
      remainingIncome = 500000;
    }
    if (remainingIncome > 250000) {
      tax += (remainingIncome - 250000) * 0.05;
    }

    // Section 87A rebate (up to ₹5L income - no tax)
    if (taxableIncome <= 500000) {
      tax = 0;
    }

    return tax;
  };

  // Calculate tax for new regime
  const calculateNewRegimeTax = (income: number) => {
    // Standard Deduction of ₹50,000 for salaried individuals
    let taxableIncome = Math.max(0, income - 50000);
    let tax = 0;
    let remainingIncome = taxableIncome;

    if (remainingIncome > 1500000) {
      tax += (remainingIncome - 1500000) * 0.30;
      remainingIncome = 1500000;
    }
    if (remainingIncome > 1200000) {
      tax += (remainingIncome - 1200000) * 0.20;
      remainingIncome = 1200000;
    }
    if (remainingIncome > 900000) {
      tax += (remainingIncome - 900000) * 0.15;
      remainingIncome = 900000;
    }
    if (remainingIncome > 600000) {
      tax += (remainingIncome - 600000) * 0.10;
      remainingIncome = 600000;
    }
    if (remainingIncome > 300000) {
      tax += (remainingIncome - 300000) * 0.05;
    }

    // Section 87A rebate (up to ₹7L income - no tax)
    if (income <= 700000) {
      tax = 0;
    }

    return tax;
  };

  // Calculate tax whenever inputs change
  useEffect(() => {
    // HRA Exemption Calculation
    const hra5040 = isMetro ? 0.5 * basicSalary : 0.4 * basicSalary;
    const hraActual = hraReceived;
    const hraRentBased = rentPaid - (0.1 * basicSalary);
    const calculatedHraExemption = Math.max(Math.min(hraActual, hra5040, hraRentBased), 0);
    setHraExemption(calculatedHraExemption);

    // Interest Deduction Calculation (80TTA / 80TTB)
    const calculatedInterestDeduction = isSenior
      ? Math.min(savingsInterest + fdInterest, 25000) // 80TTB for Senior Citizens
      : Math.min(savingsInterest, 10000); // 80TTA for Non-Seniors
    setInterestDeduction(calculatedInterestDeduction);

    // Total Deductions (only for old regime)
    const calculatedTotalDeductions = regime === 'old' 
      ? deductions80C + deductionsOther + calculatedInterestDeduction + calculatedHraExemption
      : 50000; // Standard deduction for new regime
    setTotalDeductions(calculatedTotalDeductions);

    // Taxable Income
    const calculatedTaxableIncome = Math.max(income - calculatedTotalDeductions, 0);
    setTaxableIncome(calculatedTaxableIncome);

    // Calculate tax for both regimes
    const calculatedOldTax = calculateOldRegimeTax(calculatedTaxableIncome);
    const calculatedNewTax = calculateNewRegimeTax(income);

    setOldRegimeTax(calculatedOldTax);
    setNewRegimeTax(calculatedNewTax);

    // Set current regime tax
    const calculatedTax = regime === 'old' ? calculatedOldTax : calculatedNewTax;
    setTax(calculatedTax);

    // Cess (4% on tax)
    const calculatedCess = calculatedTax * 0.04;
    setCess(calculatedCess);

    // Total Tax
    const calculatedTotalTax = calculatedTax + calculatedCess;
    setTotalTax(calculatedTotalTax);

    // Tax Paid Percentage
    const calculatedTaxPaidPercentage = income > 0 ? (calculatedTotalTax / income) * 100 : 0;
    setTaxPaidPercentage(calculatedTaxPaidPercentage);
  }, [
    income,
    hraReceived,
    rentPaid,
    basicSalary,
    isMetro,
    deductions80C,
    deductionsOther,
    isSenior,
    savingsInterest,
    fdInterest,
    regime,
  ]);

  // Format number as currency
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
        <h2 className="text-2xl font-bold">💰 Income Tax Calculator: Your Personalized Tax Summary 📊</h2>
        <p className="mt-2 text-blue-100">Calculate your income tax liability with our easy-to-use calculator</p>
      </div>

      <div className="p-6">
        {/* Tax Regime Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Select Tax Regime</h3>
          <div className="flex space-x-4">
            <button
              onClick={() => setRegime('new')}
              className={`px-6 py-3 rounded-lg font-medium ${
                regime === 'new'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              New Tax Regime
            </button>
            <button
              onClick={() => setRegime('old')}
              className={`px-6 py-3 rounded-lg font-medium ${
                regime === 'old'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Old Tax Regime
            </button>
          </div>
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              {regime === 'new' ? (
                <>
                  <strong>New Tax Regime:</strong> Lower tax rates but fewer deductions. Standard deduction of ₹50,000 available.
                  No tax up to ₹7 lakh income.
                </>
              ) : (
                <>
                  <strong>Old Tax Regime:</strong> Higher tax rates but multiple deductions and exemptions available.
                  No tax up to ₹5 lakh income.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Inputs */}
          <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Enter Your Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Income (₹)
                </label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {regime === 'old' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      HRA Received (₹)
                    </label>
                    <input
                      type="number"
                      value={hraReceived}
                      onChange={(e) => setHraReceived(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rent Paid (₹)
                    </label>
                    <input
                      type="number"
                      value={rentPaid}
                      onChange={(e) => setRentPaid(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Basic Salary (₹)
                    </label>
                    <input
                      type="number"
                      value={basicSalary}
                      onChange={(e) => setBasicSalary(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isMetro"
                      checked={isMetro}
                      onChange={(e) => setIsMetro(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isMetro" className="ml-2 block text-sm text-gray-700">
                      Do you live in a Metro City?
                    </label>
                  </div>
                </>
              )}
            </div>

            {regime === 'old' && (
              <>
                <h3 className="text-lg font-semibold text-blue-900 mt-6 mb-4">Deductions</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section 80C Deductions (₹) - Max ₹1,50,000
                    </label>
                    <input
                      type="number"
                      value={deductions80C}
                      onChange={(e) => handle80CDeduction(Number(e.target.value))}
                      max={150000}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {deductions80C === 150000 && (
                      <p className="text-sm text-yellow-600 mt-1">
                        Maximum limit of ₹1,50,000 reached
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Other Deductions (₹)
                    </label>
                    <input
                      type="number"
                      value={deductionsOther}
                      onChange={(e) => setDeductionsOther(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isSenior"
                      checked={isSenior}
                      onChange={(e) => setIsSenior(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isSenior" className="ml-2 block text-sm text-gray-700">
                      Are you a Senior Citizen? (60+ years)
                    </label>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-blue-900 mt-6 mb-4">Interest Income</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Savings Account Interest (₹)
                    </label>
                    <input
                      type="number"
                      value={savingsInterest}
                      onChange={(e) => setSavingsInterest(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fixed Deposit Interest (₹)
                    </label>
                    <input
                      type="number"
                      value={fdInterest}
                      onChange={(e) => setFdInterest(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-blue-900 mb-6">📊 Tax Calculation Summary</h3>
            
            {/* Regime Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className={`p-4 rounded-lg ${regime === 'new' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-blue-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-900">New Regime Tax</h4>
                  {regime === 'new' && <span className="text-blue-700 text-sm">Selected</span>}
                </div>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(newRegimeTax)}</p>
                <p className="text-sm text-blue-700 mt-1">With standard deduction of ₹50,000</p>
              </div>
              
              <div className={`p-4 rounded-lg ${regime === 'old' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-blue-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-blue-900">Old Regime Tax</h4>
                  {regime === 'old' && <span className="text-blue-700 text-sm">Selected</span>}
                </div>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(oldRegimeTax)}</p>
                <p className="text-sm text-blue-700 mt-1">With all applicable deductions</p>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-blue-700">💵 Gross Income</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(income)}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-blue-700">📉 Taxable Income</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(taxableIncome)}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-blue-700">💰 Total Tax</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalTax)}</p>
              </div>
            </div>
            
            {/* Tax Breakdown Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <h4 className="bg-blue-900 text-white px-6 py-3 font-semibold">📋 Tax Breakdown</h4>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount (₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Annual Income</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(income)}</td>
                    </tr>
                    {regime === 'old' ? (
                      <>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">HRA Exemption</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(hraExemption)}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">80C Deductions</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(deductions80C)}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Other Deductions</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(deductionsOther)}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {isSenior ? '80TTB Deduction (Senior Citizen)' : '80TTA Deduction (Non-Senior)'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(interestDeduction)}</td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Standard Deduction</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(50000)}</td>
                      </tr>
                    )}
                    <tr className="bg-blue-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">Total Deductions</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900 text-right">{formatCurrency(totalDeductions)}</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">Taxable Income</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900 text-right">{formatCurrency(taxableIncome)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tax (Before Cess)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(tax)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4% Cess</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(cess)}</td>
                    </tr>
                    <tr className="bg-blue-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-900">Total Tax Payable</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-900 text-right">{formatCurrency(totalTax)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tax Paid (%)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{taxPaidPercentage.toFixed(2)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Tax Saving Tips */}
            <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="text-lg font-semibold text-green-800 mb-2">💡 Tax Saving Tips</h4>
              {regime === 'old' ? (
                <ul className="list-disc pl-5 text-sm text-green-800 space-y-1">
                  <li>Maximize your 80C investments (up to ₹1,50,000)</li>
                  <li>Consider investing in tax-saving instruments like ELSS, PPF, or NPS</li>
                  <li>Claim deductions for health insurance premiums under Section 80D</li>
                  <li>If you have a home loan, claim interest deduction under Section 24</li>
                </ul>
              ) : (
                <ul className="list-disc pl-5 text-sm text-green-800 space-y-1">
                  <li>The new tax regime offers lower tax rates but fewer deductions</li>
                  <li>Standard deduction of ₹50,000 is available</li>
                  <li>No tax up to ₹7 lakh income under new regime</li>
                  <li>Compare both regimes to choose the most beneficial option</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;