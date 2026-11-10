import React, { useState } from 'react';
import { 
  LayoutTemplate, Columns, Grid, Type, AlignLeft, AlignCenter, 
  Sliders, Sparkles, CheckCircle2, Save, RotateCcw, Eye, 
  Layers, MessageSquare, Truck, ShieldCheck, Star, Palette,
  Smartphone, Monitor, Megaphone, Shield, RefreshCw, Search,
  Briefcase, Shirt, Coffee, Image, Tag, BadgePercent, Check, Package,
  Plus, Trash2, ArrowUp, ArrowDown, ChevronUp, ChevronDown,
  Sun, Moon, KeyRound, ShoppingBag, ExternalLink, Globe
} from 'lucide-react';

import { DEFAULT_STOREFRONT_CONFIG, VISTA_MEGA_MENU_CATEGORIES, TYPOGRAPHY_TARGET_ITEMS, SUPPORTED_FONTS } from '../config/storefrontConfig';
import WordDocsTypographyToolbar, { WordDocsTopRibbon, getTypographyInlineStyle } from './WordDocsTypographyToolbar';

export default function AdminStorefrontEditor({
  storefrontConfig,
  onSaveConfig,
  onSwitchToStore,
  storeTheme = 'light',
  onToggleStoreTheme,
  onOpenShortcutModal,
  shortcutConfig,
  isSidebarCollapsed = false
}) {
  const isLight = storeTheme === 'light';

  const [config, setConfig] = useState(() => {
    return storefrontConfig || DEFAULT_STOREFRONT_CONFIG;
  });

  const [activeSection, setActiveSection] = useState('hero'); // 'hero' | 'background' | 'megamenu' | etc.
  const [selectedTypographyTarget, setSelectedTypographyTarget] = useState('heroTitle');
  const [toastMessage, setToastMessage] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'

  // Language management state
  const [newLangCode, setNewLangCode] = useState('');
  const [newLangName, setNewLangName] = useState('');
  const [newLangFlag, setNewLangFlag] = useState('🌐');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFieldChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleAddLanguage = () => {
    if (!newLangName.trim() || !newLangCode.trim()) {
      showToast('Please enter both language name and code');
      return;
    }
    const currentList = config.languages || DEFAULT_STOREFRONT_CONFIG.languages || [];
    if (currentList.some(l => l.code.toLowerCase() === newLangCode.trim().toLowerCase())) {
      showToast(`Language code "${newLangCode}" is already added.`);
      return;
    }
    const updated = [
      ...currentList,
      {
        code: newLangCode.trim().toLowerCase(),
        name: newLangName.trim(),
        flag: newLangFlag.trim() || '🌐'
      }
    ];
    setConfig(prev => ({ ...prev, languages: updated }));
    setNewLangCode('');
    setNewLangName('');
    setNewLangFlag('🌐');
    showToast(`Added language: ${newLangName.trim()}`);
  };

  const handleRemoveLanguage = (codeToRemove) => {
    const currentList = config.languages || DEFAULT_STOREFRONT_CONFIG.languages || [];
    if (currentList.length <= 1) {
      showToast('You must keep at least one active language.');
      return;
    }
    const updated = currentList.filter(l => l.code !== codeToRemove);
    setConfig(prev => ({
      ...prev,
      languages: updated,
      defaultLanguage: prev.defaultLanguage === codeToRemove ? updated[0].code : prev.defaultLanguage
    }));
    showToast(`Removed language: ${codeToRemove.toUpperCase()}`);
  };

  const handleSocialLinkChange = (network, url) => {
    setConfig(prev => ({
      ...prev,
      socialLinks: {
        ...(prev.socialLinks || DEFAULT_STOREFRONT_CONFIG.socialLinks || {}),
        [network]: url
      }
    }));
  };

  const handleTypographyChange = (itemKey, updatedTypo) => {
    setConfig(prev => ({
      ...prev,
      typography: {
        ...(prev.typography || DEFAULT_STOREFRONT_CONFIG.typography),
        [itemKey]: updatedTypo
      }
    }));
  };

  const handleReviewChange = (index, field, value) => {
    setConfig(prev => {
      const updated = [...prev.reviews];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, reviews: updated };
    });
  };

  const handleTrustPropChange = (index, field, value) => {
    setConfig(prev => {
      const updated = [...prev.trustProps];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, trustProps: updated };
    });
  };

  const handleCategoryCardChange = (index, field, value) => {
    setConfig(prev => {
      const cards = [...(prev.categoryShowcaseCards || DEFAULT_STOREFRONT_CONFIG.categoryShowcaseCards)];
      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, categoryShowcaseCards: cards };
    });
  };

  const handleMegaMenuCategoryChange = (index, field, value) => {
    setConfig(prev => {
      const cats = [...(prev.megaMenuCategories || DEFAULT_STOREFRONT_CONFIG.megaMenuCategories)];
      cats[index] = { ...cats[index], [field]: value };
      return { ...prev, megaMenuCategories: cats };
    });
  };

  const handleAddMenuItem = () => {
    setConfig(prev => {
      const cats = [...(prev.megaMenuCategories || DEFAULT_STOREFRONT_CONFIG.megaMenuCategories)];
      const newItem = {
        id: `menu-${Date.now()}`,
        title: 'New Custom Menu',
        categoryKey: 'Marketing',
        badge: '',
        subcategories: ['Featured Items', 'Bestsellers', 'New Arrivals']
      };
      return { ...prev, megaMenuCategories: [...cats, newItem] };
    });
    showToast('New menu item added! You can now customize title, category & sub-items.');
  };

  const handleDeleteMenuItem = (index) => {
    setConfig(prev => {
      const cats = [...(prev.megaMenuCategories || DEFAULT_STOREFRONT_CONFIG.megaMenuCategories)];
      cats.splice(index, 1);
      return { ...prev, megaMenuCategories: cats };
    });
    showToast('Menu item removed.');
  };

  const handleMoveMenuItem = (index, direction) => {
    setConfig(prev => {
      const cats = [...(prev.megaMenuCategories || DEFAULT_STOREFRONT_CONFIG.megaMenuCategories)];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= cats.length) return prev;
      const temp = cats[index];
      cats[index] = cats[targetIndex];
      cats[targetIndex] = temp;
      return { ...prev, megaMenuCategories: cats };
    });
  };

  const handleResetMenuToDefaults = () => {
    setConfig(prev => ({
      ...prev,
      megaMenuVersion: 2,
      megaMenuCategories: DEFAULT_STOREFRONT_CONFIG.megaMenuCategories
    }));
    showToast('Mega Menu restored to VistaPrint standard categories.');
  };

  const handlePromoSlideChange = (index, field, value) => {
    setConfig(prev => {
      const slides = [...(prev.promoSlides || DEFAULT_STOREFRONT_CONFIG.promoSlides)];
      slides[index] = { ...slides[index], [field]: value };
      return { ...prev, promoSlides: slides };
    });
  };

  const handleSave = () => {
    onSaveConfig(config);
    showToast('Storefront layout and content published successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Reset all storefront layout settings and texts to default?')) {
      setConfig(DEFAULT_STOREFRONT_CONFIG);
      onSaveConfig(DEFAULT_STOREFRONT_CONFIG);
      showToast('Storefront settings reset to default values.');
    }
  };

  return (
    <div className={`w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 ${isLight ? 'admin-light-mode' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl shadow-2xl bg-emerald-950/90 text-emerald-200 border border-emerald-500/40 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl shadow-xl transition-colors border ${
        isLight ? 'bg-white border-slate-200 shadow-slate-200/50 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center border border-amber-500/30">
            <LayoutTemplate className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className={`text-xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Storefront Visual & Layout Editor</h1>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                Live Studio
              </span>
            </div>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Customize headings, grid columns, spacing, 3D luxury glass, and reviews on the customer storefront.
            </p>
          </div>
        </div>

        {/* Action Controls - Prominently containing Theme Toggle, Hotkey, Live Store, 3D BG, and Publish */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 1. Theme Switcher (Light / Dark) */}
          <div className={`flex items-center p-1 rounded-xl border ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
          }`}>
            <button
              type="button"
              onClick={() => onToggleStoreTheme && onToggleStoreTheme('light')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                isLight ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
              title="Light Mode"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Light</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleStoreTheme && onToggleStoreTheme('dark')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                !isLight ? 'bg-indigo-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark</span>
            </button>
          </div>

          {/* 2. Stealth Hotkey Button */}
          {onOpenShortcutModal && (
            <button
              type="button"
              onClick={onOpenShortcutModal}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition shadow-xs ${
                isLight 
                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300' 
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}
              title="Customize Stealth Admin Access Shortcut"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Hotkey:</span>
              <span className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                isLight ? 'bg-amber-100 border-amber-300' : 'bg-amber-950/40 border-amber-500/30'
              }`}>
                {shortcutConfig?.modifier?.includes('Alt') ? 'Alt+' : 'Shift+'}{shortcutConfig?.key || 'A'}
              </span>
            </button>
          )}

          {/* 3. View Live Store Button */}
          <button
            type="button"
            onClick={onSwitchToStore}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm border ${
              isLight
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border-emerald-500/40'
            }`}
            title="Preview changes directly in Customer Storefront"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-500" />
            <span>View Live Store</span>
          </button>

          {/* 4. Quick Toggle 3D Luxury Background */}
          <button
            type="button"
            onClick={() => {
              const nextVal = config.enableLuxury3dBackground === false ? true : false;
              handleFieldChange('enableLuxury3dBackground', nextVal);
              showToast(nextVal ? '3D Luxury Background Enabled! Click Publish Changes to apply.' : '3D Luxury Background Disabled.');
            }}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition shadow-sm ${
              config.enableLuxury3dBackground !== false
                ? (isLight ? 'bg-amber-50 text-amber-900 border-amber-400' : 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30')
                : (isLight ? 'bg-slate-100 text-slate-600 border-slate-300 hover:text-slate-900' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white')
            }`}
            title="Toggle 3D Luxury Boutique Parallax Background On/Off"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>3D BG: {config.enableLuxury3dBackground !== false ? 'ON' : 'OFF'}</span>
          </button>

          {/* 5. Reset Defaults */}
          <button
            type="button"
            onClick={handleReset}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
              isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Reset to default theme values"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden xl:inline">Reset Defaults</span>
          </button>

          {/* 6. Publish Changes */}
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Changes</span>
          </button>
        </div>
      </div>

      {/* Editor Sub-Navigation Tabs */}
      <div className={`flex space-x-1.5 p-1.5 rounded-2xl border overflow-x-auto ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
      }`}>
        {[
          { id: 'hero', label: 'Hero & Titles', icon: Type, target: 'heroTitle' },
          { id: 'background', label: '3D Luxury Background', icon: Sparkles },
          { id: 'megamenu', label: 'Mega Menu & Search', icon: Layers, target: 'megaMenuHeadings' },
          { id: 'promoslider', label: 'Promo Slider & Offers', icon: BadgePercent, target: 'promoHeadline' },
          { id: 'vistaspec', label: 'Categories & Bulk Tiers', icon: Grid, target: 'productTitle' },
          { id: 'layout', label: 'Columns & Spacing', icon: Columns },
          { id: 'announcement', label: 'Announcement Ribbon', icon: Megaphone, target: 'heroBadge' },
          { id: 'languages', label: 'Languages & Localization', icon: Globe },
          { id: 'socials', label: 'Social Media & Live Chat', icon: MessageSquare },
          { id: 'badges', label: 'Trust Badges & Couriers', icon: ShieldCheck },
          { id: 'reviews', label: 'Customer Reviews', icon: Star },
          { id: 'footer', label: 'Footer & Branding', icon: Sliders, target: 'footerText' },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSection(tab.id);
                if (tab.target) setSelectedTypographyTarget(tab.target);
              }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? isLight
                    ? 'bg-slate-800 text-white font-bold shadow-sm'
                    : 'bg-slate-800 border border-slate-600 text-white font-bold shadow-sm'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Persistent Google Docs / MS Word Top Formatting Ribbon */}
      <div className="pt-0.5">
        <WordDocsTopRibbon
          selectedTarget={selectedTypographyTarget}
          onSelectTarget={setSelectedTypographyTarget}
          typographyConfig={config?.typography || DEFAULT_STOREFRONT_CONFIG.typography}
          onTypographyChange={handleTypographyChange}
          isLight={isLight}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* Main Two-Column Studio Layout: Settings Form on Left, Live Mockup on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Configuration Forms (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Section 1: Hero & Titles */}
          {activeSection === 'hero' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Type className="w-4 h-4 text-indigo-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Hero Banner & Main Title</h2>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Storefront Top Section</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Hero Title Prefix:
                  </label>
                  <input
                    type="text"
                    value={config.heroTitlePrefix}
                    onChange={(e) => handleFieldChange('heroTitlePrefix', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white font-bold text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Custom Goods Printed"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Title Highlight / Accent Word:
                  </label>
                  <input
                    type="text"
                    value={config.heroTitleAccent}
                    onChange={(e) => handleFieldChange('heroTitleAccent', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-indigo-400 font-black text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Domestically."
                  />
                  <p className="text-[10px] text-slate-500 mt-1">This word renders with vivid gradient/accent styling.</p>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Hero Subtitle / Description:
                  </label>
                  <textarea
                    rows="3"
                    value={config.heroSubtitle}
                    onChange={(e) => handleFieldChange('heroSubtitle', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    placeholder="Short description highlighting domestic hubs and fast shipping..."
                  />
                </div>

                {/* Subtitle Font Size Control */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-300 font-semibold">Subtitle Text Size:</label>
                    <span className="text-[10px] text-indigo-400 font-mono font-bold">
                      {config.heroSubtitleSize === 'xs' ? '12px (Compact)' : config.heroSubtitleSize === 'base' ? '16px (Medium)' : config.heroSubtitleSize === 'lg' ? '18px (Large)' : '14px (Standard - Default)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'xs', label: 'Extra Small', desc: 'Extra Small (12px)' },
                      { id: 'sm', label: 'Small', desc: 'Small (14px)' },
                      { id: 'base', label: 'Medium', desc: 'Medium (16px)' },
                      { id: 'lg', label: 'Large', desc: 'Large (18px)' },
                    ].map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleFieldChange('heroSubtitleSize', s.id)}
                        className={`py-2 px-1 rounded-xl border text-center transition cursor-pointer ${
                          (config.heroSubtitleSize || 'sm') === s.id
                            ? isLight 
                              ? 'bg-slate-800 border-slate-800 text-white shadow-xs font-bold ring-1 ring-slate-800' 
                              : 'bg-slate-800 border-slate-600 text-white shadow-xs font-bold ring-1 ring-slate-500/50'
                            : isLight
                              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <div className="font-bold text-xs">{s.label}</div>
                        <div className="text-[9px] opacity-60">{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subtitle Spacing / Margin Control */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className={`font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Subtitle Spacing / Gap:</label>
                    <span className="text-[10px] text-amber-500 font-mono font-bold">
                      {config.heroSubtitleSpacing === 'tight' ? 'Tight Gap (mt-1)' : config.heroSubtitleSpacing === 'relaxed' ? 'Relaxed Gap (mt-4)' : config.heroSubtitleSpacing === 'loose' ? 'Loose Gap (mt-6)' : 'Normal Gap (mt-2.5)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'tight', label: 'Tight', desc: 'Tight' },
                      { id: 'normal', label: 'Normal', desc: 'Normal' },
                      { id: 'relaxed', label: 'Relaxed', desc: 'Relaxed' },
                      { id: 'loose', label: 'Loose', desc: 'Loose' },
                    ].map(sp => (
                      <button
                        key={sp.id}
                        type="button"
                        onClick={() => handleFieldChange('heroSubtitleSpacing', sp.id)}
                        className={`py-1.5 px-1 rounded-xl border text-center transition cursor-pointer ${
                          (config.heroSubtitleSpacing || 'normal') === sp.id
                            ? isLight 
                              ? 'bg-slate-800 border-slate-800 text-white shadow-xs font-bold ring-1 ring-slate-800' 
                              : 'bg-slate-800 border-slate-600 text-white shadow-xs font-bold ring-1 ring-slate-500/50'
                            : isLight
                              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <div className="font-bold text-xs">{sp.label}</div>
                        <div className="text-[9px] opacity-60">{sp.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title Font Size Control */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className={`font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Title Text Size:</label>
                    <span className={`text-[10px] font-mono font-bold ${isLight ? 'text-slate-700' : 'text-indigo-400'}`}>
                      {config.heroTitleSize === 'sm' ? '28pt (Compact)' : config.heroTitleSize === 'lg' ? '48pt (Large)' : config.heroTitleSize === 'xl' ? '60pt (Extra Large)' : '36pt (Medium - Default)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'sm', label: 'Small', desc: 'Small (28pt)' },
                      { id: 'md', label: 'Medium', desc: 'Medium (36pt)' },
                      { id: 'lg', label: 'Large', desc: 'Large (48pt)' },
                      { id: 'xl', label: 'XL', desc: 'Max (60pt)' },
                    ].map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleFieldChange('heroTitleSize', s.id)}
                        className={`py-2 px-1 rounded-xl border text-center transition cursor-pointer ${
                          (config.heroTitleSize || 'md') === s.id
                            ? isLight 
                              ? 'bg-slate-800 border-slate-800 text-white shadow-xs font-bold ring-1 ring-slate-800' 
                              : 'bg-slate-800 border-slate-600 text-white shadow-xs font-bold ring-1 ring-slate-500/50'
                            : isLight
                              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <div className="font-bold text-xs">{s.label}</div>
                        <div className="text-[9px] opacity-60">{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hero Top Spacing / Gap Control */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className={`font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Title Top Gap / Spacing:</label>
                    <span className="text-[10px] text-amber-500 font-mono font-bold">
                      {config.heroTopGap === 'none' ? 'Minimal Gap' : config.heroTopGap === 'normal' ? 'Normal Gap' : config.heroTopGap === 'lg' ? 'Large Gap' : 'Compact Gap (Default)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'none', label: 'Minimal', desc: 'Minimal' },
                      { id: 'sm', label: 'Compact', desc: 'Tight' },
                      { id: 'normal', label: 'Normal', desc: 'Normal' },
                      { id: 'lg', label: 'Spacious', desc: 'Relaxed' },
                    ].map(g => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => handleFieldChange('heroTopGap', g.id)}
                        className={`py-1.5 px-1 rounded-xl border text-center transition cursor-pointer ${
                          (config.heroTopGap || 'sm') === g.id
                            ? isLight 
                              ? 'bg-slate-800 border-slate-800 text-white shadow-xs font-bold ring-1 ring-slate-800' 
                              : 'bg-slate-800 border-slate-600 text-white shadow-xs font-bold ring-1 ring-slate-500/50'
                            : isLight
                              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <div className="font-bold text-xs">{g.label}</div>
                        <div className="text-[9px] opacity-60">{g.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Text Alignment:</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleFieldChange('heroAlignment', 'left')}
                        className={`py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer ${
                          config.heroAlignment === 'left'
                            ? isLight 
                              ? 'bg-slate-800 border-slate-800 text-white shadow-xs font-bold' 
                              : 'bg-slate-800 border-slate-600 text-white shadow-xs font-bold'
                            : isLight
                              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <AlignLeft className="w-3.5 h-3.5" />
                        <span>Left</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFieldChange('heroAlignment', 'center')}
                        className={`py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer ${
                          config.heroAlignment === 'center'
                            ? isLight 
                              ? 'bg-slate-800 border-slate-800 text-white shadow-xs font-bold' 
                              : 'bg-slate-800 border-slate-600 text-white shadow-xs font-bold'
                            : isLight
                              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <AlignCenter className="w-3.5 h-3.5" />
                        <span>Center</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Section Padding:</label>
                    <select
                      value={config.heroPadding}
                      onChange={(e) => handleFieldChange('heroPadding', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-indigo-500"
                    >
                      <option value="compact">Compact (py-8)</option>
                      <option value="normal">Standard (py-12)</option>
                      <option value="spacious">Spacious (py-16)</option>
                    </select>
                  </div>
                </div>

                {/* Toggle: Live Production Hub */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-white font-semibold">Live Production Hub Radar Pill</span>
                    <p className="text-[10px] text-slate-500">Pulsing green domestic production facility badge</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showLiveHubBadge !== false}
                    onChange={(e) => handleFieldChange('showLiveHubBadge', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>

                {/* Toggle: Regional Country Switcher Buttons */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-white font-semibold">Domestic Country Switcher Pills (🇺🇸 USA, 🇬🇧 UK, 🇨🇦 Canada)</span>
                    <p className="text-[10px] text-slate-500">Show or hide the domestic market buttons (toggle to show or hide)</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showHubSwitcher !== false}
                    onChange={(e) => handleFieldChange('showHubSwitcher', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>

                {/* Inline Microsoft Word / Google Docs Typography Controls for Hero */}
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Type className="w-3.5 h-3.5" />
                    <span>Hero Typography & Docs Styling</span>
                  </h3>
                  <WordDocsTypographyToolbar
                    label="Hero Main Title — Word / Docs Formatting"
                    value={config?.typography?.heroTitle}
                    onChange={(val) => handleTypographyChange('heroTitle', val)}
                    isLight={isLight}
                    sampleText={`${config.heroTitlePrefix || 'Custom Goods Printed'} ${config.heroTitleAccent || 'Domestically'}`}
                  />
                  <WordDocsTypographyToolbar
                    label="Hero Subtitle — Word / Docs Formatting"
                    value={config?.typography?.heroSubtitle}
                    onChange={(val) => handleTypographyChange('heroSubtitle', val)}
                    isLight={isLight}
                    sampleText={config.heroSubtitle || 'Fast fulfillment across 4 domestic hubs. Uncompromising POD quality.'}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section: Mega Menu & Global Search */}
          {activeSection === 'megamenu' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Vista Mega Menu & Global Search</h2>
                </div>
                <span className="text-[10px] text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 rounded font-mono">
                  Navigation Architecture
                </span>
              </div>

              {/* Inline Microsoft Word / Google Docs Typography Controls for Mega Menu */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Type className="w-3.5 h-3.5" />
                  <span>Mega Menu Typography & Docs Formatting</span>
                </h3>
                <WordDocsTypographyToolbar
                  label="Column Headings"
                  value={config?.typography?.megaMenuHeadings}
                  onChange={(val) => handleTypographyChange('megaMenuHeadings', val)}
                  isLight={isLight}
                  sampleText="SPECIAL OFFERS & DEALS"
                />
                <WordDocsTypographyToolbar
                  label="Flyout Links"
                  value={config?.typography?.megaMenuItems}
                  onChange={(val) => handleTypographyChange('megaMenuItems', val)}
                  isLight={isLight}
                  sampleText="Custom Christmas Cards with Gold Foil"
                />
              </div>

              {/* Global Search Bar Controls */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-white font-bold text-xs">Global Live Product Search Bar</span>
                      <p className="text-[10px] text-slate-500">Enable VistaPrint-style instant search input in top header</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showSearchBar !== false}
                    onChange={(e) => handleFieldChange('showSearchBar', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>

                {config.showSearchBar !== false && (
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                      Search Bar Placeholder Text:
                    </label>
                    <input
                      type="text"
                      value={config.searchPlaceholder || ''}
                      onChange={(e) => handleFieldChange('searchPlaceholder', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                      placeholder="e.g. Search 100+ custom products..."
                    />
                  </div>
                )}
              </div>

              {/* Mega Menu Navigation Bar Controls */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="text-white font-bold text-xs">Horizontal Mega Menu Bar</span>
                      <p className="text-[10px] text-slate-500">Displays full-width category navigation with dropdown submenus below header</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showMegaMenu !== false}
                    onChange={(e) => handleFieldChange('showMegaMenu', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>

                {config.showMegaMenu !== false && (
                  <div className="space-y-4 pt-2">
                    {/* Mega Menu Dropdown Font Size & Spacing Controls */}
                    <div className="p-4 bg-slate-900/90 border border-indigo-500/30 rounded-xl space-y-4">
                      <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
                        <Type className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Dropdown Typography & Spacing
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                        {/* 1. Dropdown Items Font Size */}
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1 text-[11px]">
                            Submenu Item Font Size:
                          </label>
                          <select
                            value={config.dropdownItemFontSize || 'sm'}
                            onChange={(e) => handleFieldChange('dropdownItemFontSize', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-medium focus:border-indigo-500"
                          >
                            <option value="xs">Extra Small (11px)</option>
                            <option value="sm">Small (12px - Vista Default)</option>
                            <option value="base">Medium (13px)</option>
                            <option value="lg">Large (14px)</option>
                          </select>
                        </div>

                        {/* 2. Column Heading Font Size */}
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1 text-[11px]">
                            Column Heading Size:
                          </label>
                          <select
                            value={config.dropdownHeadingFontSize || 'sm'}
                            onChange={(e) => handleFieldChange('dropdownHeadingFontSize', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-medium focus:border-indigo-500"
                          >
                            <option value="xs">Tiny (10px)</option>
                            <option value="sm">Small (11px - Default)</option>
                            <option value="base">Medium (12px)</option>
                            <option value="lg">Large (13px)</option>
                          </select>
                        </div>

                        {/* 3. Dropdown Vertical Padding */}
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1 text-[11px]">
                            Flyout Padding:
                          </label>
                          <select
                            value={config.dropdownPadding || 'normal'}
                            onChange={(e) => handleFieldChange('dropdownPadding', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-medium focus:border-indigo-500"
                          >
                            <option value="compact">Compact (16px)</option>
                            <option value="normal">Normal (24px)</option>
                            <option value="spacious">Spacious (32px)</option>
                          </select>
                        </div>

                        {/* 4. Submenu Item Vertical Spacing */}
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1 text-[11px]">
                            Item Spacing / Gap:
                          </label>
                          <select
                            value={config.dropdownItemSpacing || 'normal'}
                            onChange={(e) => handleFieldChange('dropdownItemSpacing', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-medium focus:border-indigo-500"
                          >
                            <option value="compact">Compact (Tight)</option>
                            <option value="normal">Normal (Standard)</option>
                            <option value="spacious">Spacious (Relaxed)</option>
                          </select>
                        </div>
                      </div>

                      {/* Secondary Row: Top Menu Bar Font & Spacing */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800 text-xs">
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1 text-[11px]">
                            Menu Bar Item Size:
                          </label>
                          <select
                            value={config.menuBarFontSize || 'sm'}
                            onChange={(e) => handleFieldChange('menuBarFontSize', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-medium focus:border-indigo-500"
                          >
                            <option value="xs">Extra Small (11px)</option>
                            <option value="sm">Small (12px - Default)</option>
                            <option value="base">Medium (13px)</option>
                            <option value="lg">Large (14px)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-400 font-semibold mb-1 text-[11px]">
                            Menu Bar Tab Spacing:
                          </label>
                          <select
                            value={config.menuBarItemSpacing || 'normal'}
                            onChange={(e) => handleFieldChange('menuBarItemSpacing', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-medium focus:border-indigo-500"
                          >
                            <option value="compact">Compact (Tight)</option>
                            <option value="normal">Normal (Standard)</option>
                            <option value="relaxed">Relaxed (Spacious)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-400 font-semibold mb-1 text-[11px]">
                            Column Horizontal Gap:
                          </label>
                          <select
                            value={config.dropdownColumnGap || 'normal'}
                            onChange={(e) => handleFieldChange('dropdownColumnGap', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-medium focus:border-indigo-500"
                          >
                            <option value="compact">Compact Gap (16px)</option>
                            <option value="normal">Normal Gap (24px)</option>
                            <option value="spacious">Spacious Gap (32px)</option>
                          </select>
                        </div>
                      </div>

                      {/* VistaPrint Submenu Order Flow Settings */}
                      <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-400 font-semibold mb-1 text-[11px]">
                            Submenu Item Click Flow:
                          </label>
                          <select
                            value={config.submenuClickAction || 'configurator'}
                            onChange={(e) => handleFieldChange('submenuClickAction', e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-medium focus:border-indigo-500"
                          >
                            <option value="configurator">Open VistaPrint Product Configurator (Direct Order)</option>
                            <option value="filter">Filter Storefront Catalog (Catalog Search & Filter)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-400 font-semibold mb-1 text-[11px]">
                            Default Card Order Quantity:
                          </label>
                          <select
                            value={config.defaultCardQuantity || 100}
                            onChange={(e) => handleFieldChange('defaultCardQuantity', parseInt(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-medium focus:border-indigo-500"
                          >
                            <option value="50">50 pcs ($14.99)</option>
                            <option value="100">100 pcs ($19.99 - Standard)</option>
                            <option value="250">250 pcs ($29.99)</option>
                            <option value="500">500 pcs ($39.99)</option>
                            <option value="1000">1,000 pcs ($59.99)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* WordPress-Style Menu Actions Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white">
                          Navigation Menu Items ({(config.megaMenuCategories || DEFAULT_STOREFRONT_CONFIG.megaMenuCategories).length})
                        </span>
                        <span className="text-[10px] text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono">
                          WordPress Style
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={handleResetMenuToDefaults}
                          className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center space-x-1"
                          title="Restore default VistaPrint menu structure"
                        >
                          <RotateCcw className="w-3 h-3 text-slate-400" />
                          <span>Reset Vista Defaults</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleAddMenuItem}
                          className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition flex items-center space-x-1.5"
                          title="Add a new custom menu item"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Menu Item</span>
                        </button>
                      </div>
                    </div>

                    {/* Draggable / Reorderable Menu Cards */}
                    <div className="space-y-3">
                      {(config.megaMenuCategories || DEFAULT_STOREFRONT_CONFIG.megaMenuCategories).map((cat, idx) => {
                        const totalCats = (config.megaMenuCategories || DEFAULT_STOREFRONT_CONFIG.megaMenuCategories).length;
                        return (
                          <div 
                            key={cat.id || idx} 
                            className="p-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl space-y-3 text-xs transition shadow-sm"
                          >
                            {/* Card Header: Reorder Up/Down, Index, Title, and Delete Button */}
                            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                              <div className="flex items-center space-x-2">
                                {/* Order Controls (WordPress style) */}
                                <div className="flex items-center space-x-0.5 bg-slate-950 rounded border border-slate-800 p-0.5">
                                  <button
                                    type="button"
                                    disabled={idx === 0}
                                    onClick={() => handleMoveMenuItem(idx, -1)}
                                    className={`p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition ${idx === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                    title="Move item up"
                                  >
                                    <ArrowUp className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={idx === totalCats - 1}
                                    onClick={() => handleMoveMenuItem(idx, 1)}
                                    className={`p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition ${idx === totalCats - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                    title="Move item down"
                                  >
                                    <ArrowDown className="w-3 h-3" />
                                  </button>
                                </div>

                                <span className="font-mono text-[10px] text-slate-500">#{idx + 1}</span>
                                <span className="font-extrabold text-white text-xs">{cat.title}</span>

                                {cat.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                    {cat.badge}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                                  Key: {cat.categoryKey}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMenuItem(idx)}
                                  className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 transition border border-rose-900/30"
                                  title={`Delete menu item "${cat.title}"`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Card Inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                              <div>
                                <label className="block text-[10px] text-slate-400 mb-1 font-semibold">
                                  Menu Title:
                                </label>
                                <input
                                  type="text"
                                  value={cat.title}
                                  onChange={(e) => handleMegaMenuCategoryChange(idx, 'title', e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-bold text-xs focus:border-indigo-500 focus:outline-none"
                                  placeholder="e.g. Deals, Holiday Cards"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-400 mb-1 font-semibold">
                                  Category Key:
                                </label>
                                <select
                                  value={cat.categoryKey}
                                  onChange={(e) => handleMegaMenuCategoryChange(idx, 'categoryKey', e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:border-indigo-500 focus:outline-none"
                                >
                                  <option value="Deals">🔥 Deals (Promo & Offers)</option>
                                  <option value="Holiday">🎄 Holiday Cards (Festive & Seasonal)</option>
                                  <option value="Gifts">🎁 Gifts & Calendars (Wall & Desk)</option>
                                  <option value="Marketing">💼 Marketing & Business (Cards & Stationery)</option>
                                  <option value="Apparel">👕 Clothing & Bags (Apparel & Accessories)</option>
                                  <option value="Wall Art">🖼️ Signs & Wall Art (Banners & Canvas)</option>
                                  <option value="Accessories">🏷️ Labels & Stickers (Packaging & Decals)</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-400 mb-1 font-semibold">
                                  Badge Label (Optional):
                                </label>
                                <input
                                  type="text"
                                  value={cat.badge || ''}
                                  onChange={(e) => handleMegaMenuCategoryChange(idx, 'badge', e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-amber-300 text-xs focus:border-indigo-500 focus:outline-none font-semibold"
                                  placeholder="e.g. 25% OFF, Sale, Hot"
                                />
                              </div>
                            </div>

                            {/* Subcategories Editor */}
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="text-[10px] text-slate-400 font-semibold">
                                  Dropdown Subcategories (comma-separated):
                                </label>
                                <span className="text-[9px] text-slate-500">{(cat.subcategories || []).length} sub-items</span>
                              </div>
                              <input
                                type="text"
                                value={(cat.subcategories || []).join(', ')}
                                onChange={(e) => handleMegaMenuCategoryChange(idx, 'subcategories', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:border-indigo-500 focus:outline-none"
                                placeholder="e.g. Christmas Cards, Photo Cards, New Year Cards"
                              />

                              {/* Live Pills of Subcategories */}
                              {(cat.subcategories || []).length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1.5">
                                  {(cat.subcategories || []).map((sub, sIdx) => (
                                    <span key={sIdx} className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] bg-slate-950 border border-slate-800 text-slate-300">
                                      <span>{sub}</span>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section: Vista Promotional Photo Slider & SAVE 25% */}
          {activeSection === 'promoslider' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <BadgePercent className="w-4 h-4 text-amber-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                    Vista Promotional Photo Slider (Featured Carousel)
                  </h2>
                </div>
                <span className="text-[10px] text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
                  Hero Showcase
                </span>
              </div>

              {/* Master Toggle */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-white font-bold text-xs">Enable Promotional Photo Carousel</span>
                  <p className="text-[10px] text-slate-500">
                    Displays rotating slides with flanking photos, quotes/captions, and centered SAVE 25% promo offer directly after product menu
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={config.showPromoSlider !== false}
                  onChange={(e) => handleFieldChange('showPromoSlider', e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                />
              </div>

              {config.showPromoSlider !== false && (
                <div className="space-y-4 text-xs">
                  {/* General Discount Settings */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                    <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">
                      Promotional Offer & Discount Settings
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                          Discount Headline:
                        </label>
                        <input
                          type="text"
                          value={config.promoDiscountHeadline || 'SAVE 25%'}
                          onChange={(e) => handleFieldChange('promoDiscountHeadline', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-extrabold"
                          placeholder="e.g. SAVE 25%"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                          Promo Coupon Code:
                        </label>
                        <input
                          type="text"
                          value={config.promoCode || 'SAVE25'}
                          onChange={(e) => handleFieldChange('promoCode', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-amber-300 font-mono font-bold"
                          placeholder="e.g. SAVE25"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                          Top Badge Label:
                        </label>
                        <input
                          type="text"
                          value={config.promoBadgeText || ''}
                          onChange={(e) => handleFieldChange('promoBadgeText', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                          placeholder="e.g. VISTAPRINT EXCLUSIVE"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                        Promo Subtitle / Description:
                      </label>
                      <input
                        type="text"
                        value={config.promoDiscountSub || ''}
                        onChange={(e) => handleFieldChange('promoDiscountSub', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200"
                        placeholder="Save 25% on custom marketing materials..."
                      />
                    </div>
                  </div>

                  {/* Individual Slides Configuration */}
                  <div className="space-y-3">
                    <label className="block text-[11px] text-slate-300 font-bold uppercase tracking-wider">
                      Configure Photo Slides:
                    </label>

                    {(config.promoSlides || DEFAULT_STOREFRONT_CONFIG.promoSlides).map((slide, sIdx) => (
                      <div key={slide.id || sIdx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
                          <span className="font-bold text-amber-400">Slide #{sIdx + 1}: {slide.tag}</span>
                          <span className="text-[10px] text-slate-500 font-mono">Target: {slide.targetCategory}</span>
                        </div>

                        {/* Left Photo & Quote */}
                        <div className="p-2.5 bg-slate-900/80 rounded-lg space-y-1.5 border border-slate-800">
                          <div className="font-semibold text-indigo-300 text-[11px]">Left Photo & Quote:</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] text-slate-400">Image URL:</label>
                              <input
                                type="text"
                                value={slide.leftImage}
                                onChange={(e) => handlePromoSlideChange(sIdx, 'leftImage', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-300 text-[11px]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400">Caption / Product Name:</label>
                              <input
                                type="text"
                                value={slide.leftCaption}
                                onChange={(e) => handlePromoSlideChange(sIdx, 'leftCaption', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-300 text-[11px]"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-400">Quotation / Callout:</label>
                            <input
                              type="text"
                              value={slide.leftQuote}
                              onChange={(e) => handlePromoSlideChange(sIdx, 'leftQuote', e.target.value)}
                              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 text-[11px] italic"
                            />
                          </div>
                        </div>

                        {/* Right Photo & Quote */}
                        <div className="p-2.5 bg-slate-900/80 rounded-lg space-y-1.5 border border-slate-800">
                          <div className="font-semibold text-emerald-300 text-[11px]">Right Photo & Quote:</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] text-slate-400">Image URL:</label>
                              <input
                                type="text"
                                value={slide.rightImage}
                                onChange={(e) => handlePromoSlideChange(sIdx, 'rightImage', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-300 text-[11px]"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400">Caption / Product Name:</label>
                              <input
                                type="text"
                                value={slide.rightCaption}
                                onChange={(e) => handlePromoSlideChange(sIdx, 'rightCaption', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-300 text-[11px]"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-400">Quotation / Callout:</label>
                            <input
                              type="text"
                              value={slide.rightQuote}
                              onChange={(e) => handlePromoSlideChange(sIdx, 'rightQuote', e.target.value)}
                              className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 text-[11px] italic"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section: Vista Categories & Wholesale Bulk Discounts */}
          {activeSection === 'vistaspec' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Grid className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Vista Category Tiles & Bulk Discounts</h2>
                </div>
                <span className="text-[10px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                  Conversion Boosters
                </span>
              </div>

              {/* Inline Microsoft Word / Google Docs Typography Controls for Products & Categories */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Type className="w-3.5 h-3.5" />
                  <span>Product Card Typography & Docs Formatting</span>
                </h3>
                <WordDocsTypographyToolbar
                  label="Product Title"
                  value={config?.typography?.productTitle}
                  onChange={(val) => handleTypographyChange('productTitle', val)}
                  isLight={isLight}
                  sampleText="Premium 16pt Soft-Touch Business Cards"
                />
                <WordDocsTypographyToolbar
                  label="Product Price Tag"
                  value={config?.typography?.productPrice}
                  onChange={(val) => handleTypographyChange('productPrice', val)}
                  isLight={isLight}
                  sampleText="From $19.99"
                />
                <WordDocsTypographyToolbar
                  label="Product Description"
                  value={config?.typography?.productDesc}
                  onChange={(val) => handleTypographyChange('productDesc', val)}
                  isLight={isLight}
                  sampleText="Heavy 350 GSM satin paper with foil-stamping accents and rich print."
                />
              </div>

              {/* Category Showcase Grid Toggle */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold text-xs">Explore Popular Categories Showcase</span>
                    <p className="text-[10px] text-slate-500">Shows 6 photography category cards with starting prices below hero</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showCategoryShowcase !== false}
                    onChange={(e) => handleFieldChange('showCategoryShowcase', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>

                {config.showCategoryShowcase !== false && (
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 font-semibold mb-1">Section Title:</label>
                        <input
                          type="text"
                          value={config.categoryShowcaseTitle || ''}
                          onChange={(e) => handleFieldChange('categoryShowcaseTitle', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 font-semibold mb-1">Section Subtitle:</label>
                        <input
                          type="text"
                          value={config.categoryShowcaseSubtitle || ''}
                          onChange={(e) => handleFieldChange('categoryShowcaseSubtitle', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="block text-[11px] text-slate-300 font-semibold">6 Showcase Category Cards:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(config.categoryShowcaseCards || DEFAULT_STOREFRONT_CONFIG.categoryShowcaseCards).map((card, idx) => (
                          <div key={idx} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg space-y-1.5 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-emerald-400">Card #{idx + 1}</span>
                              <span className="text-[9px] text-slate-500">Filter: {card.category}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              <div>
                                <label className="text-[9px] text-slate-400">Title:</label>
                                <input
                                  type="text"
                                  value={card.title}
                                  onChange={(e) => handleCategoryCardChange(idx, 'title', e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-white text-[11px]"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] text-slate-400">Starting Price ($):</label>
                                <input
                                  type="text"
                                  value={card.startingPrice}
                                  onChange={(e) => handleCategoryCardChange(idx, 'startingPrice', e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-white text-[11px]"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[9px] text-slate-400">Badge Tag:</label>
                              <input
                                type="text"
                                value={card.badge || ''}
                                onChange={(e) => handleCategoryCardChange(idx, 'badge', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-white text-[10px]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 100% Satisfaction Guarantee Section */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-indigo-400" />
                    <div>
                      <span className="text-white font-bold text-xs">100% Satisfaction Guarantee Banner</span>
                      <p className="text-[10px] text-slate-500">Reassurance banner guaranteeing quality, free reprints, or full refund</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showSatisfactionGuarantee !== false}
                    onChange={(e) => handleFieldChange('showSatisfactionGuarantee', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>

                {config.showSatisfactionGuarantee !== false && (
                  <div className="space-y-2 pt-1 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-400 font-semibold mb-0.5">Guarantee Headline:</label>
                      <input
                        type="text"
                        value={config.guaranteeHeading || ''}
                        onChange={(e) => handleFieldChange('guaranteeHeading', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 font-semibold mb-0.5">Guarantee Subtext:</label>
                      <textarea
                        rows="2"
                        value={config.guaranteeSubtext || ''}
                        onChange={(e) => handleFieldChange('guaranteeSubtext', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bulk Quantity Discounts Tiers */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BadgePercent className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="text-white font-bold text-xs">Wholesale Bulk Discounts Table</span>
                      <p className="text-[10px] text-slate-500">Shows tiered volume savings inside the product customizer modal</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showBulkDiscounts !== false}
                    onChange={(e) => handleFieldChange('showBulkDiscounts', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>

                {config.showBulkDiscounts !== false && (
                  <div className="grid grid-cols-3 gap-2.5 pt-1 text-xs">
                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-center">
                      <span className="text-[10px] text-slate-400 block mb-1">Tier 1 (Small Bulk)</span>
                      <div className="font-bold text-white text-xs">5+ Units</div>
                      <div className="text-emerald-400 font-mono font-bold text-xs mt-0.5">{config.bulkTier1Discount || 10}% OFF</div>
                    </div>
                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-center">
                      <span className="text-[10px] text-slate-400 block mb-1">Tier 2 (Medium Bulk)</span>
                      <div className="font-bold text-white text-xs">10+ Units</div>
                      <div className="text-emerald-400 font-mono font-bold text-xs mt-0.5">{config.bulkTier2Discount || 15}% OFF</div>
                    </div>
                    <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-center">
                      <span className="text-[10px] text-slate-400 block mb-1">Tier 3 (Large Bulk)</span>
                      <div className="font-bold text-white text-xs">25+ Units</div>
                      <div className="text-emerald-400 font-mono font-bold text-xs mt-0.5">{config.bulkTier3Discount || 25}% OFF</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 2: Columns & Spacing */}
          {activeSection === 'layout' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Columns className="w-4 h-4 text-amber-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Product Grid Columns & Spacing</h2>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Catalog Grid Controls</span>
              </div>

              <div className="space-y-4 text-xs">
                {/* Column Count Selector */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    Grid Columns on Desktop:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[2, 3, 4, 5].map(cols => (
                      <button
                        key={cols}
                        type="button"
                        onClick={() => handleFieldChange('gridColumns', cols)}
                        className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                          config.gridColumns === cols
                            ? isLight 
                              ? 'bg-slate-800 border-slate-800 text-white shadow-xs font-bold ring-1 ring-slate-800' 
                              : 'bg-slate-800 border-slate-600 text-white shadow-xs font-bold ring-1 ring-slate-500/50'
                            : isLight
                              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <div className="font-bold text-sm">{cols} Columns</div>
                        <div className="text-[10px] opacity-75">{cols === 2 ? 'Large tiles' : cols === 4 ? 'Standard' : cols === 5 ? 'Dense' : 'Spacious'}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid Spacing / Gap Selector */}
                <div>
                  <label className={`block font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Grid Gap / Item Spacing:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'compact', label: 'Compact Gap (16px)', desc: 'gap-4' },
                      { id: 'normal', label: 'Normal Gap (24px)', desc: 'gap-6' },
                      { id: 'spacious', label: 'Spacious Gap (32px)', desc: 'gap-8' },
                    ].map(gap => (
                      <button
                        key={gap.id}
                        type="button"
                        onClick={() => handleFieldChange('gridGap', gap.id)}
                        className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                          config.gridGap === gap.id
                            ? isLight 
                              ? 'bg-slate-800 border-slate-800 text-white shadow-xs font-bold ring-1 ring-slate-800' 
                              : 'bg-slate-800 border-slate-600 text-white shadow-xs font-bold ring-1 ring-slate-500/50'
                            : isLight
                              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-semibold text-xs">{gap.label}</div>
                        <div className="text-[10px] opacity-60 font-mono">{gap.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Catalog Section Vertical Spacing */}
                <div>
                  <label className={`block font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Product Section Vertical Spacing:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'compact', label: 'Compact (24px)', desc: 'py-6' },
                      { id: 'normal', label: 'Normal (48px)', desc: 'py-12' },
                      { id: 'spacious', label: 'Spacious (80px)', desc: 'py-20' },
                    ].map(pad => (
                      <button
                        key={pad.id}
                        type="button"
                        onClick={() => handleFieldChange('catalogPadding', pad.id)}
                        className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                          (config.catalogPadding || 'normal') === pad.id
                            ? isLight 
                              ? 'bg-slate-800 border-slate-800 text-white shadow-xs font-bold ring-1 ring-slate-800' 
                              : 'bg-slate-800 border-slate-600 text-white shadow-xs font-bold ring-1 ring-slate-500/50'
                            : isLight
                              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-semibold text-xs">{pad.label}</div>
                        <div className="text-[10px] opacity-60 font-mono">{pad.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Corner Radius */}
                <div>
                  <label className={`block font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Product Card Corner Curvature:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'lg', label: 'Slight (lg)' },
                      { id: 'xl', label: 'Rounded (xl)' },
                      { id: '2xl', label: 'Smooth (2xl)' },
                      { id: '3xl', label: 'Ultra (3xl)' }
                    ].map(r => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => handleFieldChange('cardRadius', r.id)}
                        className={`py-2 rounded-xl border text-center transition text-xs font-semibold cursor-pointer ${
                          config.cardRadius === r.id
                            ? isLight
                              ? 'bg-slate-800 border-slate-800 text-white shadow-xs font-bold ring-1 ring-slate-800'
                              : 'bg-slate-800 border-slate-600 text-white shadow-xs font-bold ring-1 ring-slate-500/50'
                            : isLight
                              ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Pills Bar Toggle */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-white font-semibold">Category Filter Pills Bar</span>
                    <p className="text-[10px] text-slate-500">Enable buttons for Apparel, Home & Living, Wall Art, etc.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showCategoryPills}
                    onChange={(e) => handleFieldChange('showCategoryPills', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Announcement Ribbon */}
          {activeSection === 'announcement' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Megaphone className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Top Announcement Bar</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-slate-400">Show Ribbon:</span>
                  <input
                    type="checkbox"
                    checked={config.showAnnouncement}
                    onChange={(e) => handleFieldChange('showAnnouncement', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Announcement Headline Text:
                  </label>
                  <input
                    type="text"
                    value={config.announcementText}
                    onChange={(e) => handleFieldChange('announcementText', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Regional Facility Pills:
                  </label>
                  <input
                    type="text"
                    value={config.announcementFacilities}
                    onChange={(e) => handleFieldChange('announcementFacilities', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Trust Badges & Couriers */}
          {activeSection === 'badges' && (
            <div className={`rounded-2xl p-6 space-y-4 shadow-xl border ${
              isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-slate-900 border-slate-800 text-white'
            }`}>
              <div className={`flex items-center justify-between pb-3 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <h2 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>Trust Badges & Couriers</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Show Row:</span>
                  <input
                    type="checkbox"
                    checked={config.showTrustProps !== false}
                    onChange={(e) => handleFieldChange('showTrustProps', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-3 text-xs">
                {config.trustProps.map((prop, idx) => (
                  <div key={idx} className={`p-3 rounded-xl space-y-2 border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${isLight ? 'text-indigo-600' : 'text-indigo-300'}`}>Badge #{idx + 1}</span>
                      <span className="text-[10px] text-slate-500">{idx === 0 ? 'Courier' : idx === 1 ? 'Eco Inks' : 'Social Proof'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-0.5">Title Text:</label>
                        <input
                          type="text"
                          value={prop.title}
                          onChange={(e) => handleTrustPropChange(idx, 'title', e.target.value)}
                          className={`w-full rounded-lg px-2.5 py-1.5 border outline-none ${
                            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-0.5">Subtitle / Subtext:</label>
                        <input
                          type="text"
                          value={prop.subtitle}
                          onChange={(e) => handleTrustPropChange(idx, 'subtitle', e.target.value)}
                          className={`w-full rounded-lg px-2.5 py-1.5 border outline-none ${
                            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Languages & Localization (Requirement 2 & 3) */}
          {activeSection === 'languages' && (
            <div className={`rounded-2xl p-6 space-y-5 shadow-xl border ${
              isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-slate-900 border-slate-800 text-white'
            }`}>
              <div className={`flex items-center justify-between pb-3 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-indigo-400" />
                  <h2 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Languages & Global Localization
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Enable Switcher:</span>
                  <input
                    type="checkbox"
                    checked={config.showLanguageSelector !== false}
                    onChange={(e) => handleFieldChange('showLanguageSelector', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>
              </div>

              {/* Default Language Picker */}
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}>
                <div>
                  <span className={`font-bold text-xs block ${isLight ? 'text-slate-900' : 'text-white'}`}>Default Store Language</span>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Primary language shown when international customers first visit the storefront
                  </p>
                </div>
                <select
                  value={config.defaultLanguage || 'en'}
                  onChange={(e) => handleFieldChange('defaultLanguage', e.target.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
                    isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                  }`}
                >
                  {(config.languages || DEFAULT_STOREFRONT_CONFIG.languages).map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name} ({lang.code.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Languages List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    Active Languages ({(config.languages || DEFAULT_STOREFRONT_CONFIG.languages).length})
                  </span>
                  <span className="text-[10px] text-slate-400">Available in customer header dropdown</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(config.languages || DEFAULT_STOREFRONT_CONFIG.languages).map((lang) => {
                    const isDefault = (config.defaultLanguage || 'en') === lang.code;
                    return (
                      <div
                        key={lang.code}
                        className={`p-3 rounded-xl border flex items-center justify-between transition ${
                          isLight ? 'bg-slate-50 border-slate-200 hover:border-slate-300' : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="text-xl">{lang.flag}</span>
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                {lang.name}
                              </span>
                              {isDefault && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                                  Default
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono uppercase">{lang.code}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveLanguage(lang.code)}
                          disabled={(config.languages || DEFAULT_STOREFRONT_CONFIG.languages).length <= 1}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title={`Remove ${lang.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add New Language Form */}
              <div className={`p-4 rounded-xl border space-y-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Add New Language
                  </span>
                  <span className="text-[10px] text-slate-400">Add any regional language to your storefront</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] text-slate-400 mb-1">Flag Emoji:</label>
                    <input
                      type="text"
                      value={newLangFlag}
                      onChange={(e) => setNewLangFlag(e.target.value)}
                      placeholder="e.g. 🇧🇷"
                      className={`w-full px-2.5 py-1.5 rounded-lg text-xs text-center border outline-none ${
                        isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-400 mb-1">Language Name:</label>
                    <input
                      type="text"
                      value={newLangName}
                      onChange={(e) => setNewLangName(e.target.value)}
                      placeholder="e.g. Portuguese (Português)"
                      className={`w-full px-2.5 py-1.5 rounded-lg text-xs border outline-none ${
                        isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] text-slate-400 mb-1">Code (2-letter):</label>
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="text"
                        value={newLangCode}
                        onChange={(e) => setNewLangCode(e.target.value)}
                        placeholder="pt"
                        maxLength={5}
                        className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-mono uppercase text-center border outline-none ${
                          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={handleAddLanguage}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-1 transition shadow-xs cursor-pointer shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Popular Language Quick Presets */}
                <div className="pt-2">
                  <span className="text-[10px] text-slate-400 font-semibold block mb-1.5">Quick Popular Presets:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { flag: '🇩🇪', name: 'Deutsch', code: 'de' },
                      { flag: '🇯🇵', name: '日本語', code: 'ja' },
                      { flag: '🇮🇹', name: 'Italiano', code: 'it' },
                      { flag: '🇧🇷', name: 'Português', code: 'pt' },
                      { flag: '🇳🇱', name: 'Nederlands', code: 'nl' },
                      { flag: '🇨🇳', name: '中文', code: 'zh' },
                      { flag: '🇸🇦', name: 'العربية', code: 'ar' },
                      { flag: '🇰🇷', name: '한국어', code: 'ko' },
                    ].map(preset => {
                      const isAdded = (config.languages || DEFAULT_STOREFRONT_CONFIG.languages).some(l => l.code === preset.code);
                      return (
                        <button
                          key={preset.code}
                          type="button"
                          onClick={() => {
                            if (isAdded) {
                              handleRemoveLanguage(preset.code);
                            } else {
                              const updated = [...(config.languages || DEFAULT_STOREFRONT_CONFIG.languages), preset];
                              setConfig(prev => ({ ...prev, languages: updated }));
                              showToast(`Added ${preset.name}`);
                            }
                          }}
                          className={`px-2 py-1 rounded-lg text-[11px] font-medium border flex items-center space-x-1 transition cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 font-bold'
                              : isLight ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span>{preset.flag}</span>
                          <span>{preset.name}</span>
                          <span className="text-[9px] opacity-70">({isAdded ? '✓' : '+'})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section: Social Media & Live Chat (Requirement 1, 4, 6) */}
          {activeSection === 'socials' && (
            <div className={`rounded-2xl p-6 space-y-5 shadow-xl border ${
              isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-slate-900 border-slate-800 text-white'
            }`}>
              <div className={`flex items-center justify-between pb-3 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <h2 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Social Media Icons & Customer Support Chat
                  </h2>
                </div>
                <span className="text-[10px] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">
                  Omnichannel
                </span>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                }`}>
                  <div>
                    <span className={`text-xs font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Header Social Media Icons
                    </span>
                    <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Display social links in the top header / announcement bar
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showSocialIcons !== false}
                    onChange={(e) => handleFieldChange('showSocialIcons', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>

                <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                }`}>
                  <div>
                    <span className={`text-xs font-bold block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Footer Social Media Icons
                    </span>
                    <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Display brand social channels at the bottom footer section
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showFooterSocials !== false}
                    onChange={(e) => handleFieldChange('showFooterSocials', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>
              </div>

              {/* Social URLs */}
              <div className={`p-4 rounded-xl border space-y-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}>
                <span className={`font-bold text-xs uppercase tracking-wider block ${isLight ? 'text-slate-900' : 'text-indigo-300'}`}>
                  Brand Social Channel Profiles
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">Instagram Profile URL:</label>
                    <input
                      type="text"
                      value={config.socialLinks?.instagram || 'https://instagram.com/printflow'}
                      onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                      placeholder="https://instagram.com/yourbrand"
                      className={`w-full px-2.5 py-1.5 rounded-lg border outline-none font-mono text-xs ${
                        isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">Facebook Page URL:</label>
                    <input
                      type="text"
                      value={config.socialLinks?.facebook || 'https://facebook.com/printflow'}
                      onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                      placeholder="https://facebook.com/yourbrand"
                      className={`w-full px-2.5 py-1.5 rounded-lg border outline-none font-mono text-xs ${
                        isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">X (Twitter) URL:</label>
                    <input
                      type="text"
                      value={config.socialLinks?.twitter || 'https://x.com/printflow'}
                      onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                      placeholder="https://x.com/yourbrand"
                      className={`w-full px-2.5 py-1.5 rounded-lg border outline-none font-mono text-xs ${
                        isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">Pinterest URL:</label>
                    <input
                      type="text"
                      value={config.socialLinks?.pinterest || 'https://pinterest.com/printflow'}
                      onChange={(e) => handleSocialLinkChange('pinterest', e.target.value)}
                      placeholder="https://pinterest.com/yourbrand"
                      className={`w-full px-2.5 py-1.5 rounded-lg border outline-none font-mono text-xs ${
                        isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">TikTok URL:</label>
                    <input
                      type="text"
                      value={config.socialLinks?.tiktok || 'https://tiktok.com/@printflow'}
                      onChange={(e) => handleSocialLinkChange('tiktok', e.target.value)}
                      placeholder="https://tiktok.com/@yourbrand"
                      className={`w-full px-2.5 py-1.5 rounded-lg border outline-none font-mono text-xs ${
                        isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">YouTube Channel URL:</label>
                    <input
                      type="text"
                      value={config.socialLinks?.youtube || 'https://youtube.com/@printflow'}
                      onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                      placeholder="https://youtube.com/@yourbrand"
                      className={`w-full px-2.5 py-1.5 rounded-lg border outline-none font-mono text-xs ${
                        isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Floating Customer Chat & AI Support Settings */}
              <div className={`p-4 rounded-xl border space-y-3.5 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`font-bold text-xs block ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Storefront Live Chatbot & Human Moderator Routing
                    </span>
                    <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Provides an interactive floating chat widget on storefront with AI answers & one-click human moderator transfer
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showLiveChat !== false}
                    onChange={(e) => handleFieldChange('showLiveChat', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">AI Chatbot Persona Name:</label>
                    <input
                      type="text"
                      value={config.chatBotName || 'PrintFlow AI Assistant'}
                      onChange={(e) => handleFieldChange('chatBotName', e.target.value)}
                      className={`w-full px-2.5 py-1.5 rounded-lg border outline-none text-xs ${
                        isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1">Assigned Human Moderator Name:</label>
                    <input
                      type="text"
                      value={config.chatModeratorName || 'Sarah Jenkins (Senior Support Moderator)'}
                      onChange={(e) => handleFieldChange('chatModeratorName', e.target.value)}
                      className={`w-full px-2.5 py-1.5 rounded-lg border outline-none text-xs ${
                        isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">Default Welcome Greeting:</label>
                  <input
                    type="text"
                    value={config.chatWelcomeMessage || 'Hi there! 👋 Welcome to PrintFlow. How can we help you today with your custom prints?'}
                    onChange={(e) => handleFieldChange('chatWelcomeMessage', e.target.value)}
                    className={`w-full px-2.5 py-1.5 rounded-lg border outline-none text-xs ${
                      isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Customer Reviews */}
          {activeSection === 'reviews' && (
            <div className={`rounded-2xl p-6 space-y-4 shadow-xl border ${
              isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-slate-900 border-slate-800 text-white'
            }`}>
              <div className={`flex items-center justify-between pb-3 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <h2 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>Customer Reviews Section</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Enable Section:</span>
                  <input
                    type="checkbox"
                    checked={config.showReviews}
                    onChange={(e) => handleFieldChange('showReviews', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Section Title:</label>
                    <input
                      type="text"
                      value={config.reviewsTitle}
                      onChange={(e) => handleFieldChange('reviewsTitle', e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 font-bold border outline-none ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Section Subtitle:</label>
                    <input
                      type="text"
                      value={config.reviewsSubtitle}
                      onChange={(e) => handleFieldChange('reviewsSubtitle', e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 border outline-none ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <label className={`block font-semibold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>Editable Review Cards:</label>
                  {config.reviews.map((rev, idx) => (
                    <div key={rev.id} className={`p-3 rounded-xl space-y-2 border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-0.5">Author Name:</label>
                          <input
                            type="text"
                            value={rev.name}
                            onChange={(e) => handleReviewChange(idx, 'name', e.target.value)}
                            className={`w-full rounded-lg px-2.5 py-1 border outline-none ${
                              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-0.5">Location & Flag:</label>
                          <input
                            type="text"
                            value={rev.location}
                            onChange={(e) => handleReviewChange(idx, 'location', e.target.value)}
                            className={`w-full rounded-lg px-2.5 py-1 border outline-none ${
                              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-0.5">Review Quote:</label>
                        <textarea
                          rows="2"
                          value={rev.comment}
                          onChange={(e) => handleReviewChange(idx, 'comment', e.target.value)}
                          className={`w-full rounded-lg px-2.5 py-1 border outline-none ${
                            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Footer & Branding */}
          {activeSection === 'footer' && (
            <div className={`rounded-2xl p-6 space-y-4 shadow-xl border ${
              isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-slate-900 border-slate-800 text-white'
            }`}>
              <div className={`flex items-center justify-between pb-3 border-b ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                <div className="flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <h2 className={`text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>Footer & Branding</h2>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded ${
                  isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'
                }`}>Storefront Base</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Brand Name:</label>
                    <input
                      type="text"
                      value={config.brandName}
                      onChange={(e) => handleFieldChange('brandName', e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 font-bold border outline-none ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Badge Tag:</label>
                    <input
                      type="text"
                      value={config.badgeTag}
                      onChange={(e) => handleFieldChange('badgeTag', e.target.value)}
                      className={`w-full rounded-xl px-3 py-2 border outline-none ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Footer Tagline:</label>
                  <input
                    type="text"
                    value={config.footerTagline}
                    onChange={(e) => handleFieldChange('footerTagline', e.target.value)}
                    className={`w-full rounded-xl px-3 py-2 border outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Copyright Line:</label>
                  <input
                    type="text"
                    value={config.copyrightText}
                    onChange={(e) => handleFieldChange('copyrightText', e.target.value)}
                    className={`w-full rounded-xl px-3 py-2 font-mono border outline-none ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 10: 3D Luxury Background & Parallax */}
          {activeSection === 'background' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">3D Luxury Boutique Parallax Background</h2>
                </div>
                <span className="text-[10px] text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
                  Atelier Glass
                </span>
              </div>

              {/* Master Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                <div>
                  <label className="text-xs font-bold text-white block">Enable 3D Boutique Atelier Background</label>
                  <p className="text-[11px] text-slate-400">
                    Replaces plain white with an elegant luxury flagship boutique view seen through frosted glassmorphism.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={config.enableLuxury3dBackground !== false}
                  onChange={(e) => handleFieldChange('enableLuxury3dBackground', e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-5 h-5 cursor-pointer"
                />
              </div>

              {/* Venue Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1 text-xs">
                    Store Venue & Architecture:
                  </label>
                  <select
                    value={config.luxuryBgVenue || 'atelier'}
                    onChange={(e) => handleFieldChange('luxuryBgVenue', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-indigo-500 text-xs"
                  >
                    <option value="atelier">Luxury Modern Design Atelier</option>
                    <option value="flagship">High-End Flagship Boutique</option>
                    <option value="workshop">Artisan Architectural Workshop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1 text-xs">
                    Frosted Glass Blur:
                  </label>
                  <select
                    value={config.luxuryBgBlur || 'medium'}
                    onChange={(e) => handleFieldChange('luxuryBgBlur', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-indigo-500 text-xs"
                  >
                    <option value="subtle">Subtle Glass (10px Blur)</option>
                    <option value="medium">Balanced Glass (14px Blur)</option>
                    <option value="deep">Deep Frosted Velvet (22px Blur)</option>
                  </select>
                </div>
              </div>

              {/* Frosted Glass Transparency / Opacity Continuous Slider (0% - 100%) */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-white font-bold text-xs">
                      Glass Tint Transparency (0% - 100%):
                    </label>
                    <p className="text-[11px] text-slate-400">
                      Adjust background transparency. 0% is crystal-clear glass, 100% is solid opaque.
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <span className="text-sm font-black font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                      {config.luxuryBgGlassOpacity ?? 25}%
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      {(config.luxuryBgGlassOpacity ?? 25) <= 10 ? '✨ Crystal Transparent' : (config.luxuryBgGlassOpacity ?? 25) <= 30 ? '💎 High Clarity Luxe' : (config.luxuryBgGlassOpacity ?? 25) <= 60 ? '❄️ Balanced Frosted' : '☁️ Frosted Veil'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={config.luxuryBgGlassOpacity ?? 25}
                    onChange={(e) => handleFieldChange('luxuryBgGlassOpacity', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0% (Transparent)</span>
                    <span>25% (Luxe Glass)</span>
                    <span>50% (Balanced)</span>
                    <span>75% (Frosted)</span>
                    <span>100% (Solid)</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-semibold mr-1">Quick Presets:</span>
                  {[
                    { label: '0% Clear Glass', val: 0 },
                    { label: '15% Crystal Glass', val: 15 },
                    { label: '25% Luxury Glass', val: 25 },
                    { label: '40% Semi-Frosted', val: 40 },
                    { label: '65% Soft Mist', val: 65 }
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => handleFieldChange('luxuryBgGlassOpacity', preset.val)}
                      className={`text-[10px] px-2.5 py-1 rounded-lg font-medium transition border ${
                        (config.luxuryBgGlassOpacity ?? 25) === preset.val
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parallax Depth Mode */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1 text-xs">
                  Scroll Motion Depth:
                </label>
                <select
                  value={config.luxuryBgDepth || 'dynamic'}
                  onChange={(e) => handleFieldChange('luxuryBgDepth', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium focus:border-indigo-500 text-xs"
                >
                  <option value="dynamic">Dynamic 3D Zoom on Scroll</option>
                  <option value="fixed">Fixed Static Perspective</option>
                </select>
              </div>

              {/* Visual Demonstration Card */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-amber-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>How it works on your Storefront:</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  As customers scroll down or move their cursor, the background smoothly zooms in and shifts perspective—creating the impression of walking deeper into a physical luxury boutique. All product cards and photos sit on crisp frosted white glass, preserving 100% legibility and trust.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Responsive Preview (5 cols) - Permanently Frozen on Desktop */}
        <div className="lg:col-span-5 lg:sticky lg:top-[120px] lg:self-start lg:h-[calc(100vh-140px)] flex flex-col space-y-2 z-20">
          <div className="flex items-center justify-between text-xs px-1 shrink-0">
            <div className="flex items-center space-x-2">
              <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Live Visual Preview</span>
              <span className="text-[10px] text-emerald-500 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.2 rounded-full font-mono font-bold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Frozen Preview 📌</span>
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`text-[10px] font-medium hidden sm:inline ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                🖱️ Scroll Live Preview
              </span>
              <div className={`flex items-center space-x-1 p-0.5 rounded-xl border ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg transition cursor-pointer ${
                    previewDevice === 'desktop'
                      ? isLight ? 'bg-slate-800 text-white font-bold' : 'bg-slate-800 text-white font-bold ring-1 ring-slate-600'
                      : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg transition cursor-pointer ${
                    previewDevice === 'mobile'
                      ? isLight ? 'bg-slate-800 text-white font-bold' : 'bg-slate-800 text-white font-bold ring-1 ring-slate-600'
                      : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Scaled Preview Frame with Browser Chrome & Inner Scroll */}
          <div className={`flex-1 min-h-0 border rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden flex flex-col ${
            isLight ? 'bg-white border-slate-300 shadow-slate-200/60 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
          } ${previewDevice === 'mobile' ? 'max-w-[340px] mx-auto w-full' : 'w-full'}`}>
            
            {/* Browser Header Bar */}
            <div className={`px-3 py-1.5 border-b flex items-center justify-between text-[10px] shrink-0 ${
              isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className={`px-2.5 py-0.5 rounded-md border text-[9px] font-mono flex items-center space-x-1 ${
                isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                <span>🔒 printflow.store/live-preview</span>
              </div>
              <span className="text-[9px] font-semibold text-emerald-500">Online</span>
            </div>

            {/* Scrollable Viewport - Lets user scroll down through the entire store */}
            <div 
              id="admin-preview-viewport"
              className="flex-1 min-h-0 overflow-y-auto scroll-smooth relative"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: isLight ? '#cbd5e1 #f1f5f9' : '#475569 #0f172a'
              }}
            >
              {/* Optional 3D Luxury Background Preview Layer */}
              {config.enableLuxury3dBackground !== false && (
                <div 
                  className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-30 fixed"
                  style={{
                    backgroundImage: `url('${config.luxuryBgVenue === 'flagship' ? 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200' : config.luxuryBgVenue === 'workshop' ? 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200' : 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200'}')`,
                    filter: `blur(${config.luxuryBgBlur === 'subtle' ? '6px' : config.luxuryBgBlur === 'deep' ? '16px' : '10px'})`
                  }}
                />
              )}

              {/* 1. Preview Announcement Bar */}
              {config.showAnnouncement && (
                <div id="admin-preview-top" className={`relative z-10 text-[9px] py-1 px-3 border-b truncate text-center ${
                  isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-indigo-950/60 border-indigo-500/20 text-indigo-200'
                }`}>
                  {config.announcementText}
                </div>
              )}

              {/* 2. Preview Nav Header with Search */}
              <div className={`relative z-10 px-3 py-2 border-b flex items-center justify-between gap-2 text-xs ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}>
                <div className="flex items-center space-x-1.5 flex-shrink-0">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] text-white ${
                    isLight ? 'bg-slate-900' : 'bg-indigo-600'
                  }`}>
                    P
                  </div>
                  <span className="font-extrabold text-[11px] truncate">{config.brandName}</span>
                </div>
                {config.showSearchBar !== false && (
                  <div className={`flex-1 flex items-center px-2 py-1 rounded-lg text-[9px] border truncate ${
                    isLight ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-slate-950 text-slate-500 border-slate-800'
                  }`}>
                    <Search className="w-2.5 h-2.5 mr-1 opacity-50 flex-shrink-0" />
                    <span className="truncate">{config.searchPlaceholder || 'Search products...'}</span>
                  </div>
                )}
                <div className="text-[10px] opacity-60 flex-shrink-0">Bag (2)</div>
              </div>

              {/* Vista Mega Menu Horizontal Preview Bar */}
              {config.showMegaMenu !== false && (
                <div className={`relative z-10 px-2 py-1 flex items-center space-x-2 text-[8px] font-semibold overflow-x-auto no-scrollbar ${
                  isLight ? 'bg-slate-50 text-slate-700' : 'bg-slate-900/80 text-slate-300'
                }`}>
                  {(config.megaMenuCategories || DEFAULT_STOREFRONT_CONFIG.megaMenuCategories).slice(0, 6).map((c, i) => (
                    <span key={i} className="whitespace-nowrap hover:text-indigo-400 cursor-pointer flex items-center space-x-1">
                      <span>{c.title}</span>
                      {c.badge && (
                        <span className="text-[6px] px-1 py-0.2 rounded-full font-bold bg-amber-500/20 text-amber-500">
                          {c.badge}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              )}

              {/* Vista-Style Promotional Photo Slider Preview */}
              {config.showPromoSlider !== false && (
                <div className={`relative z-10 p-2.5 border-b ${
                  isLight ? 'bg-gradient-to-r from-amber-50/70 via-white to-amber-50/70 border-slate-200' : 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between text-[7px] font-bold text-amber-500 uppercase mb-1">
                    <span>{config.promoBadgeText || 'VISTAPRINT SPECIAL OFFER'}</span>
                    <span className="font-mono bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/20">CODE: {config.promoCode || 'SAVE25'}</span>
                  </div>
                  
                  {/* Dual flanking photos with center SAVE 25% */}
                  <div className="grid grid-cols-12 gap-1.5 items-center">
                    <div className="col-span-3 relative rounded-md overflow-hidden aspect-[4/3] bg-slate-800">
                      <img 
                        src={(config.promoSlides && config.promoSlides[0]?.leftImage) || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300'} 
                        alt="" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-1">
                        <div className="text-[6px] text-white italic truncate font-serif">“Premium finish”</div>
                        <div className="text-[5px] text-amber-300 font-semibold truncate">Cards</div>
                      </div>
                    </div>

                    <div className="col-span-6 text-center px-1">
                      <div className="font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 leading-none">
                        {config.promoDiscountHeadline || 'SAVE 25%'}
                      </div>
                      <div className="text-[7px] font-semibold mt-0.5 truncate">
                        Marketing, Apparel & Art
                      </div>
                      <div className="text-[6px] opacity-75 line-clamp-1 mt-0.5">
                        Use code {config.promoCode || 'SAVE25'}
                      </div>
                    </div>

                    <div className="col-span-3 relative rounded-md overflow-hidden aspect-[4/3] bg-slate-800">
                      <img 
                        src={(config.promoSlides && config.promoSlides[0]?.rightImage) || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300'} 
                        alt="" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-1">
                        <div className="text-[6px] text-white italic truncate font-serif">“Fast dispatch”</div>
                        <div className="text-[5px] text-emerald-300 font-semibold truncate">Flyers</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Preview Hero */}
              <div id="admin-preview-hero" className={`relative z-10 p-4 border-b ${
                isLight ? 'bg-white/80 backdrop-blur-sm border-slate-200' : 'bg-slate-900/40 border-slate-800'
              } ${config.heroAlignment === 'left' ? 'text-left' : 'text-center'} ${
                config.heroTopGap === 'none' ? 'pt-2' : config.heroTopGap === 'lg' ? 'pt-8' : config.heroTopGap === 'normal' ? 'pt-6' : 'pt-4'
              }`}>
                {config.showLiveHubBadge !== false && (
                  <span className="inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-1.5">
                    ● {config.liveHubBadgeLabel || 'Live Production Hub:'} Detroit / London
                  </span>
                )}
                <h3 
                  onClick={() => setSelectedTypographyTarget('heroTitle')}
                  style={getTypographyInlineStyle(config?.typography?.heroTitle)}
                  title="Click to format Hero Title in the top Google Docs bar"
                  className={`font-extrabold leading-tight cursor-pointer transition-all ${
                    selectedTypographyTarget === 'heroTitle' 
                      ? 'ring-2 ring-indigo-500 ring-offset-2 p-1 rounded-lg bg-indigo-500/10' 
                      : 'hover:outline hover:outline-dashed hover:outline-1 hover:outline-indigo-400/50'
                  } ${
                  config.heroTitleSize === 'sm' ? 'text-xs sm:text-sm' :
                  config.heroTitleSize === 'lg' ? 'text-base sm:text-lg' :
                  config.heroTitleSize === 'xl' ? 'text-lg sm:text-xl' :
                  'text-sm sm:text-base'
                }`}>
                  {config.heroTitlePrefix}{' '}
                  <span className={isLight ? 'text-indigo-600' : 'text-indigo-400'}>
                    {config.heroTitleAccent}
                  </span>
                </h3>
                <p 
                  onClick={() => setSelectedTypographyTarget('heroSubtitle')}
                  style={getTypographyInlineStyle(config?.typography?.heroSubtitle)}
                  title="Click to format Hero Subtitle in the top Google Docs bar"
                  className={`opacity-75 line-clamp-2 max-w-sm cursor-pointer transition-all ${
                    selectedTypographyTarget === 'heroSubtitle' 
                      ? 'ring-2 ring-indigo-500 ring-offset-2 p-1 rounded-lg bg-indigo-500/10' 
                      : 'hover:outline hover:outline-dashed hover:outline-1 hover:outline-indigo-400/50'
                  } ${config.heroAlignment === 'left' ? '' : 'mx-auto'} ${
                  config.heroSubtitleSize === 'xs' ? 'text-[9px]' :
                  config.heroSubtitleSize === 'base' ? 'text-[11px]' :
                  config.heroSubtitleSize === 'lg' ? 'text-xs' :
                  'text-[10px]'
                } ${
                  config.heroSubtitleSpacing === 'tight' ? 'mt-0.5' :
                  config.heroSubtitleSpacing === 'relaxed' ? 'mt-2' :
                  config.heroSubtitleSpacing === 'loose' ? 'mt-3' :
                  'mt-1'
                }`}>
                  {config.heroSubtitle}
                </p>

                {config.showHubSwitcher !== false && (
                  <div className={`flex flex-wrap gap-1 mt-2.5 ${config.heroAlignment === 'left' ? 'justify-start' : 'justify-center'}`}>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">🇺🇸 USA</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">🇬🇧 UK</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">🇨🇦 Canada</span>
                  </div>
                )}
              </div>

              {/* Preview Vista Category Showcase Tiles */}
              {config.showCategoryShowcase !== false && (
                <div id="admin-preview-categories" className={`relative z-10 p-3 border-b space-y-1.5 ${
                  isLight ? 'bg-white/90 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                }`}>
                  <div className="text-[10px] font-bold text-center">{config.categoryShowcaseTitle || 'Explore Popular Categories'}</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(config.categoryShowcaseCards || DEFAULT_STOREFRONT_CONFIG.categoryShowcaseCards).slice(0, 3).map((tile, i) => (
                      <div key={i} className={`p-1.5 rounded-lg border text-center ${
                        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                      }`}>
                        <img src={tile.image} alt="" className="w-full aspect-square object-cover rounded mb-1" />
                        <div className="text-[8px] font-bold truncate">{tile.title}</div>
                        <div className="text-[8px] font-mono text-emerald-600 font-bold">${tile.startingPrice}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preview 100% Satisfaction Guarantee */}
              {config.showSatisfactionGuarantee !== false && (
                <div className={`relative z-10 px-3 py-2 border-b flex items-center space-x-2 text-[9px] ${
                  isLight ? 'bg-amber-50/70 border-amber-200/60 text-amber-900' : 'bg-indigo-950/40 border-indigo-500/20 text-indigo-300'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span className="font-bold truncate">{config.guaranteeHeading || '100% Satisfaction Guaranteed'}</span>
                </div>
              )}

              {/* 4. Preview Products Grid - Complete with Description & Configure & Buy Button */}
              <div id="admin-preview-catalog" className={`relative z-10 p-4 space-y-3 ${
                config.catalogPadding === 'compact' ? 'py-2' : config.catalogPadding === 'spacious' ? 'py-6' : 'py-4'
              }`}>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span>{config.catalogTitle}</span>
                  <span className="text-[9px] opacity-60 font-mono">
                    {config.gridColumns} cols • {config.gridGap}
                  </span>
                </div>

                {/* Grid with dynamic columns and gap */}
                <div className={`grid ${
                  config.gridColumns === 2 ? 'grid-cols-2' : config.gridColumns === 3 ? 'grid-cols-3' : config.gridColumns === 5 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'
                } ${
                  config.gridGap === 'compact' ? 'gap-2' : config.gridGap === 'spacious' ? 'gap-3.5' : 'gap-2.5'
                }`}>
                  {[
                    { 
                      name: 'Foam Board Rigid Presentation Poster', 
                      cat: 'Signs & Banners',
                      price: '$29.00', 
                      desc: 'Lightweight 3/16-inch dense polystyrene foam core board with matte paper finish. Easel ready.',
                      img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80' 
                    },
                    { 
                      name: 'Heavyweight Unisex POD Vintage Hoodie', 
                      cat: 'Apparel',
                      price: '$48.00', 
                      desc: 'Ultra-soft 350 GSM brushed cotton fleece hoodie with double-needle split stitching.',
                      img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80' 
                    },
                    { 
                      name: 'Ceramic Coffee Mug (11oz)', 
                      cat: 'Gifts',
                      price: '$18.50', 
                      desc: 'Glossy ceramic mug with vibrant sublimation print. Dishwasher and microwave safe.',
                      img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80' 
                    },
                    { 
                      name: 'Archival Museum Canvas Art Print', 
                      cat: 'Wall Art',
                      price: '$64.00', 
                      desc: 'Solid pine stretcher bars, acid-free poly-cotton canvas, museum grade finish.',
                      img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80' 
                    }
                  ].map((mock, i) => (
                    <div
                      key={i}
                      className={`border p-2 flex flex-col justify-between overflow-hidden shadow-xs rounded-${config.cardRadius} transition-all duration-200 ${
                        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="relative aspect-square rounded-lg overflow-hidden mb-1.5 bg-slate-100">
                          <img src={mock.img} alt="" className="w-full h-full object-cover" />
                          <span className="absolute top-1 left-1 text-[7px] font-bold px-1 py-0.2 rounded bg-black/60 text-white backdrop-blur-xs">
                            {mock.cat}
                          </span>
                        </div>
                        <div 
                          onClick={() => setSelectedTypographyTarget('productTitle')}
                          style={getTypographyInlineStyle(config?.typography?.productTitle)}
                          title="Click to format Product Titles in top bar"
                          className={`font-bold text-[10px] line-clamp-1 cursor-pointer transition-all ${
                            selectedTypographyTarget === 'productTitle' ? 'ring-2 ring-indigo-500 rounded px-1 bg-indigo-500/10' : 'hover:underline'
                          }`}
                        >
                          {mock.name}
                        </div>
                        <div 
                          onClick={() => setSelectedTypographyTarget('productDesc')}
                          style={getTypographyInlineStyle(config?.typography?.productDesc)}
                          title="Click to format Product Description in top bar"
                          className={`text-[8px] line-clamp-2 mt-0.5 leading-tight cursor-pointer transition-all ${
                            selectedTypographyTarget === 'productDesc' ? 'ring-2 ring-indigo-500 rounded px-1 bg-indigo-500/10' : 'hover:opacity-100'
                          } ${isLight ? 'text-slate-600' : 'text-slate-400'}`}
                        >
                          {mock.desc}
                        </div>
                      </div>

                      <div className="mt-2 pt-1.5 border-t border-slate-200/50 dark:border-slate-800/80">
                        <div className="flex items-center justify-between mb-1.5">
                          <span 
                            onClick={() => setSelectedTypographyTarget('productPrice')}
                            style={getTypographyInlineStyle(config?.typography?.productPrice)}
                            title="Click to format Price Tag in top bar"
                            className={`text-[10px] font-mono font-bold text-emerald-600 cursor-pointer transition-all ${
                              selectedTypographyTarget === 'productPrice' ? 'ring-2 ring-indigo-500 rounded px-1 bg-indigo-500/10' : ''
                            }`}
                          >
                            {mock.price}
                          </span>
                          <span className="text-[7px] text-slate-400">+ship</span>
                        </div>
                        <button
                          type="button"
                          className={`w-full py-1 px-1.5 rounded-lg text-[8px] font-bold flex items-center justify-center space-x-1 ${
                            isLight ? 'bg-slate-900 text-white' : 'bg-indigo-600 text-white'
                          }`}
                        >
                          <ShoppingBag className="w-2.5 h-2.5" />
                          <span>Configure & Buy</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Preview Trust Props */}
              {config.showTrustProps !== false && (
                <div id="admin-preview-reviews" className={`relative z-10 p-3 border-t grid grid-cols-3 gap-2 text-center text-[9px] ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}>
                  {config.trustProps.map((p, idx) => (
                    <div key={idx} className="truncate">
                      <div className="font-bold truncate">{p.title}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* 6. Preview Footer */}
              <div id="admin-preview-footer" className={`relative z-10 p-3 border-t text-center text-[9px] space-y-0.5 ${
                isLight ? 'bg-white border-slate-200 text-slate-500' : 'bg-slate-950 border-slate-900 text-slate-500'
              }`}>
                <div className="font-bold text-slate-800 dark:text-slate-200">{config.brandName} • {config.badgeTag}</div>
                <div className="text-[8px] opacity-75">{config.copyrightText}</div>
              </div>
            </div>

            {/* Quick Section Jump Navigator Footer */}
            <div className={`px-2.5 py-1.5 border-t flex items-center justify-between text-[9px] font-semibold ${
              isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              <span className="shrink-0 text-slate-400 text-[8px]">Quick Jump:</span>
              <div className="flex items-center space-x-1 shrink-0 text-[8px]">
                <button
                  type="button"
                  onClick={() => document.getElementById('admin-preview-viewport')?.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-1.5 py-0.5 rounded hover:bg-indigo-500/10 hover:text-indigo-600 transition"
                >
                  Top ⬆
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('admin-preview-hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="px-1.5 py-0.5 rounded hover:bg-indigo-500/10 hover:text-indigo-600 transition"
                >
                  Hero
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('admin-preview-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="px-1.5 py-0.5 rounded hover:bg-indigo-500/10 hover:text-indigo-600 transition"
                >
                  Catalog
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('admin-preview-footer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="px-1.5 py-0.5 rounded hover:bg-indigo-500/10 hover:text-indigo-600 transition"
                >
                  Footer ⬇
                </button>
              </div>
            </div>
          </div>

          <div className={`p-2.5 rounded-xl text-center border ${
            isLight ? 'bg-indigo-50/60 border-indigo-200/60 text-indigo-900' : 'bg-slate-900/60 border-slate-800 text-slate-400'
          }`}>
            <p className="text-[11px]">
              💡 <strong>Interactive Live View:</strong> Scroll inside the right-hand preview frame to see your full storefront layout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
