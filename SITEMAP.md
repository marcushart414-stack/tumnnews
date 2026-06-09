# TUMN Website Sitemap

## Visual Site Structure

```
TUMN Website
│
├── 🏠 HOME (/)
│   ├── Hero Section
│   │   └── CTAs: Explore Newsroom | Become Contributor
│   ├── Brand Showcase (4 brands)
│   ├── Featured Articles (3 articles)
│   ├── Why Partner with TUMN
│   └── Join Community CTA
│
├── 📰 NEWSROOM (/newsroom)
│   ├── Category Filters (8 categories)
│   ├── Article Grid
│   │   ├── Podcast-to-Article conversions
│   │   └── News content
│   └── Sidebar
│       ├── Latest Podcast Episodes
│       └── Newsletter Signup
│
├── 📝 BLOG (/blog)
│   ├── Editorial Content
│   ├── Guest Posts
│   └── Sidebar
│       └── Popular Posts
│
├── 📄 ARTICLE DETAIL (/article/:id)
│   ├── Article Header
│   │   ├── Category Badge
│   │   ├── Title
│   │   └── Metadata (Author, Date, Read Time)
│   ├── Featured Image
│   ├── Podcast Episode Embed (if podcast article)
│   ├── Article Content
│   │   ├── Rich Text
│   │   ├── Inline Ads
│   │   └── Affiliate Product Boxes
│   ├── Tags
│   ├── Social Sharing
│   └── Sidebar
│       ├── Author Bio
│       └── Related Articles
│
├── 💰 ADVERTISE (/advertise)
│   ├── Platform Stats
│   ├── Ad Packages
│   │   ├── Standard ($2,500/mo)
│   │   ├── Premium ($5,000/mo) ⭐
│   │   └── Enterprise (Custom)
│   ├── Ad Placement Zones
│   │   ├── Header Banner (728x90)
│   │   ├── Billboard (970x90)
│   │   ├── Sidebar Square (300x250)
│   │   └── Inline Banner (468x60)
│   ├── Sponsored Content Options
│   └── Contact Form
│
├── ✍️ SUBMIT ARTICLE (/submit-article)
│   ├── Submission Guidelines
│   │   ├── ✓ What We Accept
│   │   └── ✗ What We Don't
│   └── Submission Form
│       ├── Author Information
│       ├── Article Details
│       │   ├── Title
│       │   ├── Category
│       │   ├── Tags
│       │   ├── Summary
│       │   └── Content
│       ├── Media & Links
│       │   ├── Featured Image
│       │   ├── YouTube Video
│       │   └── Podcast Episode
│       └── Terms Agreement
│
├── 🔐 LOGIN (/login)
│   ├── Email & Password
│   ├── Remember Me
│   ├── Forgot Password
│   └── Sign Up Link
│
├── 📝 REGISTER (/register)
│   ├── Personal Information
│   │   ├── First Name
│   │   ├── Last Name
│   │   ├── Email
│   │   └── Password
│   ├── Interests (Optional)
│   ├── Terms Agreement
│   └── Create Account CTA
│
├── 👤 MEMBER DASHBOARD (/dashboard)
│   ├── Quick Stats
│   │   ├── Submissions Count
│   │   ├── Published Count
│   │   └── Saved Articles Count
│   ├── My Submissions
│   │   ├── Status: Under Review
│   │   ├── Status: Published
│   │   └── Status: Needs Revision
│   ├── Saved Articles
│   └── Sidebar
│       ├── Profile Card
│       ├── Quick Links
│       └── Submission Tips
│
└── 🏢 BRAND PAGES (/brand/:brandId)
    │
    ├── Urban News Journal (/brand/urban-news-journal)
    │   ├── Brand Hero
    │   ├── Focus Areas
    │   ├── Latest Articles
    │   └── Subscribe CTA
    │
    ├── Transform U! Live Show (/brand/transform-u-live)
    │   ├── Brand Hero
    │   ├── Focus Areas
    │   ├── Latest Podcast Episodes
    │   │   ├── Spotify Playlist Embed
    │   │   └── Episode Grid
    │   ├── Latest Articles
    │   └── Subscribe CTA
    │
    ├── Kinetic PE MIXX (/brand/kinetic-pe-mixx)
    │   ├── Brand Hero
    │   ├── Focus Areas
    │   ├── Latest Articles
    │   └── Subscribe CTA
    │
    └── Warrior Mandate (/brand/warrior-mandate)
        ├── Brand Hero
        ├── Focus Areas
        ├── Latest Articles
        └── Subscribe CTA
```

