from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Text, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from ..database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(100), default="Apparel")
    base_price_usd = Column(Float, nullable=False)
    image_url = Column(String(500), nullable=True)
    sku = Column(String(100), unique=True, index=True)
    supplier = Column(String(100), default="Printify")
    in_stock = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String(50), unique=True, index=True)
    customer_name = Column(String(150), nullable=False)
    customer_email = Column(String(150), nullable=False)
    customer_phone = Column(String(50), nullable=True)
    target_country = Column(String(10), nullable=False) # US, UK, CA
    shipping_address = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)
    postal_code = Column(String(50), nullable=False)
    
    currency = Column(String(10), default="USD")
    subtotal = Column(Float, nullable=False)
    tax_amount = Column(Float, default=0.0)
    shipping_amount = Column(Float, default=0.0)
    total_amount = Column(Float, nullable=False)
    
    status = Column(String(50), default="PENDING") # PENDING, POD_ROUTED, IN_PRODUCTION, SHIPPED, COMPLETED
    pod_provider = Column(String(100), default="Printify")
    pod_external_id = Column(String(100), nullable=True)
    pod_fulfillment_hub = Column(String(200), nullable=True)
    payment_method = Column(String(50), default="card")
    payment_status = Column(String(50), default="PAID")
    transaction_id = Column(String(100), nullable=True)
    
    items_json = Column(JSON, nullable=False) # list of items {product_id, title, qty, price, mockup_url}
    created_at = Column(DateTime, default=datetime.utcnow)

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=True)
    email = Column(String(150), index=True, nullable=False)
    phone = Column(String(50), nullable=True)
    source = Column(String(100), default="website_popup") # meta_ad, tiktok_ad, google_ad, website_popup
    campaign_name = Column(String(150), nullable=True)
    country = Column(String(10), default="US")
    promo_code = Column(String(50), nullable=True)
    is_synced_to_crm = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class AdConversionEvent(Base):
    __tablename__ = "ad_conversion_events"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String(50), nullable=False) # META_CAPI, TIKTOK, GOOGLE_ADS
    event_name = Column(String(50), nullable=False) # Purchase, Lead, AddToCart, ViewContent
    event_id = Column(String(100), unique=True, index=True)
    country = Column(String(10), default="US")
    currency = Column(String(10), default="USD")
    value = Column(Float, default=0.0)
    user_email_hashed = Column(String(100), nullable=True)
    status = Column(String(50), default="SENT")
    raw_payload = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class AutomationWorkflow(Base):
    __tablename__ = "automation_workflows"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    trigger_type = Column(String(50), nullable=False) # order_placed, lead_generated, cart_abandoned
    is_active = Column(Boolean, default=True)
    nodes = Column(JSON, nullable=False) # Nodes array for drag-and-drop
    edges = Column(JSON, nullable=False) # Edges/connections array
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class WorkflowExecutionLog(Base):
    __tablename__ = "workflow_execution_logs"

    id = Column(Integer, primary_key=True, index=True)
    workflow_id = Column(Integer, ForeignKey("automation_workflows.id"), nullable=True)
    workflow_name = Column(String(150), nullable=False)
    trigger_source = Column(String(100), nullable=False)
    status = Column(String(50), default="SUCCESS") # SUCCESS, FAILED, RUNNING
    steps_executed = Column(JSON, nullable=False) # Log array of executed nodes & actions
    created_at = Column(DateTime, default=datetime.utcnow)

class SocialConversation(Base):
    __tablename__ = "social_conversations"

    id = Column(Integer, primary_key=True, index=True)
    channel = Column(String(50), nullable=False, index=True) # whatsapp, messenger, instagram, tiktok, twitter
    customer_name = Column(String(150), nullable=False)
    customer_handle = Column(String(150), nullable=False)
    customer_country = Column(String(10), default="US")
    customer_avatar = Column(String(500), nullable=True)
    last_message = Column(Text, nullable=True)
    unread_count = Column(Integer, default=0)
    related_order_number = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    messages = relationship("SocialMessage", back_populates="conversation", cascade="all, delete-orphan")

class SocialMessage(Base):
    __tablename__ = "social_messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("social_conversations.id"), nullable=False)
    sender_type = Column(String(20), default="customer") # customer, agent, bot
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    conversation = relationship("SocialConversation", back_populates="messages")

class PaymentTransaction(Base):
    __tablename__ = "payment_transactions"

    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(String(100), unique=True, index=True)
    order_number = Column(String(50), index=True)
    customer_name = Column(String(150), nullable=False)
    customer_email = Column(String(150), nullable=False)
    country = Column(String(10), default="US")
    currency = Column(String(10), default="USD")
    amount = Column(Float, nullable=False)
    payment_method = Column(String(50), nullable=False) # card, apple_pay, google_pay, paypal, bank_transfer, klarna
    gateway_provider = Column(String(50), default="Stripe")
    merchant_payout_account = Column(String(150), nullable=True)
    status = Column(String(50), default="SETTLED") # SETTLED, COMPLETED, PENDING_CLEARANCE, REFUNDED
    payment_details = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class MerchantAccountConfig(Base):
    __tablename__ = "merchant_account_configs"

    id = Column(Integer, primary_key=True, index=True)
    gateway_name = Column(String(50), unique=True, index=True) # stripe, paypal, bank_us, bank_uk, bank_ca, klarna
    display_title = Column(String(100), nullable=False)
    is_enabled = Column(Boolean, default=True)
    environment = Column(String(20), default="live") # live, test
    account_id = Column(String(100), nullable=True)
    payout_bank = Column(String(150), nullable=True)
    settlement_currency = Column(String(10), default="USD")
    details = Column(JSON, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
