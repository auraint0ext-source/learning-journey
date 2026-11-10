import React, { useState, useEffect, useMemo } from 'react';
import { API_BASE } from '../config';
import { 
  ShoppingBag, Star, ShieldCheck, Truck, ArrowRight, X, 
  Check, Heart, Sparkles, Plus, Minus, CreditCard, ChevronRight, ChevronLeft, CheckCircle2, Lock, Settings,
  ShoppingCart, Landmark, Smartphone, Wallet, Building2, Copy, DollarSign, Trash2, Shield,
  Sun, Moon, SlidersHorizontal, Search, ChevronDown, Layers, Briefcase, Shirt, Coffee, Image, Tag, BadgePercent, Package, Quote,
  UploadCloud, Palette, FileText, Eye, CheckCircle, ArrowLeft, RefreshCw,
  Globe, MessageCircle, MessageSquare, Send, User, Bot, Headphones, Instagram, Facebook, Twitter, Linkedin, Youtube
} from 'lucide-react';

import { DEFAULT_STOREFRONT_CONFIG } from '../config/storefrontConfig';
import { DEFAULT_CATALOG_PRODUCTS } from '../config/catalogProducts';
import { getTypographyInlineStyle } from './WordDocsTypographyToolbar';

const SAMPLE_VISTA_TEMPLATES = [
  {
    id: 'tpl-minimal-gold',
    name: 'Minimalist Monogram Gold',
    category: 'Executive & Corporate',
    preview: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
    description: 'Ultra-clean sans-serif typography with foil monogram accents.'
  },
  {
    id: 'tpl-creative-bold',
    name: 'Modern Studio Contrast',
    category: 'Design & Agency',
    preview: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    description: 'Bold asymmetric layout ideal for creative professionals and architects.'
  },
  {
    id: 'tpl-holiday-pine',
    name: 'Festive Pine & Winter Gold',
    category: 'Holiday & Celebration',
    preview: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=600&q=80',
    description: 'Classic festive botanicals with metallic typography highlights.'
  },
  {
    id: 'tpl-artisan-kraft',
    name: 'Artisan Workshop Natural',
    category: 'Handcrafted & Retail',
    preview: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=600&q=80',
    description: 'Rustic handcrafted badge layout calibrated for uncoated craft stock.'
  },
  {
    id: 'tpl-tech-gradient',
    name: 'Cyberpunk Aurora Luxe',
    category: 'Technology & Startups',
    preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Dark mode grid with luminous gradient accents for tech innovators.'
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

  // Mega Menu Typography & Spacing Dynamic Calculations
  const menuBarFontSizeClass = {
    xs: 'text-[11px]',
    sm: 'text-xs',
    base: 'text-[13px]',
    lg: 'text-sm'
  }[cfg.menuBarFontSize || 'sm'] || 'text-xs';

  const menuBarItemSpacingClass = {
    compact: 'space-x-1',
    normal: 'space-x-1 sm:space-x-1.5',
    relaxed: 'space-x-2 sm:space-x-2.5'
  }[cfg.menuBarItemSpacing || 'normal'] || 'space-x-1 sm:space-x-1.5';

  const dropdownPaddingClass = {
    compact: 'py-4',
    normal: 'py-6',
    spacious: 'py-8'
  }[cfg.dropdownPadding || 'normal'] || 'py-6';

  const dropdownColumnGapClass = {
    compact: 'gap-4',
    normal: 'gap-6',
    spacious: 'gap-8'
  }[cfg.dropdownColumnGap || 'normal'] || 'gap-6';

  const dropdownHeadingFontSizeClass = {
    xs: 'text-[10px]',
    sm: 'text-[11px]',
    base: 'text-xs',
    lg: 'text-sm'
  }[cfg.dropdownHeadingFontSize || 'sm'] || 'text-[11px]';

  const dropdownItemFontSizeClass = {
    xs: 'text-[11px]',
    sm: 'text-xs',
    base: 'text-[13px]',
    lg: 'text-sm'
  }[cfg.dropdownItemFontSize || 'sm'] || 'text-xs';

  const dropdownItemSpacingClass = {
    compact: 'space-y-0.5',
    normal: 'space-y-1',
    spacious: 'space-y-2'
  }[cfg.dropdownItemSpacing || 'normal'] || 'space-y-1';

  const dropdownItemPaddingClass = {
    compact: 'py-1 px-1.5',
    normal: 'py-1.5 px-2',
    spacious: 'py-2 px-2.5'
  }[cfg.dropdownItemSpacing || 'normal'] || 'py-1.5 px-2';

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
  const [selectedPaperStock, setSelectedPaperStock] = useState('Premium 16pt Matte');
  const [selectedCorner, setSelectedCorner] = useState('Standard Rectangular (3.5" x 2")');
  const [activeOrderingFlow, setActiveOrderingFlow] = useState('configurator'); // 'configurator' | 'templates' | 'upload'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [uploadedArtwork, setUploadedArtwork] = useState(null);
  const [activeMockupView, setActiveMockupView] = useState('front'); // 'front' | 'back' | 'lifestyle'
  const [proofApproved, setProofApproved] = useState(true);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [templateSearch, setTemplateSearch] = useState('');
  const [templateFilter, setTemplateFilter] = useState('All');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [orderPlacedData, setOrderPlacedData] = useState(null);

  // Requirement 2: Language Selector State
  const [activeLanguage, setActiveLanguage] = useState(() => {
    return cfg.defaultLanguage || 'en';
  });
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const activeLanguageObj = useMemo(() => {
    const list = cfg.languages || DEFAULT_STOREFRONT_CONFIG.languages || [];
    return list.find(l => l.code === activeLanguage) || list[0] || { code: 'en', name: 'English (US)', flag: '🇺🇸' };
  }, [cfg.languages, activeLanguage]);

  // Requirement 1: Storefront Live Chat & Human Moderator State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHumanModerator, setIsHumanModerator] = useState(false);
  const [isChatTyping, setIsChatTyping] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState(() => [
    {
      id: 1,
      sender: 'bot',
      name: cfg.chatBotName || 'PrintFlow AI Assistant',
      avatar: '🤖',
      text: cfg.chatWelcomeMessage || 'Hi there! 👋 Welcome to PrintFlow. How can I help you today with your custom prints or domestic shipping?',
      time: 'Just now'
    }
  ]);

  const handleTransferToHuman = () => {
    if (isHumanModerator) return;
    setIsChatTyping(true);
    setChatMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'system',
        text: 'Connecting you with an active Human Support Moderator... ⏳',
        time: 'Just now'
      }
    ]);

    setTimeout(() => {
      setIsChatTyping(false);
      setIsHumanModerator(true);
      const modName = cfg.chatModeratorName || 'Sarah Jenkins (Senior Support Moderator)';
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'human',
          name: modName,
          avatar: '👩‍💼',
          text: `Hello! I am ${modName}. I have joined your chat to assist with custom quotes, specialized POD specs, or any order inquiries. How can I help you?`,
          time: 'Just now'
        }
      ]);
    }, 1200);
  };

  const handleSendChatMessage = (e) => {
    if (e) e.preventDefault();
    const query = chatInput.trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: 'Just now'
    };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    const lower = query.toLowerCase();
    if (lower.includes('human') || lower.includes('moderator') || lower.includes('agent') || lower.includes('representative') || lower.includes('person') || lower.includes('operator')) {
      handleTransferToHuman();
      return;
    }

    setIsChatTyping(true);
    setTimeout(() => {
      setIsChatTyping(false);
      let replyText = '';
      if (isHumanModerator) {
        replyText = "Thank you for reaching out! I've noted your question and I'm reviewing the domestic hub queue. Feel free to provide any specific quantity or mock-up files.";
      } else {
        if (lower.includes('shipping') || lower.includes('courier') || lower.includes('delivery') || lower.includes('time')) {
          replyText = "We print and dispatch 100% domestically! USA orders ship via USPS/FedEx in 2-3 business days. UK orders ship via Royal Mail. Canada orders ship via Canada Post. Zero import taxes or customs delay!";
        } else if (lower.includes('discount') || lower.includes('coupon') || lower.includes('deal') || lower.includes('save') || lower.includes('price')) {
          replyText = `Use promo code "FESTIVE25" at checkout to get 25% off holiday cards, calendars & merch! We also provide tiered volume wholesale discounts up to 25% off for 25+ units.`;
        } else if (lower.includes('track') || lower.includes('order')) {
          replyText = "You can track any live order instantly in the Orders tab or enter your Order # here. All packages include direct domestic courier tracking links.";
        } else if (lower.includes('sample') || lower.includes('paper') || lower.includes('stock')) {
          replyText = "We offer premium 16pt Soft-Touch Matte, 18pt Foil-Stamped Luxe, Heavyweight Cotton Apparel, and Gallery Canvas. You can also request a free sample kit in the Deals menu!";
        } else {
          replyText = "Thanks for your question! We specialize in premium print-on-demand goods across 4 domestic hubs. If you need dedicated assistance, click 'Transfer to Human Moderator' below anytime!";
        }
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: isHumanModerator ? 'human' : 'bot',
          name: isHumanModerator ? (cfg.chatModeratorName || 'Sarah Jenkins') : (cfg.chatBotName || 'PrintFlow AI Assistant'),
          avatar: isHumanModerator ? '👩‍💼' : '🤖',
          text: replyText,
          time: 'Just now'
        }
      ]);
    }, 800);
  };

  // Vista Mega Menu Hover & Smooth Delay State
  const megaMenuTimeoutRef = React.useRef(null);

  const handleSubmenuItemClick = (categoryKey, itemName, columnHeading) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setActiveMegaMenu(null);

    const lowerItem = (itemName || '').toLowerCase();
    
    // 1. Find product matching title or tags
    let matched = products.find(p => 
      p.title.toLowerCase().includes(lowerItem) ||
      (p.tags && p.tags.some(t => lowerItem.includes(t.toLowerCase()) || t.toLowerCase().includes(lowerItem)))
    );

    // 2. Fallback: match by category
    if (!matched) {
      const catMatches = products.filter(p => p.category.toLowerCase() === categoryKey.toLowerCase());
      if (catMatches.length > 0) {
        matched = {
          ...catMatches[0],
          id: `custom-${Date.now()}`,
          title: lowerItem.includes('card') || lowerItem.includes('calendar') || lowerItem.includes('mug') || lowerItem.includes('banner') || lowerItem.includes('hoodie') || lowerItem.includes('poster') || lowerItem.includes('sticker')
            ? itemName
            : `${itemName} - ${catMatches[0].title}`,
          configuredSubcategory: itemName,
          configuredCategory: categoryKey,
          configuredColumn: columnHeading
        };
      } else {
        matched = {
          id: `custom-${Date.now()}`,
          title: itemName,
          category: categoryKey,
          base_price_usd: 19.99,
          image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=700&q=80',
          sku: `VP-${categoryKey.substring(0,3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
          supplier: 'PrintFlow Domestic Hub',
          in_stock: true,
          description: `Custom ${itemName} printed on premium domestic POD stock with precision edge trim.`
        };
      }
    }

    // 3. Preselect appropriate stock/finish/corners based on clicked submenu
    if (lowerItem.includes('uncoated')) {
      setSelectedPaperStock('Uncoated 16pt (Writable)');
      setSelectedFinish('Uncoated Tactile');
    } else if (lowerItem.includes('foil') || lowerItem.includes('metallic') || lowerItem.includes('embossed')) {
      setSelectedPaperStock('18pt Luxe Foil-Stamped');
      setSelectedFinish('Gold Foil Embossed');
    } else if (lowerItem.includes('linen')) {
      setSelectedPaperStock('15pt Woven Italian Linen');
      setSelectedFinish('Textured Linen');
    } else if (lowerItem.includes('gloss')) {
      setSelectedPaperStock('Premium 16pt Glossy');
      setSelectedFinish('Glossy UV');
    } else if (lowerItem.includes('matte')) {
      setSelectedPaperStock('Premium 16pt Matte');
      setSelectedFinish('Matte Soft-Touch');
    } else if (lowerItem.includes('kraft') || lowerItem.includes('eco') || lowerItem.includes('recycled')) {
      setSelectedPaperStock('18pt Recycled Brown Kraft');
      setSelectedFinish('Natural Uncoated');
    } else {
      setSelectedPaperStock('Premium 16pt Matte');
      setSelectedFinish('Matte');
    }

    if (lowerItem.includes('rounded')) {
      setSelectedCorner('Rounded Corners (1/4" Radius)');
    } else if (lowerItem.includes('square')) {
      setSelectedCorner('Square Format (2.5" x 2.5")');
    } else {
      setSelectedCorner('Standard Rectangular (3.5" x 2")');
    }

    // Default quantity
    if (categoryKey.toLowerCase() === 'marketing' || categoryKey.toLowerCase() === 'holiday' || lowerItem.includes('card')) {
      setModalQuantity(100);
    } else {
      setModalQuantity(1);
    }

    setActiveMockupView('front');
    setSelectedTemplate(null);
    setUploadedArtwork(null);
    setActiveOrderingFlow('configurator');
    setSelectedProduct(matched);
  };

  // 3D Luxury Boutique Parallax Motion Scroll Listener
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Compute 3D Depth Zoom factor based on scroll
  const scrollRatio = Math.min(1, Math.max(0, scrollY / 2200));
  const boutiqueZoomScale = (1.02 + scrollRatio * 0.15).toFixed(3);
  const boutiqueTranslateY = (scrollRatio * -30).toFixed(1);

  // Venue image selection
  const venueImage = cfg.luxuryBgVenue === 'flagship'
    ? 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=2000&q=80'
    : cfg.luxuryBgVenue === 'workshop'
    ? 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=2000&q=80'
    : 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80';

  const blurAmount = cfg.luxuryBgBlur === 'subtle' ? '10px' : cfg.luxuryBgBlur === 'deep' ? '22px' : '15px';

  const handleMenuMouseEnter = (idx) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    setActiveMegaMenu(idx);
  };

  const handleMenuMouseLeave = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 280);
  };

  const handlePanelMouseEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
  };

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

  // Add to Cart with bulk discount support and VistaPrint custom options
  const handleAddToCart = (
    product, 
    size = selectedSize, 
    color = selectedColor, 
    qty = modalQuantity, 
    finish = selectedFinish,
    paperStock = selectedPaperStock,
    corner = selectedCorner,
    template = selectedTemplate,
    artwork = uploadedArtwork
  ) => {
    const rawPrice = parseFloat(getPrice(product.base_price_usd));
    const bulkDiscount = getBulkDiscountPercent(qty);
    const unitPrice = parseFloat((rawPrice * (1 - bulkDiscount / 100)).toFixed(2));

    setCart((prev) => {
      const existing = prev.find((item) => 
        item.product_id === product.id && 
        item.size === size && 
        item.color === color && 
        item.finish === finish &&
        item.paperStock === paperStock &&
        item.corner === corner
      );
      if (existing) {
        return prev.map((item) =>
          item.product_id === product.id && 
          item.size === size && 
          item.color === color && 
          item.finish === finish &&
          item.paperStock === paperStock &&
          item.corner === corner
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}-${Math.random()}`,
          product_id: product.id,
          title: product.title,
          unit_price: unitPrice,
          image_url: template?.preview || artwork?.previewUrl || product.image_url,
          size,
          color,
          finish,
          paperStock,
          corner,
          template: template ? template.name : null,
          artwork: artwork ? artwork.name : null,
          quantity: qty,
          supplier: product.supplier
        }
      ];
    });
    setSelectedProduct(null);
    setActiveOrderingFlow('configurator');
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
      } else {
        throw new Error('API returned status ' + res.status);
      }
    } catch (err) {
      console.warn('Backend server unavailable, completing simulated local order for demo:', err);
      const simulatedOrder = {
        order_id: `ORD-DEMO-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'Confirmed & Sent to Domestic POD Production Hub',
        customer_name: customerName,
        customer_email: customerEmail,
        total_amount: grandTotal,
        currency: marketInfo.currency
      };
      setOrderPlacedData(simulatedOrder);
      setCheckoutStep('success');
      setCart([]);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const filteredProducts = React.useMemo(() => {
    let list = [...products];

    if (activeCategory === 'All') {
      list = [...products];
    } else if (activeCategory.toLowerCase() === 'deals') {
      list = products.filter((p) => 
        p.base_price_usd < 25 || 
        (p.tags && (p.tags.includes('holiday') || p.tags.includes('stickers') || p.tags.includes('business cards'))) ||
        p.category === 'Holiday'
      );
    } else if (activeCategory.toLowerCase() === 'holiday') {
      list = products.filter((p) => 
        p.category.toLowerCase() === 'holiday' || 
        (p.tags && p.tags.includes('holiday')) ||
        p.title.toLowerCase().includes('holiday') || 
        p.title.toLowerCase().includes('christmas') ||
        p.title.toLowerCase().includes('card')
      );
    } else if (activeCategory.toLowerCase() === 'gifts') {
      list = products.filter((p) => 
        p.category.toLowerCase() === 'gifts' ||
        p.category.toLowerCase().includes('home') || 
        p.category.toLowerCase().includes('wall') ||
        (p.tags && (p.tags.includes('gifts') || p.tags.includes('calendar') || p.tags.includes('mug'))) ||
        p.title.toLowerCase().includes('calendar') ||
        p.title.toLowerCase().includes('mug') || 
        p.title.toLowerCase().includes('tumbler') ||
        p.title.toLowerCase().includes('tote') ||
        p.title.toLowerCase().includes('canvas')
      );
    } else if (activeCategory.toLowerCase().includes('sign') || activeCategory.toLowerCase().includes('banner')) {
      list = products.filter((p) => 
        p.category.toLowerCase().includes('sign') ||
        p.category.toLowerCase().includes('banner') ||
        (p.tags && (p.tags.includes('signs') || p.tags.includes('banner') || p.tags.includes('yard sign'))) ||
        p.title.toLowerCase().includes('banner') ||
        p.title.toLowerCase().includes('sign')
      );
    } else if (activeCategory.toLowerCase() === 'apparel') {
      list = products.filter((p) => 
        p.category.toLowerCase() === 'apparel' ||
        (p.tags && (p.tags.includes('apparel') || p.tags.includes('clothing') || p.tags.includes('hoodie'))) ||
        p.title.toLowerCase().includes('hoodie') ||
        p.title.toLowerCase().includes('shirt') ||
        p.title.toLowerCase().includes('cap')
      );
    } else if (activeCategory.toLowerCase() === 'accessories') {
      list = products.filter((p) => 
        p.category.toLowerCase() === 'accessories' ||
        (p.tags && (p.tags.includes('accessories') || p.tags.includes('stickers') || p.tags.includes('packaging'))) ||
        p.title.toLowerCase().includes('sticker') ||
        p.title.toLowerCase().includes('box') ||
        p.title.toLowerCase().includes('case') ||
        p.title.toLowerCase().includes('label')
      );
    } else {
      list = products.filter((p) => 
        p.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
        p.title.toLowerCase().includes(activeCategory.toLowerCase()) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase())))
      );
    }

    // Vista Live Search query filter (smart keyword and exact matching)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const queryWords = q.replace(/[()",.\-–—/]/g, ' ').split(/\s+/).filter(w => w.length > 2);
      
      const matched = list.filter((p) => {
        const text = `${p.title} ${p.category} ${p.description || ''} ${(p.tags || []).join(' ')} ${p.sku}`.toLowerCase();
        if (text.includes(q)) return true;
        return queryWords.some(w => text.includes(w));
      });

      // If specific products match, show them. If query is a broad promo/sample or code, retain the active category
      if (matched.length > 0) {
        list = matched;
      }
    }

    if (sortBy === 'price_asc') {
      list.sort((a, b) => a.base_price_usd - b.base_price_usd);
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => b.base_price_usd - a.base_price_usd);
    } else if (sortBy === 'popular') {
      list.sort((a, b) => (b.id % 5) - (a.id % 5) || b.id - a.id);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => b.id - a.id);
    }
    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 relative overflow-x-clip ${
      isLight ? (cfg.enableLuxury3dBackground ? 'bg-transparent text-slate-900' : 'bg-[#f8f9fa] text-slate-900') : 'bg-slate-950 text-slate-100'
    }`}>
      {/* 3D Luxury Boutique Atelier Parallax Glass Background */}
      {cfg.enableLuxury3dBackground !== false && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute -inset-10 bg-cover bg-center transition-transform duration-300 ease-out will-change-transform"
            style={{
              backgroundImage: `url('${venueImage}')`,
              filter: isLight 
                ? `blur(${blurAmount}) brightness(0.97) saturate(1.15)` 
                : `blur(${blurAmount}) brightness(0.38) saturate(1.2)`,
              transform: cfg.luxuryBgDepth !== 'fixed' ? `scale(${boutiqueZoomScale}) translateY(${boutiqueTranslateY}px)` : 'scale(1.05)',
              transformOrigin: 'center center'
            }}
          />
          {/* Dynamic Frosted Glass Tint Overlay powered by Admin 0-100% Slider */}
          <div 
            className="absolute inset-0 transition-all duration-300 pointer-events-none" 
            style={{
              backgroundColor: isLight 
                ? `rgba(255, 255, 255, ${(cfg.luxuryBgGlassOpacity ?? 25) / 100})` 
                : `rgba(2, 6, 23, ${Math.min(0.95, ((cfg.luxuryBgGlassOpacity ?? 25) + 35) / 100)})`,
              backdropFilter: `blur(${blurAmount})`,
              WebkitBackdropFilter: `blur(${blurAmount})`
            }} 
          />
        </div>
      )}

      {/* 1. Customer Top Announcement Bar */}
      {cfg.showAnnouncement && (
        <div className={`relative z-10 text-[11px] py-1.5 px-4 sm:px-8 lg:px-12 flex items-center justify-between w-full transition-colors ${
          isLight 
            ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 text-slate-700' 
            : 'bg-gradient-to-r from-indigo-950/90 via-purple-950/90 to-indigo-950/90 border-b border-indigo-500/20 text-white backdrop-blur-md'
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
          <div className="hidden sm:flex items-center space-x-4 text-[10px]">
            <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>{cfg.announcementFacilities}</span>
            {/* Popular Social Media Icons (Requirement 4) */}
            {cfg.showSocialIcons !== false && (
              <div className="flex items-center space-x-2 pl-3 border-l border-slate-300 dark:border-slate-700">
                <a href={cfg.socialLinks?.instagram || 'https://instagram.com/printflow'} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition opacity-80 hover:opacity-100" title="Instagram">
                  <Instagram className="w-3 h-3" />
                </a>
                <a href={cfg.socialLinks?.facebook || 'https://facebook.com/printflow'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition opacity-80 hover:opacity-100" title="Facebook">
                  <Facebook className="w-3 h-3" />
                </a>
                <a href={cfg.socialLinks?.twitter || 'https://x.com/printflow'} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition opacity-80 hover:opacity-100" title="X (Twitter)">
                  <Twitter className="w-3 h-3" />
                </a>
                <a href={cfg.socialLinks?.youtube || 'https://youtube.com/@printflow'} target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition opacity-80 hover:opacity-100" title="YouTube">
                  <Youtube className="w-3 h-3" />
                </a>
                <a href={cfg.socialLinks?.pinterest || 'https://pinterest.com/printflow'} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition opacity-80 hover:opacity-100" title="LinkedIn">
                  <Linkedin className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Customer Navigation Header with VistaPrint Global Search & Frozen Mega Menu Bar (Requirement 7) */}
      <nav 
        className={`sticky top-0 z-40 w-full transition-shadow duration-200 border-b ${
          isLight 
            ? 'bg-white/95 backdrop-blur-md border-slate-200/80 shadow-xs' 
            : 'bg-slate-900/95 backdrop-blur-md border-slate-800 shadow-md shadow-black/20'
        }`}
        style={{ backgroundColor: isLight ? '#ffffff' : undefined }}
      >
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

          {/* Right Action Icons: Language Selector, Currency Selector, Theme Toggle, Payment Modal, Cart */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Language Selector Dropdown (Requirement 2 & 3) */}
            {cfg.showLanguageSelector !== false && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    isLight 
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                  title="Select Storefront Language"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="font-mono text-[11px] uppercase font-bold">
                    {activeLanguageObj.flag} {activeLanguageObj.code}
                  </span>
                  <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLanguageOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsLanguageOpen(false)} 
                    />
                    <div className={`absolute right-0 mt-1.5 w-48 rounded-xl shadow-2xl border py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100 ${
                      isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-white'
                    }`}>
                      <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                        Select Language
                      </div>
                      <div className="max-h-60 overflow-y-auto py-1">
                        {(cfg.languages || DEFAULT_STOREFRONT_CONFIG.languages).map(lang => (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => {
                              setActiveLanguage(lang.code);
                              setIsLanguageOpen(false);
                            }}
                            className={`w-full px-3 py-1.5 text-left flex items-center justify-between transition cursor-pointer ${
                              activeLanguage === lang.code
                                ? isLight ? 'bg-indigo-50 text-indigo-600 font-bold' : 'bg-indigo-950/60 text-indigo-300 font-bold'
                                : isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="flex items-center space-x-2">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </span>
                            {activeLanguage === lang.code && <Check className="w-3.5 h-3.5 text-indigo-500" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

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

        {/* VistaPrint Full-Width Mega Menu Bar (Requirement 7: Frozen with Header) */}
        {cfg.showMegaMenu !== false && (
          <div 
            className={`relative border-t transition-colors ${
              isLight ? 'bg-white border-slate-100' : 'bg-slate-950/90 border-slate-800/80'
            }`}
            style={{ backgroundColor: isLight ? '#ffffff' : undefined }}
            onMouseLeave={handleMenuMouseLeave}
          >
            <div 
              className={`w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto no-scrollbar ${menuBarFontSizeClass} font-semibold py-1`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className={`flex items-center ${menuBarItemSpacingClass}`}>
                <button
                  onClick={() => { setActiveCategory('All'); setSearchQuery(''); setActiveMegaMenu(null); }}
                  className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                    activeCategory === 'All' && !searchQuery
                      ? isLight ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/60' : 'bg-indigo-600 text-white font-bold'
                      : isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:bg-slate-800'
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
                    >
                      <button
                        onMouseEnter={() => handleMenuMouseEnter(idx)}
                        onMouseLeave={handleMenuMouseLeave}
                        onClick={() => {
                          setActiveCategory(menu.categoryKey);
                          setActiveMegaMenu(isOpen ? null : idx);
                        }}
                        className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 whitespace-nowrap ${
                          isOpen || isCatActive
                            ? isLight ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/60' : 'bg-indigo-600 text-white font-bold'
                            : isLight ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-900' : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{menu.title}</span>
                        {menu.badge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full leading-none ${
                            menu.badge.includes('%') || menu.badge.toLowerCase().includes('sale')
                              ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                          }`}>
                            {menu.badge}
                          </span>
                        )}
                        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
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

            {/* VistaPrint Full-Width Mega Flyout Panel */}
            {activeMegaMenu !== null && (cfg.megaMenuCategories || DEFAULT_STOREFRONT_CONFIG.megaMenuCategories)[activeMegaMenu] && (() => {
              const currentMenu = (cfg.megaMenuCategories || DEFAULT_STOREFRONT_CONFIG.megaMenuCategories)[activeMegaMenu];
              const cols = currentMenu.columns || [
                { heading: 'Popular Items', items: currentMenu.subcategories || [] }
              ];
              const promo = currentMenu.promo;

              return (
                <div 
                  className={`absolute top-full left-0 right-0 z-50 border-b shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-top-1 ${
                    isLight 
                      ? 'bg-white border-slate-200/80 text-slate-900 shadow-slate-300/40' 
                      : 'bg-slate-900 border-slate-800 text-white shadow-black/80'
                  }`}
                  style={{ backgroundColor: isLight ? '#ffffff' : '#0f172a' }}
                  onMouseEnter={handlePanelMouseEnter}
                  onMouseLeave={handleMenuMouseLeave}
                >
                  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${dropdownPaddingClass}`}>
                    <div className={`grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 ${dropdownColumnGapClass}`}>
                      {/* Subcategory Columns */}
                      {cols.map((col, cIdx) => (
                        <div key={cIdx} className="space-y-2.5">
                          <h4 
                            style={getTypographyInlineStyle(cfg?.typography?.megaMenuHeadings)}
                            className={`${dropdownHeadingFontSizeClass} font-extrabold uppercase tracking-wider text-indigo-500 pb-1.5 border-b border-slate-200 dark:border-slate-800`}
                          >
                            {col.heading}
                          </h4>
                          <ul className={dropdownItemSpacingClass}>
                            {col.items.map((item, iIdx) => (
                              <li key={iIdx}>
                                <button
                                  onClick={() => handleSubmenuItemClick(currentMenu.categoryKey, item, col.heading)}
                                  style={getTypographyInlineStyle(cfg?.typography?.megaMenuItems)}
                                  className={`${dropdownItemFontSizeClass} text-left w-full ${dropdownItemPaddingClass} rounded-lg transition flex items-center justify-between group ${
                                    isLight 
                                      ? 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100' 
                                      : 'text-slate-300 hover:text-indigo-400 hover:bg-slate-800'
                                  }`}
                                >
                                  <span className="font-medium group-hover:translate-x-0.5 transition-transform">{item}</span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 ml-1 shrink-0" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {/* Featured Promotional Visual Card */}
                      {promo && (
                        <div className={`p-4 rounded-2xl border flex flex-col justify-between shadow-sm ${
                          isLight ? 'bg-gradient-to-br from-indigo-50/60 via-white to-indigo-50/20 border-indigo-100' : 'bg-gradient-to-br from-indigo-950/40 to-slate-900 border-indigo-900/40'
                        }`}>
                          <div>
                            <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 shadow-md">
                              <img src={promo.image} alt={promo.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                              {promo.code && (
                                <span className="absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500 text-white shadow-md">
                                  CODE: {promo.code}
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                              {promo.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                              {promo.subtitle}
                            </p>
                          </div>

                          <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-800">
                            <button
                              onClick={() => {
                                setActiveCategory(currentMenu.categoryKey);
                                setSearchQuery('');
                                setActiveMegaMenu(null);
                                const el = document.getElementById('catalog-grid');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow"
                            >
                              <span>{promo.ctaText || 'Shop All'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Quick Row */}
                    <div className="pt-3 mt-4 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>100% Domestic Fulfillment in USA, UK & CA</span>
                        </span>
                        <span>•</span>
                        <span>Dispatched within 24-48 Hours</span>
                      </div>
                      <button
                        onClick={() => {
                          setActiveCategory(currentMenu.categoryKey);
                          setSearchQuery('');
                          setActiveMegaMenu(null);
                          const el = document.getElementById('catalog-grid');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="font-bold text-indigo-600 hover:underline flex items-center space-x-1"
                      >
                        <span>View all {currentMenu.title} products</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
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
                      <h2 
                        style={getTypographyInlineStyle(cfg?.typography?.promoHeadline)}
                        className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600"
                      >
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

          <h1 
            style={getTypographyInlineStyle(cfg?.typography?.heroTitle)}
            className={`${heroTitleSizeClass} font-black tracking-tight leading-tight max-w-3xl ${
            cfg.heroAlignment === 'left' ? '' : 'mx-auto'
          } ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {cfg.heroTitlePrefix}{' '}
            <span className={isLight ? 'text-indigo-600' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400'}>
              {cfg.heroTitleAccent}
            </span>
          </h1>

          <p 
            style={getTypographyInlineStyle(cfg?.typography?.heroSubtitle)}
            className={`${heroSubtitleSizeClass} ${heroSubtitleSpacingClass} max-w-2xl leading-relaxed ${
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
        <section id="category-showcase" className={`border-b transition-colors py-10 sm:py-14 relative z-10 ${
          isLight 
            ? (cfg.enableLuxury3dBackground ? 'bg-white/50 backdrop-blur-sm border-slate-200/60' : 'bg-white border-slate-200')
            : 'bg-slate-900/60 border-slate-800/80'
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
              {(cfg.categoryShowcaseCards || cfg.topPicks || DEFAULT_STOREFRONT_CONFIG.categoryShowcaseCards || DEFAULT_STOREFRONT_CONFIG.topPicks || []).map((card, idx) => (
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
        <section className={`border-b transition-colors py-6 relative z-10 ${
          isLight 
            ? (cfg.enableLuxury3dBackground ? 'bg-amber-50/50 backdrop-blur-sm border-amber-200/50 text-slate-900' : 'bg-amber-50/60 border-amber-200/60 text-slate-900') 
            : 'bg-gradient-to-r from-slate-950 via-indigo-950/20 to-slate-950 border-slate-800 text-white'
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
      <main id="catalog-grid" className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${catalogPaddingClass} flex-1 relative z-10`}>
        {/* Category Filter Pills & Right-side Sort & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          {cfg.showCategoryPills !== false && (
            <div className="flex flex-col space-y-2.5 max-w-full">
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
                {[
                  { label: 'All Products', key: 'All' },
                  { label: '🎄 Holiday Cards', key: 'Holiday' },
                  { label: '📅 Calendars & Gifts', key: 'Gifts' },
                  { label: '💼 Business Cards', key: 'Marketing' },
                  { label: '🪧 Signs & Banners', key: 'Signs & Banners' },
                  { label: '👕 Apparel', key: 'Apparel' },
                  { label: '🏷️ Stickers & Packaging', key: 'Accessories' },
                  { label: '🖼️ Wall Art', key: 'Wall Art' },
                  { label: '🔥 Deals', key: 'Deals' }
                ].map((cat) => {
                  const isSelected = activeCategory.toLowerCase() === cat.key.toLowerCase();
                  return (
                    <button
                      key={cat.key}
                      onClick={() => { setActiveCategory(cat.key); setSearchQuery(''); }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shadow-xs ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                          : isLight
                            ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Subcategory quick chips if category is selected */}
              {activeCategory !== 'All' && (
                <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar text-[11px]">
                  <span className="text-slate-400 font-semibold shrink-0">Filter by:</span>
                  {(activeCategory === 'Holiday' ? ['All Holiday Cards', 'Christmas Photo Cards', 'Gold Foil Cards', 'Corporate Greetings', 'New Year Cards', 'Hanukkah Blessing', 'Event Invitations'] :
                    activeCategory === 'Gifts' ? ['All Gifts', 'Wall Calendars', 'Desk Calendars', 'Square Calendars', 'Ceramic Mugs', 'Steel Tumblers', 'Jigsaw Puzzles', 'Holiday Ornaments'] :
                    activeCategory === 'Signs & Banners' ? ['All Signs', 'Vinyl Banners', 'Yard Signs with Stakes', 'Retractable Banners', 'Mesh Banners', 'A-Frame Signs', 'Foam Board Posters'] :
                    activeCategory === 'Marketing' ? ['All Business Collateral', 'Matte Soft-Touch', 'Gold Foil Luxe', 'Rounded Corners', 'Square Cards', 'Tri-Fold Brochures', 'Direct Mail Postcards', 'Presentation Folders'] :
                    activeCategory === 'Apparel' ? ['All Apparel', 'Heavyweight Hoodies', 'Organic Cotton Tees', 'Embroidered Dad Caps', 'Canvas Totes', 'Fleece Sweatshirts', 'Polo Shirts'] :
                    activeCategory === 'Accessories' ? ['All Packaging', 'Die-Cut Stickers', 'Roll Labels', 'Holographic Stickers', 'Corrugated Mailer Boxes', 'Poly Mailers', 'Phone Cases', 'Packing Tape'] :
                    activeCategory === 'Wall Art' ? ['All Wall Art', 'Stretched Canvas', 'Fine Art Posters', 'Wood Framed Prints', 'Metal Prints'] :
                    ['Featured', 'Best Value', 'Top Rated']
                  ).map((chip, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => setSearchQuery(chip.startsWith('All') ? '' : chip)}
                      className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition border ${
                        (!searchQuery && chip.startsWith('All')) || (searchQuery && chip.toLowerCase().includes(searchQuery.toLowerCase()))
                          ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 font-bold'
                          : isLight
                            ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-transparent'
                            : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 border-transparent'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
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
                  <option value="featured">✨ Featured (Default)</option>
                  <option value="price_asc">💵 Price: Low to High</option>
                  <option value="price_desc">💎 Price: High to Low</option>
                  <option value="popular">🔥 Most Popular</option>
                  <option value="newest">⚡ New Arrivals</option>
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
        {filteredProducts.length === 0 ? (
          <div className={`p-12 text-center rounded-2xl border ${
            isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-200'
          }`}>
            <Package className="w-12 h-12 mx-auto text-slate-400 mb-3" />
            <h3 className="text-base font-bold">No products found matching your filter</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              We couldn't find any direct matches for "{searchQuery}". Try selecting another category or click below to view all items.
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Reset Filters & Show All Products
            </button>
          </div>
        ) : (
          <div className={`grid ${gridColumnsClass} ${gridGapClass}`}>
          {filteredProducts.map((p) => {
            const price = getPrice(p.base_price_usd);
            return (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedProduct(p);
                  setSelectedSize('L');
                  setSelectedColor('Vintage Black');
                  setSelectedFinish('Matte');
                  setModalQuantity(1);
                }}
                className={`${cardRadiusClass} overflow-hidden transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                  isLight
                    ? (cfg.enableLuxury3dBackground
                        ? 'bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-indigo-400 hover:-translate-y-1 hover:bg-white'
                        : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5')
                    : (cfg.enableLuxury3dBackground
                        ? 'bg-slate-900/95 backdrop-blur-md border border-slate-800 hover:border-indigo-500/70 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:bg-slate-900'
                        : 'bg-slate-900 border border-slate-800 hover:border-indigo-500/50 shadow-xl hover:-translate-y-0.5')
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
                      <span className={`text-[10px] ml-1 font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>(48)</span>
                    </div>

                    <h3 
                      style={getTypographyInlineStyle(cfg?.typography?.productTitle)}
                      className={`font-bold text-sm line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${isLight ? 'text-slate-900' : 'text-white'}`}
                    >
                      {p.title}
                    </h3>
                    <p 
                      style={getTypographyInlineStyle(cfg?.typography?.productDesc)}
                      className={`text-xs line-clamp-2 leading-relaxed font-normal ${isLight ? 'text-slate-600' : 'text-slate-300'}`}
                    >
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
                      <div 
                        style={getTypographyInlineStyle(cfg?.typography?.productPrice)}
                        className={`text-xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}
                      >
                        {marketInfo.currency_symbol}{price}
                      </div>
                    </div>
                    <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      +{marketInfo.currency_symbol}{marketInfo.shipping_base_rate} ship
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(p);
                      setSelectedSize('L');
                      setSelectedColor('Vintage Black');
                      setSelectedFinish('Matte');
                      setModalQuantity(1);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-2 border shadow-sm min-h-[42px] cursor-pointer ${
                      isLight
                        ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900 hover:shadow-md'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500 hover:border-indigo-400 shadow-md'
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
      )}
      </main>

      {/* 5. VistaPrint-Style Product Order Configurator, Template Picker & Design Uploader */}
      {selectedProduct && (() => {
        const rawUnitPrice = parseFloat(getPrice(selectedProduct.base_price_usd));
        const bulkDisc = getBulkDiscountPercent(modalQuantity);
        const discountedUnitPrice = parseFloat((rawUnitPrice * (1 - bulkDisc / 100)).toFixed(2));
        const totalModalPrice = (discountedUnitPrice * modalQuantity).toFixed(2);
        const totalSaved = ((rawUnitPrice - discountedUnitPrice) * modalQuantity).toFixed(2);

        // Perspective mockup images
        const currentMockupImage = selectedTemplate?.preview 
          || uploadedArtwork?.previewUrl 
          || (activeMockupView === 'back' 
              ? (selectedProduct.image_url.includes('?') ? selectedProduct.image_url + '&view=back' : selectedProduct.image_url)
              : activeMockupView === 'lifestyle'
              ? 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80'
              : selectedProduct.image_url);

        return (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <div className={`rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col border my-8 transition-all ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
            }`}>
              
              {/* Top Navigation Header for Modal */}
              <div className={`px-6 py-3.5 border-b flex items-center justify-between ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
              }`}>
                <div className="flex items-center space-x-2 text-xs">
                  {activeOrderingFlow !== 'configurator' ? (
                    <button
                      onClick={() => setActiveOrderingFlow('configurator')}
                      className={`flex items-center space-x-1.5 font-bold transition ${
                        isLight ? 'text-indigo-600 hover:text-indigo-800' : 'text-indigo-400 hover:text-indigo-300'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Product Specifications</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
                      <span className="hover:underline cursor-pointer" onClick={() => setSelectedProduct(null)}>Home</span>
                      <span>/</span>
                      <span className="font-semibold text-slate-600 dark:text-slate-300">{selectedProduct.category}</span>
                      <span>/</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 truncate max-w-xs">{selectedProduct.title}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    VistaPrint Certified POD
                  </span>
                  <button 
                    onClick={() => { setSelectedProduct(null); setActiveOrderingFlow('configurator'); }} 
                    className={`p-1.5 rounded-xl transition ${isLight ? 'text-slate-400 hover:text-slate-900 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* FLOW 1: Main Product Configurator View */}
              {activeOrderingFlow === 'configurator' && (
                <div className="flex flex-col md:flex-row flex-1">
                  {/* Left Column: Mockup Viewer & Real-time Specs */}
                  <div className={`md:w-5/12 p-6 flex flex-col justify-between border-r ${
                    isLight ? 'bg-slate-50/70 border-slate-100' : 'bg-slate-950/60 border-slate-800'
                  }`}>
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between text-[10px] font-bold mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          isLight ? 'bg-indigo-100 text-indigo-700 font-extrabold' : 'bg-indigo-950 text-indigo-300 border border-indigo-500/30'
                        }`}>
                          {selectedProduct.category}
                        </span>
                        <span className="text-emerald-500 font-mono flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Domestic Fast-Ship</span>
                        </span>
                      </div>

                      {/* Mockup Preview Container */}
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 group bg-slate-100 dark:bg-slate-900">
                        <img
                          src={currentMockupImage}
                          alt={selectedProduct.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Live Overlay Badges if Template or Artwork Attached */}
                        {selectedTemplate && (
                          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-indigo-600/90 text-white text-[10px] font-bold shadow-md flex items-center space-x-1 backdrop-blur-xs">
                            <Palette className="w-3 h-3" />
                            <span>Template: {selectedTemplate.name}</span>
                          </div>
                        )}
                        {uploadedArtwork && (
                          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-emerald-600/90 text-white text-[10px] font-bold shadow-md flex items-center space-x-1 backdrop-blur-xs">
                            <UploadCloud className="w-3 h-3" />
                            <span>Custom Artwork Attached (300 DPI)</span>
                          </div>
                        )}

                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[9px] font-mono backdrop-blur-xs">
                          {selectedCorner}
                        </div>
                      </div>

                      {/* View Angle Switcher Tabs */}
                      <div className="flex items-center justify-center space-x-2 mt-3">
                        {[
                          { id: 'front', label: 'Front View' },
                          { id: 'back', label: 'Back View' },
                          { id: 'lifestyle', label: 'Perspective' }
                        ].map((view) => (
                          <button
                            key={view.id}
                            type="button"
                            onClick={() => setActiveMockupView(view.id)}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition border ${
                              activeMockupView === view.id
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                : isLight
                                  ? 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                            }`}
                          >
                            {view.label}
                          </button>
                        ))}
                      </div>

                      {/* Design Action Status Pill if active */}
                      {(selectedTemplate || uploadedArtwork) && (
                        <div className={`mt-4 p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                          isLight ? 'bg-indigo-50/80 border-indigo-200 text-indigo-900' : 'bg-indigo-950/40 border-indigo-900/60 text-indigo-200'
                        }`}>
                          <div className="flex items-center space-x-2 truncate">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span className="font-semibold truncate">
                              {selectedTemplate ? `Design: ${selectedTemplate.name}` : `Artwork: ${uploadedArtwork.name}`}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setSelectedTemplate(null); setUploadedArtwork(null); }}
                            className="text-[10px] font-bold text-rose-500 hover:underline shrink-0 ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Guarantee Reassurance Card */}
                    <div className={`mt-4 p-3 rounded-2xl border text-[11px] space-y-1 ${
                      isLight ? 'bg-white border-slate-200 text-slate-700 shadow-xs' : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}>
                      <div className="flex items-center space-x-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span>VistaPrint Guarantee</span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        If you are not 100% satisfied with paper thickness, print clarity, or alignment, we reprint for free.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Interactive Ordering Criteria & CTAs */}
                  <div className="md:w-7/12 p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      {/* Product Title, Rating & Pricing Header */}
                      <div>
                        <div className="flex items-center space-x-2 text-xs mb-1">
                          <div className="flex items-center text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="font-bold text-slate-700 dark:text-slate-300">4.9</span>
                          <span className="text-[11px] text-slate-400">(2,480+ domestic reviews)</span>
                        </div>

                        <h3 className={`text-lg sm:text-xl font-black leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {selectedProduct.title}
                        </h3>

                        <div className="flex items-center space-x-3 mt-2">
                          <div className={`text-2xl font-black font-mono ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                            {marketInfo.currency_symbol}{discountedUnitPrice.toFixed(2)}
                            <span className="text-xs font-normal text-slate-400 ml-1">/ unit</span>
                          </div>
                          {bulkDisc > 0 && (
                            <span className="text-xs text-slate-400 line-through font-mono">
                              {marketInfo.currency_symbol}{rawUnitPrice.toFixed(2)}
                            </span>
                          )}
                          {bulkDisc > 0 && (
                            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              {bulkDisc}% Volume Savings Applied
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 1. Paper Stock / Material Selector (Authentic VistaPrint) */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                            1. Paper Stock & Substrate:
                          </label>
                          <span className="text-[10px] font-semibold text-indigo-500 font-mono">
                            {selectedPaperStock}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            { name: 'Standard Matte 14pt', desc: 'Glare-free & classic' },
                            { name: 'Premium Glossy 16pt', desc: 'Vibrant UV protective' },
                            { name: 'Uncoated 16pt (Writable)', desc: 'Natural rich texture' },
                            { name: '15pt Woven Italian Linen', desc: 'Luxe woven cloth grain' },
                            { name: '18pt Luxe Foil-Stamped', desc: 'Metallic embossed shine' }
                          ].map((stock) => {
                            const isChosen = selectedPaperStock === stock.name;
                            return (
                              <button
                                key={stock.name}
                                type="button"
                                onClick={() => setSelectedPaperStock(stock.name)}
                                className={`p-2.5 rounded-xl border text-left transition ${
                                  isChosen
                                    ? 'bg-indigo-50/90 border-indigo-500 text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-200 ring-2 ring-indigo-500/30 font-bold'
                                    : isLight
                                      ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                <div className="text-[11px] font-bold leading-tight">{stock.name}</div>
                                <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">{stock.desc}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2. Corners & Shape Selector */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                            2. Shape & Corners:
                          </label>
                          <span className="text-[10px] font-semibold text-indigo-500">
                            {selectedCorner}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { name: 'Standard Rectangular (3.5" x 2")', icon: '⬛' },
                            { name: 'Rounded Corners (1/4" Radius)', icon: '🟢' },
                            { name: 'Square Format (2.5" x 2.5")', icon: '⬜' }
                          ].map((corner) => {
                            const isChosen = selectedCorner === corner.name;
                            return (
                              <button
                                key={corner.name}
                                type="button"
                                onClick={() => setSelectedCorner(corner.name)}
                                className={`p-2 rounded-xl border text-center transition ${
                                  isChosen
                                    ? 'bg-indigo-50/90 border-indigo-500 text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-200 ring-2 ring-indigo-500/30 font-bold'
                                    : isLight
                                      ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                <div className="text-sm mb-0.5">{corner.icon}</div>
                                <div className="text-[10px] font-bold leading-snug truncate">{corner.name.split(' (')[0]}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 3. Quantity Tiers & Dynamic Volume Pricing */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                            3. Select Quantity:
                          </label>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                            Higher quantity = lower cost per piece
                          </span>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5 text-center">
                          {[
                            { qty: 50, price: '$14.99', ea: '$0.30 ea', disc: '' },
                            { qty: 100, price: '$19.99', ea: '$0.20 ea', disc: 'Popular' },
                            { qty: 250, price: '$29.99', ea: '$0.12 ea', disc: '33% OFF' },
                            { qty: 500, price: '$39.99', ea: '$0.08 ea', disc: '60% OFF' },
                            { qty: 1000, price: '$59.99', ea: '$0.06 ea', disc: '70% OFF' }
                          ].map((tier) => {
                            const isChosen = modalQuantity === tier.qty;
                            return (
                              <button
                                key={tier.qty}
                                type="button"
                                onClick={() => setModalQuantity(tier.qty)}
                                className={`p-2 rounded-xl border transition ${
                                  isChosen
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md font-bold'
                                    : isLight
                                      ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                <div className="text-xs font-black">{tier.qty}</div>
                                <div className="text-[9px] font-mono mt-0.5">{tier.price}</div>
                                <div className={`text-[8px] font-semibold mt-0.5 ${isChosen ? 'text-emerald-200' : 'text-emerald-500'}`}>
                                  {tier.disc || tier.ea}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 4. VistaPrint Direct Production Action CTAs */}
                      <div className="pt-2">
                        <div className="text-[11px] font-bold text-slate-500 mb-2">
                          4. How would you like to prepare your design?
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {/* Browse Templates CTA */}
                          <button
                            type="button"
                            onClick={() => setActiveOrderingFlow('templates')}
                            className={`p-3 rounded-2xl border transition flex items-center space-x-3 text-left ${
                              selectedTemplate
                                ? 'bg-indigo-50 border-indigo-300 dark:bg-indigo-950/60 dark:border-indigo-800'
                                : isLight
                                  ? 'bg-slate-50 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-slate-800'
                                  : 'bg-slate-950 border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900 text-white'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                              <Palette className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-extrabold text-xs">Browse Templates</div>
                              <div className="text-[10px] text-slate-400 truncate">
                                {selectedTemplate ? selectedTemplate.name : 'Choose from 5+ designer layouts'}
                              </div>
                            </div>
                          </button>

                          {/* Upload Your Design CTA */}
                          <button
                            type="button"
                            onClick={() => setActiveOrderingFlow('upload')}
                            className={`p-3 rounded-2xl border transition flex items-center space-x-3 text-left ${
                              uploadedArtwork
                                ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-800'
                                : isLight
                                  ? 'bg-slate-50 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-slate-800'
                                  : 'bg-slate-950 border-slate-800 hover:border-emerald-500/60 hover:bg-slate-900 text-white'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                              <UploadCloud className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-extrabold text-xs">Upload Your Design</div>
                              <div className="text-[10px] text-slate-400 truncate">
                                {uploadedArtwork ? uploadedArtwork.name : 'PDF, PNG, SVG (300 DPI ready)'}
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Proof Approval Checkbox */}
                      <label className="flex items-center space-x-2 pt-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={proofApproved}
                          onChange={(e) => setProofApproved(e.target.checked)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                        />
                        <span className={`text-[11px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          I approve my proof, specs, and understand domestic printing begins upon order.
                        </span>
                      </label>
                    </div>

                    {/* Modal Footer with Add to Bag */}
                    <div className={`pt-4 mt-2 border-t flex items-center justify-between space-x-4 ${
                      isLight ? 'border-slate-200' : 'border-slate-800'
                    }`}>
                      <div>
                        <div className="text-[10px] text-slate-400">Total Price ({modalQuantity} units):</div>
                        <div className={`text-2xl font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {marketInfo.currency_symbol}{totalModalPrice}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(
                          selectedProduct, 
                          selectedSize, 
                          selectedColor, 
                          modalQuantity, 
                          selectedFinish, 
                          selectedPaperStock, 
                          selectedCorner, 
                          selectedTemplate, 
                          uploadedArtwork
                        )}
                        className={`py-3 px-6 rounded-xl text-xs font-extrabold transition flex items-center space-x-2 shadow-lg ${
                          isLight 
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25' 
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Configure & Add to Cart ({marketInfo.currency_symbol}{totalModalPrice})</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* FLOW 2: VistaPrint Template Browser */}
              {activeOrderingFlow === 'templates' && (
                <div className="p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold">Select a Designer Template</h4>
                      <p className="text-xs text-slate-400">
                        Choose a professionally pre-formatted template for {selectedProduct.title}. Fully editable in print production.
                      </p>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setActiveOrderingFlow('configurator')}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center space-x-1.5 self-start ${
                        isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                      }`}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Product</span>
                    </button>
                  </div>

                  {/* Template Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SAMPLE_VISTA_TEMPLATES.map((tpl) => {
                      const isSelected = selectedTemplate?.id === tpl.id;
                      return (
                        <div
                          key={tpl.id}
                          className={`rounded-2xl border p-3 flex flex-col justify-between transition-all duration-300 shadow-md ${
                            isSelected
                              ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-50/20'
                              : isLight ? 'bg-white border-slate-200 hover:border-slate-300' : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                              <img src={tpl.preview} alt={tpl.name} className="w-full h-full object-cover" />
                              <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-950/80 text-white backdrop-blur-xs">
                                {tpl.category}
                              </span>
                            </div>
                            <h5 className="font-bold text-sm leading-snug">{tpl.name}</h5>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                              {tpl.description}
                            </p>
                          </div>

                          <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedTemplate(tpl);
                                setUploadedArtwork(null);
                                setActiveOrderingFlow('configurator');
                              }}
                              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                                isSelected
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{isSelected ? 'Currently Selected' : 'Use this Template'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* FLOW 3: VistaPrint Artwork Uploader */}
              {activeOrderingFlow === 'upload' && (
                <div className="p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold">Upload Your Print-Ready Artwork</h4>
                      <p className="text-xs text-slate-400">
                        Upload your high-resolution custom graphics, PDF proofs, or company logos.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveOrderingFlow('configurator')}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center space-x-1.5 self-start ${
                        isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                      }`}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Product</span>
                    </button>
                  </div>

                  {/* Drag and Drop Zone */}
                  <div
                    onClick={() => {
                      setIsSimulatingUpload(true);
                      setTimeout(() => {
                        setUploadedArtwork({
                          name: `custom-artwork-${Date.now().toString().slice(-4)}.pdf`,
                          size: '4.8 MB',
                          previewUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=700&q=80',
                          dpi: '300 DPI CMYK'
                        });
                        setSelectedTemplate(null);
                        setIsSimulatingUpload(false);
                      }, 900);
                    }}
                    className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 ${
                      uploadedArtwork
                        ? 'border-emerald-500 bg-emerald-50/10'
                        : isLight
                          ? 'border-slate-300 hover:border-indigo-500 bg-slate-50/50 hover:bg-indigo-50/30'
                          : 'border-slate-700 hover:border-indigo-500 bg-slate-950 hover:bg-slate-900'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
                      {isSimulatingUpload ? (
                        <RefreshCw className="w-6 h-6 animate-spin" />
                      ) : uploadedArtwork ? (
                        <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                      ) : (
                        <UploadCloud className="w-7 h-7" />
                      )}
                    </div>

                    {uploadedArtwork ? (
                      <div>
                        <div className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                          Artwork Uploaded & Verified: {uploadedArtwork.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          File Size: {uploadedArtwork.size} • Color Space: {uploadedArtwork.dpi} • Safe Trim OK
                        </div>
                        <p className="text-[11px] text-slate-500 mt-2">
                          Click to upload or replace with another file.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="font-extrabold text-sm">
                          {isSimulatingUpload ? 'Validating Resolution & Bleed Margins...' : 'Drag & drop your print file here, or browse'}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                          Supports PDF, SVG, EPS, AI, PSD, and PNG up to 50MB. Automatically checked for 300 DPI print fidelity.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Print Specifications Checklist */}
                  <div className={`p-4 rounded-2xl border text-xs grid grid-cols-1 sm:grid-cols-3 gap-3 ${
                    isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">Bleed Dimensions</div>
                        <div className="text-[11px] text-slate-500">3.75" × 2.25" with 1/8" bleed</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">Safe Text Zone</div>
                        <div className="text-[11px] text-slate-500">Keep text 1/8" from cut edge</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">Resolution</div>
                        <div className="text-[11px] text-slate-500">300 DPI CMYK recommended</div>
                      </div>
                    </div>
                  </div>

                  {/* Upload Confirm CTA */}
                  <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveOrderingFlow('configurator')}
                      className={`py-2.5 px-6 rounded-xl text-xs font-bold transition ${
                        uploadedArtwork
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                      }`}
                    >
                      {uploadedArtwork ? 'Confirm Artwork & Return to Specs' : 'Done & Return to Specs'}
                    </button>
                  </div>
                </div>
              )}
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
                          {item.paperStock && <span className="font-semibold text-indigo-600 dark:text-indigo-400">{item.paperStock} • </span>}
                          {item.corner && <span>{item.corner} • </span>}
                          {item.template && <span className="text-amber-600 dark:text-amber-400">Template: {item.template} • </span>}
                          {item.artwork && <span className="text-emerald-600 dark:text-emerald-400">Artwork: {item.artwork} • </span>}
                          {item.size && `Size: ${item.size} • `}{item.color || item.finish}
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
      <footer className={`py-10 text-xs border-t transition-colors relative z-10 ${
        isLight 
          ? (cfg.enableLuxury3dBackground ? 'bg-white/70 backdrop-blur-md border-slate-200/60 text-slate-600' : 'bg-white border-slate-200 text-slate-500')
          : 'bg-slate-950 border-slate-800 text-slate-500'
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

          <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] ${
            isLight ? 'border-slate-100 text-slate-500' : 'border-slate-900 text-slate-400'
          }`}>
            <p>{cfg.copyrightText}</p>

            {/* Social Media Channels at Footer (Requirement 6 - Replaced Admin Link) */}
            {cfg.showFooterSocials !== false && (
              <div className="flex items-center space-x-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">Connect:</span>
                <a
                  href={cfg.socialLinks?.instagram || 'https://instagram.com/printflow'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl border transition ${
                    isLight 
                      ? 'bg-slate-50 hover:bg-pink-50 border-slate-200 text-slate-600 hover:text-pink-600' 
                      : 'bg-slate-900 hover:bg-pink-950/40 border-slate-800 text-slate-400 hover:text-pink-400'
                  }`}
                  title="Follow on Instagram"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href={cfg.socialLinks?.facebook || 'https://facebook.com/printflow'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl border transition ${
                    isLight 
                      ? 'bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-600 hover:text-blue-600' 
                      : 'bg-slate-900 hover:bg-blue-950/40 border-slate-800 text-slate-400 hover:text-blue-400'
                  }`}
                  title="Follow on Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href={cfg.socialLinks?.twitter || 'https://x.com/printflow'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl border transition ${
                    isLight 
                      ? 'bg-slate-50 hover:bg-sky-50 border-slate-200 text-slate-600 hover:text-sky-500' 
                      : 'bg-slate-900 hover:bg-sky-950/40 border-slate-800 text-slate-400 hover:text-sky-400'
                  }`}
                  title="Follow on X (Twitter)"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href={cfg.socialLinks?.youtube || 'https://youtube.com/@printflow'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl border transition ${
                    isLight 
                      ? 'bg-slate-50 hover:bg-rose-50 border-slate-200 text-slate-600 hover:text-rose-600' 
                      : 'bg-slate-900 hover:bg-rose-950/40 border-slate-800 text-slate-400 hover:text-rose-400'
                  }`}
                  title="Subscribe on YouTube"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a
                  href={cfg.socialLinks?.pinterest || 'https://pinterest.com/printflow'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl border transition ${
                    isLight 
                      ? 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-600 hover:text-indigo-600' 
                      : 'bg-slate-900 hover:bg-indigo-950/40 border-slate-800 text-slate-400 hover:text-indigo-400'
                  }`}
                  title="Follow on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
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

      {/* 11. Customer Live Support Chat Widget & Human Moderator Routing (Requirement 1) */}
      {cfg.showLiveChat !== false && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
          {/* Floating Chat Drawer / Window */}
          {isChatOpen && (
            <div className={`mb-3 w-96 max-w-[calc(100vw-32px)] h-[520px] max-h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border animate-in fade-in slide-in-from-bottom-5 duration-200 ${
              isLight ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/60' : 'bg-slate-900 border-slate-800 text-white shadow-black/80'
            }`}>
              {/* Chat Header */}
              <div className={`p-4 border-b flex items-center justify-between ${
                isHumanModerator
                  ? isLight ? 'bg-emerald-50 border-emerald-100' : 'bg-emerald-950/40 border-emerald-900/50'
                  : isLight ? 'bg-indigo-50/80 border-indigo-100' : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-sm border ${
                      isHumanModerator
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
                    }`}>
                      {isHumanModerator ? '👩‍💼' : '🤖'}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {isHumanModerator ? (cfg.chatModeratorName || 'Sarah Jenkins') : (cfg.chatBotName || 'PrintFlow AI Assistant')}
                      </h3>
                      {isHumanModerator && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                          Human Lead
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-medium block ${
                      isHumanModerator 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : isLight ? 'text-indigo-600' : 'text-indigo-400'
                    }`}>
                      {isHumanModerator ? '🟢 Active Human Moderator' : '⚡ Instant AI Assistant'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {!isHumanModerator && (
                    <button
                      type="button"
                      onClick={handleTransferToHuman}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer flex items-center space-x-1 ${
                        isLight 
                          ? 'bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs' 
                          : 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border-emerald-500/40'
                      }`}
                      title="Transfer to Human Moderator"
                    >
                      <User className="w-3 h-3 text-emerald-500" />
                      <span>Talk to Human</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsChatOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                {chatMessages.map(msg => {
                  if (msg.sender === 'system') {
                    return (
                      <div key={msg.id} className="text-center my-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold border ${
                          isLight ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                        }`}>
                          {msg.text}
                        </span>
                      </div>
                    );
                  }

                  const isUser = msg.sender === 'user';
                  return (
                    <div key={msg.id} className={`flex items-start space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {!isUser && (
                        <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm shrink-0 border border-slate-200 dark:border-slate-700">
                          {msg.avatar || '🤖'}
                        </div>
                      )}
                      <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 space-y-1 shadow-xs ${
                        isUser
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : isLight 
                            ? 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/80' 
                            : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/80'
                      }`}>
                        <p className="leading-relaxed text-xs">{msg.text}</p>
                        <span className={`text-[9px] block text-right font-medium opacity-60 ${isUser ? 'text-indigo-100' : 'text-slate-400'}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {isChatTyping && (
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm border border-slate-200 dark:border-slate-700">
                      {isHumanModerator ? '👩‍💼' : '🤖'}
                    </div>
                    <div className={`rounded-2xl px-3 py-2 text-xs flex items-center space-x-1.5 ${
                      isLight ? 'bg-slate-100 text-slate-500' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompt Chips (when AI mode) */}
              {!isHumanModerator && (
                <div className={`px-3 py-2 border-t flex flex-wrap gap-1.5 ${isLight ? 'bg-slate-50 border-slate-100' : 'bg-slate-950/60 border-slate-800'}`}>
                  {[
                    '🚚 Shipping Times',
                    '📦 Track Order',
                    '🎨 Custom Print Inks',
                    '👤 Transfer to Human'
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (chip.includes('Human')) {
                          handleTransferToHuman();
                        } else {
                          setChatInput(chip);
                        }
                      }}
                      className={`text-[10px] px-2.5 py-1 rounded-full font-medium border transition cursor-pointer ${
                        chip.includes('Human')
                          ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 border-emerald-500/30 font-bold'
                          : isLight ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Input Bar */}
              <form onSubmit={handleSendChatMessage} className={`p-3 border-t flex items-center space-x-2 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={isHumanModerator ? "Message Sarah (Human Moderator)..." : "Ask a question or request human..."}
                  className={`flex-1 px-3.5 py-2 rounded-xl text-xs border outline-none transition ${
                    isLight 
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-indigo-500' 
                      : 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition shadow-sm cursor-pointer"
                  title="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* Floating Trigger Button */}
          <button
            type="button"
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="group relative flex items-center space-x-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 cursor-pointer ring-4 ring-indigo-500/20"
            title="Chat with Customer Support & AI Assistant"
          >
            <div className="relative">
              <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-indigo-700"></span>
              </span>
            </div>
            <span>Support Chat</span>
          </button>
        </div>
      )}
    </div>
  );
}
