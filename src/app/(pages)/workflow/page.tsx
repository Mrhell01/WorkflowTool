'use client'
import { Node } from "reactflow";
import Canvas from "../../components/Canvas";
import { useState, useEffect } from "react";
import { task } from "../../components/WorkFlowSideBar";


function WorkFLow() {
  const [dataType, setDataType] = useState("Image");
  const [availableTasks, setAvailableTasks] = useState<task[]>([]);

  useEffect(() => {
    let Tasks: task[] = [];

    if (dataType === "Audio") {
      Tasks = [
        { type: "default", label: "task 1" },
        { type: "default", label: "task 2" },
        { type: "default", label: "task 3" },
        { type: "output", label: "end" },
      ];
    } else if (dataType === "Video") {
      Tasks = [
        { type: "default", label: "task 1" },
        { type: "default", label: "task 2" },
        { type: "default", label: "task 3" },
        { type: "default", label: "task 4" },
        { type: "output", label: "end" },
      ];
    } else {
      Tasks = [
        { type: "default", label: "resolutions" },
        { type: "default", label: "filtering" },
        { type: "default", label: "masking" },
        { type: "output", label: "end" },
      ];
    }

    setAvailableTasks(Tasks);
  }, [dataType]); 

  const initialTasks: Node[] = [
    {
      id: "start",
      type: "input",
      data: { label: "start" },
      position: { x: 250, y: 5 },
    },
  ];

  return (
    <div>
       <Canvas taskTypes={availableTasks} initialNodes={initialTasks} setDataType={setDataType}/>
    </div>
  )
}

export default WorkFLow;