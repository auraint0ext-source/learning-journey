# PrintFlow Global — POD E-Commerce & Marketing Automation Platform
### ইউএসএ, ইউকে এবং কানাডা মার্কেটের জন্য প্রিন্ট-অন-ডিমান্ড ই-কমার্স ও অটোমেশন আর্কিটেকচার

একটি পূর্ণাঙ্গ, স্কেলেবল প্রিন্ট-অন-ডিমান্ড (POD) ই-কমার্স ব্যাকএন্ড ও ড্র্যাগ-এন্ড-ড্রপ ফ্রন্টএন্ড সিস্টেম। এটি ইউএসএ (USD), ইউকে (GBP), এবং কানাডা (CAD) মার্কেটে লোকাল প্রোডাকশন হাবের মাধ্যমে অর্ডার ডেলিভারি, মেটা সিএপিআই (Meta CAPI), টিকটক ইভেন্টস এপিআই, গুগল অ্যাডস এনহ্যান্সড কনভার্সন এবং লিড জেনারেশন অটোমেশন পরিচালনা করতে সক্ষম।

---

## 🚀 এক ক্লিকে লোকালহোস্টে রান করার নিয়ম (Quick Start)

প্রজেক্ট ডিরেক্টরিতে যান এবং নিচের স্ক্রিপ্টটি চালান:

```bash
cd /Users/mdarif/.gemini/antigravity/scratch/pod-ecommerce-platform
chmod +x start.sh
./start.sh
```

