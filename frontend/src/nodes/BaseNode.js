import React from 'react';
import { Handle } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({ id, label, style, handles = [], children }) => {
  const removeNode = useStore((state) => state.removeNode);
  const isDark = useStore((state) => state.isDark);

  return (
    <div 
      style={{
        width: 250, 
        minHeight: 100, 
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        color: isDark ? '#f9fafb' : '#111827',
        border: `1px solid ${isDark ? '#6366f1' : '#4f46e5'}`, 
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        ...style
      }}
    >
      <button 
        onClick={() => removeNode(id)}
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}
      >
        ✕
      </button>
      {handles.map((h, i) => (
        <Handle
          key={`${id}-handle-${i}`}
          type={h.type}
          position={h.position}
          id={h.id}
          style={h.style}
        />
      ))}
      <div 
        style={{
          backgroundColor: '#4f46e5',
          color: 'white',
          padding: '8px 12px',
          borderTopLeftRadius: '7px',
          borderTopRightRadius: '7px',
          fontWeight: 'bold',
          fontSize: '14px',
          textAlign: 'center'
        }}
      >
        {label}
      </div>
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
        {children}
      </div>
    </div>
  );
};
