import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { useSEO } from '../lib/useSEO';

const Advertise = () => {
  useSEO('Advertise', 'Sponsorship and advertising packages for Transform U Media Network — Standard, Premium, and Enterprise tiers, plus sponsored content and podcast sponsorships.');
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', company: '', package_interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function update<K extends keyof typeof form>(field: K, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const { error: insertError } = await supabase.from('ad_inquiries').insert({
      company_name: form.company,
      contact_name: `${form.first_name} ${form.last_name}`.trim(),
      email: form.email,
      package_interest: form.package_interest || null,
      message: form.message || null,
    });
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setSubmitted(true);
  }

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

      {/* Ad Packages — updated to flat-rate pricing benchmarked against 2026 small/emerging network rates */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Advertising Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Standard Package */}
            <div className="border-2 border-neutral-300 p-8 hover:border-black transition-all">
              <h3 className="text-2xl font-bold mb-4">Standard</h3>
              <div className="text-4xl font-bold mb-6">$250<span className="text-lg text-neutral-500">/mo</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2"><span className="text-amber-500">✓</span><span>728x90 Header Banner</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500">✓</span><span>300x250 Sidebar Ad</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500">✓</span><span>Rotating placement, 1 site section</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500">✓</span><span>Monthly performance summary</span></li>
              </ul>
              <a href="#inquiry" className="block text-center w-full bg-neutral-900 text-white py-3 font-bold hover:bg-black transition-colors">
                GET STARTED
              </a>
            </div>

            {/* Premium Package */}
            <div className="border-4 border-amber-500 p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <div className="text-4xl font-bold mb-6">$650<span className="text-lg text-neutral-500">/mo</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2"><span className="text-amber-500">✓</span><span>All Standard features</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500">✓</span><span>970x90 Billboard placement</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500">✓</span><span>Homepage feature placement</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500">✓</span><span>1 newsletter mention/month</span></li>
              </ul>
              <a href="#inquiry" className="block text-center w-full bg-amber-500 text-black py-3 font-bold hover:bg-amber-400 transition-colors">
                GET STARTED
              </a>
            </div>

            {/* Enterprise Package */}
            <div className="border-2 border-neutral-300 p-8 hover:border-black transition-all">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-6">$1,500<span className="text-lg text-neutral-500">/mo+</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2"><span className="text-amber-500">✓</span><span>All Premium features</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500">✓</span><span>Full-site placement across all brands</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500">✓</span><span>Category exclusivity (no competing advertisers)</span></li>
                <li className="flex items-start gap-2"><span className="text-amber-500">✓</span><span>Dedicated account contact</span></li>
              </ul>
              <a href="#inquiry" className="block text-center w-full bg-neutral-900 text-white py-3 font-bold hover:bg-black transition-colors">
                CONTACT SALES
              </a>
            </div>
          </div>
          <p className="text-center text-sm text-neutral-500 mt-8 max-w-2xl mx-auto">
            Pricing reflects flat-rate packages appropriate for an emerging network — benchmarked
            against 2026 small-publisher and small-podcast sponsorship rates rather than CPM, since
            CPM math only makes sense once download/pageview volume is consistently high. Revisit
            upward as your real analytics grow.
          </p>
        </div>
      </section>

      {/* Ad Placement Zones */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Available Ad Placements</h2>
          <div className="space-y-8">
            <div className="bg-white border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-3">Header Banner (728x90)</h3>
              <p className="text-sm text-neutral-600 mb-4">Prime positioning above all content on every page. Maximum visibility.</p>
              <div className="bg-neutral-100 h-24 flex items-center justify-center text-neutral-500">[ 728x90 Header Banner Preview ]</div>
            </div>
            <div className="bg-white border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-3">Billboard (970x90)</h3>
              <p className="text-sm text-neutral-600 mb-4">Premium wide-format placement on homepage and key landing pages.</p>
              <div className="bg-neutral-100 h-24 flex items-center justify-center text-neutral-500">[ 970x90 Billboard Preview ]</div>
            </div>
            <div className="bg-white border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-3">Sidebar Square (300x250)</h3>
              <p className="text-sm text-neutral-600 mb-4">Persistent placement in article sidebar. High engagement from readers.</p>
              <div className="bg-neutral-100 aspect-square max-w-xs flex items-center justify-center text-neutral-500">[ 300x250 Sidebar Preview ]</div>
            </div>
            <div className="bg-white border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-3">Inline Banner (468x60)</h3>
              <p className="text-sm text-neutral-600 mb-4">Embedded within article content for contextual relevance.</p>
              <div className="bg-neutral-100 h-16 flex items-center justify-center text-neutral-500">[ 468x60 Inline Banner Preview ]</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsored Content — updated to flat-rate benchmarks */}
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
              <div className="text-2xl font-bold text-amber-500 mb-4">$400–$800 per article</div>
              <a href="#inquiry" className="inline-block bg-neutral-900 text-white px-6 py-3 font-bold hover:bg-black transition-colors">
                LEARN MORE
              </a>
            </div>

            <div className="border-2 border-neutral-300 p-8">
              <h3 className="text-xl font-bold mb-4">Podcast Sponsorships</h3>
              <p className="text-neutral-600 mb-6">
                Host-read sponsorship mentions in our shows, plus inclusion in show notes and
                episode article versions. Flat-rate pricing, no minimum download threshold.
              </p>
              <div className="text-2xl font-bold text-amber-500 mb-4">$75–$150/episode · $400–$1,500/mo for a recurring or title sponsorship</div>
              <a href="#inquiry" className="inline-block bg-neutral-900 text-white px-6 py-3 font-bold hover:bg-black transition-colors">
                LEARN MORE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="inquiry" className="bg-black text-white py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Ready to Get Started?</h2>
          <p className="text-center text-neutral-300 mb-8">
            Contact our advertising team to discuss custom packages and opportunities.
          </p>

          {submitted ? (
            <div className="bg-neutral-900 border-2 border-amber-500 p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Inquiry received.</h3>
              <p className="text-neutral-300">We'll follow up shortly. Thanks for your interest in TUMN.</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && <div className="bg-red-900/40 border border-red-700 text-red-200 p-3 text-sm">{error}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" required placeholder="First Name" value={form.first_name}
                  onChange={(e) => update('first_name', e.target.value)} className="px-4 py-3 bg-white text-black" />
                <input type="text" required placeholder="Last Name" value={form.last_name}
                  onChange={(e) => update('last_name', e.target.value)} className="px-4 py-3 bg-white text-black" />
              </div>
              <input type="email" required placeholder="Email Address" value={form.email}
                onChange={(e) => update('email', e.target.value)} className="w-full px-4 py-3 bg-white text-black" />
              <input type="text" required placeholder="Company Name" value={form.company}
                onChange={(e) => update('company', e.target.value)} className="w-full px-4 py-3 bg-white text-black" />
              <select value={form.package_interest} onChange={(e) => update('package_interest', e.target.value)}
                className="w-full px-4 py-3 bg-white text-black">
                <option value="">Select Package Interest</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
                <option value="enterprise">Enterprise</option>
                <option value="sponsored-content">Sponsored Content</option>
                <option value="custom">Custom Solution</option>
              </select>
              <textarea placeholder="Tell us about your advertising goals..." rows={4} value={form.message}
                onChange={(e) => update('message', e.target.value)} className="w-full px-4 py-3 bg-white text-black" />
              <button type="submit" disabled={saving}
                className="w-full bg-amber-500 text-black py-4 font-bold hover:bg-amber-400 transition-colors disabled:opacity-50">
                {saving ? 'SUBMITTING…' : 'SUBMIT INQUIRY'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Advertise;
