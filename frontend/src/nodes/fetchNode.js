import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FetchNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.github.com');

  return (
    <BaseNode
      id={id}
      label="Fetch Data"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-trigger` },
        { type: 'source', position: Position.Right, id: `${id}-data` },
        { type: 'source', position: Position.Right, id: `${id}-error`, style: { top: '80%' } }
      ]}
    >
      <label>
        URL:
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
        />
      </label>
    </BaseNode>
  );
};
