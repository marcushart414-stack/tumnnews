import { useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useRequireRole } from '../../lib/useRequireRole';
import { useSEO } from '../../lib/useSEO';

interface Assignment {
  id: number;
  program_level: 'foundations' | 'correspondent';
  week_number: number;
  title: string;
  description: string | null;
  created_at: string;
}

interface RubricCriterion {
  id: number;
  assignment_id: number;
  criterion_name: string;
  max_points: number;
  description: string | null;
  sort_order: number;
}

const AdminAssignments = () => {
  useSEO('Admin — Assignments');
  const { loading: authLoading } = useRequireRole('admin');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [criteria, setCriteria] = useState<RubricCriterion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedRubricId, setExpandedRubricId] = useState<number | null>(null);
  const [criterionForm, setCriterionForm] = useState({ criterion_name: '', max_points: 25, description: '' });

  const [form, setForm] = useState({
    program_level: 'foundations' as 'foundations' | 'correspondent',
    week_number: 1,
    title: '',
    description: '',
  });

  async function loadAll() {
    setLoading(true);
    const [{ data: a }, { data: c }] = await Promise.all([
      supabase.from('assignments').select('*').order('program_level').order('week_number'),
      supabase.from('rubric_criteria').select('*').order('sort_order'),
    ]);
    setAssignments((a as Assignment[]) || []);
    setCriteria((c as RubricCriterion[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    if (!authLoading) loadAll();
  }, [authLoading]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const { error: insertError } = await supabase.from('assignments').insert({
      program_level: form.program_level,
      week_number: form.week_number,
      title: form.title,
      description: form.description || null,
    });
    setSaving(false);
    if (insertError) { setError(insertError.message); return; }
    setForm({ ...form, title: '', description: '' });
    loadAll();
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this assignment? Any linked student submissions will remain but lose their assignment reference.')) return;
    await supabase.from('assignments').delete().eq('id', id);
    loadAll();
  }

  async function handleAddCriterion(assignmentId: number) {
    if (!criterionForm.criterion_name.trim()) return;
    const existingCount = criteria.filter((c) => c.assignment_id === assignmentId).length;
    await supabase.from('rubric_criteria').insert({
      assignment_id: assignmentId,
      criterion_name: criterionForm.criterion_name,
      max_points: criterionForm.max_points,
      description: criterionForm.description || null,
      sort_order: existingCount,
    });
    setCriterionForm({ criterion_name: '', max_points: 25, description: '' });
    loadAll();
  }

  async function handleDeleteCriterion(id: number) {
    await supabase.from('rubric_criteria').delete().eq('id', id);
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
            <h1 className="text-3xl font-bold mb-2">Academy Assignments</h1>
            <p className="text-neutral-300">Create assignments and grading rubrics for Foundations and Correspondent Track students.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/sessions" className="border border-neutral-500 px-4 py-2 text-sm hover:border-amber-500 hover:text-amber-500 transition-colors">Class Sessions</Link>
            <Link to="/admin/submissions" className="border border-neutral-500 px-4 py-2 text-sm hover:border-amber-500 hover:text-amber-500 transition-colors">Submissions →</Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-4">New Assignment</h2>
            {error && <div className="bg-red-50 border-2 border-red-300 text-red-700 p-3 mb-4 text-sm">{error}</div>}
            <form onSubmit={handleCreate} className="space-y-4 bg-neutral-50 border-2 border-neutral-300 p-6">
              <div>
                <label className="block text-sm font-bold mb-2">Program Level</label>
                <select value={form.program_level} onChange={(e) => setForm({ ...form, program_level: e.target.value as any })}
                  className="w-full px-3 py-2 border border-neutral-300">
                  <option value="foundations">Foundations</option>
                  <option value="correspondent">Correspondent Track</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Week Number</label>
                <input type="number" min={1} max={12} required value={form.week_number}
                  onChange={(e) => setForm({ ...form, week_number: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-neutral-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Title</label>
                <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300" placeholder="e.g. Podcast Segment Rough Edit" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Description</label>
                <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300" />
              </div>
              <button type="submit" disabled={saving}
                className="w-full bg-amber-500 text-black py-3 font-bold hover:bg-amber-400 transition-colors disabled:opacity-50">
                {saving ? 'Creating…' : 'Create Assignment'}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Existing Assignments</h2>
            <div className="space-y-3">
              {assignments.map((a) => {
                const assignmentCriteria = criteria.filter((c) => c.assignment_id === a.id);
                const isExpanded = expandedRubricId === a.id;
                return (
                  <div key={a.id} className="border border-neutral-300 p-4">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <span className="text-xs font-mono uppercase text-neutral-500">
                          {a.program_level === 'correspondent' ? 'Correspondent' : 'Foundations'} · Week {a.week_number}
                        </span>
                        <h3 className="font-bold">{a.title}</h3>
                        <p className="text-xs text-neutral-500">
                          {assignmentCriteria.length} rubric criteri{assignmentCriteria.length === 1 ? 'on' : 'a'}
                          {assignmentCriteria.length > 0 && ` · ${assignmentCriteria.reduce((sum, c) => sum + c.max_points, 0)} pts total`}
                        </p>
                      </div>
                      <div className="flex gap-3 shrink-0">
                        <button onClick={() => setExpandedRubricId(isExpanded ? null : a.id)} className="text-xs text-amber-600 hover:underline">
                          {isExpanded ? 'Hide Rubric' : 'Manage Rubric'}
                        </button>
                        <button onClick={() => handleDelete(a.id)} className="text-xs text-red-600 hover:underline">Delete</button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-neutral-200 space-y-2">
                        {assignmentCriteria.map((c) => (
                          <div key={c.id} className="flex justify-between items-center bg-neutral-50 px-3 py-2 text-sm">
                            <span>{c.criterion_name} <span className="text-neutral-400">({c.max_points} pts)</span></span>
                            <button onClick={() => handleDeleteCriterion(c.id)} className="text-xs text-red-600 hover:underline">Remove</button>
                          </div>
                        ))}
                        <div className="flex gap-2 mt-3">
                          <input type="text" placeholder="Criterion (e.g. Technical Execution)" value={criterionForm.criterion_name}
                            onChange={(e) => setCriterionForm({ ...criterionForm, criterion_name: e.target.value })}
                            className="flex-1 px-2 py-1.5 border border-neutral-300 text-sm" />
                          <input type="number" min={1} value={criterionForm.max_points}
                            onChange={(e) => setCriterionForm({ ...criterionForm, max_points: parseInt(e.target.value) || 25 })}
                            className="w-20 px-2 py-1.5 border border-neutral-300 text-sm" />
                          <button onClick={() => handleAddCriterion(a.id)} className="bg-amber-500 text-black px-3 py-1.5 text-sm font-bold hover:bg-amber-400">
                            Add
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminAssignments;
