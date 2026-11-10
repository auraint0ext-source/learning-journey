import React, { useState, useRef, useId } from 'react';
import { 
  ArrowLeft, Check, CheckCircle2, ChevronRight, Download, Eye, FileText, 
  HelpCircle, Image as ImageIcon, Info, Layers, Maximize2, Minimize2, 
  Package, Palette, RefreshCw, RotateCcw, Share2, ShieldCheck, Sparkles, 
  Star, Truck, UploadCloud, X, ZoomIn, ZoomOut 
} from 'lucide-react';

// Preset sample artwork templates for instant 1-click preview
const SAMPLE_TEMPLATES = [
  {
    id: 'tpl-executive',
    name: 'Executive Minimalist',
    category: 'Corporate',
    preview: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    backPreview: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    tagline: 'Clean typography with high-contrast mono balance'
  },
  {
    id: 'tpl-luxury-gold',
    name: 'Gold Foil Luxe Monogram',
    category: 'Luxury',
    preview: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    backPreview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tagline: 'Metallic embossed accents on midnight charcoal'
  },
  {
    id: 'tpl-creative-studio',
    name: 'Studio Bauhaus Geometry',
    category: 'Creative',
    preview: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
    backPreview: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    tagline: 'Bold color blocking tailored for agency portfolios'
  },
  {
    id: 'tpl-artisan-botanical',
    name: 'Artisan Botanical Craft',
    category: 'Artisan',
    preview: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    backPreview: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    tagline: 'Earthy organic greenery with delicate serif script'
  }
];

// Technical specifications matrix (mirroring MOO Original Business Cards)
const SPECS_MATRIX = [
  { label: 'Paper Weight', original: '130lb Cover (350 gsm)', super: '150lb Cover (400 gsm)', luxe: '220lb Cover (600 gsm)', cotton: '110lb Cover (298 gsm)' },
  { label: 'Thickness / Caliper', original: '16pt (approx 0.4 mm)', super: '19pt (approx 0.48 mm)', luxe: '32pt (approx 0.8 mm)', cotton: '18pt (approx 0.45 mm)' },
  { label: 'Surface Finish', original: 'Silky Coated (Matte / Gloss)', super: 'Soft-Touch Velvet', luxe: 'Uncoated Mohawk Superfine', cotton: 'Tactile Woven Texture' },
  { label: 'Printfinity™ Support', original: 'Yes (Up to 50 designs)', super: 'Yes (Up to 50 designs)', luxe: 'Yes (Up to 50 designs)', cotton: 'Yes (Up to 50 designs)' },
  { label: 'Eco Credentials', original: 'FSC® Certified, ECF chlorine-free', super: 'FSC® Certified paperboard', luxe: 'FSC® Certified Mohawk Mill', cotton: '100% Recycled T-Shirt Offcuts' },
  { label: 'Best For', original: 'Everyday high-impact networking', super: 'Premium tech & design brands', luxe: 'Executive C-Suite & architects', cotton: 'Sustainable boutiques & artisans' }
];

