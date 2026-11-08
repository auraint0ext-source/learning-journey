from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import Lead, AutomationWorkflow
from ..schemas.schemas import CreateLeadRequest, LeadResponse
from ..services.lead_service import LeadService
from ..services.workflow_engine import WorkflowEngine

router = APIRouter(prefix="/api/leads", tags=["Lead Generation & CRM Sync"])

@router.post("/", response_model=LeadResponse)
def capture_lead(request: CreateLeadRequest, db: Session = Depends(get_db)):
    """
    Captures a lead from storefront popup, social ad campaign, or discount wheel.
    Generates tailored market promo code (e.g. USA15OFF, UK20OFF, CAD15OFF)
    and executes 'lead_generated' automation workflows.
    """
    res = LeadService.capture_lead(
        db=db,
        email=request.email,
        name=request.name,
        phone=request.phone,
        source=request.source,
        campaign_name=request.campaign_name,
        country=request.country
    )

    lead = db.query(Lead).filter(Lead.id == res["lead_id"]).first()

    # Trigger active workflows for lead generation
    active_workflows = db.query(AutomationWorkflow).filter(
        AutomationWorkflow.trigger_type == "lead_generated",
        AutomationWorkflow.is_active == True
    ).all()

    trigger_payload = {
        "lead_id": lead.id,
        "email": lead.email,
        "name": lead.name,
        "country": lead.country,
        "promo_code": lead.promo_code,
        "source": lead.source
    }

    for wf in active_workflows:
        WorkflowEngine.execute_workflow(db, wf, trigger_payload)

    return lead

@router.get("/", response_model=List[LeadResponse])
def get_leads(db: Session = Depends(get_db)):
    """
    Returns all captured leads across US, UK, and CA.
    """
    return db.query(Lead).order_by(Lead.id.desc()).all()
