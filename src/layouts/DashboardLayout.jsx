import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Workflow, MessageSquare, Filter, Users, Mail,
  Radio, FileText, Plug, BarChart3, CreditCard, Settings,
  Bell, Menu, Crown, X, LogOut
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/app' },
  { icon: Workflow, label: 'Automation Builder', path: '/app/automation' },
  { icon: MessageSquare, label: 'Chat Flows', path: '/app/chat-flows' },
  { icon: Filter, label: 'Funnels', path: '/app/funnels' },
  { icon: Users, label: 'CRM / Pipeline', path: '/app/crm' },
  { icon: Mail, label: 'Email Campaigns', path: '/app/email' },
  { icon: Radio, label: 'Broadcasts', path: '/app/broadcasts' },
  { icon: FileText, label: 'Templates', path: '/app/templates' },
  { icon: Plug, label: 'Integrations', path: '/app/integrations' },
  { icon: BarChart3, label: 'Analytics', path: '/app/analytics' },
  { icon: CreditCard, label: 'Billing', path: '/app/billing' },
  { icon: Settings, label: 'Settings', path: '/app/settings' },
]

export default function DashboardLayout({ logout, userProfile = {} }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const initials = userProfile.firstName && userProfile.lastName
    ? `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase()
    : userProfile.firstName
    ? userProfile.firstName[0].toUpperCase()
    : 'JD'

  const displayName = userProfile.firstName
    ? `${userProfile.firstName} ${userProfile.lastName}`.trim()
    : 'John Doe'

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) setSidebarOpen(false)
  }, [location.pathname, isMobile])

  // Desktop: sidebar open by default
  useEffect(() => {
    if (!isMobile) setSidebarOpen(true)
  }, [isMobile])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 glass border-b border-white/10 z-40">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Logo size="sm" />
            <Badge variant="purple" className="hidden sm:flex">Pro Plan</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="primary" size="sm" className="hidden sm:flex items-center gap-2" onClick={() => navigate('/app/billing')}>
              <Crown className="w-4 h-4" />
              Upgrade
            </Button>
            <button aria-label="Notifications" onClick={() => setShowNotifications(true)} className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button onClick={() => setShowProfile(true)} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm">
              {initials}
            </button>
            <button
              onClick={() => { logout(); navigate('/login') }}
              aria-label="Logout"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 glass border-r border-white/10 transition-all duration-300 z-40 ${
          isMobile
            ? sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
            : sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <div className="h-full overflow-y-auto py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-white/10 text-gray-300'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {(sidebarOpen || isMobile) && (
                  <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            )
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 pt-16 transition-all duration-300 ${
          !isMobile && sidebarOpen ? 'md:pl-64' : !isMobile ? 'md:pl-16' : ''
        }`}
      >
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
      <Footer />
      {/* Notifications Modal */}
      <Modal isOpen={showNotifications} onClose={() => setShowNotifications(false)} title="Notifications">
        <div className="space-y-3">
          {[
            { text: 'New lead captured from Instagram', time: '2 min ago', dot: 'bg-blue-500' },
            { text: 'Automation "Welcome Flow" completed', time: '15 min ago', dot: 'bg-purple-500' },
            { text: 'Email campaign sent successfully', time: '1 hour ago', dot: 'bg-green-500' },
            { text: 'New subscriber added', time: '2 hours ago', dot: 'bg-yellow-500' },
          ].map((n, i) => (
            <div key={i} className="flex items-start gap-3 p-3 glass rounded-lg hover:bg-white/10">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.dot}`} />
              <div>
                <p className="text-sm">{n.text}</p>
                <p className="text-xs text-gray-500 mt-1">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Profile Modal */}
      <Modal isOpen={showProfile} onClose={() => setShowProfile(false)} title="My Profile">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold">{initials}</div>
            <div>
              <p className="font-bold text-lg">{displayName}</p>
              <p className="text-gray-400 text-sm">{userProfile.email || 'user@example.com'}</p>
              <Badge variant="purple" className="mt-1">Pro Plan</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <button onClick={() => { navigate('/app/settings'); setShowProfile(false) }} className="w-full text-left p-3 glass rounded-lg hover:bg-white/10 transition-colors text-sm">⚙️ Account Settings</button>
            <button onClick={() => { navigate('/app/billing'); setShowProfile(false) }} className="w-full text-left p-3 glass rounded-lg hover:bg-white/10 transition-colors text-sm">💳 Billing & Plans</button>
            <button onClick={() => { logout(); navigate('/login') }} className="w-full text-left p-3 glass rounded-lg hover:bg-red-500/10 transition-colors text-sm text-red-400">🚪 Logout</button>
          </div>
        </div>
      </Modal>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  )
}
