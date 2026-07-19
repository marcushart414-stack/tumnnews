const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const SITE_URL = 'https://tumnnews.com';

const STATIC_PATHS = [
  '', 'newsroom', 'blog', 'brands', 'advertise', 'submit-article',
  'academy', 'academy/enroll', 'privacy-policy', 'terms-of-service',
  'brand/urban-news-journal', 'brand/transform-u-live',
  'brand/kinetic-pe-mixx', 'brand/warrior-mandate'
];

exports.handler = async function () {
  let articles = [];

  try {
    if (SUPABASE_URL && SUPABASE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      const { data, error } = await supabase
        .from('articles')
        .select('slug, updated_at, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      if (!error && data) {
        articles = data;
      }
    }
  } catch (e) {
    articles = [];
  }

  const staticEntries = STATIC_PATHS.map(function (path) {
    return '  <url><loc>' + SITE_URL + '/' + path + '</loc></url>';
  }).join('\n');

  const articleEntries = articles.map(function (a) {
    const lastmod = (a.updated_at || a.published_at || '').slice(0, 10);
    const lastmodTag = lastmod ? '<lastmod>' + lastmod + '</lastmod>' : '';
    return '  <url><loc>' + SITE_URL + '/article/' + a.slug + '</loc>' + lastmodTag + '</url>';
  }).join('\n');

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    staticEntries + '\n' + articleEntries + '\n' +
    '</urlset>';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    },
    body: xml
  };
};
