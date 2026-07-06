import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { signOut } from '../lib/auth';

interface ArticleRow {
  id: number;
  title: string;
  status: string | null;
  created_at: string;
}
interface SavedRow {
  article_id: number;
  articles: { id: number; title: string; author_name: string | null; author_email: string } | null;
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Under Review',
  published: 'Published',
  needs_revision: 'Needs Revision',
};
const STATUS_STYLES: Record<string, string> = {
  published: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  needs_revision: 'bg-red-100 text-red-800',
};

const MemberDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{ full_name: string | null; email: string | null; created_at: string } | null>(null);
  const [submissions, setSubmissions] = useState<ArticleRow[]>([]);
  const [saved, setSaved] = useState<SavedRow[]>([]);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        navigate('/login');
        return;
      }
      const email = userData.user.email;

      const [{ data: profileData }, { data: articleData }, { data: savedData }] = await Promise.all([
        supabase.from('profiles').select('full_name, email, created_at').eq('id', userData.user.id).single(),
        supabase.from('articles').select('id, title, status, created_at').eq('author_email', email).order('created_at', { ascending: false }),
        supabase.from('saved_articles').select('article_id, articles(id, title, author_name, author_email)').eq('user_id', userData.user.id),
      ]);

      setProfile(profileData);
      setSubmissions((articleData as ArticleRow[]) || []);
      setSaved((savedData as unknown as SavedRow[]) || []);
      setLoading(false);
    })();
  }, [navigate]);

  if (loading) {
    return <div className="bg-white py-24 text-center text-neutral-500">Loading your dashboard…</div>;
  }

  const publishedCount = submissions.filter((s) => s.status === 'published').length;

  return (
    <div className="bg-white">
      <section className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-neutral-300">Welcome back, {profile?.full_name || profile?.email}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-neutral-50 border-2 border-neutral-300 p-6 text-center">
                <div className="text-3xl font-bold text-amber-500 mb-2">{submissions.length}</div>
                <div className="text-sm text-neutral-600">Submissions</div>
              </div>
              <div className="bg-neutral-50 border-2 border-neutral-300 p-6 text-center">
                <div className="text-3xl font-bold text-amber-500 mb-2">{publishedCount}</div>
                <div className="text-sm text-neutral-600">Published</div>
              </div>
              <div className="bg-neutral-50 border-2 border-neutral-300 p-6 text-center">
                <div className="text-3xl font-bold text-amber-500 mb-2">{saved.length}</div>
                <div className="text-sm text-neutral-600">Saved</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">My Submissions</h2>
                <Link to="/submit-article" className="bg-amber-500 text-black px-4 py-2 text-sm font-bold hover:bg-amber-400 transition-colors">
                  NEW SUBMISSION
                </Link>
              </div>
              <div className="space-y-4">
                {submissions.length === 0 && <p className="text-neutral-500">You haven't submitted anything yet.</p>}
                {submissions.map((submission) => {
                  const statusKey = submission.status || 'pending';
                  return (
                    <div key={submission.id} className="bg-white border-2 border-neutral-300 p-6 hover:border-black transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{submission.title}</h3>
                        <span className={`text-xs px-3 py-1 font-bold ${STATUS_STYLES[statusKey] || 'bg-neutral-100 text-neutral-700'}`}>
                          {STATUS_LABELS[statusKey] || statusKey}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 mb-4">
                        Submitted on {new Date(submission.created_at).toLocaleDateString()}
                      </p>
                      {statusKey === 'published' && (
                        <Link to={`/article/${submission.id}`} className="text-sm text-amber-500 font-bold hover:underline">
                          View Published
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Saved for Later</h2>
              <div className="space-y-4">
                {saved.length === 0 && <p className="text-neutral-500">Nothing saved yet.</p>}
                {saved.map((s) => s.articles && (
                  <Link key={s.article_id} to={`/article/${s.articles.id}`}
                    className="block bg-white border-2 border-neutral-300 p-6 hover:border-black transition-colors">
                    <h3 className="font-bold mb-1">{s.articles.title}</h3>
                    <p className="text-sm text-neutral-600">by {s.articles.author_name || s.articles.author_email}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-50 border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-4">Profile</h3>
              <div className="w-24 h-24 bg-neutral-300 rounded-full mb-4"></div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-neutral-600">Name:</span>
                  <div className="font-bold">{profile?.full_name || '—'}</div>
                </div>
                <div>
                  <span className="text-neutral-600">Email:</span>
                  <div className="font-bold">{profile?.email}</div>
                </div>
                <div>
                  <span className="text-neutral-600">Member since:</span>
                  <div className="font-bold">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => signOut().then(() => navigate('/login'))}
                className="w-full mt-4 bg-neutral-900 text-white py-2 text-sm font-bold hover:bg-black transition-colors"
              >
                LOG OUT
              </button>
            </div>

            <div className="bg-neutral-50 border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link to="/submit-article" className="block hover:text-amber-500">→ Submit New Article</Link>
                <Link to="/newsroom" className="block hover:text-amber-500">→ Browse Newsroom</Link>
                <Link to="/blog" className="block hover:text-amber-500">→ Read Blog</Link>
              </div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-500 p-6">
              <h3 className="font-bold mb-3">📋 Submission Tips</h3>
              <ul className="text-sm space-y-2 text-neutral-700">
                <li>• Original content only</li>
                <li>• 800-2000 words optimal</li>
                <li>• Review time: 5-7 days</li>
                <li>• Include relevant tags</li>
                <li>• High-quality images help</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
