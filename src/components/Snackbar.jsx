import React, { useEffect } from 'react'

export default function Snackbar({ open, message, actionLabel, onAction, onClose, timeout = 8000 }) {
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => onClose && onClose(), timeout)
    return () => clearTimeout(t)
  }, [open, timeout, onClose])

  if (!open) return null

  return (
    <div style={{position:'fixed', left:16, bottom:16, background:'#111', color:'#fff', padding:'12px 16px', borderRadius:8, boxShadow:'0 6px 18px rgba(0,0,0,0.5)', display:'flex', gap:12, alignItems:'center'}}>
      <div style={{flex:1}}>{message}</div>
      {actionLabel && <button onClick={onAction} style={{background:'#222', color:'#9ae6b4', border:'none', padding:'8px 10px', borderRadius:6}}>{actionLabel}</button>}
      <button onClick={onClose} style={{background:'transparent', color:'#777', border:'none', marginLeft:8}}>✕</button>
    </div>
  )
}
