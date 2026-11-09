import React, { useState } from 'react';
import { 
  LayoutTemplate, Columns, Grid, Type, AlignLeft, AlignCenter, 
  Sliders, Sparkles, CheckCircle2, Save, RotateCcw, Eye, 
  Layers, MessageSquare, Truck, ShieldCheck, Star, Palette,
  Smartphone, Monitor, Megaphone, Shield, RefreshCw
} from 'lucide-react';

export const DEFAULT_STOREFRONT_CONFIG = {
  // 1. Announcement Bar
  showAnnouncement: true,
  announcementText: 'Printed Domestically in USA, UK & Canada • Zero Customs Duties • Fast 2-Day Local Production',
  announcementFacilities: '🇺🇸 Detroit Facility • 🇬🇧 London Facility • 🇨🇦 Toronto Facility',
  
  // 2. Hero Section
  heroTitlePrefix: 'Custom Goods Printed',
  heroTitleAccent: 'Domestically.',
  heroSubtitle: 'Premium vintage apparel, gallery canvas wall art, and ceramic goods printed locally in USA, UK, and Canada. No cross-border delays or customs fees.',
  heroAlignment: 'center', // 'center' | 'left'
  heroPadding: 'normal', // 'compact' | 'normal' | 'spacious'
  showLiveHubBadge: true,
  liveHubBadgeLabel: 'Live Production Hub:',
  
  // 3. Grid & Spacing Layout
  catalogTitle: 'Featured Domestic Catalog',
  catalogSubtitle: 'Showing products fulfilled by nearest domestic printing partner',
  gridColumns: 4, // 2, 3, 4, 5
  gridGap: 'normal', // 'compact' | 'normal' | 'spacious'
  cardRadius: '2xl', // 'lg' | 'xl' | '2xl' | '3xl'
  showCategoryPills: true,
  
  // 4. Trust Badges & Value Props
  trustProps: [
    { title: 'Local Domestic Couriers', subtitle: 'USPS, Royal Mail & Canada Post' },
    { title: 'Certified Archival Eco Inks', subtitle: 'OEKO-TEX & Non-Toxic' },
    { title: '4.9 / 5 Verified Rating', subtitle: 'Over 12,000 satisfied shoppers' },
  ],
  
  // 5. Customer Reviews Section
  showReviews: true,
  reviewsTitle: 'What Our Customers Say',
  reviewsSubtitle: 'Verified domestic reviews from the United States, United Kingdom, and Canada',
  reviews: [
    {
      id: 1,
      name: 'Emily R.',
      location: 'Brooklyn, New York 🇺🇸',
      comment: '"The Heavyweight Vintage Hoodie arrived in only 3 days via USPS from the Detroit facility! The DTG print quality is extraordinary."'
    },
    {
      id: 2,
      name: 'James W.',
      location: 'London, UK 🇬🇧',
      comment: '"So glad it was fulfilled by Prodigi in Hampshire. Zero import taxes or Royal Mail customs hold-ups. The ceramic mug is beautiful!"'
    },
    {
      id: 3,
      name: 'Sophie L.',
      location: 'Vancouver, BC 🇨🇦',
      comment: '"Shipped from Toronto directly to Vancouver via Canada Post. The museum canvas colors are vibrant and crystal clear."'
    }
  ],
  
  // 6. Footer & Branding
  brandName: 'PrintFlow Studio',
  badgeTag: 'Domestic POD',
  footerTagline: 'Local direct-to-garment & archival printing facilities in USA (Detroit), UK (London) & Canada (Toronto).',
  copyrightText: '© 2026 PrintFlow Global Ltd. All rights reserved.'
};

