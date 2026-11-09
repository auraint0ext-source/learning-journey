// Centralized Full Product Catalog with VistaPrint Specs & Multi-Market Pod Fulfillment

export const DEFAULT_CATALOG_PRODUCTS = [
  // 1. Holiday & Christmas Cards
  {
    id: 101,
    title: 'Custom Christmas & Holiday Photo Cards (Pack of 25)',
    description: 'Personalized holiday greeting cards printed on premium 16pt cardstock. Includes white envelopes and edge-to-edge photo reproduction.',
    category: 'Holiday',
    base_price_usd: 24.99,
    image_url: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-XMAS-001',
    supplier: 'Prodigi / Gelato',
    in_stock: true,
    tags: ['holiday', 'christmas', 'cards', 'photo card', '1 photo', '2-3 photos', 'family']
  },
  {
    id: 102,
    title: 'Luxury Embossed Gold Foil Holiday Cards (Pack of 25)',
    description: 'Real metallic gold foil accents that catch the festive light. Heavyweight velvety soft-touch stock with coordinating gold-lined envelopes.',
    category: 'Holiday',
    base_price_usd: 32.50,
    image_url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-XMAS-002',
    supplier: 'Duplium / Gelato',
    in_stock: true,
    tags: ['foil', 'gold foil', 'christmas', 'holiday', 'embossed', 'luxury', 'cards']
  },
  {
    id: 103,
    title: 'Corporate & Business Festive Greeting Cards (Pack of 50)',
    description: 'High-end business holiday cards featuring your company logo and custom inside greeting. Impress clients and partners this holiday season.',
    category: 'Holiday',
    base_price_usd: 42.00,
    image_url: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-XMAS-003',
    supplier: 'Prodigi',
    in_stock: true,
    tags: ['corporate', 'business', 'holiday', 'greeting', 'cards', 'logo']
  },
  {
    id: 104,
    title: 'New Year Family Collage Photo Cards (Pack of 25)',
    description: 'Multi-photo grid collage layout celebrating all the highlights of the past year. Crisp archival printing on linen textured cardstock.',
    category: 'Holiday',
    base_price_usd: 26.00,
    image_url: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-XMAS-004',
    supplier: 'Printify',
    in_stock: true,
    tags: ['new year', 'holiday', 'cards', '4+ photos', 'collage']
  },

  // 2. Calendars & Gifts
  {
    id: 201,
    title: 'Custom Wall Calendar (11x8.5 in Spiral Bound)',
    description: '12-month personalized wall calendar with 250 GSM heavy satin pages, wire-o binding, and drilled hole for effortless hanging.',
    category: 'Gifts',
    base_price_usd: 21.99,
    image_url: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-CAL-001',
    supplier: 'Prodigi / Gelato',
    in_stock: true,
    tags: ['calendar', 'wall calendar', 'custom calendar', 'gifts', 'photo calendar', '2026']
  },
  {
    id: 202,
    title: 'Desk Easel Flip Photo Calendar (5x7 in)',
    description: 'Compact standing flip calendar ideal for home offices and work desks. Heavy card pages with sturdy built-in triangular tent base.',
    category: 'Gifts',
    base_price_usd: 16.50,
    image_url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-CAL-002',
    supplier: 'SwiftPOD',
    in_stock: true,
    tags: ['calendar', 'desk calendar', 'easel', 'gifts', 'office']
  },
  {
    id: 13,
    title: 'Minimalist Matte Ceramic Coffee Mug (15oz)',
    description: 'Durable high-gloss ceramic mug, microwave and dishwasher safe. Sublimation printed with vibrant photo-realistic colors.',
    category: 'Gifts',
    base_price_usd: 16.00,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-MUG-003',
    supplier: 'Prodigi / District Photo',
    in_stock: true,
    tags: ['mug', 'ceramic mug', 'drinkware', 'gifts', 'coffee']
  },
  {
    id: 14,
    title: 'Double-Wall Insulated Stainless Steel Tumbler (20oz)',
    description: 'Vacuum insulated 18/8 food-grade stainless steel with splash-proof lid. Keeps drinks cold for 24h, hot for 8h.',
    category: 'Gifts',
    base_price_usd: 26.50,
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-TMB-011',
    supplier: 'Printify / SPOKE',
    in_stock: true,
    tags: ['tumbler', 'stainless', 'drinkware', 'gifts']
  },

  // 3. Signs, Banners & Posters
  {
    id: 301,
    title: 'Custom Outdoor Heavy-Duty Vinyl Banner (4x2 ft)',
    description: 'Weatherproof 13oz scrim vinyl banner with reinforced welded hems and brass hanging grommets every 2 feet. UV-cured fade resistant inks.',
    category: 'Signs & Banners',
    base_price_usd: 34.00,
    image_url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-SGN-001',
    supplier: 'Prodigi / Gelato',
    in_stock: true,
    tags: ['banner', 'vinyl banner', 'outdoor', 'grommets', 'signs', 'weatherproof']
  },
  {
    id: 302,
    title: 'Corrugated Lawn & Yard Signs with H-Stakes (Pack of 3)',
    description: 'Fluted 4mm weatherproof polypropylene yard signs with sturdy galvanized steel H-stakes. Double-sided vivid full-color printing.',
    category: 'Signs & Banners',
    base_price_usd: 28.00,
    image_url: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-SGN-002',
    supplier: 'SwiftPOD',
    in_stock: true,
    tags: ['yard sign', 'lawn sign', 'signs', 'stakes', 'event sign', 'real estate']
  },
  {
    id: 303,
    title: 'Retractable Deluxe Roll-Up Banner Stand (33x81 in)',
    description: 'Free-standing aluminum banner cassette with full-color curl-resistant polyester banner and padded zip carry bag. Perfect for trade shows.',
    category: 'Signs & Banners',
    base_price_usd: 79.00,
    image_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-SGN-003',
    supplier: 'Duplium',
    in_stock: true,
    tags: ['trade show', 'roll-up banner', 'retractable', 'exhibit', 'signs']
  },

  // 4. Business Cards & Marketing Collateral
  {
    id: 1,
    title: 'Premium Matte Soft-Touch Business Cards (Pack of 100)',
    description: 'Ultra-thick 16pt cardstock with silky soft-touch lamination and crisp edge-to-edge printing. Sharp typography & saturated colors.',
    category: 'Marketing',
    base_price_usd: 19.99,
    image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-MKT-001',
    supplier: 'Prodigi / Gelato',
    in_stock: true,
    tags: ['business cards', 'cards', 'matte', 'soft-touch', 'marketing']
  },
  {
    id: 105,
    title: 'Embossed Gold Foil Luxury Business Cards (Pack of 100)',
    description: 'Refined metallic gold foil stamping raised above velvet matte paper stock. Give your business card unbeatable tactile prestige.',
    category: 'Marketing',
    base_price_usd: 29.99,
    image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-MKT-005',
    supplier: 'Gelato / Prodigi',
    in_stock: true,
    tags: ['business cards', 'gold foil', 'foil', 'luxury', 'embossed', 'marketing']
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
    in_stock: true,
    tags: ['brochure', 'tri-fold', 'flyer', 'marketing', 'print']
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
    in_stock: true,
    tags: ['flyers', 'postcards', 'direct mail', 'marketing', 'print']
  },
  {
    id: 4,
    title: 'Branded Presentation Pocket Folders (Pack of 25)',
    description: 'Custom printed presentation folders with dual interior utility pockets and die-cut business card slot.',
    category: 'Marketing',
    base_price_usd: 34.00,
    image_url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-MKT-004',
    supplier: 'Prodigi',
    in_stock: true,
    tags: ['folders', 'pocket folders', 'stationery', 'office', 'marketing']
  },

  // 5. Clothing & Apparel
  {
    id: 5,
    title: 'Heavyweight Unisex POD Vintage Hoodie (350 GSM)',
    description: 'Premium 350 GSM cotton fleece with custom direct-to-garment (DTG) print. Optimized for US, UK & CA domestic fulfillment.',
    category: 'Apparel',
    base_price_usd: 48.00,
    image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-HD-001',
    supplier: 'Printify / SwiftPOD',
    in_stock: true,
    tags: ['hoodie', 'apparel', 'clothing', 'sweatshirt', 'fleece']
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
    in_stock: true,
    tags: ['t-shirt', 'tee', 'apparel', 'clothing', 'organic']
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
    in_stock: true,
    tags: ['cap', 'hat', 'embroidery', 'dad cap', 'apparel']
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
    in_stock: true,
    tags: ['tote bag', 'bag', 'canvas tote', 'apparel', 'accessories']
  },

  // 6. Wall Art & Canvas
  {
    id: 9,
    title: 'Museum-Grade Stretched Canvas Art (18x24 in)',
    description: 'Acid-free certified artist canvas with FSC certified pine stretcher bars. UV-resistant giclée pigment printing.',
    category: 'Wall Art',
    base_price_usd: 59.00,
    image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-CANV-004',
    supplier: 'Duplium / Prodigi',
    in_stock: true,
    tags: ['canvas', 'wall art', 'decor', 'giclee']
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
    in_stock: true,
    tags: ['poster', 'art print', 'matte poster', 'wall art']
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
    in_stock: true,
    tags: ['framed print', 'wood frame', 'wall art', 'decor']
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
    in_stock: true,
    tags: ['metal print', 'brushed metal', 'wall art', 'decor']
  },

  // 7. Labels, Stickers & Packaging
  {
    id: 18,
    title: 'Custom Die-Cut Vinyl Stickers (Pack of 50)',
    description: 'Thick 6mil weatherproof vinyl with glossy UV laminate. Laser contour cut precisely to your custom artwork shape.',
    category: 'Accessories',
    base_price_usd: 14.99,
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-STK-014',
    supplier: 'StickerApp / Gelato',
    in_stock: true,
    tags: ['stickers', 'die-cut', 'vinyl stickers', 'labels', 'accessories']
  },
  {
    id: 19,
    title: 'Custom Product Packaging Roll Labels (Roll of 250)',
    description: 'Waterproof BOPP material with metallic or matte finish. Ideal for custom jar labels, packaging seals, and branded boxes.',
    category: 'Accessories',
    base_price_usd: 36.00,
    image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-LBL-015',
    supplier: 'Printful / Prodigi',
    in_stock: true,
    tags: ['roll labels', 'labels', 'packaging', 'stickers', 'accessories']
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
    in_stock: true,
    tags: ['mailer boxes', 'packaging', 'boxes', 'shipping', 'accessories']
  },
  {
    id: 17,
    title: 'Tough Armor Custom Phone Case',
    description: 'Dual-layer polycarbonate shell with shock-absorbing TPU liner. Available for iPhone and Samsung Galaxy series.',
    category: 'Accessories',
    base_price_usd: 22.00,
    image_url: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80',
    sku: 'POD-CASE-005',
    supplier: 'Printful / Spoke Custom',
    in_stock: true,
    tags: ['phone case', 'accessories', 'magsafe']
  }
];
