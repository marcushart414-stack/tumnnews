import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useRequireRole } from '../../lib/useRequireRole';
import { useSEO } from '../../lib/useSEO';

interface SubmissionRow {
  id: number;
  student_id: string;
  assignment_id: number;
  file_url: string | null;
  notes: string | null;
  status: string;
  submitted_at: string;
  profiles: { full_name: string | null; email: string | null } | null;
  assignments: { title: string; program_level: string; week_number: number } | null;
}

interface RubricCriterion {
  id: number;
  assignment_id: number;
  criterion_name: string;
  max_points: number;
}

interface RubricScore {
  id: number;
  submission_id: number;
  criterion_id: number;
  score: number;
}

const AdminSubmissions = () => {
  useSEO('Admin — Student Submissions');
  const { loading: authLoading } = useRequireRole('admin');
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [criteria, setCriteria] = useState<RubricCriterion[]>([]);
  const [scores, setScores] = useState<RubricScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [gradingId, setGradingId] = useState<number | null>(null);
  const [scoreDraft, setScoreDraft] = useState<Record<number, number>>({}); // criterion_id -> score

  async function loadAll() {
    setLoading(true);
    const [{ data: subs }, { data: crit }, { data: sc }] = await Promise.all([
      supabase.from('submissions').select('*, profiles(full_name, email), assignments(title, program_level, week_number)').order('submitted_at', { ascending: false }),
      supabase.from('rubric_criteria').select('*'),
      supabase.from('rubric_scores').select('*'),
    ]);
    setSubmissions((subs as unknown as SubmissionRow[]) || []);
    setCriteria((crit as RubricCriterion[]) || []);
    setScores((sc as RubricScore[]) || []);
    setLoading(false);
  }

  useEffect(() => { if (!authLoading) loadAll(); }, [authLoading]);

  async function handleDownload(sub: SubmissionRow) {
    if (!sub.file_url) return;
    setDownloadingId(sub.id);
    const { data, error } = await supabase.storage.from('submissions').createSignedUrl(sub.file_url, 60);
    setDownloadingId(null);
    if (error || !data) {
      alert('Could not generate a download link: ' + (error?.message || 'unknown error'));
      return;
    }
    window.open(data.signedUrl, '_blank');
  }

  async function markStatus(id: number, status: string) {
    await supabase.from('submissions').update({ status }).eq('id', id);
    setSubmissions((subs) => subs.map((s) => (s.id === id ? { ...s, status } : s)));
  }

  function openGrading(sub: SubmissionRow) {
    setGradingId(sub.id);
    const relevantCriteria = criteria.filter((c) => c.assignment_id === sub.assignment_id);
    const draft: Record<number, number> = {};
    relevantCriteria.forEach((c) => {
      const existing = scores.find((s) => s.submission_id === sub.id && s.criterion_id === c.id);
      draft[c.id] = existing?.score ?? 0;
    });
    setScoreDraft(draft);
  }

  async function saveGrades(sub: SubmissionRow) {
    const entries = Object.entries(scoreDraft);
    await Promise.all(
      entries.map(([criterionId, score]) =>
        supabase.from('rubric_scores').upsert(
          { submission_id: sub.id, criterion_id: parseInt(criterionId), score },
          { onConflict: 'submission_id,criterion_id' }
        )
      )
    );
    setGradingId(null);
    loadAll();
  }

  if (authLoading || loading) {
    return <div className="bg-white py-24 text-center text-neutral-500">Loading…</div>;
  }

  return (
    <div className="bg-white">
      <section className="bg-black text-white py-12">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Student Submissions</h1>
            <p className="text-neutral-300">{submissions.length} total submission{submissions.length === 1 ? '' : 's'}</p>
          </div>
          <Link to="/admin/assignments" className="border border-neutral-500 px-4 py-2 text-sm hover:border-amber-500 hover:text-amber-500 transition-colors">
            ← Manage Assignments
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          {submissions.length === 0 ? (
            <p className="text-neutral-500 text-center py-16">No student submissions yet.</p>
          ) : (
            <div className="space-y-4">
              {submissions.map((sub) => {
                const relevantCriteria = criteria.filter((c) => c.assignment_id === sub.assignment_id);
                const existingScores = scores.filter((s) => s.submission_id === sub.id);
                const totalScored = existingScores.reduce((sum, s) => sum + Number(s.score), 0);
                const totalPossible = relevantCriteria.reduce((sum, c) => sum + c.max_points, 0);
                const isGrading = gradingId === sub.id;

                return (
                  <div key={sub.id} className="border-2 border-neutral-300 p-5">
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div>
                        <span className="text-xs font-mono uppercase text-neutral-500">
                          {sub.assignments?.program_level === 'correspondent' ? 'Correspondent' : 'Foundations'} · Week {sub.assignments?.week_number}
                        </span>
                        <h3 className="font-bold">{sub.assignments?.title || 'Assignment'}</h3>
                        <p className="text-sm text-neutral-600">{sub.profiles?.full_name || sub.profiles?.email} · submitted {new Date(sub.submitted_at).toLocaleDateString()}</p>
                        {sub.notes && <p className="text-sm text-neutral-500 mt-1 italic">"{sub.notes}"</p>}
                        {relevantCriteria.length > 0 && (
                          <p className="text-sm font-bold mt-1 text-amber-600">
                            {existingScores.length > 0 ? `${totalScored} / ${totalPossible} pts graded` : `Not graded yet (${totalPossible} pts possible)`}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <select value={sub.status} onChange={(e) => markStatus(sub.id, e.target.value)} className="border border-neutral-300 px-2 py-1 text-sm">
                          <option value="submitted">Submitted</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="approved">Approved</option>
                        </select>
                        <button
                          onClick={() => handleDownload(sub)}
                          disabled={!sub.file_url || downloadingId === sub.id}
                          className="bg-amber-500 text-black px-4 py-2 text-sm font-bold hover:bg-amber-400 transition-colors disabled:opacity-40"
                        >
                          {downloadingId === sub.id ? 'Loading…' : sub.file_url ? 'Download' : 'No file'}
                        </button>
                        {relevantCriteria.length > 0 && (
                          <button onClick={() => (isGrading ? setGradingId(null) : openGrading(sub))}
                            className="border-2 border-neutral-300 px-4 py-2 text-sm font-bold hover:border-black transition-colors">
                            {isGrading ? 'Cancel' : 'Grade'}
                          </button>
                        )}
                      </div>
                    </div>

                    {isGrading && (
                      <div className="mt-4 pt-4 border-t border-neutral-200 space-y-3">
                        {relevantCriteria.map((c) => (
                          <div key={c.id} className="flex items-center justify-between gap-4">
                            <label className="text-sm">{c.criterion_name} <span className="text-neutral-400">(max {c.max_points})</span></label>
                            <input
                              type="number"
                              min={0}
                              max={c.max_points}
                              value={scoreDraft[c.id] ?? 0}
                              onChange={(e) => setScoreDraft({ ...scoreDraft, [c.id]: Math.min(c.max_points, Math.max(0, parseInt(e.target.value) || 0)) })}
                              className="w-20 px-2 py-1 border border-neutral-300 text-sm"
                            />
                          </div>
                        ))}
                        <button onClick={() => saveGrades(sub)} className="bg-amber-500 text-black px-4 py-2 text-sm font-bold hover:bg-amber-400 transition-colors">
                          Save Grades
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminSubmissions;
