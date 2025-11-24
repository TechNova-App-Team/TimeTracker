import React, { useEffect, useState, useRef } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import {
  loadData,
  saveData,
  addEntry,
  updateEntry,
  deleteEntry,
  exportData,
  importData,
} from './lib/storage';
import Snackbar from './components/Snackbar';

export default function App() {
  const [data, setData] = useState(() => loadData());
  const [editing, setEditing] = useState(null);
  const [snack, setSnack] = useState({ open: false, msg: '', removed: null });
  const undoRef = useRef(null);

  useEffect(() => {
    // ensure persistent storage is in sync (in case another tab changed it)
    const onStorage = (e) => {
      if (e.key === 'tg_pro_data') setData(loadData());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function handleAdd(entry) {
    const next = addEntry(entry);
    setData(next);
  }

  function handleUpdate(entry) {
    const next = updateEntry(entry);
    setData(next);
    setEditing(null);
  }

  function handleDelete(id) {
    const { data: next, removed } = deleteEntry(id);
    setData(next);
    // show snackbar and allow undo for 8s
    if (undoRef.current) clearTimeout(undoRef.current.timeout);
    const timeout = setTimeout(() => {
      undoRef.current = null;
      setSnack({ open: false, msg: '', removed: null });
    }, 8000);
    undoRef.current = { removed, timeout };
    setSnack({ open: true, msg: `Eintrag gelöscht: ${removed.date}`, removed });
  }

  function handleUndo() {
    if (!undoRef.current) return;
    const obj = loadData();
    obj.entries = [undoRef.current.removed, ...obj.entries].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    saveData(obj);
    setData(obj);
    clearTimeout(undoRef.current.timeout);
    undoRef.current = null;
    setSnack({ open: false, msg: '', removed: null });
  }

  function handleExport() {
    const raw = exportData();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([raw], { type: 'application/json' }));
    a.download = 'time_pro_backup.json';
    a.click();
  }

  function handleImport(file) {
    const r = new FileReader();
    r.onload = (ev) => {
      try {
        const obj = importData(ev.target.result);
        setData(obj);
        alert('Import erfolgreich');
      } catch (e) {
        alert('Import Fehler');
      }
    };
    r.readAsText(file);
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          padding: 12,
          background: '#0b1220',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>TimeTracker</div>
        <div style={{ fontSize: 12 }}>
          <a href="/Rechner.html" style={{ color: '#9ae6b4' }}>
            Legacy App
          </a>
        </div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 16 }}>
        <section style={{ background: '#0b0b0f', padding: 16, borderRadius: 12 }}>
          <h3 style={{ color: '#fff' }}>Eintrag erfassen</h3>
          <EntryForm onAdd={handleAdd} onUpdate={handleUpdate} editEntry={editing} />
        </section>

        <section style={{ background: '#0b0b0f', padding: 16, borderRadius: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: '#fff' }}>Historie</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleExport}>Backup</button>
              <label
                style={{ cursor: 'pointer', padding: 6, border: '1px solid #333', borderRadius: 6 }}
              >
                Import
                <input
                  type="file"
                  accept="application/json"
                  style={{ display: 'none' }}
                  onChange={(e) => handleImport(e.target.files[0])}
                />
              </label>
            </div>
          </div>
          <EntryList entries={data.entries} onEdit={(e) => setEditing(e)} onDelete={handleDelete} />
          <Snackbar
            open={snack.open}
            message={snack.msg}
            actionLabel={'Undo'}
            onAction={handleUndo}
            onClose={() => setSnack({ open: false, msg: '', removed: null })}
          />
        </section>
      </main>
    </div>
  );
}
