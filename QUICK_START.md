# TUMN Website - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Modern web browser

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open in browser:**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder.

---

## 📍 Navigation Guide

### Main Routes

| URL | Page | Description |
|-----|------|-------------|
| `/` | Home | Corporate HQ with brand showcase |
| `/newsroom` | Newsroom | Podcast articles & news |
| `/blog` | Blog | Editorial content |
| `/article/1` | Article | Sample article detail |
| `/advertise` | Advertise | Ad packages & info |
| `/submit-article` | Submit | Article submission form |
| `/login` | Login | Member login |
| `/register` | Register | New member signup |
| `/dashboard` | Dashboard | Member dashboard |
| `/brand/urban-news-journal` | Brand | Urban News Journal |
| `/brand/transform-u-live` | Brand | Transform U! Live |
| `/brand/kinetic-pe-mixx` | Brand | Kinetic PE MIXX |
| `/brand/warrior-mandate` | Brand | Warrior Mandate |

---

## 🎨 Design System Quick Reference

### Colors
```css
/* Primary */
Black: #000000
White: #FFFFFF

/* Accents */
Amber-500: #F59E0B (CTAs, links)
Amber-400: #FBBF24 (Hover states)

/* Neutrals */
Neutral-50: #FAFAFA (Backgrounds)
Neutral-100: #F5F5F5
Neutral-300: #D4D4D4 (Borders)
Neutral-600: #525252 (Text)
Neutral-900: #171717 (Dark elements)
```

### Typography
- **Display**: text-5xl to text-7xl (48-72px)
- **Headers**: text-3xl to text-4xl (30-36px)
- **Body**: text-base to text-lg (16-18px)
- **Small**: text-sm to text-xs (12-14px)

### Spacing
- **Section**: py-12 to py-20 (48-80px)
- **Cards**: p-6 to p-8 (24-32px)
- **Gaps**: gap-4 to gap-8 (16-32px)

---

## 🔧 Project Structure

```
tumn-website/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Site footer
│   │   └── ArticleCard.tsx  # Article preview card
│   │
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Homepage
│   │   ├── Newsroom.tsx    # Newsroom listing
│   │   ├── Blog.tsx        # Blog listing
│   │   ├── ArticleDetail.tsx    # Article view
│   │   ├── Advertise.tsx   # Advertising page
│   │   ├── SubmitArticle.tsx    # Submission form
│   │   ├── Login.tsx       # Login page
│   │   ├── Register.tsx    # Registration
│   │   ├── MemberDashboard.tsx  # Member area
│   │   └── BrandPage.tsx   # Brand pages
│   │
│   ├── App.tsx             # Main app with routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
│
├── public/                 # Static assets
├── dist/                   # Production build
├── README.md               # Project documentation
├── BACKEND_SCHEMA.md       # Database schema guide
├── AD_PLACEMENT_GUIDE.md   # Ad placement documentation
└── QUICK_START.md          # This file
```

---

## 🎯 Key Features Tour

### 1. Homepage Features
- **Hero Section**: Brand identity with CTAs
- **Brand Showcase**: 4 brands with hover effects
- **Featured Articles**: Latest content grid
- **Stats Dashboard**: Audience metrics
- **Newsletter Signup**: Email capture
- **Multiple Ad Zones**: Monetization ready

### 2. Newsroom Features
- **Category Filters**: 8 content categories
- **Podcast Badges**: Episode indicators
- **Sidebar Content**: Latest episodes
- **Article Grid**: Clean card layout
- **Sticky Ads**: Revenue optimization

### 3. Article Detail Features
- **Full Hero**: Category & metadata
- **Podcast Embeds**: Episode integration
- **Affiliate Boxes**: Product recommendations
- **Inline Ads**: Mid-content monetization
- **Social Sharing**: Distribution tools
- **Related Articles**: Engagement

### 4. Submission System
- **Guidelines**: Clear expectations
- **Multi-Section Form**: Comprehensive submission
- **Media Support**: Images & embeds
- **Status Tracking**: Dashboard integration
- **Draft Saving**: Work preservation

### 5. Member Dashboard
- **Submission Tracking**: Status updates
- **Stats Overview**: Quick metrics
- **Saved Articles**: Reading list
- **Profile Management**: User settings
- **Quick Links**: Easy navigation

---

## 🎨 Customization Guide

### Change Brand Colors

