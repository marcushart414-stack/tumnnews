import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useRequireRole } from '../../lib/useRequireRole';
import { useSEO } from '../../lib/useSEO';
import MessageThread from '../../components/MessageThread';

interface ConversationRow {
  id: number;
  participant_id: string;
  profiles: { full_name: string | null; email: string | null; role: string } | null;
}

const AdminMessages = () => {
  useSEO('Admin — Messages');
  const { loading: authLoading, user } = useRequireRole('admin');
  const [conversations, setConversations] = useState<ConversationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ConversationRow | null>(null);

  useEffect(() => {
    if (authLoading) return;
    (async () => {
      const { data } = await supabase
        .from('conversations')
        .select('id, participant_id, profiles(full_name, email, role)')
        .order('id', { ascending: false });
      setConversations((data as unknown as ConversationRow[]) || []);
      setLoading(false);
    })();
  }, [authLoading]);

  if (authLoading || loading || !user) {
    return <div className="bg-white py-24 text-center text-neutral-500">Loading…</div>;
  }

  return (
    <div className="bg-white">
      <section className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-bold">Messages</h1>
          <Link to="/admin/sessions" className="border border-neutral-500 px-4 py-2 text-sm hover:border-amber-500 hover:text-amber-500 transition-colors">
            ← Class Sessions
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-2">
            {conversations.length === 0 && <p className="text-neutral-500 text-sm">No conversations yet.</p>}
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full text-left border p-4 rounded-lg transition ${selected?.id === c.id ? 'border-amber-500 bg-amber-50' : 'border-neutral-200 hover:border-neutral-400'}`}
              >
                <p className="font-bold text-sm">{c.profiles?.full_name || c.profiles?.email}</p>
                <p className="text-xs text-neutral-500 uppercase">{c.profiles?.role}</p>
              </button>
            ))}
          </div>

          <div className="md:col-span-2">
            {selected ? (
              <MessageThread mode="admin" conversationId={selected.id} currentUserId={user.id} />
            ) : (
              <p className="text-neutral-500 text-center py-24">Select a conversation to view it.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminMessages;
