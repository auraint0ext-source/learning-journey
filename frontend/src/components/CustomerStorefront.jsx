import React, { useState, useEffect, useMemo } from 'react';
import { API_BASE } from '../config';
import { 
  ShoppingBag, Star, ShieldCheck, Truck, ArrowRight, X, 
  Check, Heart, Sparkles, Plus, Minus, CreditCard, ChevronRight, ChevronLeft, CheckCircle2, Lock, Settings,
  ShoppingCart, Landmark, Smartphone, Wallet, Building2, Copy, DollarSign, Trash2, Shield,
  Sun, Moon, SlidersHorizontal, Search, ChevronDown, Layers, Briefcase, Shirt, Coffee, Image, Tag, BadgePercent, Package, Quote
} from 'lucide-react';

import { DEFAULT_STOREFRONT_CONFIG } from './AdminStorefrontEditor';

const DEFAULT_CATALOG_PRODUCTS = [
  // 1. Marketing & Business Collateral
  {
    id: 1,
    title: 'Premium Matte Soft-Touch Business Cards (Pack of 100)',
    description: 'Ultra-thick 16pt cardstock with silky soft-touch lamination and crisp edge-to-edge printing. Sharp text & rich saturated colors.',
    category: 'Marketing',
    base_price_usd: 19.99,
    image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-MKT-001',
    supplier: 'Prodigi / Gelato',
    in_stock: true
  },
  {
    id: 2,
    title: 'Tri-Fold Glossy Marketing Brochures (Pack of 50)',
    description: 'Professional 100lb glossy book paper with double-sided aqueous coating. Precision tri-fold scoring for crisp presentation.',
    category: 'Marketing',
    base_price_usd: 28.50,
    image_url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-MKT-002',
    supplier: 'Printify / Gelato',
    in_stock: true
  },
  {
    id: 3,
    title: 'Custom Full-Color Promotional Flyers & Postcards (Pack of 100)',
    description: 'Heavyweight 14pt glossy cardstock. Perfect for brand announcements, event handouts, and domestic direct mail campaigns.',
    category: 'Marketing',
    base_price_usd: 22.00,
    image_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-MKT-003',
    supplier: 'SwiftPOD',
    in_stock: true
  },
  {
    id: 4,
    title: 'Branded Presentation Pocket Folders (Pack of 25)',
    description: 'Custom printed presentation folders with dual interior utility pockets and die-cut business card slot.',
    category: 'Marketing',
    base_price_usd: 34.00,
    image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-MKT-004',
    supplier: 'Prodigi',
    in_stock: true
  },

  // 2. Clothing & Bags (Apparel)
  {
    id: 5,
    title: 'Heavyweight Unisex POD Vintage Hoodie',
    description: 'Premium 350 GSM cotton fleece with custom direct-to-garment (DTG) print. Optimized for US, UK & CA domestic fulfillment.',
    category: 'Apparel',
    base_price_usd: 48.00,
    image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-HD-001',
    supplier: 'Printify / SwiftPOD',
    in_stock: true
  },
  {
    id: 6,
    title: 'Eco-Friendly Organic Cotton Graphic Vintage T-Shirt',
    description: '100% ringspun combed organic cotton. Sustainable water-based inks printed via local facilities in Detroit, Birmingham & Toronto.',
    category: 'Apparel',
    base_price_usd: 26.50,
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-TEE-002',
    supplier: 'Monster Digital / SwiftPOD',
    in_stock: true
  },
  {
    id: 7,
    title: 'Vintage Washed Cotton Twill Embroidered Dad Cap',
    description: 'Low-profile 6-panel unstructured cap with high-density 3D puff or flat embroidery. Adjustable brass buckle closure.',
    category: 'Apparel',
    base_price_usd: 24.00,
    image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-CAP-004',
    supplier: 'Spoke Custom / SwiftPOD',
    in_stock: true
  },
  {
    id: 8,
    title: 'Heavy-Duty Organic Canvas Tote Bag',
    description: '12oz 100% certified organic cotton canvas with reinforced cross-stitched handles. Crisp direct-to-film (DTF) color print.',
    category: 'Apparel',
    base_price_usd: 18.00,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-TOT-007',
    supplier: 'Printful / Gelato',
    in_stock: true
  },

  // 3. Canvas & Wall Art
  {
    id: 9,
    title: 'Museum-Grade Stretched Canvas Art (18x24 in)',
    description: 'Acid-free certified artist canvas with FSC certified pine stretcher bars. UV-resistant giclée pigment printing.',
    category: 'Wall Art',
    base_price_usd: 59.00,
    image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-CANV-004',
    supplier: 'Duplium / Prodigi',
    in_stock: true
  },
  {
    id: 10,
    title: 'Archival Museum Matte Fine Art Poster (18x24 in)',
    description: '250 GSM archival museum-grade paper with smooth matte finish. Vivid pigment-based inks resistant to fading for 100+ years.',
    category: 'Wall Art',
    base_price_usd: 32.00,
    image_url: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-POS-008',
    supplier: 'Prodigi',
    in_stock: true
  },
  {
    id: 11,
    title: 'Modern Wood Framed Gallery Art Print (12x18 in)',
    description: 'Solid natural oak or black wood frame with shatterproof optical plexiglass and acid-free gallery matting.',
    category: 'Wall Art',
    base_price_usd: 52.00,
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-FRM-009',
    supplier: 'Gelato / Prodigi',
    in_stock: true
  },
  {
    id: 12,
    title: 'Ultra-HD Brushed Metal Photo Art Print (16x20 in)',
    description: 'Direct-infused dye sublimation on brushed aluminum plate. Waterproof, scratch-resistant with floating wall mount.',
    category: 'Wall Art',
    base_price_usd: 68.00,
    image_url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-MTL-010',
    supplier: 'Prodigi',
    in_stock: true
  },

  // 4. Mugs & Drinkware (Home & Living)
  {
    id: 13,
    title: 'Minimalist Matte Ceramic Coffee Mug (15oz)',
    description: 'Durable high-gloss ceramic mug, microwave and dishwasher safe. Sublimation printed with vibrant photo-realistic colors.',
    category: 'Home & Living',
    base_price_usd: 16.00,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-MUG-003',
    supplier: 'Prodigi / District Photo',
    in_stock: true
  },
  {
    id: 14,
    title: 'Double-Wall Insulated Stainless Steel Tumbler (20oz)',
    description: 'Vacuum insulated 18/8 food-grade stainless steel with splash-proof lid. Keeps drinks cold for 24h, hot for 8h.',
    category: 'Home & Living',
    base_price_usd: 26.50,
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-TMB-011',
    supplier: 'Printify / SPOKE',
    in_stock: true
  },
  {
    id: 15,
    title: 'Rustic Enamel Steel Camp Mug (12oz)',
    description: 'Lightweight rolled rim steel with genuine campfire enamel finish. Shatterproof design for outdoor and travel use.',
    category: 'Home & Living',
    base_price_usd: 19.00,
    image_url: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-CMP-012',
    supplier: 'Gelato / Printful',
    in_stock: true
  },
  {
    id: 16,
    title: 'Vacuum Insulated Thermal Sport Water Bottle (24oz)',
    description: 'Ergonomic stainless steel hydro bottle with leakproof spout lid and carry handle. 360-degree cylindrical UV wrap print.',
    category: 'Home & Living',
    base_price_usd: 29.00,
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-BTL-013',
    supplier: 'Printify / SPOKE',
    in_stock: true
  },

  // 5. Labels & Stickers & Packaging (Accessories)
  {
    id: 17,
    title: 'Tough Armor Custom Phone Case',
    description: 'Dual-layer polycarbonate shell with shock-absorbing TPU liner. Available for iPhone and Samsung Galaxy series.',
    category: 'Accessories',
    base_price_usd: 22.00,
    image_url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-CASE-005',
    supplier: 'Printful / Spoke Custom',
    in_stock: true
  },
  {
    id: 18,
    title: 'Custom Die-Cut Vinyl Stickers (Pack of 50)',
    description: 'Thick 6mil weatherproof vinyl with glossy UV laminate. Laser contour cut precisely to your custom artwork shape.',
    category: 'Accessories',
    base_price_usd: 14.99,
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-STK-014',
    supplier: 'StickerApp / Gelato',
    in_stock: true
  },
  {
    id: 19,
    title: 'Custom Product Roll Labels (Roll of 250)',
    description: 'Waterproof BOPP material with metallic or matte finish. Ideal for custom jar labels, packaging seals, and branded boxes.',
    category: 'Accessories',
    base_price_usd: 36.00,
    image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-LBL-015',
    supplier: 'Printful / Prodigi',
    in_stock: true
  },
  {
    id: 20,
    title: 'Custom Printed Corrugated Shipping Mailer Boxes (Pack of 25)',
    description: 'Durable E-flute corrugated cardboard printed inside and out with eco-friendly water-based inks. Instant tab lock.',
    category: 'Accessories',
    base_price_usd: 45.00,
    image_url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-BOX-016',
    supplier: 'Packlane / Gelato',
    in_stock: true
  }
];