---

## User Journeys

### Journey 1: New Visitor → Reader
```
Home → Browse Featured Articles → Click Article 
→ Read Full Content → See Related Articles 
→ Subscribe to Newsletter
```

### Journey 2: Reader → Contributor
```
Home → Click "Submit Article" → Review Guidelines 
→ Click "Create Account" → Register → Submit Article 
→ Track in Dashboard
```

### Journey 3: Advertiser → Client
```
Home → Click "Advertise" → Review Packages 
→ See Ad Placements → Fill Inquiry Form 
→ Submit for Contact
```

### Journey 4: Brand Discovery
```
Home → Click Brand (e.g., Transform U! Live) 
→ View Brand Page → Listen to Episodes 
→ Read Brand Articles → Subscribe to Brand
```

### Journey 5: Member Management
```
Login → Dashboard → View Submissions 
→ Check Status → Edit if Needs Revision 
→ View Published Article
```

---

## Content Categories

```
Categories (8)
│
├── Faith
│   └── Spiritual growth, religious perspectives
│
├── Leadership
│   └── Management, organizational culture
│
├── Trauma
│   └── Healing, recovery, trauma-informed approaches
│
├── Culture
│   └── Arts, entertainment, social trends
│
├── Business
│   └── Entrepreneurship, career development
│
├── Mental Health
│   └── Wellness, therapy, self-care
│
├── Politics
│   └── Policy, advocacy, civic engagement
│
└── Entertainment
    └── Media, arts, cultural commentary
```

---

## Navigation Structure

### Header Navigation
```
TUMN Logo
│
├── OUR BRANDS (Dropdown)
│   ├── Urban News Journal
│   ├── Transform U! Live Show
│   ├── Kinetic PE MIXX
│   └── Warrior Mandate
│
├── NEWSROOM
├── BLOG
├── ADVERTISE
├── SUBMIT ARTICLE (CTA)
└── LOGIN
```

### Footer Navigation
```
TUMN
│
├── Column 1: About
│   └── Company description
│
├── Column 2: Our Brands
│   ├── Urban News Journal
│   ├── Transform U! Live Show
│   ├── Kinetic PE MIXX
│   └── Warrior Mandate
│
├── Column 3: Quick Links
│   ├── Newsroom
│   ├── Blog
│   ├── Advertise
│   ├── Submit Article
│   └── Member Dashboard
│
└── Column 4: Categories
    └── 8 category tags
```

---

## Page Templates

### Template 1: Hero + Grid
**Used by**: Home, Newsroom, Blog
```
┌─────────────────────────┐
│    Hero Section         │
├─────────────────────────┤
│    Ad Banner           │
├─────────────────────────┤
│  ┌─────┬─────┬─────┐   │
│  │Card │Card │Card │   │
│  ├─────┼─────┼─────┤   │
│  │Card │Card │Card │   │
│  └─────┴─────┴─────┘   │
└─────────────────────────┘
```

### Template 2: Article + Sidebar
**Used by**: ArticleDetail
```
┌─────────────────────────┐
│    Article Header       │
├─────────────────────────┤
│  ┌──────────┬────────┐  │
│  │          │Sidebar │  │
│  │ Content  │  Ads   │  │
│  │          │  Bio   │  │
│  │          │Related │  │
│  └──────────┴────────┘  │
└─────────────────────────┘
```

