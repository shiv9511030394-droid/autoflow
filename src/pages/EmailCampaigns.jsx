import { useState } from 'react'
import { Mail, Plus, Send, Eye, Edit } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'

const initialCampaigns = [
  { id: 1, name: 'Weekly Newsletter', sent: 5420, opened: 4230, clicked: 2890, status: 'sent' },
  { id: 2, name: 'Product Launch', sent: 3200, opened: 2560, clicked: 1920, status: 'sent' },
  { id: 3, name: 'Welcome Series', sent: 0, opened: 0, clicked: 0, status: 'draft' },
]

export default function EmailCampaigns() {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [showNewModal, setShowNewModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [editName, setEditName] = useState('')
  const [newName, setNewName] = useState('')

  const createCampaign = () => {
    if (!newName.trim()) return
    setCampaigns([...campaigns, { id: campaigns.length + 1, name: newName, sent: 0, opened: 0, clicked: 0, status: 'draft' }])
    setNewName('')
    setShowNewModal(false)
  }

  const sendCampaign = (id) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: 'sent', sent: Math.floor(Math.random() * 5000) + 1000 } : c))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Email Campaigns</h1>
          <p className="text-gray-400">Create and manage email campaigns</p>
        </div>
        <Button onClick={() => setShowNewModal(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} hover>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{campaign.name}</h3>
                  <Badge variant={campaign.status === 'sent' ? 'success' : 'default'}>{campaign.status}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-8">
                <div className="text-center">
                  <p className="text-xl font-bold">{campaign.sent.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Sent</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-blue-400">
                    {campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-xs text-gray-400">Open Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-green-400">
                    {campaign.sent > 0 ? ((campaign.clicked / campaign.sent) * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-xs text-gray-400">Click Rate</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" aria-label="View" onClick={() => { setSelectedCampaign(campaign); setShowViewModal(true) }}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" aria-label="Edit" onClick={() => { setSelectedCampaign(campaign); setEditName(campaign.name); setShowEditModal(true) }}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  {campaign.status === 'draft' && (
                    <Button variant="primary" size="sm" aria-label="Send" onClick={() => sendCampaign(campaign.id)}>
                      <Send className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* New Campaign Modal */}
      <Modal isOpen={showNewModal} onClose={() => setShowNewModal(false)} title="New Email Campaign">
        <div className="space-y-4">
          <div>
            <label htmlFor="campaign-name" className="block text-sm font-medium mb-2">Campaign Name</label>
            <Input id="campaign-name" name="campaignName" placeholder="e.g., Summer Sale" value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus />
          </div>
          <Button onClick={createCampaign} className="w-full">Create Campaign</Button>
        </div>
      </Modal>

      {/* View Campaign Modal */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Campaign Details">
        {selectedCampaign && (
          <div className="space-y-4">
            <div className="glass p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">{selectedCampaign.name}</h3>
              <Badge variant={selectedCampaign.status === 'sent' ? 'success' : 'default'}>{selectedCampaign.status}</Badge>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="glass p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">{selectedCampaign.sent.toLocaleString()}</p>
                <p className="text-xs text-gray-400">Sent</p>
              </div>
              <div className="glass p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-400">{selectedCampaign.sent > 0 ? ((selectedCampaign.opened / selectedCampaign.sent) * 100).toFixed(1) : 0}%</p>
                <p className="text-xs text-gray-400">Open Rate</p>
              </div>
              <div className="glass p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-400">{selectedCampaign.sent > 0 ? ((selectedCampaign.clicked / selectedCampaign.sent) * 100).toFixed(1) : 0}%</p>
                <p className="text-xs text-gray-400">Click Rate</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
      {/* Edit Campaign Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Campaign">
        {selectedCampaign && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Campaign Name</label>
              <Input
                placeholder="Campaign name"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (() => {
                  setCampaigns(campaigns.map(c => c.id === selectedCampaign.id ? { ...c, name: editName } : c))
                  setShowEditModal(false)
                })()}
                autoFocus
              />
            </div>
            <Button className="w-full" onClick={() => {
              if (!editName.trim()) return
              setCampaigns(campaigns.map(c => c.id === selectedCampaign.id ? { ...c, name: editName } : c))
              setShowEditModal(false)
            }}>Save Changes</Button>
          </div>
        )}
      </Modal>
    </div>
  )
}
