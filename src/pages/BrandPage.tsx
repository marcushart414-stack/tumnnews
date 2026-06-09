import { useParams } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';

const BrandPage = () => {
  const { brandId } = useParams();

  const brandInfo: Record<string, any> = {
    'urban-news-journal': {
      name: 'Urban News Journal',
      tagline: 'Amplifying Urban Voices, Telling Untold Stories',
      description: 'In-depth reporting on urban culture, politics, community issues, and the movements shaping our cities.',
      icon: '📰',
      focus: ['Community News', 'Urban Politics', 'Social Justice', 'Cultural Commentary']
    },
    'transform-u-live': {
      name: 'Transform U! Live Show',
      tagline: 'Where Transformation Meets Conversation',
      description: 'Weekly podcast exploring personal transformation through faith, leadership, and authentic dialogue.',
      icon: '🎙️',
      focus: ['Personal Development', 'Faith Journey', 'Leadership', 'Authentic Living']
    },
    'kinetic-pe-mixx': {
      name: 'Kinetic PE MIXX',
      tagline: 'Energy in Motion',
      description: 'Dynamic content at the intersection of culture, creativity, and kinetic energy.',
      icon: '⚡',
      focus: ['Youth Culture', 'Creative Expression', 'Movement & Dance', 'Cultural Innovation']
    },
    'warrior-mandate': {
      name: 'Warrior Mandate',
      tagline: 'Forging Men of Purpose',
      description: 'Empowering men to lead with integrity, faith, and authentic masculinity in modern society.',
      icon: '⚔️',
      focus: ['Mens Leadership', 'Faith & Purpose', 'Fatherhood', 'Authentic Masculinity']
    }
  };

  const brand = brandInfo[brandId || ''] || brandInfo['urban-news-journal'];

  const brandArticles = [
    {
      id: '1',
      title: `Featured Story from ${brand.name}`,
      excerpt: 'This is a sample article that would be specifically tagged to this brand within the TUMN network.',
      category: brand.focus[0],
      author: 'Staff Writer',
      date: '2024-01-15',
      image: null,
      type: 'article' as const
    },
  ];

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
              <div
                key={area}
                className="bg-white border-2 border-neutral-300 p-6 text-center hover:border-amber-500 transition-colors"
              >
                <div className="font-bold">{area}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {brandId === 'transform-u-live' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Latest Episodes</h2>
            <div className="bg-neutral-50 border-2 border-neutral-300 p-8">
              <div className="aspect-video bg-neutral-200 mb-6 flex items-center justify-center text-neutral-500">
                [ Spotify Playlist Embed - Transform U! Live Episodes ]
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-100 p-4">
                  <h3 className="font-bold mb-2">🎙️ Episode 42: Faith-Driven Leadership</h3>
                  <p className="text-sm text-neutral-600">Exploring authentic leadership principles</p>
                </div>
                <div className="bg-neutral-100 p-4">
                  <h3 className="font-bold mb-2">🎙️ Episode 41: Overcoming Trauma</h3>
                  <p className="text-sm text-neutral-600">Healing through faith and community</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8">Latest from {brand.name}</h2>
              <div className="space-y-8">
                {brandArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
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
                <p className="text-sm text-neutral-300 mb-4">
                  Get updates delivered to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 mb-3 text-black"
                />
                <button className="w-full bg-amber-500 text-black font-bold py-2 hover:bg-amber-400 transition-colors">
                  SUBSCRIBE
                </button>
              </div>

              <div className="bg-neutral-50 border-2 border-neutral-300 p-6">
                <h3 className="font-bold mb-4">Follow {brand.name}</h3>
                <div className="space-y-2">
                  <a href="#" className="block px-4 py-2 bg-neutral-900 text-white text-center hover:bg-black">
                    Twitter
                  </a>
                  <a href="#" className="block px-4 py-2 bg-neutral-900 text-white text-center hover:bg-black">
                    Facebook
                  </a>
                  <a href="#" className="block px-4 py-2 bg-neutral-900 text-white text-center hover:bg-black">
                    Instagram
                  </a>
                  {brandId === 'transform-u-live' && (
                    <>
                      <a href="#" className="block px-4 py-2 bg-neutral-900 text-white text-center hover:bg-black">
                        Spotify
                      </a>
                      <a href="#" className="block px-4 py-2 bg-neutral-900 text-white text-center hover:bg-black">
                        YouTube
                      </a>
                    </>
                  )}
                </div>
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
          <a
            href="/submit-article"
            className="inline-block bg-amber-500 text-black px-8 py-4 font-bold hover:bg-amber-400 transition-colors"
          >
            SUBMIT YOUR ARTICLE
          </a>
        </div>
      </section>
    </div>
  );
};

export default BrandPage;
