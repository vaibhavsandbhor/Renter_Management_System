import React, { useState, useEffect } from 'react';


import moment from 'moment';
import axios from 'axios';
import { Home, Users, CreditCard, FileText, Building2, TrendingUp, Calendar, DollarSign, CheckCircle, Clock, Phone, Mail, MapPin, Filter, Download } from 'lucide-react';

const RenterManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedWing, setSelectedWing] = useState('all');
const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));
   // const [selectedWing, setSelectedWing] = useState("all");

   

    const [dashboardStats, setDashboardStats] = useState({});
const [renters, setRenters] = useState([]);
const [transactions, setTransactions] = useState([]);
  const [wingReport, setWingReport] = useState([]);

      useEffect(() => {
    fetchDashboard();
     fetchRenters();
    fetchTransactions(selectedMonth);
    fetchWingReport();
  }, [selectedMonth]);
  // const [renters, setRenters] = useState([]);
   //const [transactions, setTransactions] = useState([]);
  // const [wingReport, setWingReport] = useState([]);



const now = new Date();
const currentMonth = now.toLocaleString("default", { month: "long" }); // e.g. "October"
const currentYear = now.getFullYear(); 

  const [showAddTransaction, setShowAddTransaction] = useState(false);

  // const [selectedWing, setSelectedWing] = useState('All');

const [newTransaction, setNewTransaction] = useState({
  date: "",
  renterName: "",
  flat: "",
  wing: "",
  type: "Rent",
  method: "Cash",
  amount: "",
  status: "Paid"
});

  // Sample data
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
    const res = await axios.get('http://localhost:8085/renter/getALLrenters');

    console.log("Fetched renters:", res.data);

    const data = res.data;


    // Ensure it's an array before setting
    if (Array.isArray(data)) {
      setRenters(data);
    } else if (data?.data && Array.isArray(data.data)) {
      // If backend wraps data inside 'data' key
      setRenters(data.data);
    } else {
      console.error("Unexpected response format:", data);
      setRenters([]); // fallback
    }
  } catch (err) {
    console.error('Error fetching renters:', err);
    setRenters([]);
  }
};


const handleAddTransaction = async () => {
  try {
    // Optional backend call:
    await axios.post("http://localhost:8085/rentertranscation/addTransaction", newTransaction);

    // Update local state instantly
    setTransactions([newTransaction, ...transactions]);

    // Close modal
    setShowAddTransaction(false);

    // Reset form
    setNewTransaction({
      date: "",
      renterName: "",
      flat: "",
      wing: "",
      type: "Rent",
      method: "Cash",
      amount: "",
      status: "Paid"
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
  }
};


const fetchTransactions = async (monthYear) => {

  
  try {
    const res = await axios.get('http://localhost:8085/rentertranscation/by-month', {
      params: {
        monthYear: monthYear,
   
      }
    });

    console.log("Fetched transactions:", res.data);
    
    if (Array.isArray(res.data)) {
      setTransactions(res.data);
    } else {
      console.error("Unexpected data format:", res.data);
      setTransactions([]);
    }

  } catch (err) {
    console.error("Error fetching transactions:", err);
    setTransactions([]);
  }
};





const filteredRenters = Array.isArray(renters)
  ? renters.filter(
      (renter) =>
        selectedWing === "all" ||
        renter.wingName?.toUpperCase().startsWith(selectedWing)
    )
  : [];

const [showAddModal, setShowAddModal] = useState(false);
const [newRenter, setNewRenter] = useState({
  renterName: "",
  mobileNo: "",
  adharNo: "",
  email: "",
  depositAmount: "",
  moveInDate: "",
  wingName: "",
  flatName: "",
});

const [errors, setErrors] = useState({});

// 🔹 Validation function
const validateField = (name, value) => {
  switch (name) {
    case "renterName":
      if (!value.trim()) return "Renter name is required";
      if (!/^[A-Za-z\s]+$/.test(value)) return "Only letters are allowed";
      break;

    case "mobileNo":
      if (!/^\d{10}$/.test(value)) return "Mobile number must be 10 digits";
      break;

    case "adharNo":
      if (!/^\d{12}$/.test(value)) return "Aadhaar must be exactly 12 digits";
      break;

    case "email":
      if (value && !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value))
        return "Invalid email address";
      break;

    case "depositAmount":
      if (!value || isNaN(value) || value <= 0)
        return "Deposit must be a positive number";
      break;

    case "moveInDate":
      if (!value) return "Move-in date is required";
      break;

    case "wingName":
      if (!value) return "Please select a wing";
      break;

    case "flatName":
      if (!value.trim()) return "Flat number is required";
      break;

    default:
      return "";
  }
  return "";
};


  const isValidAadhaar = (number) => /^[2-9]{1}[0-9]{11}$/.test(number);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidAadhaar(newRenter.adharNo)) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    // Submit via Axios or other logic here
    console.log("✅ Renter data:", newRenter);
  };



  const fetchWingReport =  async () => {
    
   try {
    const res = await axios.get('http://localhost:8085/wingreport/report');

    console.log("Fetched renters:", res.data);

    const data = res.data;


    // Ensure it's an array before setting
    if (Array.isArray(data)) {
      setWingReport(data);
    } else if (data?.data && Array.isArray(data.data)) {
      // If backend wraps data inside 'data' key
      setWingReport(data.data);
    } else {
      console.error("Unexpected response format:", data);
      setRenters([]); // fallback
    }
  } catch (err) {
    console.error('Error fetching renters:', err);
    setRenters([]);
  }
};

  // const filteredRenters = selectedWing === 'all' ? renters : renters.filter(r => r.wing === selectedWing);
