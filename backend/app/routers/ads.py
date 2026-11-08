import uuid
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import AdConversionEvent, Lead, AutomationWorkflow
from ..schemas.schemas import AdConversionEventCreate
from ..services.social_ads_service import SocialAdsService
from ..services.workflow_engine import WorkflowEngine
from ..services.lead_service import LeadService

router = APIRouter(prefix="/api/ads", tags=["Social Media Ads & Conversion APIs"])

@router.post("/conversion")
def log_conversion_event(event: AdConversionEventCreate, db: Session = Depends(get_db)):
    """
    Directly dispatches a conversion event to Meta CAPI, TikTok Events, or Google Ads.
    """
    platform = event.platform.upper()
    if platform == "META_CAPI":
        return SocialAdsService.dispatch_meta_capi(
            db=db,
            event_name=event.event_name,
            country=event.country,
            currency=event.currency,
            value=event.value,
            email=event.email,
            order_id=event.order_id,
            custom_data=event.custom_data
        )
    elif platform == "TIKTOK":
        return SocialAdsService.dispatch_tiktok_events_api(
            db=db,
            event_name=event.event_name,
            country=event.country,
            currency=event.currency,
            value=event.value,
            email=event.email,
            order_id=event.order_id
        )
    elif platform == "GOOGLE_ADS":
        return SocialAdsService.dispatch_google_enhanced_conversions(
            db=db,
            event_name=event.event_name,
            country=event.country,
            currency=event.currency,
            value=event.value,
            email=event.email,
            order_id=event.order_id
        )
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported ad platform '{platform}'.")

@router.get("/events")
def list_conversion_events(db: Session = Depends(get_db)):
    """
    Lists recent conversion events sent to Meta, TikTok, and Google Ads.
    """
    events = db.query(AdConversionEvent).order_by(AdConversionEvent.id.desc()).limit(50).all()
    return events

@router.post("/webhook/meta-lead")
def meta_lead_ad_webhook(payload: Dict[str, Any] = Body(...), db: Session = Depends(get_db)):
    """
    Webhook endpoint to receive leads from Meta Lead Ads (Facebook & Instagram Instant Forms).
    Parses lead details, saves lead, and automatically triggers 'lead_generated' automation workflows.
    """
    # Parse mock or real Meta Instant Form payload
    email = payload.get("email") or payload.get("field_data", {}).get("email", f"fb_lead_{uuid.uuid4().hex[:6]}@example.com")
    name = payload.get("full_name") or payload.get("field_data", {}).get("full_name", "Prospective Buyer")
    phone = payload.get("phone_number") or payload.get("field_data", {}).get("phone_number", "+1-555-0199")
    country = payload.get("country", "US").upper()
    campaign_name = payload.get("campaign_name", "Meta-POD-Retargeting-US-UK-CA")

    # Capture Lead
    lead_res = LeadService.capture_lead(
        db=db,
        email=email,
        name=name,
        phone=phone,
        source="meta_instant_form",
        campaign_name=campaign_name,
        country=country
    )

    # Trigger active 'lead_generated' workflows
    active_workflows = db.query(AutomationWorkflow).filter(
        AutomationWorkflow.trigger_type == "lead_generated",
        AutomationWorkflow.is_active == True
    ).all()

    trigger_payload = {
        "lead_id": lead_res["lead_id"],
        "email": email,
        "name": name,
        "country": country,
        "promo_code": lead_res["promo_code"],
        "source": "meta_instant_form"
    }

    workflow_results = []
    for wf in active_workflows:
        res = WorkflowEngine.execute_workflow(db, wf, trigger_payload)
        workflow_results.append(res)

    return {
        "status": "PROCESSED",
        "lead": lead_res,
        "workflows_triggered": len(workflow_results)
    }

@router.get("/metrics")
def get_ad_metrics(db: Session = Depends(get_db)):
    """
    Returns marketing and ad conversion analytics.
    """
    total_events = db.query(AdConversionEvent).count()
    meta_events = db.query(AdConversionEvent).filter(AdConversionEvent.platform == "META_CAPI").count()
    tiktok_events = db.query(AdConversionEvent).filter(AdConversionEvent.platform == "TIKTOK_EVENTS").count()
    gads_events = db.query(AdConversionEvent).filter(AdConversionEvent.platform == "GOOGLE_ADS").count()

    return {
        "total_ad_events_synced": total_events,
        "by_platform": {
            "meta_capi": meta_events,
            "tiktok_events": tiktok_events,
            "google_ads": gads_events
        },
        "supported_apis": [
            "Meta Graph API v21.0 Conversions API (CAPI)",
            "TikTok Marketing API Events v1.3",
            "Google Ads API Enhanced Conversions v18"
        ]
    }
