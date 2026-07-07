import { useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useRequireRole } from '../../lib/useRequireRole';
import { useSEO } from '../../lib/useSEO';
import CalendarView, { CalendarSession } from '../../components/CalendarView';

const AdminSessions = () => {
  useSEO('Admin — Class Sessions');
  const { loading: authLoading } = useRequireRole('admin');
  const [sessions, setSessions] = useState<CalendarSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    program_level: 'foundations' as 'foundations' | 'correspondent' | 'all',
    title: '',
    zoom_url: '',
    date: '',
    time: '',
    duration_minutes: 60,
  });

  async function loadSessions() {
    setLoading(true);
    const { data } = await supabase.from('class_sessions').select('*').order('scheduled_at', { ascending: true });
    setSessions((data as any[])?.map((s) => ({ ...s })) || []);
    setLoading(false);
  }

  useEffect(() => { if (!authLoading) loadSessions(); }, [authLoading]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.date || !form.time) { setError('Date and time are required.'); return; }
    setSaving(true);
    const scheduledAt = new Date(`${form.date}T${form.time}`).toISOString();
    const { error: insertError } = await supabase.from('class_sessions').insert({
      program_level: form.program_level,
      title: form.title,
      zoom_url: form.zoom_url,
      scheduled_at: scheduledAt,
      duration_minutes: form.duration_minutes,
    });
    setSaving(false);
    if (insertError) { setError(insertError.message); return; }
    setForm({ ...form, title: '', zoom_url: '', date: '', time: '' });
    loadSessions();
  }

  async function handleDelete(id: number) {
    if (!confirm('Cancel this session?')) return;
    await supabase.from('class_sessions').delete().eq('id', id);
    loadSessions();
  }

  if (authLoading || loading) {
    return <div className="bg-white py-24 text-center text-neutral-500">Loading…</div>;
  }

  return (
    <div className="bg-white">
      <section className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Virtual Classroom Sessions</h1>
            <p className="text-neutral-300">Schedule Zoom sessions — students and parents see these in their portal and calendar.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/assignments" className="border border-neutral-500 px-4 py-2 text-sm hover:border-amber-500 hover:text-amber-500 transition-colors">Assignments</Link>
            <Link to="/admin/messages" className="border border-neutral-500 px-4 py-2 text-sm hover:border-amber-500 hover:text-amber-500 transition-colors">Messages</Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-4">Schedule a Session</h2>
            {error && <div className="bg-red-50 border-2 border-red-300 text-red-700 p-3 mb-4 text-sm">{error}</div>}
            <form onSubmit={handleCreate} className="space-y-4 bg-neutral-50 border-2 border-neutral-300 p-6">
              <div>
                <label className="block text-sm font-bold mb-2">Who's this for?</label>
                <select value={form.program_level} onChange={(e) => setForm({ ...form, program_level: e.target.value as any })}
                  className="w-full px-3 py-2 border border-neutral-300">
                  <option value="all">Everyone</option>
                  <option value="foundations">Foundations only</option>
                  <option value="correspondent">Correspondent Track only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Session Title</label>
                <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300" placeholder="e.g. Week 3 Live Class" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Zoom Link</label>
                <input type="url" required value={form.zoom_url} onChange={(e) => setForm({ ...form, zoom_url: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300" placeholder="https://zoom.us/j/..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Date</label>
                  <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Time</label>
                  <input type="time" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Duration (minutes)</label>
                <input type="number" min={15} step={15} value={form.duration_minutes}
                  onChange={(e) => setForm({ ...form, duration_minutes: parseInt(e.target.value) || 60 })}
                  className="w-full px-3 py-2 border border-neutral-300" />
              </div>
              <button type="submit" disabled={saving}
                className="w-full bg-amber-500 text-black py-3 font-bold hover:bg-amber-400 transition-colors disabled:opacity-50">
                {saving ? 'Scheduling…' : 'Schedule Session'}
              </button>
            </form>

            <h2 className="text-xl font-bold mt-8 mb-4">Upcoming Sessions</h2>
            <div className="space-y-3">
              {sessions.filter((s) => new Date(s.scheduled_at) >= new Date()).map((s: any) => (
                <div key={s.id} className="border border-neutral-300 p-4 flex justify-between items-start gap-3">
                  <div>
                    <span className="text-xs font-mono uppercase text-neutral-500">{s.program_level}</span>
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="text-sm text-neutral-500">{new Date(s.scheduled_at).toLocaleString()}</p>
                  </div>
                  <button onClick={() => handleDelete(s.id)} className="text-xs text-red-600 hover:underline shrink-0">Cancel</button>
                </div>
              ))}
              {sessions.filter((s) => new Date(s.scheduled_at) >= new Date()).length === 0 && (
                <p className="text-neutral-500 text-sm">No upcoming sessions scheduled.</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Calendar</h2>
            <CalendarView sessions={sessions} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminSessions;
