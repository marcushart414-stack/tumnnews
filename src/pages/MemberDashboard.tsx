import { Link } from 'react-router-dom';

const MemberDashboard = () => {
  const userSubmissions = [
    { id: '1', title: 'My First Article Submission', status: 'Under Review', date: '2024-01-18' },
    { id: '2', title: 'Faith in the Workplace', status: 'Published', date: '2024-01-10' },
    { id: '3', title: 'Leadership Lessons', status: 'Needs Revision', date: '2024-01-05' },
  ];

  const savedArticles = [
    { id: '1', title: 'Faith-Driven Leadership in Modern Business', author: 'Marcus Thompson' },
    { id: '2', title: 'Trauma-Informed Approaches', author: 'Dr. Sarah Williams' },
  ];

  return (
    <div className="bg-white">
      <section className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-neutral-300">Welcome back, John Doe</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-neutral-50 border-2 border-neutral-300 p-6 text-center">
                <div className="text-3xl font-bold text-amber-500 mb-2">3</div>
                <div className="text-sm text-neutral-600">Submissions</div>
              </div>
              <div className="bg-neutral-50 border-2 border-neutral-300 p-6 text-center">
                <div className="text-3xl font-bold text-amber-500 mb-2">1</div>
                <div className="text-sm text-neutral-600">Published</div>
              </div>
              <div className="bg-neutral-50 border-2 border-neutral-300 p-6 text-center">
                <div className="text-3xl font-bold text-amber-500 mb-2">2</div>
                <div className="text-sm text-neutral-600">Saved</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">My Submissions</h2>
                <Link
                  to="/submit-article"
                  className="bg-amber-500 text-black px-4 py-2 text-sm font-bold hover:bg-amber-400 transition-colors"
                >
                  NEW SUBMISSION
                </Link>
              </div>
              <div className="space-y-4">
                {userSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-white border-2 border-neutral-300 p-6 hover:border-black transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{submission.title}</h3>
                      <span
                        className={`text-xs px-3 py-1 font-bold ${
                          submission.status === 'Published'
                            ? 'bg-green-100 text-green-800'
                            : submission.status === 'Under Review'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {submission.status}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-4">
                      Submitted on {new Date(submission.date).toLocaleDateString()}
                    </p>
                    <div className="flex gap-3">
                      <button className="text-sm text-amber-500 font-bold hover:underline">
                        View Details
                      </button>
                      {submission.status === 'Needs Revision' && (
                        <button className="text-sm text-amber-500 font-bold hover:underline">
                          Edit &amp; Resubmit
                        </button>
                      )}
                      {submission.status === 'Published' && (
                        <Link to={`/article/${submission.id}`} className="text-sm text-amber-500 font-bold hover:underline">
                          View Published
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Saved for Later</h2>
              <div className="space-y-4">
                {savedArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/article/${article.id}`}
                    className="block bg-white border-2 border-neutral-300 p-6 hover:border-black transition-colors"
                  >
                    <h3 className="font-bold mb-1">{article.title}</h3>
                    <p className="text-sm text-neutral-600">by {article.author}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-50 border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-4">Profile</h3>
              <div className="w-24 h-24 bg-neutral-300 rounded-full mb-4"></div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-neutral-600">Name:</span>
                  <div className="font-bold">John Doe</div>
                </div>
                <div>
                  <span className="text-neutral-600">Email:</span>
                  <div className="font-bold">john@example.com</div>
                </div>
                <div>
                  <span className="text-neutral-600">Member since:</span>
                  <div className="font-bold">January 2024</div>
                </div>
              </div>
              <button className="w-full mt-4 bg-neutral-900 text-white py-2 text-sm font-bold hover:bg-black transition-colors">
                EDIT PROFILE
              </button>
            </div>

            <div className="bg-neutral-50 border-2 border-neutral-300 p-6">
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link to="/submit-article" className="block hover:text-amber-500">
                  → Submit New Article
                </Link>
                <Link to="/newsroom" className="block hover:text-amber-500">
                  → Browse Newsroom
                </Link>
                <Link to="/blog" className="block hover:text-amber-500">
                  → Read Blog
                </Link>
                <a href="#" className="block hover:text-amber-500">
                  → Account Settings
                </a>
                <a href="#" className="block hover:text-amber-500">
                  → Newsletter Preferences
                </a>
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
