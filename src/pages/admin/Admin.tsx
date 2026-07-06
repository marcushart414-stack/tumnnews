import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRequireRole } from '../../lib/useRequireRole';
import { useSEO } from '../../lib/useSEO';

interface ArticleRow {
  id: number;
  title: string;
  excerpt: string;
  category: string | null;
  author_name: string | null;
  author_email: string;
  created_at: string;
  status: string | null;
}

const Admin = () => {
  useSEO('Admin — Article Review');
  const { loading: authLoading, profile } = useRequireRole('admin');
  const [pending, setPending] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadPending() {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('articles')
      .select('id, title, excerpt, category, author_name, author_email, created_at, status')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });
    if (fetchError) {
      setError(fetchError.message);
    } else {
      setPending(data as ArticleRow[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!authLoading && profile) loadPending();
  }, [authLoading, profile]);

  async function handlePublish(id: number) {
    setActioningId(id);
    const { error: updateError } = await supabase
      .from('articles')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .eq('id', id);
    setActioningId(null);
    if (updateError) { setError(updateError.message); return; }
    setPending((p) => p.filter((a) => a.id !== id));
  }

  async function handleReject(id: number) {
    setActioningId(id);
    const { error: updateError } = await supabase
      .from('articles')
      .update({ status: 'needs_revision' })
      .eq('id', id);
    setActioningId(null);
    if (updateError) { setError(updateError.message); return; }
    setPending((p) => p.filter((a) => a.id !== id));
  }

  if (authLoading || loading) {
    return <div className="bg-white py-24 text-center text-neutral-500">Loading…</div>;
  }

  return (
    <div className="bg-white">
      <section className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Article Review</h1>
          <p className="text-neutral-300">{pending.length} submission{pending.length === 1 ? '' : 's'} awaiting review</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          {error && <div className="bg-red-50 border-2 border-red-300 text-red-700 p-4 mb-6">{error}</div>}

          {pending.length === 0 ? (
            <p className="text-neutral-500 text-center py-16">Nothing waiting for review right now.</p>
          ) : (
            <div className="space-y-6">
              {pending.map((article) => (
                <div key={article.id} className="border-2 border-neutral-300 p-6">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <span className="text-xs font-bold text-amber-500 tracking-wider uppercase">{article.category || 'Uncategorized'}</span>
                      <h2 className="text-xl font-bold">{article.title}</h2>
                      <p className="text-sm text-neutral-500">
                        {article.author_name || article.author_email} · submitted {new Date(article.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-neutral-700 mb-4">{article.excerpt}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePublish(article.id)}
                      disabled={actioningId === article.id}
                      className="bg-amber-500 text-black px-6 py-2 font-bold hover:bg-amber-400 transition-colors disabled:opacity-50"
                    >
                      {actioningId === article.id ? '…' : 'PUBLISH'}
                    </button>
                    <button
                      onClick={() => handleReject(article.id)}
                      disabled={actioningId === article.id}
                      className="border-2 border-neutral-300 px-6 py-2 font-bold hover:border-black transition-colors disabled:opacity-50"
                    >
                      REQUEST REVISION
                    </button>
                    <a
                      href={`https://supabase.com/dashboard/project/evtaizxntprnlitqxxyh/editor`}
                      target="_blank" rel="noopener noreferrer"
                      className="ml-auto text-sm text-neutral-500 hover:text-amber-500 self-center"
                    >
                      View full content in Studio →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Admin;
