import React, { useState } from 'react';
import { 
  Sparkles, Plus, Check, ShoppingBag, ArrowRight, Zap, 
  Award, TrendingUp, ShieldCheck, Heart, Star, Layers, Percent
} from 'lucide-react';

export const DEFAULT_AI_RECOMMENDATIONS = [
  {
    id: 'rec-1',
    title: 'Luxury 32pt Velvet Soft-Touch Business Cards',
    category: 'Cards & Stationery',
    price: 26.50,
    matchScore: 99,
    reason: 'Matches your focus on luxury tactile finishes and gold foil accents',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
    rating: 4.96,
    reviews: 312,
    badge: '99% Match'
  },
  {
    id: 'rec-2',
    title: 'Anodized Aluminum Laser-Engraved Card Vault',
    category: 'Desk & Office',
    price: 16.00,
    matchScore: 98,
    reason: 'Frequently paired with premium cards to prevent corner scuffing',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    rating: 4.91,
    reviews: 184,
    badge: 'Smart Pair'
  },
  {
    id: 'rec-3',
    title: 'Custom Wax Seal Stamp & Champagne Sealing Wax Beads',
    category: 'Packaging & Enclosures',
    price: 22.00,
    matchScore: 96,
    reason: 'Complements invitations & executive envelope sealing',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=600&q=80',
    rating: 4.88,
    reviews: 95,
    badge: 'High Conversion'
  },
  {
    id: 'rec-4',
    title: 'Matte Black Stainless Steel Thermal Tumbler 20oz',
    category: 'Drinkware & Merch',
    price: 28.50,
    matchScore: 95,
    reason: 'Trending in your regional market for executive onboarding kits',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    rating: 4.93,
    reviews: 420,
    badge: 'Regional Pick'
  }
];

export const DEFAULT_BUNDLE_ITEMS = [
  {
    id: 'b-1',
    title: '32pt Gold Foil Business Cards (Pack of 100)',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=300&q=80',
    checked: true
  },
  {
    id: 'b-2',
    title: 'Branded Aluminum Pocket Presentation Case',
    price: 14.50,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=300&q=80',
    checked: true
  },
  {
    id: 'b-3',
    title: 'Matte Precision Rollerball Signature Pen',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1585336261026-78b17b2b2b10?auto=format&fit=crop&w=300&q=80',
    checked: true
  }
];

export default function PersonalizedRecommendations({
  currencySymbol = '$',
  currentMarket = 'US',
  onAddToCart,
  storeTheme = 'light'
}) {
  const isLight = storeTheme === 'light';
  const [activeTab, setActiveTab] = useState('recommended'); // 'recommended' | 'bundle' | 'trending'
  const [bundleItems, setBundleItems] = useState(DEFAULT_BUNDLE_ITEMS);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleBundleItem = (id) => {
    setBundleItems(prev => prev.map(item => {
      if (item.id === id) return { ...item, checked: !item.checked };
      return item;
    }));
  };

  const activeBundleItems = bundleItems.filter(b => b.checked);
  const originalBundleTotal = activeBundleItems.reduce((acc, item) => acc + item.price, 0);
  const bundleDiscount = 0.20; // 20% discount
  const discountedBundleTotal = originalBundleTotal * (1 - bundleDiscount);
  const bundleSavings = originalBundleTotal - discountedBundleTotal;

  const handleAddBundleToCart = () => {
    if (activeBundleItems.length === 0) return;
    activeBundleItems.forEach(item => {
      if (onAddToCart) {
        onAddToCart({
          id: item.id,
          title: item.title,
          price: +(item.price * (1 - bundleDiscount)).toFixed(2),
          image: item.image,
          selectedPaperStock: 'Included in Bundle',
          selectedCorner: 'Standard'
        });
      }
    });
    showToast(`Added ${activeBundleItems.length}-piece bundle to cart with 20% discount!`);
  };

  const handleAddSingleRec = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
      showToast(`Added ${product.title} to your bag!`);
    }
  };

  return (
    <section className={`py-12 border-t transition-colors relative z-10 ${
      isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
    }`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-2xl animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header with AI Algorithm Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-indigo-600 text-white rounded-lg shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-500">
                Personalized Product Recommendation Engine
              </span>
              <span className="text-xs text-slate-400">• Neural Scoring</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Curated Recommendations For Your Brand
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Powered by deep collaborative filtering calibrated for the {currentMarket} market and trending luxury finishes.
            </p>
          </div>

          {/* Algorithm Mode Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('recommended')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'recommended'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Recommendations</span>
            </button>

            <button
              onClick={() => setActiveTab('bundle')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'bundle'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Percent className="w-3.5 h-3.5 text-amber-400" />
              <span>Bundle & Save (20%)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Smart AI Recommendations Grid */}
        {activeTab === 'recommended' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEFAULT_AI_RECOMMENDATIONS.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between group hover:shadow-xl hover:border-indigo-500/50 ${
                  isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="space-y-3">
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-200 dark:bg-slate-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-indigo-600 text-white shadow-md">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-500">
                      {item.category}
                    </span>
                    <h3 className={`font-bold text-xs line-clamp-2 mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-[10px] mt-1 line-clamp-2 italic ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      "{item.reason}"
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {currencySymbol}{item.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-1">★ {item.rating}</span>
                  </div>

                  <button
                    onClick={() => handleAddSingleRec(item)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] flex items-center space-x-1 shadow-sm transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Frequently Bought Together Bundle */}
        {activeTab === 'bundle' && (
          <div className={`p-6 rounded-3xl border shadow-lg ${
            isLight ? 'bg-indigo-50/40 border-indigo-200' : 'bg-indigo-950/20 border-indigo-900/60'
          }`}>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left Side: 3 Connected Product Cards */}
              <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 w-full">
                {bundleItems.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <div 
                      onClick={() => handleToggleBundleItem(item.id)}
                      className={`flex-1 w-full p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3 ${
                        item.checked 
                          ? isLight 
                            ? 'bg-white border-indigo-500 shadow-sm ring-2 ring-indigo-500/20' 
                            : 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30'
                          : isLight 
                            ? 'bg-white/60 border-slate-200 opacity-60' 
                            : 'bg-slate-950/60 border-slate-800 opacity-60'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}}
                        className="rounded text-indigo-600 focus:ring-0 shrink-0 cursor-pointer"
                      />
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className={`text-xs font-bold truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {item.title}
                        </div>
                        <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                          {currencySymbol}{item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {idx < bundleItems.length - 1 && (
                      <div className="text-indigo-400 font-black text-lg shrink-0 px-1">
                        +
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Right Side: Bundle Total & Checkout CTA */}
              <div className={`w-full lg:w-72 p-5 rounded-2xl border flex flex-col justify-between space-y-4 shrink-0 ${
                isLight ? 'bg-white border-indigo-200 shadow-sm' : 'bg-slate-900 border-indigo-900/80 shadow-xl'
              }`}>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Bundle Regular Price:</span>
                    <span className="line-through">{currencySymbol}{originalBundleTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-500">Bundle Discount (20%):</span>
                    <span className="text-xs font-black text-emerald-500">-{currencySymbol}{bundleSavings.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Bundle Price:
                    </span>
                    <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                      {currencySymbol}{discountedBundleTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={activeBundleItems.length === 0}
                  onClick={handleAddBundleToCart}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center space-x-2 transition cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Bundle & Save 20%</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
