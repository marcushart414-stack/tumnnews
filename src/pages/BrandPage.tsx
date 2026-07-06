import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import { supabase } from '../lib/supabase';
import { useSEO } from '../lib/useSEO';

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

interface SocialLinks {
  website?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  spotify?: string;
  youtube?: string;
}

const brandInfo: Record<string, any> = {
  'urban-news-journal': {
    name: 'Urban News Journal',
    tagline: 'Amplifying Urban Voices, Telling Untold Stories',
    description: 'In-depth reporting on urban culture, politics, community issues, and the movements shaping our cities.',
    icon: '📰',
    focus: ['Community News', 'Urban Politics', 'Social Justice', 'Cultural Commentary'],
    social: { website: 'https://urbannewsjournal.com' } as SocialLinks,
  },
  'transform-u-live': {
    name: 'Transform U! Live Show',
    tagline: 'Where Transformation Meets Conversation',
    description: 'Weekly podcast exploring personal transformation through faith, leadership, and authentic dialogue.',
    icon: '🎙️',
    focus: ['Personal Development', 'Faith Journey', 'Leadership', 'Authentic Living'],
    social: {
      facebook: 'https://www.facebook.com/warriormandate',
      instagram: 'https://www.instagram.com/transformuliveshow',
      spotify: 'https://open.spotify.com/show/0Qe79YuVDX6cuoGPp4kcC0',
      youtube: 'https://www.youtube.com/@thetransformuliveshow',
    } as SocialLinks,
    spotifyEmbed: 'https://open.spotify.com/embed/show/0Qe79YuVDX6cuoGPp4kcC0/video?utm_source=generator&theme=0&si=99baaf69b00743fb',
  },
  'kinetic-pe-mixx': {
    name: 'Kinetic PE MIXX',
    tagline: 'Energy in Motion',
    description: 'Dynamic content at the intersection of culture, creativity, and kinetic energy.',
    icon: '⚡',
    focus: ['Youth Culture', 'Creative Expression', 'Movement & Dance', 'Cultural Innovation'],
    social: { instagram: 'https://instagram.com/kineticpemixx' } as SocialLinks,
  },
  'warrior-mandate': {
    name: 'Warrior Mandate',
    tagline: 'Forging Men of Purpose',
    description: 'Empowering men to lead with integrity, faith, and authentic masculinity in modern society.',
    icon: '⚔️',
    focus: ['Mens Leadership', 'Faith & Purpose', 'Fatherhood', 'Authentic Masculinity'],
    social: {} as SocialLinks,
    subscribeUrl: 'https://warriormandate.substack.com/',
  },
};

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

const SOCIAL_LABELS: { key: keyof SocialLinks; label: string }[] = [
  { key: 'website', label: 'Visit Website' },
  { key: 'twitter', label: 'Twitter' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'spotify', label: 'Spotify' },
  { key: 'youtube', label: 'YouTube' },
];

const BrandPage = () => {
  const { brandId } = useParams();
  const brand = brandInfo[brandId || ''] || brandInfo['urban-news-journal'];
  useSEO(brand.name, brand.description);

  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .eq('brand_slug', brandId)
        .order('published_at', { ascending: false });
      setArticles((data as ArticleRow[]) || []);
      setLoading(false);
    })();
  }, [brandId]);

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('newsletter_subscribers').insert({ email, source: `brand:${brandId}` });
    if (!error) setSubscribed(true);
  }

  const cardArticles = articles.map(toCardArticle);
  const hasSocial = Object.keys(brand.social || {}).length > 0;

  return (
    <div className="bg-white">
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-6xl mb-6">{brand.icon}</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{brand.name}</h1>
          <p className="text-2xl text-amber-500 mb-6">{brand.tagline}</p>
          <p className="text-xl text-neutral-300 max-w-3xl">
            {brand.description}
          </p>
        </div>
      </section>

      <div className="bg-neutral-100 border-y border-neutral-300">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center text-sm text-neutral-500">
            [ Advertisement Space - 970x90 Billboard ]
          </div>
        </div>
      </div>

      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Our Focus</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brand.focus.map((area: string) => (
              <div key={area} className="bg-white border-2 border-neutral-300 p-6 text-center hover:border-amber-500 transition-colors">
                <div className="font-bold">{area}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Spotify embed, Transform U Live only */}
      {brandId === 'transform-u-live' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Latest Episodes</h2>
            <div className="bg-neutral-50 border-2 border-neutral-300 p-8">
              <iframe
                style={{ borderRadius: '12px' }}
                src={brand.spotifyEmbed}
                width="100%"
                height="351"
                frameBorder={0}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8">Latest from {brand.name}</h2>
              {loading && <p className="text-neutral-500">Loading…</p>}
              {!loading && cardArticles.length === 0 && (
                <p className="text-neutral-500">No articles tagged to this brand yet.</p>
              )}
              <div className="space-y-8">
                {cardArticles.map((article) => (
                  <div key={article.id}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white border-2 border-neutral-300 p-6">
                <div className="text-center text-sm text-neutral-500 mb-2">ADVERTISEMENT</div>
                <div className="aspect-square bg-neutral-100 flex items-center justify-center text-neutral-400">
                  [ 300x250 Ad ]
                </div>
              </div>

              <div className="bg-black text-white p-6">
                <h3 className="text-lg font-bold mb-3">Subscribe to {brand.name}</h3>
                {brand.subscribeUrl ? (
                  <>
                    <p className="text-sm text-neutral-300 mb-4">Get updates delivered to your inbox.</p>
                    <a href={brand.subscribeUrl} target="_blank" rel="noopener noreferrer"
                       className="block w-full text-center bg-amber-500 text-black font-bold py-2 hover:bg-amber-400 transition-colors">
                      SUBSCRIBE
                    </a>
                  </>
                ) : subscribed ? (
                  <p className="text-sm text-amber-400">You're subscribed — thanks for joining.</p>
                ) : (
                  <form onSubmit={handleSubscribe}>
                    <p className="text-sm text-neutral-300 mb-4">Get updates delivered to your inbox.</p>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email" className="w-full px-4 py-2 mb-3 text-black" />
                    <button type="submit" className="w-full bg-amber-500 text-black font-bold py-2 hover:bg-amber-400 transition-colors">
                      SUBSCRIBE
                    </button>
                  </form>
                )}
              </div>

              <div className="bg-neutral-50 border-2 border-neutral-300 p-6">
                <h3 className="font-bold mb-4">Follow {brand.name}</h3>
                {hasSocial ? (
                  <div className="space-y-2">
                    {SOCIAL_LABELS.filter(({ key }) => brand.social[key]).map(({ key, label }) => (
                      <a key={key} href={brand.social[key]} target="_blank" rel="noopener noreferrer"
                         className="block px-4 py-2 bg-neutral-900 text-white text-center hover:bg-black">
                        {label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500">Social links coming soon.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Contribute to {brand.name}</h2>
          <p className="text-neutral-300 mb-8">
            Have a story to tell? We are always looking for authentic voices and compelling narratives.
          </p>
          <a href="/submit-article" className="inline-block bg-amber-500 text-black px-8 py-4 font-bold hover:bg-amber-400 transition-colors">
            SUBMIT YOUR ARTICLE
          </a>
        </div>
      </section>
    </div>
  );
};

export default BrandPage;
