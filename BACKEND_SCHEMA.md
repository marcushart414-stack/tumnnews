# Backend Database Schema Suggestions

This document outlines suggested database schemas for backend implementation of the TUMN platform.

## Database Tables

### 1. Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  bio TEXT,
  website_url VARCHAR(255),
  avatar_url VARCHAR(255),
  role ENUM('member', 'contributor', 'editor', 'admin') DEFAULT 'member',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. Articles Table
```sql
CREATE TABLE articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  author_id INT NOT NULL,
  brand_id INT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  featured_image VARCHAR(255),
  article_type ENUM('article', 'podcast-article') DEFAULT 'article',
  podcast_episode_url VARCHAR(255),
  youtube_embed_url VARCHAR(255),
  status ENUM('draft', 'submitted', 'under_review', 'needs_revision', 'approved', 'published', 'archived') DEFAULT 'draft',
  is_sponsored BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id),
  FOREIGN KEY (brand_id) REFERENCES brands(id),
  INDEX idx_status (status),
  INDEX idx_published_at (published_at),
  INDEX idx_slug (slug)
);
```

### 3. Categories Table
```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pre-populate categories
INSERT INTO categories (name, slug, description) VALUES
  ('Faith', 'faith', 'Spiritual growth and religious perspectives'),
  ('Leadership', 'leadership', 'Management and organizational culture'),
  ('Trauma', 'trauma', 'Healing, recovery, and trauma-informed approaches'),
  ('Culture', 'culture', 'Arts, entertainment, and social trends'),
  ('Business', 'business', 'Entrepreneurship and career development'),
  ('Mental Health', 'mental-health', 'Wellness, therapy, and self-care'),
  ('Politics', 'politics', 'Policy, advocacy, and civic engagement'),
  ('Entertainment', 'entertainment', 'Media, arts, and cultural commentary');
```

