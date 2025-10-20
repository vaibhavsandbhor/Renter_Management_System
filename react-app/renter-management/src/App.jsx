import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Home, Users, CreditCard, FileText, Building2, TrendingUp,
  Calendar, DollarSign, CheckCircle, Clock, Phone, Mail,
  MapPin, Filter, Download
} from 'lucide-react';

const RenterManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedWing, setSelectedWing] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('2025-10');

  const [dashboardStats, setDashboardStats] = useState({});
  const [renters, setRenters] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [wingReport, setWingReport] = useState([]);

  // ✅ Fetch all data from backend
  useEffect(() => {
    fetchDashboard();
    fetchRenters();
    fetchTransactions(selectedMonth);
    fetchWingReport();
  }, [selectedMonth]);

  // ---------------- Fetch Methods ----------------
  const fetchDashboard = async () => {
    try {
      const res = await axios.get('http://localhost:8085/dashboard/dashboardsummary');
      setDashboardStats(res.data);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    }
  };

  const fetchRenters = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/renters');
      setRenters(res.data);
    } catch (err) {
      console.error('Error fetching renters:', err);
    }
  };

  const fetchTransactions = async (month) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/transactions?month=${month}`);
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  const fetchWingReport = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/wing-report');
      setWingReport(res.data);
    } catch (err) {
      console.error('Error fetching wing report:', err);
    }
  };

  // 🔹 Filtered data (keep same logic)
  const filteredRenters =
    selectedWing === 'all'
      ? renters
      : renters.filter((r) => r.wing === selectedWing);

  const filteredTransactions = transactions.filter((txn) =>
    txn.month?.startsWith(selectedMonth)
  );

  // ------------------- UI -------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
          <Home className="text-blue-600" size={36} />
          Renter Management System
        </h1>
        <div className="flex gap-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 rounded-lg border shadow-sm"
          >
            <option value="2025-10">October 2025</option>
            <option value="2025-09">September 2025</option>
            <option value="2025-08">August 2025</option>
          </select>
          <select
            value={selectedWing}
            onChange={(e) => setSelectedWing(e.target.value)}
            className="px-3 py-2 rounded-lg border shadow-sm"
          >
            <option value="all">All Wings</option>
            <option value="A">Wing A</option>
            <option value="B">Wing B</option>
            <option value="C">Wing C</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {[
          { key: 'dashboard', label: 'Dashboard', icon: <TrendingUp size={18} /> },
          { key: 'renters', label: 'Renters', icon: <Users size={18} /> },
          { key: 'transactions', label: 'Transactions', icon: <CreditCard size={18} /> },
          { key: 'reports', label: 'Reports', icon: <FileText size={18} /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-blue-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ----------- Dashboard Tab ----------- */}
      {activeTab === 'dashboard' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-green-500" />
              <h2 className="font-semibold text-gray-700">Total Rent Collected</h2>
            </div>
            <p className="text-2xl font-bold text-green-600">
              ₹{dashboardStats.totalRentCollected || 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="text-red-500" />
              <h2 className="font-semibold text-gray-700">Pending Rent</h2>
            </div>
            <p className="text-2xl font-bold text-red-600">
              ₹{dashboardStats.totalRentPending || 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-blue-500" />
              <h2 className="font-semibold text-gray-700">Total Renters</h2>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {dashboardStats.totalRenters || 0}
            </p>
          </div>
        </div>
      )}

      {/* ----------- Renters Tab ----------- */}
      {activeTab === 'renters' && (
        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Flat</th>
                <th className="p-2">Wing</th>
                <th className="p-2">Rent</th>
                <th className="p-2">Status</th>
                <th className="p-2">Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredRenters.map((renter) => (
                <tr key={renter.id} className="border-t hover:bg-blue-50">
                  <td className="p-2 font-medium">{renter.name}</td>
                  <td className="p-2">{renter.flat}</td>
                  <td className="p-2">{renter.wing}</td>
                  <td className="p-2">₹{renter.rent}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 text-sm rounded-lg ${
                        renter.status === 'active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {renter.status}
                    </span>
                  </td>
                  <td className="p-2 flex gap-2 text-gray-600">
                    <Phone size={16} />
                    <Mail size={16} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ----------- Transactions Tab ----------- */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-2">Date</th>
                <th className="p-2">Renter</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Type</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="border-t hover:bg-blue-50">
                  <td className="p-2">{txn.date}</td>
                  <td className="p-2">{txn.renter}</td>
                  <td className="p-2">₹{txn.amount}</td>
                  <td className="p-2">{txn.type}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 text-sm rounded-lg ${
                        txn.status === 'completed'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ----------- Reports Tab ----------- */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-2xl shadow p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="p-2">Wing</th>
                <th className="p-2">Total Flats</th>
                <th className="p-2">Occupied</th>
                <th className="p-2">Vacant</th>
                <th className="p-2">Collected</th>
                <th className="p-2">Pending</th>
              </tr>
            </thead>
            <tbody>
              {wingReport.map((w) => (
                <tr key={w.wing} className="border-t hover:bg-blue-50">
                  <td className="p-2 font-medium">{w.wing}</td>
                  <td className="p-2">{w.totalFlats}</td>
                  <td className="p-2 text-green-600">{w.occupied}</td>
                  <td className="p-2 text-red-500">{w.vacant}</td>
                  <td className="p-2 text-green-700 font-medium">₹{w.collected}</td>
                  <td className="p-2 text-red-600 font-medium">₹{w.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RenterManagementSystem;
