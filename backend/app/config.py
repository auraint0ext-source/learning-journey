import os
from pydantic import BaseModel
from typing import Dict, Any

class MarketConfig(BaseModel):
    country_code: str
    country_name: str
    currency: str
    currency_symbol: str
    exchange_rate_to_usd: float
    tax_name: str
    tax_rate_percent: float
    shipping_base_rate: float
    fulfillment_hub: str

MARKETS: Dict[str, MarketConfig] = {
    "US": MarketConfig(
        country_code="US",
        country_name="United States",
        currency="USD",
        currency_symbol="$",
        exchange_rate_to_usd=1.0,
        tax_name="Sales Tax (Avg)",
        tax_rate_percent=7.5,
        shipping_base_rate=4.99,
        fulfillment_hub="Printify US Hub (Detroit / Miami / Reno)"
    ),
    "UK": MarketConfig(
        country_code="UK",
        country_name="United Kingdom",
        currency="GBP",
        currency_symbol="£",
        exchange_rate_to_usd=0.79,
        tax_name="VAT",
        tax_rate_percent=20.0,
        shipping_base_rate=3.99,
        fulfillment_hub="Prodigi / Printify UK Hub (London / Birmingham)"
    ),
    "CA": MarketConfig(
        country_code="CA",
        country_name="Canada",
        currency="CAD",
        currency_symbol="CA$",
        exchange_rate_to_usd=1.38,
        tax_name="HST/GST (Avg)",
        tax_rate_percent=13.0,
        shipping_base_rate=6.99,
        fulfillment_hub="Duplium / SwiftPOD CA (Toronto / Vancouver)"
    )
}

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./pod_ecommerce.db")
SECRET_KEY = os.getenv("SECRET_KEY", "super-secret-key-pod-2026")
