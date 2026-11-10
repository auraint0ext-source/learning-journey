import os
import uuid
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..config import MARKETS, MarketConfig
from ..models.models import Product, Order, AutomationWorkflow, PaymentTransaction
from ..schemas.schemas import ProductBase, ProductResponse, CreateOrderRequest, OrderResponse
from ..services.pod_service import PODService
from ..services.workflow_engine import WorkflowEngine

router = APIRouter(prefix="/api/ecommerce", tags=["E-Commerce & Print-on-Demand"])

@router.get("/markets", response_model=Dict[str, Any])
def get_supported_markets():
    """
    Returns market details for USA, UK, and Canada including currencies, tax rules, and local fulfillment hubs.
    """
    return {code: market.model_dump() for code, market in MARKETS.items()}

@router.get("/products", response_model=List[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    """
    Returns the Print-on-Demand product catalog.
    """
    products = db.query(Product).order_by(Product.id.desc()).all()
    return products

@router.post("/products", response_model=ProductResponse)
def create_product(product_in: ProductBase, db: Session = Depends(get_db)):
    """
    Creates a new Print-on-Demand product and immediately makes it available on the storefront.
    """
    new_product = Product(
        title=product_in.title,
        description=product_in.description,
        category=product_in.category,
        base_price_usd=product_in.base_price_usd,
        image_url=product_in.image_url,
        sku=product_in.sku,
        supplier=product_in.supplier,
        in_stock=product_in.in_stock
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.put("/products/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, product_in: ProductBase, db: Session = Depends(get_db)):
    """
    Updates an existing Print-on-Demand product details, pricing, stock, or description.
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product.title = product_in.title
    product.description = product_in.description
    product.category = product_in.category
    product.base_price_usd = product_in.base_price_usd
    product.image_url = product_in.image_url
    product.sku = product_in.sku
    product.supplier = product_in.supplier
    product.in_stock = product_in.in_stock
    
    db.commit()
    db.refresh(product)
    return product

@router.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    """
    Deletes a product from the catalog.
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"status": "success", "message": f"Product #{product_id} deleted"}

@router.patch("/products/{product_id}/toggle-stock", response_model=ProductResponse)
def toggle_product_stock(product_id: int, db: Session = Depends(get_db)):
    """
    Toggles product availability in/out of stock.
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product.in_stock = not product.in_stock
    db.commit()
    db.refresh(product)
    return product

@router.post("/orders", response_model=OrderResponse)
def create_order(request: CreateOrderRequest, db: Session = Depends(get_db)):
    """
    Places an order targeting US, UK, or CA.
    Calculates regional taxes, shipping rates, generates POD tracking,
    and automatically executes any active 'order_placed' Automation Workflow.
    """
    country_code = request.target_country.upper()
    if country_code not in MARKETS:
        raise HTTPException(status_code=400, detail=f"Unsupported market country '{country_code}'. Must be US, UK, or CA.")

    market = MARKETS[country_code]

    # Calculate item totals in target currency
    items_json = []
    subtotal = 0.0
    for it in request.items:
        # Base price in USD converted to target currency
        unit_price = round(it.unit_price, 2)
        item_total = round(unit_price * it.quantity, 2)
        subtotal += item_total
        items_json.append({
            "product_id": it.product_id,
            "title": it.title,
            "quantity": it.quantity,
            "unit_price": unit_price,
            "total_price": item_total,
            "mockup_url": it.mockup_url
        })

    # Regional Tax Calculation
    tax_amount = round(subtotal * (market.tax_rate_percent / 100.0), 2)
    shipping_amount = market.shipping_base_rate
    total_amount = round(subtotal + tax_amount + shipping_amount, 2)

    order_number = f"ORD-{country_code}-{uuid.uuid4().hex[:6].upper()}"
    payment_method = request.payment_method or "card"
    txn_id = f"TXN-{payment_method.upper()[:6]}-{uuid.uuid4().hex[:8].upper()}"

    gateway_mapping = {
        "card": "Stripe (Credit / Debit Card)",
        "apple_pay": "Apple Pay (1-Click Wallet)",
        "google_pay": "Google Pay (Digital Wallet)",
        "paypal": "PayPal Commerce Platform",
        "bank_transfer": (
            "Chase ACH Direct Debit (US)" if country_code == "US"
            else "Barclays Faster Payments (UK)" if country_code == "UK"
            else "Interac e-Transfer (Canada)"
        ),
        "klarna": "Klarna (Pay in 4 / BNPL)"
    }
    gateway_provider = gateway_mapping.get(payment_method, "Stripe Global Payments")

    payout_account_mapping = {
        "US": "Chase Business Checking (•••• 4821)",
        "UK": "Barclays Commercial Sterling (•••• 4109)",
        "CA": "RBC Royal Bank CAD (•••• 7311)"
    }
    payout_account = payout_account_mapping.get(country_code, "Chase Commercial Treasury")

    # Print-on-Demand routing
    pod_routing = PODService.route_pod_order(country_code, items_json)

    order = Order(
        order_number=order_number,
        customer_name=request.customer_name,
        customer_email=request.customer_email,
        customer_phone=request.customer_phone,
        target_country=country_code,
        shipping_address=request.shipping_address,
        city=request.city,
        postal_code=request.postal_code,
        currency=market.currency,
        subtotal=subtotal,
        tax_amount=tax_amount,
        shipping_amount=shipping_amount,
        total_amount=total_amount,
        status="POD_ROUTED",
        pod_provider=pod_routing["pod_provider"],
        pod_external_id=pod_routing["pod_external_id"],
        pod_fulfillment_hub=pod_routing["pod_fulfillment_hub"],
        payment_method=payment_method,
        payment_status="PAID",
        transaction_id=txn_id,
        items_json=items_json
    )
    db.add(order)

    # Record Payment Transaction in ledger
    txn = PaymentTransaction(
        transaction_id=txn_id,
        order_number=order_number,
        customer_name=request.customer_name,
        customer_email=request.customer_email,
        country=country_code,
        currency=market.currency,
        amount=total_amount,
        payment_method=payment_method,
        gateway_provider=gateway_provider,
        merchant_payout_account=payout_account,
        status="SETTLED",
        payment_details=request.payment_details or {"payment_method": payment_method}
    )
    db.add(txn)

    db.commit()
    db.refresh(order)

    # Automatically trigger active 'order_placed' workflows
    active_workflows = db.query(AutomationWorkflow).filter(
        AutomationWorkflow.trigger_type == "order_placed",
        AutomationWorkflow.is_active == True
    ).all()

    trigger_payload = {
        "order_id": order.id,
        "order_number": order.order_number,
        "customer_name": order.customer_name,
        "customer_email": order.customer_email,
        "target_country": order.target_country,
        "currency": order.currency,
        "total_amount": order.total_amount,
        "items": items_json
    }

    for wf in active_workflows:
        WorkflowEngine.execute_workflow(db, wf, trigger_payload)

    return order

@router.get("/orders", response_model=List[OrderResponse])
def list_orders(db: Session = Depends(get_db)):
    """
    Returns list of orders across US, UK, and CA markets.
    """
    orders = db.query(Order).order_by(Order.id.desc()).all()
    return orders

@router.post("/sync-to-cloud")
def sync_to_cloud(payload: Dict[str, Any] = None):
    """
    Builds the production bundle and pushes changes to GitHub, 
    automatically updating GitHub Pages and Vercel.
    """
    import subprocess
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
    frontend_dir = os.path.join(base_dir, "frontend")
    
    if payload and "storefrontConfig" in payload:
        try:
            config_path = os.path.join(frontend_dir, "src/config/customStorefrontConfig.json")
            import json
            with open(config_path, "w") as f:
                json.dump(payload["storefrontConfig"], f, indent=2)
        except Exception as e:
            pass

    try:
        # Run sync script
        res = subprocess.run(
            ["/bin/bash", os.path.join(base_dir, "sync-to-cloud.sh")],
            cwd=base_dir,
            capture_output=True,
            text=True,
            timeout=180
        )
        if res.returncode != 0:
            return {
                "status": "error",
                "message": f"Sync script failed with code {res.returncode}",
                "output": res.stderr or res.stdout
            }
        return {
            "status": "success",
            "message": "Successfully synchronized to GitHub! Live update deployed to GitHub Pages & Vercel.",
            "output": res.stdout,
            "live_url": "https://auraint0ext-source.github.io/learning-journey/"
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

