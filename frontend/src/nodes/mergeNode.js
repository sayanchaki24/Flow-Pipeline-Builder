import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      label="Merge"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input-1`, style: { top: '30%' } },
        { type: 'target', position: Position.Left, id: `${id}-input-2`, style: { top: '70%' } },
        { type: 'source', position: Position.Right, id: `${id}-output` }
      ]}
    >
      <div>
        <span>Merges two inputs into an array</span>
      </div>
    </BaseNode>
  );
};
