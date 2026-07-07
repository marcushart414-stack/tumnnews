import { useEffect, useState, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useSEO } from '../lib/useSEO';
import ImageUpload from '../components/ImageUpload';
import type { User } from '@supabase/supabase-js';

const categories = ['Faith', 'Leadership', 'Trauma', 'Culture', 'Business', 'Mental Health', 'Politics', 'Entertainment'];

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'article';
}

// Accepts a regular watch URL, a youtu.be short link, or an already-correct
// embed URL, and always returns an /embed/ URL — the only format YouTube
// will actually allow inside an <iframe>. Regular watch-page URLs actively
// refuse to be framed, which is exactly the "refused to connect" error.
function normalizeYouTubeUrl(url: string): string {
  if (!url) return url;
  const trimmed = url.trim();
  if (trimmed.includes('/embed/')) return trimmed;

  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  return trimmed; // unrecognized format — left as-is, will just not embed
}

// Inserts a row with a guaranteed-unique slug, retrying with -2, -3, etc.
// if the clean slug is already taken (slug has a unique constraint).
async function insertWithUniqueSlug(table: 'articles', baseRecord: Record<string, any>, baseSlug: string) {
  let slug = baseSlug;
  for (let attempt = 1; attempt <= 5; attempt++) {
    const { data, error } = await supabase.from(table).insert({ ...baseRecord, slug }).select('id').single();
    if (!error) return { data, error: null };
    if (error.code === '23505') { // unique_violation — try the next suffix
      slug = `${baseSlug}-${attempt + 1}`;
      continue;
    }
    return { data: null, error }; // a different error — don't keep retrying
  }
  return { data: null, error: { message: 'Could not generate a unique URL for this title.' } as any };
}

