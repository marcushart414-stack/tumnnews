import { useParams, Link } from 'react-router-dom';

const ArticleDetail = () => {
  const { id } = useParams();

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-xs font-bold text-amber-500 mb-3 tracking-wider">
            LEADERSHIP
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Faith-Driven Leadership in Modern Business
          </h1>
          <div className="flex items-center gap-4 text-sm text-neutral-300">
            <span>Marcus Thompson</span>
            <span>•</span>
            <span>January 15, 2024</span>
            <span>•</span>
            <span>8 min read</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Article */}
            <div className="lg:col-span-2">
              {/* Featured Image Placeholder */}
              <div className="aspect-video bg-neutral-900 mb-8 flex items-center justify-center text-neutral-600">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Podcast Episode Embed (if podcast article) */}
              <div className="bg-neutral-50 border-2 border-neutral-300 p-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">🎙️</div>
                  <div>
                    <h3 className="font-bold">Listen to Podcast Episode</h3>
                    <p className="text-sm text-neutral-600">Transform U! Live Show - Episode 42</p>
                  </div>
                </div>
                <div className="bg-neutral-200 h-20 flex items-center justify-center text-neutral-500 text-sm">
                  [ Spotify / Audio Player Embed - Episode ID: {id} ]
                </div>
              </div>

              {/* Affiliate Link Example */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8">
                <div className="text-xs font-bold text-amber-700 mb-2">RECOMMENDED RESOURCE</div>
                <h4 className="font-bold mb-2">"Leadership and Self-Deception" by The Arbinger Institute</h4>
                <p className="text-sm text-neutral-700 mb-3">
                  This transformative book explores how self-deception impacts leadership effectiveness.
                </p>
                <a href="#" className="inline-block bg-amber-500 text-black px-4 py-2 text-sm font-bold hover:bg-amber-400">
                  VIEW ON AMAZON →
                </a>
                <p className="text-xs text-neutral-500 mt-2">* Affiliate link - TUMN earns from qualifying purchases</p>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-neutral-700 font-serif leading-relaxed mb-6">
                  In today's rapidly evolving business landscape, leaders face unprecedented challenges 
                  that demand not just strategic acumen, but deep moral clarity and authentic values.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">The Foundation of Faith-Driven Leadership</h2>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  Faith-driven leadership isn't about imposing religious doctrine in the workplace. 
                  Rather, it's about leading from a foundation of tested values, moral courage, and 
                  genuine concern for the wellbeing of those you serve.
                </p>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  This approach recognizes that business success and spiritual integrity aren't 
                  mutually exclusive—they're complementary forces that, when aligned, create 
                  organizations that thrive both financially and culturally.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Key Principles</h2>
                <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-6">
                  <li>Servant leadership over self-promotion</li>
                  <li>Transparency and accountability</li>
                  <li>Long-term thinking over short-term gains</li>
                  <li>Investing in people, not just processes</li>
                  <li>Ethical decision-making under pressure</li>
                </ul>

                {/* Inline Ad */}
                <div className="bg-neutral-100 border border-neutral-300 p-6 my-8 text-center">
                  <div className="text-sm text-neutral-500 mb-2">ADVERTISEMENT</div>
                  <div className="bg-neutral-200 h-24 flex items-center justify-center text-neutral-400">
                    [ 468x60 Inline Banner Ad ]
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Practical Application</h2>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  The real test of faith-driven leadership comes in moments of crisis and decision. 
                  When profit margins squeeze, when competitive pressures mount, when stakeholders 
                  demand compromises—these are the moments that reveal whether your leadership is 
                  truly anchored in unchanging principles.
                </p>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  Leaders who have cultivated deep spiritual roots find that their faith provides 
                  both resilience and wisdom in these crucible moments.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  As we navigate an increasingly complex business environment, faith-driven leadership 
                  offers a compass that points toward sustainable success—success measured not just 
                  in quarterly earnings, but in transformed lives, strengthened communities, and 
                  lasting impact.
                </p>
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <div className="text-sm font-bold mb-3">TAGS</div>
                <div className="flex flex-wrap gap-2">
                  {['Leadership', 'Faith', 'Business', 'Transformation', 'Values'].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-neutral-100 border border-neutral-300 hover:bg-black hover:text-white transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <div className="text-sm font-bold mb-3">SHARE THIS ARTICLE</div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-neutral-900 text-white hover:bg-black">Twitter</button>
                  <button className="px-4 py-2 bg-neutral-900 text-white hover:bg-black">Facebook</button>
                  <button className="px-4 py-2 bg-neutral-900 text-white hover:bg-black">LinkedIn</button>
                  <button className="px-4 py-2 bg-neutral-900 text-white hover:bg-black">Email</button>
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
                  <h4 className="font-bold mb-2">Marcus Thompson</h4>
                  <p className="text-sm text-neutral-600">
                    Marcus is a leadership consultant and executive coach with 15 years of 
                    experience helping faith-based organizations thrive.
                  </p>
                </div>

                {/* Related Articles */}
                <div className="bg-neutral-50 border border-neutral-300 p-6">
                  <h3 className="text-sm font-bold mb-4">RELATED ARTICLES</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Link
                        key={i}
                        to={`/article/${i}`}
                        className="block border-b border-neutral-200 pb-3 last:border-b-0"
                      >
                        <h4 className="font-bold text-sm mb-1 line-clamp-2 hover:text-amber-500">
                          Related Article Title Goes Here
                        </h4>
                        <p className="text-xs text-neutral-500">Author Name</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