export default function CustomerStorefront({ 
  currentMarket, 
  setCurrentMarket, 
  markets, 
  onOpenAdminLogin, 
  isAdminAuthenticated, 
  onEnterAdminStudio,
  storeTheme = 'light',
  onToggleStoreTheme,
  storefrontConfig
}) {
  const cfg = storefrontConfig || DEFAULT_STOREFRONT_CONFIG;
  const isLight = storeTheme === 'light';

  // Dynamic layout calculations
  const gridColumnsClass = cfg.gridColumns === 2 
    ? 'grid-cols-1 sm:grid-cols-2'
    : cfg.gridColumns === 3
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : cfg.gridColumns === 5
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    
  const gridGapClass = cfg.gridGap === 'compact' ? 'gap-4' : cfg.gridGap === 'spacious' ? 'gap-8' : 'gap-6';
  const cardRadiusClass = cfg.cardRadius === 'lg' ? 'rounded-lg' : cfg.cardRadius === 'xl' ? 'rounded-xl' : cfg.cardRadius === '3xl' ? 'rounded-3xl' : 'rounded-2xl';

  // Hero Title Size (Point scale: Small 28pt, Medium 36pt, Large 48pt, XL 60pt)
  const heroTitleSizeClass = {
    sm: 'text-xl sm:text-3xl',
    md: 'text-2xl sm:text-4xl',
    lg: 'text-3xl sm:text-5xl',
    xl: 'text-4xl sm:text-6xl',
  }[cfg.heroTitleSize || 'md'] || 'text-2xl sm:text-4xl';

  // Hero Subtitle Size (Extra Small 12px, Small 14px, Medium 16px, Large 18px)
  const heroSubtitleSizeClass = {
    xs: 'text-[11px] sm:text-xs',
    sm: 'text-xs sm:text-sm',
    base: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
  }[cfg.heroSubtitleSize || 'sm'] || 'text-xs sm:text-sm';

  // Hero Subtitle Spacing / Margin Gap
  const heroSubtitleSpacingClass = {
    tight: 'mt-1',
    normal: 'mt-2.5',
    relaxed: 'mt-4',
    loose: 'mt-6',
  }[cfg.heroSubtitleSpacing || 'normal'] || 'mt-2.5';

  // Hero Top Spacing / Gap
  const heroTopGapClass = {
    none: 'pt-2 sm:pt-4',
    sm: 'pt-5 sm:pt-7',
    normal: 'pt-8 sm:pt-12',
    lg: 'pt-12 sm:pt-18',
  }[cfg.heroTopGap || 'sm'] || 'pt-5 sm:pt-7';

  // Catalog Section Vertical Spacing
  const catalogPaddingClass = {
    compact: 'py-6',
    normal: 'py-12',
    spacious: 'py-20',
  }[cfg.catalogPadding || 'normal'] || 'py-12';

  const [products, setProducts] = useState(DEFAULT_CATALOG_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price_asc' | 'price_desc' | 'popular' | 'newest'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState(null); // active mega menu category index or null
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('Vintage Black');
  const [selectedFinish, setSelectedFinish] = useState('Matte');
  const [modalQuantity, setModalQuantity] = useState(1);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [orderPlacedData, setOrderPlacedData] = useState(null);

  // Vista Promotional Photo Slider Carousel state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);
  const promoSlides = cfg.promoSlides || DEFAULT_STOREFRONT_CONFIG.promoSlides;

  // Auto-play timer (slides transition every 5.5s, pauses on hover)
  useEffect(() => {
    if (isSliderHovered || !promoSlides || promoSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % promoSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isSliderHovered, promoSlides]);

  // Bulk Discount calculation based on Vista tiered pricing
  const getBulkDiscountPercent = (qty) => {
    if (qty >= (cfg.bulkTier3Qty || 25)) return cfg.bulkTier3Discount || 25;
    if (qty >= (cfg.bulkTier2Qty || 10)) return cfg.bulkTier2Discount || 15;
    if (qty >= (cfg.bulkTier1Qty || 5)) return cfg.bulkTier1Discount || 10;
    return 0;
  };

  // Customer Form state
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Payment Selection state for Checkout
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'apple_pay' | 'paypal' | 'bank_transfer'
  const [cardForm, setCardForm] = useState({
    number: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvc: '884'
  });

  // Customer Payment Methods Management Modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentModalTab, setPaymentModalTab] = useState('saved'); // 'saved' | 'add'
  const [addPaymentType, setAddPaymentType] = useState('card');
  const [savedPaymentMethods, setSavedPaymentMethods] = useState(() => {
    const saved = localStorage.getItem('printflow_customer_payment_methods');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return [
      {
        id: 'pm_1',
        type: 'card',
        brand: 'Visa',
        title: 'Visa ending in 4242',
        subtitle: 'Expires 12/28 • Default Method',
        isDefault: true
      },
      {
        id: 'pm_2',
        type: 'apple_pay',
        brand: 'Apple Pay',
        title: 'Apple Pay (Digital Wallet)',
        subtitle: 'Biometric 1-Click Checkout',
        isDefault: false
      }
    ];
  });

  const [newCardData, setNewCardData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
    bankAccount: '',
    bankRouting: '',
    paypalEmail: ''
  });

  const [paymentToast, setPaymentToast] = useState(null);
  const showPaymentToast = (msg, type = 'success') => {
    setPaymentToast({ msg, type });
    setTimeout(() => setPaymentToast(null), 3500);
  };

  const marketInfo = markets[currentMarket] || {
    currency: 'USD',
    currency_symbol: '$',
    exchange_rate_to_usd: 1.0,
    tax_name: 'Sales Tax',
    tax_rate_percent: 7.5,
    shipping_base_rate: 4.99,
    fulfillment_hub: 'US Print Network (Detroit & Miami)'
  };

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/ecommerce/products`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data);
          }
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    };
    fetchCatalog();
  }, []);

  const getPrice = (usdPrice) => {
    return (usdPrice * marketInfo.exchange_rate_to_usd).toFixed(2);
  };

  // Add to Cart with bulk discount support
  const handleAddToCart = (product, size = selectedSize, color = selectedColor, qty = modalQuantity, finish = selectedFinish) => {
    const rawPrice = parseFloat(getPrice(product.base_price_usd));
    const bulkDiscount = getBulkDiscountPercent(qty);
    const unitPrice = parseFloat((rawPrice * (1 - bulkDiscount / 100)).toFixed(2));

    setCart((prev) => {
      const existing = prev.find((item) => item.product_id === product.id && item.size === size && item.color === color && item.finish === finish);
      if (existing) {
        return prev.map((item) =>
          item.product_id === product.id && item.size === size && item.color === color && item.finish === finish
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          title: product.title,
          unit_price: unitPrice,
          image_url: product.image_url,
          size,
          color,
          finish,
          quantity: qty,
        }
      ];
    });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const updateQuantity = (index, delta) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity += delta;
      if (updated[index].quantity <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      return updated;
    });
  };

  const applyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'USA15OFF' || code === 'UK20OFF' || code === 'SAVE10' || code === 'SAVE25') {
      const disc = code === 'SAVE25' ? 25 : code === 'UK20OFF' ? 20 : code === 'USA15OFF' ? 15 : 10;
      setDiscountPercent(disc);
      showPaymentToast(`Promo Code Applied: ${disc}% OFF!`);
    } else {
      showPaymentToast('Invalid or expired promo code', 'error');
    }
  };

  const applyPromoDirectly = (codeToApply = 'SAVE25') => {
    setPromoCodeInput(codeToApply);
    setDiscountPercent(25);
    showPaymentToast(`🎉 Promo Code Applied: 25% OFF with "${codeToApply}"!`);
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.unit_price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const taxAmount = (taxableSubtotal * marketInfo.tax_rate_percent) / 100;
  const shippingAmount = cart.length > 0 ? marketInfo.shipping_base_rate : 0;
  const totalAmount = (taxableSubtotal + taxAmount + shippingAmount).toFixed(2);

  // Save new payment method
  const handleSavePaymentMethod = (e) => {
    e.preventDefault();
    let newMethod = null;

    if (addPaymentType === 'card') {
      if (!newCardData.number) {
        showPaymentToast('Please enter a valid card number', 'error');
        return;
      }
      const last4 = newCardData.number.replace(/\s/g, '').slice(-4) || '8892';
      newMethod = {
        id: `pm_${Date.now()}`,
        type: 'card',
        brand: 'Mastercard',
        title: `Mastercard ending in ${last4}`,
        subtitle: `Expires ${newCardData.expiry || '08/29'} • Added Card`,
        isDefault: true
      };
      setPaymentMethod('card');
    } else if (addPaymentType === 'apple_pay') {
      newMethod = {
        id: `pm_${Date.now()}`,
        type: 'apple_pay',
        brand: 'Apple Pay',
        title: 'Apple Pay (Digital Wallet)',
        subtitle: 'Linked Device • Touch ID Verified',
        isDefault: true
      };
      setPaymentMethod('apple_pay');
    } else if (addPaymentType === 'paypal') {
      if (!newCardData.paypalEmail) {
        showPaymentToast('Please enter your PayPal email', 'error');
        return;
      }
      newMethod = {
        id: `pm_${Date.now()}`,
        type: 'paypal',
        brand: 'PayPal',
        title: `PayPal (${newCardData.paypalEmail})`,
        subtitle: 'Linked Express Checkout',
        isDefault: true
      };
      setPaymentMethod('paypal');
    } else if (addPaymentType === 'bank_transfer') {
      const bankLabel = currentMarket === 'US' ? 'Chase ACH Checking' : currentMarket === 'UK' ? 'Barclays Faster Payments' : 'Interac e-Transfer';
      newMethod = {
        id: `pm_${Date.now()}`,
        type: 'bank_transfer',
        brand: 'Bank',
        title: `${bankLabel} (${currentMarket})`,
        subtitle: currentMarket === 'US' ? 'Routing: 021000021' : currentMarket === 'UK' ? 'Sort Code: 20-04-15' : 'Auto-Deposit Linked',
        isDefault: true
      };
      setPaymentMethod('bank_transfer');
    }

    if (newMethod) {
      const updated = [newMethod, ...savedPaymentMethods.map(m => ({ ...m, isDefault: false }))];
      setSavedPaymentMethods(updated);
      localStorage.setItem('printflow_customer_payment_methods', JSON.stringify(updated));
      showPaymentToast(`Payment method "${newMethod.title}" added and set as default!`);
      setPaymentModalTab('saved');
      setNewCardData({
        name: '',
        number: '',
        expiry: '',
        cvc: '',
        bankAccount: '',
        bankRouting: '',
        paypalEmail: ''
      });
    }
  };

  const handleSetDefaultPayment = (id) => {
    const updated = savedPaymentMethods.map(m => {
      const isDef = m.id === id;
      if (isDef) {
        setPaymentMethod(m.type);
      }
      return { ...m, isDefault: isDef };
    });
    setSavedPaymentMethods(updated);
    localStorage.setItem('printflow_customer_payment_methods', JSON.stringify(updated));
    showPaymentToast('Default payment method updated!');
  };

  const handleDeleteSavedPayment = (id) => {
    const updated = savedPaymentMethods.filter(m => m.id !== id);
    setSavedPaymentMethods(updated);
    localStorage.setItem('printflow_customer_payment_methods', JSON.stringify(updated));
    showPaymentToast('Payment method removed.');
  };

  // Complete Order
  const handleCompleteOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsCheckingOut(true);
    const payload = {
      customer_name: customerName || 'Alex Customer',
      customer_email: customerEmail || 'customer@example.com',
      customer_phone: '+1-555-0199',
      target_country: currentMarket,
      shipping_address: shippingAddress || (currentMarket === 'UK' ? '221B Baker St' : currentMarket === 'CA' ? '100 King St W' : '350 5th Ave'),
      city: city || (currentMarket === 'UK' ? 'London' : currentMarket === 'CA' ? 'Toronto' : 'New York'),
      postal_code: postalCode || (currentMarket === 'UK' ? 'NW1 6XE' : currentMarket === 'CA' ? 'M5X 1A9' : '10118'),
      payment_method: paymentMethod,
      payment_details: {
        method: paymentMethod,
        card_brand: paymentMethod === 'card' ? 'Visa' : null,
        last4: paymentMethod === 'card' ? '4242' : null,
        bank_type: paymentMethod === 'bank_transfer'
          ? (currentMarket === 'US' ? 'Chase ACH Direct' : currentMarket === 'UK' ? 'Barclays FPS' : 'Interac e-Transfer')
          : null
      },
      items: cart.map((c) => ({
        product_id: c.product_id,
        title: `${c.title} (${c.size}, ${c.color})`,
        quantity: c.quantity,
        unit_price: c.unit_price,
        mockup_url: c.image_url
      }))
    };

    try {
      const res = await fetch(`${API_BASE}/api/ecommerce/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const orderData = await res.json();
        setOrderPlacedData(orderData);
        setCheckoutStep('success');
        setCart([]);
      }
    } catch (err) {
      alert('Failed to place order: ' + err.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const filteredProducts = React.useMemo(() => {
    let list = activeCategory === 'All' 
      ? [...products] 
      : products.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

    // Vista Live Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => 
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price_asc') {
      list.sort((a, b) => a.base_price_usd - b.base_price_usd);
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => b.base_price_usd - a.base_price_usd);
    } else if (sortBy === 'popular') {
      // Sort by popularity index or ratings
      list.sort((a, b) => (b.id % 5) - (a.id % 5) || b.id - a.id);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => b.id - a.id);
    }
    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isLight ? 'bg-[#f8f9fa] text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* 1. Customer Top Announcement Bar */}
      {cfg.showAnnouncement && (
        <div className={`text-[11px] py-1.5 px-4 sm:px-8 lg:px-12 flex items-center justify-between w-full transition-colors ${
          isLight 
            ? 'bg-slate-100 border-b border-slate-200 text-slate-700' 
            : 'bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950 border-b border-indigo-500/20 text-white'
        }`}>
          <div className="flex items-center space-x-2 mx-auto sm:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              {cfg.announcementText}
            </span>
          </div>
          <div className={`hidden sm:flex items-center space-x-3 text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            <span>{cfg.announcementFacilities}</span>
          </div>
        </div>
      )}

      {/* 2. Customer Navigation Header with VistaPrint Global Search */}
      <nav className={`sticky top-0 z-40 w-full transition-colors ${
        isLight 
          ? 'bg-white/95 backdrop-blur border-b border-slate-200/90 shadow-xs' 
          : 'bg-slate-900/95 backdrop-blur border-b border-slate-800 shadow-xs'
      }`}>
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center space-x-3 flex-shrink-0 cursor-pointer" 
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-base shadow-sm ${
              isLight ? 'bg-slate-900' : 'bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-indigo-500/20'
            }`}>
              P
            </div>
            <div>
              <span className={`font-black text-lg tracking-tight block leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {cfg.brandName || 'PrintFlow'}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider block mt-0.5 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>
                {cfg.badgeTag || 'Domestic POD'}
              </span>
            </div>
          </div>

          {/* Center: VistaPrint Global Search Bar */}
          {cfg.showSearchBar !== false && (
            <div className="hidden md:flex flex-1 max-w-xl mx-2 relative">
              <div className="relative w-full">
                <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                  isLight ? 'text-slate-400' : 'text-slate-500'
                }`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={cfg.searchPlaceholder || 'Search 100+ custom products: Business cards, hoodies, mugs, canvases...'}
                  className={`w-full pl-10 pr-9 py-2 rounded-xl text-xs font-medium border transition outline-none ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                      : 'bg-slate-950 border-slate-800 text-slate-200 focus:bg-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900/30'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Right Action Icons: Currency Selector, Theme Toggle, Payment Modal, Cart */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Currency Selector Pill */}
            <div className={`hidden sm:flex items-center px-2.5 py-1.5 rounded-xl text-xs font-semibold border ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}>
              <span className="mr-1">{currentMarket === 'US' ? '🇺🇸' : currentMarket === 'UK' ? '🇬🇧' : '🇨🇦'}</span>
              <span className="font-mono">{marketInfo.currency} ({marketInfo.currency_symbol})</span>
            </div>

            {/* Quick Theme Toggle */}
            <button
              onClick={() => onToggleStoreTheme && onToggleStoreTheme()}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                isLight 
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title={`Storefront Theme: currently ${storeTheme.toUpperCase()} mode. Click to toggle.`}
            >
              {isLight ? <Moon className="w-3.5 h-3.5 text-indigo-600" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
              <span className="hidden lg:inline">{isLight ? 'Dark' : 'Light'}</span>
            </button>

            {/* Customer Add / Manage Payment Method Button */}
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition shadow-sm ${
                isLight 
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300' 
                  : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700 hover:border-emerald-500/50'
              }`}
              title="Add or Manage your saved Payment Methods"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden xl:inline">Payment Methods</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => {
                setCheckoutStep('cart');
                setIsCartOpen(true);
              }}
              className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-sm transition border ${
                isLight
                  ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500/40 shadow-indigo-600/30'
              }`}
              title="View your shopping cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
              <span className={`ml-1 px-1.5 py-0.2 rounded-full font-extrabold text-[10px] ${
                isLight ? 'bg-white text-slate-900' : 'bg-white text-indigo-700'
              }`}>
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (when on small screens) */}
        {cfg.showSearchBar !== false && (
          <div className="md:hidden px-4 pb-2.5">
            <div className="relative w-full">
              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                isLight ? 'text-slate-400' : 'text-slate-500'
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className={`w-full pl-8 pr-8 py-1.5 rounded-xl text-xs font-medium border ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                }`}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* VistaPrint Full-Width Mega Menu Bar */}
        {cfg.showMegaMenu !== false && (
          <div className={`border-t relative ${
            isLight ? 'bg-slate-50/90 border-slate-200/90' : 'bg-slate-950/80 border-slate-800'
          }`}>
            <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto text-xs font-semibold py-1">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                  className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                    activeCategory === 'All' && !searchQuery
                      ? isLight ? 'bg-slate-900 text-white font-bold' : 'bg-indigo-600 text-white font-bold'
                      : isLight ? 'text-slate-700 hover:bg-slate-200/60' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  All Products
                </button>

                {(cfg.megaMenuCategories || DEFAULT_STOREFRONT_CONFIG.megaMenuCategories).map((menu, idx) => {
                  const isOpen = activeMegaMenu === idx;
                  const isCatActive = activeCategory.toLowerCase() === menu.categoryKey.toLowerCase();
                  return (
                    <div 
                      key={idx}
                      className="relative"
                      onMouseEnter={() => setActiveMegaMenu(idx)}
                      onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                      <button
                        onClick={() => {
                          setActiveCategory(menu.categoryKey);
                          setActiveMegaMenu(isOpen ? null : idx);
                        }}
                        className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1 whitespace-nowrap ${
                          isCatActive
                            ? isLight ? 'bg-slate-900 text-white font-bold' : 'bg-indigo-600 text-white font-bold'
                            : isLight ? 'text-slate-700 hover:bg-slate-200/60' : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{menu.title}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Vista Mega Menu Dropdown */}
                      {isOpen && (
                        <div className={`absolute top-full left-0 z-50 w-72 p-3.5 rounded-2xl shadow-2xl border transition-all animate-in fade-in slide-in-from-top-1 ${
                          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                        }`}>
                          <div className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                            <span>Popular {menu.title}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400">Domestic POD</span>
                          </div>
                          <div className="space-y-1">
                            {(menu.subcategories || []).map((sub, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={() => {
                                  setActiveCategory(menu.categoryKey);
                                  setSearchQuery(sub);
                                  setActiveMegaMenu(null);
                                  const el = document.getElementById('catalog-grid');
                                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                                  isLight ? 'hover:bg-slate-100 text-slate-700 hover:text-slate-900' : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                                }`}
                              >
                                <span>{sub}</span>
                                <ArrowRight className="w-3 h-3 opacity-40" />
                              </button>
                            ))}
                          </div>
                          <div className="pt-2.5 mt-2.5 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px]">
                            <button
                              onClick={() => {
                                setActiveCategory(menu.categoryKey);
                                setSearchQuery('');
                                setActiveMegaMenu(null);
                                const el = document.getElementById('catalog-grid');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="font-bold text-indigo-600 hover:underline"
                            >
                              Explore all in {menu.title} →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Live Search Active Feedback */}
              {searchQuery && (
                <div className="hidden lg:flex items-center space-x-1.5 text-xs">
                  <span className="text-slate-400">Search:</span>
                  <span className="font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <span>"{searchQuery}"</span>
                    <button onClick={() => setSearchQuery('')} className="hover:text-red-400 ml-1">×</button>
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* 2.5 VistaPrint-Style Promotional Photo Carousel / Slider (Right After Product Menu) */}
      {cfg.showPromoSlider !== false && promoSlides && promoSlides.length > 0 && (
        <section 
          className={`relative border-b transition-colors overflow-hidden select-none ${
            isLight 
              ? 'bg-gradient-to-r from-amber-50/50 via-slate-50 to-amber-50/50 border-slate-200' 
              : 'bg-gradient-to-r from-slate-950 via-indigo-950/30 to-slate-950 border-slate-800'
          }`}
          onMouseEnter={() => setIsSliderHovered(true)}
          onMouseLeave={() => setIsSliderHovered(false)}
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
            {/* Carousel Slide Card Container */}
            {(() => {
              const slide = promoSlides[currentSlideIndex] || promoSlides[0];
              return (
                <div className="relative">
                  {/* Top Bar above slider: Slide tracker & Promo urgency badge */}
                  <div className="flex items-center justify-between pb-3 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping mr-1"></span>
                        {cfg.promoBadgeText || '🔥 VISTAPRINT EXCLUSIVE • LIMITED TIME'}
                      </span>
                      <span className="hidden sm:inline text-[11px] font-semibold text-slate-400">
                        {slide.tag}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs">
                      {/* Interactive Coupon Code Pill */}
                      <button
                        onClick={() => applyPromoDirectly(cfg.promoCode || 'SAVE25')}
                        className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl font-mono font-bold text-xs border shadow-xs transition transform hover:scale-105 active:scale-95 ${
                          isLight 
                            ? 'bg-white border-amber-300 text-amber-800 hover:bg-amber-50' 
                            : 'bg-slate-900 border-amber-500/40 text-amber-300 hover:bg-slate-800'
                        }`}
                        title="Click to copy & apply promo code"
                      >
                        <Tag className="w-3 h-3 text-amber-500" />
                        <span>CODE: {cfg.promoCode || 'SAVE25'}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300 font-sans font-extrabold ml-1">
                          Apply 25% OFF
                        </span>
                      </button>

                      {/* Slide Counter */}
                      <span className="text-[11px] font-mono font-bold text-slate-400 hidden md:inline">
                        0{currentSlideIndex + 1} / 0{promoSlides.length}
                      </span>
                    </div>
                  </div>

                  {/* Main Slider Display: Left Photo, Center "SAVE 25%" Offer, Right Photo */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
                    {/* Left Flanking Photography Card with Quotation & Caption */}
                    <div className="lg:col-span-4 order-2 lg:order-1">
                      <div className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border shadow-lg transition-all duration-500 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] ${
                        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                      }`}>
                        <img
                          src={slide.leftImage}
                          alt={slide.leftCaption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Gradient Shadow Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
                        
                        {/* Quote & Caption Overlay Card */}
                        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white space-y-1">
                          <div className="flex items-start space-x-1.5">
                            <Quote className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5 opacity-80" />
                            <p className="text-xs sm:text-sm font-medium italic text-slate-100 leading-snug line-clamp-2">
                              {slide.leftQuote}
                            </p>
                          </div>
                          <div className="pt-1 flex items-center justify-between">
                            <span className="text-[10px] sm:text-xs font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
                              {slide.leftCaption}
                            </span>
                            <span className="text-[9px] text-slate-300 font-semibold opacity-75">
                              Local POD Fulfillment
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center Focus Area: "SAVE 25%", Subtitle, Coupon and Actions */}
                    <div className={`lg:col-span-4 order-1 lg:order-2 text-center px-2 py-4 sm:py-6 rounded-2xl border ${
                      isLight 
                        ? 'bg-white/90 border-amber-200 shadow-md backdrop-blur' 
                        : 'bg-slate-900/90 border-amber-500/30 shadow-xl shadow-slate-950 backdrop-blur'
                    }`}>
                      <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-2">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>VistaPrint Seasonal Promo</span>
                      </div>

                      {/* Giant "SAVE 25%" Headline */}
                      <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600">
                        {cfg.promoDiscountHeadline || 'SAVE 25%'}
                      </h2>

                      <h3 className={`text-xs sm:text-sm font-extrabold mt-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {slide.centerOffer || 'On Marketing Materials & Custom Goods'}
                      </h3>

                      <p className={`text-[11px] sm:text-xs mt-1.5 max-w-sm mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {cfg.promoDiscountSub || 'Save 25% on custom business cards, vintage apparel, canvas wall art, mugs & packaging printed domestically.'}
                      </p>

                      {/* Center Action CTA Buttons */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4">
                        <button
                          onClick={() => {
                            applyPromoDirectly(cfg.promoCode || 'SAVE25');
                            if (slide.targetCategory) setActiveCategory(slide.targetCategory);
                            setSearchQuery('');
                            const el = document.getElementById('catalog-grid');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-md ${
                            isLight 
                              ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20' 
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                          }`}
                        >
                          <span>Shop {slide.targetCategory || 'Products'} (25% OFF)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => applyPromoDirectly(cfg.promoCode || 'SAVE25')}
                          className={`w-full sm:w-auto px-3 py-2 rounded-xl text-xs font-semibold border transition flex items-center justify-center space-x-1 ${
                            isLight 
                              ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300' 
                              : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 text-amber-500" />
                          <span>Code Applied (SAVE25)</span>
                        </button>
                      </div>

                      <div className="mt-3 text-[10px] text-slate-400 flex items-center justify-center space-x-2">
                        <span>⚡ Dispatches in 2 Days</span>
                        <span>•</span>
                        <span>Zero Customs Duties</span>
                      </div>
                    </div>

                    {/* Right Flanking Photography Card with Quotation & Caption */}
                    <div className="lg:col-span-4 order-3">
                      <div className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border shadow-lg transition-all duration-500 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] ${
                        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                      }`}>
                        <img
                          src={slide.rightImage}
                          alt={slide.rightCaption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Gradient Shadow Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
                        
                        {/* Quote & Caption Overlay Card */}
                        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white space-y-1">
                          <div className="flex items-start space-x-1.5">
                            <Quote className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5 opacity-80" />
                            <p className="text-xs sm:text-sm font-medium italic text-slate-100 leading-snug line-clamp-2">
                              {slide.rightQuote}
                            </p>
                          </div>
                          <div className="pt-1 flex items-center justify-between">
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-500/30">
                              {slide.rightCaption}
                            </span>
                            <span className="text-[9px] text-slate-300 font-semibold opacity-75">
                              Certified Archival
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slider Navigation Chevrons and Dot Indicators */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + promoSlides.length) % promoSlides.length)}
                      className={`p-2 rounded-xl border transition shadow-xs flex items-center space-x-1 text-xs font-semibold ${
                        isLight 
                          ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300' 
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                      }`}
                      title="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    {/* Dot Pagination indicators */}
                    <div className="flex items-center space-x-1.5">
                      {promoSlides.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentSlideIndex(dotIdx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            currentSlideIndex === dotIdx 
                              ? 'w-7 bg-indigo-600 shadow-sm' 
                              : isLight ? 'w-2 bg-slate-300 hover:bg-slate-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                          }`}
                          title={`Go to slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % promoSlides.length)}
                      className={`p-2 rounded-xl border transition shadow-xs flex items-center space-x-1 text-xs font-semibold ${
                        isLight 
                          ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300' 
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                      }`}
                      title="Next slide"
                    >
                      <span className="hidden sm:inline">Next Slide</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* 3. Hero Banner */}
      <section className={`relative overflow-hidden border-b transition-colors ${
        cfg.heroPadding === 'compact' ? 'py-8 sm:py-10' : cfg.heroPadding === 'spacious' ? 'py-14 sm:py-20' : 'py-10 sm:py-12'
      } ${
        isLight
          ? 'bg-white border-slate-200'
          : 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-slate-800/80'
      }`}>
        {!isLight && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-indigo-600/10 blur-[90px] rounded-full pointer-events-none animate-pulse"></div>
        )}

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${heroTopGapClass} space-y-4 ${
          cfg.heroAlignment === 'left' ? 'text-left' : 'text-center'
        }`}>
          {/* Live production status badge */}
          {cfg.showLiveHubBadge !== false && (
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold shadow-xs border ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-slate-900/90 border-indigo-500/30 text-slate-300 shadow-inner'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{cfg.liveHubBadgeLabel || 'Live Production Hub:'}</span>
              <span className={isLight ? 'text-emerald-700 font-bold' : 'text-emerald-400 font-bold'}>
                {marketInfo.fulfillment_hub}
              </span>
            </div>
          )}

          <h1 className={`${heroTitleSizeClass} font-black tracking-tight leading-tight max-w-3xl ${
            cfg.heroAlignment === 'left' ? '' : 'mx-auto'
          } ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {cfg.heroTitlePrefix}{' '}
            <span className={isLight ? 'text-indigo-600' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400'}>
              {cfg.heroTitleAccent}
            </span>
          </h1>

          <p className={`${heroSubtitleSizeClass} ${heroSubtitleSpacingClass} max-w-2xl leading-relaxed ${
            cfg.heroAlignment === 'left' ? '' : 'mx-auto'
          } ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {cfg.heroSubtitle}
          </p>

          {/* Interactive Regional Hub & Courier Switcher (Toggleable from Admin Editor) */}
          {cfg.showHubSwitcher !== false && (
            <div className={`flex flex-wrap items-center ${
              cfg.heroAlignment === 'left' ? 'justify-start' : 'justify-center'
            } gap-2 pt-1`}>
              {[
                { code: 'US', label: '🇺🇸 United States', courier: 'USPS Ground Advantage (2 Days)' },
                { code: 'UK', label: '🇬🇧 United Kingdom', courier: 'Royal Mail Tracked 24 (2 Days)' },
                { code: 'CA', label: '🇨🇦 Canada', courier: 'Canada Post Expedited (2 Days)' }
              ].map(hub => {
                const isSelected = currentMarket === hub.code;
                return (
                  <button
                    key={hub.code}
                    type="button"
                    onClick={() => setCurrentMarket(hub.code)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 border shadow-xs ${
                      isSelected
                        ? isLight 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                          : 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                        : isLight 
                          ? 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50' 
                          : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                    title={`Switch preview to ${hub.label}`}
                  >
                    <span>{hub.label}</span>
                    <span className="opacity-40">•</span>
                    <span className={`text-[10px] font-mono font-medium ${isLight ? (isSelected ? 'text-emerald-300' : 'text-emerald-700') : 'text-emerald-300'}`}>
                      {hub.courier}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Vista Quick Action CTAs */}
          <div className={`flex flex-wrap items-center ${cfg.heroAlignment === 'left' ? 'justify-start' : 'justify-center'} gap-3 pt-2`}>
            <button
              onClick={() => {
                const el = document.getElementById('category-showcase') || document.getElementById('catalog-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-md ${
                isLight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30'
              }`}
            >
              <span>Explore Popular Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('catalog-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition ${
                isLight ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300' : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              <span>View Full Domestic Catalog</span>
            </button>
          </div>

          {/* Trust Value Props (Toggleable & Editable from Admin Editor) */}
          {cfg.showTrustProps !== false && (
            <div className={`flex flex-wrap items-center ${
              cfg.heroAlignment === 'left' ? 'justify-start ml-0' : 'justify-center mx-auto'
            } gap-6 pt-3 text-[11px] border-t max-w-2xl ${
              isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800/60 text-slate-400'
            }`}>
              {(cfg.trustProps || [
                { title: 'Local Domestic Couriers', subtitle: 'USPS, Royal Mail & Canada Post' },
                { title: 'Certified Archival Eco Inks', subtitle: 'OEKO-TEX & Non-Toxic' },
                { title: '4.9 / 5 Verified Rating', subtitle: 'Over 12,000 satisfied shoppers' },
              ]).map((prop, idx) => (
                <div key={idx} className="flex items-center space-x-1.5">
                  {idx === 0 && <Truck className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />}
                  {idx === 1 && <ShieldCheck className={`w-3.5 h-3.5 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />}
                  {idx === 2 && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  <span className="font-medium">{prop.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3.1 VistaPrint-Style "Explore Popular Categories" 6-Tile Grid */}
      {cfg.showCategoryShowcase !== false && (
        <section id="category-showcase" className={`border-b transition-colors py-10 sm:py-14 ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800/80'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                    Bestselling Formats
                  </span>
                </div>
                <h2 className={`text-xl sm:text-2xl font-black tracking-tight mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {cfg.categoryShowcaseTitle || 'Explore Popular Categories'}
                </h2>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {cfg.categoryShowcaseSubtitle || 'Custom printed domestically with guaranteed archival finishes and zero customs delay'}
                </p>
              </div>

              <div className="hidden sm:block">
                <span className={`text-xs font-semibold ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>
                  {currentMarket === 'US' ? '🇺🇸 Shipped from Detroit' : currentMarket === 'UK' ? '🇬🇧 Shipped from London' : '🇨🇦 Shipped from Toronto'}
                </span>
              </div>
            </div>

            {/* 6 Category Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {(cfg.categoryShowcaseCards || DEFAULT_STOREFRONT_CONFIG.categoryShowcaseCards).map((card, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveCategory(card.category);
                    setSearchQuery('');
                    const el = document.getElementById('catalog-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group relative rounded-2xl overflow-hidden border p-3 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 ${
                    isLight 
                      ? 'bg-white border-slate-200/90 hover:border-indigo-400' 
                      : 'bg-slate-900 border-slate-800 hover:border-indigo-500/50 shadow-slate-950'
                  }`}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-950">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {card.badge && (
                      <span className={`absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs backdrop-blur-md ${
                        isLight ? 'bg-white/95 text-slate-900 border border-slate-200' : 'bg-slate-900/90 text-indigo-300 border border-indigo-500/30'
                      }`}>
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className={`font-bold text-xs line-clamp-1 group-hover:text-indigo-500 transition-colors ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      {card.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1 text-[11px]">
                      <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>From</span>
                      <span className={`font-mono font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                        {marketInfo.currency_symbol}{getPrice(parseFloat(card.startingPrice || '10.00'))}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[10px] font-semibold text-indigo-500">
                    <span>Shop Now</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3.2 VistaPrint 100% Satisfaction Guarantee Banner */}
      {cfg.showSatisfactionGuarantee !== false && (
        <section className={`border-b transition-colors py-6 ${
          isLight ? 'bg-amber-50/60 border-amber-200/60 text-slate-900' : 'bg-gradient-to-r from-slate-950 via-indigo-950/20 to-slate-950 border-slate-800 text-white'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center space-x-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0 border border-amber-500/30 shadow-xs">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className={`font-black text-sm sm:text-base tracking-tight ${isLight ? 'text-amber-950' : 'text-amber-300'}`}>
                    {cfg.guaranteeHeading || '100% Satisfaction Guaranteed'}
                  </h3>
                  <p className={`text-xs mt-0.5 max-w-2xl leading-relaxed ${isLight ? 'text-amber-900/80' : 'text-slate-300'}`}>
                    {cfg.guaranteeSubtext || 'We stand by every stitch and print. If your custom merchandise is not absolutely flawless, we will reprint it immediately or issue a 100% money-back refund.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                <div className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 ${
                  isLight ? 'bg-white border-amber-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
                }`}>
                  <Truck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>2-Day Local Dispatch</span>
                </div>
                <div className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 ${
                  isLight ? 'bg-white border-amber-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Archival Inks</span>
                </div>
                <div className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 ${
                  isLight ? 'bg-white border-amber-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
                }`}>
                  <Check className="w-3.5 h-3.5 text-amber-500" />
                  <span>Free Reprints</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Products Grid */}
      <main id="catalog-grid" className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${catalogPaddingClass} flex-1`}>
        {/* Category Filter Pills & Right-side Sort & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          {cfg.showCategoryPills !== false && (
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full">
              {['All', 'Marketing', 'Apparel', 'Home & Living', 'Wall Art', 'Accessories'].map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shadow-xs ${
                      isSelected
                        ? isLight
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : isLight
                          ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}

          {/* Right-Side Sort & Filter Controls */}
          <div className="flex items-center space-x-2.5 self-end md:self-auto flex-shrink-0">
            <div className="flex items-center space-x-1.5 text-xs">
              <span className={`text-[11px] font-semibold hidden sm:inline ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Sort & Filter:
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`pl-3 pr-8 py-2 rounded-xl text-xs font-semibold appearance-none cursor-pointer transition border shadow-xs outline-none ${
                    isLight 
                      ? 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 focus:border-indigo-500 shadow-xs' 
                      : 'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700 focus:border-indigo-500'
                  }`}
                >
                  <option value="featured">✨ Featured (ডিফল্ট)</option>
                  <option value="price_asc">💵 Price: Low to High (কম থেকে বেশি দাম)</option>
                  <option value="price_desc">💎 Price: High to Low (বেশি থেকে কম দাম)</option>
                  <option value="popular">🔥 Most Popular (জনপ্রিয়)</option>
                  <option value="newest">⚡ New Arrivals (নতুন কালেকশন)</option>
                </select>
                <SlidersHorizontal className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
              </div>
            </div>

            <div className={`text-xs pl-2.5 border-l hidden sm:block ${isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-400'}`}>
              <strong className={`font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>{marketInfo.currency} ({marketInfo.currency_symbol})</strong>
            </div>
          </div>
        </div>

        {/* Product Cards with Custom Columns & Spacing */}
        <div className={`grid ${gridColumnsClass} ${gridGapClass}`}>
          {filteredProducts.map((p) => {
            const price = getPrice(p.base_price_usd);
            return (
              <div
                key={p.id}
                className={`${cardRadiusClass} overflow-hidden transition-all duration-300 flex flex-col justify-between group ${
                  isLight
                    ? 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
                    : 'bg-slate-900 border border-slate-800 hover:border-indigo-500/50 shadow-xl'
                }`}
              >
                <div>
                  <div className={`relative aspect-square overflow-hidden ${isLight ? 'bg-slate-100' : 'bg-slate-950'}`}>
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-xs ${
                      isLight
                        ? 'bg-white/95 backdrop-blur text-slate-800 border-slate-200'
                        : 'bg-slate-900/90 backdrop-blur text-indigo-300 border-indigo-500/30'
                    }`}>
                      {p.category}
                    </span>
                    <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-xs ${
                      isLight
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-900/80 backdrop-blur text-emerald-400 border-emerald-500/30'
                    }`}>
                      Local Hub: {currentMarket}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center space-x-1 text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                      <span className={`text-[10px] ml-1 ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>(48)</span>
                    </div>

                    <h3 className={`font-bold text-sm line-clamp-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {p.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className={`p-5 pt-0 border-t mt-2 ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
                  <div className="flex items-baseline justify-between mb-4 pt-3">
                    <div className="space-y-0.5">
                      <span className={`text-[10px] uppercase font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Price ({marketInfo.currency})
                      </span>
                      <div className={`text-xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {marketInfo.currency_symbol}{price}
                      </div>
                    </div>
                    <span className={`text-[10px] ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                      +{marketInfo.currency_symbol}{marketInfo.shipping_base_rate} ship
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProduct(p);
                      setSelectedSize('L');
                      setSelectedColor('Vintage Black');
                      setSelectedFinish('Matte');
                      setModalQuantity(1);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-2 border shadow-xs ${
                      isLight
                        ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
                        : 'bg-slate-800 hover:bg-indigo-600 text-white border-slate-700 hover:border-indigo-500'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Configure & Buy</span>
                    {cfg.showBulkDiscounts !== false && (
                      <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                        Up to 25% OFF
                      </span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* 5. VistaPrint-Style Product Quick-View & Customizer Modal */}
      {selectedProduct && (() => {
        const rawUnitPrice = parseFloat(getPrice(selectedProduct.base_price_usd));
        const bulkDisc = getBulkDiscountPercent(modalQuantity);
        const discountedUnitPrice = parseFloat((rawUnitPrice * (1 - bulkDisc / 100)).toFixed(2));
        const totalModalPrice = (discountedUnitPrice * modalQuantity).toFixed(2);
        const totalSaved = ((rawUnitPrice - discountedUnitPrice) * modalQuantity).toFixed(2);

        return (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className={`rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row border my-8 ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
            }`}>
              {/* Left Column: Product Image & Badges */}
              <div className={`md:w-5/12 p-6 flex flex-col items-center justify-between ${isLight ? 'bg-slate-100' : 'bg-slate-950'}`}>
                <div className="w-full flex items-center justify-between text-[10px] font-bold">
                  <span className={`px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isLight ? 'bg-indigo-100 text-indigo-700' : 'bg-indigo-950 text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {selectedProduct.category}
                  </span>
                  <span className="text-emerald-500 font-mono">In Stock • 2-Day Ship</span>
                </div>

                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.title}
                  className="max-h-64 object-cover rounded-2xl shadow-md my-4"
                />

                <div className={`w-full p-2.5 rounded-xl border text-[10px] flex items-center space-x-2 ${
                  isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}>
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>100% Satisfaction Guarantee: Love it or reprinted free.</span>
                </div>
              </div>

              {/* Right Column: Customization Specs & Bulk Pricing */}
              <div className="md:w-7/12 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-base sm:text-lg font-black leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {selectedProduct.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-2xl font-black font-mono ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                          {marketInfo.currency_symbol}{discountedUnitPrice.toFixed(2)}
                        </span>
                        {bulkDisc > 0 && (
                          <span className="text-xs text-slate-400 line-through font-mono">
                            {marketInfo.currency_symbol}{rawUnitPrice.toFixed(2)}
                          </span>
                        )}
                        {bulkDisc > 0 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                            {bulkDisc}% Bulk Savings
                          </span>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedProduct(null)} 
                      className={`p-1.5 rounded-xl transition ${isLight ? 'text-slate-400 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Domestic Courier Reassurance Pill */}
                  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800/80 text-slate-300'
                  }`}>
                    <Truck className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Dispatched in 2 Days via {marketInfo.fulfillment_hub.split('(')[0]}</span>
                  </div>

                  {/* VistaPrint Wholesale Bulk Pricing Tiers */}
                  {cfg.showBulkDiscounts !== false && (
                    <div className="pt-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[11px] font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                          Wholesale Volume Pricing:
                        </span>
                        <span className="text-[10px] text-indigo-400 font-mono">Buy more, save more</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                        {[
                          { qty: '1-4 pcs', disc: 'Regular', active: modalQuantity < 5, min: 1 },
                          { qty: '5+ pcs', disc: `10% OFF`, active: modalQuantity >= 5 && modalQuantity < 10, min: 5 },
                          { qty: '10+ pcs', disc: `15% OFF`, active: modalQuantity >= 10 && modalQuantity < 25, min: 10 },
                          { qty: '25+ pcs', disc: `25% OFF`, active: modalQuantity >= 25, min: 25 },
                        ].map((tier, tIdx) => (
                          <button
                            key={tIdx}
                            type="button"
                            onClick={() => setModalQuantity(tier.min)}
                            className={`p-2 rounded-xl border transition ${
                              tier.active
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm font-bold'
                                : isLight
                                  ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <div className="font-bold text-[11px]">{tier.qty}</div>
                            <div className={`text-[9px] font-mono ${tier.active ? 'text-emerald-200' : 'text-emerald-500'}`}>
                              {tier.disc}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size Selection */}
                  {selectedProduct.category === 'Apparel' && (
                    <div className="pt-1">
                      <label className={`text-xs font-semibold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        Size:
                      </label>
                      <div className="flex space-x-2">
                        {['S', 'M', 'L', 'XL', '2XL'].map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSize(s)}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition flex items-center justify-center ${
                              selectedSize === s
                                ? isLight ? 'bg-slate-900 text-white shadow-sm' : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                : isLight ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color & Finish Selection */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className={`text-xs font-semibold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        Color Variant:
                      </label>
                      <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className={`w-full py-1.5 px-2.5 rounded-xl text-xs font-semibold border outline-none ${
                          isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                        }`}
                      >
                        <option value="Vintage Black">Vintage Black</option>
                        <option value="Heather Grey">Heather Grey</option>
                        <option value="Forest Green">Forest Green</option>
                        <option value="Natural Canvas">Natural Canvas</option>
                      </select>
                    </div>

                    <div>
                      <label className={`text-xs font-semibold block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        Substrate Finish:
                      </label>
                      <select
                        value={selectedFinish}
                        onChange={(e) => setSelectedFinish(e.target.value)}
                        className={`w-full py-1.5 px-2.5 rounded-xl text-xs font-semibold border outline-none ${
                          isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                        }`}
                      >
                        <option value="Matte">Archival Matte</option>
                        <option value="Glossy">Vivid Glossy</option>
                        <option value="Soft-Touch">Soft-Touch Velvet</option>
                      </select>
                    </div>
                  </div>

                  {/* Quantity Stepper with Bulk Savings calculation */}
                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <span className={`text-xs font-bold block ${isLight ? 'text-slate-800' : 'text-white'}`}>
                        Order Quantity:
                      </span>
                      {bulkDisc > 0 && (
                        <span className="text-[10px] text-emerald-500 font-bold block">
                          Savings: {marketInfo.currency_symbol}{totalSaved} ({bulkDisc}% OFF)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setModalQuantity(q => Math.max(1, q - 1))}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border font-bold text-sm ${
                          isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                        }`}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={modalQuantity}
                        onChange={(e) => setModalQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className={`w-12 h-8 text-center rounded-lg border font-mono font-bold text-xs outline-none ${
                          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setModalQuantity(q => q + 1)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border font-bold text-sm ${
                          isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modal Footer with Add to Bag */}
                <div className={`pt-4 border-t flex items-center justify-between space-x-3 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                  <div>
                    <div className="text-[10px] text-slate-400">Total Price ({modalQuantity} units):</div>
                    <div className={`text-xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {marketInfo.currency_symbol}{totalModalPrice}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(selectedProduct, selectedSize, selectedColor, modalQuantity, selectedFinish)}
                    className={`py-3 px-6 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-lg ${
                      isLight 
                        ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag ({marketInfo.currency_symbol}{totalModalPrice})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 6. Slide-Out Customer Shopping Cart & Checkout Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
          <div className={`w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto border-l ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
          }`}>
            {/* Drawer Header */}
            <div className={`flex items-center justify-between pb-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <div className="flex items-center space-x-2">
                <ShoppingBag className={`w-5 h-5 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />
                <h2 className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>Your Shopping Cart</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className={`p-1 rounded-lg ${isLight ? 'text-slate-400 hover:text-slate-800' : 'text-slate-400 hover:text-white'}`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body */}
            {checkoutStep === 'cart' && (
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className={`text-center py-12 text-xs ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                    Your cart is currently empty.
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className={`rounded-xl p-3 flex space-x-3 text-xs border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <img src={item.image_url} alt="" className={`w-16 h-16 rounded-lg object-cover ${isLight ? 'bg-slate-200' : 'bg-slate-900'}`} />
                      <div className="flex-1 space-y-1">
                        <h4 className={`font-bold line-clamp-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.title}</h4>
                        <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          {item.size && `Size: ${item.size} • `}{item.color}
                        </div>
                        <div className={`font-mono font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                          {marketInfo.currency_symbol}{(item.unit_price * item.quantity).toFixed(2)}
                        </div>
                        <div className="flex items-center space-x-2 pt-1">
                          <button
                            onClick={() => updateQuantity(idx, -1)}
                            className={`w-5 h-5 rounded flex items-center justify-center border ${
                              isLight ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                            }`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className={`font-bold font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(idx, 1)}
                            className={`w-5 h-5 rounded flex items-center justify-center border ${
                              isLight ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                            }`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Checkout Form */}
            {checkoutStep === 'checkout' && (
              <form onSubmit={handleCompleteOrder} className="flex-1 overflow-y-auto py-4 space-y-3 text-xs">
                <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>
                  Customer Shipping & Delivery Details
                </div>

                <div>
                  <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>Destination Country / Market *</label>
                  <select
                    value={currentMarket}
                    onChange={(e) => setCurrentMarket(e.target.value)}
                    className={`w-full rounded-lg px-3 py-2 font-semibold text-xs border focus:outline-none ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900 focus:border-slate-900'
                        : 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500'
                    }`}
                  >
                    <option value="US">🇺🇸 United States (USPS Domestic Dispatch • Detroit Facility)</option>
                    <option value="UK">🇬🇧 United Kingdom (Royal Mail Tracked 24 • London Facility)</option>
                    <option value="CA">🇨🇦 Canada (Canada Post Expedited • Toronto Facility)</option>
                  </select>
                </div>

                <div>
                  <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full rounded-lg px-3 py-2 border ${
                      isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>Email Address (for POD tracking link)</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className={`w-full rounded-lg px-3 py-2 border ${
                      isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>Delivery Address</label>
                  <input
                    type="text"
                    required
                    placeholder="Street and house number"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className={`w-full rounded-lg px-3 py-2 border ${
                      isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>City</label>
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`w-full rounded-lg px-3 py-2 border ${
                        isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>Postal Code</label>
                    <input
                      type="text"
                      required
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className={`w-full rounded-lg px-3 py-2 border ${
                        isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                      }`}
                    />
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="pt-2">
                  <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>Have a Promo Voucher?</label>
                  <div className="flex space-x-1.5">
                    <input
                      type="text"
                      placeholder="e.g. USA15OFF / UK20OFF"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className={`flex-1 rounded-lg px-3 py-1.5 uppercase font-mono border ${
                        isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-800 border-slate-700 text-white'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={applyPromo}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs ${
                        isLight ? 'bg-slate-900 hover:bg-slate-800 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      }`}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* 2. Select Payment Method */}
                <div className={`pt-3 border-t space-y-2.5 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>
                      Select Payment Method
                    </span>
                    <span className={`text-[10px] flex items-center space-x-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      <Lock className="w-3 h-3 text-emerald-600" />
                      <span>SSL 256-Bit</span>
                    </span>
                  </div>

                  {/* Payment Options Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center space-x-2 ${
                        paymentMethod === 'card'
                          ? isLight ? 'bg-indigo-50 border-indigo-600 text-slate-900 shadow-xs' : 'bg-indigo-950/70 border-indigo-500 text-white shadow-sm'
                          : isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-indigo-600 shrink-0" />
                      <div>
                        <div className="font-bold text-[11px] leading-tight">Card (Stripe)</div>
                        <div className={`text-[9px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Visa, MC, Amex</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple_pay')}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center space-x-2 ${
                        paymentMethod === 'apple_pay'
                          ? isLight ? 'bg-emerald-50 border-emerald-600 text-slate-900 shadow-xs' : 'bg-indigo-950/70 border-indigo-500 text-white shadow-sm'
                          : isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-bold text-[11px] leading-tight">Apple Pay</div>
                        <div className={`text-[9px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>1-Click Express</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center space-x-2 ${
                        paymentMethod === 'paypal'
                          ? isLight ? 'bg-sky-50 border-sky-600 text-slate-900 shadow-xs' : 'bg-indigo-950/70 border-indigo-500 text-white shadow-sm'
                          : isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <Wallet className="w-4 h-4 text-sky-600 shrink-0" />
                      <div>
                        <div className="font-bold text-[11px] leading-tight">PayPal</div>
                        <div className={`text-[9px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Wallet & Pay in 4</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank_transfer')}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center space-x-2 ${
                        paymentMethod === 'bank_transfer'
                          ? isLight ? 'bg-amber-50 border-amber-600 text-slate-900 shadow-xs' : 'bg-indigo-950/70 border-indigo-500 text-white shadow-sm'
                          : isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <Landmark className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <div className="font-bold text-[11px] leading-tight">
                          {currentMarket === 'US' ? 'ACH Transfer' : currentMarket === 'UK' ? 'Faster Payments' : 'Interac e-Transfer'}
                        </div>
                        <div className={`text-[9px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Direct Domestic Bank</div>
                      </div>
                    </button>
                  </div>

                  {/* Sub-Panel: Card Form */}
                  {paymentMethod === 'card' && (
                    <div className={`p-3 rounded-xl border space-y-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                      <div className={`flex justify-between items-center text-[10px] pb-1 border-b ${isLight ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'}`}>
                        <span>Card Details</span>
                        <div className="flex space-x-1.5 font-mono text-[9px]">
                          <span className={`px-1 rounded ${isLight ? 'bg-white text-slate-700 border border-slate-200' : 'bg-slate-800 text-slate-300'}`}>VISA</span>
                          <span className={`px-1 rounded ${isLight ? 'bg-white text-slate-700 border border-slate-200' : 'bg-slate-800 text-slate-300'}`}>MC</span>
                          <span className={`px-1 rounded ${isLight ? 'bg-white text-slate-700 border border-slate-200' : 'bg-slate-800 text-slate-300'}`}>AMEX</span>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Card Number: 4242 •••• •••• 4242"
                        value={cardForm.number}
                        onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                        className={`w-full rounded-lg px-2.5 py-1.5 font-mono text-[11px] border ${
                          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                        }`}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/YY: 12/28"
                          value={cardForm.expiry}
                          onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                          className={`w-full rounded-lg px-2.5 py-1.5 font-mono text-[11px] border ${
                            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                          }`}
                        />
                        <input
                          type="text"
                          placeholder="CVC: 884"
                          value={cardForm.cvc}
                          onChange={(e) => setCardForm({ ...cardForm, cvc: e.target.value })}
                          className={`w-full rounded-lg px-2.5 py-1.5 font-mono text-[11px] border ${
                            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Sub-Panel: Apple Pay */}
                  {paymentMethod === 'apple_pay' && (
                    <div className={`p-3 rounded-xl border text-center space-y-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                      <p className={`text-[11px] ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Pay directly with Apple Touch ID or Face ID</p>
                      <div className="w-full py-2 rounded-xl bg-black text-white font-bold text-xs flex items-center justify-center space-x-2 border border-slate-700">
                        <span>🍏 Pay with Apple Pay</span>
                      </div>
                      <p className="text-[10px] text-emerald-600">Encrypted token verified by Stripe Gateway</p>
                    </div>
                  )}

                  {/* Sub-Panel: PayPal */}
                  {paymentMethod === 'paypal' && (
                    <div className={`p-3 rounded-xl border text-center space-y-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                      <p className={`text-[11px] ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Pay via PayPal Wallet or 4 bi-weekly installments</p>
                      <div className="w-full py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
                        🅿️ PayPal Checkout
                      </div>
                      <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Or 4 interest-free payments of {marketInfo.currency_symbol}{(parseFloat(totalAmount || 0)/4).toFixed(2)}
                      </p>
                    </div>
                  )}

                  {/* Sub-Panel: Bank Transfer Coordinates */}
                  {paymentMethod === 'bank_transfer' && (
                    <div className={`p-3 rounded-xl border space-y-1.5 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                      <div className={`flex justify-between items-center text-[10px] font-bold pb-1 border-b ${
                        isLight ? 'border-slate-200 text-amber-700' : 'border-slate-800 text-amber-400'
                      }`}>
                        <span>
                          {currentMarket === 'US' ? '🇺🇸 JPMorgan Chase ACH Direct' : currentMarket === 'UK' ? '🇬🇧 Barclays Faster Payments' : '🇨🇦 RBC Interac e-Transfer'}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded ${isLight ? 'bg-amber-100 text-amber-800' : 'bg-amber-500/20 text-amber-300'}`}>Merchant Account</span>
                      </div>
                      {currentMarket === 'US' && (
                        <div className={`text-[11px] space-y-0.5 font-mono ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                          <div>Bank: JPMorgan Chase Bank, N.A.</div>
                          <div>Routing Number: <strong className={isLight ? 'text-slate-900' : 'text-white'}>021000021</strong></div>
                          <div>Account Number: <strong className={isLight ? 'text-slate-900' : 'text-white'}>•••• 8920</strong></div>
                          <div>Memo/Ref: <span className={isLight ? 'text-indigo-600' : 'text-indigo-400'}>ORD-US-PRINTFLOW</span></div>
                        </div>
                      )}
                      {currentMarket === 'UK' && (
                        <div className={`text-[11px] space-y-0.5 font-mono ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                          <div>Bank: Barclays Bank UK PLC</div>
                          <div>Sort Code: <strong className={isLight ? 'text-slate-900' : 'text-white'}>20-04-15</strong></div>
                          <div>Account Number: <strong className={isLight ? 'text-slate-900' : 'text-white'}>•••• 4109</strong></div>
                          <div>Status: Instant FPS Clearance</div>
                        </div>
                      )}
                      {currentMarket === 'CA' && (
                        <div className={`text-[11px] space-y-0.5 font-mono ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                          <div>Bank: RBC Royal Bank of Canada</div>
                          <div>Interac Email: <strong className={isLight ? 'text-slate-900' : 'text-white'}>payments@printflow.store</strong></div>
                          <div>Institution: 003 • Transit: 00021</div>
                          <div>Auto-Deposit Enabled</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </form>
            )}

            {/* Success Step */}
            {checkoutStep === 'success' && orderPlacedData && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8 space-y-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isLight ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Order Confirmed!</h3>
                <p className={`text-xs max-w-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  Thank you! Your order <strong className={`font-mono ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>{orderPlacedData.order_number}</strong> has been routed to our production facility.
                </p>

                <div className={`rounded-xl p-4 w-full text-left text-xs space-y-2 border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                }`}>
                  <div className="flex justify-between">
                    <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>POD Hub:</span>
                    <span className={`font-medium text-right ${isLight ? 'text-slate-900' : 'text-white'}`}>{orderPlacedData.pod_fulfillment_hub}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Total Paid:</span>
                    <span className={`font-mono font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>{orderPlacedData.currency} {orderPlacedData.total_amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Status:</span>
                    <span className={isLight ? 'text-emerald-700' : 'text-emerald-400'}>{orderPlacedData.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Payment Rail:</span>
                    <span className={`font-bold capitalize ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                      {orderPlacedData.payment_method ? orderPlacedData.payment_method.replace('_', ' ') : 'Card'} (Settled)
                    </span>
                  </div>
                  {orderPlacedData.transaction_id && (
                    <div className="flex justify-between">
                      <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Transaction ID:</span>
                      <span className={`font-mono text-[10px] ${isLight ? 'text-indigo-600' : 'text-indigo-300'}`}>{orderPlacedData.transaction_id}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setCheckoutStep('cart');
                    setIsCartOpen(false);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold ${
                    isLight ? 'bg-slate-900 hover:bg-slate-800 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  Continue Shopping
                </button>
              </div>
            )}

            {/* Drawer Footer with Totals */}
            {checkoutStep !== 'success' && (
              <div className={`pt-4 space-y-3 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                <div className="space-y-1.5 text-xs">
                  <div className={`flex justify-between ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <span>Subtotal</span>
                    <span className={`font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>{marketInfo.currency_symbol}{subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-pink-600 font-medium">
                      <span>Promo Discount ({discountPercent}%)</span>
                      <span className="font-mono">-{marketInfo.currency_symbol}{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className={`flex justify-between ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <span>{marketInfo.tax_name} ({marketInfo.tax_rate_percent}%)</span>
                    <span className={`font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>{marketInfo.currency_symbol}{taxAmount.toFixed(2)}</span>
                  </div>
                  <div className={`flex justify-between ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    <span>Domestic Shipping</span>
                    <span className={`font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>{marketInfo.currency_symbol}{shippingAmount.toFixed(2)}</span>
                  </div>
                  <div className={`flex justify-between text-sm font-bold pt-2 border-t ${
                    isLight ? 'border-slate-200 text-slate-900' : 'border-slate-800 text-white'
                  }`}>
                    <span>Total ({marketInfo.currency})</span>
                    <span className={`font-mono ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>{marketInfo.currency_symbol}{totalAmount}</span>
                  </div>
                </div>

                {checkoutStep === 'cart' ? (
                  <button
                    disabled={cart.length === 0}
                    onClick={() => setCheckoutStep('checkout')}
                    className={`w-full py-3 rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center space-x-2 disabled:opacity-40 ${
                      isLight ? 'bg-slate-900 hover:bg-slate-800 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                    }`}
                  >
                    <span>Proceed to Checkout</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className={`px-4 py-3 rounded-xl font-bold text-xs ${
                        isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={isCheckingOut}
                      onClick={handleCompleteOrder}
                      className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition flex items-center justify-center space-x-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>{isCheckingOut ? 'Routing to Hub...' : `Pay ${marketInfo.currency_symbol}${totalAmount}`}</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. Customer Reviews Section */}
      {cfg.showReviews && (
        <section className={`py-16 border-t transition-colors ${
          isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-slate-900/40 border-slate-800'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="space-y-2">
              <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{cfg.reviewsTitle}</h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{cfg.reviewsSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {(cfg.reviews || []).map((rev) => (
                <div key={rev.id} className={`rounded-2xl p-6 space-y-3 border shadow-xs ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                }`}>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {rev.comment}
                  </p>
                  <div className={`text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    — {rev.name}, <span className={isLight ? 'text-slate-900 font-bold' : 'text-white'}>{rev.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Footer */}
      <footer className={`py-10 text-xs border-t transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-500' : 'bg-slate-950 border-slate-800 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <span className={`font-extrabold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>{cfg.brandName}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'
                }`}>{cfg.badgeTag}</span>
              </div>
              <p className={`text-[11px] mt-1 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                {cfg.footerTagline}
              </p>
            </div>

            <div className={`flex items-center space-x-6 text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              <a href="#catalog-grid" className={`transition ${isLight ? 'hover:text-slate-900' : 'hover:text-white'}`}>Shop Catalog</a>
              <span className={`cursor-pointer transition ${isLight ? 'hover:text-slate-900' : 'hover:text-white'}`}>Shipping & Returns</span>
              <span className={`cursor-pointer transition ${isLight ? 'hover:text-slate-900' : 'hover:text-white'}`}>Privacy & SAIF</span>
            </div>
          </div>

          <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] ${
            isLight ? 'border-slate-100' : 'border-slate-900'
          }`}>
            <p>{cfg.copyrightText}</p>

            {/* Zero visible admin link for normal shoppers. Only authenticated staff in preview mode can return */}
            <div>
              {isAdminAuthenticated && (
                <button
                  onClick={onEnterAdminStudio}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg transition shadow-xs font-semibold text-[11px] border ${
                    isLight 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' 
                      : 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300 hover:text-white hover:bg-indigo-900/60'
                  }`}
                  title="Switch back to Operations Control Studio"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Return to Admin Studio</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* 9. Customer Payment Toast */}
      {paymentToast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold ${
          paymentToast.type === 'error'
            ? 'bg-rose-950/90 text-rose-200 border-rose-500/40'
            : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{paymentToast.msg}</span>
        </div>
      )}

      {/* 10. Customer Payment Methods Management Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className={`rounded-2xl w-full max-w-lg p-6 shadow-2xl relative my-8 space-y-5 border ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
          }`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between pb-4 border-b ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
              <div className="flex items-center space-x-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                  isLight ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30'
                }`}>
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Customer Payment Methods</h3>
                  <div className={`flex items-center space-x-1.5 text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    <Shield className="w-3 h-3 text-emerald-600" />
                    <span>Bank-Grade 256-Bit SSL Encryption</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className={`p-1 rounded-lg ${isLight ? 'text-slate-400 hover:text-slate-800' : 'text-slate-400 hover:text-white'}`}
              >
                ✕
              </button>
            </div>

            {/* Modal Subtabs: Saved Methods vs + Add New Method */}
            <div className={`flex p-1 rounded-xl border text-xs font-semibold ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <button
                type="button"
                onClick={() => setPaymentModalTab('saved')}
                className={`flex-1 py-2 rounded-lg transition ${
                  paymentModalTab === 'saved'
                    ? isLight ? 'bg-white text-slate-900 shadow-sm font-bold' : 'bg-indigo-600 text-white shadow'
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                Saved Methods ({savedPaymentMethods.length})
              </button>
              <button
                type="button"
                onClick={() => setPaymentModalTab('add')}
                className={`flex-1 py-2 rounded-lg transition ${
                  paymentModalTab === 'add'
                    ? isLight ? 'bg-white text-slate-900 shadow-sm font-bold' : 'bg-indigo-600 text-white shadow'
                    : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                + Add Payment Method
              </button>
            </div>

            {/* View 1: Saved Payment Methods */}
            {paymentModalTab === 'saved' && (
              <div className="space-y-3">
                {savedPaymentMethods.length === 0 ? (
                  <div className={`py-8 text-center text-xs ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                    No payment methods saved yet. Click "+ Add Payment Method" below to add one!
                  </div>
                ) : (
                  savedPaymentMethods.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition ${
                        m.isDefault 
                          ? isLight ? 'bg-emerald-50/50 border-emerald-300 shadow-xs' : 'bg-slate-950 border-emerald-500/50 shadow-sm'
                          : isLight ? 'bg-slate-50 border-slate-200 hover:border-slate-300' : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isLight ? 'bg-white border border-slate-200 text-slate-700' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {m.type === 'card' && <CreditCard className="w-4 h-4 text-indigo-600" />}
                          {m.type === 'apple_pay' && <Smartphone className="w-4 h-4 text-emerald-600" />}
                          {m.type === 'paypal' && <Wallet className="w-4 h-4 text-sky-600" />}
                          {m.type === 'bank_transfer' && <Landmark className="w-4 h-4 text-amber-600" />}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>{m.title}</span>
                            {m.isDefault && (
                              <span className={`px-1.5 py-0.2 rounded-full font-bold text-[9px] border ${
                                isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              }`}>
                                DEFAULT
                              </span>
                            )}
                          </div>
                          <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{m.subtitle}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {!m.isDefault && (
                          <button
                            type="button"
                            onClick={() => handleSetDefaultPayment(m.id)}
                            className={`text-[11px] px-2.5 py-1 rounded-lg transition font-semibold ${
                              isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                            }`}
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteSavedPayment(m.id)}
                          className={`p-1.5 rounded-lg transition ${
                            isLight ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-50' : 'text-slate-500 hover:text-rose-400 hover:bg-rose-950/30'
                          }`}
                          title="Remove method"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}

                <button
                  type="button"
                  onClick={() => setPaymentModalTab('add')}
                  className={`w-full py-2.5 rounded-xl border border-dashed text-xs font-semibold flex items-center justify-center space-x-1.5 transition ${
                    isLight
                      ? 'border-slate-300 hover:border-slate-500 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      : 'border-slate-700 hover:border-indigo-500 text-slate-400 hover:text-white'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Another Card or Bank Rail</span>
                </button>
              </div>
            )}

            {/* View 2: Add New Payment Method Form */}
            {paymentModalTab === 'add' && (
              <form onSubmit={handleSavePaymentMethod} className="space-y-4 text-xs">
                {/* Method Selector Pills */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setAddPaymentType('card')}
                    className={`p-2 rounded-xl border text-center transition flex flex-col items-center space-y-1 ${
                      addPaymentType === 'card'
                        ? isLight ? 'bg-indigo-50 border-indigo-600 text-slate-900' : 'bg-indigo-950/70 border-indigo-500 text-white'
                        : isLight ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    <span className="text-[10px] font-bold">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAddPaymentType('apple_pay')}
                    className={`p-2 rounded-xl border text-center transition flex flex-col items-center space-y-1 ${
                      addPaymentType === 'apple_pay'
                        ? isLight ? 'bg-emerald-50 border-emerald-600 text-slate-900' : 'bg-indigo-950/70 border-indigo-500 text-white'
                        : isLight ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] font-bold">Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAddPaymentType('paypal')}
                    className={`p-2 rounded-xl border text-center transition flex flex-col items-center space-y-1 ${
                      addPaymentType === 'paypal'
                        ? isLight ? 'bg-sky-50 border-sky-600 text-slate-900' : 'bg-indigo-950/70 border-indigo-500 text-white'
                        : isLight ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Wallet className="w-4 h-4 text-sky-600" />
                    <span className="text-[10px] font-bold">PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAddPaymentType('bank_transfer')}
                    className={`p-2 rounded-xl border text-center transition flex flex-col items-center space-y-1 ${
                      addPaymentType === 'bank_transfer'
                        ? isLight ? 'bg-amber-50 border-amber-600 text-slate-900' : 'bg-indigo-950/70 border-indigo-500 text-white'
                        : isLight ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Landmark className="w-4 h-4 text-amber-600" />
                    <span className="text-[10px] font-bold">Bank ACH</span>
                  </button>
                </div>

                {/* Subform: Card */}
                {addPaymentType === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>Name on Card</label>
                      <input
                        type="text"
                        placeholder="e.g. Alex Morgan"
                        value={newCardData.name}
                        onChange={(e) => setNewCardData({ ...newCardData, name: e.target.value })}
                        className={`w-full rounded-xl px-3 py-2 border ${
                          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>Card Number</label>
                      <input
                        type="text"
                        placeholder="5500 •••• •••• 8892"
                        value={newCardData.number}
                        onChange={(e) => setNewCardData({ ...newCardData, number: e.target.value })}
                        className={`w-full rounded-xl px-3 py-2 font-mono border ${
                          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>Expiration (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="08/29"
                          value={newCardData.expiry}
                          onChange={(e) => setNewCardData({ ...newCardData, expiry: e.target.value })}
                          className={`w-full rounded-xl px-3 py-2 font-mono border ${
                            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>CVC / CVV</label>
                        <input
                          type="text"
                          placeholder="419"
                          value={newCardData.cvc}
                          onChange={(e) => setNewCardData({ ...newCardData, cvc: e.target.value })}
                          className={`w-full rounded-xl px-3 py-2 font-mono border ${
                            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Subform: Apple Pay */}
                {addPaymentType === 'apple_pay' && (
                  <div className={`p-4 rounded-xl text-center space-y-3 border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                  }`}>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Click below to link this browser session with your Apple Wallet for one-touch checkout across all your POD orders.
                    </p>
                    <div className="p-3 bg-black text-white font-bold rounded-xl flex items-center justify-center space-x-2 border border-slate-700">
                      <span>🍏 Connect Apple Wallet</span>
                    </div>
                    <p className="text-[10px] text-emerald-600">Zero card numbers exposed to merchant</p>
                  </div>
                )}

                {/* Subform: PayPal */}
                {addPaymentType === 'paypal' && (
                  <div className="space-y-3">
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Enter your PayPal registered email to link your account:
                    </p>
                    <div>
                      <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>PayPal Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@example.com"
                        value={newCardData.paypalEmail}
                        onChange={(e) => setNewCardData({ ...newCardData, paypalEmail: e.target.value })}
                        className={`w-full rounded-xl px-3 py-2 border ${
                          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Subform: Bank Transfer */}
                {addPaymentType === 'bank_transfer' && (
                  <div className="space-y-3">
                    <div className={`p-3 rounded-xl border ${
                      isLight ? 'bg-amber-50 border-amber-200' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <span className={`font-bold text-xs block mb-1 ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                        {currentMarket === 'US' ? '🇺🇸 Link US ACH Checking' : currentMarket === 'UK' ? '🇬🇧 UK Open Banking / Sort Code' : '🇨🇦 Canada Interac Direct'}
                      </span>
                      <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {currentMarket === 'US'
                          ? 'Provide your domestic bank account for automatic direct-debit clearing.'
                          : currentMarket === 'UK'
                          ? 'Authorize instant Faster Payments clearance directly from your UK bank.'
                          : 'Connect your Canadian financial institution for instant e-Transfer.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                          {currentMarket === 'US' ? 'Routing (ABA)' : currentMarket === 'UK' ? 'Sort Code' : 'Institution & Transit'}
                        </label>
                        <input
                          type="text"
                          placeholder={currentMarket === 'US' ? '021000021' : currentMarket === 'UK' ? '20-04-15' : '003-00021'}
                          value={newCardData.bankRouting}
                          onChange={(e) => setNewCardData({ ...newCardData, bankRouting: e.target.value })}
                          className={`w-full rounded-xl px-3 py-2 font-mono border ${
                            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block mb-1 ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>Account Number</label>
                        <input
                          type="text"
                          placeholder="•••• 8920"
                          value={newCardData.bankAccount}
                          onChange={(e) => setNewCardData({ ...newCardData, bankAccount: e.target.value })}
                          className={`w-full rounded-xl px-3 py-2 font-mono border ${
                            isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className={`flex justify-end space-x-2 pt-3 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
                  <button
                    type="button"
                    onClick={() => setPaymentModalTab('saved')}
                    className={`px-4 py-2 rounded-xl ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-sm"
                  >
                    Save & Set as Default
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
