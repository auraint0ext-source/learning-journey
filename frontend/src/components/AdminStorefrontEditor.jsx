import React, { useState } from 'react';
import { 
  LayoutTemplate, Columns, Grid, Type, AlignLeft, AlignCenter, 
  Sliders, Sparkles, CheckCircle2, Save, RotateCcw, Eye, 
  Layers, MessageSquare, Truck, ShieldCheck, Star, Palette,
  Smartphone, Monitor, Megaphone, Shield, RefreshCw, Search,
  Briefcase, Shirt, Coffee, Image, Tag, BadgePercent, Check, Package,
  Plus, Trash2, ArrowUp, ArrowDown, ChevronUp, ChevronDown
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
  heroAlignment: 'left', // 'center' | 'left'
  heroTitleSize: 'md', // 'sm' (28px) | 'md' (36px) | 'lg' (48px) | 'xl' (60px)
  heroSubtitleSize: 'sm', // 'xs' (12px) | 'sm' (14px) | 'base' (16px) | 'lg' (18px)
  heroSubtitleSpacing: 'normal', // 'tight' (mt-1) | 'normal' (mt-2.5) | 'relaxed' (mt-4) | 'loose' (mt-6)
  heroTopGap: 'sm', // 'none' | 'sm' | 'normal' | 'lg'
  heroPadding: 'normal', // 'compact' | 'normal' | 'spacious'
  showLiveHubBadge: true,
  liveHubBadgeLabel: 'Live Production Hub:',
  showHubSwitcher: true, // Toggle for USA, UK, Canada regional selector pills
  
  // 3. Grid & Spacing Layout
  catalogTitle: 'Featured Domestic Catalog',
  catalogSubtitle: 'Showing products fulfilled by nearest domestic printing partner',
  catalogPadding: 'normal', // 'compact' (py-6) | 'normal' (py-12) | 'spacious' (py-20)
  gridColumns: 4, // 2, 3, 4, 5
  gridGap: 'normal', // 'compact' | 'normal' | 'spacious'
  cardRadius: '2xl', // 'lg' | 'xl' | '2xl' | '3xl'
  showCategoryPills: true,
  
  // 4. Trust Badges & Value Props
  showTrustProps: true, // Toggle for Trust badges row
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
  copyrightText: '© 2026 PrintFlow Global Ltd. All rights reserved.',

  // 7. Vista-Style Mega Menu & Global Search
  showSearchBar: true,
  searchPlaceholder: 'Search 100+ custom products: Business cards, hoodies, mugs, canvases...',
  showMegaMenu: true,
  megaMenuVersion: 2,
  megaMenuCategories: [
    {
      id: 'menu-deals',
      title: 'Deals',
      categoryKey: 'Deals',
      badge: '25% OFF',
      subcategories: ['Holiday Specials (25% Off)', 'Bulk Wholesale Tiers', 'Clearance & Overstock', 'Free Shipping Packs']
    },
    {
      id: 'menu-holiday',
      title: 'Holiday & Christmas Cards',
      categoryKey: 'Holiday',
      badge: 'Festive',
      subcategories: ['Custom Christmas Cards', 'Holiday Family Photo Cards', 'New Year Greeting Cards', 'Gold Foil Accent Cards']
    },
    {
      id: 'menu-calendars',
      title: 'Calendars & Gifts',
      categoryKey: 'Gifts',
      badge: '',
      subcategories: ['Custom Wall Calendars', 'Desk Easel Calendars', 'Personalized Photo Mugs', 'Gallery Stretched Canvas', 'Custom Printed Totes']
    },
    {
      id: 'menu-business-cards',
      title: 'Business Cards',
      categoryKey: 'Marketing',
      badge: 'Popular',
      subcategories: ['Standard Matte Business Cards', 'Premium Soft-Touch 16pt', 'Raised Foil & Embossed Cards', 'Square & Rounded Corner Cards']
    },
    {
      id: 'menu-postcards',
      title: 'Postcards & Print Advertising',
      categoryKey: 'Marketing',
      badge: '',
      subcategories: ['Promotional Direct Mail Postcards', 'Tri-Fold Marketing Brochures', 'Full-Color Event Flyers', 'Branded Presentation Folders']
    },
    {
      id: 'menu-clothing',
      title: 'Clothing, Bags & Apparel',
      categoryKey: 'Apparel',
      badge: '',
      subcategories: ['Heavyweight Vintage Hoodies', 'Eco Organic Cotton Graphic Tees', 'Embroidered Dad Caps', 'Heavy-Duty Canvas Tote Bags']
    },
    {
      id: 'menu-signs',
      title: 'Signs, Banners & Posters',
      categoryKey: 'Wall Art',
      badge: '',
      subcategories: ['Archival Museum Matte Posters', 'Modern Wood Framed Gallery Prints', 'Museum Stretched Canvas Art', 'Ultra-HD Brushed Metal Prints']
    },
    {
      id: 'menu-packaging',
      title: 'Labels, Stickers & Packaging',
      categoryKey: 'Accessories',
      badge: '',
      subcategories: ['Contour Die-Cut Vinyl Stickers', 'Custom Product Roll Labels', 'Corrugated Shipping Mailer Boxes', 'Tough Armor Custom Phone Cases']
    }
  ],

  // 8. Vista-Style Visual Category Showcase (Top 6 Tiles)
  showCategoryShowcase: true,
  categoryShowcaseTitle: 'Explore Popular Categories',
  categoryShowcaseSubtitle: 'Custom printed domestically with guaranteed archival finishes and zero customs delay',
  categoryShowcaseCards: [
    {
      title: 'Custom Hoodies',
      category: 'Apparel',
      startingPrice: '38.00',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80',
      badge: 'Best Seller'
    },
    {
      title: 'Ceramic Mugs',
      category: 'Home & Living',
      startingPrice: '14.50',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80',
      badge: 'Dishwasher Safe'
    },
    {
      title: 'Gallery Canvas Art',
      category: 'Wall Art',
      startingPrice: '44.00',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&auto=format&fit=crop&q=80',
      badge: 'Archival Matte'
    },
    {
      title: 'Tough Phone Cases',
      category: 'Accessories',
      startingPrice: '22.00',
      image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&auto=format&fit=crop&q=80',
      badge: 'Drop Protection'
    },
    {
      title: 'Business Cards',
      category: 'Marketing',
      startingPrice: '9.99',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80',
      badge: 'Premium Stock'
    },
    {
      title: 'Vintage Caps & Hats',
      category: 'Apparel',
      startingPrice: '19.50',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&auto=format&fit=crop&q=80',
      badge: 'Embroidery'
    }
  ],

  // 9. Vista Satisfaction Guarantee & Bulk Wholesale Tiers
  showSatisfactionGuarantee: true,
  guaranteeHeading: '100% Satisfaction Guaranteed',
  guaranteeSubtext: 'We stand by every stitch and print. If your custom merchandise is not absolutely flawless, we will reprint it immediately or issue a 100% money-back refund.',
  showBulkDiscounts: true,
  bulkTier1Qty: 5,
  bulkTier1Discount: 10,
  bulkTier2Qty: 10,
  bulkTier2Discount: 15,
  bulkTier3Qty: 25,
  bulkTier3Discount: 25,

  // 10. Vista-Style Promotional Hero Carousel / Photo Slider (Dui Pashe Chobi, Majhkhane Save 25%, Captions/Quotes)
  showPromoSlider: true,
  promoBadgeText: '🔥 VISTAPRINT EXCLUSIVE • LIMITED TIME OFFER',
  promoDiscountHeadline: 'SAVE 25%',
  promoDiscountSub: 'Save 25% on custom marketing essentials, premium vintage apparel, gallery canvas art, mugs & packaging.',
  promoCode: 'SAVE25',
  promoSlides: [
    {
      id: 1,
      tag: 'Marketing & Business Collateral',
      centerHeading: 'SAVE 25%',
      centerOffer: 'Premium Business Cards & Marketing Prints',
      targetCategory: 'Marketing',
      leftImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      leftQuote: '“Make an unforgettable first impression in every handshake.”',
      leftCaption: 'Soft-Touch 16pt Matte Business Cards',
      rightImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
      rightQuote: '“Elevate your pitch with sharp, vibrant presentation prints.”',
      rightCaption: 'Glossy Tri-Fold Marketing Brochures'
    },
    {
      id: 2,
      tag: 'Custom Apparel & Bags',
      centerHeading: 'SAVE 25%',
      centerOffer: 'Heavyweight Hoodies, Graphic Tees & Caps',
      targetCategory: 'Apparel',
      leftImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      leftQuote: '“Wear your brand identity with heavyweight premium comfort.”',
      leftCaption: 'Heavyweight 350 GSM Vintage Fleece Hoodie',
      rightImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      rightQuote: '“100% Organic ringspun cotton, printed with zero-toxin inks.”',
      rightCaption: 'Eco-Friendly Organic Vintage Tees'
    },
    {
      id: 3,
      tag: 'Gallery Canvas & Fine Art',
      centerHeading: 'SAVE 25%',
      centerOffer: 'Museum Stretched Canvas & Framed Photo Art',
      targetCategory: 'Wall Art',
      leftImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      leftQuote: '“Turn cherished memories into certified museum-grade gallery art.”',
      leftCaption: 'Giclée Pigment Stretched Pine Canvas',
      rightImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      rightQuote: '“Solid oak frames built to preserve beauty for 100+ years.”',
      rightCaption: 'Modern Gallery Wood Framed Prints'
    },
    {
      id: 4,
      tag: 'Custom Drinkware & Mugs',
      centerHeading: 'SAVE 25%',
      centerOffer: 'Glossy Ceramic Mugs & Stainless Tumblers',
      targetCategory: 'Home & Living',
      leftImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      leftQuote: '“Start every morning with your custom signature brew mug.”',
      leftCaption: '15oz Dishwasher-Safe Ceramic Mug',
      rightImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
      rightQuote: '“Keeps your coffee steaming hot or water icy cold for 24h.”',
      rightCaption: 'Double-Wall Insulated Steel Tumbler'
    },
    {
      id: 5,
      tag: 'Labels, Stickers & Packaging',
      centerHeading: 'SAVE 25%',
      centerOffer: 'Die-Cut Stickers & Branded Mailer Boxes',
      targetCategory: 'Accessories',
      leftImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      leftQuote: '“Weatherproof, UV-laminated contour die-cut vinyl stickers.”',
      leftCaption: 'Laser-Cut Precision Vinyl Stickers',
      rightImage: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
      rightQuote: '“Transform every customer unboxing into a premium brand experience.”',
      rightCaption: 'Custom Printed E-Flute Mailer Boxes'
    }
  ]
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
          { id: 'megamenu', label: 'Mega Menu & Search (মেনু ও সার্চ)', icon: Layers },
          { id: 'promoslider', label: 'Promo Slider & SAVE 25% (স্লাইডার ও ছাড়)', icon: BadgePercent },
          { id: 'vistaspec', label: 'Categories & Bulk Tiers (ভিস্তা ক্যাটাগরি ও ছাড়)', icon: Grid },
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

                {/* Subtitle Font Size Control */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-300 font-semibold">Subtitle Text Size (ডেসক্রিপশন/সাবটাইটেল সাইজ):</label>
                    <span className="text-[10px] text-indigo-400 font-mono font-bold">
                      {config.heroSubtitleSize === 'xs' ? '12px (Compact)' : config.heroSubtitleSize === 'base' ? '16px (Medium)' : config.heroSubtitleSize === 'lg' ? '18px (Large)' : '14px (Standard - Default)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'xs', label: 'Extra Small', desc: 'খুব ছোট (12px)' },
                      { id: 'sm', label: 'Small', desc: 'স্বাভাবিক (14px)' },
                      { id: 'base', label: 'Medium', desc: 'মাঝারি (16px)' },
                      { id: 'lg', label: 'Large', desc: 'বড় (18px)' },
                    ].map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleFieldChange('heroSubtitleSize', s.id)}
                        className={`py-2 px-1 rounded-xl border text-center transition ${
                          (config.heroSubtitleSize || 'sm') === s.id
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
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
                    <label className="text-slate-300 font-semibold">Subtitle Spacing / Gap (সাবটাইটেলের ফাঁকা জায়গা):</label>
                    <span className="text-[10px] text-amber-400 font-mono font-bold">
                      {config.heroSubtitleSpacing === 'tight' ? 'Tight Gap (mt-1)' : config.heroSubtitleSpacing === 'relaxed' ? 'Relaxed Gap (mt-4)' : config.heroSubtitleSpacing === 'loose' ? 'Loose Gap (mt-6)' : 'Normal Gap (mt-2.5)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'tight', label: 'Tight', desc: 'কম ফাঁকা' },
                      { id: 'normal', label: 'Normal', desc: 'স্বাভাবিক' },
                      { id: 'relaxed', label: 'Relaxed', desc: 'বেশি ফাঁকা' },
                      { id: 'loose', label: 'Loose', desc: 'সর্বোচ্চ' },
                    ].map(sp => (
                      <button
                        key={sp.id}
                        type="button"
                        onClick={() => handleFieldChange('heroSubtitleSpacing', sp.id)}
                        className={`py-1.5 px-1 rounded-xl border text-center transition ${
                          (config.heroSubtitleSpacing || 'normal') === sp.id
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
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
                    <label className="text-slate-300 font-semibold">Title Text Size (টাইটেলের টেক্সট সাইজ):</label>
                    <span className="text-[10px] text-indigo-400 font-mono font-bold">
                      {config.heroTitleSize === 'sm' ? '28pt (Compact)' : config.heroTitleSize === 'lg' ? '48pt (Large)' : config.heroTitleSize === 'xl' ? '60pt (Extra Large)' : '36pt (Medium - Default)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'sm', label: 'Small', desc: 'ছোট (28pt)' },
                      { id: 'md', label: 'Medium', desc: 'মাঝারি (36pt)' },
                      { id: 'lg', label: 'Large', desc: 'বড় (48pt)' },
                      { id: 'xl', label: 'XL', desc: 'ম্যাক্স (60pt)' },
                    ].map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleFieldChange('heroTitleSize', s.id)}
                        className={`py-2 px-1 rounded-xl border text-center transition ${
                          (config.heroTitleSize || 'md') === s.id
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
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
                    <label className="text-slate-300 font-semibold">Title Top Gap / Spacing (টাইটেলের উপরের স্পেস):</label>
                    <span className="text-[10px] text-amber-400 font-mono font-bold">
                      {config.heroTopGap === 'none' ? 'Minimal Gap' : config.heroTopGap === 'normal' ? 'Normal Gap' : config.heroTopGap === 'lg' ? 'Large Gap' : 'Compact Gap (Default)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'none', label: 'Minimal', desc: 'খুব কম' },
                      { id: 'sm', label: 'Compact', desc: 'কম ফাঁকা' },
                      { id: 'normal', label: 'Normal', desc: 'স্বাভাবিক' },
                      { id: 'lg', label: 'Spacious', desc: 'বেশি ফাঁকা' },
                    ].map(g => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => handleFieldChange('heroTopGap', g.id)}
                        className={`py-1.5 px-1 rounded-xl border text-center transition ${
                          (config.heroTopGap || 'sm') === g.id
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
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
                    <label className="block text-slate-300 font-semibold mb-1">Text Alignment (অ্যালাইনমেন্ট):</label>
                    <div className="grid grid-cols-2 gap-1.5">
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
                        <span>Left (বামে)</span>
                      </button>
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
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Section Padding (উচ্চতা):</label>
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
                    <p className="text-[10px] text-slate-500">Show or hide the domestic market buttons (টিক দিলে দেখাবে, উঠালে হাইড হবে)</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.showHubSwitcher !== false}
                    onChange={(e) => handleFieldChange('showHubSwitcher', e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-950 border-slate-700 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section: Mega Menu & Global Search (মেনু ও সার্চ) */}
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
                      Search Bar Placeholder Text (সার্চ বক্সের লেখা):
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
                                    title="Move item up (বাম দিকে নিন)"
                                  >
                                    <ArrowUp className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={idx === totalCats - 1}
                                    onClick={() => handleMoveMenuItem(idx, 1)}
                                    className={`p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition ${idx === totalCats - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                    title="Move item down (ডান দিকে নিন)"
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
                                  Menu Title (মেনুর নাম):
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
                                  Category Key (ফিল্টার কিওয়ার্ড):
                                </label>
                                <select
                                  value={cat.categoryKey}
                                  onChange={(e) => handleMegaMenuCategoryChange(idx, 'categoryKey', e.target.value)}
                                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:border-indigo-500 focus:outline-none"
                                >
                                  <option value="Deals">🔥 Deals (প্রোমো ছাড়)</option>
                                  <option value="Holiday">🎄 Holiday Cards (ক্রিসমাস ও হলিডে)</option>
                                  <option value="Gifts">🎁 Gifts & Calendars (ক্যালেন্ডার ও গিফট)</option>
                                  <option value="Marketing">💼 Marketing & Business (বিজনেস কার্ড)</option>
                                  <option value="Apparel">👕 Clothing & Bags (টি-শার্ট ও হুডি)</option>
                                  <option value="Wall Art">🖼️ Signs & Wall Art (ব্যানার ও আর্ট)</option>
                                  <option value="Accessories">🏷️ Labels & Stickers (স্টিকার ও বক্স)</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-400 mb-1 font-semibold">
                                  Badge Label (ঐচ্ছিক ব্যাজ):
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
                                  Dropdown Subcategories (সাবমেনু আইটেমসমূহ - কমা দিয়ে লিখুন):
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

          {/* Section: Vista Promotional Photo Slider & SAVE 25% (স্লাইডার ও কোটেশন) */}
          {activeSection === 'promoslider' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <BadgePercent className="w-4 h-4 text-amber-400" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                    Vista Promotional Photo Slider (দুই পাশে ছবি, মাঝে SAVE 25% ও কোটেশন)
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
                          Discount Headline (বড় লেখা):
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
                          Promo Coupon Code (কুপন কোড):
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
                          Top Badge Label (টপ ব্যাজ):
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
                        Promo Subtitle / Description (অফারের বিস্তারিত):
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
                      Configure Photo Slides (ছবি, কোটেশন ও ক্যাপশন):
                    </label>

                    {(config.promoSlides || DEFAULT_STOREFRONT_CONFIG.promoSlides).map((slide, sIdx) => (
                      <div key={slide.id || sIdx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
                          <span className="font-bold text-amber-400">Slide #{sIdx + 1}: {slide.tag}</span>
                          <span className="text-[10px] text-slate-500 font-mono">Target: {slide.targetCategory}</span>
                        </div>

                        {/* Left Photo & Quote */}
                        <div className="p-2.5 bg-slate-900/80 rounded-lg space-y-1.5 border border-slate-800">
                          <div className="font-semibold text-indigo-300 text-[11px]">Left Photo & Quote (বামের ছবি ও ক্যাপশন):</div>
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
                            <label className="block text-[10px] text-slate-400">Quotation / Callout (ছবির উপরের কোটেশন):</label>
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
                          <div className="font-semibold text-emerald-300 text-[11px]">Right Photo & Quote (ডানের ছবি ও ক্যাপশন):</div>
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
                            <label className="block text-[10px] text-slate-400">Quotation / Callout (ছবির উপরের কোটেশন):</label>
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

              {/* Category Showcase Grid Toggle */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold text-xs">Explore Popular Categories Showcase (ভিজ্যুয়াল টপ টাইলস)</span>
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

                {/* Catalog Section Vertical Spacing */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    Product Section Vertical Spacing (প্রোডাক্ট সেকশন প্যাডিং / স্পেস):
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
                        className={`p-2.5 rounded-xl border text-center transition ${
                          (config.catalogPadding || 'normal') === pad.id
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm'
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
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-slate-400">Show Row:</span>
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

            {/* 2. Preview Nav Header with Search */}
            <div className={`px-3 py-2 border-b flex items-center justify-between gap-2 text-xs ${
              storeTheme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}>
              <div className="flex items-center space-x-1.5 flex-shrink-0">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] text-white ${
                  storeTheme === 'light' ? 'bg-slate-900' : 'bg-indigo-600'
                }`}>
                  P
                </div>
                <span className="font-extrabold text-[11px] truncate">{config.brandName}</span>
              </div>
              {config.showSearchBar !== false && (
                <div className={`flex-1 flex items-center px-2 py-1 rounded-lg text-[9px] border truncate ${
                  storeTheme === 'light' ? 'bg-slate-100 text-slate-400 border-slate-200' : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}>
                  <Search className="w-2.5 h-2.5 mr-1 opacity-50 flex-shrink-0" />
                  <span className="truncate">{config.searchPlaceholder || 'Search products...'}</span>
                </div>
              )}
              <div className="text-[10px] opacity-60 flex-shrink-0">Cart (2)</div>
            </div>

            {/* Vista Mega Menu Horizontal Preview Bar */}
            {config.showMegaMenu !== false && (
              <div className={`px-2 py-1 border-b flex items-center space-x-2.5 text-[8px] font-semibold overflow-x-auto ${
                storeTheme === 'light' ? 'bg-slate-50 text-slate-700 border-slate-200' : 'bg-slate-900/80 text-slate-300 border-slate-800'
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
              <div className={`p-2.5 border-b relative ${
                storeTheme === 'light' ? 'bg-gradient-to-r from-amber-50/70 via-white to-amber-50/70 border-slate-200' : 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800'
              }`}>
                <div className="flex items-center justify-between text-[7px] font-bold text-amber-500 uppercase mb-1">
                  <span>{config.promoBadgeText || 'VISTAPRINT SPECIAL OFFER'}</span>
                  <span className="font-mono bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/20">CODE: {config.promoCode || 'SAVE25'}</span>
                </div>
                
                {/* Dual flanking photos with center SAVE 25% */}
                <div className="grid grid-cols-12 gap-1.5 items-center">
                  {/* Left Photo Card */}
                  <div className="col-span-3 relative rounded-md overflow-hidden aspect-[4/3] bg-slate-800">
                    <img 
                      src={(config.promoSlides && config.promoSlides[0]?.leftImage) || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300'} 
                      alt="" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-1">
                      <div className="text-[6px] text-white italic truncate font-serif">“Make an impression”</div>
                      <div className="text-[5px] text-amber-300 font-semibold truncate">Business Cards</div>
                    </div>
                  </div>

                  {/* Center Offer Box */}
                  <div className="col-span-6 text-center px-1">
                    <div className="font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 leading-none">
                      {config.promoDiscountHeadline || 'SAVE 25%'}
                    </div>
                    <div className="text-[7px] font-semibold text-slate-700 dark:text-slate-200 mt-0.5 truncate">
                      Marketing, Apparel & Art
                    </div>
                    <div className="text-[6px] text-slate-500 line-clamp-1 mt-0.5">
                      Use code {config.promoCode || 'SAVE25'} at checkout
                    </div>
                  </div>

                  {/* Right Photo Card */}
                  <div className="col-span-3 relative rounded-md overflow-hidden aspect-[4/3] bg-slate-800">
                    <img 
                      src={(config.promoSlides && config.promoSlides[0]?.rightImage) || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300'} 
                      alt="" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-1">
                      <div className="text-[6px] text-white italic truncate font-serif">“Elevate your brand”</div>
                      <div className="text-[5px] text-emerald-300 font-semibold truncate">Marketing Flyers</div>
                    </div>
                  </div>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center items-center space-x-1 mt-1.5">
                  <span className="w-3 h-0.5 rounded-full bg-indigo-500"></span>
                  <span className="w-1 h-0.5 rounded-full bg-slate-400 opacity-50"></span>
                  <span className="w-1 h-0.5 rounded-full bg-slate-400 opacity-50"></span>
                  <span className="w-1 h-0.5 rounded-full bg-slate-400 opacity-50"></span>
                </div>
              </div>
            )}

            {/* 3. Preview Hero */}
            <div className={`p-4 border-b ${
              storeTheme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/40 border-slate-800'
            } ${config.heroAlignment === 'left' ? 'text-left' : 'text-center'} ${
              config.heroTopGap === 'none' ? 'pt-2' : config.heroTopGap === 'lg' ? 'pt-8' : config.heroTopGap === 'normal' ? 'pt-6' : 'pt-4'
            }`}>
              {config.showLiveHubBadge !== false && (
                <span className="inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 mb-1.5">
                  ● {config.liveHubBadgeLabel || 'Live Production Hub:'} Detroit / London
                </span>
              )}
              <h3 className={`font-extrabold leading-tight ${
                config.heroTitleSize === 'sm' ? 'text-xs sm:text-sm' :
                config.heroTitleSize === 'lg' ? 'text-base sm:text-lg' :
                config.heroTitleSize === 'xl' ? 'text-lg sm:text-xl' :
                'text-sm sm:text-base'
              }`}>
                {config.heroTitlePrefix}{' '}
                <span className={storeTheme === 'light' ? 'text-indigo-600' : 'text-indigo-400'}>
                  {config.heroTitleAccent}
                </span>
              </h3>
              <p className={`opacity-75 line-clamp-2 max-w-sm ${config.heroAlignment === 'left' ? '' : 'mx-auto'} ${
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

              {/* Regional Hub Switcher preview */}
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
              <div className="p-3 border-b space-y-1.5">
                <div className="text-[10px] font-bold text-center">{config.categoryShowcaseTitle || 'Explore Popular Categories'}</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {(config.categoryShowcaseCards || DEFAULT_STOREFRONT_CONFIG.categoryShowcaseCards).slice(0, 3).map((tile, i) => (
                    <div key={i} className={`p-1.5 rounded-lg border text-center ${
                      storeTheme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
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
              <div className={`px-3 py-2 border-b flex items-center space-x-2 text-[9px] ${
                storeTheme === 'light' ? 'bg-amber-50/60 border-amber-200/60 text-amber-900' : 'bg-indigo-950/40 border-indigo-500/20 text-indigo-300'
              }`}>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span className="font-bold truncate">{config.guaranteeHeading || '100% Satisfaction Guaranteed'}</span>
              </div>
            )}

            {/* 4. Preview Products Grid (Accurately reflecting columns & spacing) */}
            <div className={`p-4 space-y-3 ${
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
            {config.showTrustProps !== false && (
              <div className={`p-3 border-t grid grid-cols-3 gap-2 text-center text-[9px] ${
                storeTheme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}>
                {config.trustProps.map((p, idx) => (
                  <div key={idx} className="truncate">
                    <div className="font-bold truncate">{p.title}</div>
                  </div>
                ))}
              </div>
            )}

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
