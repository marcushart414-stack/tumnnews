// src/pages/portal/PortalParent.tsx

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { signOut } from '../../lib/auth';
import { useRequireRole } from '../../lib/useRequireRole';

interface StudentSummary { id: string; full_name: string | null; email: string | null; program_level: string | null; subCount: number; certCount: number; }
interface Announcement { id: number; title: string; body: string; created_at: string; }

export default function PortalParent() {
  const { loading, user, profile } = useRequireRole('parent');
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id);
      const studentIds = (links || []).map((l) => l.student_id);

      if (studentIds.length > 0) {
        const [{ data: profiles }, { data: submissions }, { data: certificates }] = await Promise.all([
          supabase.from('profiles').select('*').in('id', studentIds),
          supabase.from('submissions').select('*').in('student_id', studentIds),
          supabase.from('certificates').select('*').in('student_id', studentIds),
        ]);
        setStudents((profiles || []).map((s) => ({
          id: s.id, full_name: s.full_name, email: s.email, program_level: s.program_level,
          subCount: (submissions || []).filter((x) => x.student_id === s.id).length,
          certCount: (certificates || []).filter((x) => x.student_id === s.id).length,
        })));
      }

      const { data: ann } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
      setAnnouncements(ann || []);
    })();
  }, [user]);

  if (loading || !profile) return <div className="min-h-screen bg-neutral-50" />;

  return (
    <div className="bg-neutral-50 text-neutral-900 min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex justify-between items-start flex-wrap gap-4 mb-10">
          <div>
            <div className="text-amber-600 text-xs font-mono uppercase tracking-widest mb-2">Parent Portal</div>
            <h1 className="text-3xl font-bold">Welcome back, {profile.full_name || profile.email}</h1>
          </div>
          <button onClick={() => signOut().then(() => (window.location.href = '/academy/portal/login'))}
            className="border border-neutral-300 hover:border-amber-500 hover:text-amber-600 px-5 py-2 rounded-full transition h-fit">
            Log Out
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Student Progress</h2>
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {students.length === 0 && (
            <p className="text-neutral-500">No students linked to your account yet. Contact your TUMN Academy site coordinator to connect your child's enrollment.</p>
          )}
          {students.map((s) => (
            <div key={s.id} className="bg-white border border-neutral-200 rounded-xl p-6">
              <span className="text-xs font-mono uppercase tracking-wide border border-amber-500 text-amber-600 rounded-full px-3 py-1">
                {s.program_level === 'correspondent' ? 'Correspondent Track' : 'Foundations'}
              </span>
              <h3 className="font-bold mt-3">{s.full_name || s.email}</h3>
              <p className="text-neutral-600 text-sm mt-1">{s.subCount} assignment{s.subCount === 1 ? '' : 's'} submitted · {s.certCount} certificate{s.certCount === 1 ? '' : 's'} earned</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-4">Announcements</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {announcements.map((a) => (
            <div key={a.id} className="bg-white border border-neutral-200 rounded-xl p-6">
              <span className="text-xs font-mono text-neutral-400">{new Date(a.created_at).toLocaleDateString()}</span>
              <h3 className="font-bold mt-1 mb-2">{a.title}</h3>
              <p className="text-neutral-600 text-sm">{a.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
