import React, { useState } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Heart, Share2, ShoppingBag, 
  ChevronLeft, ChevronRight, X, Sparkles, Check, ExternalLink,
  Award, Eye, MessageCircle, ArrowRight
} from 'lucide-react';

export const DEFAULT_REELS = [
  {
    id: 'reel-1',
    creator: 'alex_stationery',
    creatorName: 'Alex Vance Studio',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    title: '32pt Gold Foil Finish in direct sunlight ✨ The reflection is insane!',
    description: 'Testing out the new 32pt double-thick uncoated cardstock with raised metallic gold hot-stamping foil. The edge bevel is next level.',
    views: '48.6K',
    likes: 3420,
    tags: ['#LuxuryBusinessCards', '#FoilStamp', '#PrintOnDemand'],
    videoPoster: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-business-cards-placed-on-a-table-41484-large.mp4',
    product: {
      id: 'prod-bizcards-32pt',
      title: '32pt Ultra-Thick Foil Stamped Business Cards',
      category: 'Cards & Stationery',
      price: 24.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=400&q=80',
      badge: 'Best Seller'
    }
  },
  {
    id: 'reel-2',
    creator: 'streetwear_lab',
    creatorName: 'Streetwear Lab NYC',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    title: '400GSM French Terry Vintage Wash Hoodie • Fit check & wash durability 👕',
    description: 'We ran this DTG printed graphic through 15 high-temp laundry cycles. Zero cracking, zero fading. 100% pre-shrunk ring-spun cotton.',
    views: '89.2K',
    likes: 7850,
    tags: ['#Streetwear', '#PODHoodie', '#DirectToGarment'],
    videoPoster: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-wearing-a-hoodie-43285-large.mp4',
    product: {
      id: 'prod-hoodie-heavy',
      title: 'Heavyweight French Terry Oversized Hoodie (400GSM)',
      category: 'Apparel & Merch',
      price: 49.99,
      rating: 4.95,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
      badge: 'Trending'
    }
  },
  {
    id: 'reel-3',
    creator: 'matte_black_daily',
    creatorName: 'Minimal Gear Co.',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    title: 'Laser engraving laser precision test on 20oz vacuum tumbler 🧊🔥',
    description: 'Ice stayed solid for 24 hours. The laser stripped the powder coat down to raw surgical stainless steel with surgical precision.',
    views: '62.1K',
    likes: 5120,
    tags: ['#LaserEngraved', '#Tumbler', '#CustomDrinkware'],
    videoPoster: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-coffee-into-a-cup-41581-large.mp4',
    product: {
      id: 'prod-tumbler-20oz',
      title: 'Laser-Engraved Matte Black Insulated Tumbler 20oz',
      category: 'Drinkware & Gifts',
      price: 28.50,
      rating: 4.88,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
      badge: 'Staff Pick'
    }
  },
  {
    id: 'reel-4',
    creator: 'wedding_couture',
    creatorName: 'Couture Calligraphy',
    creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    title: 'Frosted acrylic invitations with custom wax seal & champagne foil 💍',
    description: 'Every guest gasped opening this envelope. Frosted 2mm acrylic with UV white ink backing and champagne metallic accents.',
    views: '115.4K',
    likes: 12400,
    tags: ['#LuxuryWedding', '#AcrylicInvite', '#FoilInvites'],
    videoPoster: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-wedding-invitation-envelope-42998-large.mp4',
    product: {
      id: 'prod-invites-acrylic',
      title: 'Frosted Arch Acrylic Wedding Invitation Suite',
      category: 'Weddings & Celebrations',
      price: 38.00,
      rating: 4.97,
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=400&q=80',
      badge: 'Luxury Luxe'
    }
  },
  {
    id: 'reel-5',
    creator: 'sticker_society',
    creatorName: 'Sticker Society NYC',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    title: 'Holographic vinyl weatherproof test vs outdoor rain & UV 🌧️🌈',
    description: 'Thick 6mil weatherproof laminated vinyl that withstands dishwashers, car windows, and snowboard trips without scratching.',
    views: '34.8K',
    likes: 2980,
    tags: ['#HolographicStickers', '#DieCutVinyl', '#StickerAddict'],
    videoPoster: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-decorating-a-notebook-with-stickers-41712-large.mp4',
    product: {
      id: 'prod-stickers-holo',
      title: 'Custom Holographic Die-Cut Vinyl Stickers (Pack of 50)',
      category: 'Marketing & Labels',
      price: 18.20,
      rating: 4.85,
      image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=400&q=80',
      badge: 'Trending'
    }
  }
];

