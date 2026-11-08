import uuid
from typing import Dict, Any, List
from ..config import MARKETS

class PODService:
    @staticmethod
    def route_pod_order(target_country: str, items: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Routes the order to the nearest Print-on-Demand supplier and facility.
        US -> Monster Digital / SwiftPOD US
        UK -> Prodigi / T-Shirt & Sons UK
        CA -> Duplium / SwiftPOD Canada
        """
        market = MARKETS.get(target_country.upper(), MARKETS["US"])
        external_order_id = f"POD-{target_country.upper()}-{uuid.uuid4().hex[:8].upper()}"
        
        # Determine specific production partner per country
        if target_country.upper() == "US":
            provider = "Printify US Network"
            facility = "Monster Digital (Detroit, MI) & SwiftPOD (San Jose, CA)"
            avg_production_days = "2-3 business days"
            courier = "USPS Priority / FedEx Home Delivery"
        elif target_country.upper() == "UK":
            provider = "Printify UK / Prodigi"
            facility = "T-Shirt & Sons (Westbury) & Prodigi (Alton, Hampshire)"
            avg_production_days = "1-2 business days"
            courier = "Royal Mail 24/48 Tracked / DPD UK"
        elif target_country.upper() == "CA":
            provider = "Printify CA / Duplium"
            facility = "Duplium Hub (Toronto, ON)"
            avg_production_days = "2-4 business days"
            courier = "Canada Post Expedited / Purolator"
        else:
            provider = "Global POD Network"
            facility = market.fulfillment_hub
            avg_production_days = "3-5 business days"
            courier = "DHL Express Worldwide"

        return {
            "status": "ACCEPTED_BY_PRODUCTION",
            "pod_provider": provider,
            "pod_external_id": external_order_id,
            "pod_fulfillment_hub": facility,
            "production_time": avg_production_days,
            "carrier": courier,
            "items_dispatched_count": len(items),
            "tracking_number": f"TRK-{uuid.uuid4().hex[:10].upper()}"
        }
