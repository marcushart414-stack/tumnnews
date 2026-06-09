# TUMN - Transform U Media Network

A comprehensive digital media and publishing platform built with React, TypeScript, Vite, and Tailwind CSS.

## About TUMN

Transform U Media Network (TUMN) is a faith-anchored, trauma-informed digital media and publishing company that manages multiple brands across news, podcasts, culture, and leadership.

### Brand Identity
- **Primary Colors**: Black & White
- **Accent Colors**: Ember Gold (#F59E0B), Charcoal, Slate Blue, Bronze
- **Design Philosophy**: Cinematic, high-contrast, authoritative, minimal
- **Typography**: Clean serif + sans-serif pairing

## Website Features

### 1. Multi-Brand Navigation
The site serves as the corporate headquarters for four distinct brands:
- **Urban News Journal** - In-depth urban culture and politics reporting
- **Transform U! Live Show** - Faith-driven transformation podcast
- **Kinetic PE MIXX** - Dynamic culture and movement content
- **Warrior Mandate** - Men's leadership and purpose

### 2. Newsroom & Blog System
- **Newsroom**: Podcast episodes converted to SEO-optimized articles
- **Blog**: Editorial content and guest posts
- **Category System**: Faith, Leadership, Trauma, Culture, Business, Mental Health, Politics, Entertainment
- **Article Tags**: Comprehensive tagging for discoverability

### 3. Monetization Infrastructure
- **Ad Placement Zones**:
  - Header Banner (728x90)
  - Billboard (970x90)
  - Sidebar Square (300x250)
  - Inline Banner (468x60)
  - Footer Banner (728x90)
- **Affiliate Link System**: Embedded product recommendations with disclosure
- **Sponsored Content**: Custom article templates with clear labeling
- **Advertiser Landing Page**: Comprehensive advertising packages and contact forms

### 4. Multi-Media Embeds
The platform supports:
- YouTube video embeds
- Spotify podcast episode embeds
- Audio players
- Video players
- Social media embeds

### 5. SEO Infrastructure
- Comprehensive meta tags (OpenGraph, Twitter Cards)
- Schema markup ready for implementation
- Category-based URL structure
- Article-to-podcast episode linking
- Internal linking system
- Optimized content structure

### 6. Membership System (Frontend)
- Free member registration
- Guest post submission workflow
- Member dashboard with:
  - Submission tracking
  - Article status monitoring
  - Saved articles
  - Profile management
  - Submission guidelines

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with brand showcase and featured articles |
| `/newsroom` | Podcast-to-article conversions and news content |
| `/blog` | Editorial content and guest posts |
| `/article/:id` | Individual article view with multimedia embeds |
| `/advertise` | Advertising packages and contact form |
| `/submit-article` | Guest post submission form |
| `/dashboard` | Member dashboard (requires login) |
| `/login` | User authentication |
| `/register` | New member registration |
| `/brand/:brandId` | Individual brand pages |

## Key Components

### Header
- Sticky navigation with brand dropdown
- Mobile-responsive menu
- Ad zone integration
- Call-to-action buttons

### Footer
- Multi-column layout
- Brand links
- Category tags
- Newsletter signup
- Social links

### Article Card
- Responsive design
- Category badges
- Podcast episode indicators
- Author and date metadata
- Excerpt preview

## Article Detail Features
- Full-width hero with category and metadata
- Podcast episode embed (for podcast articles)
- Affiliate product recommendations
- Inline ad placements
- Tag system
- Social sharing buttons
- Author bio sidebar
- Related articles
- SEO meta tags

## Submission Workflow
1. Free members create account
2. Submit article via comprehensive form
3. Editorial review (5-7 business days)
4. Status tracking in dashboard
5. Revision requests or publication
6. Published articles appear on site

## Advertising Features
- Three-tier package system (Standard, Premium, Enterprise)
- Multiple ad placement zones
- Sponsored content options
- Podcast sponsorship opportunities
- Lead capture forms
- Performance reporting (ready for backend integration)

## Technical Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM 6
- **State Management**: React hooks (ready for Redux/Context API)

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Backend Integration Notes

This is a complete front-end implementation. To make it fully functional, you'll need to add:

1. **Authentication Backend**
   - User registration and login
   - JWT token management
   - Password reset functionality

2. **Content Management**
   - Article database (MySQL/PostgreSQL)
   - User submissions table
   - Category and tag management
   - Media upload and storage

3. **Membership System**
   - User profiles
   - Submission tracking
   - Article status workflow
   - Email notifications

4. **Ad Management**
   - Ad server integration
   - Campaign tracking
   - Advertiser dashboard
   - Performance analytics

5. **SEO & Analytics**
   - Schema.org markup generation
   - Sitemap generation
   - Google Analytics integration
   - Search Console integration

6. **Media Integrations**
   - YouTube API for video embeds
   - Spotify API for podcast episodes
   - Social media APIs for sharing
   - Email service provider (Mailchimp, SendGrid)

## Design System

### Colors
- Black: `#000000`
- White: `#FFFFFF`
- Amber 500 (Primary): `#F59E0B`
- Amber 400 (Hover): `#FBBF24`
- Neutral 50-900: Tailwind default grays

### Typography
- Headings: System font stack (bold, tight tracking)
- Body: System font stack (regular)
- Code/Monospace: Mono font stack

### Spacing
- Consistent use of Tailwind spacing scale
- Section padding: `py-12` to `py-20`
- Container: `max-w-7xl mx-auto px-4`

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Content Categories

1. **Faith** - Spiritual growth, religious perspectives
2. **Leadership** - Management, organizational culture
3. **Trauma** - Healing, recovery, mental health
4. **Culture** - Arts, entertainment, social trends
5. **Business** - Entrepreneurship, career development
6. **Mental Health** - Wellness, therapy, self-care
7. **Politics** - Policy, advocacy, civic engagement
8. **Entertainment** - Media, arts, cultural commentary

## License

All rights reserved © 2024 Transform U Media Network

---

**Note**: This is a front-end implementation ready for backend integration. All forms, authentication, and data persistence require server-side implementation.
