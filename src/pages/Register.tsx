// src/pages/Register.tsx
//
// Replaces the old netlify/functions/register.js flow entirely.

import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../lib/auth';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signUpError } = await signUp({
      email,
      password,
      fullName: `${firstName} ${lastName}`.trim(),
      role: 'member', // adult contributor pipeline default — distinct from Academy roles
    });

    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Check your email</h1>
          <p className="text-neutral-400">We sent a confirmation link to {email}. Confirm it, then sign in.</p>
          <Link to="/login" className="inline-block mt-6 text-amber-500 hover:underline">Back to Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-1">Create Your Account</h1>
        <p className="text-neutral-400 text-sm mb-6">Join TUMN as a member or contributor.</p>

        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 text-sm rounded-md px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-neutral-400 mb-1">First Name</label>
              <input
                type="text" required value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-black border border-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-neutral-400 mb-1">Last Name</label>
              <input
                type="text" required value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-black border border-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-neutral-400 mb-1">Email</label>
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-neutral-400 mb-1">Password</label>
            <input
              type="password" required minLength={6} value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2.5 rounded-md transition disabled:opacity-50"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-neutral-400 mt-6 text-center">
          Already have an account? <Link to="/login" className="text-amber-500 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
