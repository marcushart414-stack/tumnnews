import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="bg-neutral-50 min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white border-2 border-neutral-300 p-8">
          <h1 className="text-3xl font-bold mb-2">Join TUMN</h1>
          <p className="text-neutral-600 mb-8">
            Create your free account to submit articles, save content, and join our community
          </p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">First Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-black outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Last Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-black outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Email Address *</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-neutral-300 focus:border-black outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Password *</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-black outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Confirm Password *</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-black outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">I'm interested in: (Optional)</label>
              <div className="space-y-2">
                {['Contributing articles', 'Reading & saving content', 'Podcast updates', 'Newsletter subscription', 'Community engagement'].map((interest) => (
                  <label key={interest} className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-neutral-50 border border-neutral-300 p-4">
              <label className="flex items-start gap-3">
                <input type="checkbox" required className="mt-1" />
                <span className="text-sm">
                  I agree to the{' '}
                  <a href="#" className="text-amber-500 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-amber-500 hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-black py-4 font-bold hover:bg-amber-400 transition-colors"
            >
              CREATE FREE ACCOUNT
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-neutral-600">Already have an account? </span>
            <Link to="/login" className="text-amber-500 font-bold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
