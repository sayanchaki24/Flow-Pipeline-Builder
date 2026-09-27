// textNode.js

import { useState, useRef, useEffect } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textAreaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // Reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set to scroll height
    }
  }, [currText]);

  // Extract valid JavaScript variable names wrapped in {{ }}
  const varRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = [...new Set(Array.from(currText.matchAll(varRegex), m => m[1]))];

  useEffect(() => {
    updateNodeInternals(id);
  }, [variables.length, id, updateNodeInternals]);

  const leftHandles = variables.map((variable, index) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-${variable}`,
    style: { top: `${((index + 1) * 100) / (variables.length + 1)}%` }
  }));

  return (
    <BaseNode
      id={id}
      label="Text"
      handles={[
        ...leftHandles,
        { type: 'source', position: Position.Right, id: `${id}-output` }
      ]}
      style={{ width: Math.max(250, currText.length * 5 + 50) }} // Simple rough dynamic width resizing
    >
      <label>Text:</label>
      <textarea 
        ref={textAreaRef}
        value={currText} 
        onChange={handleTextChange} 
        style={{ width: '100%', minHeight: '40px', resize: 'none', overflow: 'hidden' }}
      />
    </BaseNode>
  );
}
