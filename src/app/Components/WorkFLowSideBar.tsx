"use client";

import { Node } from "reactflow";

export type task = {
  type: string;
  label: string;
};
type workflowProps = {
  taskTypes: task[];
  setDataType: (dataType: string) => void;
  setNodes: (tasks: Node[]) => void;
};
export default function WorkFLowSideBar({
  taskTypes,
  setDataType,
  setNodes,
}: workflowProps) {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    taskType: string,
    taskLabel: string
  ) => {
    event.dataTransfer.setData("application/reactflow", taskType);
    event.dataTransfer.setData("label", taskLabel);
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
            <h2 className="mb-4 text-lg font-semibold">Available Tasks</h2>
            {taskTypes.map((task) => (
              <div
                key={task.type}
                className="mb-2 cursor-move rounded bg-white p-2 shadow"
                onDragStart={(event) =>
                  onDragStart(event, task.type, task.label)
                }
                draggable
              >
                {task.label}
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
