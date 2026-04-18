import { useState } from 'react'
import { Filter, Plus, Eye, Edit, Copy, Trash2, ArrowLeft, Settings, Image, Type, Square as ButtonIcon } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'

const initialFunnels = [
  { id: 1, name: 'Product Launch', pages: 4, visitors: 2450, conversions: 18.5, status: 'active' },
  { id: 2, name: 'Lead Magnet', pages: 3, visitors: 5200, conversions: 32.1, status: 'active' },
  { id: 3, name: 'Webinar Registration', pages: 2, visitors: 1800, conversions: 45.2, status: 'active' },
  { id: 4, name: 'Free Trial', pages: 5, visitors: 890, conversions: 12.3, status: 'draft' },
]

const pageTypes = [
  { type: 'landing', label: 'Landing Page', icon: '🎯' },
  { type: 'optin', label: 'Opt-in Page', icon: '📧' },
  { type: 'sales', label: 'Sales Page', icon: '💰' },
  { type: 'thankyou', label: 'Thank You Page', icon: '🎉' },
]

const sections = [
  { id: 1, type: 'hero', label: 'Hero Section', content: { title: 'Amazing Product', subtitle: 'The best solution for your needs', button: 'Get Started' } },
  { id: 2, type: 'features', label: 'Features', content: { items: ['Feature 1', 'Feature 2', 'Feature 3'] } },
  { id: 3, type: 'cta', label: 'Call to Action', content: { text: 'Ready to get started?', button: 'Sign Up Now' } },
]

export default function Funnels() {
  const [funnels, setFunnels] = useState(initialFunnels)
  const [selectedFunnel, setSelectedFunnel] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [newFunnelName, setNewFunnelName] = useState('')
  const [selectedType, setSelectedType] = useState('landing')
  const [funnelSections, setFunnelSections] = useState(sections)
  const [previewMode, setPreviewMode] = useState(false)

  const createFunnel = () => {
    if (!newFunnelName.trim()) return
    setFunnels([...funnels, {
      id: funnels.length + 1,
      name: newFunnelName,
      pages: 1,
      visitors: 0,
      conversions: 0,
      status: 'draft'
    }])
    setNewFunnelName('')
    setSelectedType('landing')
    setShowModal(false)
  }

  const handleEdit = (funnel) => {
    setSelectedFunnel(funnel)
  }

  if (selectedFunnel) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setSelectedFunnel(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Funnels
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedFunnel.name}</h1>
            <p className="text-gray-400 text-sm">Drag-and-drop page builder</p>
          </div>
          <Button onClick={() => setPreviewMode(!previewMode)} variant="outline">
            <Eye className="w-4 h-4 mr-2" />{previewMode ? 'Edit' : 'Preview'}
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Builder */}
          {!previewMode && (
            <div className="flex-1 space-y-4">
              {funnelSections.map((section) => (
                <Card key={section.id} className="relative group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{section.label}</h3>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  {section.type === 'hero' && (
                    <div className="space-y-3">
                      <Input placeholder="Hero Title" defaultValue={section.content.title} />
                      <Input placeholder="Subtitle" defaultValue={section.content.subtitle} />
                      <Input placeholder="Button Text" defaultValue={section.content.button} />
                    </div>
                  )}
                  {section.type === 'features' && (
                    <div className="space-y-2">
                      {section.content.items.map((item, i) => (
                        <Input key={i} placeholder={`Feature ${i+1}`} defaultValue={item} />
                      ))}
                    </div>
                  )}
                  {section.type === 'cta' && (
                    <div className="space-y-3">
                      <Input placeholder="CTA Text" defaultValue={section.content.text} />
                      <Input placeholder="Button Text" defaultValue={section.content.button} />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Preview */}
          {previewMode && (
            <div className="flex-1">
              <Card className="min-h-[600px]">
                <div className="space-y-8">
                  {funnelSections.map((section) => (
                    <div key={section.id}>
                      {section.type === 'hero' && (
                        <div className="text-center py-12">
                          <h1 className="text-4xl font-bold mb-4 gradient-text">{section.content.title}</h1>
                          <p className="text-xl text-gray-300 mb-8">{section.content.subtitle}</p>
                          <Button size="lg">{section.content.button}</Button>
                        </div>
                      )}
                      {section.type === 'features' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {section.content.items.map((item, i) => (
                            <div key={i} className="glass p-6 rounded-lg text-center">
                              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Image className="w-6 h-6 text-blue-400" />
                              </div>
                              <h3 className="font-semibold mb-2">{item}</h3>
                            </div>
                          ))}
                        </div>
                      )}
                      {section.type === 'cta' && (
                        <div className="text-center py-12 glass rounded-lg">
                          <h2 className="text-2xl font-bold mb-4">{section.content.text}</h2>
                          <Button size="lg">{section.content.button}</Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Sidebar */}
          <Card className="w-80">
            <h3 className="font-semibold mb-4">Add Sections</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 glass rounded-lg hover:bg-white/10 transition-colors">
                <Type className="w-5 h-5" />
                <span className="text-sm font-medium">Text Section</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 glass rounded-lg hover:bg-white/10 transition-colors">
                <Image className="w-5 h-5" />
                <span className="text-sm font-medium">Image Section</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 glass rounded-lg hover:bg-white/10 transition-colors">
                <ButtonIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Button Section</span>
              </button>
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Funnels</h1>
          <p className="text-gray-400">Build high-converting sales funnels</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Funnel
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {funnels.map((funnel) => (
          <Card key={funnel.id} hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Filter className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{funnel.name}</h3>
                  <p className="text-sm text-gray-400">{funnel.pages} pages</p>
                </div>
              </div>
              <Badge variant={funnel.status === 'active' ? 'success' : 'default'}>
                {funnel.status}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="glass p-3 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Visitors</p>
                <p className="text-lg font-bold">{funnel.visitors.toLocaleString()}</p>
              </div>
              <div className="glass p-3 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Conversions</p>
                <p className="text-lg font-bold text-green-400">{funnel.conversions}%</p>
              </div>
              <div className="glass p-3 rounded-lg">
                <p className="text-xs text-gray-400 mb-1">Revenue</p>
                <p className="text-lg font-bold">${(funnel.visitors * funnel.conversions * 0.49).toFixed(0)}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(funnel)}>
                <Edit className="w-4 h-4 mr-2" />Edit
              </Button>
              <Button variant="ghost" size="sm" aria-label="Copy funnel">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" aria-label="Delete funnel" onClick={() => setFunnels(funnels.filter(f => f.id !== funnel.id))}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Funnel">
        <div className="space-y-4">
          <div>
            <label htmlFor="funnel-name" className="block text-sm font-medium mb-2">Funnel Name</label>
            <Input
              id="funnel-name"
              name="funnelName"
              placeholder="e.g., Product Launch Funnel"
              value={newFunnelName}
              onChange={(e) => setNewFunnelName(e.target.value)}
              autoFocus
            />
          </div>
          <div>
            <p className="block text-sm font-medium mb-2">Starting Page Type</p>
            <div className="grid grid-cols-2 gap-3">
              {pageTypes.map((page) => (
                <button
                  key={page.type}
                  onClick={() => setSelectedType(page.type)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedType === page.type
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 hover:border-white/20 glass'
                  }`}
                >
                  <span className="text-2xl">{page.icon}</span>
                  <p className="text-sm font-medium mt-1">{page.label}</p>
                </button>
              ))}
            </div>
          </div>
          <Button onClick={createFunnel} className="w-full">
            Create Funnel
          </Button>
        </div>
      </Modal>
    </div>
  )
}
