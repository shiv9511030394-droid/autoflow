import { useState } from 'react'
import { Instagram, Facebook, Youtube, MessageCircle, Mail, Webhook, Send } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'

const initialApps = [
  { id: 1, name: 'Instagram', icon: Instagram, connected: true, bgColor: '#ec489920', textColor: '#f472b6', description: 'Auto-reply to comments and DMs' },
  { id: 2, name: 'Facebook', icon: Facebook, connected: true, bgColor: '#3b82f620', textColor: '#60a5fa', description: 'Messenger automation' },
  { id: 3, name: 'YouTube', icon: Youtube, connected: true, bgColor: '#ef444420', textColor: '#f87171', description: 'Comment automation' },
  { id: 4, name: 'WhatsApp', icon: MessageCircle, connected: true, bgColor: '#10b98120', textColor: '#34d399', description: 'Business API integration' },
  { id: 5, name: 'SMTP', icon: Mail, connected: true, bgColor: '#8b5cf620', textColor: '#a78bfa', description: 'Email delivery service' },
  { id: 6, name: 'Webhooks', icon: Webhook, connected: false, bgColor: '#f59e0b20', textColor: '#fcd34d', description: 'Custom integrations' },
  { id: 7, name: 'Telegram', icon: Send, connected: false, bgColor: '#3b82f620', textColor: '#60a5fa', description: 'Bot automation' },
]

export default function Integrations() {
  const [apps, setApps] = useState(initialApps)
  const [confirmApp, setConfirmApp] = useState(null)

  const handleToggle = (app) => {
    if (app.connected) {
      setConfirmApp(app) // ask confirmation before disconnect
    } else {
      setApps(apps.map(a => a.id === app.id ? { ...a, connected: true } : a))
    }
  }

  const confirmDisconnect = () => {
    setApps(apps.map(a => a.id === confirmApp.id ? { ...a, connected: false } : a))
    setConfirmApp(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Integrations</h1>
        <p className="text-gray-400">Connect your favorite platforms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <Card key={app.id} hover>
            <div className="flex items-start justify-between mb-4">
              <div style={{ backgroundColor: app.bgColor }} className="w-12 h-12 rounded-lg flex items-center justify-center">
                <app.icon style={{ color: app.textColor }} className="w-6 h-6" />
              </div>
              <Badge variant={app.connected ? 'success' : 'default'}>
                {app.connected ? 'Connected' : 'Not Connected'}
              </Badge>
            </div>
            <h3 className="font-semibold text-lg mb-2">{app.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{app.description}</p>
            <Button
              variant={app.connected ? 'outline' : 'primary'}
              className="w-full"
              onClick={() => handleToggle(app)}
            >
              {app.connected ? 'Disconnect' : 'Connect'}
            </Button>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="font-semibold mb-4">Custom Webhooks</h3>
        <p className="text-gray-400 mb-4">Connect Aotuflow with any service using webhooks</p>
        <div className="space-y-3">
          {[
            { name: 'Zapier Integration', url: 'https://hooks.zapier.com/...' },
            { name: 'Make.com Webhook', url: 'https://hook.make.com/...' },
          ].map((webhook, idx) => (
            <div key={idx} className="glass p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium">{webhook.name}</p>
                <p className="text-sm text-gray-400 font-mono">{webhook.url}</p>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">Add New Webhook</Button>
      </Card>

      {/* Disconnect Confirmation */}
      <Modal isOpen={!!confirmApp} onClose={() => setConfirmApp(null)} title="Disconnect Integration">
        {confirmApp && (
          <div className="space-y-4">
            <p className="text-gray-300">Are you sure you want to disconnect <strong>{confirmApp.name}</strong>? All automations using this integration will stop working.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setConfirmApp(null)}>Cancel</Button>
              <Button variant="primary" className="flex-1 bg-red-600 hover:bg-red-700" onClick={confirmDisconnect}>Disconnect</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
