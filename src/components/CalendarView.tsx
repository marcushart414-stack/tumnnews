// src/components/CalendarView.tsx
//
// Hand-rolled month grid (no external calendar library — keeps the bundle
// small and avoids adding a dependency that can't be verified in this
// environment). Click a day with a session to see its details below.

import { useState } from 'react';

export interface CalendarSession {
  id: number;
  title: string;
  scheduled_at: string;
  zoom_url: string;
  duration_minutes: number;
}

interface CalendarViewProps {
  sessions: CalendarSession[];
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarView({ sessions }: CalendarViewProps) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const sessionsByDay: Record<string, CalendarSession[]> = {};
  sessions.forEach((s) => {
    const d = new Date(s.scheduled_at);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    (sessionsByDay[key] ||= []).push(s);
  });

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const todayKey = (() => {
    const t = new Date();
    return `${t.getFullYear()}-${t.getMonth()}-${t.getDate()}`;
  })();

  const selectedSessions = selectedDay ? sessionsByDay[selectedDay] || [] : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setCursor(new Date(year, month - 1, 1))} className="px-3 py-1 border border-neutral-300 rounded hover:border-amber-500">←</button>
        <h3 className="font-bold text-lg">{cursor.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h3>
        <button onClick={() => setCursor(new Date(year, month + 1, 1))} className="px-3 py-1 border border-neutral-300 rounded hover:border-amber-500">→</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono text-neutral-500 mb-1">
        {WEEKDAYS.map((d) => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={i} />;
          const key = `${year}-${month}-${day}`;
          const daySessions = sessionsByDay[key] || [];
          const isToday = key === todayKey;
          const isSelected = key === selectedDay;
          return (
            <button
              key={i}
              onClick={() => setSelectedDay(daySessions.length ? key : null)}
              className={`aspect-square rounded-lg border text-sm flex flex-col items-center justify-center relative
                ${isSelected ? 'border-amber-500 bg-amber-50' : isToday ? 'border-amber-300' : 'border-neutral-200'}
                ${daySessions.length ? 'font-bold cursor-pointer hover:border-amber-500' : 'text-neutral-400 cursor-default'}`}
            >
              {day}
              {daySessions.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute bottom-1.5" />}
            </button>
          );
        })}
      </div>

      {selectedSessions.length > 0 && (
        <div className="mt-6 space-y-3">
          {selectedSessions.map((s) => (
            <div key={s.id} className="border border-neutral-200 rounded-lg p-4 flex justify-between items-center flex-wrap gap-3">
              <div>
                <p className="font-bold">{s.title}</p>
                <p className="text-sm text-neutral-500">
                  {new Date(s.scheduled_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} · {s.duration_minutes} min
                </p>
              </div>
              <a href={s.zoom_url} target="_blank" rel="noopener noreferrer"
                 className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-full text-sm transition">
                Join
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
