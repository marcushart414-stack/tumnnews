import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface ArticleRow {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string | null;
  author_name: string | null;
  author_email: string;
  author_bio: string | null;
  author_website: string | null;
  featured_image: string | null;
  is_podcast_article: boolean | null;
  podcast_url: string | null;
  youtube_url: string | null;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
}

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<ArticleRow | null>(null);
  const [related, setRelated] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .eq('status', 'published')
        .single();

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setArticle(data as ArticleRow);

      const { data: relatedData } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .eq('category', data.category)
        .neq('id', data.id)
        .limit(3);
      setRelated((relatedData as ArticleRow[]) || []);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return <div className="bg-white py-24 text-center text-neutral-500">Loading article…</div>;
  }

  if (notFound || !article) {
    return (
      <div className="bg-white py-24 text-center">
        <p className="text-neutral-500 mb-4">This article couldn't be found.</p>
        <Link to="/newsroom" className="text-amber-500 font-bold hover:underline">Back to Newsroom →</Link>
      </div>
    );
  }

  const dateLabel = new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const wordCount = article.content.split(/\s+/).length;
  const readMinutes = Math.max(1, Math.round(wordCount / 200));
  const paragraphs = article.content.split('\n').filter((p) => p.trim().length > 0);

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-xs font-bold text-amber-500 mb-3 tracking-wider">
            {(article.category || 'ARTICLE').toUpperCase()}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-neutral-300">
            <span>{article.author_name || article.author_email}</span>
            <span>•</span>
            <span>{dateLabel}</span>
            <span>•</span>
            <span>{readMinutes} min read</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Article */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              {article.featured_image ? (
                <img src={article.featured_image} alt={article.title} className="w-full aspect-video object-cover mb-8" />
              ) : (
                <div className="aspect-video bg-neutral-900 mb-8 flex items-center justify-center text-neutral-600">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Podcast Episode Embed */}
              {article.is_podcast_article && (
                <div className="bg-neutral-50 border-2 border-neutral-300 p-6 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">🎙️</div>
                    <div>
                      <h3 className="font-bold">Listen to Podcast Episode</h3>
                      <p className="text-sm text-neutral-600">Companion audio for this article</p>
                    </div>
                  </div>
                  {article.youtube_url ? (
                    <div className="aspect-video">
                      <iframe
                        src={article.youtube_url}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : article.podcast_url ? (
                    <a href={article.podcast_url} target="_blank" rel="noopener noreferrer"
                       className="block bg-neutral-900 text-white text-center py-4 font-bold hover:bg-black">
                      Listen on Podcast Platform →
                    </a>
                  ) : (
                    <div className="bg-neutral-200 h-20 flex items-center justify-center text-neutral-500 text-sm">
                      Audio embed coming soon
                    </div>
                  )}
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-neutral-700 leading-relaxed mb-4">{p}</p>
                ))}
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-neutral-200">
                  <div className="text-sm font-bold mb-3">TAGS</div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-neutral-100 border border-neutral-300 hover:bg-black hover:text-white transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <div className="text-sm font-bold mb-3">SHARE THIS ARTICLE</div>
                <div className="flex gap-3">
                  <a href={`https://x.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-neutral-900 text-white hover:bg-black">Twitter</a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-neutral-900 text-white hover:bg-black">Facebook</a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-neutral-900 text-white hover:bg-black">LinkedIn</a>
                  <a href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(window.location.href)}`} className="px-4 py-2 bg-neutral-900 text-white hover:bg-black">Email</a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-24">
                {/* Ad Zone */}
                <div className="bg-white border-2 border-neutral-300 p-6">
                  <div className="text-center text-sm text-neutral-500 mb-2">ADVERTISEMENT</div>
                  <div className="aspect-square bg-neutral-100 flex items-center justify-center text-neutral-400">
                    [ 300x250 Ad ]
                  </div>
                </div>

                {/* Author Bio */}
                <div className="bg-neutral-50 border border-neutral-300 p-6">
                  <div className="text-sm font-bold mb-3">ABOUT THE AUTHOR</div>
                  <div className="w-20 h-20 bg-neutral-300 rounded-full mb-4"></div>
                  <h4 className="font-bold mb-2">{article.author_name || article.author_email}</h4>
                  {article.author_bio && <p className="text-sm text-neutral-600">{article.author_bio}</p>}
                  {article.author_website && (
                    <a href={article.author_website} target="_blank" rel="noopener noreferrer" className="text-sm text-amber-500 hover:underline mt-2 inline-block">
                      Visit website →
                    </a>
                  )}
                </div>

                {/* Related Articles */}
                {related.length > 0 && (
                  <div className="bg-neutral-50 border border-neutral-300 p-6">
                    <h3 className="text-sm font-bold mb-4">RELATED ARTICLES</h3>
                    <div className="space-y-4">
                      {related.map((r) => (
                        <Link
                          key={r.id}
                          to={`/article/${r.id}`}
                          className="block border-b border-neutral-200 pb-3 last:border-b-0"
                        >
                          <h4 className="font-bold text-sm mb-1 line-clamp-2 hover:text-amber-500">
                            {r.title}
                          </h4>
                          <p className="text-xs text-neutral-500">{r.author_name || r.author_email}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
