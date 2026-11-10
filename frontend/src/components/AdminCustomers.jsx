import React, { useState, useEffect } from 'react';
import { 
  Users, UserCheck, UserPlus, Award, ShieldCheck, Gift, Percent, 
  Search, Filter, CheckCircle2, XCircle, Sparkles, Clock, 
  ExternalLink, Download, Phone, Mail, Globe2, Tag, ChevronDown,
  Trash2, Edit3, ArrowRight, Check, X, Shield, RefreshCw
} from 'lucide-react';

export const DEFAULT_REGISTERED_CUSTOMERS = [
  {
    id: 'CUST-8901',
    name: 'Eleanor Vance',
    email: 'eleanor.vance@vancemedia.com',
    phone: '+1 (415) 555-0142',
    country: 'US',
    countryFlag: '🇺🇸',
    vipTier: 'platinum',
    privilegeActive: true,
    privileges: [
      '20% Lifetime VIP Storefront Discount',
      'Free Priority Express Shipping',
      'Instant POD Production Priority',
      'Dedicated 24/7 VIP Concierge'
    ],
    vipCode: 'VIP20-PLATINUM',
    totalOrders: 18,
    totalSpent: 1240.50,
    registeredDate: '2026-01-14',
    status: 'ACTIVE',
    company: 'Vance Media Agency'
  },
  {
    id: 'CUST-8902',
    name: 'Oliver Campbell',
    email: 'oliver.c@highlanddesign.co.uk',
    phone: '+44 20 7946 0912',
    country: 'UK',
    countryFlag: '🇬🇧',
    vipTier: 'gold',
    privilegeActive: true,
    privileges: [
      '15% Lifetime VIP Storefront Discount',
      'Free Priority Express Shipping',
      'Fast-Track POD Print Queue',
      'Seasonal Drop Early Access'
    ],
    vipCode: 'VIP15-GOLD',
    totalOrders: 9,
    totalSpent: 620.00,
    registeredDate: '2026-03-02',
    status: 'ACTIVE',
    company: 'Highland Design Studio'
  },
  {
    id: 'CUST-8903',
    name: 'Sophie Tremblay',
    email: 'sophie.t@quebecarts.ca',
    phone: '+1 (514) 555-0188',
    country: 'CA',
    countryFlag: '🇨🇦',
    vipTier: 'gold',
    privilegeActive: true,
    privileges: [
      '15% Lifetime VIP Storefront Discount',
      'Free Priority Express Shipping',
      'Fast-Track POD Print Queue'
    ],
    vipCode: 'VIP15-GOLD',
    totalOrders: 7,
    totalSpent: 485.20,
    registeredDate: '2026-04-19',
    status: 'ACTIVE',
    company: 'Quebec Fine Arts'
  },
  {
    id: 'CUST-8904',
    name: 'Marcus Brody',
    email: 'm.brody@chicagobusiness.org',
    phone: '+1 (312) 555-0164',
    country: 'US',
    countryFlag: '🇺🇸',
    vipTier: 'silver',
    privilegeActive: true,
    privileges: [
      '10% Lifetime VIP Storefront Discount',
      'Free Standard Shipping over $35',
      'Early Notification for Deals'
    ],
    vipCode: 'VIP10-SILVER',
    totalOrders: 4,
    totalSpent: 215.80,
    registeredDate: '2026-06-11',
    status: 'ACTIVE',
    company: 'Brody Consulting LLC'
  },
  {
    id: 'CUST-8905',
    name: 'Hannah Al-Mansoor',
    email: 'hannah.m@apexbranding.com',
    phone: '+1 (212) 555-0129',
    country: 'US',
    countryFlag: '🇺🇸',
    vipTier: 'platinum',
    privilegeActive: true,
    privileges: [
      '20% Lifetime VIP Storefront Discount',
      'Free Priority Express Shipping',
      'Instant POD Production Priority',
      'Dedicated 24/7 VIP Concierge'
    ],
    vipCode: 'VIP20-PLATINUM',
    totalOrders: 22,
    totalSpent: 1680.00,
    registeredDate: '2025-11-20',
    status: 'ACTIVE',
    company: 'Apex Brand Strategies'
  }
];

