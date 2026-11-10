import React, { useState } from 'react';
import { 
  Users, Share2, Award, DollarSign, Check, Copy, Sparkles, 
  ArrowRight, ExternalLink, ShieldCheck, X, TrendingUp, CheckCircle2,
  Gift, Heart, Instagram, Youtube, Twitter
} from 'lucide-react';

export const DEFAULT_INFLUENCERS = [
  {
    id: 'inf-1',
    name: 'Maya Lin',
    handle: '@mayalin_design',
    platform: 'Instagram',
    followers: '48.2K',
    tier: 'Micro-Influencer',
    promoCode: 'MAYA15',
    discountPercent: 15,
    commissionRate: 12,
    referralLink: 'https://printflow.store?ref=mayalin_design',
    clicks: 1420,
    orders: 114,
    salesGenerated: 4280.00,
    unpaidCommission: 513.60,
    status: 'ACTIVE'
  },
  {
    id: 'inf-2',
    name: 'Julian Vance',
    handle: '@streetwear_daily',
    platform: 'TikTok',
    followers: '185.0K',
    tier: 'Macro-Creator',
    promoCode: 'STREET15',
    discountPercent: 15,
    commissionRate: 15,
    referralLink: 'https://printflow.store?ref=streetwear_daily',
    clicks: 4890,
    orders: 382,
    salesGenerated: 14850.00,
    unpaidCommission: 2227.50,
    status: 'ACTIVE'
  },
  {
    id: 'inf-3',
    name: 'Chloe Laurent',
    handle: '@luxe_stationery_co',
    platform: 'YouTube',
    followers: '62.4K',
    tier: 'Micro-Influencer',
    promoCode: 'CHLOE15',
    discountPercent: 15,
    commissionRate: 12,
    referralLink: 'https://printflow.store?ref=luxe_stationery_co',
    clicks: 2150,
    orders: 189,
    salesGenerated: 6920.00,
    unpaidCommission: 830.40,
    status: 'ACTIVE'
  }
];

