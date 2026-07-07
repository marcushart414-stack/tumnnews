import { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import AdSlot from '../components/AdSlot';
import { supabase } from '../lib/supabase';
import { useSEO } from '../lib/useSEO';

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
    id: a.slug, // ArticleCard's source is unseen — passing slug here so any internal /article/{id} link it builds still resolves correctly under slug-based routing
    title: a.title,
    excerpt: a.excerpt,
    category: a.category || 'Culture',
    author: a.author_name || a.author_email,
    date: a.published_at || a.created_at,
    image: a.featured_image,
    type: a.is_podcast_article ? ('podcast-article' as const) : ('article' as const),
  };
}

const Blog = () => {
  useSEO('Blog', 'Editorial content, guest posts, and thought leadership on culture, faith, and transformation from Transform U Media Network.');
  const [posts, setPosts] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .eq('section', 'blog')
        .order('published_at', { ascending: false });
      if (!error && data) setPosts(data as ArticleRow[]);
      setLoading(false);
    })();
  }, []);

  const blogPosts = posts.map(toCardArticle);

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-neutral-300">
            Editorial content, guest posts, and thought leadership on culture, faith, and transformation.
          </p>
        </div>
      </section>

      {/* Ad Zone */}
      <div className="bg-neutral-100 border-y border-neutral-300">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <AdSlot size="billboard" />
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {loading && <p className="text-neutral-500">Loading posts…</p>}
              {!loading && blogPosts.length === 0 && (
                <p className="text-neutral-500">No blog posts published yet.</p>
              )}
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <div key={post.id} className="border-b border-neutral-200 pb-8 last:border-b-0">
                    <ArticleCard article={post} />
                  </div>
                ))}
              </div>
            </div>
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Ad Zone */}
              <div className="bg-white border-2 border-neutral-300 p-6">
                <AdSlot size="mediumRectangle" />
              </div>
              {/* Popular Posts */}
              <div className="bg-neutral-50 border border-neutral-300 p-6">
                <h3 className="text-lg font-bold mb-4">Popular This Week</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <div key={post.id} className="flex gap-3">
                      <div className="text-2xl font-bold text-neutral-300">{index + 1}</div>
                      <div>
                        <h4 className="font-bold text-sm mb-1 line-clamp-2 hover:text-amber-500 cursor-pointer">
                          {post.title}
                        </h4>
                        <p className="text-xs text-neutral-500">{post.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
