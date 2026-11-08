import hashlib
import time
import uuid
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from ..models.models import AdConversionEvent

class SocialAdsService:
    @staticmethod
    def _hash_string(val: Optional[str]) -> Optional[str]:
        if not val:
            return None
        return hashlib.sha256(val.strip().lower().encode("utf-8")).hexdigest()

    @classmethod
    def dispatch_meta_capi(
        cls,
        db: Session,
        event_name: str,
        country: str,
        currency: str,
        value: float,
        email: Optional[str] = None,
        phone: Optional[str] = None,
        order_id: Optional[str] = None,
        custom_data: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Simulates sending a server-side conversion event to Meta Conversions API (CAPI).
        Formats standard Facebook Pixel / CAPI schema with SHA-256 hashed user data.
        """
        event_id = f"meta_{uuid.uuid4().hex[:12]}"
        hashed_email = cls._hash_string(email)
        hashed_phone = cls._hash_string(phone)

        capi_payload = {
            "data": [
                {
                    "event_name": event_name,
                    "event_time": int(time.time()),
                    "event_id": event_id,
                    "action_source": "website",
                    "user_data": {
                        "em": [hashed_email] if hashed_email else [],
                        "ph": [hashed_phone] if hashed_phone else [],
                        "country": [cls._hash_string(country.lower())],
                        "client_user_agent": "Mozilla/5.0 POD-Client/2.0",
                        "client_ip_address": "127.0.0.1"
                    },
                    "custom_data": {
                        "currency": currency,
                        "value": value,
                        "order_id": order_id,
                        **(custom_data or {})
                    }
                }
            ],
            "test_event_code": f"TEST_{country.upper()}_POD"
        }

        # Store in database for verification & audit
        record = AdConversionEvent(
            platform="META_CAPI",
            event_name=event_name,
            event_id=event_id,
            country=country.upper(),
            currency=currency,
            value=value,
            user_email_hashed=hashed_email,
            status="DELIVERED_200_OK",
            raw_payload=capi_payload
        )
        db.add(record)
        db.commit()
        db.refresh(record)

        return {
            "platform": "META_CAPI",
            "status": "SUCCESS",
            "event_id": event_id,
            "fbtrace_id": f"fb_trace_{uuid.uuid4().hex[:8]}",
            "events_received": 1,
            "payload_preview": capi_payload
        }

    @classmethod
    def dispatch_tiktok_events_api(
        cls,
        db: Session,
        event_name: str,
        country: str,
        currency: str,
        value: float,
        email: Optional[str] = None,
        order_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Simulates TikTok Events API server-to-server tracking.
        """
        event_id = f"tt_{uuid.uuid4().hex[:12]}"
        hashed_email = cls._hash_string(email)
        
        payload = {
            "event_source": "web",
            "event_source_id": "TT_PIXEL_POD_GLOBAL",
            "data": [{
                "event": event_name,
                "event_id": event_id,
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "user": {"email": hashed_email},
                "properties": {
                    "currency": currency,
                    "value": value,
                    "order_id": order_id
                }
            }]
        }

        record = AdConversionEvent(
            platform="TIKTOK_EVENTS",
            event_name=event_name,
            event_id=event_id,
            country=country.upper(),
            currency=currency,
            value=value,
            user_email_hashed=hashed_email,
            status="DELIVERED_200_OK",
            raw_payload=payload
        )
        db.add(record)
        db.commit()

        return {
            "platform": "TIKTOK_EVENTS",
            "status": "SUCCESS",
            "event_id": event_id,
            "code": 0,
            "message": "OK"
        }

    @classmethod
    def dispatch_google_enhanced_conversions(
        cls,
        db: Session,
        event_name: str,
        country: str,
        currency: str,
        value: float,
        email: Optional[str] = None,
        order_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Simulates Google Ads Enhanced Conversions for Web API.
        """
        event_id = f"gads_{uuid.uuid4().hex[:12]}"
        hashed_email = cls._hash_string(email)
        
        payload = {
            "conversion_action": f"customers/982341234/conversionActions/{event_name.lower()}",
            "conversion_date_time": time.strftime("%Y-%m-%d %H:%M:%S+00:00", time.gmtime()),
            "conversion_value": value,
            "currency_code": currency,
            "order_id": order_id,
            "user_identifiers": [{"hashed_email": hashed_email}] if hashed_email else []
        }

        record = AdConversionEvent(
            platform="GOOGLE_ADS",
            event_name=event_name,
            event_id=event_id,
            country=country.upper(),
            currency=currency,
            value=value,
            user_email_hashed=hashed_email,
            status="DELIVERED_200_OK",
            raw_payload=payload
        )
        db.add(record)
        db.commit()

        return {
            "platform": "GOOGLE_ADS",
            "status": "SUCCESS",
            "event_id": event_id,
            "partial_failure_error": None
        }
