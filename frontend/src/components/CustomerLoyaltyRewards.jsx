import React, { useState } from 'react';
import { 
  Award, Crown, Gift, Sparkles, Check, ChevronRight, X, 
  Coins, ArrowRight, Heart, Share2, Star, Clock, Copy
} from 'lucide-react';

export const DEFAULT_REWARDS = [
  {
    id: 'rew-5off',
    title: '$5.00 Off Any Order',
    pointsCost: 500,
    code: 'ROYAL5-OFF',
    discountAmount: 5,
    type: 'fixed_discount',
    description: 'Instant $5 discount applied to your checkout cart.'
  },
  {
    id: 'rew-ship',
    title: 'Free Worldwide Express Shipping',
    pointsCost: 300,
    code: 'ROYAL-FREESHIP',
    discountAmount: 4.99,
    type: 'free_shipping',
    description: 'Waive standard or express global courier fees.'
  },
  {
    id: 'rew-10off',
    title: '$10.00 Off Any Order',
    pointsCost: 1000,
    code: 'ROYAL10-OFF',
    discountAmount: 10,
    type: 'fixed_discount',
    description: 'Instant $10 discount applied to orders over $30.'
  },
  {
    id: 'rew-25off',
    title: '$25.00 VIP Reward Voucher',
    pointsCost: 2500,
    code: 'ROYAL25-VIP',
    discountAmount: 25,
    type: 'fixed_discount',
    description: 'Major savings for corporate & wholesale print runs.'
  }
];

export const DEFAULT_EARNING_ACTIVITIES = [
  {
    id: 'act-shop',
    title: 'Shop Custom Prints',
    pointsReward: '10 Pts per $1 Spent',
    icon: '🛍️',
    description: 'Earn points on every business card, hoodie, or signage purchase.'
  },
  {
    id: 'act-insta',
    title: 'Follow @PrintFlow on Instagram',
    pointsReward: '+100 Points',
    icon: '📸',
    description: 'Stay updated with unboxings and daily creator design tips.'
  },
  {
    id: 'act-review',
    title: 'Leave a Photo Product Review',
    pointsReward: '+250 Points',
    icon: '⭐',
    description: 'Upload a picture of your finished print product to earn bonus points.'
  },
  {
    id: 'act-refer',
    title: 'Refer a Fellow Creator or Business',
    pointsReward: '+1,000 Points',
    icon: '🤝',
    description: 'They get 15% off, and you get 1,000 Royal Points on their first order.'
  }
];

