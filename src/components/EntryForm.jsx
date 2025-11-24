import React, { useState } from 'react';
import { hoursBetween, applyAutoBreak } from '../lib/timecalc';

export default function EntryForm({ onAdd, onUpdate, editEntry }) {
  const [date, setDate] = useState(editEntry?.date || new Date().toISOString().slice(0, 10));
  const [type, setType] = useState(editEntry?.type || 'work');
  const [start, setStart] = useState(editEntry?.start || '');
  const [end, setEnd] = useState(editEntry?.end || '');
  const [hours, setHours] = useState(editEntry?.worked ? String(editEntry.worked) : '');

  useEffect(() => {
    if (editEntry) {
      setDate(editEntry.date);
      setType(editEntry.type);
      setStart(editEntry.start || '');
      setEnd(editEntry.end || '');
      setHours(editEntry.worked ? String(editEntry.worked) : '');
    }
  }, [editEntry]);

  function submit(e) {
    e.preventDefault();
    let worked = 0;
    if (type === 'work') {
      if (start && end) {
        let h = hoursBetween(start, end);
        h = applyAutoBreak(h, 6, 30);
        worked = h;
      } else if (hours) {
        worked = parseFloat(hours);
      } else {
        return alert('Bitte Zeit oder Stunden eingeben');
      }
    }

    const payload = { id: editEntry?.id || Date.now(), date, type, worked, start, end };
    if (editEntry && onUpdate) onUpdate(payload);
    else onAdd(payload);

    setStart('');
    setEnd('');
    setHours('');
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="work">Arbeit</option>
          <option value="vacation">Urlaub</option>
          <option value="sick">Krank</option>
        </select>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          disabled={type !== 'work'}
        />
        <input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          disabled={type !== 'work'}
        />
      </div>
      <input
        placeholder="Stunden manuell"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-primary" type="submit">
          {editEntry ? 'Update' : 'Eintrag speichern'}
        </button>
        {editEntry && (
          <button type="button" onClick={() => window.location.reload()}>
            Abbrechen
          </button>
        )}
      </div>
    </form>
  );
}
