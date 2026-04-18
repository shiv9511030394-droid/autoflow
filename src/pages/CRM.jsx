import { useState } from 'react'
import { Plus, Search, Phone, Mail, Tag, Star, MoreVertical, User } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'

const stages = ['New', 'Contacted', 'Interested', 'Closed']

const stageColors = {
  New: 'bg-blue-500/20 border-blue-500/30',
  Contacted: 'bg-yellow-500/20 border-yellow-500/30',
  Interested: 'bg-purple-500/20 border-purple-500/30',
  Closed: 'bg-green-500/20 border-green-500/30',
}

const initialLeads = {
  New: [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 234 567 8901', source: 'Instagram', tags: ['Hot Lead', 'VIP'], score: 92 },
    { id: 2, name: 'Mike Chen', email: 'mike@example.com', phone: '+1 234 567 8902', source: 'Facebook', tags: ['Warm'], score: 74 },
  ],
  Contacted: [
    { id: 3, name: 'Emma Davis', email: 'emma@example.com', phone: '+1 234 567 8903', source: 'WhatsApp', tags: ['Follow-up'], score: 68 },
    { id: 4, name: 'James Wilson', email: 'james@example.com', phone: '+1 234 567 8904', source: 'Email', tags: ['Cold'], score: 45 },
  ],
  Interested: [
    { id: 5, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210', source: 'Instagram', tags: ['Hot Lead'], score: 88 },
  ],
  Closed: [
    { id: 6, name: 'Rahul Gupta', email: 'rahul@example.com', phone: '+91 98765 43211', source: 'YouTube', tags: ['Customer'], score: 95 },
  ],
}

function ScoreBadge({ score }) {
  const color = score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'
  return <span className={`text-xs font-bold ${color}`}>★ {score}</span>
}

export default function CRM() {
  const [leads, setLeads] = useState(initialLeads)
  const [search, setSearch] = useState('')
  const [selectedLead, setSelectedLead] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', source: 'Instagram' })
  const [dragId, setDragId] = useState(null)
  const [dragFrom, setDragFrom] = useState(null)

  const handleDragStart = (id, stage) => { setDragId(id); setDragFrom(stage) }

  const handleDrop = (toStage) => {
    if (!dragId || dragFrom === toStage) return
    const lead = leads[dragFrom].find(l => l.id === dragId)
    if (!lead) return
    setLeads(prev => ({
      ...prev,
      [dragFrom]: prev[dragFrom].filter(l => l.id !== dragId),
      [toStage]: [...prev[toStage], lead],
    }))
    setDragId(null); setDragFrom(null)
  }

  const addLead = () => {
    if (!newLead.name) return
    const lead = { id: Date.now(), ...newLead, tags: ['New'], score: Math.floor(Math.random() * 40 + 50) }
    setLeads(prev => ({ ...prev, New: [lead, ...prev.New] }))
    setNewLead({ name: '', email: '', phone: '', source: 'Instagram' })
    setShowAdd(false)
  }

  const totalLeads = Object.values(leads).flat().length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">CRM / Pipeline</h1>
          <p className="text-gray-400 text-sm">{totalLeads} total leads</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="glass rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500 w-48"
            />
          </div>
          <Button onClick={() => setShowAdd(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Lead
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
        {stages.map(stage => (
          <div
            key={stage}
            className={`rounded-xl border p-3 min-h-[400px] ${stageColors[stage]}`}
            onDragOver={e => e.preventDefault()}
            onDrop={() => handleDrop(stage)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">{stage}</h3>
              <span className="text-xs glass px-2 py-0.5 rounded-full">{leads[stage].length}</span>
            </div>
            <div className="space-y-2">
              {leads[stage]
                .filter(l => !search || l.name.toLowerCase().includes(search.toLowerCase()))
                .map(lead => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => handleDragStart(lead.id, stage)}
                    onClick={() => setSelectedLead(lead)}
                    className="glass rounded-lg p-3 cursor-pointer hover:bg-white/10 transition-all active:scale-95"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {lead.name[0]}
                        </div>
                        <p className="text-sm font-medium leading-tight">{lead.name}</p>
                      </div>
                      <ScoreBadge score={lead.score} />
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{lead.source}</p>
                    <div className="flex flex-wrap gap-1">
                      {lead.tags.map(tag => (
                        <span key={tag} className="text-xs bg-white/10 px-1.5 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Lead Detail Modal */}
      <Modal isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} title="Lead Profile">
        {selectedLead && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                {selectedLead.name[0]}
              </div>
              <div>
                <h3 className="font-bold text-lg">{selectedLead.name}</h3>
                <p className="text-gray-400 text-sm">Source: {selectedLead.source}</p>
                <ScoreBadge score={selectedLead.score} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-gray-400" />{selectedLead.email}</div>
              <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-gray-400" />{selectedLead.phone}</div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {selectedLead.tags.map(tag => (
                  <span key={tag} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            <div className="glass rounded-lg p-3">
              <p className="text-sm text-gray-400 mb-1">Lead Score</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-400" style={{ width: `${selectedLead.score}%` }} />
                </div>
                <span className="text-sm font-bold">{selectedLead.score}/100</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Lead Modal */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add New Lead">
        <div className="space-y-3">
          <Input placeholder="Full Name *" value={newLead.name} onChange={e => setNewLead({ ...newLead, name: e.target.value })} />
          <Input placeholder="Email" type="email" value={newLead.email} onChange={e => setNewLead({ ...newLead, email: e.target.value })} />
          <Input placeholder="Phone" value={newLead.phone} onChange={e => setNewLead({ ...newLead, phone: e.target.value })} />
          <select value={newLead.source} onChange={e => setNewLead({ ...newLead, source: e.target.value })}
            className="w-full glass rounded-lg px-3 py-2 text-sm outline-none">
            {['Instagram', 'Facebook', 'WhatsApp', 'YouTube', 'Email', 'Website'].map(s => (
              <option key={s} value={s} className="bg-gray-900">{s}</option>
            ))}
          </select>
          <Button className="w-full" onClick={addLead}>Add Lead</Button>
        </div>
      </Modal>
    </div>
  )
}
