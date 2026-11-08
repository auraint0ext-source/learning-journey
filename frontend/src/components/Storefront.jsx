import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';
import { ShoppingBag, Truck, CheckCircle2, ShieldCheck, Tag, ExternalLink, Zap, Layers } from 'lucide-react';

export default function Storefront({ currentMarket, markets }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placingOrderId, setPlacingOrderId] = useState(null);
  const [latestOrderResult, setLatestOrderResult] = useState(null);

  const marketInfo = markets[currentMarket] || {
    currency: 'USD',
    currency_symbol: '$',
    exchange_rate_to_usd: 1.0,
    tax_name: 'Sales Tax',
    tax_rate_percent: 7.5,
    shipping_base_rate: 4.99,
    fulfillment_hub: 'US Print Network'
  };

  const fetchCatalog = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/ecommerce/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/ecommerce/orders`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to fetch orders', err);
    }
  };

  useEffect(() => {
    fetchCatalog();
    fetchOrders();
  }, [currentMarket]);

  // Convert USD base price to regional currency
  const getRegionalPrice = (basePriceUsd) => {
    const converted = basePriceUsd * marketInfo.exchange_rate_to_usd;
    return converted.toFixed(2);
  };

  // Place Instant Test Order
  const handlePlaceOrder = async (product) => {
    setPlacingOrderId(product.id);
    setLatestOrderResult(null);

    const regionalPrice = parseFloat(getRegionalPrice(product.base_price_usd));

    const payload = {
      customer_name: currentMarket === 'UK' ? 'Oliver Smith' : currentMarket === 'CA' ? 'Liam Tremblay' : 'James Miller',
      customer_email: `buyer.${currentMarket.toLowerCase()}.${Math.floor(100 + Math.random() * 900)}@example.com`,
      customer_phone: '+1-555-0144',
      target_country: currentMarket,
      shipping_address: currentMarket === 'UK' ? '42 Oxford Street, Westminster' : currentMarket === 'CA' ? '1280 Bay Street, Suite 400' : '742 Evergreen Terrace',
      city: currentMarket === 'UK' ? 'London' : currentMarket === 'CA' ? 'Toronto' : 'Springfield',
      postal_code: currentMarket === 'UK' ? 'W1D 1BS' : currentMarket === 'CA' ? 'M5R 3K4' : '62704',
      items: [
        {
          product_id: product.id,
          title: product.title,
          quantity: 1,
          unit_price: regionalPrice,
          mockup_url: product.image_url
        }
      ]
    };

    try {
      const res = await fetch(`${API_BASE}/api/ecommerce/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const orderData = await res.json();
        setLatestOrderResult(orderData);
        fetchOrders();
      }
    } catch (err) {
      console.error('Order placement failed', err);
    } finally {
      setPlacingOrderId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Market Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">
                {currentMarket === 'US' ? '🇺🇸' : currentMarket === 'UK' ? '🇬🇧' : '🇨🇦'}
              </span>
              <h1 className="text-xl font-bold text-white">
                Print-on-Demand Storefront — {marketInfo.country_name || currentMarket}
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Active Regional Routing: <span className="text-indigo-400 font-medium">{marketInfo.fulfillment_hub}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-lg">
              <span className="text-slate-400">Currency: </span>
              <strong className="text-white font-mono">{marketInfo.currency} ({marketInfo.currency_symbol})</strong>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-lg">
              <span className="text-slate-400">{marketInfo.tax_name}: </span>
              <strong className="text-white font-mono">{marketInfo.tax_rate_percent}%</strong>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-lg">
              <span className="text-slate-400">Shipping: </span>
              <strong className="text-white font-mono">{marketInfo.currency_symbol}{marketInfo.shipping_base_rate}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Order Confirmation Alert */}
      {latestOrderResult && (
        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 flex items-start justify-between text-xs">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-emerald-300">
                Order #{latestOrderResult.order_number} Dispatched to {latestOrderResult.pod_provider}!
              </div>
              <div className="text-slate-300">
                Fulfillment Hub: <strong className="text-white">{latestOrderResult.pod_fulfillment_hub}</strong> • 
                Total: <strong className="text-emerald-400 font-mono">{latestOrderResult.currency} {latestOrderResult.total_amount}</strong>
              </div>
              <div className="text-[11px] text-slate-400">
                ⚡ Automation workflow automatically triggered: Meta CAPI Purchase logged, TikTok Event synced, and POD order queued!
              </div>
            </div>
          </div>
          <button
            onClick={() => setLatestOrderResult(null)}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Product Catalog Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
            <span>Active Print-on-Demand Catalog</span>
          </h2>
          <span className="text-xs text-slate-400">{products.length} Products configured</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {products.map((p) => {
            const regionalPrice = getRegionalPrice(p.base_price_usd);
            const isOrdering = placingOrderId === p.id;

            return (
              <div
                key={p.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="relative aspect-square overflow-hidden bg-slate-950">
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 text-[10px] bg-slate-900/80 backdrop-blur text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-sm text-white line-clamp-1">{p.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{p.description}</p>
                    <div className="text-[11px] text-indigo-400 font-mono">
                      Supplier: {p.supplier}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-800/60 mt-3">
                  <div className="flex items-baseline justify-between mb-3 pt-3">
                    <span className="text-xs text-slate-400">Price ({marketInfo.currency}):</span>
                    <span className="text-lg font-bold text-white font-mono">
                      {marketInfo.currency_symbol}{regionalPrice}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePlaceOrder(p)}
                    disabled={isOrdering}
                    className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition disabled:opacity-50"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{isOrdering ? 'Processing Order...' : 'Place Test Order'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Multi-Market Order Production Queue</span>
          </h2>
          <span className="text-xs text-slate-400">{orders.length} Total orders</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/50 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Order Number</th>
                <th className="py-2.5 px-3">Market</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">POD Fulfillment Hub</th>
                <th className="py-2.5 px-3">Total Amount</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-500">
                    No orders placed yet. Click "Place Test Order" above to trigger POD fulfillment!
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-mono text-indigo-400 font-semibold">{o.order_number}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-white font-mono font-bold">
                        {o.target_country === 'US' ? '🇺🇸 US' : o.target_country === 'UK' ? '🇬🇧 UK' : '🇨🇦 CA'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-white font-medium">{o.customer_name}</div>
                      <div className="text-slate-400 text-[11px]">{o.customer_email}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300 max-w-xs truncate">
                      {o.pod_fulfillment_hub || o.pod_provider}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                      {o.currency} {o.total_amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {o.status}
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
  );
}
