import React, { useState } from 'react';
import { Home, Users, CreditCard, FileText, Building2, TrendingUp, Calendar, DollarSign, CheckCircle, Clock, Phone, Mail, MapPin, Filter, Download } from 'lucide-react';

const RenterManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedWing, setSelectedWing] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('2025-10');

  // Sample data
  const dashboardStats = {
    totalRentPending: 45000,
    totalRentCollected: 125000,
    totalDeposit: 350000,
    totalRenters: 24,
    occupancyRate: 92
  };

  const renters = [
    { id: 1, name: 'Rajesh Kumar', flat: 'A-101', wing: 'A', rent: 15000, status: 'paid', phone: '9876543210', email: 'rajesh@email.com', deposit: 30000, joinDate: '2024-01-15' },
    { id: 2, name: 'Priya Sharma', flat: 'A-102', wing: 'A', rent: 18000, status: 'pending', phone: '9876543211', email: 'priya@email.com', deposit: 36000, joinDate: '2024-02-20' },
    { id: 3, name: 'Amit Patel', flat: 'B-201', wing: 'B', rent: 12000, status: 'paid', phone: '9876543212', email: 'amit@email.com', deposit: 24000, joinDate: '2023-11-10' },
    { id: 4, name: 'Sneha Desai', flat: 'B-202', wing: 'B', rent: 16000, status: 'pending', phone: '9876543213', email: 'sneha@email.com', deposit: 32000, joinDate: '2024-03-05' },
    { id: 5, name: 'Vikram Singh', flat: 'C-301', wing: 'C', rent: 20000, status: 'paid', phone: '9876543214', email: 'vikram@email.com', deposit: 40000, joinDate: '2023-09-12' },
    { id: 6, name: 'Anita Reddy', flat: 'C-302', wing: 'C', rent: 14000, status: 'pending', phone: '9876543215', email: 'anita@email.com', deposit: 28000, joinDate: '2024-04-18' },
    { id: 7, name: 'Suresh Nair', flat: 'A-103', wing: 'A', rent: 17000, status: 'paid', phone: '9876543216', email: 'suresh@email.com', deposit: 34000, joinDate: '2024-05-22' },
    { id: 8, name: 'Deepa Iyer', flat: 'B-203', wing: 'B', rent: 13000, status: 'paid', phone: '9876543217', email: 'deepa@email.com', deposit: 26000, joinDate: '2024-06-10' }
  ];

  const transactions = [
    { id: 1, renter: 'Rajesh Kumar', flat: 'A-101', wing: 'A', amount: 15000, type: 'Rent', date: '2025-10-01', status: 'completed', month: '2025-10', method: 'UPI' },
    { id: 2, renter: 'Amit Patel', flat: 'B-201', wing: 'B', amount: 12000, type: 'Rent', date: '2025-10-02', status: 'completed', month: '2025-10', method: 'Bank Transfer' },
    { id: 3, renter: 'Vikram Singh', flat: 'C-301', wing: 'C', amount: 20000, type: 'Rent', date: '2025-10-03', status: 'completed', month: '2025-10', method: 'Cash' },
    { id: 4, renter: 'Suresh Nair', flat: 'A-103', wing: 'A', amount: 17000, type: 'Rent', date: '2025-10-04', status: 'completed', month: '2025-10', method: 'UPI' },
    { id: 5, renter: 'Deepa Iyer', flat: 'B-203', wing: 'B', amount: 13000, type: 'Rent', date: '2025-10-05', status: 'completed', month: '2025-10', method: 'Cheque' },
    { id: 6, renter: 'Priya Sharma', flat: 'A-102', wing: 'A', amount: 36000, type: 'Deposit', date: '2024-02-20', status: 'completed', month: '2024-02', method: 'Bank Transfer' },
    { id: 7, renter: 'Sneha Desai', flat: 'B-202', wing: 'B', amount: 16000, type: 'Rent', date: '2025-09-05', status: 'completed', month: '2025-09', method: 'UPI' }
  ];

  const wingReport = [
    { wing: 'A', totalFlats: 10, occupied: 9, vacant: 1, totalRent: 135000, collected: 120000, pending: 15000 },
    { wing: 'B', totalFlats: 8, occupied: 7, vacant: 1, totalRent: 98000, collected: 86000, pending: 12000 },
    { wing: 'C', totalFlats: 8, occupied: 8, vacant: 0, totalRent: 128000, collected: 110000, pending: 18000 }
  ];

  const filteredRenters = selectedWing === 'all' ? renters : renters.filter(r => r.wing === selectedWing);
  const filteredTransactions = transactions.filter(txn => txn.month.startsWith(selectedMonth));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Modern Header */}
      <header className="bg-white shadow-lg border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-2xl shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Renter Management
                </h1>
                <p className="text-sm text-gray-500 mt-1">Property Administration Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-blue-50 px-5 py-3 rounded-xl">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-base font-semibold text-gray-700">October 2025</span>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'renters', label: 'Renters', icon: Users },
              { id: 'transactions', label: 'Transactions', icon: CreditCard },
              { id: 'wing-report', label: 'Wing Report', icon: FileText }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-all rounded-t-xl ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-red-500 hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-red-100 p-3 rounded-xl">
                    <Clock className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Pending Rent</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">₹{dashboardStats.totalRentPending.toLocaleString()}</p>
                <p className="text-xs text-red-600 mt-2 font-semibold">Requires Action</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-green-500 hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Collected (Month)</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">₹{dashboardStats.totalRentCollected.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-2 font-semibold">This Month</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-blue-500 hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Deposits</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">₹{dashboardStats.totalDeposit.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-2 font-semibold">Security Amount</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-purple-500 hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Renters</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">{dashboardStats.totalRenters}</p>
                <p className="text-xs text-purple-600 mt-2 font-semibold">Active Tenants</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-orange-500 hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Occupancy Rate</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">{dashboardStats.occupancyRate}%</p>
                <p className="text-xs text-orange-600 mt-2 font-semibold">Current Rate</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Recent Payment Activity</h3>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-semibold">Export</span>
                </button>
              </div>
              <div className="space-y-4">
                {transactions.slice(0, 5).map(txn => (
                  <div key={txn.id} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:shadow-md transition-all border border-gray-100">
                    <div className="flex items-center space-x-5">
                      <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm">
                        <CheckCircle className="w-7 h-7 text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-lg">{txn.renter}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          <span className="font-semibold text-gray-700">{txn.flat}</span> • {txn.type} • {txn.method}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800 text-xl">₹{txn.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">{txn.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Renters Tab */}
        {activeTab === 'renters' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-800">Renter Directory</h2>
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedWing}
                  onChange={(e) => setSelectedWing(e.target.value)}
                  className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-gray-700 bg-white shadow-sm"
                >
                  <option value="all">All Wings</option>
                  <option value="A">Wing A</option>
                  <option value="B">Wing B</option>
                  <option value="C">Wing C</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRenters.map(renter => (
                <div key={renter.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border border-gray-100">
                  <div className={`h-3 ${renter.status === 'paid' ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`}></div>
                  <div className="p-7">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{renter.name}</h3>
                        <div className="flex items-center space-x-2 mt-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <p className="text-base text-gray-600 font-semibold">{renter.flat}</p>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide shadow-sm ${
                        renter.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {renter.status}
                      </span>
                    </div>
                    
                    <div className="space-y-4 text-base">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500 font-medium">Monthly Rent</span>
                        <span className="font-bold text-gray-800 text-lg">₹{renter.rent.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500 font-medium">Deposit</span>
                        <span className="font-bold text-blue-600 text-lg">₹{renter.deposit.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 py-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold text-gray-700">{renter.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 py-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 text-sm">{renter.email}</span>
                      </div>
                      <div className="pt-3 text-sm text-gray-500">
                        <span className="font-medium">Joined:</span> {renter.joinDate}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-800">Transaction History</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-gray-700 bg-white shadow-sm"
                />
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition shadow-md">
                  <Download className="w-5 h-5" />
                  <span className="font-semibold">Export</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                    <tr>
                      <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Date</th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Renter</th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Flat</th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Wing</th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Type</th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Method</th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Amount</th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredTransactions.map((txn, idx) => (
                      <tr key={txn.id} className={`hover:bg-blue-50 transition ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-8 py-5 text-base text-gray-700 font-medium">{txn.date}</td>
                        <td className="px-8 py-5 text-base font-bold text-gray-800">{txn.renter}</td>
                        <td className="px-8 py-5 text-base text-gray-700 font-semibold">{txn.flat}</td>
                        <td className="px-8 py-5">
                          <span className="px-3 py-1 rounded-lg text-sm font-bold bg-blue-100 text-blue-700">
                            {txn.wing}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${
                            txn.type === 'Rent' ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {txn.type}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-base text-gray-600 font-medium">{txn.method}</td>
                        <td className="px-8 py-5 text-lg font-bold text-gray-800">₹{txn.amount.toLocaleString()}</td>
                        <td className="px-8 py-5">
                          <span className="px-4 py-2 rounded-xl text-sm font-bold bg-green-100 text-green-700 shadow-sm">
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Wing Report Tab */}
        {activeTab === 'wing-report' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-800">Wing-wise Rent Report</h2>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition shadow-md">
                <Download className="w-5 h-5" />
                <span className="font-semibold">Download Report</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {wingReport.map(wing => (
                <div key={wing.wing} className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500 hover:shadow-2xl transition-all">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-4xl font-bold text-gray-800">Wing {wing.wing}</h3>
                      <p className="text-gray-500 mt-1 font-medium">Building Section</p>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-2xl">
                      <Building2 className="w-10 h-10 text-blue-600" />
                    </div>
                  </div>

                  <div className="space-y-5 mb-8">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-semibold text-base">Total Flats</span>
                      <span className="text-2xl font-bold text-gray-800">{wing.totalFlats}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                      <span className="text-green-700 font-semibold text-base">Occupied</span>
                      <span className="text-2xl font-bold text-green-600">{wing.occupied}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                      <span className="text-orange-700 font-semibold text-base">Vacant</span>
                      <span className="text-2xl font-bold text-orange-600">{wing.vacant}</span>
                    </div>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6 space-y-5">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-semibold text-base">Total Rent</span>
                      <span className="text-xl font-bold text-gray-800">₹{wing.totalRent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-700 font-semibold text-base">Collected</span>
                      <span className="text-xl font-bold text-green-600">₹{wing.collected.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-700 font-semibold text-base">Pending</span>
                      <span className="text-xl font-bold text-red-600">₹{wing.pending.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-600 font-semibold text-sm">Collection Rate</span>
                      <span className="text-lg font-bold text-blue-600">{Math.round((wing.collected / wing.totalRent) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all shadow-md"
                        style={{ width: `${(wing.collected / wing.totalRent) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RenterManagementSystem;