export default function InfluencerAffiliatePortal({
  currencySymbol = '$',
  storeTheme = 'light',
  isAdminView = false
}) {
  const isLight = storeTheme === 'light';
  const [influencers, setInfluencers] = useState(DEFAULT_INFLUENCERS);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [createdAffiliate, setCreatedAffiliate] = useState(null);
  const [toast, setToast] = useState(null);

  // Application form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    handle: '',
    platform: 'Instagram',
    followers: '10K - 50K',
    desiredCode: ''
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.handle.trim()) return;

    const cleanHandle = formState.handle.replace('@', '').trim();
    const cleanCode = (formState.desiredCode.trim() || `${cleanHandle.slice(0, 5).toUpperCase()}15`).toUpperCase();

    const newCreator = {
      id: `inf-${Date.now()}`,
      name: formState.name.trim(),
      handle: `@${cleanHandle}`,
      platform: formState.platform,
      followers: formState.followers,
      tier: 'Registered Creator',
      promoCode: cleanCode,
      discountPercent: 15,
      commissionRate: 12,
      referralLink: `https://printflow.store?ref=${cleanHandle}`,
      clicks: 0,
      orders: 0,
      salesGenerated: 0,
      unpaidCommission: 0,
      status: 'ACTIVE'
    };

    setInfluencers(prev => [newCreator, ...prev]);
    setCreatedAffiliate(newCreator);
    showToast(`Creator account approved! Welcome @${cleanHandle}!`);
  };

  const handlePayCommission = (inf) => {
    setInfluencers(prev => prev.map(item => {
      if (item.id === inf.id) {
        return { ...item, unpaidCommission: 0 };
      }
      return item;
    }));
    showToast(`Automated payout of ${currencySymbol}${inf.unpaidCommission.toFixed(2)} sent to ${inf.handle} via Stripe Connect.`);
  };

  const totalSales = influencers.reduce((acc, i) => acc + i.salesGenerated, 0);
  const totalCommissionOwed = influencers.reduce((acc, i) => acc + i.unpaidCommission, 0);
  const totalOrders = influencers.reduce((acc, i) => acc + i.orders, 0);

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-2xl animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Storefront Creator Banner (Shown on retail storefront or when not strictly admin) */}
      {!isAdminView && (
        <div className={`p-8 rounded-3xl border relative overflow-hidden shadow-lg ${
          isLight ? 'bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 border-indigo-200' : 'bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-slate-950/60 border-indigo-900/60'
        }`}>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white">
                Creator & Influencer Program
              </span>
              <h3 className={`text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Partner with PrintFlow & Earn 12-15% on Every Referral
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Give your followers an exclusive 15% discount on all custom print-on-demand products. Receive automatic monthly payouts, real-time analytics, and free sample creator merch.
              </p>
            </div>

            <button
              onClick={() => {
                setCreatedAffiliate(null);
                setIsJoinModalOpen(true);
              }}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md shadow-indigo-600/30 flex items-center space-x-2 transition hover:scale-105 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Join Creator Program</span>
            </button>
          </div>
        </div>
      )}

      {/* Admin Influencer Management View (Shown in Admin or when toggled) */}
      {isAdminView && (
        <div className="space-y-6">
          {/* Summary Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Active Creators</div>
              <div className="text-2xl font-black text-indigo-500 mt-1">{influencers.length} Influencers</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Across TikTok, Instagram & YouTube</div>
            </div>

            <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Affiliate Sales Driven</div>
              <div className="text-2xl font-black text-emerald-500 mt-1">
                {currencySymbol}{totalSales.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">From {totalOrders} customer orders</div>
            </div>

            <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
              <div className="text-[11px] font-bold text-slate-400 uppercase">Unpaid Commissions</div>
              <div className="text-2xl font-black text-amber-500 mt-1">
                {currencySymbol}{totalCommissionOwed.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Automated Stripe Connect ready</div>
            </div>
          </div>

          {/* Creators Roster Table */}
          <div className={`rounded-2xl border overflow-hidden ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider">Influencer Roster & Commission Ledger</h4>
              <button
                onClick={() => {
                  setCreatedAffiliate(null);
                  setIsJoinModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer"
              >
                + Add Influencer
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className={`border-b text-[10px] font-bold uppercase ${
                  isLight ? 'bg-slate-50 text-slate-500 border-slate-200' : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}>
                  <tr>
                    <th className="py-3 px-4">Influencer / Creator</th>
                    <th className="py-3 px-4">Platform & Audience</th>
                    <th className="py-3 px-4">Promo Code & Link</th>
                    <th className="py-3 px-4 text-right">Orders & Revenue</th>
                    <th className="py-3 px-4 text-right">Commission Owed</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {influencers.map(inf => (
                    <tr key={inf.id} className={isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-800/40'}>
                      <td className="py-3 px-4">
                        <div className="font-bold">{inf.name}</div>
                        <div className="text-[11px] text-indigo-500 font-mono">{inf.handle}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{inf.platform}</div>
                        <div className="text-[10px] text-slate-400">{inf.followers} followers ({inf.tier})</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-bold border border-slate-200 dark:border-slate-700">
                          {inf.promoCode}
                        </span>
                        <div className="text-[9px] text-slate-400 mt-1 truncate max-w-[140px]">
                          {inf.referralLink}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="font-bold">{currencySymbol}{inf.salesGenerated.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-400">{inf.orders} orders ({inf.clicks} clicks)</div>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-amber-500">
                        {currencySymbol}{inf.unpaidCommission.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {inf.unpaidCommission > 0 ? (
                          <button
                            type="button"
                            onClick={() => handlePayCommission(inf)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold shadow-xs transition cursor-pointer"
                          >
                            Pay Out
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium">All Settled</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Join Creator Application Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-md rounded-3xl border p-6 space-y-4 shadow-2xl relative ${
            isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
          }`}>
            <button
              onClick={() => setIsJoinModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!createdAffiliate ? (
              <>
                <div className="flex items-center space-x-2.5">
                  <div className="p-2.5 bg-gradient-to-tr from-purple-500 to-indigo-600 text-white rounded-2xl shadow-md">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Apply for Creator Program</h3>
                    <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Earn 12-15% commission on custom print merchandise.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleApply} className="space-y-3 pt-2 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-400 uppercase text-[10px]">Your Name / Brand *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jordan Bell"
                      value={formState.name}
                      onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-xl border outline-none ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-400 uppercase text-[10px]">Social Handle *</label>
                      <input
                        type="text"
                        required
                        placeholder="@jordan_creates"
                        value={formState.handle}
                        onChange={(e) => setFormState(prev => ({ ...prev, handle: e.target.value }))}
                        className={`w-full px-3 py-2 rounded-xl border outline-none ${
                          isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-400 uppercase text-[10px]">Main Platform</label>
                      <select
                        value={formState.platform}
                        onChange={(e) => setFormState(prev => ({ ...prev, platform: e.target.value }))}
                        className={`w-full px-3 py-2 rounded-xl border outline-none ${
                          isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                        }`}
                      >
                        <option value="Instagram">Instagram</option>
                        <option value="TikTok">TikTok</option>
                        <option value="YouTube">YouTube</option>
                        <option value="Twitter / X">Twitter / X</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-400 uppercase text-[10px]">Follower Count</label>
                      <select
                        value={formState.followers}
                        onChange={(e) => setFormState(prev => ({ ...prev, followers: e.target.value }))}
                        className={`w-full px-3 py-2 rounded-xl border outline-none ${
                          isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                        }`}
                      >
                        <option value="1K - 10K">1K - 10K (Nano)</option>
                        <option value="10K - 50K">10K - 50K (Micro)</option>
                        <option value="50K - 250K">50K - 250K (Macro)</option>
                        <option value="250K+">250K+ (VIP Ambassador)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-400 uppercase text-[10px]">Custom Promo Code</label>
                      <input
                        type="text"
                        placeholder="e.g. JORDAN15"
                        value={formState.desiredCode}
                        onChange={(e) => setFormState(prev => ({ ...prev, desiredCode: e.target.value }))}
                        className={`w-full px-3 py-2 rounded-xl border outline-none ${
                          isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsJoinModalOpen(false)}
                      className="px-4 py-2 rounded-xl border text-slate-400 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md cursor-pointer"
                    >
                      Instant Approval & Activate
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 rounded-full mx-auto flex items-center justify-center text-2xl">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-bold">You're Approved as a Partner!</h3>
                  <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Welcome <span className="font-bold text-indigo-500">{createdAffiliate.handle}</span>. Your tracking kit is now live.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border space-y-2 text-left ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                }`}>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Follower Discount Code (15% Off):</span>
                    <div className="font-mono text-sm font-black text-indigo-500 mt-0.5">
                      {createdAffiliate.promoCode}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Tracking Referral Link:</span>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="font-mono text-[10px] text-slate-300 truncate">
                        {createdAffiliate.referralLink}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(createdAffiliate.referralLink);
                          showToast('Copied tracking link!');
                        }}
                        className="p-1 rounded bg-indigo-600 text-white shrink-0"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsJoinModalOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