export default function ShoppableVideoFeed({
  currencySymbol = '$',
  onAddToCart,
  onSelectProduct,
  storeTheme = 'light'
}) {
  const isLight = storeTheme === 'light';
  const [activeReelIndex, setActiveReelIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [likedReels, setLikedReels] = useState({});
  const [addedToast, setAddedToast] = useState(null);

  const activeReel = activeReelIndex !== null ? DEFAULT_REELS[activeReelIndex] : null;

  const handleToggleLike = (reelId, e) => {
    if (e) e.stopPropagation();
    setLikedReels(prev => ({
      ...prev,
      [reelId]: !prev[reelId]
    }));
  };

  const handleOpenReel = (index) => {
    setActiveReelIndex(index);
    setIsPlaying(true);
  };

  const handleCloseReel = () => {
    setActiveReelIndex(null);
  };

  const handleNextReel = () => {
    if (activeReelIndex < DEFAULT_REELS.length - 1) {
      setActiveReelIndex(activeReelIndex + 1);
    } else {
      setActiveReelIndex(0);
    }
  };

  const handlePrevReel = () => {
    if (activeReelIndex > 0) {
      setActiveReelIndex(activeReelIndex - 1);
    } else {
      setActiveReelIndex(DEFAULT_REELS.length - 1);
    }
  };

  const handleQuickAdd = (product, e) => {
    if (e) e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setAddedToast(`Added ${product.title} to your bag!`);
      setTimeout(() => setAddedToast(null), 3000);
    }
  };

  return (
    <section className={`py-12 border-t transition-colors relative z-10 ${
      isLight ? 'bg-gradient-to-b from-slate-50 to-white border-slate-200' : 'bg-gradient-to-b from-slate-950/70 to-slate-900/60 border-slate-800'
    }`}>
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-2xl animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>{addedToast}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span>Shoppable Video Feed</span>
              </span>
              <span className="text-xs font-semibold text-slate-400">• Real Customer & Creator Reels</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Watch Real Custom Prints in Motion
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Explore tactile finishes, fit checks, and unboxings from verified designers. Tap any video tag to shop directly.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-slate-400">
              {DEFAULT_REELS.length} Featured Reels
            </span>
          </div>
        </div>

        {/* Video Cards Reel Horizontal Slider */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
          {DEFAULT_REELS.map((reel, idx) => {
            const isLiked = likedReels[reel.id];
            return (
              <div
                key={reel.id}
                onClick={() => handleOpenReel(idx)}
                className={`group relative rounded-2xl overflow-hidden aspect-[9/16] cursor-pointer shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border ${
                  isLight ? 'border-slate-200 bg-slate-900' : 'border-slate-800 bg-slate-950'
                }`}
              >
                {/* Background Image / Poster */}
                <img
                  src={reel.videoPoster}
                  alt={reel.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />

                {/* Top Badges: Creator & Views */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px]">
                  <div className="flex items-center space-x-1.5 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full">
                    <img
                      src={reel.creatorAvatar}
                      alt={reel.creator}
                      className="w-3.5 h-3.5 rounded-full object-cover"
                    />
                    <span className="font-semibold truncate max-w-[70px]">@{reel.creator}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full font-mono text-[9px]">
                    <Eye className="w-3 h-3 text-slate-300" />
                    <span>{reel.views}</span>
                  </div>
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white border border-white/50 shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Overlay: Pinned Product Tag */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 space-y-2">
                  <p className="text-white text-[11px] font-bold line-clamp-2 leading-tight drop-shadow-md">
                    {reel.title}
                  </p>

                  <div className="p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-between gap-1.5">
                    <div className="flex items-center space-x-2 min-w-0">
                      <img
                        src={reel.product.image}
                        alt={reel.product.title}
                        className="w-7 h-7 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-slate-900 dark:text-white truncate">
                          {reel.product.title}
                        </div>
                        <div className="text-[10px] font-black text-indigo-600 dark:text-indigo-400">
                          {currencySymbol}{reel.product.price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(reel.product, e)}
                      title="Quick Add to Bag"
                      className="w-6 h-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shrink-0 shadow-sm transition hover:scale-105 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Interactive Reel Modal */}
      {activeReel !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
          <div className="relative w-full max-w-sm sm:max-w-md h-[92vh] max-h-[820px] rounded-3xl overflow-hidden bg-black shadow-2xl flex flex-col justify-between border border-white/20">
            {/* Background Simulated Video / Animation */}
            <div className="absolute inset-0 z-0">
              <img
                src={activeReel.videoPoster}
                alt={activeReel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
            </div>

            {/* Top Bar: Close, Volume, and Reel Indicator */}
            <div className="relative z-10 p-4 flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[10px] font-bold bg-rose-500/80 px-2 py-0.5 rounded-full uppercase">
                  Reel {activeReelIndex + 1}/{DEFAULT_REELS.length}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCloseReel}
                className="p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle: Left/Right Arrow Navigation */}
            <div className="relative z-10 px-2 flex items-center justify-between pointer-events-none">
              <button
                type="button"
                onClick={handlePrevReel}
                className="pointer-events-auto p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition cursor-pointer"
                title="Previous Reel"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextReel}
                className="pointer-events-auto p-2.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition cursor-pointer"
                title="Next Reel"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Side Action Floating Dock: Like, Share, Views */}
            <div className="absolute right-3.5 bottom-32 z-10 flex flex-col items-center space-y-3.5 text-white">
              <button
                type="button"
                onClick={(e) => handleToggleLike(activeReel.id, e)}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className={`p-3 rounded-full backdrop-blur-md transition ${
                  likedReels[activeReel.id] ? 'bg-rose-500 text-white' : 'bg-black/40 hover:bg-black/60 text-white'
                }`}>
                  <Heart className={`w-5 h-5 ${likedReels[activeReel.id] ? 'fill-current' : ''}`} />
                </div>
                <span className="text-[10px] font-bold mt-1">
                  {(activeReel.likes + (likedReels[activeReel.id] ? 1 : 0)).toLocaleString()}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  setAddedToast('Reel link copied to clipboard!');
                  setTimeout(() => setAddedToast(null), 3000);
                }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="p-3 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition text-white">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold mt-1">Share</span>
              </button>
            </div>

            {/* Bottom Section: Creator Info, Description & Shoppable Product Card */}
            <div className="relative z-10 p-4 space-y-3">
              {/* Creator Pill */}
              <div className="flex items-center space-x-2">
                <img
                  src={activeReel.creatorAvatar}
                  alt={activeReel.creator}
                  className="w-9 h-9 rounded-full object-cover border-2 border-white/60"
                />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-white font-black text-xs">@{activeReel.creator}</span>
                    <span className="text-[9px] bg-indigo-500/80 text-white px-1.5 py-0.2 rounded-full font-bold">
                      Creator
                    </span>
                  </div>
                  <span className="text-slate-300 text-[10px]">{activeReel.creatorName}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h4 className="text-white font-bold text-xs line-clamp-1">{activeReel.title}</h4>
                <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-2">
                  {activeReel.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {activeReel.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] text-indigo-300 font-semibold">{t}</span>
                  ))}
                </div>
              </div>

              {/* Shoppable Product Floating Card */}
              <div className="p-3 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-between gap-3 text-white">
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={activeReel.product.image}
                    alt={activeReel.product.title}
                    className="w-11 h-11 rounded-xl object-cover shrink-0 border border-white/10"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">{activeReel.product.title}</div>
                    <div className="flex items-center space-x-2 text-[11px] mt-0.5">
                      <span className="font-black text-emerald-400">
                        {currencySymbol}{activeReel.product.price.toFixed(2)}
                      </span>
                      <span className="text-slate-400 text-[10px]">★ {activeReel.product.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      handleQuickAdd(activeReel.product, e);
                      handleCloseReel();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-indigo-600/30 transition cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
