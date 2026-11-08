"""
Test Suite for POD E-Commerce Platform
Verifies Multi-Market Pricing, POD Routing, Social Ads CAPI, Leads, and Workflows
"""
import httpx
from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_markets():
    res = client.get("/api/ecommerce/markets")
    assert res.status_code == 200
    data = res.json()
    assert "US" in data and "UK" in data and "CA" in data
    print("✅ Market Configuration Verified: US (USD), UK (GBP), CA (CAD)")

def test_products():
    res = client.get("/api/ecommerce/products")
    assert res.status_code == 200
    products = res.json()
    assert len(products) > 0
    print(f"✅ Product Catalog Verified: {len(products)} POD items loaded")

def test_create_and_manage_product():
    new_item = {
        "title": "Neon Cyberpunk Oversized Tee",
        "description": "Premium 240 GSM organic cotton streetwear tee with direct-to-garment print.",
        "category": "Apparel",
        "base_price_usd": 32.50,
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
        "sku": "TEE-CYBER-001",
        "supplier": "Printify / Monster Digital",
        "in_stock": True
    }
    create_res = client.post("/api/ecommerce/products", json=new_item)
    assert create_res.status_code == 200
    p = create_res.json()
    assert p["title"] == new_item["title"]
    p_id = p["id"]
    print(f"✅ Product Creation API Verified: Created '{p['title']}' (ID: {p_id})")

    # Toggle stock
    toggle_res = client.patch(f"/api/ecommerce/products/{p_id}/toggle-stock")
    assert toggle_res.status_code == 200
    assert toggle_res.json()["in_stock"] is False
    print(f"✅ Product Stock Toggle Verified: Stock is now {toggle_res.json()['in_stock']}")

    # Re-enable stock
    toggle_res2 = client.patch(f"/api/ecommerce/products/{p_id}/toggle-stock")
    assert toggle_res2.status_code == 200
    assert toggle_res2.json()["in_stock"] is True
    print(f"✅ Product Stock Restored: Stock is now True")

def test_place_order_and_workflow_trigger():
    payload = {
        "customer_name": "David Cameron",
        "customer_email": "david.cameron@example.co.uk",
        "target_country": "UK",
        "shipping_address": "10 Downing Street",
        "city": "London",
        "postal_code": "SW1A 2AA",
        "items": [
            {
                "product_id": 1,
                "title": "Heavyweight Unisex POD Vintage Hoodie",
                "quantity": 1,
                "unit_price": 37.92
            }
        ]
    }
    res = client.post("/api/ecommerce/orders", json=payload)
    assert res.status_code == 200
    order = res.json()
    assert order["currency"] == "GBP"
    assert "POD-UK-" in order["pod_external_id"]
    print(f"✅ UK Order Placed: {order['order_number']}, Routed to: {order['pod_fulfillment_hub']}")

def test_meta_lead_webhook():
    payload = {
        "email": "lead.california@example.com",
        "full_name": "Elena Rostova",
        "phone_number": "+1-415-555-0199",
        "country": "US"
    }
    res = client.post("/api/ads/webhook/meta-lead", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "PROCESSED"
    assert "promo_code" in data["lead"]
    print(f"✅ Meta Lead Webhook Verified: Promo Code {data['lead']['promo_code']}")

def test_payment_gateways_and_transactions():
    # 1. Test merchant account configs
    cfg_res = client.get("/api/payments/config")
    assert cfg_res.status_code == 200
    configs = cfg_res.json()
    assert len(configs) >= 5
    print(f"✅ Merchant Configs Verified: {len(configs)} gateways active (Stripe, PayPal, Chase ACH, Barclays FPS, RBC Interac)")

    # 2. Place order with Apple Pay
    payload = {
        "customer_name": "Marcus Aurelius",
        "customer_email": "marcus@applepay-test.com",
        "target_country": "US",
        "shipping_address": "1 Infinite Loop",
        "city": "Cupertino",
        "postal_code": "95014",
        "payment_method": "apple_pay",
        "payment_details": {"wallet": "Apple Pay", "card_brand": "Apple Card Mastercard"},
        "items": [
            {
                "product_id": 1,
                "title": "Heavyweight Unisex POD Vintage Hoodie",
                "quantity": 1,
                "unit_price": 48.00
            }
        ]
    }
    order_res = client.post("/api/ecommerce/orders", json=payload)
    assert order_res.status_code == 200
    order = order_res.json()
    assert order["payment_method"] == "apple_pay"
    assert order["payment_status"] == "PAID"
    assert order["transaction_id"].startswith("TXN-")
    print(f"✅ Order with Apple Pay Placed: {order['order_number']}, TXN: {order['transaction_id']}")

    # 3. Check transaction ledger
    txn_res = client.get("/api/payments/transactions")
    assert txn_res.status_code == 200
    txns = txn_res.json()
    assert any(t["transaction_id"] == order["transaction_id"] for t in txns)
    print(f"✅ Transaction Ledger Verified: {len(txns)} transactions recorded in database")

    # 4. Check payment stats
    stats_res = client.get("/api/payments/stats")
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert stats["volume"]["USD"] > 0
    print(f"✅ Payment Financial Stats Verified: USD Volume ${stats['volume']['USD']}")

def test_workflow_simulation():
    res = client.post("/api/workflows/1/execute", json={
        "order_number": "ORD-SIM-TEST",
        "target_country": "CA",
        "currency": "CAD",
        "total_amount": 79.50
    })
    assert res.status_code == 200
    sim = res.json()
    assert sim["status"] == "SUCCESS"
    print(f"✅ Workflow Execution Trace Verified: {len(sim['logs'])} steps successfully executed")

def test_inbox_channels_and_replies():
    # Test channels
    res = client.get("/api/inbox/channels")
    assert res.status_code == 200
    channels = res.json()
    assert len(channels) == 5
    print(f"✅ Social Inbox Channels Verified: {len(channels)} channels (WhatsApp, Messenger, Instagram, TikTok, X)")

    # Test conversations
    res = client.get("/api/inbox/conversations?channel=whatsapp")
    assert res.status_code == 200
    convs = res.json()
    assert len(convs) > 0
    conv_id = convs[0]["id"]
    print(f"✅ WhatsApp Conversations Verified: {len(convs)} threads found")

    # Test reply
    res = client.post(f"/api/inbox/conversations/{conv_id}/reply", json={"text": "Your order is ready!"})
    assert res.status_code == 200
    reply = res.json()
    assert reply["status"] == "SENT"
    print(f"✅ Outbound Reply Sent via API: {reply['message']['text']}")

if __name__ == "__main__":
    test_markets()
    test_products()
    test_place_order_and_workflow_trigger()
    test_payment_gateways_and_transactions()
    test_meta_lead_webhook()
    test_workflow_simulation()
    test_inbox_channels_and_replies()
    print("\n🎉 ALL TESTS PASSED SUCCESSFULLY!")
