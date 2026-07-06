import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { signOut } from '../lib/auth';
import { useSEO } from '../lib/useSEO';

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
  useSEO('My Dashboard');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{ id: string; full_name: string | null; email: string | null; created_at: string } | null>(null);
  const [submissions, setSubmissions] = useState<ArticleRow[]>([]);
  const [drafts, setDrafts] = useState<ArticleRow[]>([]);
  const [saved, setSaved] = useState<SavedRow[]>([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        navigate('/login');
        return;
      }
      const email = userData.user.email;

      const [{ data: profileData }, { data: articleData }, { data: savedData }] = await Promise.all([
        supabase.from('profiles').select('id, full_name, email, created_at').eq('id', userData.user.id).single(),
        supabase.from('articles').select('id, title, status, created_at').eq('author_email', email).order('created_at', { ascending: false }),
        supabase.from('saved_articles').select('article_id, articles(id, title, author_name, author_email)').eq('user_id', userData.user.id),
      ]);

      setProfile(profileData);
      setNameInput(profileData?.full_name || '');
      const all = (articleData as ArticleRow[]) || [];
      setSubmissions(all.filter((a) => a.status !== 'draft'));
      setDrafts(all.filter((a) => a.status === 'draft'));
      setSaved((savedData as unknown as SavedRow[]) || []);
      setLoading(false);
    })();
  }, [navigate]);

  async function handleSaveProfile() {
    if (!profile) return;
    setSavingProfile(true);
    const { error } = await supabase.from('profiles').update({ full_name: nameInput }).eq('id', profile.id);
    setSavingProfile(false);
    if (!error) {
      setProfile({ ...profile, full_name: nameInput });
      setEditingProfile(false);
    }
  }

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

              {drafts.length > 0 && (
                <div className="mb-6 space-y-3">
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wide">Drafts</h3>
                  {drafts.map((d) => (
                    <div key={d.id} className="bg-neutral-50 border-2 border-dashed border-neutral-300 p-4 flex justify-between items-center">
                      <span className="font-bold">{d.title}</span>
                      <Link to={`/submit-article?draft=${d.id}`} className="text-sm text-amber-500 font-bold hover:underline">
                        Continue Editing →
                      </Link>
                    </div>
                  ))}
                </div>
              )}

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
              {editingProfile ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-neutral-600 block mb-1">Name</label>
                    <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-300 text-sm" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleSaveProfile} disabled={savingProfile}
                      className="flex-1 bg-amber-500 text-black py-2 text-sm font-bold hover:bg-amber-400 transition-colors disabled:opacity-50">
                      {savingProfile ? 'SAVING…' : 'SAVE'}
                    </button>
                    <button onClick={() => { setEditingProfile(false); setNameInput(profile?.full_name || ''); }}
                      className="flex-1 border border-neutral-300 py-2 text-sm font-bold hover:border-black transition-colors">
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <>
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
                    onClick={() => setEditingProfile(true)}
                    className="w-full mt-4 bg-neutral-900 text-white py-2 text-sm font-bold hover:bg-black transition-colors"
                  >
                    EDIT PROFILE
                  </button>
                </>
              )}
              <button
                onClick={() => signOut().then(() => navigate('/login'))}
                className="w-full mt-2 border border-neutral-300 py-2 text-sm font-bold hover:border-black transition-colors"
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
