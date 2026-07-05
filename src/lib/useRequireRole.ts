// src/lib/useRequireRole.ts
//
// Route guard for portal pages. Usage inside a page component:
//
//   const { loading, user, profile } = useRequireRole('student');
//   if (loading) return <p>Loading…</p>;
//   if (!profile) return null; // already redirecting
//
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';
import { getProfile, Profile, ProfileRole } from './auth';
import type { User } from '@supabase/supabase-js';

const ROLE_ROUTES: Record<string, string> = {
  student: '/academy/portal/student',
  parent: '/academy/portal/parent',
  org_purchaser: '/academy/portal/partner',
  member: '/dashboard',
  contributor: '/dashboard',
  editor: '/dashboard',
  admin: '/dashboard',
};

export function useRequireRole(requiredRole: ProfileRole) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    let active = true;

    async function check() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate('/academy/portal/login');
        return;
      }
      const p = await getProfile(data.user.id);
      if (!active) return;

      if (!p) {
        navigate('/academy/portal/login');
        return;
      }
      if (p.role !== requiredRole) {
        navigate(ROLE_ROUTES[p.role] || '/academy/portal/login');
        return;
      }
      setUser(data.user);
      setProfile(p);
      setLoading(false);
    }

    check();
    return () => { active = false; };
  }, [requiredRole, navigate]);

  return { loading, user, profile };
}
