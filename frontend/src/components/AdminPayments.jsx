import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';
import { 
  CreditCard, Landmark, DollarSign, ArrowUpRight, CheckCircle2, 
  AlertCircle, RefreshCw, ShieldCheck, ExternalLink, Settings, 
  Building2, Smartphone, Wallet, Search, Filter, RotateCcw, 
  Lock, Check, ArrowRight, Globe2, Sparkles, Layers
} from 'lucide-react';

export default function AdminPayments({ currentMarket = 'US' }) {
  const [activeSubTab, setActiveSubTab] = useState('transactions'); // 'transactions' | 'merchant_accounts'
  const [transactions, setTransactions] = useState([]);
  const [merchantConfigs, setMerchantConfigs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMethod, setFilterMethod] = useState('ALL');
  const [filterCountry, setFilterCountry] = useState('ALL');
  const [editingConfig, setEditingConfig] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [txRes, cfgRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/api/payments/transactions`),
        fetch(`${API_BASE}/api/payments/config`),
        fetch(`${API_BASE}/api/payments/stats`)
      ]);

      if (txRes.ok) setTransactions(await txRes.json());
      if (cfgRes.ok) setMerchantConfigs(await cfgRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (err) {
      console.error(err);
      showToast('Error connecting to Payments API', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    if (!editingConfig) return;

    try {
      const res = await fetch(`${API_BASE}/api/payments/config/${editingConfig.gateway_name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingConfig)
      });

      if (res.ok) {
        const updated = await res.json();
        setMerchantConfigs(prev => prev.map(c => c.gateway_name === updated.gateway_name ? updated : c));
        setEditingConfig(null);
        showToast(`Merchant account settings for ${updated.display_title} updated!`);
      } else {
        showToast('Failed to update merchant configuration', 'error');
      }
    } catch (err) {
      showToast('Server error while saving account settings', 'error');
    }
  };

  const handleRefund = async (transaction) => {
    if (!window.confirm(`Issue full refund of ${transaction.currency} ${transaction.amount} for ${transaction.transaction_id}?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/payments/refund/${transaction.transaction_id}`, {
        method: 'POST'
      });
      if (res.ok) {
        showToast(`Refund processed for ${transaction.transaction_id}`);
        fetchData();
      } else {
        showToast('Failed to issue refund', 'error');
      }
    } catch (err) {
      showToast('Network error processing refund', 'error');
    }
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = 
      t.transaction_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customer_email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMethod = filterMethod === 'ALL' || t.payment_method === filterMethod;
    const matchesCountry = filterCountry === 'ALL' || t.country === filterCountry;

    return matchesSearch && matchesMethod && matchesCountry;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-20 right-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium transition-all ${
          toast.type === 'error'
            ? 'bg-rose-950/90 text-rose-200 border-rose-500/40'
            : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4 text-rose-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white tracking-tight">Payment Gateways & Merchant Accounts</h1>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live Multi-Currency
              </span>
            </div>
            <p className="text-xs text-slate-400">Configure business bank accounts, gateway credentials, and audit incoming customer transactions</p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>

          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveSubTab('transactions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeSubTab === 'transactions'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Transaction Ledger
            </button>
            <button
              onClick={() => setActiveSubTab('merchant_accounts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeSubTab === 'merchant_accounts'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Merchant Accounts ({merchantConfigs.length})
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Gross Volume (USD)</span>
            <span className="text-emerald-400 font-bold">🇺🇸 United States</span>
          </div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            ${stats?.volume?.USD?.toFixed(2) || '0.00'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Settles daily to Chase Checking (•••• 4821)</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Gross Volume (GBP)</span>
            <span className="text-indigo-400 font-bold">🇬🇧 United Kingdom</span>
          </div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            £{stats?.volume?.GBP?.toFixed(2) || '0.00'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Settles via Barclays Faster Payments (•••• 4109)</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Gross Volume (CAD)</span>
            <span className="text-amber-400 font-bold">🇨🇦 Canada</span>
          </div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            CA${stats?.volume?.CAD?.toFixed(2) || '0.00'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Auto-Deposits to RBC Commercial (•••• 7311)</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Total Transactions</span>
            <span className="text-emerald-400 font-bold">99.8% Success</span>
          </div>
          <div className="text-2xl font-black text-white font-mono mt-2">
            {transactions.length} orders
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Across 6 supported payment rails</p>
        </div>
      </div>

      {/* Subtab 1: Transactions Ledger */}
      {activeSubTab === 'transactions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-6">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search Txn ID, Order #, customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
              >
                <option value="ALL">All Markets</option>
                <option value="US">🇺🇸 USA</option>
                <option value="UK">🇬🇧 UK</option>
                <option value="CA">🇨🇦 Canada</option>
              </select>

              <select
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none"
              >
                <option value="ALL">All Payment Methods</option>
                <option value="card">💳 Credit/Debit Card</option>
                <option value="apple_pay">🍏 Apple Pay</option>
                <option value="google_pay">🌐 Google Pay</option>
                <option value="paypal">🅿️ PayPal</option>
                <option value="bank_transfer">🏦 Bank Transfer</option>
                <option value="klarna">🛍️ Klarna</option>
              </select>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Txn Reference</th>
                  <th className="px-4 py-3">Order #</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Payment Method</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Settlement Account</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-slate-500">
                      No payment transactions match the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3 font-mono text-indigo-400 text-xs font-bold">
                        {tx.transaction_id}
                        <span className="block text-[10px] text-slate-500 font-sans">
                          {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>

                      <td className="px-4 py-3 font-mono text-slate-300">
                        {tx.order_number}
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-white font-semibold">{tx.customer_name}</div>
                        <div className="text-[11px] text-slate-400">{tx.customer_email}</div>
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-[11px]">
                          {tx.payment_method === 'card' && <span>💳 Card</span>}
                          {tx.payment_method === 'apple_pay' && <span>🍏 Apple Pay</span>}
                          {tx.payment_method === 'google_pay' && <span>🌐 Google Pay</span>}
                          {tx.payment_method === 'paypal' && <span>🅿️ PayPal</span>}
                          {tx.payment_method === 'bank_transfer' && <span>🏦 Bank Transfer</span>}
                          {tx.payment_method === 'klarna' && <span>🛍️ Klarna</span>}
                        </span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">{tx.gateway_provider}</span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-sm font-bold text-white font-mono">
                          {tx.currency === 'USD' ? '$' : tx.currency === 'GBP' ? '£' : 'CA$'}{tx.amount.toFixed(2)}
                        </span>
                        <span className="block text-[10px] text-slate-500">{tx.currency}</span>
                      </td>

                      <td className="px-4 py-3 text-slate-300 text-[11px]">
                        <div className="flex items-center space-x-1">
                          <Building2 className="w-3 h-3 text-emerald-400" />
                          <span className="truncate max-w-[200px]" title={tx.merchant_payout_account}>
                            {tx.merchant_payout_account}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        {tx.status === 'SETTLED' ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                            SETTLED
                          </span>
                        ) : tx.status === 'REFUNDED' ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                            REFUNDED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                            {tx.status}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-right">
                        {tx.status !== 'REFUNDED' ? (
                          <button
                            onClick={() => handleRefund(tx)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition flex items-center space-x-1 ml-auto"
                            title="Simulate Refund"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Refund</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-500 italic">Refunded</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 2: Merchant Accounts & Settlement Settings */}
      {activeSubTab === 'merchant_accounts' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchantConfigs.map((cfg) => (
              <div 
                key={cfg.gateway_name}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                        {cfg.gateway_name === 'stripe' && <CreditCard className="w-5 h-5" />}
                        {cfg.gateway_name === 'paypal' && <Wallet className="w-5 h-5" />}
                        {cfg.gateway_name.includes('bank') && <Landmark className="w-5 h-5" />}
                        {cfg.gateway_name === 'klarna' && <Smartphone className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">{cfg.display_title}</h3>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">
                          Settlement: {cfg.settlement_currency}
                        </span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      cfg.is_enabled 
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-500 border-slate-700'
                    }`}>
                      {cfg.is_enabled ? 'ENABLED' : 'PAUSED'}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px] block">Merchant ID / Account Ref:</span>
                      <p className="font-mono text-white text-xs bg-slate-950 p-2 rounded-lg border border-slate-800 mt-1 truncate">
                        {cfg.account_id || 'Not configured'}
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[11px] block">Payout Bank / Destination:</span>
                      <div className="flex items-center space-x-1.5 text-emerald-400 mt-1 font-medium bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/20">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{cfg.payout_bank}</span>
                      </div>
                    </div>

                    {cfg.details && (
                      <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                        {cfg.details.methods_supported && (
                          <div>
                            <span className="text-slate-500">Methods: </span>
                            <span className="text-slate-300">{cfg.details.methods_supported.join(', ')}</span>
                          </div>
                        )}
                        {cfg.details.payout_schedule && (
                          <div>
                            <span className="text-slate-500">Schedule: </span>
                            <span className="text-slate-300">{cfg.details.payout_schedule}</span>
                          </div>
                        )}
                        {cfg.details.settlement_time && (
                          <div>
                            <span className="text-slate-500">Clearance: </span>
                            <span className="text-slate-300">{cfg.details.settlement_time}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    Mode: <strong className="text-indigo-400">{cfg.environment}</strong>
                  </span>
                  <button
                    onClick={() => setEditingConfig({ ...cfg })}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 transition"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Edit Destination</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Merchant Account Modal */}
      {editingConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-white text-sm">Configure Payout Account</h3>
              </div>
              <button onClick={() => setEditingConfig(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Gateway Title</label>
                <input
                  type="text"
                  value={editingConfig.display_title}
                  onChange={(e) => setEditingConfig({ ...editingConfig, display_title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Merchant Account ID / Email</label>
                <input
                  type="text"
                  value={editingConfig.account_id || ''}
                  onChange={(e) => setEditingConfig({ ...editingConfig, account_id: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Deposit Bank & Account (Where customer funds arrive)</label>
                <input
                  type="text"
                  value={editingConfig.payout_bank || ''}
                  onChange={(e) => setEditingConfig({ ...editingConfig, payout_bank: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Settlement Currency</label>
                  <select
                    value={editingConfig.settlement_currency}
                    onChange={(e) => setEditingConfig({ ...editingConfig, settlement_currency: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD (CA$)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Environment</label>
                  <select
                    value={editingConfig.environment}
                    onChange={(e) => setEditingConfig({ ...editingConfig, environment: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="live">Live Production</option>
                    <option value="test">Sandbox / Test</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="enableGateway"
                  checked={editingConfig.is_enabled}
                  onChange={(e) => setEditingConfig({ ...editingConfig, is_enabled: e.target.checked })}
                  className="rounded text-indigo-600 focus:ring-0"
                />
                <label htmlFor="enableGateway" className="text-slate-300 font-semibold cursor-pointer">
                  Enable this gateway for checkout in {editingConfig.settlement_currency}
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingConfig(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
