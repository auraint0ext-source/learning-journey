import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';
import { 
  MessageSquare, Send, Search, CheckCheck, User, Package, 
  MapPin, Phone, Mail, Sparkles, Filter, ExternalLink, 
  ShoppingBag, ShieldCheck, Zap, RefreshCw, MessageCircle
} from 'lucide-react';

const CHANNEL_ICONS = {
  whatsapp: { label: 'WhatsApp', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', border: 'border-emerald-500' },
  messenger: { label: 'Messenger', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', border: 'border-blue-500' },
  instagram: { label: 'Instagram', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30', border: 'border-pink-500' },
  tiktok: { label: 'TikTok', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30', border: 'border-cyan-500' },
  twitter: { label: 'X (Twitter)', color: 'bg-sky-500/20 text-sky-400 border-sky-500/30', border: 'border-sky-500' },
};

export default function SocialInbox({ currentMarket, storeTheme = 'light' }) {
  const isLight = storeTheme === 'light';
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [marketFilter, setMarketFilter] = useState('all');
  const [isSending, setIsSending] = useState(false);
  const [quickActionNotice, setQuickActionNotice] = useState(null);

  // Fetch Channels
  const fetchChannels = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/inbox/channels`);
      if (res.ok) setChannels(await res.json());
    } catch (err) {
      console.error('Failed to load channels:', err);
    }
  };

  // Fetch Conversations
  const fetchConversations = async (ch = selectedChannel) => {
    try {
      const url = ch === 'all' 
        ? `${API_BASE}/api/inbox/conversations` 
        : `${API_BASE}/api/inbox/conversations?channel=${ch}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
        if (data.length > 0) {
          const currentMatch = data.find((c) => c.id === selectedConversation?.id);
          setSelectedConversation(currentMatch || data[0]);
        } else {
          setSelectedConversation(null);
        }
      }
    } catch (err) {
      console.error('Failed to fetch conversations:', err);
    }
  };

  useEffect(() => {
    fetchChannels();
    fetchConversations(selectedChannel);
  }, [selectedChannel]);

  // Send Reply
  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConversation) return;

    setIsSending(true);
    try {
      const res = await fetch(`${API_BASE}/api/inbox/conversations/${selectedConversation.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: replyText.trim() })
      });

      if (res.ok) {
        setReplyText('');
        fetchConversations(selectedChannel);
        fetchChannels();
      }
    } catch (err) {
      console.error('Failed to send reply:', err);
    } finally {
      setIsSending(false);
    }
  };

  // Quick Canned Reply Pill
  const insertQuickReply = (text) => {
    setReplyText(text);
  };

  // Quick Action Simulation (e.g. Grant Coupon)
  const triggerQuickAction = (actionName) => {
    setQuickActionNotice(actionName);
    setTimeout(() => setQuickActionNotice(null), 3500);
  };

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch = c.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.last_message?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMarket = marketFilter === 'all' || c.customer_country === marketFilter;
    return matchesSearch && matchesMarket;
  });

  return (
    <div className={`flex h-[calc(100vh-4rem)] overflow-hidden ${isLight ? 'admin-light-mode bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      {/* 1. Leftmost Channels Sidebar */}
      <aside className={`w-64 border-r flex flex-col justify-between z-20 ${
        isLight ? 'bg-white border-slate-200' : 'border-slate-800 bg-slate-900/90'
      }`}>
        <div>
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Omnichannel Inbox</h2>
                <p className="text-[11px] text-slate-400">Social Media & Chat Ops</p>
              </div>
            </div>
          </div>

          {/* Channels List */}
          <div className="p-3 space-y-1.5">
            <button
              onClick={() => setSelectedChannel('all')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                selectedChannel === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className="text-base">🌐</span>
                <span>All Inboxes</span>
              </div>
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 font-mono">
                {conversations.length}
              </span>
            </button>

            {channels.map((ch) => {
              const isSelected = selectedChannel === ch.id;
              const emoji = ch.id === 'whatsapp' ? '💬' : ch.id === 'messenger' ? '⚡' : ch.id === 'instagram' ? '📷' : ch.id === 'tiktok' ? '🎵' : '🐦';
              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-base">{emoji}</span>
                    <span>{ch.name}</span>
                  </div>
                  {ch.unread_count > 0 ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold font-mono">
                      {ch.unread_count}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-mono">
                      {ch.total_conversations}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Channel Status */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/40 text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold">Webhooks Synchronized</span>
          </div>
          <p className="text-[10px] text-slate-500">Listening to Meta, TikTok & WhatsApp Cloud API</p>
        </div>
      </aside>

      {/* 2. Conversations List Column */}
      <div className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col z-10">
        {/* Search & Market Filter */}
        <div className="p-3.5 border-b border-slate-800 space-y-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700/80 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-1 text-[11px]">
            <span className="text-slate-400 mr-1 text-[10px] uppercase font-bold">Market:</span>
            {['all', 'US', 'UK', 'CA'].map((m) => (
              <button
                key={m}
                onClick={() => setMarketFilter(m)}
                className={`px-2 py-0.5 rounded-md font-semibold transition ${
                  marketFilter === m
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {m === 'all' ? 'All' : m === 'US' ? '🇺🇸 US' : m === 'UK' ? '🇬🇧 UK' : '🇨🇦 CA'}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No messages found in this view.
            </div>
          ) : (
            filteredConversations.map((c) => {
              const isSelected = selectedConversation?.id === c.id;
              const chInfo = CHANNEL_ICONS[c.channel] || CHANNEL_ICONS.whatsapp;
              const flag = c.customer_country === 'US' ? '🇺🇸' : c.customer_country === 'UK' ? '🇬🇧' : '🇨🇦';

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedConversation(c)}
                  className={`p-3.5 cursor-pointer transition flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-indigo-600/15 border-l-4 border-indigo-500'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={c.customer_avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                      alt={c.customer_name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    <span className="absolute -bottom-1 -right-1 text-xs">
                      {flag}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-white truncate">{c.customer_name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {c.channel.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 truncate leading-relaxed">
                      {c.last_message || 'New conversation'}
                    </p>

                    {c.related_order_number && (
                      <span className="inline-block mt-1 text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        📦 {c.related_order_number}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 3. Main Chat Conversation Canvas */}
      <main className="flex-1 flex flex-col bg-slate-950">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-slate-800 bg-slate-900/80 px-6 flex items-center justify-between z-10">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedConversation.customer_avatar}
                  alt={selectedConversation.customer_name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white">{selectedConversation.customer_name}</span>
                    <span className="text-xs">
                      {selectedConversation.customer_country === 'US' ? '🇺🇸 USA' : selectedConversation.customer_country === 'UK' ? '🇬🇧 UK' : '🇨🇦 Canada'}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase ${CHANNEL_ICONS[selectedConversation.channel]?.color}`}>
                      {selectedConversation.channel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">{selectedConversation.customer_handle}</p>
                </div>
              </div>

              {selectedConversation.related_order_number && (
                <div className="flex items-center space-x-2 text-xs bg-indigo-950/40 border border-indigo-500/30 px-3 py-1.5 rounded-lg">
                  <Package className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-slate-300">Order:</span>
                  <strong className="text-indigo-300 font-mono">{selectedConversation.related_order_number}</strong>
                </div>
              )}
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="text-center">
                <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1 rounded-full font-mono">
                  Conversation started via {CHANNEL_ICONS[selectedConversation.channel]?.label} • End-to-End Encrypted
                </span>
              </div>

              {selectedConversation.messages?.map((msg) => {
                const isAgent = msg.sender_type === 'agent';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md rounded-2xl px-4 py-2.5 text-xs shadow-md leading-relaxed ${
                        isAgent
                          ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-br-sm'
                          : 'bg-slate-800/90 text-slate-100 rounded-bl-sm border border-slate-700/60'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="flex items-center space-x-1 text-[10px] text-slate-500 mt-1 px-1">
                      <span>{msg.timestamp}</span>
                      {isAgent && <CheckCheck className="w-3 h-3 text-indigo-400" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Canned Reply Shortcuts */}
            <div className="px-6 py-2 bg-slate-900/60 border-t border-slate-800/60 flex items-center space-x-2 overflow-x-auto text-[11px]">
              <span className="text-slate-400 shrink-0 font-medium">Quick Replies:</span>
              <button
                onClick={() => insertQuickReply(`Hi ${selectedConversation.customer_name}! Your custom POD order has been routed to our production facility.`)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 truncate"
              >
                🏭 Order In Production
              </button>
              <button
                onClick={() => insertQuickReply(`Here is your special regional discount voucher: ${selectedConversation.customer_country === 'UK' ? 'UK20OFF' : selectedConversation.customer_country === 'CA' ? 'CAD15OFF' : 'USA15OFF'}!`)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 truncate"
              >
                🎁 Send Discount Code
              </button>
              <button
                onClick={() => insertQuickReply(`Standard delivery takes 2-3 business days domestically via ${selectedConversation.customer_country === 'UK' ? 'Royal Mail Tracked' : selectedConversation.customer_country === 'CA' ? 'Canada Post Expedited' : 'USPS Priority'}.`)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 truncate"
              >
                🚚 Shipping Carrier Details
              </button>
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendReply} className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center space-x-3">
              <input
                type="text"
                placeholder={`Type a reply to ${selectedConversation.customer_name} on ${CHANNEL_ICONS[selectedConversation.channel]?.label}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={isSending || !replyText.trim()}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition flex items-center space-x-1.5 disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSending ? 'Sending...' : 'Send'}</span>
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
            Select a conversation on the left to start chatting.
          </div>
        )}
      </main>

      {/* 4. Right Side Drawer: Customer Profile & Order Overview */}
      {selectedConversation && (
        <aside className="w-80 border-l border-slate-800 bg-slate-900/80 p-5 overflow-y-auto space-y-6 z-10">
          {/* Customer Profile Header */}
          <div className="text-center space-y-2 pb-4 border-b border-slate-800">
            <img
              src={selectedConversation.customer_avatar}
              alt={selectedConversation.customer_name}
              className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-indigo-500 shadow-xl"
            />
            <h3 className="font-bold text-sm text-white">{selectedConversation.customer_name}</h3>
            <p className="text-xs text-slate-400 font-mono">{selectedConversation.customer_handle}</p>
            <div className="inline-flex items-center space-x-1 text-xs bg-slate-800 px-2.5 py-1 rounded-full text-slate-300">
              <MapPin className="w-3 h-3 text-indigo-400" />
              <span>
                {selectedConversation.customer_country === 'US' ? 'United States' : selectedConversation.customer_country === 'UK' ? 'United Kingdom' : 'Canada'}
              </span>
            </div>
          </div>

          {/* Quick Automation Actions */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Quick Automation Actions
            </span>

            <div className="space-y-1.5">
              <button
                onClick={() => triggerQuickAction('✅ Tracking link email dispatched to customer!')}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition text-left"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Send Tracking Email</span>
              </button>

              <button
                onClick={() => triggerQuickAction('✅ VIP Discount Voucher (15% OFF) issued & synced to CRM!')}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition text-left"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span>Issue 15% VIP Voucher</span>
              </button>

              <button
                onClick={() => triggerQuickAction('✅ High-Intent Lead Event posted to Meta Conversions API!')}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition text-left"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Push Meta CAPI Lead Event</span>
              </button>
            </div>

            {quickActionNotice && (
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-lg p-2.5 text-[11px] text-emerald-300 animate-fade-in font-medium">
                {quickActionNotice}
              </div>
            )}
          </div>

          {/* Associated POD Order Details */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>POD Order Details</span>
              <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
            </span>

            {selectedConversation.related_order ? (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-indigo-400 font-bold">
                    {selectedConversation.related_order.order_number}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    {selectedConversation.related_order.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 space-y-1">
                  <div>
                    Hub: <strong className="text-white">{selectedConversation.related_order.pod_fulfillment_hub}</strong>
                  </div>
                  <div>
                    Total: <strong className="text-emerald-400 font-mono">{selectedConversation.related_order.currency} {selectedConversation.related_order.total_amount}</strong>
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-2 space-y-1.5">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Items:</div>
                  {selectedConversation.related_order.items?.map((it, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-[11px] text-slate-300">
                      <div className="w-6 h-6 rounded bg-slate-800 overflow-hidden shrink-0">
                        {it.mockup_url && <img src={it.mockup_url} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <span className="truncate">{it.title} (x{it.quantity})</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center text-slate-500 text-xs">
                No active order linked to this conversation yet.
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
