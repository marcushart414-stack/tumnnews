// src/pages/portal/PortalLogin.tsx

import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, signInAndGetProfile, ProfileRole } from '../../lib/auth';

const ROLE_ROUTES: Record<string, string> = {
  student: '/academy/portal/student',
  parent: '/academy/portal/parent',
  org_purchaser: '/academy/portal/partner',
};

export default function PortalLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<Extract<ProfileRole, 'student' | 'parent' | 'org_purchaser'>>('student');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [programLevel, setProgramLevel] = useState<'foundations' | 'correspondent'>('foundations');
  const [orgName, setOrgName] = useState('');

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setError(null); setLoading(true);
    const { profile, error: err } = await signInAndGetProfile(email, password);
    setLoading(false);
    if (err) { setError(err.message); return; }
    if (!profile) { setError('No profile found for this account.'); return; }
    navigate(ROLE_ROUTES[profile.role] || '/academy/portal/login');
  }

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    setError(null); setLoading(true);
    const { error: err } = await signUp({
      email, password, fullName, role,
      programLevel: role === 'student' ? programLevel : undefined,
      organizationName: role === 'org_purchaser' ? orgName : undefined,
    });
    setLoading(false);
    if (err) { setError(err.message); return; }
    setSignedUp(true);
  }

  return (
    <div className="bg-neutral-50 text-neutral-900 min-h-screen">
      <section className="max-w-md mx-auto px-6 py-16">
        <div className="text-amber-600 text-xs font-mono uppercase tracking-widest text-center mb-2">TUMN Academy Hub</div>
        <h1 className="text-3xl font-bold text-center mb-6">Sign in to your portal</h1>

        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          {(['student', 'parent', 'org_purchaser'] as const).map((r) => (
            <button key={r} onClick={() => setRole(r)}
              className={`text-xs font-mono uppercase tracking-wide px-4 py-2 rounded-full border ${role === r ? 'bg-amber-500 border-amber-500 text-black' : 'border-neutral-300 text-neutral-600'}`}>
              {r === 'org_purchaser' ? 'Partner' : r}
            </button>
          ))}
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-8">
          <div className="flex gap-2 mb-6">
            <button onClick={() => setMode('signin')} className={`flex-1 py-2 rounded-full border ${mode === 'signin' ? 'bg-amber-500 border-amber-500 text-black' : 'border-neutral-300'}`}>Sign In</button>
            <button onClick={() => setMode('signup')} className={`flex-1 py-2 rounded-full border ${mode === 'signup' ? 'bg-amber-500 border-amber-500 text-black' : 'border-neutral-300'}`}>Create Account</button>
          </div>

          {error && <div className="bg-red-50 border border-red-300 text-red-700 text-sm rounded-md px-4 py-3 mb-4">{error}</div>}

          {signedUp ? (
            <div className="border border-amber-400 bg-amber-50 rounded-lg p-6">
              <h3 className="font-bold mb-1">Check your email</h3>
              <p className="text-neutral-700 text-sm">We've sent a confirmation link to finish creating your account.</p>
            </div>
          ) : mode === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500" />
              <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500" />
              <button disabled={loading} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2.5 rounded-full transition disabled:opacity-50">
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <input type="text" required placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500" />
              {role === 'student' && (
                <select value={programLevel} onChange={(e) => setProgramLevel(e.target.value as any)}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500">
                  <option value="foundations">Foundations</option>
                  <option value="correspondent">Correspondent Track</option>
                </select>
              )}
              {role === 'org_purchaser' && (
                <input type="text" required placeholder="Organization Name" value={orgName} onChange={(e) => setOrgName(e.target.value)}
                  className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500" />
              )}
              <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500" />
              <input type="password" required minLength={6} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500" />
              <button disabled={loading} className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2.5 rounded-full transition disabled:opacity-50">
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
