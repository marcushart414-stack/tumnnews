const SubmitArticle = () => {
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
          
          <form className="space-y-6">
            {/* Author Information */}
            <div className="bg-neutral-50 border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-4 text-lg">Author Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Author Bio (150 words max)</label>
                  <textarea
                    rows={3}
                    maxLength={150}
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    placeholder="Brief professional bio to display with your article..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Website/Social Media (Optional)</label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    placeholder="https://"
                  />
                </div>
              </div>
            </div>

            {/* Article Details */}
            <div className="bg-neutral-50 border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-4 text-lg">Article Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Article Title *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    placeholder="Enter a compelling, SEO-friendly title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Category *</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                  >
                    <option value="">Select a category</option>
                    <option>Faith</option>
                    <option>Leadership</option>
                    <option>Trauma</option>
                    <option>Culture</option>
                    <option>Business</option>
                    <option>Mental Health</option>
                    <option>Politics</option>
                    <option>Entertainment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    placeholder="faith, leadership, transformation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Article Summary (200 words max) *</label>
                  <textarea
                    rows={4}
                    required
                    maxLength={200}
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    placeholder="Brief summary for SEO meta description and article previews..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Article Content *</label>
                  <textarea
                    rows={20}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none font-mono text-sm"
                    placeholder="Paste your article content here (800-2000 words)..."
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    You can use basic markdown formatting (# for headings, ** for bold, * for italic, etc.)
                  </p>
                </div>
              </div>
            </div>

            {/* Media & Links */}
            <div className="bg-neutral-50 border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-4 text-lg">Media & Links (Optional)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Featured Image URL</label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    placeholder="https://"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Image should be at least 1200x630px. Ensure you have rights to use the image.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">YouTube Video Embed (Optional)</label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Podcast Episode Link (Optional)</label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 border border-neutral-300 focus:border-black outline-none"
                    placeholder="https://open.spotify.com/episode/..."
                  />
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="bg-amber-50 border-2 border-amber-500 p-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1"
                  id="agreement"
                />
                <label htmlFor="agreement" className="text-sm">
                  <strong>I confirm that:</strong> This is my original work, I have not published it elsewhere, 
                  I grant TUMN non-exclusive rights to publish and promote this content, and I understand 
                  that TUMN may edit the content for clarity and style.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-amber-500 text-black py-4 font-bold hover:bg-amber-400 transition-colors"
              >
                SUBMIT FOR REVIEW
              </button>
              <button
                type="button"
                className="px-8 py-4 border-2 border-neutral-300 font-bold hover:border-black transition-colors"
              >
                SAVE DRAFT
              </button>
            </div>

            <p className="text-sm text-neutral-600 text-center">
              By submitting this form, you agree to our <a href="#" className="text-amber-500 hover:underline">Contributor Terms</a> and{' '}
              <a href="#" className="text-amber-500 hover:underline">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Not a Member Yet?</h2>
          <p className="text-neutral-300 mb-8">
            Create a free TUMN account to submit articles, save drafts, track your submissions, 
            and connect with our community of contributors.
          </p>
          <a
            href="/register"
            className="inline-block bg-amber-500 text-black px-8 py-4 font-bold hover:bg-amber-400 transition-colors"
          >
            CREATE FREE ACCOUNT
          </a>
        </div>
      </section>
    </div>
  );
};

export default SubmitArticle;
