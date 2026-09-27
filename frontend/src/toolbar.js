// toolbar.js

import { DraggableNode } from './draggableNode';
import { useStore } from './store';

export const PipelineToolbar = () => {
    const isDark = useStore((state) => state.isDark);
    const toggleTheme = useStore((state) => state.toggleTheme);

    return (
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: isDark ? '#111827' : '#f8f9fa', borderBottom: `1px solid ${isDark ? '#374151' : '#e5e7eb'}` }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='router' label='Router' />
                <DraggableNode type='fetch' label='Fetch' />
            </div>
            <button 
                onClick={toggleTheme}
                style={{
                    backgroundColor: isDark ? '#374151' : '#e5e7eb',
                    color: isDark ? '#f9fafb' : '#111827',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
        </div>
    );
};
