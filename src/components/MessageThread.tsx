// src/components/MessageThread.tsx
//
// One conversation thread with live updates via Supabase Realtime. Used
// two ways:
//   - Student/Parent portal: <MessageThread mode="participant" />
//     (auto-creates their own conversation on first use)
//   - Admin inbox: <MessageThread mode="admin" conversationId={id} />
//     (views/replies to a specific participant's conversation)

import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Message {
  id: number;
  conversation_id: number;
  sender_id: string;
  body: string;
  created_at: string;
}

interface MessageThreadProps {
  mode: 'participant' | 'admin';
  conversationId?: number; // required when mode="admin"
  currentUserId: string;
}

export default function MessageThread({ mode, conversationId: fixedConversationId, currentUserId }: MessageThreadProps) {
  const [conversationId, setConversationId] = useState<number | null>(fixedConversationId || null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Participant mode: find or create their own conversation.
  useEffect(() => {
    if (mode !== 'participant') return;
    (async () => {
      const { data: existing } = await supabase.from('conversations').select('id').eq('participant_id', currentUserId).maybeSingle();
      if (existing) {
        setConversationId(existing.id);
      } else {
        const { data: created } = await supabase.from('conversations').insert({ participant_id: currentUserId }).select('id').single();
        setConversationId(created?.id || null);
      }
    })();
  }, [mode, currentUserId]);

  // Load messages once we know the conversation, and subscribe to live updates.
  useEffect(() => {
    if (!conversationId) return;
    setLoading(true);

    (async () => {
      const { data } = await supabase.from('messages').select('*').eq('conversation_id', conversationId).order('created_at');
      setMessages(data || []);
      setLoading(false);
    })();

    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` },
        (payload) => setMessages((prev) => [...prev, payload.new as Message])
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  async function handleSend() {
    if (!body.trim() || !conversationId) return;
    setSending(true);
    const { error } = await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_id: currentUserId,
      body: body.trim(),
    });
    setSending(false);
    if (!error) setBody('');
  }

  if (!conversationId || loading) {
    return <p className="text-neutral-500 text-sm">Loading messages…</p>;
  }

  return (
    <div className="flex flex-col h-96 border border-neutral-200 rounded-xl bg-white overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-neutral-400 text-sm text-center mt-8">
            {mode === 'participant' ? 'Send a message to your TUMN Academy instructor.' : 'No messages yet.'}
          </p>
        )}
        {messages.map((m) => {
          const isMine = m.sender_id === currentUserId;
          return (
            <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${isMine ? 'bg-amber-500 text-black' : 'bg-neutral-100 text-neutral-900'}`}>
                <p>{m.body}</p>
                <p className={`text-[10px] mt-1 ${isMine ? 'text-black/60' : 'text-neutral-400'}`}>
                  {new Date(m.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-neutral-200 p-3 flex gap-2">
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          placeholder="Type a message…"
          className="flex-1 border border-neutral-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
        />
        <button
          onClick={handleSend}
          disabled={sending || !body.trim()}
          className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-5 py-2 rounded-full text-sm transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
