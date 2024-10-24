import React from 'react';
import { Handle, Position } from 'reactflow'; // Import Handle and Position

type CustomNodeProps = {
  data: {
    label: string;
  };
};

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <div className="px-20 py-7 bg-white text-black rounded-lg shadow-2xl text-center border border-black border-dashed">
      {/* Add input handle */}
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ background: '#555' }} 
      />
      <strong>{data.label}</strong>
      {/* Add output handle */}
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ background: '#555' }} 
      />
    </div>
  );
};

export default CustomNode;
