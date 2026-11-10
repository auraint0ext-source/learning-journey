import React, { useState, useEffect } from 'react';
import { API_BASE } from './config';
import CustomerStorefront from './components/CustomerStorefront';
import AdminLoginModal from './components/AdminLoginModal';
import Navbar from './components/Navbar';
import AdminSidebar from './components/AdminSidebar';
import WorkflowCanvas from './components/WorkflowCanvas';
import Storefront from './components/Storefront';
import MarketingHub from './components/MarketingHub';
import SocialInbox from './components/SocialInbox';
import LogsViewer from './components/LogsViewer';
import AdminProductManager from './components/AdminProductManager';
import AdminPayments from './components/AdminPayments';
import AdminShortcutModal from './components/AdminShortcutModal';
import AdminStorefrontEditor from './components/AdminStorefrontEditor';
import { DEFAULT_STOREFRONT_CONFIG } from './config/storefrontConfig';

export default function App() {
  // viewMode is 'store' (for regular customers) or 'admin' (for operations staff)
  const [viewMode, setViewMode] = useState('store');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isShortcutModalOpen, setIsShortcutModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Stealth Shortcut Config (saved in localStorage)
  const [shortcutConfig, setShortcutConfig] = useState(() => {
    const saved = localStorage.getItem('printflow_admin_shortcut_config');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return {
      modifier: 'CmdOrCtrl+Shift',
      key: 'A',
      secretParam: 'admin=1'
    };
  });

  // Admin tabs: 'workflows' | 'inbox' | 'storefront' | 'ads' | 'logs'
  const [activeAdminTab, setActiveAdminTab] = useState('workflows');
  const [currentMarket, setCurrentMarket] = useState('US');
  const [markets, setMarkets] = useState({});

  // Storefront Color Theme ('light' | 'dark')
  const [storeTheme, setStoreTheme] = useState(() => {
    return localStorage.getItem('printflow_storefront_theme') || 'light';
  });

  // Storefront Visual & Layout Configuration (Headings, Columns, Spacing, Texts)
  const [storefrontConfig, setStorefrontConfig] = useState(() => {
    const saved = localStorage.getItem('printflow_storefront_config');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        // Ensure latest VistaPrint Mega Menu v4 multi-column categories and proper assets
        const isOutdated = !parsed.megaMenuVersion || parsed.megaMenuVersion < 4 || !parsed.megaMenuCategories?.[0]?.columns;
        const megaMenuCats = isOutdated ? DEFAULT_STOREFRONT_CONFIG.megaMenuCategories : parsed.megaMenuCategories;
        const promoSlides = isOutdated ? DEFAULT_STOREFRONT_CONFIG.promoSlides : (parsed.promoSlides || DEFAULT_STOREFRONT_CONFIG.promoSlides);
        const categoryShowcaseCards = isOutdated ? DEFAULT_STOREFRONT_CONFIG.categoryShowcaseCards : (parsed.categoryShowcaseCards || DEFAULT_STOREFRONT_CONFIG.categoryShowcaseCards);

        return { 
          ...DEFAULT_STOREFRONT_CONFIG, 
          ...parsed, 
          luxuryBgGlassOpacity: parsed.luxuryBgGlassOpacity !== undefined ? parsed.luxuryBgGlassOpacity : DEFAULT_STOREFRONT_CONFIG.luxuryBgGlassOpacity,
          megaMenuVersion: 4,
          megaMenuCategories: megaMenuCats,
          promoSlides: promoSlides,
          categoryShowcaseCards: categoryShowcaseCards,
          heroAlignment: 'left' 
        };
      } catch(e) {}
    }
    return DEFAULT_STOREFRONT_CONFIG;
  });

  const handleSaveStorefrontConfig = (newConfig) => {
    setStorefrontConfig(newConfig);
    localStorage.setItem('printflow_storefront_config', JSON.stringify(newConfig));
  };

  const handleToggleStoreTheme = (theme) => {
    const nextTheme = theme || (storeTheme === 'light' ? 'dark' : 'light');
    setStoreTheme(nextTheme);
    localStorage.setItem('printflow_storefront_theme', nextTheme);
  };

  const handleSaveShortcutConfig = (newConfig) => {
    setShortcutConfig(newConfig);
    localStorage.setItem('printflow_admin_shortcut_config', JSON.stringify(newConfig));
  };

  useEffect(() => {
    // Check saved session
    const savedAuth = localStorage.getItem('printflow_admin_auth');
    if (savedAuth === 'true') {
      setIsAdminAuthenticated(true);
    }

    // Stealth URL parameter check (e.g. ?admin=1 or configured param)
    const urlParams = new URLSearchParams(window.location.search);
    const paramKey = (shortcutConfig.secretParam || 'admin=1').split('=')[0];
    const paramVal = (shortcutConfig.secretParam || 'admin=1').split('=')[1] || '1';
    if (urlParams.get(paramKey) === paramVal || urlParams.get('admin') === '1' || urlParams.get('admin') === 'true') {
      setIsAdminLoginModalOpen(true);
    }

    // Dynamic stealth keyboard shortcut listener
    const handleKeyDown = (e) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      let modifierMatch = false;

      if (shortcutConfig.modifier === 'CmdOrCtrl+Shift') {
        modifierMatch = isCmdOrCtrl && e.shiftKey;
      } else if (shortcutConfig.modifier === 'CmdOrCtrl+Alt') {
        modifierMatch = isCmdOrCtrl && e.altKey;
      } else if (shortcutConfig.modifier === 'Alt+Shift') {
        modifierMatch = e.altKey && e.shiftKey;
      } else if (shortcutConfig.modifier === 'CmdOrCtrl') {
        modifierMatch = isCmdOrCtrl && !e.shiftKey && !e.altKey;
      }

      const keyTarget = (shortcutConfig.key || 'A').toUpperCase();
      if (modifierMatch && e.key && e.key.toUpperCase() === keyTarget) {
        e.preventDefault();
        setIsAdminLoginModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const fetchMarkets = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/ecommerce/markets`);
        if (res.ok) {
          const data = await res.json();
          setMarkets(data);
        }
      } catch (err) {
        console.error('Failed to load markets:', err);
      }
    };
    fetchMarkets();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcutConfig]);

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setViewMode('admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('printflow_admin_auth');
    setIsAdminAuthenticated(false);
    setViewMode('store');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${storeTheme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      {/* 1. If in Customer View: Only the pure, clean retail e-commerce website is shown */}
      {viewMode === 'store' && (
        <CustomerStorefront
          currentMarket={currentMarket}
          setCurrentMarket={setCurrentMarket}
          markets={markets}
          onOpenAdminLogin={() => setIsAdminLoginModalOpen(true)}
          isAdminAuthenticated={isAdminAuthenticated}
          onEnterAdminStudio={() => setViewMode('admin')}
          storeTheme={storeTheme}
          onToggleStoreTheme={handleToggleStoreTheme}
          storefrontConfig={storefrontConfig}
        />
      )}

      {/* 2. If in Admin Studio: The protected operations control center is rendered */}
      {viewMode === 'admin' && (
        <div className={`min-h-screen ${storeTheme === 'light' ? 'admin-light-mode bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'} flex flex-col`}>
          {/* Top Full-Width Frozen Header: Spans entire screen width from edge to edge */}
          <Navbar
            activeTab={activeAdminTab}
            setActiveTab={setActiveAdminTab}
            currentMarket={currentMarket}
            setCurrentMarket={setCurrentMarket}
            onSwitchToStore={() => setViewMode('store')}
            onLogout={handleLogout}
            onOpenShortcutModal={() => setIsShortcutModalOpen(true)}
            shortcutConfig={shortcutConfig}
            storeTheme={storeTheme}
            onToggleStoreTheme={handleToggleStoreTheme}
            onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            isSidebarCollapsed={isSidebarCollapsed}
          />

          {/* Body Container below the Top Header: pt-[108px] when editor has top ribbon, otherwise pt-16 */}
          <div className={`flex flex-1 relative transition-all duration-200 ${activeAdminTab === 'editor' ? 'pt-[108px]' : 'pt-16'}`}>
            {/* Collapsible Left Navigation Sidebar (Organized Vertically from Top to Bottom) */}
            <AdminSidebar
              activeTab={activeAdminTab}
              setActiveTab={setActiveAdminTab}
              isCollapsed={isSidebarCollapsed}
              setIsCollapsed={setIsSidebarCollapsed}
              currentMarket={currentMarket}
              setCurrentMarket={setCurrentMarket}
              onSwitchToStore={() => setViewMode('store')}
              onLogout={handleLogout}
              onOpenShortcutModal={() => setIsShortcutModalOpen(true)}
              storeTheme={storeTheme}
              onToggleStoreTheme={handleToggleStoreTheme}
            />

            {/* Right Main Content Column: smoothly transitions margin when sidebar expands/collapses */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
              isSidebarCollapsed ? 'ml-16' : 'ml-64'
            }`}>
              <main className={`flex-1 transition-colors ${storeTheme === 'light' ? 'admin-light-mode' : ''}`}>
                {activeAdminTab === 'workflows' && <WorkflowCanvas currentMarket={currentMarket} storeTheme={storeTheme} />}
                {activeAdminTab === 'inbox' && <SocialInbox currentMarket={currentMarket} storeTheme={storeTheme} />}
                {activeAdminTab === 'storefront' && <Storefront currentMarket={currentMarket} markets={markets} storeTheme={storeTheme} />}
                {activeAdminTab === 'products' && (
                  <AdminProductManager 
                    currentMarket={currentMarket} 
                    onSwitchToStore={() => setViewMode('store')}
                    storeTheme={storeTheme}
                    onToggleStoreTheme={handleToggleStoreTheme}
                  />
                )}
                {activeAdminTab === 'editor' && (
                  <AdminStorefrontEditor
                    storefrontConfig={storefrontConfig}
                    onSaveConfig={handleSaveStorefrontConfig}
                    onSwitchToStore={() => setViewMode('store')}
                    storeTheme={storeTheme}
                    onToggleStoreTheme={handleToggleStoreTheme}
                    onOpenShortcutModal={() => setIsShortcutModalOpen(true)}
                    shortcutConfig={shortcutConfig}
                    isSidebarCollapsed={isSidebarCollapsed}
                  />
                )}
                {activeAdminTab === 'ads' && <MarketingHub currentMarket={currentMarket} storeTheme={storeTheme} />}
                {activeAdminTab === 'payments' && <AdminPayments currentMarket={currentMarket} storeTheme={storeTheme} />}
                {activeAdminTab === 'logs' && <LogsViewer storeTheme={storeTheme} />}
              </main>
            </div>
          </div>
        </div>
      )}

      {/* Admin Login Modal (Accessible from stealth shortcut or secret URL) */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Admin Stealth Shortcut Customizer Modal */}
      <AdminShortcutModal
        isOpen={isShortcutModalOpen}
        onClose={() => setIsShortcutModalOpen(false)}
        shortcutConfig={shortcutConfig}
        onSaveConfig={handleSaveShortcutConfig}
      />
    </div>
  );
}
