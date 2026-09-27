import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [filterCondition, setFilterCondition] = useState(data?.filterCondition || 'x > 0');

  const handleChange = (e) => {
    setFilterCondition(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Filter"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '30%' } },
        { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '70%' } }
      ]}
    >
      <label>
        Condition:
        <input 
          type="text" 
          value={filterCondition} 
          onChange={handleChange} 
        />
      </label>
    </BaseNode>
  );
};
