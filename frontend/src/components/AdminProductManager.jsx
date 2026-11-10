import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';
import { 
  Package, Plus, Trash2, CheckCircle2, AlertCircle, RefreshCw, 
  ExternalLink, DollarSign, Tag, Layers, ToggleLeft, ToggleRight,
  Sparkles, Image as ImageIcon, Box, Truck, Sun, Moon, Palette, HelpCircle,
  Barcode, ScanBarcode, Printer, Copy, Check, Search, X, QrCode, Zap, Edit3, Save
} from 'lucide-react';

const PRESET_MOCKUPS = [
  {
    name: 'Custom Christmas & Holiday Photo Cards (Pack of 25)',
    category: 'Holiday',
    price: 24.99,
    sku: 'XMAS-CRD-01',
    supplier: 'Prodigi (UK) / Gelato (USA & CA)',
    image: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?w=800&auto=format&fit=crop&q=80',
    description: 'Personalized holiday greeting cards printed on premium 16pt cardstock. Includes white envelopes and edge-to-edge photo reproduction.'
  },
  {
    name: 'Embossed Gold Foil Luxury Festive Cards (Pack of 25)',
    category: 'Holiday',
    price: 32.50,
    sku: 'FOIL-CRD-02',
    supplier: 'Duplium (Canada) / Gelato (USA)',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&auto=format&fit=crop&w=800&q=80',
    description: 'Real metallic gold foil accents that catch the festive light. Heavyweight velvety soft-touch stock with coordinating gold-lined envelopes.'
  },
  {
    name: '2026 Custom Wall Calendar (11x8.5 in Spiral)',
    category: 'Gifts',
    price: 21.99,
    sku: 'CAL-WALL-26',
    supplier: 'Prodigi (USA & UK) / Duplium (CA)',
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&auto=format&fit=crop&q=80',
    description: '12-month personalized wall calendar with 250 GSM heavy satin pages, wire-o binding, and drilled hole for effortless hanging.'
  },
  {
    name: 'Outdoor Heavy-Duty Vinyl Banner (4x2 ft)',
    category: 'Signs & Banners',
    price: 34.00,
    sku: 'BAN-OUT-01',
    supplier: 'Prodigi / Gelato (USA & Canada)',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80',
    description: 'Weatherproof 13oz scrim vinyl banner with reinforced welded hems and brass hanging grommets every 2 feet. UV-cured fade resistant inks.'
  },
  {
    name: 'Corrugated Lawn & Yard Signs with H-Stakes (Pack of 3)',
    category: 'Signs & Banners',
    price: 28.00,
    sku: 'SGN-YARD-03',
    supplier: 'SwiftPOD (USA)',
    image: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=800&auto=format&fit=crop&q=80',
    description: 'Fluted 4mm weatherproof polypropylene yard signs with sturdy galvanized steel H-stakes. Double-sided vivid full-color printing.'
  },
  {
    name: 'Premium Matte Soft-Touch Business Cards (Pack of 100)',
    category: 'Marketing',
    price: 19.99,
    sku: 'CARD-MATTE-10',
    supplier: 'Prodigi / Gelato (USA, UK, CA)',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    description: 'Ultra-thick 16pt cardstock with silky soft-touch lamination and crisp edge-to-edge printing. Sharp typography & saturated colors.'
  },
  {
    name: 'Cyberpunk Heavyweight Hoodie (350 GSM)',
    category: 'Apparel',
    price: 48.00,
    sku: 'HOOD-CYBER-09',
    supplier: 'Monster Digital (USA) / Prodigi (UK)',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    description: 'Ultra-soft 350 GSM fleece hoodie with high-density direct-to-film front & back art.'
  },
  {
    name: 'Die-Cut Weatherproof Vinyl Stickers (Pack of 50)',
    category: 'Accessories',
    price: 14.99,
    sku: 'STK-VINYL-50',
    supplier: 'StickerApp / Gelato',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    description: 'Thick 6mil weatherproof vinyl with glossy UV laminate. Laser contour cut precisely to your custom artwork shape.'
  }
];

// Helper to generate deterministic Code 128 / UPC-A bar widths
function generateBarcodeBars(sku = '') {
  let hash = 0;
  for (let i = 0; i < sku.length; i++) {
    hash = (hash << 5) - hash + sku.charCodeAt(i);
    hash |= 0;
  }
  // Start guard
  const bars = [2, 1, 1, 2];
  for (let i = 0; i < 22; i++) {
    const val = Math.abs((hash ^ (i * 37)) % 4) + 1;
    bars.push(val);
  }
  // End guard
  bars.push(2, 1, 2, 2);
  return bars;
}