export default function ProductDetailSubpage({
  product,
  onClose,
  onAddToCart,
  currentMarket = 'US',
  marketInfo = { currency_symbol: '$', exchange_rate_to_usd: 1.0 },
  storeTheme = 'light',
  onSelectOtherProduct,
  allProducts = []
}) {
  const isLight = storeTheme === 'light';
  const frontInputId = useId();
  const backInputId = useId();

  // 1. Configurator States
  const [selectedStock, setSelectedStock] = useState('original'); // 'original' | 'super' | 'luxe' | 'cotton'
  const [selectedFinish, setSelectedFinish] = useState('matte'); // 'matte' | 'gloss' | 'softtouch'
  const [selectedCorner, setSelectedCorner] = useState('square'); // 'square' | 'rounded'
  const [selectedSize, setSelectedSize] = useState('standard'); // 'standard' (2x3.5) | 'moo' (2.16x3.3) | 'square' (2.56x2.56)
  const [selectedQuantity, setSelectedQuantity] = useState(100);

  // 2. Visualizer View Angle & Guides
  const [activeView, setActiveView] = useState('front'); // 'front' | 'back' | 'perspective' | 'lifestyle' | 'texture'
  const [showBleedGuide, setShowBleedGuide] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  // 3. Upload & Custom Artwork States
  const [activeUploadTab, setActiveUploadTab] = useState('front'); // 'front' | 'back'
  const [uploadedFrontArtwork, setUploadedFrontArtwork] = useState(null);
  const [uploadedBackArtwork, setUploadedBackArtwork] = useState(null);
  const [isPrintfinityActive, setIsPrintfinityActive] = useState(false);
  const [printfinityBacks, setPrintfinityBacks] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [artworkScale, setArtworkScale] = useState(100);
  const [artworkPosition, setArtworkPosition] = useState({ x: 0, y: 0 });
  const [preflightApproved, setPreflightApproved] = useState(true);

  // 4. Tab Navigation below the fold
  const [activeDetailTab, setActiveDetailTab] = useState('overview'); // 'overview' | 'specs' | 'guidelines' | 'reviews' | 'samplepack'
  const [addedToastVisible, setAddedToastVisible] = useState(false);

  // Currency helper
  const formatPrice = (usd) => {
    const rate = marketInfo.exchange_rate_to_usd || 1.0;
    const sym = marketInfo.currency_symbol || '$';
    return `${sym}${(usd * rate).toFixed(2)}`;
  };

  // Stock options metadata
  const STOCK_OPTIONS = [
    {
      id: 'original',
      name: 'Original 16pt',
      weight: '350 gsm (130lb Cover)',
      tag: 'Classic Standard',
      priceModifierUsd: 0,
      description: 'Responsibly sourced, FSC® certified coated paper. Sturdy, balanced, and vibrant.'
    },
    {
      id: 'super',
      name: 'Super 19pt',
      weight: '400 gsm (150lb Cover)',
      tag: 'Soft-Touch Velvet',
      priceModifierUsd: 6.0,
      description: 'Extra-thick cardstock with a velvety tactile lamination that resists scuffs and creases.'
    },
    {
      id: 'luxe',
      name: 'Luxe 32pt',
      weight: '600 gsm (220lb Cover)',
      tag: 'Quadruple Thick',
      priceModifierUsd: 14.0,
      description: 'Ultra-heavyweight Mohawk Superfine paper with a rich colored seam in the middle.'
    },
    {
      id: 'cotton',
      name: 'Cotton 18pt',
      weight: '298 gsm (110lb Cover)',
      tag: '100% Recycled Fabric',
      priceModifierUsd: 8.0,
      description: 'Made from repurposed cotton T-shirt offcuts. Crisp, natural, and pleasantly textured.'
    }
  ];

  // Finish options metadata
  const FINISH_OPTIONS = [
    {
      id: 'matte',
      name: 'Matte Finish',
      tag: 'Free',
      description: 'Smooth, glare-free, and easy to write on with most pens.',
      priceModifierUsd: 0
    },
    {
      id: 'gloss',
      name: 'Gloss Finish',
      tag: 'Free',
      description: 'High-shine UV protective glaze that amplifies contrast and deep colors.',
      priceModifierUsd: 0
    },
    {
      id: 'softtouch',
      name: 'Soft Touch Velvet',
      tag: '+$4.00',
      description: 'Suede-like tactile finish that feels velvety in the hand.',
      priceModifierUsd: 4.0
    }
  ];

  // Size options metadata
  const SIZE_OPTIONS = [
    {
      id: 'standard',
      name: 'Standard US Size',
      dimensions: '2.0" x 3.5" (51 x 89 mm)',
      ratioClass: 'aspect-[3.5/2.0]',
      desc: 'Fits all standard American wallets and card holders.'
    },
    {
      id: 'moo',
      name: 'MOO Classic Size',
      dimensions: '2.16" x 3.3" (55 x 84 mm)',
      ratioClass: 'aspect-[3.3/2.16]',
      desc: 'European standard dimension for an elegant, streamlined silhouette.'
    },
    {
      id: 'square',
      name: 'Square Format',
      dimensions: '2.56" x 2.56" (65 x 65 mm)',
      ratioClass: 'aspect-square',
      desc: 'Distinctive Instagram-style square format that immediately stands out.'
    }
  ];

  // Quantity tiers with volume pricing
  const QUANTITY_TIERS = [
    { qty: 50, baseUsd: 23.99, unitUsd: 0.48, badge: '' },
    { qty: 100, baseUsd: 39.99, unitUsd: 0.40, badge: 'Most Popular' },
    { qty: 200, baseUsd: 72.00, unitUsd: 0.36, badge: 'Save 25%' },
    { qty: 400, baseUsd: 128.00, unitUsd: 0.32, badge: 'Save 33%' },
    { qty: 1000, baseUsd: 250.00, unitUsd: 0.25, badge: 'Best Value (-48%)' }
  ];

  // Calculate pricing breakdown
  const currentTier = QUANTITY_TIERS.find(t => t.qty === selectedQuantity) || QUANTITY_TIERS[1];
  const stockOption = STOCK_OPTIONS.find(s => s.id === selectedStock) || STOCK_OPTIONS[0];
  const finishOption = FINISH_OPTIONS.find(f => f.id === selectedFinish) || FINISH_OPTIONS[0];
  const cornerExtraUsd = selectedCorner === 'rounded' ? 3.0 : 0;

  const totalCalculatedUsd = currentTier.baseUsd + stockOption.priceModifierUsd + finishOption.priceModifierUsd + cornerExtraUsd;
  const unitCalculatedUsd = totalCalculatedUsd / selectedQuantity;

  // File Upload Handlers
  const handleFrontFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedFrontArtwork({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        previewUrl: url,
        dpi: '300 DPI (High-Definition Print Ready)'
      });
      setSelectedTemplate(null);
    }
  };

  const handleBackFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      if (isPrintfinityActive) {
        const newBacks = files.map(f => ({
          name: f.name,
          url: URL.createObjectURL(f),
          size: (f.size / 1024).toFixed(1) + ' KB'
        }));
        setPrintfinityBacks(prev => [...prev, ...newBacks].slice(0, 5));
      } else {
        const file = files[0];
        setUploadedBackArtwork({
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          previewUrl: URL.createObjectURL(file),
          dpi: '300 DPI (High-Definition Print Ready)'
        });
      }
    }
  };

  // Add to Cart handler
  const handleFinalOrder = () => {
    const customConfig = {
      product,
      paperStock: stockOption.name,
      finish: finishOption.name,
      corner: selectedCorner === 'rounded' ? 'Rounded Corners (1/4" Radius)' : 'Square Corners',
      size: SIZE_OPTIONS.find(s => s.id === selectedSize)?.dimensions || '2.0" x 3.5"',
      quantity: selectedQuantity,
      unitPriceUsd: unitCalculatedUsd,
      totalPriceUsd: totalCalculatedUsd,
      frontArtwork: uploadedFrontArtwork || (selectedTemplate ? { name: selectedTemplate.name, previewUrl: selectedTemplate.preview } : null),
      backArtwork: isPrintfinityActive ? { type: 'Printfinity', count: printfinityBacks.length, list: printfinityBacks } : uploadedBackArtwork,
      preflightApproved
    };

    if (onAddToCart) {
      onAddToCart(
        product,
        customConfig.size,
        'Standard Color',
        selectedQuantity,
        customConfig.finish,
        customConfig.paperStock,
        customConfig.corner,
        selectedTemplate,
        customConfig.frontArtwork
      );
    }

    setAddedToastVisible(true);
    setTimeout(() => setAddedToastVisible(false), 4000);
  };

  // Current visualizer preview image
  const sizeObj = SIZE_OPTIONS.find(s => s.id === selectedSize) || SIZE_OPTIONS[0];
  const isBackView = activeView === 'back';
  
  let currentCardImage = product?.image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80';
  if (isBackView) {
    if (uploadedBackArtwork?.previewUrl) {
      currentCardImage = uploadedBackArtwork.previewUrl;
    } else if (isPrintfinityActive && printfinityBacks.length > 0) {
      currentCardImage = printfinityBacks[0].url;
    } else if (selectedTemplate?.backPreview) {
      currentCardImage = selectedTemplate.backPreview;
    } else {
      currentCardImage = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80';
    }
  } else {
    if (uploadedFrontArtwork?.previewUrl) {
      currentCardImage = uploadedFrontArtwork.previewUrl;
    } else if (selectedTemplate?.preview) {
      currentCardImage = selectedTemplate.preview;
    }
  }

  // Lifestyle and texture preview images
  const lifestyleImage = 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80';
  const textureImage = 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      
      {/* 1. MOO Sticky Subpage Header & Navigation Bar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md px-4 sm:px-6 py-3 transition-colors ${
        isLight ? 'bg-white/95 border-slate-200/80 shadow-xs' : 'bg-slate-900/95 border-slate-800 shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Breadcrumb & Back Action */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                isLight 
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="Return to Main Storefront Catalog"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Back to Storefront</span>
            </button>

            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400">
              <span className="hover:underline cursor-pointer" onClick={onClose}>Storefront</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">{product?.category || 'Business Cards'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-bold text-emerald-600 dark:text-emerald-400 truncate max-w-xs">
                {product?.title || 'Original Business Cards'}
              </span>
            </div>
          </div>

          {/* Trust Guarantees on Top Right */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <span className="hidden md:flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Satisfaction Reprint Promise</span>
            </span>
            <span className="hidden lg:flex items-center space-x-1.5">
              <Truck className="w-4 h-4 text-indigo-500" />
              <span>Fast Domestic Shipping</span>
            </span>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-xl transition ${
                isLight ? 'hover:bg-slate-100 text-slate-400 hover:text-slate-800' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Subpage Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
        
        {/* TOP HERO SECTION: Interactive Visualizer (Left) + MOO Configurator (Right) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN: Visualizer Stage & Live Mockups (7 Cols) ================= */}
          <div className="lg:col-span-7 flex flex-col space-y-4 sticky top-20">
            
            {/* Visualizer Frame */}
            <div className={`relative rounded-3xl p-6 sm:p-10 border overflow-hidden flex flex-col items-center justify-center transition-all min-h-[420px] sm:min-h-[500px] ${
              isLight 
                ? 'bg-gradient-to-b from-slate-100/90 to-slate-200/60 border-slate-200/90 shadow-inner' 
                : 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 shadow-2xl'
            }`}>
              
              {/* Corner & Finish Indicator Chips (Top Left of Stage) */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border backdrop-blur-md ${
                  isLight ? 'bg-white/90 text-slate-700 border-slate-200' : 'bg-slate-900/90 text-slate-300 border-slate-700'
                }`}>
                  {selectedCorner === 'rounded' ? 'Rounded 1/4" Corners' : 'Square Cut Corners'}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border backdrop-blur-md ${
                  finishOption.id === 'gloss' 
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                    : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                }`}>
                  {finishOption.name}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border backdrop-blur-md ${
                  isLight ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                }`}>
                  {stockOption.name}
                </span>
              </div>

              {/* Bleed Guide Toggle (Top Right of Stage) */}
              <div className="absolute top-4 right-4 z-20">
                <button
                  type="button"
                  onClick={() => setShowBleedGuide(!showBleedGuide)}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-bold transition border backdrop-blur-md ${
                    showBleedGuide
                      ? 'bg-rose-500 text-white border-rose-600 shadow-md'
                      : isLight
                        ? 'bg-white/90 text-slate-600 border-slate-200 hover:bg-slate-100'
                        : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                  title="Toggle 0.125-inch print bleed, trim line, and safe zone guidelines"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{showBleedGuide ? 'Guides: ON' : 'Show Bleed Guides'}</span>
                </button>
              </div>

              {/* CARD MOCKUP DISPLAY CANVAS */}
              <div 
                className="relative flex items-center justify-center transition-all duration-300 w-full max-w-[480px]"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                {/* 1. Perspective Angle Mode */}
                {activeView === 'perspective' && (
                  <div className="relative transform perspective-1000 -rotate-y-12 rotate-x-6 hover:rotate-y-0 transition-transform duration-700">
                    <div className={`relative ${sizeObj.ratioClass} w-72 sm:w-80 shadow-2xl overflow-hidden border ${
                      selectedCorner === 'rounded' ? 'rounded-2xl' : 'rounded-none'
                    } ${isLight ? 'border-slate-300 bg-white' : 'border-slate-700 bg-slate-900'}`}>
                      <img 
                        src={currentCardImage} 
                        alt="3D Perspective" 
                        className="w-full h-full object-cover"
                      />
                      {/* Physical Card Thickness Edge simulation */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 opacity-80" />
                    </div>
                  </div>
                )}

                {/* 2. Lifestyle Mode */}
                {activeView === 'lifestyle' && (
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                    <img 
                      src={lifestyleImage} 
                      alt="Desk Lifestyle Mockup" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/70 text-white text-[11px] font-semibold backdrop-blur-xs">
                      Natural Office Light • True Scale
                    </div>
                  </div>
                )}

                {/* 3. Paper Grain & Texture Macro Mode */}
                {activeView === 'texture' && (
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                    <img 
                      src={textureImage} 
                      alt="Paper Fiber Macro Texture" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/70 text-white text-[11px] font-mono backdrop-blur-xs space-y-0.5">
                      <div className="font-bold text-emerald-400">{stockOption.name} Surface Detail</div>
                      <div className="text-[10px] text-slate-300">350 gsm FSC® unbent cotton & pulp fibers</div>
                    </div>
                  </div>
                )}

                {/* 4. Standard Front or Back Flat Direct Preview */}
                {(activeView === 'front' || activeView === 'back') && (
                  <div 
                    className={`relative ${sizeObj.ratioClass} w-72 sm:w-96 shadow-2xl transition-all duration-300 overflow-hidden border ${
                      selectedCorner === 'rounded' ? 'rounded-2xl' : 'rounded-none'
                    } ${
                      isLight 
                        ? 'border-slate-300 bg-white ring-1 ring-black/5' 
                        : 'border-slate-700 bg-slate-900 ring-1 ring-white/10'
                    }`}
                  >
                    {/* The Card Face Image */}
                    <img 
                      src={currentCardImage} 
                      alt={activeView === 'front' ? 'Card Front' : 'Card Back'} 
                      className="w-full h-full object-cover transition-opacity duration-300 select-none"
                    />

                    {/* Gloss Sheen Reflection Specular Overlay */}
                    {finishOption.id === 'gloss' && (
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/25 to-white/40 mix-blend-overlay" />
                    )}

                    {/* Soft Touch Velvet Subtle Matte Texture Overlay */}
                    {finishOption.id === 'softtouch' && (
                      <div className="absolute inset-0 pointer-events-none bg-black/5 mix-blend-multiply" />
                    )}

                    {/* Bleed & Safe Area Overlay (Professional MOO / Print Shop Guidelines) */}
                    {showBleedGuide && (
                      <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
                        {/* Outer Bleed Boundary (Red Dashed) */}
                        <div className="absolute inset-0.5 border-2 border-dashed border-rose-500/80">
                          <span className="absolute top-1 left-1.5 text-[8px] font-mono font-bold text-rose-500 bg-rose-500/10 px-1 rounded">
                            BLEED ZONE (0.125")
                          </span>
                        </div>
                        {/* Cut / Trim Line (Solid Black/White) */}
                        <div className="absolute inset-2 border border-slate-900/60 dark:border-white/60">
                          <span className="absolute bottom-1 left-2 text-[8px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-black/10 dark:bg-white/10 px-1 rounded">
                            CUT TRIM LINE
                          </span>
                        </div>
                        {/* Inner Safe Print Area (Green Dashed) */}
                        <div className="absolute inset-4 border border-dashed border-emerald-500/80">
                          <span className="absolute bottom-1 right-2 text-[8px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1 rounded">
                            SAFE PRINT AREA
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Live Upload Attached Indicator */}
                    {((activeView === 'front' && uploadedFrontArtwork) || (activeView === 'back' && (uploadedBackArtwork || printfinityBacks.length > 0))) && (
                      <div className="absolute bottom-2 left-2 z-20 px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-[9px] font-bold flex items-center space-x-1 shadow-md backdrop-blur-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Custom Artwork Active</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Zoom & View Controls Bar (Bottom of Stage) */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-20">
                {/* View Switchers */}
                <div className={`flex items-center space-x-1 p-1 rounded-2xl border backdrop-blur-md ${
                  isLight ? 'bg-white/90 border-slate-200' : 'bg-slate-900/90 border-slate-800'
                }`}>
                  {[
                    { id: 'front', label: 'Front' },
                    { id: 'back', label: 'Back' },
                    { id: 'perspective', label: '3D Angle' },
                    { id: 'lifestyle', label: 'Desk View' },
                    { id: 'texture', label: 'Macro' }
                  ].map(v => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActiveView(v.id)}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition ${
                        activeView === v.id
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : isLight 
                            ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>

                {/* Interactive Zoom Controls */}
                <div className={`hidden sm:flex items-center space-x-1 p-1 rounded-2xl border backdrop-blur-md ${
                  isLight ? 'bg-white/90 border-slate-200' : 'bg-slate-900/90 border-slate-800'
                }`}>
                  <button 
                    onClick={() => setZoomLevel(Math.max(70, zoomLevel - 15))}
                    className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono font-bold px-1.5 text-slate-500">{zoomLevel}%</span>
                  <button 
                    onClick={() => setZoomLevel(Math.min(130, zoomLevel + 15))}
                    className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setZoomLevel(100)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* ARTWORK UPLOAD & PREFLIGHT STUDIO CARD */}
            <div className={`p-5 rounded-3xl border transition space-y-4 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
            }`}>
              {/* Studio Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <UploadCloud className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider">Photo & Artwork Studio</h4>
                    <p className="text-[10px] text-slate-400">Upload your designs or select from curated layout templates</p>
                  </div>
                </div>

                {/* Preflight Badge */}
                <div className="flex items-center space-x-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>300 DPI Preflight Ready</span>
                </div>
              </div>

              {/* Front vs Back Sub-tab Switcher */}
              <div className="flex border-b border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => { setActiveUploadTab('front'); setActiveView('front'); }}
                  className={`pb-2 px-4 text-xs font-bold border-b-2 transition ${
                    activeUploadTab === 'front'
                      ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  Front Design {uploadedFrontArtwork && '✓'}
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveUploadTab('back'); setActiveView('back'); }}
                  className={`pb-2 px-4 text-xs font-bold border-b-2 transition ${
                    activeUploadTab === 'back'
                      ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  Back Design {isPrintfinityActive ? `(Printfinity: ${printfinityBacks.length})` : (uploadedBackArtwork && '✓')}
                </button>
              </div>

              {/* TAB 1: FRONT DESIGN UPLOADER */}
              {activeUploadTab === 'front' && (
                <div className="space-y-3">
                  <div className={`border-2 border-dashed rounded-2xl p-4 text-center transition flex flex-col items-center justify-center relative cursor-pointer ${
                    uploadedFrontArtwork 
                      ? 'border-emerald-500 bg-emerald-500/5' 
                      : isLight 
                        ? 'border-slate-300 hover:border-emerald-500 bg-slate-50' 
                        : 'border-slate-700 hover:border-emerald-500 bg-slate-950'
                  }`}>
                    <input 
                      type="file" 
                      id={frontInputId}
                      accept="image/png, image/jpeg, image/svg+xml, application/pdf"
                      onChange={handleFrontFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <UploadCloud className="w-7 h-7 text-emerald-500 mb-1.5" />
                    <div className="text-xs font-bold">
                      {uploadedFrontArtwork ? uploadedFrontArtwork.name : 'Click or Drag & Drop Front Artwork'}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Accepts PNG, JPG, SVG, Vector PDF (300 DPI recommended for optimal sharpness)
                    </div>
                  </div>

                  {/* Sample Templates Gallery (Instant 1-Click Preview) */}
                  <div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Or select a designer starter template:
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {SAMPLE_TEMPLATES.map(tpl => {
                        const isChosen = selectedTemplate?.id === tpl.id;
                        return (
                          <button
                            key={tpl.id}
                            type="button"
                            onClick={() => {
                              setSelectedTemplate(tpl);
                              setUploadedFrontArtwork(null);
                              setActiveView('front');
                            }}
                            className={`p-2 rounded-xl border text-left transition ${
                              isChosen
                                ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/30'
                                : isLight 
                                  ? 'border-slate-200 bg-slate-50 hover:bg-slate-100' 
                                  : 'border-slate-800 bg-slate-950 hover:bg-slate-800'
                            }`}
                          >
                            <img src={tpl.preview} alt={tpl.name} className="w-full h-12 object-cover rounded-lg mb-1" />
                            <div className="text-[10px] font-bold truncate">{tpl.name}</div>
                            <div className="text-[8px] text-slate-400 truncate">{tpl.category}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: BACK DESIGN UPLOADER (PRINTFINITY™ ENABLED) */}
              {activeUploadTab === 'back' && (
                <div className="space-y-3">
                  {/* Printfinity Toggle Banner */}
                  <div className={`p-3 rounded-2xl border flex items-center justify-between ${
                    isPrintfinityActive 
                      ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-900 dark:text-indigo-200' 
                      : isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                  }`}>
                    <div>
                      <div className="flex items-center space-x-1.5 text-xs font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        <span>MOO Printfinity™ Technology</span>
                        <span className="text-[9px] font-extrabold uppercase bg-emerald-500 text-white px-1.5 py-0.2 rounded-full">Free</span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Print a different artwork, photo, or portfolio piece on the back of each card in your pack!
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsPrintfinityActive(!isPrintfinityActive)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                        isPrintfinityActive
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : isLight 
                            ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100' 
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      {isPrintfinityActive ? 'Printfinity: Active' : 'Enable Printfinity'}
                    </button>
                  </div>

                  {/* Back Upload Dropzone */}
                  <div className={`border-2 border-dashed rounded-2xl p-4 text-center transition flex flex-col items-center justify-center relative cursor-pointer ${
                    (uploadedBackArtwork || printfinityBacks.length > 0)
                      ? 'border-indigo-500 bg-indigo-500/5' 
                      : isLight 
                        ? 'border-slate-300 hover:border-indigo-500 bg-slate-50' 
                        : 'border-slate-700 hover:border-indigo-500 bg-slate-950'
                  }`}>
                    <input 
                      type="file" 
                      id={backInputId}
                      multiple={isPrintfinityActive}
                      accept="image/png, image/jpeg, image/svg+xml, application/pdf"
                      onChange={handleBackFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <UploadCloud className="w-7 h-7 text-indigo-500 mb-1.5" />
                    <div className="text-xs font-bold">
                      {isPrintfinityActive 
                        ? `Upload Up to 5 Back Photos (Selected: ${printfinityBacks.length})` 
                        : (uploadedBackArtwork ? uploadedBackArtwork.name : 'Upload Single Back Design')}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      High-resolution back files automatically aligned to safe bleed tolerances
                    </div>
                  </div>

                  {/* Printfinity Uploaded Thumbnails Strip */}
                  {isPrintfinityActive && printfinityBacks.length > 0 && (
                    <div className="flex items-center space-x-2 overflow-x-auto py-1">
                      {printfinityBacks.map((bk, i) => (
                        <div key={i} className="relative w-16 h-12 rounded-lg overflow-hidden border border-indigo-500/50 shrink-0">
                          <img src={bk.url} alt={bk.name} className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 right-0 px-1 text-[8px] bg-black/70 text-white font-mono">#{i + 1}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: MOO Specifications & Configurator (5 Cols) ================= */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* 1. Product Title, Rating & Tagline */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  MOO Flagship Series
                </span>
                <span className="text-[10px] font-bold text-amber-500 flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>4.9 / 5.0 (4,820+ verified reviews)</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                {product?.title || 'Original Business Cards'}
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Thick, durable, and designed to impress. Crafted on FSC® certified paper with a smooth, uniform surface that makes rich photography and bold colors stand out.
              </p>

              {/* Live Price Header */}
              <div className="flex items-baseline space-x-3 pt-2">
                <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {formatPrice(totalCalculatedUsd)}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ({formatPrice(unitCalculatedUsd)} / card)
                </span>
                {currentTier.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    {currentTier.badge}
                  </span>
                )}
              </div>
            </div>

            <hr className={isLight ? 'border-slate-200' : 'border-slate-800'} />

            {/* 2. Step 1: Paper Stock & Substrate Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  1. Paper Stock & Weight
                </label>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {stockOption.weight}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STOCK_OPTIONS.map(stock => {
                  const isSelected = selectedStock === stock.id;
                  return (
                    <button
                      key={stock.id}
                      type="button"
                      onClick={() => setSelectedStock(stock.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-500/10 ring-2 ring-emerald-500/30'
                          : isLight 
                            ? 'border-slate-200 bg-white hover:bg-slate-50' 
                            : 'border-slate-800 bg-slate-900 hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-xs">{stock.name}</span>
                        {stock.priceModifierUsd > 0 ? (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            +{formatPrice(stock.priceModifierUsd)}
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-slate-400">Included</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mb-1">{stock.weight}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        {stock.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Step 2: Surface Finish (Matte vs Gloss vs Soft-Touch) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  2. Protective Surface Finish
                </label>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {finishOption.name}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {FINISH_OPTIONS.map(fin => {
                  const isSelected = selectedFinish === fin.id;
                  return (
                    <button
                      key={fin.id}
                      type="button"
                      onClick={() => setSelectedFinish(fin.id)}
                      className={`p-2.5 rounded-2xl border text-center transition ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-500/10 ring-2 ring-emerald-500/30'
                          : isLight 
                            ? 'border-slate-200 bg-white hover:bg-slate-50' 
                            : 'border-slate-800 bg-slate-900 hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-black truncate">{fin.name}</div>
                      <div className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{fin.tag}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Step 3: Corner Cut (Square vs Rounded) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  3. Corner Cut & Edges
                </label>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {selectedCorner === 'rounded' ? 'Rounded (+ $3.00)' : 'Square Cut (Standard)'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'square', title: 'Square Corners', desc: 'Crisp, traditional, clean 90° edges', extra: 'Included' },
                  { id: 'rounded', title: 'Rounded Corners', desc: 'Smooth 1/4" radius that will not bend in pockets', extra: '+$3.00' }
                ].map(corn => {
                  const isSelected = selectedCorner === corn.id;
                  return (
                    <button
                      key={corn.id}
                      type="button"
                      onClick={() => setSelectedCorner(corn.id)}
                      className={`p-3 rounded-2xl border text-left transition ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-500/10 ring-2 ring-emerald-500/30'
                          : isLight 
                            ? 'border-slate-200 bg-white hover:bg-slate-50' 
                            : 'border-slate-800 bg-slate-900 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{corn.title}</span>
                        <span className="text-[10px] font-mono font-bold text-slate-400">{corn.extra}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{corn.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Step 4: Size & Dimensions */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  4. Card Size & Format
                </label>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {sizeObj.dimensions}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {SIZE_OPTIONS.map(sz => {
                  const isSelected = selectedSize === sz.id;
                  return (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => setSelectedSize(sz.id)}
                      className={`p-2.5 rounded-2xl border text-center transition ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-500/10 ring-2 ring-emerald-500/30'
                          : isLight 
                            ? 'border-slate-200 bg-white hover:bg-slate-50' 
                            : 'border-slate-800 bg-slate-900 hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-bold leading-tight">{sz.name}</div>
                      <div className="text-[9px] text-slate-400 font-mono mt-0.5 truncate">{sz.dimensions}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Step 5: Quantity & Dynamic Volume Pricing Tiers */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  5. Quantity & Bulk Volume Savings
                </label>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  Order more = lower price per card
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {QUANTITY_TIERS.map(tier => {
                  const isSelected = selectedQuantity === tier.qty;
                  return (
                    <button
                      key={tier.qty}
                      type="button"
                      onClick={() => setSelectedQuantity(tier.qty)}
                      className={`p-2 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                          : isLight 
                            ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50' 
                            : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-black">{tier.qty}</div>
                      <div className={`text-[9px] font-mono mt-0.5 ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                        {formatPrice(tier.baseUsd)}
                      </div>
                      <div className={`text-[8px] font-bold mt-0.5 truncate ${
                        isSelected ? 'text-emerald-200' : 'text-emerald-500'
                      }`}>
                        {tier.badge || `${formatPrice(tier.unitUsd)} ea`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Proof Approval Confirmation */}
            <div className="pt-2">
              <label className="flex items-start space-x-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={preflightApproved}
                  onChange={(e) => setPreflightApproved(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  I approve the print configuration and understand that MOO guarantees 100% reprint or refund if quality falls short.
                </span>
              </label>
            </div>

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleFinalOrder}
                className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm tracking-wide shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
              >
                <Package className="w-5 h-5" />
                <span>Add {selectedQuantity} Cards to Cart • {formatPrice(totalCalculatedUsd)}</span>
              </button>
            </div>

            {/* Guarantee Reassurance Card */}
            <div className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
              isLight ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950' : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
            }`}>
              <div className="flex items-center space-x-2 font-bold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>The MOO Quality Promise</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                If the paper weight, alignment, or colors aren't exactly as you envisioned, we will reprint your order for free or give you a full refund.
              </p>
            </div>
          </div>
        </section>

        {/* ================= LOWER FOLD: IN-DEPTH TECHNICAL TABS (MOO SPECIFICATIONS) ================= */}
        <section className={`rounded-3xl border overflow-hidden mt-12 transition ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
        }`}>
          {/* Tab Navigation Header */}
          <div className={`flex border-b overflow-x-auto ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
          }`}>
            {[
              { id: 'overview', label: 'Overview & Highlights', icon: Sparkles },
              { id: 'specs', label: 'Paper & Technical Specs', icon: FileText },
              { id: 'guidelines', label: 'Design & Bleed Guidelines', icon: Layers },
              { id: 'reviews', label: 'Verified Reviews (4.9★)', icon: Star },
              { id: 'samplepack', label: 'Order Free Sample Pack', icon: Package }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeDetailTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveDetailTab(tab.id)}
                  className={`flex items-center space-x-2 px-5 py-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition ${
                    isActive
                      ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900'
                      : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8">
            {/* TAB 1: OVERVIEW & HIGHLIGHTS */}
            {activeDetailTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-black tracking-tight mb-2">What makes MOO Original Business Cards extraordinary?</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
                    Unlike standard office cards that feel flimsy and bend immediately, our Original cards are crafted on heavy 16pt / 350 gsm paperboard. Every batch is calibrated using industry-leading HP Indigo digital offset presses for photographic crispness.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: 'FSC® Certified Sustainability',
                      desc: 'Paper harvested from responsibly managed forests using ECF elemental chlorine-free processes.',
                      icon: '🌿'
                    },
                    {
                      title: 'Unbendable 16pt Thickness',
                      desc: 'Feels weighty and substantial in hand. Passes the handshake test with immediate confidence.',
                      icon: '💎'
                    },
                    {
                      title: 'Printfinity™ Included Free',
                      desc: 'Print up to 50 different designs, photos, or portfolio items on the back of every card in your pack.',
                      icon: '🎨'
                    },
                    {
                      title: 'HP Indigo 12000 Printing',
                      desc: 'Ultra-fine micro-dot resolution reproduces tiny typography and complex gradients with zero pixelation.',
                      icon: '⚡'
                    }
                  ].map((feat, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <div className="text-2xl mb-2">{feat.icon}</div>
                      <h4 className="text-xs font-bold mb-1">{feat.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: TECHNICAL PAPER & SPECS TABLE */}
            {activeDetailTab === 'specs' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black">Paper Stock Comparison & Technical Caliper Matrix</h3>
                  <span className="text-[11px] font-mono text-slate-400">ISO 536 / TAPPI T410 Standards</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className={`border-b ${isLight ? 'border-slate-200 bg-slate-50' : 'border-slate-800 bg-slate-950'}`}>
                        <th className="py-3 px-4 font-black">Property</th>
                        <th className="py-3 px-4 font-black text-emerald-600 dark:text-emerald-400">Original (16pt)</th>
                        <th className="py-3 px-4 font-black">Super (19pt)</th>
                        <th className="py-3 px-4 font-black">Luxe (32pt)</th>
                        <th className="py-3 px-4 font-black">Cotton (18pt)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {SPECS_MATRIX.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? (isLight ? 'bg-white' : 'bg-slate-900') : (isLight ? 'bg-slate-50/50' : 'bg-slate-950/50')}>
                          <td className="py-3 px-4 font-bold text-slate-600 dark:text-slate-300">{row.label}</td>
                          <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{row.original}</td>
                          <td className="py-3 px-4 font-mono text-slate-500">{row.super}</td>
                          <td className="py-3 px-4 font-mono text-slate-500">{row.luxe}</td>
                          <td className="py-3 px-4 font-mono text-slate-500">{row.cotton}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: DESIGN & BLEED GUIDELINES */}
            {activeDetailTab === 'guidelines' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-black mb-1">Bleed Dimensions & Safe Margins</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    To prevent white paper edges after die-cutting, ensure your background artwork extends all the way into the bleed area.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      format: 'Standard US (2.0" x 3.5")',
                      fullBleed: '2.125" x 3.625" (54 x 92 mm)',
                      cutTrim: '2.0" x 3.5" (51 x 89 mm)',
                      safeZone: '1.875" x 3.375" (48 x 86 mm)',
                      resolution: '1088 x 638 px @ 300 DPI'
                    },
                    {
                      format: 'MOO Classic (2.16" x 3.3")',
                      fullBleed: '2.28" x 3.43" (58 x 87 mm)',
                      cutTrim: '2.16" x 3.3" (55 x 84 mm)',
                      safeZone: '2.04" x 3.18" (52 x 81 mm)',
                      resolution: '1029 x 684 px @ 300 DPI'
                    },
                    {
                      format: 'Square (2.56" x 2.56")',
                      fullBleed: '2.68" x 2.68" (68 x 68 mm)',
                      cutTrim: '2.56" x 2.56" (65 x 65 mm)',
                      safeZone: '2.44" x 2.44" (62 x 62 mm)',
                      resolution: '804 x 804 px @ 300 DPI'
                    }
                  ].map((dim, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border space-y-2 ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <div className="text-xs font-black text-indigo-600 dark:text-indigo-400">{dim.format}</div>
                      <div className="space-y-1 text-[11px] font-mono">
                        <div className="text-rose-500 font-bold">Bleed Size: {dim.fullBleed}</div>
                        <div className="text-slate-600 dark:text-slate-300">Trim Size: {dim.cutTrim}</div>
                        <div className="text-emerald-500 font-bold">Safe Zone: {dim.safeZone}</div>
                        <div className="text-slate-400 text-[10px]">Pixel Dimension: {dim.resolution}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-900' : 'bg-indigo-950/40 border-indigo-800 text-indigo-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <Download className="w-5 h-5 text-indigo-500" />
                    <div>
                      <div className="text-xs font-bold">Download Blank Design Templates</div>
                      <div className="text-[10px] text-slate-400">Available in Adobe Photoshop (PSD), Illustrator (AI), InDesign (INDD) & Vector PDF</div>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold">
                    Download Starter ZIP
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: VERIFIED CUSTOMER REVIEWS */}
            {activeDetailTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-black">4.9 / 5.0</div>
                  <div className="text-xs text-slate-400">
                    Based on 4,820 verified real-world customer reviews
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      author: 'Elena Rostova',
                      role: 'Creative Director, Atelier Noir',
                      comment: 'The 16pt Original cards feel remarkably solid. The matte coating gives our client portfolio cards a bespoke luxury feel that never leaves fingerprints.',
                      stars: 5,
                      date: '2 days ago'
                    },
                    {
                      author: 'Marcus Vance',
                      role: 'Founder, Vance Architecture',
                      comment: 'Printfinity allowed me to showcase 5 different architectural projects on the back of my business cards. Clients constantly comment on how unique it is!',
                      stars: 5,
                      date: '1 week ago'
                    },
                    {
                      author: 'Samantha Chen',
                      role: 'Branding Strategist',
                      comment: 'Color reproduction matched our CMYK brand guide with exact fidelity. The rounded corners keep them sharp in clients wallets.',
                      stars: 5,
                      date: '2 weeks ago'
                    }
                  ].map((rev, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border space-y-2 ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-amber-400">
                          {[...Array(rev.stars)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">"{rev.comment}"</p>
                      <div className="pt-1">
                        <div className="text-xs font-bold">{rev.author}</div>
                        <div className="text-[10px] text-slate-400">{rev.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: FREE SAMPLE PACK CTA */}
            {activeDetailTab === 'samplepack' && (
              <div className={`p-6 rounded-2xl border text-center space-y-3 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}>
                <Package className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="text-base font-black">Want to feel our papers before ordering?</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Get our Free Sample Pack containing samples of Original 16pt, Super 19pt, Luxe 32pt, and Cotton 18pt cards with all foil finishes.
                </p>
                <button
                  type="button"
                  onClick={() => alert('Free Sample Pack request received! Your sample kit will be dispatched via standard domestic mail.')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
                >
                  Order Free Sample Pack
                </button>
              </div>
            )}
          </div>
        </section>

        {/* RELATED CATALOG ITEMS */}
        {allProducts.length > 0 && (
          <section className="space-y-4 pt-4">
            <h3 className="text-base font-black tracking-tight">You might also be interested in:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {allProducts.slice(0, 4).map(p => (
                <div
                  key={p.id}
                  onClick={() => onSelectOtherProduct && onSelectOtherProduct(p)}
                  className={`p-3 rounded-2xl border cursor-pointer hover:shadow-lg transition group ${
                    isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-slate-100 dark:bg-slate-800">
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="text-xs font-bold truncate">{p.title}</div>
                  <div className="text-[10px] text-slate-400">{p.category}</div>
                  <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {formatPrice(p.base_price_usd)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* STICKY BOTTOM FLOATING ACTION DOCK */}
      <aside className={`sticky bottom-0 z-30 border-t backdrop-blur-md px-4 sm:px-6 py-3 transition-colors ${
        isLight ? 'bg-white/95 border-slate-200/90 shadow-xl' : 'bg-slate-900/95 border-slate-800 shadow-2xl'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Selected Specs Summary */}
          <div className="flex items-center space-x-3 min-w-0">
            <img 
              src={currentCardImage} 
              alt="Thumbnail" 
              className={`w-11 h-8 object-cover border hidden sm:block ${
                selectedCorner === 'rounded' ? 'rounded-lg' : 'rounded-none'
              } ${isLight ? 'border-slate-300' : 'border-slate-700'}`}
            />
            <div className="min-w-0">
              <div className="text-xs font-black truncate">{product?.title || 'Original Business Cards'}</div>
              <div className="text-[10px] text-slate-400 truncate">
                {selectedQuantity} Cards • {stockOption.name} • {finishOption.name} • {selectedCorner === 'rounded' ? 'Rounded Corners' : 'Square'} • {sizeObj.dimensions}
              </div>
            </div>
          </div>

          {/* Pricing & 1-Click Order Action */}
          <div className="flex items-center space-x-4 shrink-0">
            <div className="text-right">
              <div className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {formatPrice(totalCalculatedUsd)}
              </div>
              <div className="text-[9px] text-slate-400 font-mono">
                {formatPrice(unitCalculatedUsd)} / card
              </div>
            </div>

            <button
              type="button"
              onClick={handleFinalOrder}
              className="py-2.5 px-5 sm:px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg hover:shadow-xl transition flex items-center space-x-2"
            >
              <Package className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </aside>

      {/* SUCCESS TOAST NOTIFICATION */}
      {addedToastVisible && (
        <div className="fixed bottom-20 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <div className="text-xs">
            <div className="font-bold">Successfully Added to Cart!</div>
            <div className="text-[10px] text-emerald-100">{selectedQuantity}x {product?.title || 'Cards'} configured with your custom artwork</div>
          </div>
        </div>
      )}
    </div>
  );
}
