import { useState } from 'react'
import { FileText, Plus, Copy, Edit } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'

const initialTemplates = [
  { id: 1, name: 'Welcome Message', type: 'DM', uses: 1250, category: 'Onboarding' },
  { id: 2, name: 'Order Confirmation', type: 'Email', uses: 890, category: 'Transactional' },
  { id: 3, name: 'Abandoned Cart', type: 'WhatsApp', uses: 650, category: 'Sales' },
  { id: 4, name: 'Support Response', type: 'DM', uses: 420, category: 'Support' },
  { id: 5, name: 'Newsletter', type: 'Email', uses: 320, category: 'Marketing' },
  { id: 6, name: 'Event Invite', type: 'WhatsApp', uses: 180, category: 'Marketing' },
]

export default function Templates() {
  const [templates, setTemplates] = useState(initialTemplates)
  const [showModal, setShowModal] = useState(false)
  const [editTemplate, setEditTemplate] = useState(null)
  const [newName, setNewName] = useState('')

  const openNew = () => { setEditTemplate(null); setNewName(''); setShowModal(true) }
  const openEdit = (t) => { setEditTemplate(t); setNewName(t.name); setShowModal(true) }

  const saveTemplate = () => {
    if (!newName.trim()) return
    if (editTemplate) {
      setTemplates(templates.map(t => t.id === editTemplate.id ? { ...t, name: newName } : t))
    } else {
      setTemplates([...templates, { id: templates.length + 1, name: newName, type: 'DM', uses: 0, category: 'Custom' }])
    }
    setShowModal(false)
  }

  const copyTemplate = (t) => {
    setTemplates([...templates, { ...t, id: templates.length + 1, name: `${t.name} (Copy)`, uses: 0 }])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Templates</h1>
          <p className="text-gray-400">Reusable message templates</p>
        </div>
        <Button onClick={openNew} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-sm text-gray-400">{template.type}</p>
                </div>
              </div>
              <Badge>{template.category}</Badge>
            </div>
            <p className="text-sm text-gray-400 mb-4">Used {template.uses} times</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(template)}>
                <Edit className="w-4 h-4 mr-2" />Edit
              </Button>
              <Button variant="ghost" size="sm" aria-label="Copy template" onClick={() => copyTemplate(template)}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editTemplate ? 'Edit Template' : 'New Template'}>
        <div className="space-y-4">
          <div>
            <label htmlFor="template-name" className="block text-sm font-medium mb-2">Template Name</label>
            <Input id="template-name" name="templateName" placeholder="e.g., Welcome Message" value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus />
          </div>
          <Button onClick={saveTemplate} className="w-full">{editTemplate ? 'Save Changes' : 'Create Template'}</Button>
        </div>
      </Modal>
    </div>
  )
}
