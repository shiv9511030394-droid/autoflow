import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, Suspense, lazy } from 'react'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const Login = lazy(() => import('./pages/auth/Login'))
const Signup = lazy(() => import('./pages/auth/Signup'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const Onboarding = lazy(() => import('./pages/auth/Onboarding'))
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const AutomationBuilder = lazy(() => import('./pages/AutomationBuilder'))
const ChatFlows = lazy(() => import('./pages/ChatFlows'))
const Funnels = lazy(() => import('./pages/Funnels'))
const CRM = lazy(() => import('./pages/CRM'))
const EmailCampaigns = lazy(() => import('./pages/EmailCampaigns'))
const Broadcasts = lazy(() => import('./pages/Broadcasts'))
const Templates = lazy(() => import('./pages/Templates'))
const Integrations = lazy(() => import('./pages/Integrations'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Billing = lazy(() => import('./pages/Billing'))
const Settings = lazy(() => import('./pages/Settings'))

const Loader = () => (
  <div style={{ minHeight: '100vh', background: '#060d1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
    <div style={{ width: 40, height: 40, border: '3px solid #1e3a5f', borderTop: '3px solid #06b6d4', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('af_auth') === 'true'
  )
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('af_profile')
    return saved ? JSON.parse(saved) : { firstName: '', lastName: '' }
  })

  const login = () => {
    localStorage.setItem('af_auth', 'true')
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('af_auth')
    localStorage.removeItem('af_token')
    localStorage.removeItem('af_profile')
    setIsAuthenticated(false)
  }

  const updateProfile = (profile) => {
    localStorage.setItem('af_profile', JSON.stringify(profile))
    setUserProfile(profile)
  }

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/app" replace /> : <Login setAuth={login} />
          } />
          <Route path="/signup" element={
            isAuthenticated ? <Navigate to="/app" replace /> : <Signup />
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/onboarding" element={<Onboarding />} />

          <Route path="/app" element={
            isAuthenticated ? <DashboardLayout logout={logout} userProfile={userProfile} /> : <Navigate to="/login" replace />
          }>
            <Route index element={<Dashboard />} />
            <Route path="automation" element={<AutomationBuilder />} />
            <Route path="chat-flows" element={<ChatFlows />} />
            <Route path="funnels" element={<Funnels />} />
            <Route path="crm" element={<CRM />} />
            <Route path="email" element={<EmailCampaigns />} />
            <Route path="broadcasts" element={<Broadcasts />} />
            <Route path="templates" element={<Templates />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings updateProfile={updateProfile} userProfile={userProfile} />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
