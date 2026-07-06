import { useEffect, useState, FormEvent } from 'react';
import ArticleCard from '../components/ArticleCard';
import { supabase } from '../lib/supabase';

interface ArticleRow {
  id: number;
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

const categories = ['All', 'Faith', 'Leadership', 'Trauma', 'Culture', 'Business', 'Mental Health', 'Politics', 'Entertainment'];

function toCardArticle(a: ArticleRow) {
  return {
    id: String(a.id),
    title: a.title,
    excerpt: a.excerpt,
    category: a.category || 'Culture',
    author: a.author_name || a.author_email,
    date: a.published_at || a.created_at,
    image: a.featured_image,
    type: a.is_podcast_article ? ('podcast-article' as const) : ('article' as const),
  };
}

const Newsroom = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .eq('section', 'newsroom')
        .order('published_at', { ascending: false });
      if (!error && data) setArticles(data as ArticleRow[]);
      setLoading(false);
    })();
  }, []);

  const cardArticles = articles.map(toCardArticle);
  const filteredArticles = selectedCategory === 'All'
    ? cardArticles
    : cardArticles.filter((article) => article.category === selectedCategory);
  const podcastArticles = cardArticles.filter((a) => a.type === 'podcast-article').slice(0, 3);

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('newsletter_subscribers').insert({ email, source: 'newsroom' });
    if (!error) setSubscribed(true);
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Newsroom</h1>
          <p className="text-xl text-neutral-300">
            Podcast episodes transformed into SEO-optimized articles, plus breaking news and analysis.
          </p>
        </div>
      </section>

      {/* Ad Zone */}
      <div className="bg-neutral-100 border-y border-neutral-300">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center text-sm text-neutral-500">
            [ Advertisement Space - 970x90 Billboard ]
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <section className="bg-neutral-50 border-b border-neutral-300">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-neutral-300 hover:border-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid with Sidebar */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
                </h2>
                <span className="text-neutral-500 text-sm">
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
                </span>
              </div>

              {loading && <p className="text-neutral-500">Loading articles…</p>}

              <div className="space-y-8">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="border-b border-neutral-200 pb-8 last:border-b-0">
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>

              {!loading && filteredArticles.length === 0 && (
                <div className="text-center py-20 text-neutral-500">
                  <p>No articles found in this category.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Ad Zone */}
              <div className="bg-white border-2 border-neutral-300 p-6 sticky top-24">
                <div className="text-center text-sm text-neutral-500 mb-2">ADVERTISEMENT</div>
                <div className="aspect-square bg-neutral-100 flex items-center justify-center text-neutral-400">
                  [ 300x250 Sidebar Ad ]
                </div>
              </div>

              {/* Podcast Episodes */}
              <div className="bg-neutral-50 border border-neutral-300 p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  🎙️ Latest Podcast Episodes
                </h3>
                <div className="space-y-4">
                  {podcastArticles.length === 0 && <p className="text-sm text-neutral-500">No podcast articles yet.</p>}
                  {podcastArticles.map((article) => (
                    <div key={article.id} className="border-b border-neutral-200 pb-3 last:border-b-0">
                      <h4 className="font-bold text-sm mb-1 line-clamp-2 hover:text-amber-500 cursor-pointer">
                        {article.title}
                      </h4>
                      <p className="text-xs text-neutral-500">{article.author}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-black text-white p-6">
                <h3 className="text-lg font-bold mb-3">Subscribe to TUMN</h3>
                {subscribed ? (
                  <p className="text-sm text-amber-400">You're subscribed — thanks for joining.</p>
                ) : (
                  <form onSubmit={handleSubscribe}>
                    <p className="text-sm text-neutral-300 mb-4">
                      Get weekly updates delivered to your inbox.
                    </p>
                    <input
                      type="email"
                      required
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 mb-3 text-black"
                    />
                    <button type="submit" className="w-full bg-amber-500 text-black font-bold py-2 hover:bg-amber-400 transition-colors">
                      SUBSCRIBE
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsroom;
