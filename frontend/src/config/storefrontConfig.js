// Centralized Default Storefront Configuration for PrintFlow Studio
// VistaPrint-inspired Mega Menu Hierarchy & Customization Architecture

export const VISTA_MEGA_MENU_CATEGORIES = [
  {
    id: 'menu-deals',
    title: 'Deals',
    categoryKey: 'Deals',
    badge: '25% OFF',
    columns: [
      {
        heading: 'Special Offers',
        items: ['Holiday Specials (25% Off)', 'Free Shipping on Orders $50+', 'New Customer Welcome Deal', 'Clearance & Overstock POD']
      },
      {
        heading: 'Bulk Volume Tiers',
        items: ['500+ Business Cards Pack', '1,000+ Marketing Flyers', 'Team Apparel Wholesale Bundles', 'Wholesale Yard Signs']
      },
      {
        heading: 'Free Samples',
        items: ['Free Paper Stocks Sample Kit', 'Sticker & Label Swatch Sheet', 'Foil & Luxury Finishes Card', 'Fabric & Color Swatches']
      },
      {
        heading: 'Active Promo Codes',
        items: ['FESTIVE25 - 25% Off Cards', 'SHIPFREE - Free US/UK/CA', 'BULK50 - $50 Off $250+', 'VIPPRINT - Extra 10% Off']
      }
    ],
    promo: {
      title: 'Holiday Mega Sale',
      subtitle: 'Save up to 25% on custom holiday cards, wall calendars & gifts.',
      code: 'FESTIVE25',
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Shop All Deals'
    }
  },
  {
    id: 'menu-holiday',
    title: 'Holiday & Christmas Cards',
    categoryKey: 'Holiday',
    badge: 'Festive',
    columns: [
      {
        heading: 'Holiday Cards',
        items: ['Custom Christmas Cards', 'Holiday Family Photo Cards', 'New Year Greeting Cards', 'Hanukkah Cards', 'Religious Holiday Cards']
      },
      {
        heading: 'Shop by Number of Photos',
        items: ['1 Photo Minimalist Cards', '2 - 3 Photos Family Collage', '4+ Photos Multi-Grid', 'Illustrated & Non-Photo Cards']
      },
      {
        heading: 'Finishes & Paper Stocks',
        items: ['Embossed Gold Foil Accents', 'Silver Foil Highlights', 'Premium 16pt Matte Stock', 'High-Gloss Photo Finish', 'Linen Textured Paper']
      },
      {
        heading: 'Corporate & Business',
        items: ['Corporate Holiday Greetings', 'Real Estate Festive Postcards', 'Custom Company Logo Cards', 'Foil-Stamped Client Cards']
      }
    ],
    promo: {
      title: 'Holiday Photo Cards',
      subtitle: 'Turn cherished memories into premium foil-stamped holiday cards.',
      code: 'FESTIVE25',
      image: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Explore Holiday Cards'
    }
  },
  {
    id: 'menu-calendars',
    title: 'Calendars & Gifts',
    categoryKey: 'Gifts',
    badge: '',
    columns: [
      {
        heading: 'Custom Calendars',
        items: ['Classic Wall Calendars (11x8.5")', 'Square Wall Calendars (12x12")', 'Desk Easel Flip Calendars', 'Magnetic Fridge Calendars']
      },
      {
        heading: 'Custom Drinkware',
        items: ['Ceramic Photo Mugs (15oz)', 'Double-Wall Steel Tumblers (20oz)', 'Enamel Steel Campfire Mugs', 'Thermal Sports Water Bottles']
      },
      {
        heading: 'Home & Wall Decor',
        items: ['Museum Stretched Canvas Art', 'Modern Wood Framed Prints', 'Ultra-HD Brushed Metal Prints', 'Archival Fine Art Posters']
      },
      {
        heading: 'Photo Gifts & Bags',
        items: ['Heavy-Duty Canvas Tote Bags', 'Tough Armor Custom Phone Cases', 'Photo Puzzles & Games', 'Embroidered Dad Caps']
      }
    ],
    promo: {
      title: '2026 Custom Calendars',
      subtitle: '12 months of high-resolution photos on archival cardstock.',
      code: 'NEWYEAR20',
      image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Design Your Calendar'
    }
  },
  {
    id: 'menu-business-cards',
    title: 'Business Cards',
    categoryKey: 'Marketing',
    badge: 'Popular',
    columns: [
      {
        heading: 'Standard Shapes & Stocks',
        items: ['Standard Matte Business Cards', 'High-Gloss 16pt Cards', 'Uncoated Writable Stock', 'Recycled Eco Kraft Cards']
      },
      {
        heading: 'Specialty Finishes',
        items: ['Embossed Gold Foil Accents', 'Raised Spot UV Gloss', 'Silver Foil Highlights', 'Metallic Pearl Finish']
      },
      {
        heading: 'Shapes & Formats',
        items: ['Rounded Corner Business Cards', 'Square Business Cards (2.5x2.5")', 'Folded Tent Business Cards', 'Custom Die-Cut Shapes']
      },
      {
        heading: 'Luxury Collections',
        items: ['Ultra-Thick 32pt Luxe Stock', 'Velvet Soft-Touch Lamination', 'Waterproof Plastic Cards', 'Textured Linen Cards']
      }
    ],
    promo: {
      title: '500 Business Cards from $19.99',
      subtitle: 'Crisp color fidelity with lightning-fast domestic dispatch.',
      code: 'CARDPRO',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Shop Business Cards'
    }
  },
  {
    id: 'menu-postcards',
    title: 'Postcards & Print Advertising',
    categoryKey: 'Marketing',
    badge: '',
    columns: [
      {
        heading: 'Postcards & Mailers',
        items: ['Direct Mail Postcards (4x6", 5x7")', 'Jumbo Promotional Postcards (6x9")', 'Every Door Direct Mail (EDDM)', 'Thank You Insert Cards']
      },
      {
        heading: 'Flyers & Brochures',
        items: ['Tri-Fold Glossy Brochures', 'Bi-Fold Marketing Folders', 'Full-Color Single Sheet Flyers', 'Restaurant Menus & Price Lists']
      },
      {
        heading: 'Office Stationery',
        items: ['Branded Presentation Pocket Folders', 'Custom Executive Letterhead', 'Notepads & Sticky Notes', 'Carbonless NCR Invoices']
      },
      {
        heading: 'Promotional Handouts',
        items: ['Promotional Booklets & Catalogs', 'Door Hangers with Tear-Offs', 'Table Tents for Cafes/Events', 'Custom Event Tickets']
      }
    ],
    promo: {
      title: 'Targeted Direct Mailers',
      subtitle: 'Reach local neighborhoods with postage-ready premium mailers.',
      code: 'DIRECT15',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Browse Print Advertising'
    }
  },
  {
    id: 'menu-signs',
    title: 'Signs, Banners & Posters',
    categoryKey: 'Signs & Banners',
    badge: '',
    columns: [
      {
        heading: 'Outdoor Banners',
        items: ['Heavy-Duty Vinyl Banners (Grommets)', 'Mesh Wind-Resistant Banners', 'Retractable Roll-Up Banners', 'Step & Repeat Media Backdrops']
      },
      {
        heading: 'Yard & Event Signs',
        items: ['Corrugated Yard Signs with Stakes', 'A-Frame Heavy Sidewalk Signs', 'Aluminum Parking & Safety Signs', 'Magnetic Vehicle Car Signs']
      },
      {
        heading: 'Posters & Displays',
        items: ['Archival Museum Matte Posters', 'Foam Board Rigid Presentation Boards', 'Glossy Photo Art Posters', 'Acrylic Float Wall Displays']
      },
      {
        heading: 'Trade Show & Exhibits',
        items: ['Custom Fitted Table Throws (6ft, 8ft)', 'Pop-Up Fabric Tension Displays', 'Directional Floor Decals', 'Countertop Promo Easels']
      }
    ],
    promo: {
      title: 'Weatherproof Outdoor Signs',
      subtitle: 'Vibrant UV-cured inks designed to withstand rain and harsh sun.',
      code: 'SIGN20',
      image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Create Custom Signs'
    }
  },
  {
    id: 'menu-clothing',
    title: 'Clothing, Bags & Apparel',
    categoryKey: 'Apparel',
    badge: '',
    columns: [
      {
        heading: 'T-Shirts & Tops',
        items: ['Eco Organic Cotton Graphic Tees', 'Heavyweight Unisex Boxy Tees', 'Long Sleeve Crewneck Shirts', 'Custom Embroidered Polos']
      },
      {
        heading: 'Hoodies & Sweatshirts',
        items: ['Cyberpunk Heavyweight 350 GSM Hoodie', 'Classic Fleece Crewneck Sweats', 'Full-Zip Heavy Winter Hoodies', 'Cropped Fleece Sweatshirts']
      },
      {
        heading: 'Hats & Headwear',
        items: ['Vintage Washed Embroidered Dad Caps', 'Trucker Mesh Snapback Caps', 'Winter Knit Cuffed Beanies', 'Bucket Hats with Custom Patch']
      },
      {
        heading: 'Bags & Accessories',
        items: ['Heavy-Duty Canvas Tote Bags', 'Drawstring Gym Backpacks', 'Zippered Canvas Pouches', 'Custom Woven Blankets']
      }
    ],
    promo: {
      title: 'Direct-to-Garment POD',
      subtitle: 'Zero minimum orders with soft-feel OEKO-TEX water-based inks.',
      code: 'WEARIT',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Explore Apparel Merch'
    }
  },
  {
    id: 'menu-packaging',
    title: 'Labels, Stickers & Packaging',
    categoryKey: 'Accessories',
    badge: '',
    columns: [
      {
        heading: 'Custom Stickers',
        items: ['Contour Die-Cut Vinyl Stickers', 'Kiss-Cut Sticker Sheets', 'Holographic Rainbow Foil Stickers', 'Clear Transparent Waterproof Stickers']
      },
      {
        heading: 'Roll Labels',
        items: ['Product Packaging Roll Labels', 'Waterproof Bottle & Jar Labels', 'Matte Paper Address Labels', 'Metallic Gold Foil Labels']
      },
      {
        heading: 'Shipping & Packaging',
        items: ['Corrugated Shipping Mailer Boxes', 'Custom Printed Poly Mailer Bags', 'Branded Water-Activated Packing Tape', 'Custom Printed Tissue Paper']
      },
      {
        heading: 'Tech & Lifestyle Gear',
        items: ['Tough Armor Custom Phone Cases', 'Slim Snap Polycarbonate Cases', 'Padded Laptop Sleeves', 'Custom Desk Mousepads']
      }
    ],
    promo: {
      title: 'Custom Brand Packaging',
      subtitle: 'Unboxing experiences that turn one-time buyers into loyal advocates.',
      code: 'PACK10',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      ctaText: 'Order Stickers & Boxes'
    }
  }
];

