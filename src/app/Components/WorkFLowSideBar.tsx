"use client";

import { Node } from "reactflow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

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

  const handleDataTypeChange = (value: string) => {
    setDataType(value);
    setNodes([
      {
        id: "start",
        type: "input",
        data: { label: "start" },
        position: { x: 250, y: 5 },
      },
    ]);
  };
  return (
    <aside className="w-64 bg-white text-blue-900 hidden md:block sticky top-14 h-[calc(100vh-3.5rem)] p-4 border-r border-blue-200 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-blue-700">
        Select Data Type
      </h2>
      <Select onValueChange={handleDataTypeChange}>
        <SelectTrigger className="w-full mb-4 border-blue-300 focus:ring-blue-500">
          <SelectValue placeholder="Select data type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value="Image"
            className=" text-blue-700 hover:bg-blue-100"
          >
            Image
          </SelectItem>
          <SelectItem
            value="Audio"
            className=" text-blue-700 hover:bg-blue-100"
          >
            Audio
          </SelectItem>
          <SelectItem
            value="Video"
            className=" text-blue-700 hover:bg-blue-100"
          >
            Video
          </SelectItem>
        </SelectContent>
      </Select>
      <h2 className="mb-4 text-lg font-semibold text-blue-700">
        Available Tasks
      </h2>
      <div className="space-y-2">
        {taskTypes.map((task) => (
          <Card
            key={task.label}
            draggable
            onDragStart={(event) => onDragStart(event, task.type, task.label)}
            className="cursor-move bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <CardContent className="p-2 text-sm text-blue-700">
              {task.label}
            </CardContent>
          </Card>
        ))}
      </div>
    </aside>
  );
}
