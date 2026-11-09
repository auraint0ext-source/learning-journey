from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr
from datetime import datetime

class ProductBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    base_price_usd: float
    image_url: Optional[str] = None
    sku: str
    supplier: str = "Printify"
    in_stock: bool = True

class ProductResponse(ProductBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class OrderItemSchema(BaseModel):
    product_id: int
    title: str
    quantity: int
    unit_price: float
    mockup_url: Optional[str] = None

class CreateOrderRequest(BaseModel):
    customer_name: str
    customer_email: str
    customer_phone: Optional[str] = None
    target_country: str  # US, UK, CA
    shipping_address: str
    city: str
    postal_code: str
    payment_method: Optional[str] = "card"
    payment_details: Optional[Dict[str, Any]] = None
    items: List[OrderItemSchema]

class OrderResponse(BaseModel):
    id: int
    order_number: str
    customer_name: str
    customer_email: str
    target_country: str
    currency: str
    subtotal: float
    tax_amount: float
    shipping_amount: float
    total_amount: float
    status: str
    pod_provider: str
    pod_external_id: Optional[str] = None
    pod_fulfillment_hub: Optional[str] = None
    payment_method: Optional[str] = "card"
    payment_status: Optional[str] = "PAID"
    transaction_id: Optional[str] = None
    items_json: List[Dict[str, Any]]
    created_at: datetime

    class Config:
        from_attributes = True

class PaymentTransactionResponse(BaseModel):
    id: int
    transaction_id: str
    order_number: str
    customer_name: str
    customer_email: str
    country: str
    currency: str
    amount: float
    payment_method: str
    gateway_provider: str
    merchant_payout_account: Optional[str] = None
    status: str
    payment_details: Optional[Dict[str, Any]] = None
    created_at: datetime

    class Config:
        from_attributes = True

class MerchantAccountConfigSchema(BaseModel):
    gateway_name: str
    display_title: str
    is_enabled: bool = True
    environment: str = "live"
    account_id: Optional[str] = None
    payout_bank: Optional[str] = None
    settlement_currency: str = "USD"
    details: Optional[Dict[str, Any]] = None

class CreateLeadRequest(BaseModel):
    email: str
    name: Optional[str] = None
    phone: Optional[str] = None
    source: str = "website_popup" # meta_ad, tiktok_ad, google_ad, website_popup
    campaign_name: Optional[str] = "Global-POD-Prospects-2026"
    country: str = "US"

class LeadResponse(BaseModel):
    id: int
    name: Optional[str]
    email: str
    phone: Optional[str]
    source: str
    campaign_name: Optional[str]
    country: str
    promo_code: Optional[str]
    is_synced_to_crm: bool
    created_at: datetime

    class Config:
        from_attributes = True

class AdConversionEventCreate(BaseModel):
    platform: str  # META_CAPI, TIKTOK, GOOGLE_ADS
    event_name: str  # Purchase, Lead, AddToCart, ViewContent
    country: str = "US"
    currency: str = "USD"
    value: float = 0.0
    email: Optional[str] = None
    order_id: Optional[str] = None
    custom_data: Optional[Dict[str, Any]] = None

class WorkflowNode(BaseModel):
    id: str
    type: str  # trigger, condition, action
    label: str
    config: Dict[str, Any] = {}
    position: Optional[Dict[str, float]] = None

class WorkflowEdge(BaseModel):
    id: str
    source: str
    target: str
    condition_branch: Optional[str] = None  # "true", "false", or None

class WorkflowCreate(BaseModel):
    name: str
    description: Optional[str] = None
    trigger_type: str  # order_placed, lead_generated, cart_abandoned
    is_active: bool = True
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

class WorkflowResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    trigger_type: str
    is_active: bool
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

class WorkflowExecuteRequest(BaseModel):
    workflow_id: int
    trigger_payload: Dict[str, Any]

class WorkflowExecutionResponse(BaseModel):
    workflow_id: int
    workflow_name: str
    status: str
    logs: List[Dict[str, Any]]
