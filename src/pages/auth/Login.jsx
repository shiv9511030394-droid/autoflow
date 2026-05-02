import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Github, Chrome } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function Login({ setAuth }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })

  // Set canonical for this page
  const canonical = document.querySelector("link[rel='canonical']")
  if (canonical) canonical.remove()

  const handleSubmit = (e) => {
    e.preventDefault()
    setAuth(true)
    navigate('/app')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
      
      <div className="relative glass rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your Aotuflow account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="pl-10"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="pl-10"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label htmlFor="remember-me" className="flex items-center cursor-pointer">
              <input id="remember-me" name="remember" type="checkbox" className="mr-2" />
              <span className="text-gray-400">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full">Sign In</Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-gray-400">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Chrome className="w-5 h-5" />Google
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Github className="w-5 h-5" />GitHub
            </Button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
