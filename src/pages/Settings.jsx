import { useState } from 'react'
import { User, Bell, Shield, Globe, Check } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'

export default function Settings({ updateProfile, userProfile = {} }) {
  const [profile, setProfile] = useState({
    firstName: userProfile.firstName || '',
    lastName: userProfile.lastName || '',
    email: userProfile.email || '',
    company: userProfile.company || ''
  })
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
  const [savedProfile, setSavedProfile] = useState(false)
  const [savedPassword, setSavedPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  const saveProfile = () => {
    if (updateProfile) updateProfile(profile)
    setSavedProfile(true)
    setTimeout(() => setSavedProfile(false), 2500)
  }

  const savePassword = () => {
    if (!passwords.current) { setPasswordError('Enter current password'); return }
    if (passwords.newPass.length < 6) { setPasswordError('New password must be 6+ characters'); return }
    if (passwords.newPass !== passwords.confirm) { setPasswordError('Passwords do not match'); return }
    setPasswordError('')
    setPasswords({ current: '', newPass: '', confirm: '' })
    setSavedPassword(true)
    setTimeout(() => setSavedPassword(false), 2500)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account preferences</p>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold">Profile Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium mb-2">First Name</label>
              <Input id="first-name" name="firstName" autoComplete="given-name" placeholder="First name"
                value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium mb-2">Last Name</label>
              <Input id="last-name" name="lastName" autoComplete="family-name" placeholder="Last name"
                value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
            </div>
          </div>
          <div>
            <label htmlFor="profile-email" className="block text-sm font-medium mb-2">Email</label>
            <Input id="profile-email" name="email" type="email" autoComplete="email" placeholder="your@email.com"
              value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2">Company</label>
            <Input id="company" name="company" autoComplete="organization" placeholder="Your company"
              value={profile.company} onChange={(e) => setProfile({ ...profile, company: e.target.value })} />
          </div>
          <Button onClick={saveProfile} className="flex items-center gap-2">
            {savedProfile ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Changes'}
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>
        <div className="space-y-4">
          {[
            { id: 'notif-email', label: 'Email notifications', description: 'Receive email updates' },
            { id: 'notif-push', label: 'Push notifications', description: 'Browser push notifications' },
            { id: 'notif-weekly', label: 'Weekly reports', description: 'Get weekly performance reports' },
            { id: 'notif-marketing', label: 'Marketing emails', description: 'Receive product updates' },
          ].map((item) => (
            <label key={item.id} htmlFor={item.id} className="flex items-center justify-between p-4 glass rounded-lg cursor-pointer hover:bg-white/10">
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
              <input id={item.id} name={item.id} type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold">Security</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium mb-2">Current Password</label>
            <Input id="current-password" name="currentPassword" type="password" autoComplete="current-password" placeholder="••••••••"
              value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium mb-2">New Password</label>
            <Input id="new-password" name="newPassword" type="password" autoComplete="new-password" placeholder="••••••••"
              value={passwords.newPass} onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })} />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">Confirm Password</label>
            <Input id="confirm-password" name="confirmPassword" type="password" autoComplete="new-password" placeholder="••••••••"
              value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />
          </div>
          {passwordError && <p className="text-red-400 text-sm">{passwordError}</p>}
          <Button onClick={savePassword} className="flex items-center gap-2">
            {savedPassword ? <><Check className="w-4 h-4" /> Updated!</> : 'Update Password'}
          </Button>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold">Preferences</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium mb-2">Language</label>
            <Select id="language" name="language" options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' },
              { value: 'hi', label: 'Hindi' },
            ]} />
          </div>
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium mb-2">Timezone</label>
            <Select id="timezone" name="timezone" options={[
              { value: 'utc', label: 'UTC' },
              { value: 'ist', label: 'India (IST)' },
              { value: 'est', label: 'Eastern Time' },
              { value: 'pst', label: 'Pacific Time' },
            ]} />
          </div>
        </div>
      </Card>
    </div>
  )
}
