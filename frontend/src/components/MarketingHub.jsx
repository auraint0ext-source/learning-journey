import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';
import { Radio, Share2, Users, Gift, Send, CheckCircle2, ShieldAlert, Sparkles, Filter, RefreshCw } from 'lucide-react';

export default function MarketingHub({ currentMarket }) {
  const [metrics, setMetrics] = useState(null);
  const [events, setEvents] = useState([]);
  const [leads, setLeads] = useState([]);
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadSource, setNewLeadSource] = useState('meta_instant_form');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSuccessInfo, setLeadSuccessInfo] = useState(null);

  const fetchMetrics = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/ads/metrics`);
      if (res.ok) setMetrics(await res.json());
    } catch (err) {
      console.error('Failed to fetch metrics', err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/ads/events`);
      if (res.ok) setEvents(await res.json());
    } catch (err) {
      console.error('Failed to fetch events', err);
    }
  };

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/leads/`);
      if (res.ok) setLeads(await res.json());
    } catch (err) {
      console.error('Failed to fetch leads', err);
    }
  };

  useEffect(() => {
    fetchMetrics();
    fetchEvents();
    fetchLeads();
  }, [currentMarket]);

  // Submit Simulated Lead via Webhook
  const handleSimulateLead = async (e) => {
    e.preventDefault();
    if (!newLeadEmail) return;

    setIsSubmittingLead(true);
    setLeadSuccessInfo(null);

    try {
      const payload = {
        email: newLeadEmail,
        full_name: newLeadName || 'Prospect from Ad',
        phone_number: '+1-555-0812',
        country: currentMarket,
        campaign_name: `POD-Global-Retargeting-${currentMarket}-Q4`
      };

      const res = await fetch(`${API_BASE}/api/ads/webhook/meta-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        setLeadSuccessInfo(data);
        setNewLeadEmail('');
        setNewLeadName('');
        fetchLeads();
        fetchEvents();
        fetchMetrics();
      }
    } catch (err) {
      console.error('Lead simulation failed', err);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Meta Conversions API (CAPI)</span>
            <Share2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            {metrics?.by_platform?.meta_capi ?? 0}
          </div>
          <p className="text-[11px] text-blue-400 mt-1">Direct Server-to-Server SHA-256 Hashed</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">TikTok Events API</span>
            <Radio className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            {metrics?.by_platform?.tiktok_events ?? 0}
          </div>
          <p className="text-[11px] text-purple-400 mt-1">Web Pixel & S2S Sync Active</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Google Enhanced Conversions</span>
            <Share2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            {metrics?.by_platform?.google_ads ?? 0}
          </div>
          <p className="text-[11px] text-emerald-400 mt-1">High-Precision Smart Bidding Feed</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Captured Leads</span>
            <Users className="w-4 h-4 text-pink-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">{leads.length}</div>
          <p className="text-[11px] text-pink-400 mt-1">Klaviyo & HubSpot CRM Synced</p>
        </div>
      </div>

      {/* Lead Generation & Webhook Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Social Lead Ad Webhook Simulator</h2>
              <p className="text-xs text-slate-400">Meta Instant Form & TikTok Lead Form</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Simulate a prospective buyer clicking a Facebook or TikTok Ad and submitting an Instant Lead Form. This triggers automated CRM syncing and generates a personalized coupon code.
          </p>

          <form onSubmit={handleSimulateLead} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Lead Full Name</label>
              <input
                type="text"
                placeholder="e.g. Jessica Taylor"
                value={newLeadName}
                onChange={(e) => setNewLeadName(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
              <input
                type="email"
                required
                placeholder="jessica.taylor@example.com"
                value={newLeadEmail}
                onChange={(e) => setNewLeadEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Lead Source</label>
              <select
                value={newLeadSource}
                onChange={(e) => setNewLeadSource(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="meta_instant_form">Meta Facebook/Instagram Lead Ad</option>
                <option value="tiktok_instant_form">TikTok Lead Generation Form</option>
                <option value="website_discount_popup">Storefront Exit-Intent Wheel</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmittingLead}
              className="w-full flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-lg text-xs font-semibold bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white shadow-lg transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmittingLead ? 'Triggering Webhook...' : `Capture Lead for ${currentMarket}`}</span>
            </button>
          </form>

          {leadSuccessInfo && (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 text-xs space-y-1 mt-3">
              <div className="text-emerald-400 font-bold flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Lead Processed & Synced!</span>
              </div>
              <div className="text-slate-300">
                Promo Code Assigned: <strong className="text-white font-mono">{leadSuccessInfo.lead?.promo_code}</strong>
              </div>
              <div className="text-[11px] text-slate-400">
                {leadSuccessInfo.workflows_triggered} Automation Workflow(s) executed automatically.
              </div>
            </div>
          )}
        </div>

        {/* Captured Leads Table */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Captured Prospects & Discount Vouchers</span>
            </h2>
            <button
              onClick={() => { fetchLeads(); fetchEvents(); }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Refresh"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/50 text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Lead Email</th>
                  <th className="py-2.5 px-3">Market</th>
                  <th className="py-2.5 px-3">Source</th>
                  <th className="py-2.5 px-3">Promo Code</th>
                  <th className="py-2.5 px-3">CRM Sync</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-500">
                      No leads captured yet. Use the simulator on the left to capture one!
                    </td>
                  </tr>
                ) : (
                  leads.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-800/30">
                      <td className="py-2.5 px-3">
                        <div className="text-white font-medium">{l.email}</div>
                        <div className="text-slate-400 text-[11px]">{l.name || 'Anonymous'}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-white font-mono font-bold text-[10px]">
                          {l.country}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-300 font-mono text-[11px]">{l.source}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 font-mono font-bold text-[10px] border border-pink-500/20">
                          {l.promo_code}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                          SYNCED
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Conversion Events Log Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-bold text-white">
              Social Media Ad Conversion Event Feed (Meta CAPI / TikTok / Google)
            </h2>
          </div>
          <span className="text-xs text-slate-400">{events.length} Events Logged</span>
        </div>

        <div className="space-y-2">
          {events.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-xs">
              No conversion events recorded yet. Place an order or simulate a workflow to trigger conversion events!
            </div>
          ) : (
            events.slice(0, 10).map((ev) => (
              <div
                key={ev.id}
                className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 text-xs flex flex-col md:flex-row md:items-center justify-between gap-2"
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      ev.platform === 'META_CAPI'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : ev.platform === 'TIKTOK_EVENTS'
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {ev.platform}
                  </span>
                  <span className="font-semibold text-white">{ev.event_name}</span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    ID: {ev.event_id}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-slate-400 text-[11px]">
                  <span>Country: <strong className="text-white">{ev.country}</strong></span>
                  <span>Value: <strong className="text-emerald-400 font-mono">{ev.currency} {ev.value}</strong></span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {ev.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
