import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="bg-neutral-50 min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white border-2 border-neutral-300 p-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-neutral-600 mb-8">Sign in to your TUMN account</p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-neutral-300 focus:border-black outline-none"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-neutral-300 focus:border-black outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-amber-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 font-bold hover:bg-neutral-800 transition-colors"
            >
              SIGN IN
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-neutral-600">Don't have an account? </span>
            <Link to="/register" className="text-amber-500 font-bold hover:underline">
              Create one free
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-neutral-600">
          By signing in, you agree to our{' '}
          <a href="#" className="text-amber-500 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-amber-500 hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
