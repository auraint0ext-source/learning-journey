from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, SessionLocal
from .models.models import Product, AutomationWorkflow, SocialConversation, SocialMessage
from .routers import ecommerce, ads, leads, workflows, inbox, payments

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="POD Global E-Commerce & Marketing Automation Platform",
    description="Scalable Print-on-Demand E-Commerce Engine for USA, UK, and Canada with Meta CAPI, TikTok Events, Google Ads, and Drag-and-Drop Workflow Automation.",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(ecommerce.router)
app.include_router(ads.router)
app.include_router(leads.router)
app.include_router(workflows.router)
app.include_router(inbox.router)
app.include_router(payments.router)

@app.on_event("startup")
def seed_initial_data():
    db = SessionLocal()
    try:
        # Create tables
        Base.metadata.create_all(bind=engine)

        # Seed Social Conversations if empty
        if db.query(SocialConversation).count() == 0:
            c1 = SocialConversation(
                channel="whatsapp",
                customer_name="Sarah Jenkins",
                customer_handle="+1 (415) 555-0142",
                customer_country="US",
                customer_avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
                last_message="Can you confirm if my custom hoodie will be printed at the Detroit hub?",
                unread_count=2,
                related_order_number="ORD-US-8910"
            )
            c1.messages = [
                SocialMessage(sender_type="customer", text="Hi! I just placed an order for the Heavyweight Vintage Hoodie."),
                SocialMessage(sender_type="agent", text="Hello Sarah! Thank you for choosing PrintFlow. Let me check your fulfillment details."),
                SocialMessage(sender_type="customer", text="Can you confirm if my custom hoodie will be printed at the Detroit hub? Need it by Friday.")
            ]

            c2 = SocialConversation(
                channel="whatsapp",
                customer_name="Liam Tremblay",
                customer_handle="+1 (416) 555-0188",
                customer_country="CA",
                customer_avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
                last_message="Does the Canadian delivery come from Toronto or cross the border?",
                unread_count=1,
                related_order_number=None
            )
            c2.messages = [
                SocialMessage(sender_type="customer", text="Hello! Does the Canadian delivery come from Toronto or cross the border? I want to avoid customs taxes."),
                SocialMessage(sender_type="agent", text="Hi Liam! All our Canadian orders are printed domestically at our Duplium facility in Toronto with Canada Post. Zero import taxes!")
            ]

            c3 = SocialConversation(
                channel="messenger",
                customer_name="Oliver Smith",
                customer_handle="oliver.smith.fb",
                customer_country="UK",
                customer_avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
                last_message="Is Royal Mail tracked available for order ORD-UK-BAAC5B?",
                unread_count=1,
                related_order_number="ORD-UK-BAAC5B"
            )
            c3.messages = [
                SocialMessage(sender_type="customer", text="Hi team! Placed order ORD-UK-BAAC5B yesterday."),
                SocialMessage(sender_type="customer", text="Is Royal Mail tracked available for order ORD-UK-BAAC5B?")
            ]

            c4 = SocialConversation(
                channel="messenger",
                customer_name="Emma Watson",
                customer_handle="emma.watson.ny",
                customer_country="US",
                customer_avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
                last_message="Here is your 15% discount code: USA15OFF-415!",
                unread_count=0,
                related_order_number=None
            )
            c4.messages = [
                SocialMessage(sender_type="customer", text="Hey there! Saw your Facebook Lead Ad for the organic graphic tees. Do you have a promo coupon?"),
                SocialMessage(sender_type="agent", text="Here is your 15% discount code: USA15OFF-415! Valid for all US domestic orders.")
            ]

            c5 = SocialConversation(
                channel="instagram",
                customer_name="Chloe Bennett",
                customer_handle="@chloe_designs_uk",
                customer_country="UK",
                customer_avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
                last_message="Love your museum-grade stretched canvas! Can you print custom gallery wrap?",
                unread_count=1,
                related_order_number=None
            )
            c5.messages = [
                SocialMessage(sender_type="customer", text="Love your museum-grade stretched canvas! Can you print custom gallery wrap?"),
                SocialMessage(sender_type="agent", text="Hi Chloe! Yes, our UK Prodigi facility in Hampshire produces certified archival gallery wraps on pine stretcher bars.")
            ]

            c6 = SocialConversation(
                channel="tiktok",
                customer_name="Zack Taylor",
                customer_handle="@zack_trends",
                customer_country="US",
                customer_avatar="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
                last_message="Yo how fast does the DTG tee ship to California?",
                unread_count=1,
                related_order_number=None
            )
            c6.messages = [
                SocialMessage(sender_type="customer", text="Yo how fast does the DTG tee ship to California? Need it for a concert next week.")
            ]

            c7 = SocialConversation(
                channel="twitter",
                customer_name="Alex Mercer",
                customer_handle="@alex_mercer_dev",
                customer_country="US",
                customer_avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
                last_message="Does the matte phone case support Qi wireless charging?",
                unread_count=0,
                related_order_number=None
            )
            c7.messages = [
                SocialMessage(sender_type="customer", text="Does the matte phone case support Qi wireless charging?"),
                SocialMessage(sender_type="agent", text="Hi Alex! Yes, the dual-layer polycarbonate shell is fully MagSafe and Qi wireless compatible.")
            ]

            db.add_all([c1, c2, c3, c4, c5, c6, c7])
            db.commit()
        # Seed Products if empty
        if db.query(Product).count() == 0:
            products = [
                # Marketing & Business
                Product(
                    title="Premium Matte Soft-Touch Business Cards (Pack of 100)",
                    description="Ultra-thick 16pt cardstock with silky soft-touch lamination and crisp edge-to-edge printing. Sharp text & rich saturated colors.",
                    category="Marketing",
                    base_price_usd=19.99,
                    sku="POD-MKT-001",
                    supplier="Prodigi / Gelato",
                    image_url="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Tri-Fold Glossy Marketing Brochures (Pack of 50)",
                    description="Professional 100lb glossy book paper with double-sided aqueous coating. Precision tri-fold scoring for crisp presentation.",
                    category="Marketing",
                    base_price_usd=28.50,
                    sku="POD-MKT-002",
                    supplier="Printify / Gelato",
                    image_url="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Custom Full-Color Promotional Flyers & Postcards (Pack of 100)",
                    description="Heavyweight 14pt glossy cardstock. Perfect for brand announcements, event handouts, and domestic direct mail campaigns.",
                    category="Marketing",
                    base_price_usd=22.00,
                    sku="POD-MKT-003",
                    supplier="SwiftPOD",
                    image_url="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Branded Presentation Pocket Folders (Pack of 25)",
                    description="Custom printed presentation folders with dual interior utility pockets and die-cut business card slot.",
                    category="Marketing",
                    base_price_usd=34.00,
                    sku="POD-MKT-004",
                    supplier="Prodigi",
                    image_url="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),

                # Clothing & Bags (Apparel)
                Product(
                    title="Heavyweight Unisex POD Vintage Hoodie",
                    description="Premium 350 GSM cotton fleece with custom direct-to-garment (DTG) print. Optimized for US, UK & CA fulfillment.",
                    category="Apparel",
                    base_price_usd=48.00,
                    sku="POD-HD-001",
                    supplier="Printify / SwiftPOD",
                    image_url="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Eco-Friendly Organic Cotton Graphic Vintage T-Shirt",
                    description="100% ringspun combed organic cotton. Sustainable water-based inks printed via local facilities in Detroit, Birmingham & Toronto.",
                    category="Apparel",
                    base_price_usd=26.50,
                    sku="POD-TEE-002",
                    supplier="Monster Digital / SwiftPOD",
                    image_url="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Vintage Washed Cotton Twill Embroidered Dad Cap",
                    description="Low-profile 6-panel unstructured cap with high-density 3D puff or flat embroidery. Adjustable brass buckle closure.",
                    category="Apparel",
                    base_price_usd=24.00,
                    sku="POD-CAP-004",
                    supplier="Spoke Custom / SwiftPOD",
                    image_url="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Heavy-Duty Organic Canvas Tote Bag",
                    description="12oz 100% certified organic cotton canvas with reinforced cross-stitched handles. Crisp direct-to-film (DTF) color print.",
                    category="Apparel",
                    base_price_usd=18.00,
                    sku="POD-TOT-007",
                    supplier="Printful / Gelato",
                    image_url="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),

                # Canvas & Wall Art
                Product(
                    title="Museum-Grade Stretched Canvas Art (18x24 in)",
                    description="Acid-free certified artist canvas with FSC certified pine stretcher bars. UV-resistant giclée pigment printing.",
                    category="Wall Art",
                    base_price_usd=59.00,
                    sku="POD-CANV-004",
                    supplier="Duplium / Prodigi",
                    image_url="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Archival Museum Matte Fine Art Poster (18x24 in)",
                    description="250 GSM archival museum-grade paper with smooth matte finish. Vivid pigment-based inks resistant to fading for 100+ years.",
                    category="Wall Art",
                    base_price_usd=32.00,
                    sku="POD-POS-008",
                    supplier="Prodigi",
                    image_url="https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Modern Wood Framed Gallery Art Print (12x18 in)",
                    description="Solid natural oak or black wood frame with shatterproof optical plexiglass and acid-free gallery matting.",
                    category="Wall Art",
                    base_price_usd=52.00,
                    sku="POD-FRM-009",
                    supplier="Gelato / Prodigi",
                    image_url="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Ultra-HD Brushed Metal Photo Art Print (16x20 in)",
                    description="Direct-infused dye sublimation on brushed aluminum plate. Waterproof, scratch-resistant with floating wall mount.",
                    category="Wall Art",
                    base_price_usd=68.00,
                    sku="POD-MTL-010",
                    supplier="Prodigi",
                    image_url="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),

                # Mugs & Drinkware (Home & Living)
                Product(
                    title="Minimalist Matte Ceramic Coffee Mug (15oz)",
                    description="Durable high-gloss ceramic mug, microwave and dishwasher safe. Sublimation printed with vibrant photo-realistic colors.",
                    category="Home & Living",
                    base_price_usd=16.00,
                    sku="POD-MUG-003",
                    supplier="Prodigi / District Photo",
                    image_url="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Double-Wall Insulated Stainless Steel Tumbler (20oz)",
                    description="Vacuum insulated 18/8 food-grade stainless steel with splash-proof lid. Keeps drinks cold for 24h, hot for 8h.",
                    category="Home & Living",
                    base_price_usd=26.50,
                    sku="POD-TMB-011",
                    supplier="Printify / SPOKE",
                    image_url="https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Rustic Enamel Steel Camp Mug (12oz)",
                    description="Lightweight rolled rim steel with genuine campfire enamel finish. Shatterproof design for outdoor and travel use.",
                    category="Home & Living",
                    base_price_usd=19.00,
                    sku="POD-CMP-012",
                    supplier="Gelato / Printful",
                    image_url="https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Vacuum Insulated Thermal Sport Water Bottle (24oz)",
                    description="Ergonomic stainless steel hydro bottle with leakproof spout lid and carry handle. 360-degree cylindrical UV wrap print.",
                    category="Home & Living",
                    base_price_usd=29.00,
                    sku="POD-BTL-013",
                    supplier="Printify / SPOKE",
                    image_url="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),

                # Labels & Stickers & Packaging (Accessories)
                Product(
                    title="Tough Armor Custom Phone Case",
                    description="Dual-layer polycarbonate shell with shock-absorbing TPU liner. Available for iPhone and Samsung Galaxy series.",
                    category="Accessories",
                    base_price_usd=22.00,
                    sku="POD-CASE-005",
                    supplier="Printful / Spoke Custom",
                    image_url="https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Custom Die-Cut Vinyl Stickers (Pack of 50)",
                    description="Thick 6mil weatherproof vinyl with glossy UV laminate. Laser contour cut precisely to your custom artwork shape.",
                    category="Accessories",
                    base_price_usd=14.99,
                    sku="POD-STK-014",
                    supplier="StickerApp / Gelato",
                    image_url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Custom Product Roll Labels (Roll of 250)",
                    description="Waterproof BOPP material with metallic or matte finish. Ideal for custom jar labels, packaging seals, and branded boxes.",
                    category="Accessories",
                    base_price_usd=36.00,
                    sku="POD-LBL-015",
                    supplier="Printful / Prodigi",
                    image_url="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                ),
                Product(
                    title="Custom Printed Corrugated Shipping Mailer Boxes (Pack of 25)",
                    description="Durable E-flute corrugated cardboard printed inside and out with eco-friendly water-based inks. Instant tab lock.",
                    category="Accessories",
                    base_price_usd=45.00,
                    sku="POD-BOX-016",
                    supplier="Packlane / Gelato",
                    image_url="https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
                    in_stock=True
                )
            ]
            db.add_all(products)
            db.commit()

        # Seed Default Workflows if empty
        if db.query(AutomationWorkflow).count() == 0:
            wf1 = AutomationWorkflow(
                name="Global POD Multi-Market Order Fulfillment & Ads Sync",
                description="When an order is placed in US, UK, or Canada: routes to local POD hub, pushes conversion events to Meta CAPI & TikTok, syncs CRM, and sends branded order confirmation.",
                trigger_type="order_placed",
                is_active=True,
                nodes=[
                    {
                        "id": "node-trigger-1",
                        "type": "trigger",
                        "label": "⚡ Order Placed (US, UK, CA)",
                        "config": {"trigger_event": "order_placed"},
                        "position": {"x": 50, "y": 180}
                    },
                    {
                        "id": "node-action-pod",
                        "type": "action",
                        "label": "🏭 Route to Regional POD Facility",
                        "config": {"action_type": "pod_fulfill"},
                        "position": {"x": 340, "y": 80}
                    },
                    {
                        "id": "node-action-meta",
                        "type": "action",
                        "label": "📊 Meta Conversions API (Purchase CAPI)",
                        "config": {"action_type": "meta_capi", "event_name": "Purchase"},
                        "position": {"x": 340, "y": 200}
                    },
                    {
                        "id": "node-action-tiktok",
                        "type": "action",
                        "label": "🎵 TikTok Events API (Purchase)",
                        "config": {"action_type": "tiktok_events", "event_name": "Purchase"},
                        "position": {"x": 340, "y": 320}
                    },
                    {
                        "id": "node-action-email",
                        "type": "action",
                        "label": "✉️ Send Customer Tracking Email",
                        "config": {"action_type": "send_email", "subject": "Your Custom Print Order is in Production!"},
                        "position": {"x": 660, "y": 100}
                    },
                    {
                        "id": "node-action-crm",
                        "type": "action",
                        "label": "🔄 Sync VIP Customer to Klaviyo/HubSpot",
                        "config": {"action_type": "crm_sync"},
                        "position": {"x": 660, "y": 240}
                    },
                    {
                        "id": "node-action-slack",
                        "type": "action",
                        "label": "🔔 Slack Operations Team Notification",
                        "config": {"action_type": "slack_alert"},
                        "position": {"x": 660, "y": 360}
                    }
                ],
                edges=[
                    {"id": "e1", "source": "node-trigger-1", "target": "node-action-pod"},
                    {"id": "e2", "source": "node-trigger-1", "target": "node-action-meta"},
                    {"id": "e3", "source": "node-trigger-1", "target": "node-action-tiktok"},
                    {"id": "e4", "source": "node-action-pod", "target": "node-action-email"},
                    {"id": "e5", "source": "node-action-meta", "target": "node-action-crm"},
                    {"id": "e6", "source": "node-action-tiktok", "target": "node-action-slack"}
                ]
            )

            wf2 = AutomationWorkflow(
                name="Social Lead Capture & Instant Regional Coupon Dispatch",
                description="When a lead arrives via Facebook Instant Forms, TikTok Ads or site popup: issues region-tailored discount coupon (USA15OFF / UK20OFF / CAD15OFF) and syncs with CRM.",
                trigger_type="lead_generated",
                is_active=True,
                nodes=[
                    {
                        "id": "node-lead-trigger",
                        "type": "trigger",
                        "label": "🎯 New Social Lead (Meta / TikTok / Popup)",
                        "config": {"trigger_event": "lead_generated"},
                        "position": {"x": 60, "y": 160}
                    },
                    {
                        "id": "node-lead-crm",
                        "type": "action",
                        "label": "📥 Sync Lead to Klaviyo & HubSpot",
                        "config": {"action_type": "crm_sync"},
                        "position": {"x": 360, "y": 100}
                    },
                    {
                        "id": "node-lead-meta",
                        "type": "action",
                        "label": "📈 Meta CAPI (Lead Event)",
                        "config": {"action_type": "meta_capi", "event_name": "Lead"},
                        "position": {"x": 360, "y": 240}
                    },
                    {
                        "id": "node-lead-email",
                        "type": "action",
                        "label": "🎁 Email Regional Discount Code",
                        "config": {"action_type": "send_email", "subject": "Welcome! Here is your exclusive regional discount"},
                        "position": {"x": 680, "y": 160}
                    }
                ],
                edges=[
                    {"id": "le1", "source": "node-lead-trigger", "target": "node-lead-crm"},
                    {"id": "le2", "source": "node-lead-trigger", "target": "node-lead-meta"},
                    {"id": "le3", "source": "node-lead-crm", "target": "node-lead-email"}
                ]
            )

            db.add(wf1)
            db.add(wf2)
            db.commit()

    finally:
        db.close()

@app.get("/")
def root():
    return {
        "platform": "POD Global E-Commerce & Marketing Automation Engine",
        "status": "RUNNING",
        "supported_markets": ["USA (USD)", "United Kingdom (GBP)", "Canada (CAD)"],
        "api_docs": "/docs",
        "capabilities": [
            "Print-on-Demand local hub routing",
            "Meta Graph API CAPI server-side event tracking",
            "TikTok Marketing Events API & Google Enhanced Conversions",
            "Social Lead Webhooks (Meta Instant Forms)",
            "Visual Drag-and-Drop Automation Workflow Engine"
        ]
    }
