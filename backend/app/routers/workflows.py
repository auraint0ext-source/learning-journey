from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.models import AutomationWorkflow, WorkflowExecutionLog
from ..schemas.schemas import WorkflowCreate, WorkflowResponse, WorkflowExecutionResponse
from ..services.workflow_engine import WorkflowEngine

router = APIRouter(prefix="/api/workflows", tags=["Drag-and-Drop Automation Workflows"])

@router.get("/", response_model=List[WorkflowResponse])
def list_workflows(db: Session = Depends(get_db)):
    """
    Returns all automation workflows configured via the Drag-and-Drop canvas.
    """
    return db.query(AutomationWorkflow).order_by(AutomationWorkflow.id.desc()).all()

@router.get("/{workflow_id}", response_model=WorkflowResponse)
def get_workflow(workflow_id: int, db: Session = Depends(get_db)):
    wf = db.query(AutomationWorkflow).filter(AutomationWorkflow.id == workflow_id).first()
    if not wf:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return wf

@router.post("/", response_model=WorkflowResponse)
def create_workflow(payload: WorkflowCreate, db: Session = Depends(get_db)):
    """
    Saves a new workflow created on the Drag-and-Drop dashboard canvas.
    """
    wf = AutomationWorkflow(
        name=payload.name,
        description=payload.description,
        trigger_type=payload.trigger_type,
        is_active=payload.is_active,
        nodes=payload.nodes,
        edges=payload.edges
    )
    db.add(wf)
    db.commit()
    db.refresh(wf)
    return wf

@router.put("/{workflow_id}", response_model=WorkflowResponse)
def update_workflow(workflow_id: int, payload: WorkflowCreate, db: Session = Depends(get_db)):
    """
    Updates the drag-and-drop nodes, positions, and connections of an existing workflow.
    """
    wf = db.query(AutomationWorkflow).filter(AutomationWorkflow.id == workflow_id).first()
    if not wf:
        raise HTTPException(status_code=404, detail="Workflow not found")

    wf.name = payload.name
    wf.description = payload.description
    wf.trigger_type = payload.trigger_type
    wf.is_active = payload.is_active
    wf.nodes = payload.nodes
    wf.edges = payload.edges

    db.commit()
    db.refresh(wf)
    return wf

@router.delete("/{workflow_id}")
def delete_workflow(workflow_id: int, db: Session = Depends(get_db)):
    wf = db.query(AutomationWorkflow).filter(AutomationWorkflow.id == workflow_id).first()
    if not wf:
        raise HTTPException(status_code=404, detail="Workflow not found")
    db.delete(wf)
    db.commit()
    return {"message": f"Workflow {workflow_id} deleted successfully"}

@router.post("/{workflow_id}/execute", response_model=WorkflowExecutionResponse)
def simulate_workflow_execution(
    workflow_id: int,
    trigger_payload: Dict[str, Any] = Body(default={}),
    db: Session = Depends(get_db)
):
    """
    Simulates / tests running the workflow with a mock or custom trigger payload.
    Provides immediate step-by-step diagnostic trace.
    """
    wf = db.query(AutomationWorkflow).filter(AutomationWorkflow.id == workflow_id).first()
    if not wf:
        raise HTTPException(status_code=404, detail="Workflow not found")

    # Provide reasonable defaults if empty
    default_payload = {
        "order_number": "ORD-SIM-9921",
        "customer_name": "Alex Mercer",
        "customer_email": "alex.mercer@example.com",
        "target_country": "US",
        "currency": "USD",
        "total_amount": 74.99,
        "items": [{"product_id": 1, "title": "Heavyweight POD Vintage Hoodie", "quantity": 1, "unit_price": 49.99}]
    }
    merged_payload = {**default_payload, **trigger_payload}

    result = WorkflowEngine.execute_workflow(db, wf, merged_payload)
    return result

@router.get("/logs/recent", response_model=List[Dict[str, Any]])
def get_recent_execution_logs(db: Session = Depends(get_db)):
    """
    Returns recent workflow execution logs with full step output traces.
    """
    logs = db.query(WorkflowExecutionLog).order_by(WorkflowExecutionLog.id.desc()).limit(30).all()
    return [
        {
            "id": log.id,
            "workflow_id": log.workflow_id,
            "workflow_name": log.workflow_name,
            "trigger_source": log.trigger_source,
            "status": log.status,
            "steps_count": len(log.steps_executed or []),
            "steps_executed": log.steps_executed,
            "created_at": log.created_at.isoformat()
        }
        for log in logs
    ]
