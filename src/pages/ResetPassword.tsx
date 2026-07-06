import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useSEO } from '../lib/useSEO';

const ResetPassword = () => {
  useSEO('Reset Password');
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Clicking the reset-password email link lands here with a recovery token
    // in the URL — supabase-js reads it automatically and fires this event
    // once a temporary recovery session is established.
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true);
      }
    });
    // Also handle the case where the session is already present by the time this runs.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setSaving(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setSuccess(true);
    setTimeout(() => navigate('/login'), 2500);
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Checking your reset link…</h1>
          <p className="text-neutral-400">
            If this doesn't update in a few seconds, the link may have expired — request a new one from the sign-in page.
          </p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Password updated ✓</h1>
          <p className="text-neutral-400">Redirecting you to sign in…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-1">Set a new password</h1>
        <p className="text-neutral-400 text-sm mb-6">Choose something you'll remember this time.</p>

        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 text-sm rounded-md px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wide text-neutral-400 mb-1">New Password</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-neutral-400 mb-1">Confirm Password</label>
            <input type="password" required minLength={6} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-black border border-neutral-700 rounded-md px-3 py-2 focus:outline-none focus:border-amber-500" />
          </div>
          <button type="submit" disabled={saving}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2.5 rounded-md transition disabled:opacity-50">
            {saving ? 'Saving…' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
