from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Query, Body
from sqlalchemy.orm import Session
from ..database import get_db, engine, Base
from ..models.models import SocialConversation, SocialMessage, Order

router = APIRouter(prefix="/api/inbox", tags=["Unified Omnichannel Social Inbox"])

@router.get("/channels")
def get_channels(db: Session = Depends(get_db)):
    """
    Returns supported social media channels with real-time unread counts.
    """
    channels_def = [
        {"id": "whatsapp", "name": "WhatsApp Business", "icon": "whatsapp", "color": "#25D366"},
        {"id": "messenger", "name": "Facebook Messenger", "icon": "messenger", "color": "#0084FF"},
        {"id": "instagram", "name": "Instagram Direct", "icon": "instagram", "color": "#E4405F"},
        {"id": "tiktok", "name": "TikTok DMs", "icon": "tiktok", "color": "#00F2FE"},
        {"id": "twitter", "name": "X (Twitter) Messages", "icon": "twitter", "color": "#1DA1F2"},
    ]

    result = []
    for ch in channels_def:
        unread = db.query(SocialConversation).filter(
            SocialConversation.channel == ch["id"],
            SocialConversation.unread_count > 0
        ).count()
        total = db.query(SocialConversation).filter(
            SocialConversation.channel == ch["id"]
        ).count()
        result.append({
            **ch,
            "unread_count": unread,
            "total_conversations": total
        })

    return result

@router.get("/conversations")
def list_conversations(
    channel: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Returns conversation threads optionally filtered by channel (whatsapp, messenger, instagram, etc.).
    """
    query = db.query(SocialConversation)
    if channel and channel != "all":
        query = query.filter(SocialConversation.channel == channel.lower())
    
    threads = query.order_by(SocialConversation.updated_at.desc()).all()
    
    res = []
    for t in threads:
        # Fetch related order if available
        order_info = None
        if t.related_order_number:
            order = db.query(Order).filter(Order.order_number == t.related_order_number).first()
            if order:
                order_info = {
                    "order_number": order.order_number,
                    "status": order.status,
                    "currency": order.currency,
                    "total_amount": order.total_amount,
                    "pod_provider": order.pod_provider,
                    "pod_fulfillment_hub": order.pod_fulfillment_hub,
                    "items": order.items_json
                }

        res.append({
            "id": t.id,
            "channel": t.channel,
            "customer_name": t.customer_name,
            "customer_handle": t.customer_handle,
            "customer_country": t.customer_country,
            "customer_avatar": t.customer_avatar,
            "last_message": t.last_message,
            "unread_count": t.unread_count,
            "related_order_number": t.related_order_number,
            "related_order": order_info,
            "created_at": t.created_at.isoformat(),
            "updated_at": t.updated_at.isoformat(),
            "messages": [
                {
                    "id": m.id,
                    "sender_type": m.sender_type,
                    "text": m.text,
                    "timestamp": m.created_at.strftime("%I:%M %p")
                }
                for m in t.messages
            ]
        })
    return res

@router.get("/conversations/{conversation_id}")
def get_conversation_details(conversation_id: int, db: Session = Depends(get_db)):
    t = db.query(SocialConversation).filter(SocialConversation.id == conversation_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    # Mark as read
    t.unread_count = 0
    db.commit()

    return {
        "id": t.id,
        "channel": t.channel,
        "customer_name": t.customer_name,
        "customer_handle": t.customer_handle,
        "customer_country": t.customer_country,
        "customer_avatar": t.customer_avatar,
        "last_message": t.last_message,
        "unread_count": 0,
        "related_order_number": t.related_order_number,
        "messages": [
            {
                "id": m.id,
                "sender_type": m.sender_type,
                "text": m.text,
                "timestamp": m.created_at.strftime("%I:%M %p")
            }
            for m in t.messages
        ]
    }

@router.post("/conversations/{conversation_id}/reply")
def send_reply(
    conversation_id: int,
    payload: Dict[str, str] = Body(...),
    db: Session = Depends(get_db)
):
    """
    Sends an outbound reply to customer via WhatsApp, Messenger, Instagram, TikTok, or Twitter.
    """
    text = payload.get("text", "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="Message text is required")

    conv = db.query(SocialConversation).filter(SocialConversation.id == conversation_id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")

    new_msg = SocialMessage(
        conversation_id=conv.id,
        sender_type="agent",
        text=text
    )
    db.add(new_msg)
    conv.last_message = f"You: {text}"
    conv.unread_count = 0
    db.commit()
    db.refresh(new_msg)

    return {
        "status": "SENT",
        "message": {
            "id": new_msg.id,
            "sender_type": new_msg.sender_type,
            "text": new_msg.text,
            "timestamp": new_msg.created_at.strftime("%I:%M %p")
        }
    }
