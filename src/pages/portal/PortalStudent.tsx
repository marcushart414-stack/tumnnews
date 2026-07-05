// src/pages/portal/PortalStudent.tsx

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { signOut } from '../../lib/auth';
import { useRequireRole } from '../../lib/useRequireRole';

interface Assignment { id: number; week_number: number; title: string; description: string; }
interface Submission { id: number; assignment_id: number; status: string; }
interface Certificate { id: number; program_level: string; issued_at: string; certificate_code: string; }

export default function PortalStudent() {
  const { loading, user, profile } = useRequireRole('student');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    if (!user || !profile) return;
    (async () => {
      const level = profile.program_level || 'foundations';
      const [{ data: a }, { data: s }, { data: c }] = await Promise.all([
        supabase.from('assignments').select('*').eq('program_level', level).order('week_number'),
        supabase.from('submissions').select('*').eq('student_id', user.id),
        supabase.from('certificates').select('*').eq('student_id', user.id),
      ]);
      setAssignments(a || []);
      setSubmissions(s || []);
      setCertificates(c || []);
    })();
  }, [user, profile]);

  if (loading || !profile) return <div className="min-h-screen bg-neutral-50" />;

  const subByAssignment: Record<number, Submission> = {};
  submissions.forEach((s) => { subByAssignment[s.assignment_id] = s; });

  return (
    <div className="bg-neutral-50 text-neutral-900 min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex justify-between items-start flex-wrap gap-4 mb-10">
          <div>
            <div className="text-amber-600 text-xs font-mono uppercase tracking-widest mb-2">Student Portal</div>
            <h1 className="text-3xl font-bold">Welcome back, {profile.full_name || profile.email}</h1>
            <span className="inline-block mt-2 text-xs font-mono uppercase tracking-widest border border-amber-500 text-amber-600 rounded-full px-3 py-1">
              {profile.program_level === 'correspondent' ? 'Correspondent Track' : 'Foundations'}
            </span>
          </div>
          <button onClick={() => signOut().then(() => (window.location.href = '/academy/portal/login'))}
            className="border border-neutral-300 hover:border-amber-500 hover:text-amber-600 px-5 py-2 rounded-full transition h-fit">
            Log Out
          </button>
        </div>

        <h2 className="text-xl font-bold mb-4">Your Assignments</h2>
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {assignments.length === 0 && <p className="text-neutral-500">No assignments posted yet — check back once your cohort starts.</p>}
          {assignments.map((a) => {
            const sub = subByAssignment[a.id];
            return (
              <div key={a.id} className="bg-white border border-neutral-200 rounded-xl p-6">
                <span className="text-xs font-mono text-neutral-400 uppercase">Week {a.week_number}</span>
                <h3 className="font-bold mt-1 mb-2">{a.title}</h3>
                <p className="text-neutral-600 text-sm mb-3">{a.description}</p>
                <span className={`text-xs font-mono uppercase tracking-wide rounded-full px-3 py-1 border ${sub ? 'border-amber-500 text-amber-600' : 'border-neutral-300 text-neutral-500'}`}>
                  {sub ? sub.status : 'Not submitted'}
                </span>
              </div>
            );
          })}
        </div>

        <h2 className="text-xl font-bold mb-4">Your Certificates</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {certificates.length === 0 && <p className="text-neutral-500">No certificates issued yet — complete your capstone to earn your first one.</p>}
          {certificates.map((c) => (
            <div key={c.id} className="bg-white border border-neutral-200 rounded-xl p-6">
              <span className="text-xs font-mono uppercase tracking-wide border border-amber-500 text-amber-600 rounded-full px-3 py-1">Certified</span>
              <h3 className="font-bold mt-3">TUMN Certified Youth Media Creator — {c.program_level === 'correspondent' ? 'Correspondent Track' : 'Foundations'}</h3>
              <p className="text-neutral-500 text-xs font-mono mt-1">Issued {new Date(c.issued_at).toLocaleDateString()} · Code {c.certificate_code}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
