"use client";
import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange,
  ReactFlowProvider,
} from "reactflow";
import WorkFlowSideBar from "./WorkFlowSideBar";
import { BackgroundVariant } from "@xyflow/react";
import { useAppDispatch, useAppSelector } from "../lib/store/hooks";
import { addingEdge, addingNode, onNodesChange, onEdgesChange } from "../lib/store/features/flow/flow";

type Task = {
  type: string;
  label: string;
};
type CanvasProps = {
  taskTypes: Task[];
  setDataType: (dataType: string) => void;
};

export default function Canvas({ taskTypes, setDataType }: CanvasProps) {
  const nodes = useAppSelector((state) => state.flow.nodes);
  const edges = useAppSelector((state) => state.flow.edges);
  const dispatch = useAppDispatch();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
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
      dispatch(addingEdge(edgeWithArrow));
    },
    [dispatch]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      dispatch(onNodesChange(changes));
    },
    [dispatch]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(onEdgesChange(changes));
    },
    [dispatch]
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

      dispatch(addingNode(newTask));
    },
    [reactFlowInstance, dispatch, taskTypes]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onSubmit = () => {
    const tasks = nodes.map((node: Node, index) => ({
      taskId: node.id,
      label: node.data.label,
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
      <WorkFlowSideBar taskTypes={taskTypes} setDataType={setDataType} />
      <div className="flex-grow px-4 py-2 justify-center items-center">
        <div className="w-full h-[740px] relative bg-gray-200 rounded-lg">
          <ReactFlowProvider>
            <div ref={reactFlowWrapper} className="w-full h-full">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
              >
                <Background
                  color="black"
                  variant={BackgroundVariant.Dots}
                  size={1}
                  gap={15}
                />
                <button
                  onClick={onSubmit}
                  className="absolute right-14 bottom-14 bg-blue-500 border-blue-400 border-2 rounded-md text-white px-3 py-2 font-semibold hover:bg-blue-200 z-10 hover:text-black"
                >
                  Submit
                </button>
                <Controls />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}