const filteredTransactions = transactions.filter(
  txn => txn.month?.startsWith(selectedMonth)
);

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
      <span className="text-base font-semibold text-gray-700">
        {`${currentMonth} ${currentYear}`}
      </span>
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
                <p className="text-4xl font-bold text-gray-800 mt-2"> ₹{dashboardStats.pendingRent || 0}</p>
                <p className="text-xs text-red-600 mt-2 font-semibold">Requires Action</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-green-500 hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Collected (Month)</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">   ₹{dashboardStats.collectedThisMonth || 0}</p>
                <p className="text-xs text-green-600 mt-2 font-semibold">This Month</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-blue-500 hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Deposits</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">₹{dashboardStats.totalDeposits}</p>
                <p className="text-xs text-blue-600 mt-2 font-semibold">Security Amount</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-purple-500 hover:shadow-2xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Renters</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">   {dashboardStats.totalRenters || 0}</p>
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
          <option value="D">Wing D</option>
        </select>

        {/* ✅ Add Renter Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-blue-600 text-white px-5 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          <Users className="w-4 h-4 mr-2" />
          Add Renter
        </button>
      </div>
    </div>

    {/* ✅ Add Renter Modal */}
    {showAddModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Add New Renter
          </h3>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await axios.post("http://localhost:8085/renter/addRenter", newRenter);
                alert("✅ Renter added successfully!");
                setShowAddModal(false);
                fetchRenters();
              } catch (err) {
                console.error("Error adding renter:", err);
                alert("❌ Failed to add renter");
              }
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Renter Name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newRenter.renterName}
              onChange={(e) =>
                setNewRenter({ ...newRenter, renterName: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Mobile No"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newRenter.mobileNo}
              onChange={(e) =>
                setNewRenter({ ...newRenter, mobileNo: e.target.value })
              }
              required
            />

            <input
  type="text"
  placeholder="Aadhaar Number"
  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
  value={newRenter.adharNo}
  onChange={(e) =>
    setNewRenter({ ...newRenter, adharNo: e.target.value })
  }
/>
i
            <input
              type="number"
              placeholder="Deposit Amount"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newRenter.depositAmount}
              onChange={(e) =>
                setNewRenter({ ...newRenter, depositAmount: e.target.value })
              }
            />
            <input
              type="date"
              placeholder="Move In Date"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newRenter.moveInDate}
              onChange={(e) =>
                setNewRenter({ ...newRenter, moveInDate: e.target.value })
              }
            />
            <select
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newRenter.wingName}
              onChange={(e) =>
                setNewRenter({ ...newRenter, wingName: e.target.value })
              }
              required
            >
              <option value="">Select Wing</option>
              <option value="A Wing">Wing A</option>
              <option value="B Wing">Wing B</option>
              <option value="C Wing">Wing C</option>
              <option value="D Wing">Wing D</option>
            </select>

            <input
              type="text"
              placeholder="Flat No (e.g. A-101)"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newRenter.flatName}
              onChange={(e) =>
                setNewRenter({ ...newRenter, flatName: e.target.value })
              }
            />

            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 rounded-xl bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Save Renter
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* ✅ Renter Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRenters.map((renter) => (
        <div
          key={renter.renterId}
          className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
        >
          <div
            className={`h-3 ${
              renter.isActive
                ? "bg-gradient-to-r from-green-400 to-green-600"
                : "bg-gradient-to-r from-red-400 to-red-600"
            }`}
          ></div>

          <div className="p-7">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {renter.renterName}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="text-base text-gray-600 font-semibold">
                    {renter.wingName} - {renter.flatName}
                  </p>
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide shadow-sm ${
                  renter.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {renter.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="space-y-4 text-base">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Deposit</span>
                <span className="font-bold text-blue-600 text-lg">
                  ₹{renter.depositAmount?.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2 py-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-gray-700">
                  {renter.mobileNo}
                </span>
              </div>
              <div className="flex items-center space-x-2 py-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 text-sm">{renter.email}</span>
              </div>

              
              <div className="pt-3 text-sm text-gray-500">
                <span className="font-medium">Move In:</span>{" "}
                {renter.moveInDate}
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
              <h2 className="text-3xl font-bold text-gray-800">Monthly Transaction</h2>
                <button
    onClick={() => setShowAddTransaction(true)}
    className="flex items-center space-x-2 bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition shadow-md"
  >
    <span className="font-semibold">+ Add Transaction</span>
  </button>
            <div className="flex items-center space-x-4">
   <select
          value={selectedWing}
          onChange={(e) => setSelectedWing(e.target.value)}
          className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-gray-700 bg-white shadow-sm"
        >
          <option value="all">All Wings</option>
          <option value="A">Wing A</option>
          <option value="B">Wing B</option>
          <option value="C">Wing C</option>
          <option value="D">Wing D</option>
        </select>

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


{showAddTransaction && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Add New Transaction</h3>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          value={newTransaction.date}
          onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          className="border border-gray-300 p-3 rounded-lg"
          placeholder="Date"
        />
        <input
          type="text"
          value={newTransaction.renterName}
          onChange={(e) => setNewTransaction({ ...newTransaction, renterName: e.target.value })}
          className="border border-gray-300 p-3 rounded-lg"
          placeholder="Renter Name"
        />
        <input
          type="text"
          value={newTransaction.flat}
          onChange={(e) => setNewTransaction({ ...newTransaction, flat: e.target.value })}
          className="border border-gray-300 p-3 rounded-lg"
          placeholder="Flat"
        />
     <select
        value={newTransaction.wing}
        onChange={(e) => setNewTransaction({ ...newTransaction, wing: e.target.value })}
        className="w-full border rounded-lg px-4 py-2"
      >
        <option value="A Wing">Wing A</option>
        <option value="B Wing">Wing B</option>
        <option value="C Wing">Wing C</option>
        <option value="D Wing">Wing D</option>
      </select>


        <select
          value={newTransaction.type}
          onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
          className="border border-gray-300 p-3 rounded-lg"
        >
          <option>Rent</option>
          <option>Maintenance</option>
        </select>

        <select
          value={newTransaction.method}
          onChange={(e) => setNewTransaction({ ...newTransaction, method: e.target.value })}
          className="border border-gray-300 p-3 rounded-lg"
        >
          <option>Cash</option>
          <option>UPI</option>
          <option>Cheque</option>
        </select>

        <input
          type="number"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          className="border border-gray-300 p-3 rounded-lg col-span-2"
          placeholder="Amount"
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          onClick={() => setShowAddTransaction(false)}
          className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleAddTransaction}
          className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}



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
                    {transactions.map((txn, idx) => (
                      <tr key={txn.id} className={`hover:bg-blue-50 transition ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-8 py-5 text-base text-gray-700 font-medium">{txn.date}</td>
                        <td className="px-8 py-5 text-base font-bold text-gray-800">{txn.renterName}</td>
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
                      <h3 className="text-4xl font-bold text-gray-800"> {wing.wing}</h3>
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