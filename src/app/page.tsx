"use client";
import { Node } from "reactflow";
import Canvas from "./Components/Canvas";
import { useState, useEffect } from "react";
import { node } from "./Components/WorkFLowSideBar";

export default function Home() {
  const [dataType, setDataType] = useState("Image");
  const [availableNodes, setAvailableNodes] = useState<node[]>([]);

  useEffect(() => {
    let nodeTypes: node[] = [];

    if (dataType === "Audio") {
      nodeTypes = [
        { type: "input", label: "task 1" },
        { type: "default", label: "task 2" },
        { type: "output", label: "task 3" },
        { type: "output", label: "end" },
      ];
    } else if (dataType === "Video") {
      nodeTypes = [
        { type: "input", label: "task 1" },
        { type: "default", label: "task 2" },
        { type: "output", label: "task 3" },
        { type: "default", label: "task 4" },
        { type: "output", label: "end" },
      ];
    } else {
      nodeTypes = [
        { type: "input", label: "task 1" },
        { type: "default", label: "task 2" },
        { type: "output", label: "end" },
      ];
    }

    setAvailableNodes(nodeTypes);
  }, [dataType]); 

  const initialNodes: Node[] = [
    {
      id: "1",
      type: "input",
      data: { label: "start" },
      position: { x: 250, y: 5 },
    },
  ];

  return (
    <div>
      <Canvas nodeTypes={availableNodes} initialNodes={initialNodes} setDataType={setDataType}/>
    </div>
  );
}
