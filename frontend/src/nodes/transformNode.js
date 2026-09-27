import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformLogic, setTransformLogic] = useState(data?.transformLogic || 'x * 2');

  const handleChange = (e) => {
    setTransformLogic(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Transform"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` }
      ]}
    >
      <label>
        Logic:
        <input 
          type="text" 
          value={transformLogic} 
          onChange={handleChange} 
        />
      </label>
    </BaseNode>
  );
};
