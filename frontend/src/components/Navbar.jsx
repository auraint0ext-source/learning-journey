import React from 'react';
import { 
  Sparkles, ExternalLink, LogOut, KeyRound, Sun, Moon, 
  Globe2, Menu, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen
} from 'lucide-react';

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
  onToggleStoreTheme,
  onToggleSidebar,
  isSidebarCollapsed = false
}) {
  const marketList = [
    { code: 'US', label: 'USA ($ USD)', flag: '🇺🇸' },
    { code: 'UK', label: 'United Kingdom (£ GBP)', flag: '🇬🇧' },
    { code: 'CA', label: 'Canada (CA$ CAD)', flag: '🇨🇦' },
  ];

  const TAB_LABELS = {
    workflows: '⚡ Workflows & Automation',
    inbox: '💬 Omnichannel Social Inbox',
    storefront: '📦 Orders & POD Fulfillment',
    products: '🏷️ Product Catalog & Barcodes',
    editor: '🎨 Storefront Visual & Layout Editor',
    ads: '📢 Marketing Hub & Ad Campaigns',
    payments: '💳 Payment Gateways',
    logs: '🖥️ System Diagnostic Logs'
  };

  return (
    <header className={`fixed top-0 inset-x-0 w-full h-16 z-50 border-b transition-colors backdrop-blur-md shadow-xs ${
      storeTheme === 'light'
        ? 'border-slate-200 bg-white/95 text-slate-900 shadow-slate-200/50'
        : 'border-slate-800 bg-slate-900/95 text-white shadow-black/40'
    }`}>
      <div className="w-full h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Left: Brand Logo, Sidebar Toggle Button & Active Section Title */}
          <div className="flex items-center space-x-3">
            {/* Brand Logo & Studio Badge */}
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-sm tracking-tight font-sans">PrintFlow</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30">
                    Studio
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className={`hidden sm:block w-[1px] h-6 ${storeTheme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`} />

            {/* Collapsible Sidebar Toggle Button */}
            <button
              type="button"
              onClick={onToggleSidebar}
              title={isSidebarCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Navigation Sidebar'}
              className={`p-2 rounded-xl border transition cursor-pointer flex items-center space-x-1.5 ${
                storeTheme === 'light'
                  ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-300 text-slate-800'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
              }`}
            >
              <Menu className="w-4 h-4 text-indigo-500" />
              <span className="text-[11px] font-bold hidden md:inline">
                {isSidebarCollapsed ? 'Menu' : 'Hide'}
              </span>
            </button>

            {/* Current Active Section Badge */}
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border tracking-tight shadow-xs ${
                storeTheme === 'light' 
                  ? 'bg-indigo-50/80 border-indigo-200 text-indigo-900' 
                  : 'bg-indigo-950/60 border-indigo-500/30 text-indigo-200'
              }`}>
                {TAB_LABELS[activeTab] || 'Admin Studio'}
              </span>
            </div>
          </div>

          {/* Right Controls: Market Switcher, Hotkey, Theme Switcher, Live Store Link, Logout */}
          <div className="flex items-center space-x-2">
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
                      ? 'bg-indigo-600 text-white shadow-xs'
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
              className={`hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
                storeTheme === 'light'
                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}
              title="Customize Stealth Admin Access Shortcut"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden lg:inline">Hotkey:</span>
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
                className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  storeTheme === 'light'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch Admin and Storefront to Light Mode"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Light</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleStoreTheme && onToggleStoreTheme('dark')}
                className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  storeTheme === 'dark'
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch Admin and Storefront to Dark Mode"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dark</span>
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
