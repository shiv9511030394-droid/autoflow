import { useState } from 'react'
import { Play, MessageSquare, Mail, Clock, Tag, GitBranch, Webhook, Phone, Save, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'

const nodeTypes = [
  { type: 'trigger', label: 'Trigger', icon: Play, color: '#10b981' },
  { type: 'condition', label: 'Condition', icon: GitBranch, color: '#f59e0b' },
  { type: 'delay', label: 'Delay', icon: Clock, color: '#3b82f6' },
  { type: 'dm', label: 'Send DM', icon: MessageSquare, color: '#8b5cf6' },
  { type: 'whatsapp', label: 'WhatsApp', icon: Phone, color: '#10b981' },
  { type: 'email', label: 'Send Email', icon: Mail, color: '#ef4444' },
  { type: 'tag', label: 'Add Tag', icon: Tag, color: '#ec4899' },
  { type: 'webhook', label: 'Webhook', icon: Webhook, color: '#f97316' },
]

const defaultFlow = [
  { id: 1, type: 'trigger', label: 'Comment Trigger', color: '#10b981' },
  { id: 2, type: 'dm', label: 'Send DM', color: '#8b5cf6' },
  { id: 3, type: 'delay', label: 'Wait 1 Hour', color: '#3b82f6' },
  { id: 4, type: 'email', label: 'Send Email', color: '#ef4444' },
]

export default function AutomationBuilder() {
  const [flowNodes, setFlowNodes] = useState(defaultFlow)
  const [selectedNode, setSelectedNode] = useState(null)
  const [showSettings, setShowSettings] = useState(false)

  const addNode = (type) => {
    const nodeType = nodeTypes.find(n => n.type === type)
    setFlowNodes(prev => [...prev, {
      id: Date.now(),
      type: nodeType.type,
      label: nodeType.label,
      color: nodeType.color,
    }])
  }

  const removeNode = (id) => {
    setFlowNodes(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* Node Palette */}
      <div className="w-64 space-y-4 flex-shrink-0">
        <Card>
          <h3 className="font-semibold mb-4">Add Nodes</h3>
          <div className="space-y-2">
            {nodeTypes.map((node) => (
              <button
                key={node.type}
                onClick={() => addNode(node.type)}
                className="w-full flex items-center gap-3 p-3 glass rounded-lg hover:bg-white/10 transition-colors"
              >
                <node.icon className="w-5 h-5" style={{ color: node.color }} />
                <span className="text-sm font-medium">{node.label}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4">Delay Presets</h3>
          <div className="space-y-2">
            {['Instant', '5 minutes', '1 hour', '1 day', 'Custom'].map((preset) => (
              <button
                key={preset}
                onClick={() => addNode('delay')}
                className="w-full p-2 glass rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                {preset}
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
      <Card className="flex-1 overflow-auto">
        <h3 className="font-semibold mb-6 text-gray-400 text-sm uppercase tracking-widest">Workflow Canvas</h3>
        <div className="flex flex-wrap items-center gap-2">
          {flowNodes.map((node, idx) => {
            const nodeType = nodeTypes.find(n => n.type === node.type)
            const Icon = nodeType?.icon || Play
            return (
              <div key={node.id} className="flex items-center gap-2">
                <div
                  className="relative group flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105"
                  style={{ borderColor: node.color, background: `${node.color}15`, minWidth: 120 }}
                  onClick={() => { setSelectedNode(node); setShowSettings(true) }}
                >
                  <Icon className="w-6 h-6" style={{ color: node.color }} />
                  <span className="text-sm font-medium text-center">{node.label}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeNode(node.id) }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs hidden group-hover:flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
                {idx < flowNodes.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </div>
            )
          })}

          {flowNodes.length === 0 && (
            <div className="flex-1 flex items-center justify-center h-64 text-gray-500">
              <p>Add nodes from the left panel to build your automation</p>
            </div>
          )}
        </div>
      </Card>

      {/* Node Settings Modal */}
      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)} title="Node Settings">
        {selectedNode && (
          <div className="space-y-4">
            <div>
              <label htmlFor="node-name" className="block text-sm font-medium mb-2">Node Name</label>
              <Input
                id="node-name"
                name="nodeName"
                value={selectedNode.label}
                onChange={(e) => {
                  setFlowNodes(nds => nds.map(n => n.id === selectedNode.id ? { ...n, label: e.target.value } : n))
                  setSelectedNode({ ...selectedNode, label: e.target.value })
                }}
              />
            </div>
            {selectedNode.type === 'delay' && (
              <div>
                <label htmlFor="delay-duration" className="block text-sm font-medium mb-2">Delay Duration</label>
                <Select id="delay-duration" name="delayDuration" options={[
                  { value: 'instant', label: 'Instant' },
                  { value: '5m', label: '5 minutes' },
                  { value: '1h', label: '1 hour' },
                  { value: '1d', label: '1 day' },
                  { value: 'custom', label: 'Custom' },
                ]} />
              </div>
            )}
            {(selectedNode.type === 'dm' || selectedNode.type === 'email' || selectedNode.type === 'whatsapp') && (
              <div>
                <label htmlFor="message-content" className="block text-sm font-medium mb-2">Message Content</label>
                <textarea
                  id="message-content"
                  name="messageContent"
                  className="w-full glass rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                  placeholder="Enter your message..."
                />
              </div>
            )}
            <Button className="w-full" onClick={() => setShowSettings(false)}>Save Changes</Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
