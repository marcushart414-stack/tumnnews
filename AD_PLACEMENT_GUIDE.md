# TUMN Ad Placement Guide

## Overview
This guide shows where ads are placed throughout the TUMN website for maximum visibility and revenue potential.

## Ad Zone Specifications

### 1. Header Banner (728x90 Leaderboard)
**Location**: Top of every page, above main navigation  
**Size**: 728px × 90px  
**Visibility**: Every page view  
**Implementation**: In Header component  

```
┌─────────────────────────────────────────┐
│     [ Advertisement - 728x90 ]          │
├─────────────────────────────────────────┤
│  TUMN Logo    [Navigation Menu]   Login │
└─────────────────────────────────────────┘
```

**Pages with this ad:**
- ✅ Home
- ✅ Newsroom
- ✅ Blog
- ✅ Article Detail
- ✅ Advertise
- ✅ Brand Pages
- ✅ All public pages

---

### 2. Billboard (970x90 Wide Leaderboard)
**Location**: Below hero sections and page headers  
**Size**: 970px × 90px  
**Visibility**: High-traffic pages  
**Implementation**: Below hero on key pages  

```
┌─────────────────────────────────────────────────┐
│              HERO / PAGE HEADER                 │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│     [ Advertisement - 970x90 Billboard ]        │
└─────────────────────────────────────────────────┘
          [ Page Content Begins ]
```

**Pages with this ad:**
- ✅ Home (below hero)
- ✅ Newsroom (below page header)
- ✅ Blog (below page header)
- ✅ Brand Pages (below hero)

---

### 3. Sidebar Square (300x250 Medium Rectangle)
**Location**: Right sidebar on article and listing pages  
**Size**: 300px × 250px  
**Visibility**: Sticky positioning (follows scroll)  
**Implementation**: Sidebar component, sticky top-24  

```
┌────────────────────┬──────────────┐
│                    │ ┌──────────┐ │
│                    │ │ [  Ad  ] │ │
│   Main Content     │ │ 300x250  │ │
│                    │ │          │ │
│   Article Text     │ └──────────┘ │
│                    │              │
│   More Content     │ Other Sidebar│
│                    │   Content    │
└────────────────────┴──────────────┘
```

**Pages with this ad:**
- ✅ Newsroom (sticky sidebar)
- ✅ Blog (sticky sidebar)
- ✅ Article Detail (sticky sidebar)
- ✅ Brand Pages (sticky sidebar)

---

### 4. Inline Banner (468x60 Banner)
**Location**: Within article content (after 2-3 paragraphs)  
**Size**: 468px × 60px  
**Visibility**: Reading engagement  
**Implementation**: Embedded in article content  

```
Article paragraph 1...

Article paragraph 2...

┌─────────────────────────────┐
│ [ Advertisement - 468x60 ]  │
└─────────────────────────────┘

Article paragraph 3 continues...
```

**Pages with this ad:**
- ✅ Article Detail (mid-content)

---

### 5. Footer Banner (728x90 Leaderboard)
**Location**: Above footer content  
**Size**: 728px × 90px  
**Visibility**: Bottom of every page  
**Implementation**: In Footer component  

```
        [ Main Content Ends ]
┌─────────────────────────────────────────┐
│     [ Advertisement - 728x90 ]          │
├─────────────────────────────────────────┤
│              FOOTER                     │
│  [Brands] [Links] [Categories]          │
│  © 2024 TUMN. All rights reserved.      │
└─────────────────────────────────────────┘
```

**Pages with this ad:**
- ✅ All pages (in Footer component)

---

## Ad Packages & Placement Matrix

### Standard Package ($2,500/month)
```
✓ Header Banner (728x90) - All pages
✓ Sidebar Square (300x250) - Articles & Newsroom
  50,000+ impressions/month
```

### Premium Package ($5,000/month)
```
✓ All Standard placements
✓ Billboard (970x90) - Home & Category pages
✓ Sponsored Article (1/month)
✓ Newsletter Feature
  150,000+ impressions/month
```

### Enterprise Package (Custom)
```
✓ All Premium placements
✓ Multi-brand exposure
✓ Podcast sponsorships
✓ Inline banners in articles
✓ Custom content creation
  300,000+ impressions/month
```

---

## Page-by-Page Ad Breakdown

### Homepage
```
┌─────────────────────────────┐
│  Header Banner (728x90)     │ ← Top ad zone
├─────────────────────────────┤
│  [Hero Section]             │
├─────────────────────────────┤
│  Billboard (970x90)         │ ← Post-hero ad
├─────────────────────────────┤
│  [Brands Section]           │
├─────────────────────────────┤
│  [Featured Articles]        │
│  ┌─────────┬──────────────┐ │
│  │ Content │ Sidebar Ad   │ │ ← Sidebar square
│  │         │ (300x250)    │ │
│  └─────────┴──────────────┘ │
├─────────────────────────────┤
│  Footer Banner (728x90)     │ ← Bottom ad zone
└─────────────────────────────┘
```

### Article Detail Page
```
┌─────────────────────────────┐
│  Header Banner (728x90)     │ ← Top ad zone
├─────────────────────────────┤
│  [Article Hero]             │
├─────────────────────────────┤
│  Paragraph 1                │
│  Paragraph 2                │
│  ┌──────────────────────┐   │
│  │  Inline (468x60)     │   │ ← Mid-content ad
│  └──────────────────────┘   │
│  Paragraph 3                │
│  ┌──────────────────────┐   │
│  │  Affiliate Product   │   │ ← Affiliate embed
│  └──────────────────────┘   │
│  Paragraph 4                │
│                             │
│  Sidebar with 300x250 ad →  │
├─────────────────────────────┤
│  Footer Banner (728x90)     │ ← Bottom ad zone
└─────────────────────────────┘
```

