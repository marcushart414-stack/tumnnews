const Advertise = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Advertise with TUMN</h1>
          <p className="text-xl text-neutral-300">
            Reach engaged audiences seeking transformation, faith-based content, and authentic leadership.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Reach</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-500 mb-2">500K+</div>
              <div className="text-neutral-600">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-500 mb-2">250K+</div>
              <div className="text-neutral-600">Podcast Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-500 mb-2">100K+</div>
              <div className="text-neutral-600">Email Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-amber-500 mb-2">4</div>
              <div className="text-neutral-600">Media Brands</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Packages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Advertising Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Standard Package */}
            <div className="border-2 border-neutral-300 p-8 hover:border-black transition-all">
              <h3 className="text-2xl font-bold mb-4">Standard</h3>
              <div className="text-4xl font-bold mb-6">$2,500<span className="text-lg text-neutral-500">/mo</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>728x90 Header Banner</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>300x250 Sidebar Ad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>50,000+ impressions/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>Performance reporting</span>
                </li>
              </ul>
              <button className="w-full bg-neutral-900 text-white py-3 font-bold hover:bg-black transition-colors">
                GET STARTED
              </button>
            </div>

            {/* Premium Package */}
            <div className="border-4 border-amber-500 p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <div className="text-4xl font-bold mb-6">$5,000<span className="text-lg text-neutral-500">/mo</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>All Standard features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>970x90 Billboard placement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>Sponsored article (1/month)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>Newsletter feature</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>150,000+ impressions/month</span>
                </li>
              </ul>
              <button className="w-full bg-amber-500 text-black py-3 font-bold hover:bg-amber-400 transition-colors">
                GET STARTED
              </button>
            </div>

            {/* Enterprise Package */}
            <div className="border-2 border-neutral-300 p-8 hover:border-black transition-all">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-6">Custom</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>All Premium features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>Multi-brand exposure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>Podcast sponsorships</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>Custom content creation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500">✓</span>
                  <span>Dedicated account manager</span>
                </li>
              </ul>
              <button className="w-full bg-neutral-900 text-white py-3 font-bold hover:bg-black transition-colors">
                CONTACT SALES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Placement Zones */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Available Ad Placements</h2>
          <div className="space-y-8">
            {/* Header Banner */}
            <div className="bg-white border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-3">Header Banner (728x90)</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Prime positioning above all content on every page. Maximum visibility.
              </p>
              <div className="bg-neutral-100 h-24 flex items-center justify-center text-neutral-500">
                [ 728x90 Header Banner Preview ]
              </div>
            </div>

            {/* Billboard */}
            <div className="bg-white border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-3">Billboard (970x90)</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Premium wide-format placement on homepage and key landing pages.
              </p>
              <div className="bg-neutral-100 h-24 flex items-center justify-center text-neutral-500">
                [ 970x90 Billboard Preview ]
              </div>
            </div>

            {/* Sidebar */}
            <div className="bg-white border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-3">Sidebar Square (300x250)</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Persistent placement in article sidebar. High engagement from readers.
              </p>
              <div className="bg-neutral-100 aspect-square max-w-xs flex items-center justify-center text-neutral-500">
                [ 300x250 Sidebar Preview ]
              </div>
            </div>

            {/* Inline */}
            <div className="bg-white border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-3">Inline Banner (468x60)</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Embedded within article content for contextual relevance.
              </p>
              <div className="bg-neutral-100 h-16 flex items-center justify-center text-neutral-500">
                [ 468x60 Inline Banner Preview ]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsored Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Sponsored Content Opportunities</h2>
          <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
            Partner with our editorial team to create authentic, engaging content that resonates 
            with our audience while promoting your brand values.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-2 border-neutral-300 p-8">
              <h3 className="text-xl font-bold mb-4">Sponsored Articles</h3>
              <p className="text-neutral-600 mb-6">
                Professionally written articles that align with our editorial standards while 
                highlighting your message. Full SEO optimization and social promotion included.
              </p>
              <div className="text-2xl font-bold text-amber-500 mb-4">$3,000 per article</div>
              <button className="bg-neutral-900 text-white px-6 py-3 font-bold hover:bg-black transition-colors">
                LEARN MORE
              </button>
            </div>

            <div className="border-2 border-neutral-300 p-8">
              <h3 className="text-xl font-bold mb-4">Podcast Sponsorships</h3>
              <p className="text-neutral-600 mb-6">
                30-60 second sponsorship mentions in our popular podcast shows, plus inclusion 
                in show notes and episode article versions.
              </p>
              <div className="text-2xl font-bold text-amber-500 mb-4">Starting at $1,500/episode</div>
              <button className="bg-neutral-900 text-white px-6 py-3 font-bold hover:bg-black transition-colors">
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-black text-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Ready to Get Started?</h2>
          <p className="text-center text-neutral-300 mb-8">
            Contact our advertising team to discuss custom packages and opportunities.
          </p>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="px-4 py-3 bg-white text-black"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-4 py-3 bg-white text-black"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-white text-black"
            />
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-3 bg-white text-black"
            />
            <select className="w-full px-4 py-3 bg-white text-black">
              <option>Select Package Interest</option>
              <option>Standard</option>
              <option>Premium</option>
              <option>Enterprise</option>
              <option>Sponsored Content</option>
              <option>Custom Solution</option>
            </select>
            <textarea
              placeholder="Tell us about your advertising goals..."
              rows={4}
              className="w-full px-4 py-3 bg-white text-black"
            />
            <button
              type="submit"
              className="w-full bg-amber-500 text-black py-4 font-bold hover:bg-amber-400 transition-colors"
            >
              SUBMIT INQUIRY
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Advertise;
