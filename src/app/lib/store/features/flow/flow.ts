import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge, applyEdgeChanges, applyNodeChanges, addEdge, Connection } from "reactflow";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
}

const initialState: FlowState = {
  nodes: [
    {
      id: "start",
      type: "input",
      data: { label: "start" },
      position: { x: 250, y: 5 },
    },
  ],
  edges: [],
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<{ button_type?: string; nodeType?: string }>) => {
      const newNode: Node = {
        id: `${state.nodes.length + 1}`,
        data: { label: action.payload?.button_type || "New Node" },
        position: { x: 100, y: 200 },
        type: action.payload?.nodeType || "default",
      };
      state.nodes.push(newNode);
    }, 
     addingEdge: (state, action: PayloadAction<Edge | Connection>) => {
        state.edges = addEdge(action.payload, state.edges);
      },
      addingNode: (state, action: PayloadAction<Node>) => {
        state.nodes.push(action.payload);
      },
    onNodesChange: (state, action: PayloadAction<any>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onEdgesChange: (state, action: PayloadAction<any>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action: PayloadAction<Edge | Connection>) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    resetNodes: (state) => {
        state.nodes = initialState.nodes; 
      },
  },
});

export const { addNode, onNodesChange, onEdgesChange, onConnect ,addingEdge,addingNode,resetNodes} = flowSlice.actions;

// Selectors for accessing nodes and edges from the state
export const nodes = (state: { flow: FlowState }) => state.flow.nodes;
export const edges = (state: { flow: FlowState }) => state.flow.edges;

export default flowSlice.reducer;