const SubmitArticle = () => {
  useSEO('Submit an Article', 'Submit a guest article to Transform U Media Network for editorial review.');
  const [searchParams] = useSearchParams();
  const draftIdParam = searchParams.get('draft');

  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [draftId, setDraftId] = useState<number | null>(null);

  const [form, setForm] = useState({
    first_name: '', last_name: '', bio: '', website: '',
    title: '', category: '', tags: '', summary: '', content: '',
    featured_image: '', youtube_url: '', podcast_url: '', agree: false,
  });

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      // If editing an existing draft, load it (only if it belongs to this user).
      if (draftIdParam && data.user) {
        const { data: draft } = await supabase
          .from('articles')
          .select('*')
          .eq('id', draftIdParam)
          .eq('author_email', data.user.email)
          .eq('status', 'draft')
          .single();

        if (draft) {
          setDraftId(draft.id);
          const [first, ...rest] = (draft.author_name || '').split(' ');
          setForm({
            first_name: first || '',
            last_name: rest.join(' ') || '',
            bio: draft.author_bio || '',
            website: draft.author_website || '',
            title: draft.title || '',
            category: draft.category || '',
            tags: (draft.tags || []).join(', '),
            summary: draft.excerpt || '',
            content: draft.content || '',
            featured_image: draft.featured_image || '',
            youtube_url: draft.youtube_url || '',
            podcast_url: draft.podcast_url || '',
            agree: false,
          });
        }
      }
      setCheckingAuth(false);
    })();
  }, [draftIdParam]);

  function update<K extends keyof typeof form>(field: K, value: typeof form[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function buildRecord(status: 'draft' | 'pending') {
    return {
      author_email: user!.email,
      author_name: `${form.first_name} ${form.last_name}`.trim(),
      author_bio: form.bio || null,
      author_website: form.website || null,
      title: form.title || '(untitled draft)',
      excerpt: form.summary,
      content: form.content,
      category: form.category || null,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : null,
      featured_image: form.featured_image || null,
      youtube_url: form.youtube_url ? normalizeYouTubeUrl(form.youtube_url) : null,
      podcast_url: form.podcast_url || null,
      is_podcast_article: Boolean(form.youtube_url || form.podcast_url),
      status,
      section: 'newsroom' as const,
    };
  }

  async function handleSaveDraft() {
    if (!user) return;
    setError(null);
    setSavingDraft(true);

    if (draftId) {
      const { error: updateError } = await supabase.from('articles').update(buildRecord('draft')).eq('id', draftId);
      setSavingDraft(false);
      if (updateError) { setError(updateError.message); return; }
    } else {
      const { data, error: insertError } = await insertWithUniqueSlug('articles', buildRecord('draft'), slugify(form.title || 'draft'));
      setSavingDraft(false);
      if (insertError) { setError(insertError.message); return; }
      setDraftId(data.id); // subsequent saves update this same row instead of creating duplicates
    }
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setError(null);
    setSaving(true);

    let submitError;
    if (draftId) {
      // Updating an existing draft — keep its slug as-is, don't regenerate
      // (the URL may already have been shared/bookmarked).
      ({ error: submitError } = await supabase.from('articles').update(buildRecord('pending')).eq('id', draftId));
    } else {
      ({ error: submitError } = await insertWithUniqueSlug('articles', buildRecord('pending'), slugify(form.title)));
    }

    setSaving(false);
    if (submitError) {
      setError(submitError.message);
      return;
    }
    setSubmitted(true);
  }

  if (checkingAuth) {
    return <div className="bg-white py-24 text-center text-neutral-500">Checking your account…</div>;
  }

  if (!user) {
    return (
      <div className="bg-white">
        <section className="bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">Submit Your Article</h1>
            <p className="text-xl text-neutral-300">
              Share your insights with the TUMN community. Free members can submit guest posts for editorial review.
            </p>
          </div>
        </section>
        <section className="bg-black text-white py-16 border-t border-neutral-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Sign in to submit an article</h2>
            <p className="text-neutral-300 mb-8">
              Create a free TUMN account to submit articles, save drafts, track your submissions,
              and connect with our community of contributors.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/register" className="inline-block bg-amber-500 text-black px-8 py-4 font-bold hover:bg-amber-400 transition-colors">
                CREATE FREE ACCOUNT
              </a>
              <a href="/login" className="inline-block border-2 border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-black transition-colors">
                SIGN IN
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-white py-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Submitted for review 🎉</h1>
          <p className="text-neutral-600 mb-8">
            Thanks, {form.first_name}. Your article is in the editorial queue — response time is
            typically 5-7 business days. You can track its status from your dashboard.
          </p>
          <a href="/dashboard" className="inline-block bg-amber-500 text-black px-8 py-4 font-bold hover:bg-amber-400 transition-colors">
            GO TO MY DASHBOARD
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Submit Your Article</h1>
          <p className="text-xl text-neutral-300">
            Share your insights with the TUMN community. Free members can submit guest posts for editorial review.
          </p>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Submission Guidelines</h2>
          <div className="bg-white border-2 border-neutral-300 p-8 space-y-4">
            <div>
              <h3 className="font-bold mb-2">✓ We're Looking For:</h3>
              <ul className="list-disc pl-6 space-y-1 text-neutral-700">
                <li>Original, well-researched content (800-2000 words)</li>
                <li>Faith-anchored perspectives on culture, leadership, or social issues</li>
                <li>Trauma-informed approaches to community challenges</li>
                <li>Personal testimonies of transformation</li>
                <li>Thought leadership in your field of expertise</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">✗ We Don't Accept:</h3>
              <ul className="list-disc pl-6 space-y-1 text-neutral-700">
                <li>Previously published content</li>
                <li>Promotional or sales-focused articles</li>
                <li>Political endorsements or partisan content</li>
                <li>Plagiarized or AI-generated content without disclosure</li>
              </ul>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p className="text-sm text-neutral-700">
                <strong>Note:</strong> All submissions undergo editorial review. Response time is typically 5-7 business days.
                Accepted articles may be edited for clarity, length, and style consistency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Article Submission Form</h2>

          {error && (
            <div className="bg-red-50 border-2 border-red-300 text-red-700 p-4 mb-6">{error}</div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Author Information */}
            <div className="bg-neutral-50 border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-4 text-lg">Author Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">First Name *</label>
                    <input type="text" required value={form.first_name} onChange={(e) => update('first_name', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Last Name *</label>
                    <input type="text" required value={form.last_name} onChange={(e) => update('last_name', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email Address</label>
                  <input type="email" disabled value={user.email || ''}
                    className="w-full px-4 py-2 border border-neutral-300 bg-neutral-100 text-neutral-500 outline-none" />
                  <p className="text-xs text-neutral-500 mt-1">Locked to your signed-in account.</p>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Author Bio (150 words max)</label>
                  <textarea rows={3} maxLength={800} value={form.bio} onChange={(e) => update('bio', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    placeholder="Brief professional bio to display with your article..." />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Website/Social Media (Optional)</label>
                  <input type="url" value={form.website} onChange={(e) => update('website', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none" placeholder="https://" />
                </div>
              </div>
            </div>

            {/* Article Details */}
            <div className="bg-neutral-50 border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-4 text-lg">Article Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Article Title *</label>
                  <input type="text" required value={form.title} onChange={(e) => update('title', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    placeholder="Enter a compelling, SEO-friendly title..." />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Category *</label>
                  <select required value={form.category} onChange={(e) => update('category', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none">
                    <option value="">Select a category</option>
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Tags (comma-separated)</label>
                  <input type="text" value={form.tags} onChange={(e) => update('tags', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    placeholder="faith, leadership, transformation" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Article Summary (200 words max) *</label>
                  <textarea rows={4} required maxLength={1200} value={form.summary} onChange={(e) => update('summary', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    placeholder="Brief summary for SEO meta description and article previews..." />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Article Content *</label>
                  <textarea rows={20} required value={form.content} onChange={(e) => update('content', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none font-mono text-sm"
                    placeholder="Paste your article content here (800-2000 words)..." />
                  <p className="text-xs text-neutral-500 mt-1">Separate paragraphs with a blank line.</p>
                </div>
              </div>
            </div>

            {/* Media & Links */}
            <div className="bg-neutral-50 border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-4 text-lg">Media & Links (Optional)</h3>
              <div className="space-y-4">
                <div>
                  <ImageUpload
                    label="Featured Image"
                    currentUrl={form.featured_image}
                    folder="featured"
                    onUploaded={(url) => update('featured_image', url)}
                  />
                  <p className="text-xs text-neutral-500 mt-1">JPG or PNG, ideally 1200x630px or larger. Ensure you have rights to use the image.</p>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">YouTube Video (Optional)</label>
                  <input type="url" value={form.youtube_url} onChange={(e) => update('youtube_url', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none" placeholder="https://www.youtube.com/watch?v=..." />
                  <p className="text-xs text-neutral-500 mt-1">Paste any YouTube link — a regular watch link, a youtu.be short link, or an embed link. It's converted automatically.</p>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Podcast Episode Link (Optional)</label>
                  <input type="url" value={form.podcast_url} onChange={(e) => update('podcast_url', e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none" placeholder="https://open.spotify.com/episode/..." />
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="bg-amber-50 border-2 border-amber-500 p-6">
              <div className="flex items-start gap-3">
                <input type="checkbox" required checked={form.agree} onChange={(e) => update('agree', e.target.checked)}
                  className="mt-1" id="agreement" />
                <label htmlFor="agreement" className="text-sm">
                  <strong>I confirm that:</strong> This is my original work, I have not published it elsewhere,
                  I grant TUMN non-exclusive rights to publish and promote this content, and I understand
                  that TUMN may edit the content for clarity and style.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button type="submit" disabled={saving}
                className="flex-1 bg-amber-500 text-black py-4 font-bold hover:bg-amber-400 transition-colors disabled:opacity-50">
                {saving ? 'SUBMITTING…' : 'SUBMIT FOR REVIEW'}
              </button>
              <button type="button" onClick={handleSaveDraft} disabled={savingDraft}
                className="px-8 py-4 border-2 border-neutral-300 font-bold hover:border-black transition-colors disabled:opacity-50">
                {savingDraft ? 'SAVING…' : 'SAVE DRAFT'}
              </button>
            </div>
            {draftSaved && (
              <p className="text-sm text-green-700 text-center font-bold">Draft saved — you can come back and finish this anytime from your dashboard.</p>
            )}

            <p className="text-sm text-neutral-600 text-center">
              By submitting this form, you agree to our <a href="/terms-of-service" className="text-amber-500 hover:underline">Contributor Terms</a> and{' '}
              <a href="/privacy-policy" className="text-amber-500 hover:underline">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SubmitArticle;