// Helper to generate a 12-digit UPC-A human readable number
function getBarcodeNumber(sku = '', id = 1) {
  let num = 0;
  for (let i = 0; i < sku.length; i++) {
    num = (num * 31 + sku.charCodeAt(i)) % 100000000;
  }
  const part1 = String(Math.abs(num)).padStart(8, '7');
  const part2 = String((Number(id || 1) * 97) % 10000).padStart(4, '0');
  const full = `${part1.slice(0, 6)}${part2}`;
  return `${full[0]} ${full.slice(1, 6)} ${full.slice(6, 11)} ${full[11] || '8'}`;
}

// Clean Vector SVG Barcode Component
function BarcodeSVG({ sku, id, width = 280, height = 75, isDark = false }) {
  const bars = generateBarcodeBars(sku);
  const barcodeNum = getBarcodeNumber(sku, id);
  let currentX = 14;
  const totalBarWidth = bars.reduce((a, b) => a + b * 2, 0);

  return (
    <div className={`flex flex-col items-center p-3 rounded-xl border select-all ${
      isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      <svg width={width} height={height} viewBox={`0 0 ${totalBarWidth + 28} ${height}`} className="w-full max-w-[280px]">
        {bars.map((barWidth, idx) => {
          const isBlack = idx % 2 === 0;
          const x = currentX;
          currentX += barWidth * 2;
          if (!isBlack) return null;
          return (
            <rect
              key={idx}
              x={x}
              y={6}
              width={barWidth * 1.8}
              height={height - 20}
              fill={isDark ? '#f8fafc' : '#0f172a'}
            />
          );
        })}
      </svg>
      <div className={`font-mono text-xs tracking-[0.25em] font-bold mt-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
        {barcodeNum}
      </div>
      <div className="text-[10px] font-mono text-slate-400 tracking-wider">
        *{sku}*
      </div>
    </div>
  );
}

export default function AdminProductManager({ 
  currentMarket = 'US', 
  onSwitchToStore, 
  storeTheme = 'light', 
  onToggleStoreTheme 
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Barcode Features State
  const [selectedBarcodeProduct, setSelectedBarcodeProduct] = useState(null);
  const [barcodeSearchQuery, setBarcodeSearchQuery] = useState('');
  const [isLaserScanning, setIsLaserScanning] = useState(false);
  const [scanResultToast, setScanResultToast] = useState(null);
  const [copiedBarcode, setCopiedBarcode] = useState(false);

  // Category Tabs Filter
  const [selectedCategoryTab, setSelectedCategoryTab] = useState('All');

  // Edit Product State
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    category: 'Holiday',
    base_price_usd: 24.99,
    image_url: '',
    sku: '',
    supplier: '',
    description: '',
    in_stock: true
  });

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'Holiday',
    base_price_usd: 24.99,
    image_url: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?w=800&auto=format&fit=crop&q=80',
    sku: `POD-${Math.floor(1000 + Math.random() * 9000)}`,
    supplier: 'Prodigi / Gelato',
    description: '',
    in_stock: true
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/ecommerce/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        showToast('Failed to load products from API', 'error');
      }
    } catch (err) {
      showToast(`Network error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleApplyPreset = (preset) => {
    setFormData({
      title: preset.name,
      category: preset.category,
      base_price_usd: preset.price,
      image_url: preset.image,
      sku: `${preset.sku}-${Math.floor(100 + Math.random() * 900)}`,
      supplier: preset.supplier,
      description: preset.description,
      in_stock: true
    });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.sku || formData.base_price_usd <= 0) {
      showToast('Please provide valid title, SKU, and base price', 'error');
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/ecommerce/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          base_price_usd: parseFloat(formData.base_price_usd)
        })
      });

      if (res.ok) {
        const created = await res.json();
        showToast(`Product "${created.title}" published with SKU ${created.sku}!`, 'success');
        setShowAddModal(false);
        setFormData({
          title: '',
          category: 'Apparel',
          base_price_usd: 29.99,
          image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
          sku: `POD-${Math.floor(1000 + Math.random() * 9000)}`,
          supplier: 'Printify / Monster Digital',
          description: '',
          in_stock: true
        });
        fetchProducts();
      } else {
        const err = await res.json();
        showToast(err.detail || 'Failed to create product', 'error');
      }
    } catch (err) {
      showToast(`Error creating product: ${err.message}`, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setEditFormData({
      title: product.title,
      category: product.category,
      base_price_usd: product.base_price_usd,
      image_url: product.image_url,
      sku: product.sku,
      supplier: product.supplier,
      description: product.description,
      in_stock: product.in_stock
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editFormData.title || !editFormData.sku || editFormData.base_price_usd <= 0) {
      showToast('Please provide valid title, SKU, and base price', 'error');
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/ecommerce/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editFormData,
          base_price_usd: parseFloat(editFormData.base_price_usd)
        })
      });

      if (res.ok) {
        const updated = await res.json();
        showToast(`Product "${updated.title}" successfully updated!`, 'success');
        setEditingProduct(null);
        fetchProducts();
      } else {
        const err = await res.json();
        showToast(err.detail || 'Failed to update product', 'error');
      }
    } catch (err) {
      showToast(`Error updating product: ${err.message}`, 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.title}" (${product.sku})?`)) return;

    try {
      const res = await fetch(`${API_BASE}/api/ecommerce/products/${product.id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        showToast(`Product "${product.title}" removed.`, 'success');
        setProducts(prev => prev.filter(p => p.id !== product.id));
      } else {
        const err = await res.json();
        showToast(err.detail || 'Could not delete product', 'error');
      }
    } catch (err) {
      showToast(`Error deleting product: ${err.message}`, 'error');
    }
  };

  const handleToggleStock = async (product) => {
    try {
      const res = await fetch(`${API_BASE}/api/ecommerce/products/${product.id}/toggle-stock`, {
        method: 'PATCH'
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts(prev => prev.map(p => p.id === product.id ? { ...p, in_stock: updated.in_stock } : p));
        showToast(`Stock status updated: ${updated.in_stock ? 'In Stock' : 'Out of Stock'}`);
      }
    } catch (err) {
      showToast(`Failed to toggle stock: ${err.message}`, 'error');
    }
  };

  // Laser Scan Simulator action
  const handleSimulateLaserScan = (product) => {
    setIsLaserScanning(true);
    // Play a gentle scanner beep via Web Audio API if available
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1750, audioCtx.currentTime); // 1.75kHz scanner beep
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch(e) {}

    setTimeout(() => {
      setIsLaserScanning(false);
      setScanResultToast(`✅ Barcode Scanned: SKU "${product.sku}" verified for ${product.supplier || 'Detroit Hub'}!`);
      setTimeout(() => setScanResultToast(null), 3500);
    }, 700);
  };

  const handleCopyBarcode = (sku, id) => {
    const code = getBarcodeNumber(sku, id).replace(/\s/g, '');
    navigator.clipboard.writeText(code);
    setCopiedBarcode(true);
    showToast(`UPC Barcode "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedBarcode(false), 2500);
  };

  const handlePrintLabel = () => {
    window.print();
  };

  // Filter products by category tab & search / barcode query
  const filteredProducts = products.filter(p => {
    // 1. Category Tab Filter
    if (selectedCategoryTab !== 'All') {
      const cat = (p.category || '').toLowerCase();
      const tab = selectedCategoryTab.toLowerCase();
      if (tab === 'holiday' && !cat.includes('holiday')) return false;
      if (tab === 'gifts' && !cat.includes('gift') && !cat.includes('home')) return false;
      if (tab === 'signs & banners' && !cat.includes('sign') && !cat.includes('banner')) return false;
      if (tab === 'marketing' && !cat.includes('marketing')) return false;
      if (tab === 'apparel' && !cat.includes('apparel')) return false;
      if (tab === 'accessories' && !cat.includes('access') && !cat.includes('pack')) return false;
      if (tab === 'wall art' && !cat.includes('wall')) return false;
    }

    // 2. Search / Barcode query
    if (!barcodeSearchQuery) return true;
    const q = barcodeSearchQuery.toLowerCase().trim();
    const barcodeNum = getBarcodeNumber(p.sku, p.id).replace(/\s/g, '');
    return (
      p.title.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      barcodeNum.includes(q)
    );
  });

  const isLight = storeTheme === 'light';

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 ${isLight ? 'admin-light-mode text-slate-900' : 'text-slate-100'}`}>
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold ${
          toast.type === 'error'
            ? 'bg-rose-950/90 text-rose-200 border-rose-500/40'
            : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4 text-rose-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl shadow-xl border ${
        isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-slate-900 border-slate-800 text-white'
      }`}>
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className={`text-xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Product Catalog & POD Inventory</h1>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${
                  isLight ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-indigo-950 text-indigo-300 border-indigo-500/30'
                }`}>
                  Barcode Enabled
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Manage products, pricing tiers, GS1/UPC barcodes, and domestic fulfillment hubs</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Refresh product list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={onSwitchToStore}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 transition shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View in Storefront</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Storefront Color Mode & Theme Manager Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/30">
            <Palette className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white">Storefront Color Theme:</h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                storeTheme === 'light'
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                  : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
              }`}>
                {storeTheme === 'light' ? '🌞 Clean Retail Light (Shopify/Everlane)' : '🌙 Midnight Dark Studio'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Controls whether public shoppers see the realistic light DTC look or dark cyberpunk aesthetic.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-stretch sm:self-auto bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => onToggleStoreTheme && onToggleStoreTheme('light')}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              storeTheme === 'light'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Light Mode</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleStoreTheme && onToggleStoreTheme('dark')}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              storeTheme === 'dark'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>Dark Mode</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <p className="text-xs font-medium text-slate-400">Total Products</p>
          <p className="text-2xl font-bold text-white mt-1">{products.length}</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <p className="text-xs font-medium text-slate-400">In Stock & Active</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{products.filter(p => p.in_stock).length}</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <p className="text-xs font-medium text-slate-400">POD Hubs Connected</p>
          <p className="text-2xl font-bold text-indigo-400 mt-1">4 Regions</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <p className="text-xs font-medium text-slate-400">Scannable Barcodes</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{products.length} Active</p>
        </div>
      </div>

      {/* Products Table with Barcode Search / Scan Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-sm text-white">Live Catalog Items</span>
            <span className="text-xs text-slate-400">
              ({filteredProducts.length} of {products.length} items)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Barcode / SKU Filter Input */}
            <div className="relative">
              <ScanBarcode className="w-3.5 h-3.5 text-indigo-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Scan barcode or type SKU..."
                value={barcodeSearchQuery}
                onChange={(e) => setBarcodeSearchQuery(e.target.value)}
                className="w-56 sm:w-64 bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-indigo-500"
              />
              {barcodeSearchQuery && (
                <button
                  onClick={() => setBarcodeSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Laser Scanner Demo */}
            {products.length > 0 && (
              <button
                onClick={() => setSelectedBarcodeProduct(products[0])}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-950/70 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 transition shadow-sm"
                title="Open Barcode & Label Center"
              >
                <Barcode className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Barcode Center</span>
              </button>
            )}
          </div>
        </div>

        {/* VistaPrint Category Tabs Filter */}
        <div className="px-6 py-2.5 bg-slate-950/40 border-b border-slate-800 flex items-center space-x-1.5 overflow-x-auto text-xs font-semibold">
          {[
            { key: 'All', label: 'All Products' },
            { key: 'Holiday', label: '🎄 Holiday & Christmas Cards' },
            { key: 'Gifts', label: '📅 Calendars & Gifts' },
            { key: 'Marketing', label: '💼 Business Cards & Print' },
            { key: 'Signs & Banners', label: '🪧 Signs & Banners' },
            { key: 'Apparel', label: '👕 Clothing & Apparel' },
            { key: 'Accessories', label: '🏷️ Labels & Stickers' },
            { key: 'Wall Art', label: '🖼️ Wall Art & Canvas' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategoryTab(tab.key)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategoryTab === tab.key
                  ? 'bg-indigo-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin text-indigo-500" />
            <p className="text-sm">Fetching product catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Box className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <p className="text-base font-semibold text-slate-300">
              {barcodeSearchQuery ? 'No products match your barcode/SKU scan' : 'No products found'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {barcodeSearchQuery ? 'Clear the search query to show all items.' : 'Click "Add New Product" to create your first POD listing.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Item & Mockup</th>
                  <th className="px-6 py-3.5">SKU & Barcode</th>
                  <th className="px-6 py-3.5">Base Price (USD)</th>
                  <th className="px-6 py-3.5">Market Prices (Est.)</th>
                  <th className="px-6 py-3.5">Supplier / Hub</th>
                  <th className="px-6 py-3.5">Availability</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((product) => {
                  const usd = product.base_price_usd;
                  const gbp = (usd * 0.79).toFixed(2);
                  const cad = (usd * 1.36).toFixed(2);
                  const barcodeNum = getBarcodeNumber(product.sku, product.id);

                  return (
                    <tr key={product.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image_url || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'}
                            alt={product.title}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-700 bg-slate-800 shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-white text-sm line-clamp-1">{product.title}</p>
                            <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{product.description || 'No description provided'}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-mono text-xs text-indigo-300 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-500/30">
                            {product.sku}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center space-x-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                            {product.category}
                          </span>
                          {/* Dedicated Barcode Pill */}
                          <button
                            onClick={() => setSelectedBarcodeProduct(product)}
                            className="flex items-center space-x-1 text-[10px] text-emerald-300 hover:text-white bg-emerald-950/50 hover:bg-emerald-600 px-2 py-0.5 rounded border border-emerald-500/30 transition font-mono font-medium"
                            title="Click to view & print Barcode Label"
                          >
                            <Barcode className="w-3 h-3 text-emerald-400" />
                            <span>Barcode: {barcodeNum.slice(0, 8)}...</span>
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-bold text-white text-sm">${usd.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-500 block">USD Base</span>
                      </td>

                      <td className="px-6 py-4 space-y-0.5">
                        <div className="text-[11px] text-slate-300">🇬🇧 £{gbp} GBP</div>
                        <div className="text-[11px] text-slate-300">🇨🇦 CA${cad} CAD</div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1.5 text-slate-300">
                          <Truck className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-xs">{product.supplier || 'Printify'}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStock(product)}
                          className="flex items-center space-x-1.5 text-xs font-medium cursor-pointer"
                        >
                          {product.in_stock ? (
                            <>
                              <ToggleRight className="w-6 h-6 text-emerald-400" />
                              <span className="text-emerald-300 font-semibold">Active</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="w-6 h-6 text-slate-500" />
                              <span className="text-slate-400 font-semibold">Inactive</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {/* Edit Product Action Button */}
                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="p-1.5 rounded-lg text-amber-300 hover:text-white bg-amber-950/50 hover:bg-amber-600 border border-amber-500/30 transition"
                            title="Edit Product Details & Customizations"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Barcode Action Button */}
                          <button
                            onClick={() => setSelectedBarcodeProduct(product)}
                            className="p-1.5 rounded-lg text-indigo-300 hover:text-white bg-indigo-950/50 hover:bg-indigo-600 border border-indigo-500/30 transition"
                            title="Generate & Print Barcode Label"
                          >
                            <Barcode className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(product)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 2. Interactive Barcode & Thermal Shipping Label Modal */}
      {selectedBarcodeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative my-8 space-y-5 text-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                  <Barcode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Product Barcode & Packing Label</h3>
                  <p className="text-[11px] text-slate-400">GS1 / UPC-A format for warehouse scanners & domestic dispatch</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBarcodeProduct(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated 4"x2.5" Thermal Label Box */}
            <div className="bg-white text-slate-950 p-6 rounded-2xl border-2 border-dashed border-slate-400 shadow-xl relative overflow-hidden select-all">
              {/* Optional Laser Scanning Red Line Animation */}
              {isLaserScanning && (
                <div className="absolute inset-0 bg-red-500/10 pointer-events-none z-20 flex flex-col justify-center">
                  <div className="w-full h-1 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)] animate-bounce"></div>
                  <div className="text-center font-mono text-[10px] text-red-600 font-bold bg-white/90 py-0.5 mt-2">
                    ⚡ OPTICAL LASER SCANNING IN PROGRESS...
                  </div>
                </div>
              )}

              {/* Label Header */}
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-2 mb-3">
                <div>
                  <div className="font-black text-sm tracking-tight text-slate-900">PRINTFLOW GLOBAL HUB</div>
                  <div className="text-[10px] text-slate-600 font-medium">Domestic Fulfillment & Tracking Slip</div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                    {selectedBarcodeProduct.supplier?.includes('UK') ? '🇬🇧 UK' : selectedBarcodeProduct.supplier?.includes('Canada') ? '🇨🇦 CA' : '🇺🇸 US'}
                  </span>
                </div>
              </div>

              {/* Item Details */}
              <div className="space-y-1 mb-4">
                <div className="font-extrabold text-base text-slate-900 leading-tight">
                  {selectedBarcodeProduct.title}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-700 font-mono">
                  <span>SKU: <strong className="text-slate-900">{selectedBarcodeProduct.sku}</strong></span>
                  <span>CAT: <strong className="text-slate-900">{selectedBarcodeProduct.category}</strong></span>
                </div>
              </div>

              {/* Vector Barcode Render */}
              <BarcodeSVG sku={selectedBarcodeProduct.sku} id={selectedBarcodeProduct.id} width={320} height={85} />

              {/* Label Footer */}
              <div className="mt-3 pt-2 border-t border-slate-300 flex items-center justify-between text-[11px] text-slate-600 font-mono">
                <div>Price: <strong className="text-slate-900">${selectedBarcodeProduct.base_price_usd.toFixed(2)} USD</strong></div>
                <div>Routing: <strong>{selectedBarcodeProduct.supplier || 'Detroit Hub'}</strong></div>
              </div>
            </div>

            {/* Scan Toast result */}
            {scanResultToast && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-pulse">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{scanResultToast}</span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleSimulateLaserScan(selectedBarcodeProduct)}
                disabled={isLaserScanning}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-600/30"
              >
                <ScanBarcode className="w-4 h-4 text-indigo-200" />
                <span>{isLaserScanning ? 'Scanning...' : 'Test Laser Scan'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopyBarcode(selectedBarcodeProduct.sku, selectedBarcodeProduct.id)}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                {copiedBarcode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedBarcode ? 'Copied!' : 'Copy Code'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintLabel}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Label</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Add Product Modal (with real-time Barcode preview) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative my-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Create New Print-on-Demand Product</h3>
                <p className="text-xs text-slate-400">Generates domestic supplier specs, multi-currency rates, and UPC barcode</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Presets */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Quick-Load Preset Templates:</label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_MOCKUPS.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left transition flex items-center space-x-2"
                  >
                    <img src={p.image} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0" />
                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate">{p.name}</div>
                      <div className="text-[10px] text-indigo-400 font-mono">${p.price.toFixed(2)} • {p.sku}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acid Wash Oversized Tee"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Holiday">Holiday & Christmas Cards</option>
                    <option value="Gifts">Calendars & Gifts</option>
                    <option value="Marketing">Business Cards & Print</option>
                    <option value="Signs & Banners">Signs, Banners & Posters</option>
                    <option value="Apparel">Clothing, Bags & Apparel</option>
                    <option value="Accessories">Labels, Stickers & Packaging</option>
                    <option value="Wall Art">Wall Art & Fine Canvas</option>
                    <option value="Home & Living">Home & Living Drinkware</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Base Price (USD) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-500 font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      required
                      value={formData.base_price_usd}
                      onChange={(e) => setFormData({ ...formData, base_price_usd: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-300 font-medium text-xs">SKU Code *</label>
                    <span 
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 font-normal cursor-help"
                      title="Stock Keeping Unit: unique alphanumeric ID for variants"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>SKU</span>
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TEE-CYBER-01"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Real-time Barcode Preview in Create Modal */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <Barcode className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">Auto-Assigned UPC Barcode:</span>
                  </div>
                  <span className="font-mono text-emerald-400 text-xs block mt-0.5">
                    {getBarcodeNumber(formData.sku || 'POD-SAMPLE', 1)}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 text-right max-w-[200px]">
                  Scannable by Detroit/London laser packing terminals upon print completion.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Fulfillment Supplier / Hub</label>
                  <input
                    type="text"
                    placeholder="e.g. Printify / Monster Digital"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Image / Mockup URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Product Description</label>
                <textarea
                  rows="2"
                  placeholder="Describe material, sizing specs, print technique, care instructions..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              {/* VistaPrint Substrate & Paper Stock Options Manager */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>VistaPrint Material & Finishing Specifications</span>
                  </span>
                  <span className="text-[10px] text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono">
                    POD Spec
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <label className="text-slate-400 block mb-1">Supported Paper Stocks:</label>
                    <div className="text-slate-300 font-mono bg-slate-900 px-2 py-1.5 rounded-lg border border-slate-800">
                      Standard Matte, Glossy, Uncoated 16pt, Linen, Foil
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Corner Profiles:</label>
                    <div className="text-slate-300 font-mono bg-slate-900 px-2 py-1.5 rounded-lg border border-slate-800">
                      Standard Rectangular, Rounded, Square
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Preview */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Calculated Storefront Prices:</span>
                <div className="flex items-center space-x-3 font-semibold text-white">
                  <span>🇺🇸 ${parseFloat(formData.base_price_usd || 0).toFixed(2)}</span>
                  <span>🇬🇧 £{(parseFloat(formData.base_price_usd || 0) * 0.79).toFixed(2)}</span>
                  <span>🇨🇦 CA${(parseFloat(formData.base_price_usd || 0) * 1.36).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex items-center space-x-1.5 px-5 py-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-lg shadow-indigo-600/30"
                >
                  {actionLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>Publish to Storefront</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Edit Product & Customization Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-6 shadow-2xl relative my-8 space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Edit Product #{editingProduct.id}</h3>
                  <p className="text-[11px] text-slate-400">Update pricing, description, stock status, and fulfillment partner</p>
                </div>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Holiday">Holiday & Christmas Cards</option>
                    <option value="Gifts">Calendars & Gifts</option>
                    <option value="Marketing">Business Cards & Print</option>
                    <option value="Signs & Banners">Signs, Banners & Posters</option>
                    <option value="Apparel">Clothing, Bags & Apparel</option>
                    <option value="Accessories">Labels, Stickers & Packaging</option>
                    <option value="Wall Art">Wall Art & Fine Canvas</option>
                    <option value="Home & Living">Home & Living Drinkware</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Base Price (USD) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-500 font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      required
                      value={editFormData.base_price_usd}
                      onChange={(e) => setEditFormData({ ...editFormData, base_price_usd: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.sku}
                    onChange={(e) => setEditFormData({ ...editFormData, sku: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Supplier / Fulfillment Hub</label>
                  <input
                    type="text"
                    value={editFormData.supplier}
                    onChange={(e) => setEditFormData({ ...editFormData, supplier: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Image / Mockup URL</label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={editFormData.image_url}
                      onChange={(e) => setEditFormData({ ...editFormData, image_url: e.target.value })}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                    {editFormData.image_url && (
                      <img src={editFormData.image_url} alt="" className="w-8 h-8 rounded-lg object-cover shrink-0 border border-slate-700" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Product Description</label>
                <textarea
                  rows="2"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              {/* In-Stock Toggle */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white">Storefront Stock Status</span>
                  <p className="text-[10px] text-slate-400">Controls whether customers can add this item to their cart</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditFormData({ ...editFormData, in_stock: !editFormData.in_stock })}
                  className="flex items-center space-x-1.5 text-xs font-bold"
                >
                  {editFormData.in_stock ? (
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <ToggleRight className="w-6 h-6" />
                      <span>In Stock & Active</span>
                    </span>
                  ) : (
                    <span className="text-slate-500 flex items-center space-x-1">
                      <ToggleLeft className="w-6 h-6" />
                      <span>Out of Stock</span>
                    </span>
                  )}
                </button>
              </div>

              {/* VistaPrint Substrate & Paper Stock Options Manager */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>VistaPrint Material & Finishing Specifications</span>
                  </span>
                  <span className="text-[10px] text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono">
                    POD Spec
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <label className="text-slate-400 block mb-1">Supported Paper Stocks:</label>
                    <div className="text-slate-300 font-mono bg-slate-900 px-2 py-1.5 rounded-lg border border-slate-800">
                      Standard Matte, Glossy, Uncoated 16pt, Linen, Foil
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Corner Profiles:</label>
                    <div className="text-slate-300 font-mono bg-slate-900 px-2 py-1.5 rounded-lg border border-slate-800">
                      Standard Rectangular, Rounded, Square
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Preview */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Converted Local Prices:</span>
                <div className="flex items-center space-x-3 font-semibold text-white">
                  <span>🇺🇸 ${parseFloat(editFormData.base_price_usd || 0).toFixed(2)}</span>
                  <span>🇬🇧 £{(parseFloat(editFormData.base_price_usd || 0) * 0.79).toFixed(2)}</span>
                  <span>🇨🇦 CA${(parseFloat(editFormData.base_price_usd || 0) * 1.36).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex items-center space-x-1.5 px-5 py-2 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-lg"
                >
                  {actionLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