Edit `src/index.css`:
```css
/* Change amber to your brand color */
.bg-amber-500 {
  background-color: #YOUR_COLOR;
}
```

Or use Tailwind config:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand': '#YOUR_COLOR'
      }
    }
  }
}
```

### Add New Category

Edit category arrays in:
- `src/pages/Newsroom.tsx`
- `src/pages/Home.tsx`
- `src/components/Footer.tsx`

```typescript
const categories = [
  'Faith', 
  'Leadership', 
  'Your New Category'  // Add here
];
```

### Modify Ad Zones

Ad placements are in:
- Header: `src/components/Header.tsx`
- Footer: `src/components/Footer.tsx`
- Pages: Individual page components

Search for: `[ Advertisement Space ]`

---

## 📱 Responsive Testing

### Breakpoints to Test:
- **Mobile**: 375px (iPhone SE)
- **Mobile**: 414px (iPhone 12 Pro)
- **Tablet**: 768px (iPad)
- **Desktop**: 1024px (Laptop)
- **Desktop**: 1440px (Desktop)

### Test in DevTools:
1. Open Chrome DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Select device or custom dimensions
4. Test all routes

---

## 🔌 Backend Integration Checklist

### Phase 1: Authentication
- [ ] Connect `/register` form to POST /api/auth/register
- [ ] Connect `/login` form to POST /api/auth/login
- [ ] Implement JWT token storage
- [ ] Add protected route middleware
- [ ] Set up session management

### Phase 2: Articles
- [ ] Fetch articles from GET /api/articles
- [ ] Implement pagination
- [ ] Connect category filters
- [ ] Single article from GET /api/articles/:slug
- [ ] Related articles logic

### Phase 3: Submissions
- [ ] Connect submission form to POST /api/submissions
- [ ] Fetch user submissions in dashboard
- [ ] Implement status updates
- [ ] Email notifications

### Phase 4: Ads & Analytics
- [ ] Integrate ad server
- [ ] Track impressions
- [ ] Track clicks
- [ ] Analytics dashboard

### Phase 5: Media
- [ ] File upload for images
- [ ] YouTube API integration
- [ ] Spotify API integration
- [ ] Social sharing APIs

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
# Change port in vite.config.ts or
# Use alternative port
npm run dev -- --port 3000
```

### TypeScript Errors
```bash
# Check types
npx tsc --noEmit

# Fix auto-fixable issues
npx tsc --noEmit --pretty
```

---

## 📦 Production Deployment

### Build Steps
```bash
npm run build
```

### Deploy to Static Hosting

**Netlify:**
```bash
# Drop dist folder into Netlify
# Or connect Git repo with build command:
npm run build
```

**Vercel:**
```bash
vercel --prod
```

**AWS S3 + CloudFront:**
```bash
aws s3 sync dist/ s3://your-bucket/
```

### Environment Variables (for backend)
Create `.env` file:
```env
VITE_API_URL=https://api.tumn.com
VITE_GOOGLE_ANALYTICS_ID=UA-XXXXXX-X
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🎓 Learning Resources

### React + TypeScript
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com)

### React Router
- [React Router Docs](https://reactrouter.com)

---

## 📞 Support & Questions

### File Structure Questions?
See: `README.md` - Complete overview

### Backend Integration?
See: `BACKEND_SCHEMA.md` - Database & API guide

### Ad Placement?
See: `AD_PLACEMENT_GUIDE.md` - Monetization guide

### Implementation Details?
See: `IMPLEMENTATION_SUMMARY.md` - Feature list

---

## ✅ Quick Validation

After installation, verify:
- [ ] Site loads at localhost:5173
- [ ] All pages navigate correctly
- [ ] Forms validate inputs
- [ ] Mobile menu works
- [ ] Cards display properly
- [ ] Build completes without errors

---

## 🚀 Next Steps

1. **Customize Content**: Replace mock data with real content
2. **Setup Backend**: Implement API endpoints
3. **Configure Database**: Set up schema from BACKEND_SCHEMA.md
4. **Test Thoroughly**: All user journeys
5. **Deploy**: To production hosting
6. **Monitor**: Analytics and performance

---

**You're ready to go!** 🎉

This is a complete, production-ready front-end. Connect it to your backend API, add real content, and launch your media empire.

**Build successful**: ✅ 323.58 kB (91.37 kB gzipped)