### 4. Tags Table
```sql
CREATE TABLE tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Article_Categories (Junction Table)
```sql
CREATE TABLE article_categories (
  article_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (article_id, category_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```

### 6. Article_Tags (Junction Table)
```sql
CREATE TABLE article_tags (
  article_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
```

### 7. Brands Table
```sql
CREATE TABLE brands (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  tagline VARCHAR(255),
  description TEXT,
  icon VARCHAR(10),
  focus_areas JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pre-populate brands
INSERT INTO brands (name, slug, tagline, description, icon, focus_areas) VALUES
  ('Urban News Journal', 'urban-news-journal', 'Amplifying Urban Voices, Telling Untold Stories', 'In-depth reporting on urban culture, politics, community issues, and the movements shaping our cities.', '📰', '["Community News", "Urban Politics", "Social Justice", "Cultural Commentary"]'),
  ('Transform U! Live Show', 'transform-u-live', 'Where Transformation Meets Conversation', 'Weekly podcast exploring personal transformation through faith, leadership, and authentic dialogue.', '🎙️', '["Personal Development", "Faith Journey", "Leadership", "Authentic Living"]'),
  ('Kinetic PE MIXX', 'kinetic-pe-mixx', 'Energy in Motion', 'Dynamic content at the intersection of culture, creativity, and kinetic energy.', '⚡', '["Youth Culture", "Creative Expression", "Movement & Dance", "Cultural Innovation"]'),
  ('Warrior Mandate', 'warrior-mandate', 'Forging Men of Purpose', 'Empowering men to lead with integrity, faith, and authentic masculinity in modern society.', '⚔️', '["Men\'s Leadership", "Faith & Purpose", "Fatherhood", "Authentic Masculinity"]');
```

### 8. Submissions Table
```sql
CREATE TABLE submissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  article_id INT UNIQUE NOT NULL,
  submitted_by INT NOT NULL,
  submission_notes TEXT,
  review_notes TEXT,
  reviewed_by INT,
  reviewed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (submitted_by) REFERENCES users(id),
  FOREIGN KEY (reviewed_by) REFERENCES users(id)
);
```

### 9. Saved_Articles Table
```sql
CREATE TABLE saved_articles (
  user_id INT NOT NULL,
  article_id INT NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, article_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);
```

### 10. Ad_Campaigns Table
```sql
CREATE TABLE ad_campaigns (
  id INT PRIMARY KEY AUTO_INCREMENT,
  advertiser_name VARCHAR(255) NOT NULL,
  advertiser_email VARCHAR(255) NOT NULL,
  campaign_name VARCHAR(255) NOT NULL,
  package_type ENUM('standard', 'premium', 'enterprise', 'sponsored-article', 'podcast') NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget DECIMAL(10, 2),
  status ENUM('pending', 'active', 'paused', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 11. Ad_Placements Table
```sql
CREATE TABLE ad_placements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  campaign_id INT NOT NULL,
  placement_type ENUM('header-banner', 'billboard', 'sidebar', 'inline', 'footer') NOT NULL,
  ad_image_url VARCHAR(255),
  ad_html TEXT,
  click_url VARCHAR(255) NOT NULL,
  impressions INT DEFAULT 0,
  clicks INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES ad_campaigns(id) ON DELETE CASCADE
);
```

### 12. Affiliate_Links Table
```sql
CREATE TABLE affiliate_links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  article_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_description TEXT,
  affiliate_url VARCHAR(500) NOT NULL,
  image_url VARCHAR(255),
  clicks INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);
```

### 13. Newsletter_Subscribers Table
```sql
CREATE TABLE newsletter_subscribers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  brand_id INT,
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);
```

### 14. Comments Table (Optional)
```sql
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  article_id INT NOT NULL,
  user_id INT NOT NULL,
  parent_comment_id INT,
  content TEXT NOT NULL,
  status ENUM('pending', 'approved', 'spam', 'deleted') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (parent_comment_id) REFERENCES comments(id) ON DELETE CASCADE
);
```

## API Endpoints Needed

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset confirmation
- `GET /api/auth/verify-email/:token` - Email verification

### Articles
- `GET /api/articles` - List articles (with pagination, filters)
- `GET /api/articles/:slug` - Get single article
- `POST /api/articles` - Create article (authenticated)
- `PUT /api/articles/:id` - Update article (authenticated)
- `DELETE /api/articles/:id` - Delete article (authenticated)
- `GET /api/articles/category/:slug` - Articles by category
- `GET /api/articles/tag/:slug` - Articles by tag
- `GET /api/articles/brand/:slug` - Articles by brand

### Submissions
- `POST /api/submissions` - Submit article for review
- `GET /api/submissions/user/:userId` - User's submissions
- `PUT /api/submissions/:id/review` - Review submission (admin)
- `PUT /api/submissions/:id/revise` - Request revision (admin)
- `PUT /api/submissions/:id/approve` - Approve submission (admin)

### User Profile
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/articles` - User's published articles
- `POST /api/users/:id/save-article` - Save article for later
- `DELETE /api/users/:id/saved-articles/:articleId` - Unsave article

### Categories & Tags
- `GET /api/categories` - List all categories
- `GET /api/tags` - List all tags
- `POST /api/tags` - Create tag (auto-create on article submission)

### Brands
- `GET /api/brands` - List all brands
- `GET /api/brands/:slug` - Get brand details

### Advertising
- `POST /api/advertising/inquiry` - Submit advertising inquiry
- `POST /api/ad-campaigns` - Create campaign (admin)
- `GET /api/ad-campaigns` - List campaigns (admin)
- `POST /api/ad-placements/:id/track-impression` - Track ad impression
- `POST /api/ad-placements/:id/track-click` - Track ad click

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter

### Analytics
- `GET /api/analytics/articles/:id` - Article performance metrics
- `GET /api/analytics/campaigns/:id` - Campaign performance metrics
- `GET /api/analytics/overview` - Platform overview (admin)

## Environment Variables Needed

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tumn_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email Service (SendGrid, Mailchimp, etc.)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
FROM_EMAIL=noreply@tumn.com

# File Upload (S3, Cloudinary, etc.)
UPLOAD_SERVICE=s3
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=tumn-media
AWS_REGION=us-east-1

# Social Media APIs
YOUTUBE_API_KEY=your_youtube_api_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Analytics
GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

## Recommended Tech Stack for Backend

### Option 1: Node.js/Express
- **ORM**: Sequelize or Prisma
- **Auth**: Passport.js + JWT
- **File Upload**: Multer + AWS S3
- **Email**: Nodemailer

### Option 2: PHP/Laravel
- **ORM**: Eloquent (built-in)
- **Auth**: Laravel Sanctum
- **File Upload**: Laravel Storage + S3
- **Email**: Laravel Mail

### Option 3: Python/Django
- **ORM**: Django ORM (built-in)
- **Auth**: Django REST Framework + JWT
- **File Upload**: django-storages + S3
- **Email**: Django Mail

## Security Considerations

1. **Password Hashing**: Use bcrypt with salt rounds ≥ 10
2. **SQL Injection**: Use parameterized queries/ORM
3. **XSS Prevention**: Sanitize all user inputs
4. **CSRF Protection**: Implement CSRF tokens
5. **Rate Limiting**: Prevent abuse (max 100 requests/15min)
6. **File Upload Validation**: Check file types, sizes
7. **Email Verification**: Required before article submission
8. **Content Moderation**: Review system for guest posts

## Performance Optimizations

1. **Database Indexing**: On slug, status, published_at
2. **Caching**: Redis for frequently accessed articles
3. **CDN**: CloudFront/Cloudflare for static assets
4. **Image Optimization**: Compress and resize uploads
5. **Pagination**: Limit to 20-50 items per page
6. **Search**: Elasticsearch for article search

---

This schema is designed to support all features shown in the front-end implementation.
