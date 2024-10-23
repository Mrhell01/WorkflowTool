"use client";

import { Node } from "reactflow";

export type node = {
  type: string;
  label: string;
};
type workflowProps = {
  nodeTypes: node[];
  setDataType: (dataType: string) => void;
  setNodes: (nodes: Node[]) => void;
};
export default function WorkFLowSideBar({
  nodeTypes,
  setDataType,
  setNodes,
}: workflowProps) {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    nodeLabel: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("label", nodeLabel);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDataTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDataType(event.target.value);
    setNodes([
      {
        id: "1",
        type: "input",
        data: { label: "start" },
        position: { x: 250, y: 5 },
      },
    ]);
  };
  return (
    <div className="flex h-full">
      {true && (
        <aside className="w-64 bg-[#D9D9D9] text-black hidden md:block sticky top-14 h-[calc(100vh-2rem)]">
          <div className="w-64 p-4">
            <h2 className="mb-4 text-lg font-semibold">SELECT DATA TYPE</h2>
            <select
              className="mb-2 cursor-move rounded bg-white p-2 shadow"
              onChange={handleDataTypeChange}
            >
              <option value="Image">IMAGE</option>
              <option value="Audio">AUDIO</option>
              <option value="Video">VIDEO</option>
            </select>
            <h2 className="mb-4 text-lg font-semibold">Available Nodes</h2>
            {nodeTypes.map((node) => (
              <div
                key={node.type}
                className="mb-2 cursor-move rounded bg-white p-2 shadow"
                onDragStart={(event) =>
                  onDragStart(event, node.type, node.label)
                }
                draggable
              >
                {node.label}
              </div>
            ))}
          </div>
        </aside>
      )}
      {/* <main className="flex-1 md:px-8 md:py-4 bg-gray-100 overflow-auto h-[calc(100vh-4rem)]">
        {children}
      </main> */}
    </div>
  );
}