export default function AdminCustomers({
  currentMarket = 'US',
  storeTheme = 'light',
  registeredCustomers,
  onUpdateRegisteredCustomers
}) {
  const isLight = storeTheme === 'light';

  // Local state with fallback
  const [customers, setCustomers] = useState(() => {
    if (registeredCustomers && registeredCustomers.length > 0) {
      return registeredCustomers;
    }
    const saved = localStorage.getItem('printflow_registered_customers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_REGISTERED_CUSTOMERS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');
  const [countryFilter, setCountryFilter] = useState('ALL');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // New Customer Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: currentMarket || 'US',
    vipTier: 'gold',
    discountCode: 'VIP15-MEMBER',
    p1: true, // 15% VIP discount
    p2: true, // Free express shipping
    p3: true, // Fast-track POD queue
    p4: false, // 24/7 Concierge
  });

  // Sync back to parent if callback exists
  useEffect(() => {
    if (onUpdateRegisteredCustomers) {
      onUpdateRegisteredCustomers(customers);
    }
    localStorage.setItem('printflow_registered_customers', JSON.stringify(customers));
  }, [customers, onUpdateRegisteredCustomers]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleTogglePrivilege = (customerId) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === customerId) {
        const nextState = !c.privilegeActive;
        showToast(
          nextState 
            ? `VIP Privileges activated for ${c.name}. VIP code active.` 
            : `VIP Privileges temporarily paused for ${c.name}.`,
          nextState ? 'success' : 'info'
        );
        return { ...c, privilegeActive: nextState };
      }
      return c;
    }));
  };

  const handleDeleteCustomer = (customerId, name) => {
    if (window.confirm(`Are you sure you want to remove registered customer ${name}?`)) {
      setCustomers(prev => prev.filter(c => c.id !== customerId));
      showToast(`Removed customer ${name} from registered directory.`);
    }
  };

  const handleCreateCustomer = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim()) {
      showToast('Please enter customer full name and email.', 'error');
      return;
    }

    const grantedPrivileges = [];
    if (formState.p1) grantedPrivileges.push(`${formState.vipTier === 'platinum' ? '20%' : formState.vipTier === 'gold' ? '15%' : '10%'} Lifetime VIP Storefront Discount`);
    if (formState.p2) grantedPrivileges.push('Free Priority Express Shipping');
    if (formState.p3) grantedPrivileges.push('Fast-Track POD Print Queue');
    if (formState.p4) grantedPrivileges.push('Dedicated 24/7 VIP Concierge');

    const countryFlags = { US: '🇺🇸', UK: '🇬🇧', CA: '🇨🇦' };

    const newCustomer = {
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formState.name.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim() || '+1 (555) 000-0000',
      company: formState.company.trim() || 'Independent VIP Member',
      country: formState.country,
      countryFlag: countryFlags[formState.country] || '🌐',
      vipTier: formState.vipTier,
      privilegeActive: true,
      privileges: grantedPrivileges,
      vipCode: formState.discountCode || (formState.vipTier === 'platinum' ? 'VIP20-PLATINUM' : 'VIP15-GOLD'),
      totalOrders: 0,
      totalSpent: 0.00,
      registeredDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE'
    };

    setCustomers(prev => [newCustomer, ...prev]);
    setIsRegisterModalOpen(false);
    setFormState({
      name: '',
      email: '',
      phone: '',
      company: '',
      country: currentMarket || 'US',
      vipTier: 'gold',
      discountCode: 'VIP15-MEMBER',
      p1: true,
      p2: true,
      p3: true,
      p4: false
    });
    showToast(`Registered VIP Customer "${newCustomer.name}" successfully created!`);
  };

  // Filter customers
  const filteredCustomers = customers.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTier = tierFilter === 'ALL' || c.vipTier === tierFilter.toLowerCase();
    const matchesCountry = countryFilter === 'ALL' || c.country === countryFilter;

    return matchesSearch && matchesTier && matchesCountry;
  });

  // Analytics Metrics
  const totalRegistered = customers.length;
  const activeVipCount = customers.filter(c => c.privilegeActive).length;
  const totalVipRevenue = customers.reduce((acc, c) => acc + (c.totalSpent || 0), 0);
  const totalOrdersPlaced = customers.reduce((acc, c) => acc + (c.totalOrders || 0), 0);

  return (
    <div className={`p-6 max-w-7xl mx-auto space-y-6 ${isLight ? 'text-slate-800' : 'text-slate-100'}`}>
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-20 right-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl shadow-2xl text-xs font-bold border transition-all animate-bounce ${
          toast.type === 'error'
            ? 'bg-rose-500/90 border-rose-400 text-white'
            : toast.type === 'info'
              ? 'bg-amber-500/90 border-amber-400 text-slate-900'
              : 'bg-emerald-500/90 border-emerald-400 text-white'
        }`}>
          {toast.type === 'error' ? <XCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header section with Actions */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isLight 
          ? 'bg-white border-slate-200 shadow-sm' 
          : 'bg-slate-900/90 border-slate-800 shadow-xl'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-600/30">
                <UserCheck className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">Registered Customers & VIP Privileges</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                Verified Members
              </span>
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Manage verified retail customers, grant exclusive 15% VIP discounts, fast-track POD production queues, and free priority express dispatch.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 flex items-center space-x-2 transition cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register VIP Customer</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Registered Members
              </span>
              <Users className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-black mt-2 text-indigo-500">{totalRegistered}</div>
            <div className="text-[10px] text-slate-400 mt-1">100% Verified Profiles</div>
          </div>

          <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Active VIP Privileges
              </span>
              <Award className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black mt-2 text-emerald-500">{activeVipCount}</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1">Receiving 15-20% off & Free Shipping</div>
          </div>

          <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Lifetime VIP Revenue
              </span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black mt-2 text-amber-500">${totalVipRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <div className="text-[10px] text-slate-400 mt-1">Across {totalOrdersPlaced} Retail Orders</div>
          </div>

          <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'}`}>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                VIP Benefit Package
              </span>
              <Gift className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-lg font-black mt-2 text-purple-500">15% Off + Express</div>
            <div className="text-[10px] text-slate-400 mt-1">Auto-applied at checkout</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-xl'
      }`}>
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, company, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border outline-none transition ${
              isLight 
                ? 'bg-slate-50 border-slate-300 focus:border-indigo-500 text-slate-800' 
                : 'bg-slate-950 border-slate-800 focus:border-indigo-500 text-slate-100'
            }`}
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="flex items-center space-x-1">
            <span className={`text-[10px] font-bold uppercase ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Tier:</span>
            {['ALL', 'PLATINUM', 'GOLD', 'SILVER'].map(tier => (
              <button
                key={tier}
                onClick={() => setTierFilter(tier)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                  tierFilter === tier
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                    : isLight 
                      ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="flex items-center space-x-1">
            <span className={`text-[10px] font-bold uppercase ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Market:</span>
            {['ALL', 'US', 'UK', 'CA'].map(market => (
              <button
                key={market}
                onClick={() => setCountryFilter(market)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                  countryFilter === market
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                    : isLight 
                      ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200' 
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {market}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className={`rounded-2xl border overflow-hidden transition-all ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-xl'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`border-b text-[10px] font-bold uppercase tracking-wider ${
              isLight ? 'bg-slate-50 text-slate-500 border-slate-200' : 'bg-slate-950/70 text-slate-400 border-slate-800'
            }`}>
              <tr>
                <th className="py-3 px-4">Customer ID & Profile</th>
                <th className="py-3 px-4">Market & Contact</th>
                <th className="py-3 px-4">VIP Tier & Discount Code</th>
                <th className="py-3 px-4">Granted VIP Privileges</th>
                <th className="py-3 px-4 text-center">Privilege Status</th>
                <th className="py-3 px-4 text-right">Orders & Spend</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No registered customers found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(customer => {
                  const isPlatinum = customer.vipTier === 'platinum';
                  const isGold = customer.vipTier === 'gold';

                  return (
                    <tr key={customer.id} className={`transition-colors ${
                      isLight ? 'hover:bg-slate-50/80' : 'hover:bg-slate-800/40'
                    }`}>
                      {/* Name & ID */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs ${
                            isPlatinum 
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                              : isGold 
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                                : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                          }`}>
                            {customer.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold flex items-center space-x-1.5">
                              <span>{customer.name}</span>
                              {customer.privilegeActive && (
                                <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center space-x-2">
                              <span>{customer.id}</span>
                              {customer.company && (
                                <>
                                  <span>•</span>
                                  <span className="truncate max-w-[120px]">{customer.company}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact & Country */}
                      <td className="py-3.5 px-4 text-[11px]">
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-300">
                            <span className="text-sm">{customer.countryFlag}</span>
                            <span className="font-bold">{customer.country}</span>
                            <span className="text-slate-400">•</span>
                            <span className="font-mono text-[10px]">{customer.phone}</span>
                          </div>
                          <div className="text-slate-400 text-[10px] truncate max-w-[180px]">
                            {customer.email}
                          </div>
                        </div>
                      </td>

                      {/* VIP Tier & Promo Code */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                            isPlatinum
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                              : isGold
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                : 'bg-slate-500/10 text-slate-400 border-slate-500/30'
                          }`}>
                            <Award className="w-3 h-3 shrink-0" />
                            <span>{customer.vipTier} VIP</span>
                          </span>
                          <div>
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-500 font-bold border border-slate-200 dark:border-slate-700">
                              {customer.vipCode}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Privileges */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1 max-w-xs">
                          {customer.privileges?.slice(0, 2).map((priv, idx) => (
                            <div key={idx} className="flex items-center space-x-1 text-[10px] text-slate-600 dark:text-slate-300">
                              <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                              <span className="truncate">{priv}</span>
                            </div>
                          ))}
                          {(customer.privileges?.length || 0) > 2 && (
                            <div className="text-[9px] text-indigo-500 font-bold">
                              +{(customer.privileges.length - 2)} more privileges
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Privilege Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleTogglePrivilege(customer.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition cursor-pointer ${
                            customer.privilegeActive
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border-rose-500/40 hover:bg-rose-500/30'
                          }`}
                        >
                          {customer.privilegeActive ? 'Active Privileges' : 'Paused Privileges'}
                        </button>
                      </td>

                      {/* Orders & Spend */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="font-bold text-slate-900 dark:text-slate-100">
                          ${(customer.totalSpent || 0).toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {customer.totalOrders || 0} orders
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText(customer.vipCode);
                              showToast(`Copied VIP coupon code: ${customer.vipCode}`);
                            }}
                            title="Copy Promo Code"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 transition cursor-pointer"
                          >
                            <Tag className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCustomer(customer.id, customer.name)}
                            title="Remove Customer"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register Customer Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-lg rounded-2xl border p-6 space-y-4 shadow-2xl relative ${
            isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
          }`}>
            <button
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-600 text-white rounded-xl">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">Register New Customer & Grant Privileges</h3>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Create a verified VIP retail profile with instant shopping privileges.
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateCustomer} className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica Taylor"
                    value={formState.name}
                    onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-100'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jessica@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-100'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 234-5678"
                    value={formState.phone}
                    onChange={(e) => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-100'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Taylor Creative Co."
                    value={formState.company}
                    onChange={(e) => setFormState(prev => ({ ...prev, company: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-100'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Market Country
                  </label>
                  <select
                    value={formState.country}
                    onChange={(e) => setFormState(prev => ({ ...prev, country: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-100'
                    }`}
                  >
                    <option value="US">🇺🇸 United States (USD $)</option>
                    <option value="UK">🇬🇧 United Kingdom (GBP £)</option>
                    <option value="CA">🇨🇦 Canada (CAD $)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    VIP Tier & Discount
                  </label>
                  <select
                    value={formState.vipTier}
                    onChange={(e) => {
                      const tier = e.target.value;
                      const code = tier === 'platinum' ? 'VIP20-PLATINUM' : tier === 'gold' ? 'VIP15-GOLD' : 'VIP10-SILVER';
                      setFormState(prev => ({ ...prev, vipTier: tier, discountCode: code }));
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-100'
                    }`}
                  >
                    <option value="platinum">Platinum VIP (20% Lifetime Discount)</option>
                    <option value="gold">Gold VIP (15% Lifetime Discount)</option>
                    <option value="silver">Silver VIP (10% Lifetime Discount)</option>
                  </select>
                </div>
              </div>

              {/* Privileges checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select Privileges to Activate
                </label>
                <div className="space-y-1.5 text-xs">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formState.p1}
                      onChange={(e) => setFormState(prev => ({ ...prev, p1: e.target.checked }))}
                      className="rounded text-indigo-600 focus:ring-0"
                    />
                    <span>Lifetime Discount ({formState.vipTier === 'platinum' ? '20%' : formState.vipTier === 'gold' ? '15%' : '10%'} storewide coupon)</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formState.p2}
                      onChange={(e) => setFormState(prev => ({ ...prev, p2: e.target.checked }))}
                      className="rounded text-indigo-600 focus:ring-0"
                    />
                    <span>Free Priority Express Shipping worldwide</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formState.p3}
                      onChange={(e) => setFormState(prev => ({ ...prev, p3: e.target.checked }))}
                      className="rounded text-indigo-600 focus:ring-0"
                    />
                    <span>Fast-Track POD Print Queue (skip standard wait time)</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formState.p4}
                      onChange={(e) => setFormState(prev => ({ ...prev, p4: e.target.checked }))}
                      className="rounded text-indigo-600 focus:ring-0"
                    />
                    <span>Dedicated 24/7 VIP Concierge live assistance</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                    isLight ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 transition cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Grant Privileges & Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