export default function AdminStorefrontEditor({
  storefrontConfig,
  onSaveConfig,
  onSwitchToStore,
  storeTheme = 'light',
  onToggleStoreTheme
}) {
  const [config, setConfig] = useState(() => {
    return storefrontConfig || DEFAULT_STOREFRONT_CONFIG;
  });

  const [activeSection, setActiveSection] = useState('hero'); // 'hero' | 'layout' | 'announcement' | 'badges' | 'reviews' | 'footer'
  const [toastMessage, setToastMessage] = useState(null);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFieldChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl shadow-2xl bg-emerald-950/90 text-emerald-200 border border-emerald-500/40 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
            <LayoutTemplate className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-white tracking-tight">Storefront Visual & Layout Editor</h1>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Live Studio
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Customize headings, grid columns, spacing, announcement ribbons, and reviews on the customer storefront.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Reset to default theme values"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={onSwitchToStore}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 transition shadow-sm"
            title="Preview changes directly in Customer Storefront"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            <span>View Live Store</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition"
          >
            <Save className="w-4 h-4" />
            <span>Publish Changes</span>
          </button>
        </div>
      </div>

      {/* Editor Sub-Navigation Tabs */}
      <div className="flex space-x-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto">
        {[
          { id: 'hero', label: 'Hero & Titles (শিরোনাম)', icon: Type },
          { id: 'layout', label: 'Columns & Spacing (কলাম ও স্পেসিং)', icon: Columns },
          { id: 'announcement', label: 'Announcement Ribbon', icon: Megaphone },
          { id: 'badges', label: 'Trust Badges & Couriers', icon: ShieldCheck },
          { id: 'reviews', label: 'Customer Reviews', icon: Star },
          { id: 'footer', label: 'Footer & Branding', icon: Sliders },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Studio Layout: Settings Form on Left, Live Mockup on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Configuration Forms (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Hero & Titles (শিরোনাম) */}
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
                    Hero Title Prefix (শিরোনামের শুরুর অংশ):
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
                    Title Highlight / Accent Word (হাইলাইট শব্দ):
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
                    Hero Subtitle / Description (বর্ণনা):
                  </label>
                  <textarea
                    rows="3"
                    value={config.heroSubtitle}
                    onChange={(e) => handleFieldChange('heroSubtitle', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    placeholder="Short description highlighting domestic hubs and fast shipping..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Text Alignment (অ্যালাইনমেন্ট):</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleFieldChange('heroAlignment', 'center')}
                        className={`py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-1 ${
                          config.heroAlignment === 'center'
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <AlignCenter className="w-3.5 h-3.5" />
                        <span>Center</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFieldChange('heroAlignment', 'left')}
                        className={`py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center space-x-1 ${
                          config.heroAlignment === 'left'
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <AlignLeft className="w-3.5 h-3.5" />
                        <span>Left</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Vertical Padding (স্পেসিং):</label>
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

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-white font-semibold">Live Production Hub Radar Pill</span>
                    <p className="text-[10px] text-slate-500">Shows the green pulsing domestic facility badge</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showLiveHubBadge}
                    onChange={(e) => handleFieldChange('showLiveHubBadge', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Columns & Spacing (কলাম ও স্পেসিং লেআউট) */}
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
                    Grid Columns on Desktop (ডেস্কটপ কলাম সংখ্যা):
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[2, 3, 4, 5].map(cols => (
                      <button
                        key={cols}
                        type="button"
                        onClick={() => handleFieldChange('gridColumns', cols)}
                        className={`p-3 rounded-xl border text-center transition ${
                          config.gridColumns === cols
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
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
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    Grid Gap / Item Spacing (আইটেমগুলোর মধ্যকার ফাঁকা জায়গা):
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
                        className={`p-2.5 rounded-xl border text-center transition ${
                          config.gridGap === gap.id
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-semibold text-xs">{gap.label}</div>
                        <div className="text-[10px] opacity-60 font-mono">{gap.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Corner Radius */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    Product Card Corner Curvature (কোণার রাউন্ডনেস):
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
                        className={`py-2 rounded-xl border text-center transition text-xs font-semibold ${
                          config.cardRadius === r.id
                            ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow'
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
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Trust Badges & Couriers</h2>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Conversion Drivers</span>
              </div>

              <div className="space-y-3 text-xs">
                {config.trustProps.map((prop, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-300">Badge #{idx + 1}</span>
                      <span className="text-[10px] text-slate-500">{idx === 0 ? 'Courier' : idx === 1 ? 'Eco Inks' : 'Social Proof'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-0.5">Title Text:</label>
                        <input
                          type="text"
                          value={prop.title}
                          onChange={(e) => handleTrustPropChange(idx, 'title', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-0.5">Subtitle / Subtext:</label>
                        <input
                          type="text"
                          value={prop.subtitle}
                          onChange={(e) => handleTrustPropChange(idx, 'subtitle', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Customer Reviews */}
          {activeSection === 'reviews' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Customer Reviews Section</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-slate-400">Enable Section:</span>
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
                    <label className="block text-slate-300 font-semibold mb-1">Section Title:</label>
                    <input
                      type="text"
                      value={config.reviewsTitle}
                      onChange={(e) => handleFieldChange('reviewsTitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Section Subtitle:</label>
                    <input
                      type="text"
                      value={config.reviewsSubtitle}
                      onChange={(e) => handleFieldChange('reviewsSubtitle', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <label className="block text-slate-300 font-semibold">Editable Review Cards:</label>
                  {config.reviews.map((rev, idx) => (
                    <div key={rev.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-0.5">Author Name:</label>
                          <input
                            type="text"
                            value={rev.name}
                            onChange={(e) => handleReviewChange(idx, 'name', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-0.5">Location & Flag:</label>
                          <input
                            type="text"
                            value={rev.location}
                            onChange={(e) => handleReviewChange(idx, 'location', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-0.5">Review Quote:</label>
                        <textarea
                          rows="2"
                          value={rev.comment}
                          onChange={(e) => handleReviewChange(idx, 'comment', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white"
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
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Footer & Branding</h2>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Storefront Base</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Brand Name:</label>
                    <input
                      type="text"
                      value={config.brandName}
                      onChange={(e) => handleFieldChange('brandName', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Badge Tag:</label>
                    <input
                      type="text"
                      value={config.badgeTag}
                      onChange={(e) => handleFieldChange('badgeTag', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Footer Tagline:</label>
                  <input
                    type="text"
                    value={config.footerTagline}
                    onChange={(e) => handleFieldChange('footerTagline', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Copyright Line:</label>
                  <input
                    type="text"
                    value={config.copyrightText}
                    onChange={(e) => handleFieldChange('copyrightText', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Responsive Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs px-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white">Live Visual Preview</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.2 rounded-full font-mono">
                Real-Time
              </span>
            </div>

            <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-lg transition ${previewDevice === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-lg transition ${previewDevice === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Scaled Preview Frame */}
          <div className={`border rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
            storeTheme === 'light' ? 'bg-[#f8f9fa] border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
          } ${previewDevice === 'mobile' ? 'max-w-[340px] mx-auto' : 'w-full'}`}>
            {/* 1. Preview Announcement Bar */}
            {config.showAnnouncement && (
              <div className={`text-[9px] py-1 px-3 border-b truncate text-center ${
                storeTheme === 'light' ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-indigo-950/60 border-indigo-500/20 text-indigo-200'
              }`}>
                {config.announcementText}
              </div>
            )}

            {/* 2. Preview Nav Header */}
            <div className={`px-4 py-2 border-b flex items-center justify-between text-xs ${
              storeTheme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center space-x-1.5">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] text-white ${
                  storeTheme === 'light' ? 'bg-slate-900' : 'bg-indigo-600'
                }`}>
                  P
                </div>
                <span className="font-extrabold text-xs">{config.brandName}</span>
              </div>
              <div className="text-[10px] opacity-60">Cart (2)</div>
            </div>

            {/* 3. Preview Hero */}
            <div className={`p-4 border-b text-center ${
              storeTheme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/40 border-slate-800'
            } ${config.heroAlignment === 'left' ? 'text-left' : 'text-center'}`}>
              {config.showLiveHubBadge && (
                <span className="inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-1.5">
                  ● {config.liveHubBadgeLabel} Detroit / London
                </span>
              )}
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                {config.heroTitlePrefix}{' '}
                <span className={storeTheme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}>
                  {config.heroTitleAccent}
                </span>
              </h3>
              <p className="text-[10px] opacity-75 mt-1 line-clamp-2 max-w-sm mx-auto">
                {config.heroSubtitle}
              </p>
            </div>

            {/* 4. Preview Products Grid (Accurately reflecting columns & spacing) */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span>{config.catalogTitle}</span>
                <span className="text-[9px] opacity-60 font-mono">
                  {config.gridColumns} cols • {config.gridGap}
                </span>
              </div>

              {/* Grid with dynamic columns and gap */}
              <div className={`grid ${
                config.gridColumns === 2 ? 'grid-cols-2' : config.gridColumns === 3 ? 'grid-cols-3' : config.gridColumns === 5 ? 'grid-cols-3 sm:grid-cols-5' : 'grid-cols-2 sm:grid-cols-4'
              } ${
                config.gridGap === 'compact' ? 'gap-2' : config.gridGap === 'spacious' ? 'gap-4' : 'gap-2.5'
              }`}>
                {[
                  { name: 'Hoodie', price: '$48.00', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80' },
                  { name: 'Ceramic Mug', price: '$18.50', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80' },
                  { name: 'Canvas Art', price: '$64.00', img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80' },
                  { name: 'Dad Cap', price: '$24.00', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&auto=format&fit=crop&q=80' }
                ].slice(0, config.gridColumns >= 4 ? 4 : config.gridColumns).map((mock, i) => (
                  <div
                    key={i}
                    className={`border p-2 flex flex-col justify-between overflow-hidden shadow-xs ${
                      storeTheme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                    } rounded-${config.cardRadius}`}
                  >
                    <img src={mock.img} alt="" className="w-full aspect-square object-cover rounded-lg mb-1.5" />
                    <div className="font-bold text-[10px] truncate">{mock.name}</div>
                    <div className="text-[10px] font-mono font-bold text-emerald-600 mt-0.5">{mock.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Preview Trust Props */}
            <div className={`p-3 border-t grid grid-cols-3 gap-2 text-center text-[9px] ${
              storeTheme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/60 border-slate-800 text-slate-300'
            }`}>
              {config.trustProps.map((p, idx) => (
                <div key={idx} className="truncate">
                  <div className="font-bold truncate">{p.title}</div>
                </div>
              ))}
            </div>

            {/* 6. Preview Footer */}
            <div className={`p-3 border-t text-center text-[9px] space-y-0.5 ${
              storeTheme === 'light' ? 'bg-white border-slate-200 text-slate-500' : 'bg-slate-950 border-slate-900 text-slate-500'
            }`}>
              <div className="font-bold text-slate-800">{config.brandName} • {config.badgeTag}</div>
              <div className="text-[8px] opacity-75">{config.copyrightText}</div>
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
            <p className="text-[11px] text-slate-400">
              💡 Any edits you make update this live preview immediately. Click <strong>Publish Changes</strong> to push live to the customer storefront.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
