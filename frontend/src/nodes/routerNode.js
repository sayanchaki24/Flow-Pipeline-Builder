import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const RouterNode = ({ id, data }) => {
  const [routes, setRoutes] = useState(data?.routes || '2');

  const routeCount = parseInt(routes, 10) || 2;
  const targetHandles = Array.from({ length: routeCount }).map((_, i) => ({
    type: 'source',
    position: Position.Right,
    id: `${id}-route-${i + 1}`,
    style: { top: `${((i + 1) * 100) / (routeCount + 1)}%` }
  }));

  return (
    <BaseNode
      id={id}
      label="Router"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        ...targetHandles
      ]}
    >
      <label>
        Routes:
        <input 
          type="number" 
          value={routes} 
          min="1"
          max="5"
          onChange={(e) => setRoutes(e.target.value)} 
        />
      </label>
    </BaseNode>
  );
};
