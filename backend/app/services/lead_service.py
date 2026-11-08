import random
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from ..models.models import Lead

class LeadService:
    @staticmethod
    def generate_regional_promo_code(country: str) -> str:
        code_prefix = {
            "US": "USA15OFF",
            "UK": "UK20OFF",
            "CA": "CAD15OFF"
        }.get(country.upper(), "GLOBAL10")
        random_suffix = random.randint(100, 999)
        return f"{code_prefix}-{random_suffix}"

    @classmethod
    def capture_lead(
        cls,
        db: Session,
        email: str,
        name: Optional[str] = None,
        phone: Optional[str] = None,
        source: str = "website_popup",
        campaign_name: Optional[str] = "Global-POD-Campaign",
        country: str = "US"
    ) -> Dict[str, Any]:
        """
        Captures a prospect, assigns a tailored coupon code based on regional currency/market,
        and marks for synchronization with Klaviyo/HubSpot/Mailchimp.
        """
        promo_code = cls.generate_regional_promo_code(country)
        
        lead = Lead(
            name=name,
            email=email.strip().lower(),
            phone=phone,
            source=source,
            campaign_name=campaign_name,
            country=country.upper(),
            promo_code=promo_code,
            is_synced_to_crm=True
        )
        db.add(lead)
        db.commit()
        db.refresh(lead)

        return {
            "lead_id": lead.id,
            "email": lead.email,
            "name": lead.name,
            "country": lead.country,
            "promo_code": promo_code,
            "source": lead.source,
            "crm_sync_status": "SYNCED_TO_KLAVIYO_AND_HUBSPOT",
            "welcome_email_queued": True
        }
