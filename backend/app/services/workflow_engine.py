import datetime
from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from ..models.models import AutomationWorkflow, WorkflowExecutionLog
from .pod_service import PODService
from .social_ads_service import SocialAdsService
from .lead_service import LeadService

class WorkflowEngine:
    @classmethod
    def execute_workflow(
        cls,
        db: Session,
        workflow: AutomationWorkflow,
        payload: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Executes a workflow defined by drag-and-drop nodes and edges.
        Traverses the graph, evaluates conditions, and executes action steps.
        """
        nodes = workflow.nodes or []
        edges = workflow.edges or []
        node_map = {n["id"]: n for n in nodes}

        # Build adjacency list: node_id -> list of edge dicts
        adj = {}
        for edge in edges:
            src = edge.get("source")
            if src not in adj:
                adj[src] = []
            adj[src].append(edge)

        # Find starting trigger node(s)
        trigger_nodes = [n for n in nodes if n.get("type") == "trigger"]
        if not trigger_nodes and nodes:
            trigger_nodes = [nodes[0]]

        execution_logs: List[Dict[str, Any]] = []
        visited = set()
        queue = [n["id"] for n in trigger_nodes]

        overall_status = "SUCCESS"

        while queue:
            current_id = queue.pop(0)
            if current_id in visited:
                continue
            visited.add(current_id)

            node = node_map.get(current_id)
            if not node:
                continue

            node_type = node.get("type")
            node_label = node.get("label", current_id)
            node_config = node.get("config", {})

            step_log = {
                "node_id": current_id,
                "node_label": node_label,
                "node_type": node_type,
                "timestamp": datetime.datetime.utcnow().isoformat(),
                "status": "EXECUTED",
                "output": None
            }

            branch_choice = None  # for conditional nodes: "true" or "false"

            # Execute node logic based on type
            try:
                if node_type == "trigger":
                    step_log["output"] = {
                        "message": f"Trigger activated: {node_config.get('trigger_event', workflow.trigger_type)}",
                        "payload_summary": {k: payload.get(k) for k in ["order_number", "customer_email", "target_country", "total_amount", "currency", "email"] if k in payload}
                    }

                elif node_type == "condition":
                    field = node_config.get("field", "target_country")
                    operator = node_config.get("operator", "equals")
                    expected_value = node_config.get("value", "US")

                    actual_value = payload.get(field)
                    is_match = False
                    if operator == "equals":
                        is_match = str(actual_value).upper() == str(expected_value).upper()
                    elif operator == "greater_than":
                        is_match = float(actual_value or 0) > float(expected_value)
                    elif operator == "contains":
                        is_match = str(expected_value).lower() in str(actual_value or "").lower()

                    branch_choice = "true" if is_match else "false"
                    step_log["output"] = {
                        "condition": f"{field} {operator} '{expected_value}'",
                        "actual_value": actual_value,
                        "result": is_match,
                        "branch_followed": branch_choice
                    }

                elif node_type == "action":
                    action_type = node_config.get("action_type")
                    if action_type == "pod_fulfill":
                        country = payload.get("target_country", "US")
                        items = payload.get("items", [])
                        routing_result = PODService.route_pod_order(country, items)
                        step_log["output"] = {
                            "action": "POD Fulfillment Routing",
                            "result": routing_result
                        }
                    elif action_type == "meta_capi":
                        res = SocialAdsService.dispatch_meta_capi(
                            db=db,
                            event_name=node_config.get("event_name", "Purchase"),
                            country=payload.get("target_country", payload.get("country", "US")),
                            currency=payload.get("currency", "USD"),
                            value=float(payload.get("total_amount", 29.99)),
                            email=payload.get("customer_email", payload.get("email")),
                            order_id=payload.get("order_number")
                        )
                        step_log["output"] = {
                            "action": "Meta Conversions API (CAPI)",
                            "result": res
                        }
                    elif action_type == "tiktok_events":
                        res = SocialAdsService.dispatch_tiktok_events_api(
                            db=db,
                            event_name=node_config.get("event_name", "Purchase"),
                            country=payload.get("target_country", payload.get("country", "US")),
                            currency=payload.get("currency", "USD"),
                            value=float(payload.get("total_amount", 29.99)),
                            email=payload.get("customer_email", payload.get("email")),
                            order_id=payload.get("order_number")
                        )
                        step_log["output"] = {
                            "action": "TikTok Events API",
                            "result": res
                        }
                    elif action_type == "google_enhanced":
                        res = SocialAdsService.dispatch_google_enhanced_conversions(
                            db=db,
                            event_name=node_config.get("event_name", "Purchase"),
                            country=payload.get("target_country", payload.get("country", "US")),
                            currency=payload.get("currency", "USD"),
                            value=float(payload.get("total_amount", 29.99)),
                            email=payload.get("customer_email", payload.get("email")),
                            order_id=payload.get("order_number")
                        )
                        step_log["output"] = {
                            "action": "Google Ads Enhanced Conversions",
                            "result": res
                        }
                    elif action_type == "send_email":
                        recipient = payload.get("customer_email", payload.get("email", "buyer@example.com"))
                        subject = node_config.get("subject", "Order Confirmation & Tracking")
                        step_log["output"] = {
                            "action": "Transactional Email Service",
                            "recipient": recipient,
                            "subject": subject,
                            "template": node_config.get("template", "order_confirmation_v2"),
                            "status": "QUEUED_AND_SENT"
                        }
                    elif action_type == "crm_sync":
                        step_log["output"] = {
                            "action": "CRM & Email Marketing Sync (Klaviyo/HubSpot)",
                            "tags_applied": [f"Market_{payload.get('target_country', 'US')}", "POD_Customer", "High_Intent"],
                            "status": "SYNCED_OK"
                        }
                    elif action_type == "slack_alert":
                        step_log["output"] = {
                            "action": "Slack Team Alert",
                            "channel": "#pod-sales-feed",
                            "message": f"🚀 New POD Order {payload.get('order_number')} ({payload.get('target_country')}) routed to production!"
                        }
                    else:
                        step_log["output"] = {
                            "action": "Custom Generic Action",
                            "config": node_config
                        }

            except Exception as e:
                step_log["status"] = "FAILED"
                step_log["error"] = str(e)
                overall_status = "PARTIAL_FAILURE"

            execution_logs.append(step_log)

            # Determine next nodes to traverse
            outgoing_edges = adj.get(current_id, [])
            for edge in outgoing_edges:
                target_id = edge.get("target")
                condition_branch = edge.get("condition_branch")
                # If this was a condition node, only follow the matching branch
                if branch_choice is not None and condition_branch:
                    if condition_branch.lower() == branch_choice.lower():
                        queue.append(target_id)
                else:
                    queue.append(target_id)

        # Log the execution to DB
        db_log = WorkflowExecutionLog(
            workflow_id=workflow.id,
            workflow_name=workflow.name,
            trigger_source=payload.get("order_number", payload.get("email", "Manual_Simulation")),
            status=overall_status,
            steps_executed=execution_logs
        )
        db.add(db_log)
        db.commit()

        return {
            "workflow_id": workflow.id,
            "workflow_name": workflow.name,
            "status": overall_status,
            "logs": execution_logs
        }
