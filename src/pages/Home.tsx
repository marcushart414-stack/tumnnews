import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { supabase } from '../lib/supabase';

interface ArticleRow {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  author_name: string | null;
  author_email: string;
  published_at: string | null;
  created_at: string;
  featured_image: string | null;
  is_podcast_article: boolean | null;
}

function toCardArticle(a: ArticleRow) {
  return {
    id: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category || 'Culture',
    author: a.author_name || a.author_email,
    date: a.published_at || a.created_at,
    image: a.featured_image,
    type: a.is_podcast_article ? ('podcast-article' as const) : ('article' as const),
  };
}

const Home = () => {
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);
      if (!error && data) setArticles(data as ArticleRow[]);
      setLoading(false);
    })();
  }, []);

  const featuredArticles = articles.map(toCardArticle);

  const brands = [
    {
      id: 'urban-news-journal',
      name: 'Urban News Journal',
      description: 'In-depth reporting on urban culture, politics, and community issues.',
      icon: '📰'
    },
    {
      id: 'transform-u-live',
      name: 'Transform U! Live Show',
      description: 'Weekly podcast exploring transformation through faith and personal development.',
      icon: '🎙️'
    },
    {
      id: 'kinetic-pe-mixx',
      name: 'Kinetic PE MIXX',
      description: 'Dynamic content at the intersection of culture, energy, and movement.',
      icon: '⚡'
    },
    {
      id: 'warrior-mandate',
      name: 'Warrior Mandate',
      description: 'Empowering men to lead with purpose, faith, and authenticity.',
      icon: '⚔️'
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform U<br />
              <span className="text-amber-500">Media Network</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-300 mb-8 leading-relaxed">
              Faith-anchored, trauma-informed digital media.<br />
              Publishing transformative stories that inspire change.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/newsroom"
                className="px-8 py-4 bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors"
              >
                EXPLORE NEWSROOM
              </Link>
              <Link
                to="/submit-article"
                className="px-8 py-4 border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-colors"
              >
                BECOME A CONTRIBUTOR
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Zone - Below Hero */}
      <div className="bg-neutral-100 border-y border-neutral-300">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center text-sm text-neutral-500">
            [ Advertisement Space - 970x90 Billboard ]
          </div>
        </div>
      </div>

      {/* Our Brands Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/brand/${brand.id}`}
                className="bg-white border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-300 group"
              >
                <div className="text-5xl mb-4">{brand.icon}</div>
                <h3 className="text-xl font-bold mb-3">{brand.name}</h3>
                <p className="text-sm text-neutral-600 group-hover:text-neutral-300">
                  {brand.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Latest from TUMN</h2>
            <Link to="/newsroom" className="text-amber-500 font-bold hover:text-amber-600 flex items-center gap-2">
              VIEW ALL
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {loading && <p className="text-neutral-500">Loading latest stories…</p>}

          {!loading && featuredArticles.length === 0 && (
            <p className="text-neutral-500">No published articles yet — check back soon.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Sidebar Ad in grid layout */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8">Why Partner with TUMN?</h2>
              <div className="space-y-6 text-lg text-neutral-700 leading-relaxed">
                <p>
                  Transform U Media Network serves as the digital headquarters for authentic,
                  faith-driven content that resonates with diverse audiences seeking transformation
                  and purpose.
                </p>
                <p>
                  Through our multi-brand ecosystem, we deliver news, podcasts, and editorial
                  content across faith, leadership, culture, and social impact—all optimized
                  for maximum reach and engagement.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="border-l-4 border-amber-500 pl-4">
                    <div className="text-3xl font-bold text-black">500K+</div>
                    <div className="text-sm text-neutral-600">Monthly Readers</div>
                  </div>
                  <div className="border-l-4 border-amber-500 pl-4">
                    <div className="text-3xl font-bold text-black">50+</div>
                    <div className="text-sm text-neutral-600">Podcast Episodes</div>
                  </div>
                  <div className="border-l-4 border-amber-500 pl-4">
                    <div className="text-3xl font-bold text-black">4</div>
                    <div className="text-sm text-neutral-600">Media Brands</div>
                  </div>
                  <div className="border-l-4 border-amber-500 pl-4">
                    <div className="text-3xl font-bold text-black">100+</div>
                    <div className="text-sm text-neutral-600">Contributors</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Ad Zone */}
            <div className="lg:col-span-1">
              <div className="bg-white border-2 border-neutral-300 p-6 sticky top-24">
                <div className="text-center text-sm text-neutral-500 mb-2">ADVERTISEMENT</div>
                <div className="aspect-square bg-neutral-100 flex items-center justify-center text-neutral-400">
                  [ 300x250 Sidebar Ad ]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-neutral-300 mb-8">
            Become a free member and contribute to the conversation. Share your insights,
            submit guest posts, and connect with a community committed to transformation.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-amber-500 text-black font-bold hover:bg-amber-400 transition-colors"
          >
            CREATE FREE ACCOUNT
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