### Newsroom/Blog Pages
```
┌─────────────────────────────┐
│  Header Banner (728x90)     │ ← Top ad zone
├─────────────────────────────┤
│  [Page Header]              │
├─────────────────────────────┤
│  Billboard (970x90)         │ ← Post-header ad
├─────────────────────────────┤
│  [Category Filters]         │
├─────────────────────────────┤
│  ┌─────────┬──────────────┐ │
│  │ Article │ ┌──────────┐ │ │
│  │ List    │ │ Sidebar  │ │ │ ← Sticky sidebar ad
│  │         │ │ 300x250  │ │ │
│  │ Article │ │          │ │ │
│  │ Article │ └──────────┘ │ │
│  │ Article │ [Newsletter] │ │
│  └─────────┴──────────────┘ │
├─────────────────────────────┤
│  Footer Banner (728x90)     │ ← Bottom ad zone
└─────────────────────────────┘
```

---

## Affiliate Link Integration

### Article Affiliate Box
Located within article content, after relevant paragraphs:

```
┌─────────────────────────────────────────┐
│  📚 RECOMMENDED RESOURCE                │
│  ─────────────────────────────────────  │
│  "Book Title Here"                      │
│  by Author Name                         │
│                                         │
│  Brief description of the product and   │
│  why it's relevant to the article...    │
│                                         │
│  [ VIEW ON AMAZON → ]                   │
│                                         │
│  * Affiliate link - TUMN earns from     │
│    qualifying purchases                 │
└─────────────────────────────────────────┘
```

**Styling:**
- Background: Amber-50 (#FFF7ED)
- Border: Left border, Amber-500 (#F59E0B)
- Button: Amber-500 background
- Disclosure: Small text, neutral-500

---

## Sponsored Content Format

### Sponsored Article Template
```
┌─────────────────────────────────────────┐
│  LEADERSHIP | SPONSORED CONTENT         │ ← Clear label
│  ─────────────────────────────────────  │
│  Article Title Here                     │
│                                         │
│  By Partner Company Name                │
│  January 15, 2024                       │
└─────────────────────────────────────────┘

[Featured Image]

SPONSORED CONTENT NOTICE:
This article is sponsored by [Company Name].
While sponsored, it meets TUMN's editorial
standards and provides value to our readers.

[Article content...]
```

---

## Ad Performance Tracking (Backend Integration)

Each ad placement should track:
1. **Impressions** - Page views with ad visible
2. **Clicks** - Click-through to advertiser
3. **CTR** - Click-through rate
4. **Viewability** - Time ad is in viewport
5. **Revenue** - CPM or CPC calculation

### Tracking Code Locations:
```javascript
// Header Banner - src/components/Header.tsx
// Billboard - Each page with billboard
// Sidebar - src/pages/Newsroom.tsx, Blog.tsx, ArticleDetail.tsx
// Inline - src/pages/ArticleDetail.tsx
// Footer - src/components/Footer.tsx
```

---

## Ad Dimension Reference

| Placement Type | Width | Height | IAB Standard |
|---------------|-------|--------|--------------|
| Header Banner | 728px | 90px   | Leaderboard  |
| Billboard     | 970px | 90px   | Super Leader |
| Sidebar Square| 300px | 250px  | Medium Rect  |
| Inline Banner | 468px | 60px   | Banner       |
| Footer Banner | 728px | 90px   | Leaderboard  |

---

## Mobile Ad Adaptations

### Mobile Breakpoint (< 768px)

- **Header Banner**: 320×50 (Mobile Leaderboard)
- **Billboard**: 300×250 (Medium Rectangle)
- **Sidebar**: Moves below content, 300×250
- **Inline**: 320×50 or 300×250
- **Footer**: 320×50 (Mobile Leaderboard)

---

## Best Practices

### ✅ DO:
- Use standard IAB ad sizes
- Clearly label sponsored content
- Include affiliate disclosures
- Make ads visually distinct but integrated
- Load ads asynchronously
- Implement lazy loading for below-fold ads

### ❌ DON'T:
- Use deceptive ad placement
- Auto-play video ads with sound
- Cover content with ads
- Exceed 30% ad-to-content ratio
- Use pop-ups or interstitials

---

## Revenue Projections

### Based on 500K monthly pageviews:

**Standard Package ($2,500/mo)**
- 50,000 impressions guaranteed
- CPM: $50
- Estimated monthly: $2,500

**Premium Package ($5,000/mo)**
- 150,000 impressions guaranteed
- CPM: $33.33
- + Sponsored article: $3,000 value
- Estimated monthly: $5,000+

**Enterprise Package (Custom)**
- 300,000+ impressions
- Multi-brand exposure
- Custom content
- Podcast sponsorship
- Estimated monthly: $10,000+

---

## Implementation Checklist

- [x] Header banner zone created
- [x] Billboard zone created
- [x] Sidebar ad zone created (sticky)
- [x] Inline article ad zone created
- [x] Footer banner zone created
- [x] Affiliate link component created
- [x] Sponsored content template created
- [x] Advertiser landing page created
- [x] Ad package pricing displayed
- [ ] Ad server integration (backend)
- [ ] Click tracking implementation (backend)
- [ ] Impression tracking (backend)
- [ ] Revenue dashboard (backend)

---

**Status**: Frontend ad placements complete and ready for ad server integration.
