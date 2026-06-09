import ArticleCard from '../components/ArticleCard';

const Blog = () => {
  const blogPosts = [
    {
      id: '7',
      title: 'The Power of Narrative in Faith Communities',
      excerpt: 'How storytelling shapes collective identity and sustains spiritual movements across generations.',
      category: 'Faith',
      author: 'Pastor Michael Reed',
      date: '2024-01-16',
      image: null,
      type: 'article' as const
    },
    {
      id: '8',
      title: 'Leadership Lessons from Urban Pioneers',
      excerpt: 'Profiles of community leaders who are transforming neighborhoods through innovative approaches.',
      category: 'Leadership',
      author: 'Keisha Johnson',
      date: '2024-01-15',
      image: null,
      type: 'article' as const
    },
    {
      id: '9',
      title: 'Cultural Shifts in Post-Pandemic America',
      excerpt: 'Analyzing how COVID-19 accelerated changes in work, worship, and community engagement.',
      category: 'Culture',
      author: 'Dr. Ramon Garcia',
      date: '2024-01-14',
      image: null,
      type: 'article' as const
    },
  ];

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
          <div className="text-center text-sm text-neutral-500">
            [ Advertisement Space - 970x90 Billboard ]
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
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
                <div className="text-center text-sm text-neutral-500 mb-2">ADVERTISEMENT</div>
                <div className="aspect-square bg-neutral-100 flex items-center justify-center text-neutral-400">
                  [ 300x250 Sidebar Ad ]
                </div>
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