স্ক্রিপ্টটি স্বয়ংক্রিয়ভাবে ব্যাকএন্ড ও ফ্রন্টএন্ড উভয় সার্ভার চালু করবে:
- **🖥️ কাস্টমার স্টোরফ্রন্ট (Customer Storefront)**: [http://localhost:3000](http://localhost:3000)
- **⚡ ব্যাকএন্ড এপিআই ও ইন্টারঅ্যাক্টিভ ডক্স (FastAPI)**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🔒 সিকিউর অ্যাডমিন স্টুডিও এক্সেস ও শর্টকাট কি (Admin Stealth Access)

নিরাপত্তার স্বার্থে সাধারণ কাস্টমারদের জন্য ফুটার থেকে অ্যাডমিন লিঙ্ক সম্পূর্ণ সরিয়ে দেওয়া হয়েছে। অনুমোদিত অপারেটররা নিচের উপায়ে অ্যাডমিন প্যানেল খুলতে পারবেন:

### ১. কিবোর্ড শর্টকাট (Stealth Hotkey):
- **🍏 macOS**: `⌘ Command + ⇧ Shift + A`
- **🪟 Windows / Linux**: `Ctrl + Shift + A`
- ব্রাউজারে স্টোরফ্রন্টে থাকাকালীন এই শর্টকাট প্রেস করলেই সরাসরি অ্যাডমিন লগইন উইন্ডো চলে আসবে।

### ২. শর্টকাট কি কাস্টমাইজ বা এডিট করার নিয়ম:
- অ্যাডমিন স্টুডিওতে লগইন করার পর ওপরে ডানের হেডারে **`Hotkey: Shift+A`** বাটনে ক্লিক করুন।
- যেকোনো মোডিফায়ার কি (`Cmd/Ctrl+Shift`, `Cmd/Ctrl+Alt`, `Alt+Shift`) এবং পছন্দের লেটার (`A`, `K`, `M`, `X`, `P` ইত্যাদি) সিলেক্ট করে **Save Hotkey** করুন। এটি তাৎক্ষণিকভাবে আপডেট হয়ে যাবে।

### ৩. অল্টারনেটিভ সিক্রেট URL প্যারামিটার:
- ব্রাউজারে সরাসরি প্রবেশ করুন: [http://localhost:3000/?admin=1](http://localhost:3000/?admin=1)

### ৪. অ্যাডমিন লগইন ক্রেডেনশিয়ালস:
- **ইউজারনেম**: `admin`
- **পাসওয়ার্ড**: `admin123`

---

## 🛠️ প্রধান ফিচারসমূহ (Key Features)

### ১. ভিজ্যুয়াল ড্র্যাগ-এন্ড-ড্রপ অটোমেশন বিল্ডার (React Drag & Drop Canvas)
- **ট্রিগার (Triggers)**: অর্ডার প্লেসড, সোশ্যাল অ্যাড লিড, কার্ট অ্যাব্যান্ডনড।
- **কন্ডিশন (Conditions)**: টার্গেট মার্কেট ফিল্টার (US / UK / CA), অর্ডার ভ্যালু ফিল্টার।
- **অ্যাকশন (Actions)**: লোকাল POD প্রোডাকশন হাবে রাউটিং, মেটা CAPI Purchase/Lead ইভেন্ট, টিকটক ইভেন্টস এপিআই, ট্র্যাকিং ইমেইল ও কুপন ডিসপ্যাচ, Klaviyo/HubSpot সিঙ্ক।
- **লাইভ সিমুলেশন (Test Run)**: ক্যানভাস থেকেই সরাসরি এক ক্লিকে টেস্ট রান চালিয়ে প্রতিটি নোডের ইনপুট-আউটপুট ভেরিফাই করার সুবিধা।
- **ওয়ার্কফ্লো পারসিসটেন্স**: ব্যাকএন্ড ডাটাবেজে নোড এবং কানেকশন স্বয়ংক্রিয়ভাবে সেভ হয়।

### ২. ইউএসএ, ইউকে ও কানাডা মাল্টি-মার্কেট ইঞ্জিন (Multi-Market Engine)
- **🇺🇸 USA**: কারেন্সি USD ($), স্টেট সেলস ট্যাক্স ক্যালকুলেশন, US প্রিন্টিং হাব (Detroit / San Jose / Reno), USPS Priority / FedEx কুরিয়ার।
- **🇬🇧 UK**: কারেন্সি GBP (£), ২০% VAT ক্যালকুলেশন, UK প্রিন্টিং হাব (London / Westbury / Birmingham), Royal Mail 24/48 / DPD কুরিয়ার (জিরো ইমপোর্ট ট্যাক্স)।
- **🇨🇦 Canada**: কারেন্সি CAD (CA$), HST/GST ক্যালকুলেশন, টরন্টো ও ভ্যাঙ্কুভার প্রিন্টিং হাব (Duplium / SwiftPOD CA), Canada Post Expedited কুরিয়ার।

### ৩. সোশ্যাল মিডিয়া অ্যাডস ও কনভার্সন ট্র্যাকিং এপিআই (Social Ads & CAPI)
- **Meta Conversions API (CAPI)**: সার্ভার-সাইড ট্র্যাকিং যা ইউজার ডেটা (ইমেইল, ফোন, কান্ট্রি) SHA-256 দিয়ে হ্যাশ করে ফেসবুক গ্রাফ এপিআইতে পাঠায় (iOS 14+ কুকি ব্লকিং বাইপাস করে)।
- **TikTok Events API**: সার্ভার-টু-সার্ভার রিয়েল-টাইম কনভার্সন ইভেন্ট।
- **Google Ads Enhanced Conversions**: স্মার্ট বিডিং ও আরও নিখুঁত ROAS অর্জনের জন্য ডেটা ট্র্যাকিং।
- **Facebook Instant Form Webhook**: `POST /api/ads/webhook/meta-lead` ফেসবুক লিড ফর্ম থেকে তাৎক্ষণিক লিড ক্যাপচার করে দেশভেদে নির্দিষ্ট ডিসকাউন্ট ভাউচার (e.g. `USA15OFF`, `UK20OFF`, `CAD15OFF`) তৈরি করে।

### ৪. প্রিন্ট-অন-ডিমান্ড (POD) ক্যাটালগ ও ফুলফিলমেন্ট
- টি-শার্ট, হুডি, সিরামিক মগ, ক্যানভাস ওয়াল আর্ট এবং ফোন কেসসহ ৫টি ডিফল্ট প্রোডাক্ট ক্যাটালগ।
- এক ক্লিকে "Place Test Order" করলেই সাথে সাথে ব্যাকএন্ডে অর্ডার ক্রিয়েট হবে, লোকাল হাবে অর্ডার রাউট হবে এবং মেটা সিএপিআই ও ড্র্যাগ-এন্ড-ড্রপ ওয়ার্কফ্লো এক্সিকিউট হবে।

---

## 🧪 টেস্ট সুইট রান করা (Run Automated Tests)

ব্যাকএন্ডে সব এপিআই ও ওয়ার্কফ্লো ভেরিফাই করতে:

```bash
cd /Users/mdarif/.gemini/antigravity/scratch/pod-ecommerce-platform/backend
source .venv/bin/activate
python3 test_api.py
```

আউটপুট:
```
✅ Market Configuration Verified: US (USD), UK (GBP), CA (CAD)
✅ Product Catalog Verified: 5 POD items loaded
✅ UK Order Placed: ORD-UK-XXXXXX, Routed to: T-Shirt & Sons & Prodigi UK
✅ Meta Lead Webhook Verified: Promo Code USA15OFF-415
✅ Workflow Execution Trace Verified: 7 steps successfully executed
🎉 ALL TESTS PASSED SUCCESSFULLY!
```

---

## 📁 টেকনোলজি স্ট্যাক (Tech Stack)

- **Backend**: Python 3.9+, FastAPI, SQLAlchemy, SQLite (production ready for PostgreSQL), Pydantic, HTTPX.
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons.
- **Protocol**: RESTful JSON APIs, Meta Graph API v21.0 CAPI Schema, TikTok Events v1.3 Schema.
