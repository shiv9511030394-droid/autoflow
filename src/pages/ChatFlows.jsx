import { useState } from 'react'
import { MessageSquare, Plus, Edit, Trash2, Copy, ToggleLeft, ToggleRight, ArrowLeft, Bot, User, Tag } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'

const initialFlows = [
  { id: 1, name: 'Welcome Flow', messages: 12, status: 'active', conversions: 85 },
  { id: 2, name: 'Lead Qualification', messages: 8, status: 'active', conversions: 72 },
  { id: 3, name: 'Product Demo', messages: 15, status: 'draft', conversions: 0 },
  { id: 4, name: 'Support Bot', messages: 20, status: 'active', conversions: 68 },
]

const initialMessages = [
  { id: 1, type: 'bot', content: 'Hi! Welcome to our service. How can I help you today?', buttons: ['Get Started', 'Learn More'] },
  { id: 2, type: 'user', content: 'Get Started', tag: 'interested' },
  { id: 3, type: 'bot', content: 'Great! Let\'s get you set up. What\'s your name?', quickReplies: ['John', 'Jane'] },
]

export default function ChatFlows() {
  const [flows, setFlows] = useState(initialFlows)
  const [selectedFlow, setSelectedFlow] = useState(null)
  const [messages, setMessages] = useState(initialMessages)
  const [showModal, setShowModal] = useState(false)
  const [editFlow, setEditFlow] = useState(null)
  const [newFlowName, setNewFlowName] = useState('')
  const [toast, setToast] = useState('')

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2000) }

  const createFlow = () => {
    if (!newFlowName.trim()) return
    if (editFlow) {
      setFlows(flows.map(f => f.id === editFlow.id ? { ...f, name: newFlowName } : f))
      showToast('✓ Flow updated!')
    } else {
      setFlows([...flows, { id: Date.now(), name: newFlowName, messages: 0, status: 'draft', conversions: 0 }])
      showToast('✓ New flow created!')
    }
    setNewFlowName('')
    setEditFlow(null)
    setShowModal(false)
  }

  const handleEdit = (flow) => {
    setSelectedFlow(flow)
    // Load messages for the flow (mock)
  }

  const handleCopy = (flow) => {
    setFlows([...flows, { ...flow, id: Date.now(), name: `${flow.name} (Copy)`, status: 'draft' }])
    showToast('✓ Flow copied!')
  }

  const handleDelete = (id) => {
    setFlows(flows.filter(f => f.id !== id))
    showToast('✓ Flow deleted!')
  }

  const toggleStatus = (id) => {
    setFlows(flows.map(f => f.id === id ? { ...f, status: f.status === 'active' ? 'draft' : 'active' } : f))
  }

  const addMessage = (type) => {
    const newMsg = { id: Date.now(), type, content: type === 'bot' ? 'New bot message' : 'New user response', buttons: type === 'bot' ? [] : undefined, quickReplies: type === 'bot' ? [] : undefined }
    setMessages([...messages, newMsg])
  }

  if (selectedFlow) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setSelectedFlow(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Flows
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedFlow.name}</h1>
            <p className="text-gray-400 text-sm">Tree-based conversation builder</p>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Chat Builder */}
          <div className="flex-1 space-y-4">
            {messages.map((msg, idx) => (
              <div key={msg.id} className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-md p-4 rounded-2xl ${msg.type === 'bot' ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-purple-600/20 border border-purple-500/30'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {msg.type === 'bot' ? <Bot className="w-4 h-4 text-blue-400" /> : <User className="w-4 h-4 text-purple-400" />}
                    <span className="text-xs text-gray-400">{msg.type === 'bot' ? 'Bot' : 'User'}</span>
                    {msg.tag && <Badge variant="purple" className="text-xs"><Tag className="w-3 h-3 mr-1" />{msg.tag}</Badge>}
                  </div>
                  <p className="text-sm mb-2">{msg.content}</p>
                  {msg.buttons && msg.buttons.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {msg.buttons.map((btn, i) => (
                        <button key={i} className="px-3 py-1 bg-white/10 rounded-lg text-xs hover:bg-white/20 transition-colors">
                          {btn}
                        </button>
                      ))}
                    </div>
                  )}
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.quickReplies.map((reply, i) => (
                        <button key={i} className="px-3 py-1 border border-white/20 rounded-lg text-xs hover:bg-white/10 transition-colors">
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Message Panel */}
          <Card className="w-80">
            <h3 className="font-semibold mb-4">Add Message</h3>
            <div className="space-y-3">
              <Button onClick={() => addMessage('bot')} className="w-full flex items-center justify-center gap-2">
                <Bot className="w-4 h-4" /> Add Bot Message
              </Button>
              <Button onClick={() => addMessage('user')} variant="secondary" className="w-full flex items-center justify-center gap-2">
                <User className="w-4 h-4" /> Add User Response
              </Button>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2">AI Features</h4>
              <div className="space-y-2">
                <Input placeholder="Gemini API Key" type="password" />
                <Button variant="outline" size="sm" className="w-full">Enable Smart Replies</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Chat Flows</h1>
          <p className="text-gray-400 text-sm">Build conversational experiences</p>
        </div>
        <Button onClick={() => { setEditFlow(null); setNewFlowName(''); setShowModal(true) }} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Chat Flow
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {flows.map(flow => (
          <Card key={flow.id} hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold">{flow.name}</h3>
                  <p className="text-xs text-gray-400">{flow.messages} messages</p>
                </div>
              </div>
              <Badge variant={flow.status === 'active' ? 'success' : 'default'}>
                {flow.status}
              </Badge>
            </div>

            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Conversion Rate</span>
                <span className="font-medium">{flow.conversions}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all"
                  style={{ width: `${flow.conversions}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(flow)}>
                <Edit className="w-3.5 h-3.5 mr-1.5" /> Build
              </Button>
              <Button variant="ghost" size="sm" aria-label="Copy flow" onClick={() => handleCopy(flow)}>
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" aria-label="Delete flow" onClick={() => handleDelete(flow.id)}
                className="hover:text-red-400 hover:bg-red-500/10">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditFlow(null) }}
        title={editFlow ? 'Edit Chat Flow' : 'Create New Chat Flow'}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Flow Name</label>
            <Input
              placeholder="e.g., Welcome Flow"
              value={newFlowName}
              onChange={e => setNewFlowName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createFlow()}
            />
          </div>
          {!editFlow && (
            <div>
              <p className="text-sm font-medium mb-2">Template</p>
              <div className="grid grid-cols-2 gap-2">
                {['Blank', 'Welcome', 'Lead Gen', 'Support'].map(t => (
                  <button key={t} onClick={() => setNewFlowName(t + ' Flow')}
                    className="p-3 glass rounded-lg hover:bg-white/10 transition-colors text-sm">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
          <Button onClick={createFlow} className="w-full">
            {editFlow ? 'Save Changes' : 'Create Flow'}
          </Button>
        </div>
      </Modal>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50 text-sm">
          {toast}
        </div>
      )}
    </div>
  )
}
