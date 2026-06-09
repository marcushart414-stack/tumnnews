import { useState } from 'react';
import ArticleCard from '../components/ArticleCard';

const Newsroom = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Faith', 'Leadership', 'Trauma', 'Culture', 'Business', 'Mental Health', 'Politics', 'Entertainment'];

  const articles = [
    {
      id: '1',
      title: 'Faith-Driven Leadership in Modern Business',
      excerpt: 'Exploring how faith principles transform organizational culture and drive authentic leadership in today\'s corporate landscape.',
      category: 'Leadership',
      author: 'Marcus Thompson',
      date: '2024-01-15',
      image: null,
      type: 'podcast-article' as const
    },
    {
      id: '2',
      title: 'Trauma-Informed Approaches to Community Building',
      excerpt: 'Understanding the impact of collective trauma and creating healing spaces within urban communities.',
      category: 'Trauma',
      author: 'Dr. Sarah Williams',
      date: '2024-01-14',
      image: null,
      type: 'article' as const
    },
    {
      id: '3',
      title: 'The Intersection of Faith and Mental Health',
      excerpt: 'Breaking stigmas and building bridges between spiritual practices and mental wellness.',
      category: 'Mental Health',
      author: 'Rev. James Porter',
      date: '2024-01-13',
      image: null,
      type: 'podcast-article' as const
    },
    {
      id: '4',
      title: 'Urban Culture and the Politics of Representation',
      excerpt: 'How urban communities are reclaiming their narratives in mainstream media and political discourse.',
      category: 'Politics',
      author: 'Angela Martinez',
      date: '2024-01-12',
      image: null,
      type: 'article' as const
    },
    {
      id: '5',
      title: 'Building Kingdom Business in Secular Spaces',
      excerpt: 'Strategies for entrepreneurs integrating faith values into competitive business environments.',
      category: 'Business',
      author: 'David Chen',
      date: '2024-01-11',
      image: null,
      type: 'podcast-article' as const
    },
    {
      id: '6',
      title: 'Entertainment Industry and Cultural Transformation',
      excerpt: 'The role of faith-based content creators in reshaping entertainment narratives.',
      category: 'Entertainment',
      author: 'Tasha Brown',
      date: '2024-01-10',
      image: null,
      type: 'article' as const
    },
  ];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

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

              <div className="space-y-8">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="border-b border-neutral-200 pb-8 last:border-b-0">
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>

              {filteredArticles.length === 0 && (
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
                  {articles.filter(a => a.type === 'podcast-article').slice(0, 3).map((article) => (
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
                <p className="text-sm text-neutral-300 mb-4">
                  Get weekly updates delivered to your inbox.
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsroom;
