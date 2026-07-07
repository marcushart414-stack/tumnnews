// src/pages/portal/PortalStudent.tsx

import { useEffect, useState, ChangeEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { signOut } from '../../lib/auth';
import { useRequireRole } from '../../lib/useRequireRole';
import { useSEO } from '../../lib/useSEO';
import CalendarView, { CalendarSession } from '../../components/CalendarView';
import MessageThread from '../../components/MessageThread';

const CAL_COM_URL = 'https://cal.com/marcushart/30min';

interface Assignment { id: number; week_number: number; title: string; description: string; }
interface Submission { id: number; assignment_id: number; status: string; file_url: string | null; }
interface Certificate { id: number; program_level: string; issued_at: string; certificate_code: string; }
interface RubricCriterion { id: number; assignment_id: number; criterion_name: string; max_points: number; }
interface RubricScore { id: number; submission_id: number; criterion_id: number; score: number; }

export default function PortalStudent() {
  useSEO('Student Portal');
  const { loading, user, profile } = useRequireRole('student');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [criteria, setCriteria] = useState<RubricCriterion[]>([]);
  const [scores, setScores] = useState<RubricScore[]>([]);
  const [sessions, setSessions] = useState<CalendarSession[]>([]);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [tab, setTab] = useState<'assignments' | 'classroom' | 'messages'>('assignments');

  async function loadData() {
    if (!user || !profile) return;
    const level = profile.program_level || 'foundations';
    const [{ data: a }, { data: s }, { data: c }, { data: crit }, { data: sc }, { data: sess }] = await Promise.all([
      supabase.from('assignments').select('*').eq('program_level', level).order('week_number'),
      supabase.from('submissions').select('*').eq('student_id', user.id),
      supabase.from('certificates').select('*').eq('student_id', user.id),
      supabase.from('rubric_criteria').select('*'),
      supabase.from('rubric_scores').select('*'),
      supabase.from('class_sessions').select('*').or(`program_level.eq.${level},program_level.eq.all`).order('scheduled_at'),
    ]);
    setAssignments(a || []);
    setSubmissions(s || []);
    setCertificates(c || []);
    setCriteria((crit as RubricCriterion[]) || []);
    setScores((sc as RubricScore[]) || []);
    setSessions((sess as any[]) || []);
  }

  useEffect(() => { loadData(); }, [user, profile]);

  if (loading || !profile || !user) return <div className="min-h-screen bg-neutral-50" />;

  const subByAssignment: Record<number, Submission> = {};
  submissions.forEach((s) => { subByAssignment[s.assignment_id] = s; });

  const upcomingSessions = sessions.filter((s) => new Date(s.scheduled_at) >= new Date(Date.now() - 60 * 60 * 1000));
  const nextSession = upcomingSessions[0];

  async function handleUpload(assignmentId: number, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 200 * 1024 * 1024) { setUploadError('File must be under 200MB.'); return; }
    setUploadError(null);
    setUploadingId(assignmentId);

    const path = `${user.id}/assignment-${assignmentId}-${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from('submissions').upload(path, file);
    if (uploadError) { setUploadingId(null); setUploadError(uploadError.message); return; }

    const existing = subByAssignment[assignmentId];
    if (existing) {
      await supabase.from('submissions').update({ file_url: path, status: 'submitted' }).eq('id', existing.id);
    } else {
      await supabase.from('submissions').insert({ student_id: user.id, assignment_id: assignmentId, file_url: path, status: 'submitted' });
    }
    setUploadingId(null);
    loadData();
  }

  return (
    <div className="bg-neutral-50 text-neutral-900 min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
          <div>
            <div className="text-amber-600 text-xs font-mono uppercase tracking-widest mb-2">Student Portal</div>
            <h1 className="text-3xl font-bold">Welcome back, {profile.full_name || profile.email}</h1>
            <span className="inline-block mt-2 text-xs font-mono uppercase tracking-widest border border-amber-500 text-amber-600 rounded-full px-3 py-1">
              {profile.program_level === 'correspondent' ? 'Correspondent Track' : 'Foundations'}
            </span>
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

        {nextSession && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-5 mb-8 flex justify-between items-center flex-wrap gap-3">
            <div>
              <p className="text-xs font-mono uppercase text-amber-700">Next Class</p>
              <p className="font-bold">{nextSession.title} — {new Date(nextSession.scheduled_at).toLocaleString()}</p>
            </div>
            <a href={nextSession.zoom_url} target="_blank" rel="noopener noreferrer"
               className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-5 py-2 rounded-full transition">
              Join Virtual Classroom
            </a>
          </div>
        )}

        <div className="flex gap-2 mb-8 border-b border-neutral-200">
          {(['assignments', 'classroom', 'messages'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wide border-b-2 transition ${tab === t ? 'border-amber-500 text-amber-600' : 'border-transparent text-neutral-500'}`}>
              {t === 'assignments' ? 'Assignments' : t === 'classroom' ? 'Classroom & Calendar' : 'Messages'}
            </button>
          ))}
        </div>

        {uploadError && <div className="bg-red-50 border-2 border-red-300 text-red-700 p-4 mb-6">{uploadError}</div>}

        {tab === 'assignments' && (
          <>
            <h2 className="text-xl font-bold mb-4">Your Assignments</h2>
            <div className="grid md:grid-cols-3 gap-5 mb-14">
              {assignments.length === 0 && <p className="text-neutral-500">No assignments posted yet — check back once your cohort starts.</p>}
              {assignments.map((a) => {
                const sub = subByAssignment[a.id];
                const relevantCriteria = criteria.filter((c) => c.assignment_id === a.id);
                const mySc = sub ? scores.filter((s) => s.submission_id === sub.id) : [];
                const totalPossible = relevantCriteria.reduce((sum, c) => sum + c.max_points, 0);
                const totalScored = mySc.reduce((sum, s) => sum + Number(s.score), 0);

                return (
                  <div key={a.id} className="bg-white border border-neutral-200 rounded-xl p-6">
                    <span className="text-xs font-mono text-neutral-400 uppercase">Week {a.week_number}</span>
                    <h3 className="font-bold mt-1 mb-2">{a.title}</h3>
                    <p className="text-neutral-600 text-sm mb-3">{a.description}</p>
                    <span className={`text-xs font-mono uppercase tracking-wide rounded-full px-3 py-1 border ${sub ? 'border-amber-500 text-amber-600' : 'border-neutral-300 text-neutral-500'}`}>
                      {sub ? sub.status : 'Not submitted'}
                    </span>
                    {mySc.length > 0 && (
                      <p className="text-sm font-bold text-amber-600 mt-2">Graded: {totalScored} / {totalPossible} pts</p>
                    )}
                    <div className="mt-3">
                      <label className="block text-xs text-neutral-500 mb-1">{sub ? 'Replace your uploaded file' : 'Upload your work'}</label>
                      <input type="file" onChange={(e) => handleUpload(a.id, e)} disabled={uploadingId === a.id} className="text-xs block w-full" />
                      {uploadingId === a.id && <p className="text-xs text-amber-600 mt-1">Uploading…</p>}
                    </div>
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
          </>
        )}

        {tab === 'classroom' && (
          <div className="bg-white border border-neutral-200 rounded-xl p-6">
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
