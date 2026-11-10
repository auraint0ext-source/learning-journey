import React from 'react';
import { 
  Layers, ShoppingBag, Radio, Terminal, Sparkles, MessageSquare, 
  Package, CreditCard, KeyRound, Sun, Moon, LayoutTemplate,
  ChevronLeft, ChevronRight, ExternalLink, LogOut, Globe2, Menu, X
} from 'lucide-react';

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  currentMarket,
  setCurrentMarket,
  onSwitchToStore,
  onLogout,
  onOpenShortcutModal,
  storeTheme = 'light',
  onToggleStoreTheme
}) {
  const isLight = storeTheme === 'light';
  const isEditor = activeTab === 'editor';

  const NAV_ITEMS = [
    { 
      id: 'workflows', 
      label: 'Workflows & Automation', 
      shortLabel: 'Workflows',
      icon: Layers, 
      badge: 'DnD' 
    },
    { 
      id: 'inbox', 
      label: 'Omnichannel Inbox', 
      shortLabel: 'Inbox',
      icon: MessageSquare, 
      badge: '5', 
      badgeColor: 'emerald' 
    },
    { 
      id: 'storefront', 
      label: 'Orders & Production', 
      shortLabel: 'Orders',
      icon: ShoppingBag 
    },
    { 
      id: 'products', 
      label: 'Product Catalog & Inventory', 
      shortLabel: 'Products',
      icon: Package, 
      badge: 'Barcode' 
    },
    { 
      id: 'editor', 
      label: 'Storefront Visual Editor', 
      shortLabel: 'Editor',
      icon: LayoutTemplate, 
      badge: 'Live', 
      badgeColor: 'amber' 
    },
    { 
      id: 'ads', 
      label: 'Marketing & Ad Campaigns', 
      shortLabel: 'Ads Hub',
      icon: Radio 
    },
    { 
      id: 'payments', 
      label: 'Payment Gateways', 
      shortLabel: 'Payments',
      icon: CreditCard 
    },
    { 
      id: 'logs', 
      label: 'System Diagnostic Logs', 
      shortLabel: 'Logs',
      icon: Terminal 
    },
  ];

  const marketList = [
    { code: 'US', label: 'USA ($ USD)', flag: '🇺🇸' },
    { code: 'UK', label: 'UK (£ GBP)', flag: '🇬🇧' },
    { code: 'CA', label: 'Canada (CA$)', flag: '🇨🇦' },
  ];

  return (
    <aside className={`transition-all duration-300 ease-in-out shrink-0 flex flex-col justify-between border-r fixed left-0 bottom-0 z-40 overflow-hidden ${
      isEditor ? 'top-[108px] h-[calc(100vh-108px)]' : 'top-16 h-[calc(100vh-4rem)]'
    } ${
      isCollapsed ? 'w-16' : 'w-64'
    } ${
      isLight 
        ? 'bg-white border-slate-200 text-slate-800 shadow-sm' 
        : 'bg-slate-900 border-slate-800 text-slate-100 shadow-xl'
    }`}>
      {/* Top Header / Section Label & Collapse Toggle */}
      <div className={`p-3.5 flex items-center justify-between border-b ${
        isLight ? 'border-slate-200 bg-slate-50/50' : 'border-slate-800 bg-slate-950/40'
      }`}>
        {!isCollapsed ? (
          <>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Navigation Menu
            </span>
            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              title="Collapse Sidebar (সাইডবার গুটিয়ে নিন)"
              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                isLight 
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' 
                  : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsCollapsed(false)}
            title="Expand Sidebar (সাইডবার খুলুন)"
            className={`mx-auto p-1.5 rounded-lg border transition cursor-pointer ${
              isLight 
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' 
                : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Navigation Item List (Arranged Vertically from Top to Bottom) */}
      <div className="flex-1 py-4 px-2 space-y-1.5 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center transition-all rounded-xl text-xs font-semibold cursor-pointer ${
                isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2.5'
              } ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Icon className={`shrink-0 ${isCollapsed ? 'w-5 h-5' : 'w-4 h-4'} ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </div>

              {!isCollapsed && item.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase shrink-0 ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : item.badgeColor === 'emerald'
                      ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                      : item.badgeColor === 'amber'
                        ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                        : isLight 
                          ? 'bg-slate-200 text-slate-700' 
                          : 'bg-slate-800 text-slate-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Expand Button for Collapsed Mode */}
      {isCollapsed && (
        <div className="p-2 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={() => setIsCollapsed(false)}
            title="Expand Sidebar"
            className={`w-full py-2 flex items-center justify-center rounded-lg border transition ${
              isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Footer Actions (Market Switcher, Theme Switcher, Live Store, Logout) */}
      {!isCollapsed && (
        <div className={`p-3 border-t space-y-2 text-xs ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-slate-950/60'
        }`}>
          {/* Market / Country Selector */}
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Market:
            </span>
            <div className="flex items-center space-x-1">
              {marketList.map(m => (
                <button
                  key={m.code}
                  type="button"
                  onClick={() => setCurrentMarket(m.code)}
                  title={m.label}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition ${
                    currentMarket === m.code
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : isLight 
                        ? 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100' 
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {m.flag} {m.code}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Switcher Toggle */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
            <span className={`text-[10px] font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Theme Mode:
            </span>
            <button
              type="button"
              onClick={onToggleStoreTheme}
              className={`flex items-center space-x-1 px-2 py-1 rounded-lg border font-bold text-[10px] transition cursor-pointer ${
                isLight 
                  ? 'bg-amber-100/80 border-amber-300 text-amber-900 hover:bg-amber-200' 
                  : 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300 hover:bg-indigo-900/60'
              }`}
            >
              {isLight ? <Sun className="w-3 h-3 text-amber-600" /> : <Moon className="w-3 h-3 text-indigo-400" />}
              <span>{isLight ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          {/* Quick Buttons: View Live Store & Logout */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              type="button"
              onClick={onSwitchToStore}
              className={`py-1.5 px-2 rounded-lg border text-[10px] font-bold flex items-center justify-center space-x-1 transition cursor-pointer ${
                isLight 
                  ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 shadow-xs' 
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ExternalLink className="w-3 h-3" />
              <span>Live Store</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="py-1.5 px-2 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-[10px] font-bold flex items-center justify-center space-x-1 transition cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