export const DEFAULT_STOREFRONT_CONFIG = {
  // 1. Top Announcement Bar
  showAnnouncement: true,
  announcementText: 'Printed Domestically in USA, UK & Canada • Zero Customs Duties • Fast 2-Day Local Production',
  announcementFacilities: '🇺🇸 Detroit Facility • 🇬🇧 London Facility • 🇨🇦 Toronto Facility',
  
  // 2. Hero Section
  heroTitlePrefix: 'Custom Goods Printed',
  heroTitleAccent: 'Domestically.',
  heroSubtitle: 'Premium vintage apparel, gallery canvas wall art, and ceramic goods printed locally in USA, UK, and Canada. No cross-border delays or customs fees.',
  heroAlignment: 'left', // 'center' | 'left'
  heroTitleSize: 'md',
  heroSubtitleSize: 'sm',
  heroSubtitleSpacing: 'normal',
  heroTopGap: 'sm',
  heroPadding: 'normal',
  showLiveHubBadge: true,
  liveHubBadgeLabel: 'Live Production Hub:',
  showHubSwitcher: true,
  heroTitle: 'Global Quality. Domestic Print Speed.',
  heroCtaText: 'Shop Featured Catalog',
  heroCtaLink: '#catalog-grid',
  heroBadge: 'Local Hub Automation',
  
  // 3. Grid & Spacing Layout
  catalogTitle: 'Featured Domestic Catalog',
  catalogSubtitle: 'Showing products fulfilled by nearest domestic printing partner',
  catalogPadding: 'normal',
  gridColumns: 4,
  gridGap: 'normal',
  cardRadius: '2xl',
  showCategoryPills: true,
  
  // 4. Trust Badges & Value Props
  showTrustProps: true,
  trustProps: [
    { title: 'Local Domestic Couriers', subtitle: 'USPS, Royal Mail & Canada Post' },
    { title: 'Certified Archival Eco Inks', subtitle: 'OEKO-TEX & Non-Toxic' },
    { title: '4.9 / 5 Verified Rating', subtitle: 'Over 12,000 satisfied shoppers' },
  ],
  
  // 5. Customer Reviews Section
  showReviews: true,
  reviewsTitle: 'What Our Customers Say',
  reviewsSubtitle: 'Verified domestic reviews from the United States, United Kingdom, and Canada',
  reviews: [
    {
      id: 1,
      name: 'Emily R.',
      location: 'Brooklyn, New York 🇺🇸',
      comment: '"The Holiday Photo Cards arrived in only 3 days via USPS from the Detroit facility! The gold foil embossing is gorgeous."'
    },
    {
      id: 2,
      name: 'James W.',
      location: 'London, UK 🇬🇧',
      comment: '"So glad it was fulfilled by Prodigi in Hampshire. Zero import taxes or Royal Mail customs hold-ups. The ceramic mug is beautiful!"'
    },
    {
      id: 3,
      name: 'Sophie L.',
      location: 'Vancouver, BC 🇨🇦',
      comment: '"Shipped from Toronto directly to Vancouver via Canada Post. The 2026 wall calendar photos are crystal clear."'
    }
  ],
  
  // 6. Footer & Branding
  brandName: 'PrintFlow Studio',
  badgeTag: 'Domestic POD',
  footerTagline: 'Local direct-to-garment & archival printing facilities in USA (Detroit), UK (London) & Canada (Toronto).',
  copyrightText: '© 2026 PrintFlow Global Ltd. All rights reserved.',

  // 7. Vista-Style Mega Menu & Global Search
  showSearchBar: true,
  searchPlaceholder: 'Search 100+ custom products: Christmas cards, calendars, business cards, banners, hoodies...',
  showMegaMenu: true,
  megaMenuVersion: 4,
  megaMenuCategories: VISTA_MEGA_MENU_CATEGORIES,

  // Mega Menu Dropdown Typography, Spacing & Layout Controls
  menuBarFontSize: 'sm',          // 'xs' (11px) | 'sm' (12px, default) | 'base' (13px) | 'lg' (14px)
  menuBarItemSpacing: 'normal',   // 'compact' | 'normal' | 'relaxed'
  dropdownHeadingFontSize: 'sm',  // 'xs' (10px) | 'sm' (11px, default) | 'base' (12px) | 'lg' (13px)
  dropdownItemFontSize: 'sm',     // 'xs' (11px) | 'sm' (12px, default) | 'base' (13px) | 'lg' (14px)
  dropdownPadding: 'normal',      // 'compact' (py-4) | 'normal' (py-6, default) | 'spacious' (py-8)
  dropdownItemSpacing: 'normal',  // 'compact' | 'normal' | 'spacious'
  dropdownColumnGap: 'normal',    // 'compact' (gap-4) | 'normal' (gap-6) | 'spacious' (gap-8)

  // 8. Vista Top Picks / Visual Categories
  showTopPicks: true,
  topPicksTitle: 'Explore Popular Categories',
  categoryShowcaseCards: [
    {
      title: 'Holiday Photo Cards',
      category: 'Holiday',
      startingPrice: '24.99',
      image: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?w=400&auto=format&fit=crop&q=80',
      badge: 'Festive'
    },
    {
      title: '2026 Wall Calendars',
      category: 'Gifts',
      startingPrice: '21.99',
      image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400&auto=format&fit=crop&q=80',
      badge: 'New'
    },
    {
      title: 'Heavyweight Hoodies',
      category: 'Apparel',
      startingPrice: '48.00',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80',
      badge: 'Best Seller'
    },
    {
      title: 'Custom Vinyl Banners',
      category: 'Signs & Banners',
      startingPrice: '34.00',
      image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=400&auto=format&fit=crop&q=80',
      badge: 'Outdoor'
    },
    {
      title: 'Business Cards',
      category: 'Marketing',
      startingPrice: '19.99',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80',
      badge: 'Essential'
    },
    {
      title: 'Custom Stickers & Labels',
      category: 'Accessories',
      startingPrice: '14.99',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
      badge: 'Die-Cut'
    }
  ],
  topPicks: [
    {
      title: 'Holiday Photo Cards',
      category: 'Holiday',
      startingPrice: '24.99',
      image: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?w=400&auto=format&fit=crop&q=80',
      badge: 'Festive'
    },
    {
      title: '2026 Wall Calendars',
      category: 'Gifts',
      startingPrice: '21.99',
      image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400&auto=format&fit=crop&q=80',
      badge: 'New'
    },
    {
      title: 'Heavyweight Hoodies',
      category: 'Apparel',
      startingPrice: '48.00',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80',
      badge: 'Best Seller'
    },
    {
      title: 'Custom Vinyl Banners',
      category: 'Signs & Banners',
      startingPrice: '34.00',
      image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=400&auto=format&fit=crop&q=80',
      badge: 'Outdoor'
    },
    {
      title: 'Business Cards',
      category: 'Marketing',
      startingPrice: '19.99',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80',
      badge: 'Essential'
    },
    {
      title: 'Custom Stickers & Labels',
      category: 'Accessories',
      startingPrice: '14.99',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
      badge: 'Die-Cut'
    }
  ],

  // 9. Vista Satisfaction Guarantee & Bulk Wholesale Tiers
  showSatisfactionGuarantee: true,
  guaranteeHeading: '100% Satisfaction Guaranteed',
  guaranteeSubtext: 'We stand by every stitch and print. If your custom merchandise is not absolutely flawless, we will reprint it immediately or issue a 100% money-back refund.',
  showBulkDiscounts: true,
  bulkTier1Qty: 5,
  bulkTier1Discount: 10,
  bulkTier2Qty: 10,
  bulkTier2Discount: 15,
  bulkTier3Qty: 25,
  bulkTier3Discount: 25,

  // 10. Vista-Style Promotional Hero Carousel / Photo Slider
  showPromoSlider: true,
  promoBadgeText: '🔥 VISTAPRINT EXCLUSIVE • LIMITED TIME OFFER',
  promoDiscountHeadline: 'SAVE 25%',
  promoDiscountSub: 'Save 25% on custom holiday cards, 2026 calendars, business collateral & apparel.',
  promoCode: 'FESTIVE25',
  promoSlides: [
    {
      id: 1,
      tag: 'Festive Holiday & New Year',
      centerHeading: 'SAVE 25%',
      centerOffer: 'Holiday & Christmas Cards with Gold Foil',
      targetCategory: 'Holiday',
      leftImage: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=800&q=80',
      leftQuote: '“Our family holiday cards arrived in 3 days. The gold foil is stunning!”',
      leftCaption: 'Premium 16pt Foil-Stamped Cards',
      rightImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80',
      rightQuote: '“Printed domestically with zero customs hold-up. True 5-star quality.”',
      rightCaption: 'Embossed Festive Envelopes'
    },
    {
      id: 2,
      tag: 'Custom Calendars & Gifts',
      centerHeading: 'SAVE 20%',
      centerOffer: 'Spiral Wall Calendars & Ceramic Photo Mugs',
      targetCategory: 'Gifts',
      leftImage: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=80',
      leftQuote: '“12 months of crisp, high-resolution photography on heavy satin stock.”',
      leftCaption: '11x8.5 in Wire-O Wall Calendars',
      rightImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      rightQuote: '“Glossy ceramic photo mug that survives dishwasher cycles seamlessly.”',
      rightCaption: '15oz Sublimation Ceramic Mugs'
    },
    {
      id: 3,
      tag: 'Marketing & Business Collateral',
      centerHeading: 'SAVE 25%',
      centerOffer: 'Soft-Touch Business Cards & Brochures',
      targetCategory: 'Marketing',
      leftImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      leftQuote: '“Velvet lamination feels ultra-luxurious in clients’ hands.”',
      leftCaption: '16pt Soft-Touch Business Cards',
      rightImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
      rightQuote: '“Crisp scoring and rich colors that represent our brand perfectly.”',
      rightCaption: 'Tri-Fold Glossy Marketing Brochures'
    },
    {
      id: 4,
      tag: 'Signs, Banners & Decals',
      centerHeading: 'SAVE 25%',
      centerOffer: 'Heavy-Duty Vinyl Banners & Lawn Signs',
      targetCategory: 'Signs & Banners',
      leftImage: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80',
      leftQuote: '“Survived heavy autumn rain and wind without a single tear or fade.”',
      leftCaption: '13oz Scrim Weatherproof Vinyl Banner',
      rightImage: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=800&q=80',
      rightQuote: '“Sturdy steel H-stakes hold firmly in high-traffic grass verges.”',
      rightCaption: 'Corrugated Fluted Lawn Yard Signs'
    }
  ],

  // 11. Luxury 3D Boutique Atelier Background with Frosted Glass Parallax
  enableLuxury3dBackground: true,
  luxuryBgVenue: 'atelier', // 'atelier' | 'flagship' | 'workshop'
  luxuryBgBlur: 'medium',   // 'subtle' | 'medium' | 'deep'
  luxuryBgDepth: 'dynamic', // 'dynamic' | 'fixed'
  luxuryBgGlassOpacity: 25  // 0% (crystal clear transparent) to 100% (solid white tint)
};
