import React from 'react';

import React from 'react';

export default function EntryList({ entries, onEdit, onDelete }) {
  return (
    <div>
      {entries.length === 0 && <div>No entries</div>}
      {entries.map((e) => (
        <div
          key={e.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 8,
            borderBottom: '1px solid #222',
          }}
        >
          <div>
            <div style={{ fontWeight: 700 }}>{new Date(e.date).toLocaleDateString()}</div>
            <div style={{ color: '#888' }}>{e.type}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ fontWeight: 700 }}>{e.worked ? e.worked.toFixed(2) + 'h' : '-'}</div>
            <div>
              <button onClick={() => onEdit && onEdit(e)} style={{ marginRight: 6 }}>
                ✎
              </button>
              <button onClick={() => onDelete && onDelete(e.id)} style={{ color: '#ef4444' }}>
                ×
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
