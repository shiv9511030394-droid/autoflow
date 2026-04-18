import { useState, useCallback } from 'react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Play, MessageSquare, Mail, Clock, Tag, GitBranch, Webhook, Phone, Save, Settings } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'

// Custom Node Components
const TriggerNode = ({ data }) => (
  <div className="px-4 py-2 shadow-md rounded-md bg-green-100 border-2 border-green-300">
    <div className="flex items-center gap-2">
      <Play className="w-4 h-4 text-green-600" />
      <div className="text-sm font-bold text-green-800">{data.label}</div>
    </div>
  </div>
)

const ActionNode = ({ data }) => (
  <div className="px-4 py-2 shadow-md rounded-md bg-purple-100 border-2 border-purple-300">
    <div className="flex items-center gap-2">
      <data.icon className="w-4 h-4 text-purple-600" />
      <div className="text-sm font-bold text-purple-800">{data.label}</div>
    </div>
  </div>
)

const LogicNode = ({ data }) => (
  <div className="px-4 py-2 shadow-md rounded-md bg-yellow-100 border-2 border-yellow-300">
    <div className="flex items-center gap-2">
      <data.icon className="w-4 h-4 text-yellow-600" />
      <div className="text-sm font-bold text-yellow-800">{data.label}</div>
    </div>
  </div>
)

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  logic: LogicNode,
}

const initialNodes = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 25 },
    data: { label: 'Video Comment', icon: Play },
  },
  {
    id: '2',
    type: 'logic',
    position: { x: 250, y: 125 },
    data: { label: 'Condition', icon: GitBranch },
  },
  {
    id: '3',
    type: 'action',
    position: { x: 250, y: 225 },
    data: { label: 'Send DM', icon: MessageSquare },
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
]

const nodeOptions = [
  { type: 'trigger', label: 'Video Comment', icon: Play, category: 'trigger' },
  { type: 'trigger', label: 'Direct Message', icon: MessageSquare, category: 'trigger' },
  { type: 'trigger', label: 'Form Submission', icon: Mail, category: 'trigger' },
  { type: 'logic', label: 'Condition', icon: GitBranch, category: 'logic' },
  { type: 'logic', label: 'Delay', icon: Clock, category: 'logic' },
  { type: 'action', label: 'Send DM', icon: MessageSquare, category: 'action' },
  { type: 'action', label: 'Send WhatsApp', icon: Phone, category: 'action' },
  { type: 'action', label: 'Send Email', icon: Mail, category: 'action' },
  { type: 'action', label: 'Add Tag', icon: Tag, category: 'action' },
  { type: 'action', label: 'Webhook', icon: Webhook, category: 'action' },
]

export default function AutomationBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState(null)
  const [showSettings, setShowSettings] = useState(false)

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const addNode = (nodeType, label, icon) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: nodeType,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label, icon },
    }
    setNodes((nds) => nds.concat(newNode))
  }

  const onNodeClick = (event, node) => {
    setSelectedNode(node)
    setShowSettings(true)
  }

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* Node Palette */}
      <div className="w-64 space-y-4 flex-shrink-0">
        <Card>
          <h3 className="font-semibold mb-4">Add Nodes</h3>
          <div className="space-y-2">
            {nodeOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => addNode(option.type, option.label, option.icon)}
                className="w-full flex items-center gap-3 p-3 glass rounded-lg hover:bg-white/10 transition-colors"
              >
                <option.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </Card>

        <Button className="w-full flex items-center justify-center gap-2">
          <Save className="w-4 h-4" />
          Save Automation
        </Button>
      </div>

      {/* Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      {/* Node Settings Panel */}
      {showSettings && selectedNode && (
        <div className="w-80 flex-shrink-0">
          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Node Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Node Name</label>
                <Input
                  value={selectedNode.data.label}
                  onChange={(e) => {
                    setNodes((nds) =>
                      nds.map((node) =>
                        node.id === selectedNode.id
                          ? { ...node, data: { ...node.data, label: e.target.value } }
                          : node
                      )
                    )
                    setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, label: e.target.value } })
                  }}
                />
              </div>
              {selectedNode.type === 'logic' && selectedNode.data.label.includes('Delay') && (
                <div>
                  <label className="block text-sm font-medium mb-2">Delay Duration</label>
                  <Select options={[
                    { value: 'instant', label: 'Instant' },
                    { value: '5m', label: '5 minutes' },
                    { value: '1h', label: '1 hour' },
                    { value: '1d', label: '1 day' },
                    { value: 'custom', label: 'Custom' },
                  ]} />
                </div>
              )}
              {selectedNode.type === 'action' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Message Content</label>
                  <textarea
                    className="w-full glass rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                    placeholder="Enter your message..."
                  />
                </div>
              )}
              <Button className="w-full" onClick={() => setShowSettings(false)}>Save Changes</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
