import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Users, Target, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const steps = [
  { id: 1, title: 'Company Info', icon: Building2 },
  { id: 2, title: 'Team Size', icon: Users },
  { id: 3, title: 'Goals', icon: Target },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    teamSize: '',
    goals: [],
  })

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/app')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
      
      <div className="relative glass rounded-2xl p-8 w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id ? 'bg-blue-600' : 'bg-white/10'
                }`}>
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold">{steps[currentStep - 1].title}</h2>
        </div>

        <div className="space-y-6">
          {currentStep === 1 && (
            <>
              <div>
                <label htmlFor="onboard-company" className="block text-sm font-medium mb-2">Company Name</label>
                <Input
                  id="onboard-company"
                  name="company"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="onboard-website" className="block text-sm font-medium mb-2">Website (Optional)</label>
                <Input
                  id="onboard-website"
                  name="website"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-2 gap-4">
              {['1-5', '6-20', '21-50', '51-200', '201-500', '500+'].map((size) => (
                <button
                  key={size}
                  onClick={() => setFormData({ ...formData, teamSize: size })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.teamSize === size
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Users className="w-6 h-6 mb-2 mx-auto" />
                  <p className="font-medium">{size} employees</p>
                </button>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-3">
              {[
                'Automate customer support',
                'Generate more leads',
                'Increase conversions',
                'Build sales funnels',
                'Email marketing automation',
                'Multi-channel campaigns',
              ].map((goal) => {
                const goalId = `goal-${goal.replace(/\s+/g, '-').toLowerCase()}`
                return (
                <label
                  key={goal}
                  htmlFor={goalId}
                  className="flex items-center p-4 glass rounded-lg cursor-pointer hover:bg-white/10"
                >
                  <input
                    id={goalId}
                    name={goalId}
                    type="checkbox"
                    className="mr-3"
                    checked={formData.goals.includes(goal)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, goals: [...formData.goals, goal] })
                      } else {
                        setFormData({ ...formData, goals: formData.goals.filter((g) => g !== goal) })
                      }
                    }}
                  />
                  <span>{goal}</span>
                </label>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-8">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1">
            {currentStep === 3 ? 'Get Started' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  )
}
