'use client'
import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import WorkFLowSideBar from "./WorkFLowSideBar";
import { BackgroundVariant } from "@xyflow/react";

type node = {
    type: string;
    label: string;
  };
  type canvasProps = {
    nodeTypes: node[];
    initialNodes:Node[];
    setDataType: (dataType:string)=>void;
  };

export default function Canvas({nodeTypes,initialNodes,setDataType}:canvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  let id = 0;
  const getId = () => `node_${id++}`;

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("label");
      const nodeType = nodeTypes.find((node) => node.type === type);

      if (!nodeType) {
        return;
    }; 

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: getId(),
        type: nodeType.type,
        position,
        data: { label: label }, 
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
const onSubmit=()=>{
console.log(edges)
}
  return (
    <div className="flex h-screen">
      <WorkFLowSideBar nodeTypes={nodeTypes} setDataType={setDataType} setNodes={setNodes}/>
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
            <button onClick={onSubmit} className="absolute right-14 bottom-14 bg-black rounded-md text-white px-3 py-2 font-semibold hover:bg-slate-300 z-10 hover:text-black">
                Submit
            </button>
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}
