import React from 'react';
import { Layers, ShoppingBag, Radio, Terminal, Globe2, Sparkles, MessageSquare, ExternalLink, LogOut, Package, CreditCard, KeyRound, Sun, Moon, Palette, LayoutTemplate } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentMarket, 
  setCurrentMarket, 
  onSwitchToStore, 
  onLogout,
  onOpenShortcutModal,
  shortcutConfig,
  storeTheme = 'light',
  onToggleStoreTheme
}) {
  const marketList = [
    { code: 'US', label: 'USA ($ USD)', flag: '🇺🇸' },
    { code: 'UK', label: 'United Kingdom (£ GBP)', flag: '🇬🇧' },
    { code: 'CA', label: 'Canada (CA$ CAD)', flag: '🇨🇦' },
  ];

  return (
    <header className={`border-b transition-colors sticky top-0 z-50 backdrop-blur ${
      storeTheme === 'light'
        ? 'border-slate-200 bg-white/95 text-slate-900 shadow-xs'
        : 'border-slate-800 bg-slate-900/95 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`font-bold text-base sm:text-lg tracking-tight ${storeTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>PrintFlow</span>
                <span className="text-[10px] uppercase px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30">
                  Studio
                </span>
              </div>
              <p className={`text-[10px] hidden sm:block ${storeTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>Operations, Workflows & Marketing Engine</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-1.5 overflow-x-auto no-scrollbar py-1">
            {/* 1. Drag-and-Drop Workflow Builder */}
            <button
              onClick={() => setActiveTab('workflows')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                activeTab === 'workflows'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : storeTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Workflows</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-indigo-400/20 text-indigo-200">DnD</span>
            </button>

            {/* 2. Social Inbox */}
            <button
              onClick={() => setActiveTab('inbox')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                activeTab === 'inbox'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : storeTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Inbox</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                5
              </span>
            </button>

            {/* 3. POD Production & Orders */}
            <button
              onClick={() => setActiveTab('storefront')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                activeTab === 'storefront'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : storeTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Orders</span>
            </button>

            {/* 4. Products & Catalog Manager */}
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                activeTab === 'products'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : storeTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Products</span>
            </button>

            {/* 5. Storefront Layout & Content Editor */}
            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                activeTab === 'editor'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : storeTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden md:inline">Editor</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                Live
              </span>
            </button>

            {/* 6. Ads & Leads */}
            <button
              onClick={() => setActiveTab('ads')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                activeTab === 'ads'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : storeTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Ads</span>
            </button>

            {/* 7. Payments & Merchant Accounts */}
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                activeTab === 'payments'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : storeTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden md:inline">Payments</span>
            </button>

            {/* 8. Execution Logs */}
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                activeTab === 'logs'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : storeTheme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Logs</span>
            </button>
          </nav>

          {/* Right Controls: Market Switcher, Live Store Link, Logout */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Market Switcher */}
            <div className={`hidden sm:flex items-center p-1 rounded-xl border ${
              storeTheme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/80 border-slate-700'
            }`}>
              <Globe2 className="w-3.5 h-3.5 text-slate-400 ml-1 mr-1" />
              {marketList.map((m) => (
                <button
                  key={m.code}
                  onClick={() => setCurrentMarket(m.code)}
                  className={`px-1.5 py-0.5 text-xs font-semibold rounded-lg transition-all flex items-center space-x-1 ${
                    currentMarket === m.code
                      ? 'bg-indigo-600 text-white shadow'
                      : storeTheme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={m.label}
                >
                  <span>{m.flag}</span>
                  <span className="hidden lg:inline">{m.code}</span>
                </button>
              ))}
            </div>

            {/* Stealth Hotkey Config Button */}
            <button
              onClick={onOpenShortcutModal}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
                storeTheme === 'light'
                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}
              title="Customize Stealth Admin Access Shortcut"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Hotkey:</span>
              <span className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                storeTheme === 'light' ? 'bg-amber-100 border-amber-300' : 'bg-amber-950/40 border-amber-500/30'
              }`}>
                {shortcutConfig?.modifier?.includes('Alt') ? 'Alt+' : 'Shift+'}{shortcutConfig?.key || 'A'}
              </span>
            </button>

            {/* Storefront Color Theme Control (Dark / Light) */}
            <div className={`flex items-center p-1 rounded-xl border ${
              storeTheme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/90 border-slate-700/80'
            }`}>
              <button
                type="button"
                onClick={() => onToggleStoreTheme && onToggleStoreTheme('light')}
                className={`flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-lg transition-all ${
                  storeTheme === 'light'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch Customer Storefront to Light Mode"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Light</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleStoreTheme && onToggleStoreTheme('dark')}
                className={`flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-lg transition-all ${
                  storeTheme === 'dark'
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch Customer Storefront to Dark Mode"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Dark</span>
              </button>
            </div>

            {/* View Live Storefront Button */}
            <button
              onClick={onSwitchToStore}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition shadow-sm ${
                storeTheme === 'light'
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border-emerald-500/30'
              }`}
              title="View the customer-facing storefront"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live Store</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className={`p-1.5 rounded-lg transition ${
                storeTheme === 'light'
                  ? 'text-slate-500 hover:text-rose-600 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
              }`}
              title="Logout from Admin Studio"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
