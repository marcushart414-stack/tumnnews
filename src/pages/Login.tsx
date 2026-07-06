// src/pages/Login.tsx
//
// Replaces the old netlify/functions/login.js flow entirely. No function,
// no custom users table, no bcrypt — Supabase Auth handles verification.

import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInAndGetProfile } from '../lib/auth';
import { supabase } from '../lib/supabase';

const ROLE_ROUTES: Record<string, string> = {
  student: '/academy/portal/student',
  parent: '/academy/portal/parent',
  org_purchaser: '/academy/portal/partner',
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'signin' | 'forgot'>('signin');
  const [resetSent, setResetSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { profile, error: authError } = await signInAndGetProfile(email, password);
    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }
    if (!profile) {
      setError('Signed in, but no profile was found. Contact support.');
      return;
    }
    // Academy roles go to their portal; everyone else (member/contributor/editor/admin) to the dashboard.
    navigate(ROLE_ROUTES[profile.role] || '/dashboard');
  }

  async function handleForgotPassword(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setResetSent(true);
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-1">{mode === 'signin' ? 'Sign In' : 'Reset Password'}</h1>
        <p className="text-neutral-400 text-sm mb-6">
          {mode === 'signin' ? 'Welcome back to TUMN.' : "We'll email you a link to set a new password."}
        </p>

        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 text-sm rounded-md px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {mode === 'forgot' ? (
          resetSent ? (
            <div className="bg-amber-900/20 border border-amber-700 text-amber-300 text-sm rounded-md px-4 py-3">
              Check your email for a reset link.
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wide text-neutral-400 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2.5 rounded-md transition disabled:opacity-50"
              >
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
              <button
                type="button"
                onClick={() => { setMode('signin'); setError(null); }}
                className="w-full text-sm text-neutral-400 hover:text-amber-500"
              >
                ← Back to sign in
              </button>
            </form>
          )
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-neutral-400 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-neutral-400 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2.5 rounded-md transition disabled:opacity-50"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={() => { setMode('forgot'); setError(null); }}
              className="w-full text-sm text-neutral-400 hover:text-amber-500 text-center"
            >
              Forgot password?
            </button>
          </form>
        )}

        <p className="text-sm text-neutral-400 mt-6 text-center">
          Don't have an account? <Link to="/register" className="text-amber-500 hover:underline">Create one</Link>
        </p>
        <p className="text-sm text-neutral-400 mt-2 text-center">
          <Link to="/academy/portal/login" className="text-amber-500 hover:underline">TUMN Academy student/parent/partner login →</Link>
        </p>
      </div>
    </div>
  );
}
