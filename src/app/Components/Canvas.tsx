"use client";
import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  MarkerType,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import WorkFLowSideBar from "./WorkFLowSideBar";
import { BackgroundVariant } from "@xyflow/react";
import CustomNode from "./customNode";

type task = {
  type: string;
  label: string;
};
type canvasProps = {
  taskTypes: task[];
  initialNodes: Node[];
  setDataType: (dataType: string) => void;
};

export default function Canvas({
  taskTypes,
  initialNodes,
  setDataType,
}: canvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  let id = 1;
  const getId = () => `task_${id++}`;

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const edgeWithArrow = {
        ...params,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: "black",
        },
      };
      setEdges((eds) => addEdge(edgeWithArrow, eds));
    },
    [setEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("label");
      const taskType = taskTypes.find((task) => task.type === type);

      if (!taskType) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newTask: Node = {
        id: label === "end" ? "end" : getId(),
        type: taskType.type,
        position,
        data: { label: label },
      };

      setNodes((nds) => nds.concat(newTask));
    },
    [reactFlowInstance, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onSubmit = () => {

    const tasks = nodes.map((node:Node, index) => ({
      taskId: node.id,
      label:node.data.label,
      taskType: node.type,
      sequence: index + 1,
    }));

    const workflowEdges = edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
    }));

    const workflowObject = {
      workflowId: Math.random(),
      tasks: tasks,
      edges: workflowEdges,
    };

    console.log(workflowObject);
  };

  return (
    <div className="flex h-screen">
      <WorkFLowSideBar
        taskTypes={taskTypes}
        setDataType={setDataType}
        setNodes={setNodes}
      />
      <ReactFlowProvider>
        <div
          className="w-full h-[calc(100vh-4rem)] overflow-hidden relative"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background color="black" variant={BackgroundVariant.Dots} />
            <button
              onClick={onSubmit}
              className="absolute right-14 bottom-14 bg-black rounded-md text-white px-3 py-2 font-semibold hover:bg-slate-300 z-10 hover:text-black"
            >
              Submit
            </button>
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}