export default function CustomerLoyaltyRewards({
  currencySymbol = '$',
  storeTheme = 'light',
  onApplyRewardDiscount,
  initialPoints = 850
}) {
  const isLight = storeTheme === 'light';
  const [pointsBalance, setPointsBalance] = useState(initialPoints);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('rewards'); // 'rewards' | 'earn' | 'tier'
  const [redeemedCoupon, setRedeemedCoupon] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Royalty Tier Calculation
  const currentTier = pointsBalance >= 5000 
    ? { name: 'Royal Platinum VIP', multiplier: '2.0x', nextThreshold: null, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' }
    : pointsBalance >= 1500
    ? { name: 'Gold Royalty', multiplier: '1.5x', nextThreshold: 5000, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' }
    : pointsBalance >= 500
    ? { name: 'Silver Royalty', multiplier: '1.25x', nextThreshold: 1500, color: 'text-slate-300 bg-slate-500/10 border-slate-500/30' }
    : { name: 'Bronze Member', multiplier: '1.0x', nextThreshold: 500, color: 'text-amber-600 bg-amber-600/10 border-amber-600/30' };

  const handleRedeemReward = (reward) => {
    if (pointsBalance < reward.pointsCost) {
      showToast(`You need ${reward.pointsCost - pointsBalance} more points to redeem this voucher.`);
      return;
    }

    setPointsBalance(prev => prev - reward.pointsCost);
    setRedeemedCoupon(reward);

    if (onApplyRewardDiscount) {
      onApplyRewardDiscount(reward);
    }
    showToast(`Redeemed ${reward.title}! Coupon ${reward.code} auto-applied!`);
  };

  const handleSimulateEarn = (pts, name) => {
    setPointsBalance(prev => prev + pts);
    showToast(`Earned +${pts} Royal Points for ${name}!`);
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-2xl animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Floating Royalty Point Trigger Button (Docked at bottom-left or visible on retail storefront) */}
      <div className="fixed bottom-6 left-6 z-40 pointer-events-auto">
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="group flex items-center space-x-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md text-white border border-amber-500/40 shadow-xl hover:scale-105 transition-all cursor-pointer ring-2 ring-amber-500/20"
          title="Open Royal Points & Royalty Rewards"
        >
          <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Crown className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider leading-none">
              {currentTier.name}
            </div>
            <div className="text-xs font-black text-white leading-tight">
              {pointsBalance.toLocaleString()} Pts
            </div>
          </div>
        </button>
      </div>

      {/* Slide-out Royalty Rewards Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l overflow-hidden ${
            isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
          }`}>
            {/* Drawer Header */}
            <div className={`p-5 border-b flex items-center justify-between ${
              isLight ? 'bg-gradient-to-r from-amber-500/10 to-indigo-500/10' : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-gradient-to-tr from-amber-500 to-indigo-600 text-white rounded-xl shadow-md">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black">Royalty & Rewards Club</h3>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold border uppercase ${currentTier.color}`}>
                      {currentTier.name} ({currentTier.multiplier} multiplier)
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Points Balance Card */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available Points</span>
                  <div className="text-3xl font-black text-amber-500 mt-0.5 flex items-baseline space-x-1">
                    <span>{pointsBalance.toLocaleString()}</span>
                    <span className="text-xs font-bold text-slate-400">Royal Pts</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Cash Value</span>
                  <div className="text-base font-black text-emerald-500 mt-0.5">
                    {currencySymbol}{(pointsBalance / 100).toFixed(2)} Credit
                  </div>
                </div>
              </div>

              {/* Progress to Next Tier */}
              {currentTier.nextThreshold && (
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>Progress to Gold Royalty</span>
                    <span>{currentTier.nextThreshold - pointsBalance} pts needed</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-indigo-600 transition-all duration-500" 
                      style={{ width: `${Math.min(100, (pointsBalance / currentTier.nextThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sub-tabs: Redeem Rewards vs Ways to Earn */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('rewards')}
                className={`flex-1 py-3 border-b-2 text-center transition cursor-pointer ${
                  activeTab === 'rewards'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Redeem Vouchers
              </button>
              <button
                onClick={() => setActiveTab('earn')}
                className={`flex-1 py-3 border-b-2 text-center transition cursor-pointer ${
                  activeTab === 'earn'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Ways to Earn
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Tab 1: Redeem Rewards */}
              {activeTab === 'rewards' && (
                <div className="space-y-3">
                  {DEFAULT_REWARDS.map(reward => {
                    const canAfford = pointsBalance >= reward.pointsCost;
                    return (
                      <div
                        key={reward.id}
                        className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          canAfford 
                            ? isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-950 border-slate-800'
                            : 'opacity-50 border-slate-200 dark:border-slate-800/60'
                        }`}
                      >
                        <div className="min-w-0 space-y-0.5">
                          <div className="text-xs font-black truncate">{reward.title}</div>
                          <p className="text-[10px] text-slate-400 leading-tight">{reward.description}</p>
                          <div className="text-[10px] font-black text-amber-500 font-mono">
                            {reward.pointsCost} Points
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={!canAfford}
                          onClick={() => handleRedeemReward(reward)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer ${
                            canAfford 
                              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm' 
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Redeem
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tab 2: Ways to Earn */}
              {activeTab === 'earn' && (
                <div className="space-y-3">
                  {DEFAULT_EARNING_ACTIVITIES.map(act => (
                    <div
                      key={act.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                        isLight ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <span className="text-xl shrink-0">{act.icon}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-black truncate">{act.title}</div>
                          <p className="text-[10px] text-slate-400 leading-tight">{act.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          {act.pointsReward}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Instant Auto-Redeem Note */}
            <div className={`p-4 border-t text-[11px] text-center ${
              isLight ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-slate-950'
            }`}>
              <span className="text-slate-400">
                Points are automatically credited upon successful POD order dispatch.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
