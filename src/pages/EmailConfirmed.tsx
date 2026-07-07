import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getProfile, Profile } from '../lib/auth';
import { useSEO } from '../lib/useSEO';

const ROLE_ROUTES: Record<string, string> = {
  student: '/academy/portal/student',
  parent: '/academy/portal/parent',
  org_purchaser: '/academy/portal/partner',
};

const EmailConfirmed = () => {
  useSEO('Email Confirmed');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    (async () => {
      // Clicking the confirmation link already establishes a session
      // (Supabase's implicit-login behavior on /verify), so by the time
      // someone lands here they're typically already signed in.
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const p = await getProfile(data.user.id);
        setProfile(p);
      }
      setLoading(false);
    })();
  }, []);

  const destination = profile ? (ROLE_ROUTES[profile.role] || '/dashboard') : '/login';

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="text-5xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-3">Email confirmed</h1>
        {loading ? (
          <p className="text-neutral-400">Just a moment…</p>
        ) : profile ? (
          <>
            <p className="text-neutral-300 mb-8">
              You're all set, {profile.full_name || profile.email}. Your account is ready to go.
            </p>
            <Link to={destination} className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-3 rounded-md transition">
              Continue →
            </Link>
          </>
        ) : (
          <>
            <p className="text-neutral-300 mb-8">
              Your email is confirmed. Sign in below to continue.
            </p>
            <Link to="/login" className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-3 rounded-md transition">
              Go to Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmed;
