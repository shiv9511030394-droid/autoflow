import { useState } from 'react'
import { Radio, Plus } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'

const initialBroadcasts = [
  { id: 1, name: 'Flash Sale Announcement', platform: 'Instagram', sent: 8500, delivered: 8200, status: 'sent' },
  { id: 2, name: 'New Feature Update', platform: 'WhatsApp', sent: 5200, delivered: 5100, status: 'sent' },
  { id: 3, name: 'Event Reminder', platform: 'Facebook', sent: 0, delivered: 0, status: 'scheduled' },
]

export default function Broadcasts() {
  const [broadcasts, setBroadcasts] = useState(initialBroadcasts)
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPlatform, setNewPlatform] = useState('Instagram')

  const createBroadcast = () => {
    if (!newName.trim()) return
    setBroadcasts([...broadcasts, { id: broadcasts.length + 1, name: newName, platform: newPlatform, sent: 0, delivered: 0, status: 'scheduled' }])
    setNewName('')
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Broadcasts</h1>
          <p className="text-gray-400">Send messages to your audience</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />New Broadcast
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {broadcasts.map((broadcast) => (
          <Card key={broadcast.id} hover>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Radio className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{broadcast.name}</h3>
                  <p className="text-sm text-gray-400">{broadcast.platform}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-xl font-bold">{broadcast.sent.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Sent</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-green-400">{broadcast.delivered.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Delivered</p>
                </div>
                <Badge variant={broadcast.status === 'sent' ? 'success' : 'warning'}>{broadcast.status}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="New Broadcast">
        <div className="space-y-4">
          <div>
            <label htmlFor="broadcast-name" className="block text-sm font-medium mb-2">Broadcast Name</label>
            <Input id="broadcast-name" name="broadcastName" placeholder="e.g., Flash Sale" value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus />
          </div>
          <div>
            <label htmlFor="broadcast-platform" className="block text-sm font-medium mb-2">Platform</label>
            <Select id="broadcast-platform" name="platform" value={newPlatform} onChange={(e) => setNewPlatform(e.target.value)} options={[
              { value: 'Instagram', label: 'Instagram' },
              { value: 'WhatsApp', label: 'WhatsApp' },
              { value: 'Facebook', label: 'Facebook' },
              { value: 'Telegram', label: 'Telegram' },
            ]} />
          </div>
          <Button onClick={createBroadcast} className="w-full">Create Broadcast</Button>
        </div>
      </Modal>
    </div>
  )
}