### Template 3: Form Centered
**Used by**: Login, Register
```
┌─────────────────────────┐
│                         │
│    ┌─────────────┐      │
│    │    Form     │      │
│    │   Fields    │      │
│    │   Button    │      │
│    └─────────────┘      │
│                         │
└─────────────────────────┘
```

### Template 4: Dashboard Layout
**Used by**: MemberDashboard
```
┌─────────────────────────┐
│    Dashboard Header     │
├─────────────────────────┤
│  ┌──────────┬────────┐  │
│  │  Stats   │ Stats  │  │
│  ├──────────┴────────┤  │
│  │  Submissions      │  │
│  │  List             │  │
│  ├──────────┬────────┤  │
│  │  Saved   │Profile │  │
│  │  Articles│  Info  │  │
│  └──────────┴────────┘  │
└─────────────────────────┘
```

---

## Mobile Navigation

### Mobile Menu (< 768px)
```
☰ Menu Toggle
│
└── Expanded Menu
    ├── OUR BRANDS
    │   ├── Urban News Journal
    │   ├── Transform U! Live Show
    │   ├── Kinetic PE MIXX
    │   └── Warrior Mandate
    ├── ───────────────
    ├── NEWSROOM
    ├── BLOG
    ├── ADVERTISE
    ├── SUBMIT ARTICLE
    └── LOGIN
```

---

## Breadcrumb Examples

### Article Detail
```
Home > Newsroom > Leadership > Article Title
```

### Brand Article
```
Home > Transform U! Live > Article Title
```

### Dashboard
```
Home > Dashboard > My Submissions
```

---

## SEO URL Structure

```
Production URLs:
├── https://tumn.com/
├── https://tumn.com/newsroom
├── https://tumn.com/blog
├── https://tumn.com/article/faith-driven-leadership
├── https://tumn.com/advertise
├── https://tumn.com/submit-article
├── https://tumn.com/brand/urban-news-journal
├── https://tumn.com/brand/transform-u-live
├── https://tumn.com/brand/kinetic-pe-mixx
└── https://tumn.com/brand/warrior-mandate
```

---

## Page Count Summary

| Page Type | Count | Notes |
|-----------|-------|-------|
| Static Pages | 6 | Home, Newsroom, Blog, Advertise, Submit, Login, Register |
| Brand Pages | 4 | One per brand |
| Article Pages | Dynamic | Generated from content |
| Member Pages | 1 | Dashboard |
| **Total Static** | **11** | Ready for deployment |

---

## Ad Zones Per Page

| Page | Header | Billboard | Sidebar | Inline | Footer | Total |
|------|--------|-----------|---------|--------|--------|-------|
| Home | ✓ | ✓ | - | - | ✓ | 3 |
| Newsroom | ✓ | ✓ | ✓ | - | ✓ | 4 |
| Blog | ✓ | ✓ | ✓ | - | ✓ | 4 |
| Article | ✓ | - | ✓ | ✓ | ✓ | 4 |
| Advertise | ✓ | - | - | - | ✓ | 2 |
| Brand Pages | ✓ | ✓ | ✓ | - | ✓ | 4 |

---

## External Links & Integrations

### Social Media (Ready for integration)
- Twitter/X sharing
- Facebook sharing
- LinkedIn sharing
- Email sharing

### Media Platforms (Embed ready)
- YouTube videos
- Spotify podcasts
- SoundCloud audio
- Vimeo videos

### Services (Backend needed)
- Newsletter (Mailchimp/SendGrid)
- Analytics (Google Analytics)
- Ad Server (Google Ad Manager/custom)
- Search (Algolia/Elasticsearch)

---

**Complete sitemap with 11 static pages + dynamic article pages, 4 brand sub-sites, full navigation structure, and multi-category content organization.**
