// src/pages/portal/PortalParent.tsx

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { signOut } from '../../lib/auth';
import { useRequireRole } from '../../lib/useRequireRole';
import { useSEO } from '../../lib/useSEO';
import CalendarView, { CalendarSession } from '../../components/CalendarView';
import MessageThread from '../../components/MessageThread';

const CAL_COM_URL = 'https://cal.com/marcushart/30min';

interface StudentSummary {
  id: string; full_name: string | null; email: string | null; program_level: string | null;
  subCount: number; certCount: number; totalScored: number; totalPossible: number;
}
interface Announcement { id: number; title: string; body: string; created_at: string; }

export default function PortalParent() {
  useSEO('Parent Portal');
  const { loading, user, profile } = useRequireRole('parent');
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [sessions, setSessions] = useState<CalendarSession[]>([]);
  const [tab, setTab] = useState<'overview' | 'classroom' | 'messages'>('overview');

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id);
      const studentIds = (links || []).map((l) => l.student_id);

      let levels: string[] = [];

      if (studentIds.length > 0) {
        const [{ data: profiles }, { data: submissions }, { data: certificates }, { data: allScores }, { data: allCriteria }] = await Promise.all([
          supabase.from('profiles').select('*').in('id', studentIds),
          supabase.from('submissions').select('*').in('student_id', studentIds),
          supabase.from('certificates').select('*').in('student_id', studentIds),
          supabase.from('rubric_scores').select('*, submissions!inner(student_id)'),
          supabase.from('rubric_criteria').select('*'),
        ]);

        levels = Array.from(new Set((profiles || []).map((p) => p.program_level).filter(Boolean)));

        setStudents((profiles || []).map((s) => {
          const mySubs = (submissions || []).filter((x) => x.student_id === s.id);
          const mySubIds = mySubs.map((x) => x.id);
          const myScores = ((allScores as any[]) || []).filter((sc) => mySubIds.includes(sc.submission_id));
          const criterionIds = myScores.map((sc) => sc.criterion_id);
          const totalPossible = ((allCriteria as any[]) || []).filter((c) => criterionIds.includes(c.id)).reduce((sum, c) => sum + c.max_points, 0);
          const totalScored = myScores.reduce((sum, sc) => sum + Number(sc.score), 0);
          return {
            id: s.id, full_name: s.full_name, email: s.email, program_level: s.program_level,
            subCount: mySubs.length,
            certCount: (certificates || []).filter((x) => x.student_id === s.id).length,
            totalScored, totalPossible,
          };
        }));
      }

      const { data: ann } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
      setAnnouncements(ann || []);

      const levelFilter = levels.length > 0 ? levels.map((l) => `program_level.eq.${l}`).join(',') + ',program_level.eq.all' : 'program_level.eq.all';
      const { data: sess } = await supabase.from('class_sessions').select('*').or(levelFilter).order('scheduled_at');
      setSessions((sess as any[]) || []);
    })();
  }, [user]);

  if (loading || !profile || !user) return <div className="min-h-screen bg-neutral-50" />;

  return (
    <div className="bg-neutral-50 text-neutral-900 min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
          <div>
            <div className="text-amber-600 text-xs font-mono uppercase tracking-widest mb-2">Parent Portal</div>
            <h1 className="text-3xl font-bold">Welcome back, {profile.full_name || profile.email}</h1>
          </div>
          <div className="flex gap-3">
            <a href={CAL_COM_URL} target="_blank" rel="noopener noreferrer"
               className="border border-neutral-300 hover:border-amber-500 hover:text-amber-600 px-5 py-2 rounded-full transition h-fit">
              Schedule a Meeting
            </a>
            <button onClick={() => signOut().then(() => (window.location.href = '/academy/portal/login'))}
              className="border border-neutral-300 hover:border-amber-500 hover:text-amber-600 px-5 py-2 rounded-full transition h-fit">
              Log Out
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b border-neutral-200">
          {(['overview', 'classroom', 'messages'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wide border-b-2 transition ${tab === t ? 'border-amber-500 text-amber-600' : 'border-transparent text-neutral-500'}`}>
              {t === 'overview' ? 'Overview' : t === 'classroom' ? 'Calendar' : 'Messages'}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <>
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
                  {s.totalPossible > 0 && (
                    <p className="text-sm font-bold text-amber-600 mt-1">Graded: {s.totalScored} / {s.totalPossible} pts</p>
                  )}
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
          </>
        )}

        {tab === 'classroom' && (
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
            <p className="text-sm text-neutral-500 mb-4">Live classes are joined by your student from their own portal — this calendar shows you what's scheduled.</p>
            <CalendarView sessions={sessions} />
          </div>
        )}

        {tab === 'messages' && (
          <div className="max-w-2xl">
            <MessageThread mode="participant" currentUserId={user.id} />
          </div>
        )}
      </section>
    </div>
  );
}
