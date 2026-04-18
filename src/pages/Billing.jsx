import { useState } from 'react'
import { CreditCard, Download, Check, Crown, Zap, Shield } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import { currencies, formatPrice } from '@/lib/utils'

const plans = [
  {
    name: 'Free',
    price: 0,
    icon: Shield,
    color: 'text-gray-400',
    features: ['300 messages/day', 'Basic automation', 'Email support', '15-day free trial'],
    popular: false,
  },
  {
    name: 'Pro',
    price: 0,
    icon: Crown,
    color: 'text-yellow-400',
    features: ['Unlimited messages', 'Advanced automation', 'Unlimited users', 'Priority support', 'All integrations', 'Custom branding', 'AI features', 'Analytics'],
    popular: true,
  },
]

const invoices = [
  { id: 'INV-001', date: '2024-01-15', amount: 0, status: 'paid', plan: 'Pro' },
  { id: 'INV-002', date: '2024-02-15', amount: 0, status: 'paid', plan: 'Pro' },
  { id: 'INV-003', date: '2024-03-15', amount: 0, status: 'paid', plan: 'Pro' },
]

export default function Billing() {
  const [currency, setCurrency] = useState('USD')
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [currentPlan, setCurrentPlan] = useState('Free')
  const [showCardModal, setShowCardModal] = useState(false)
  const [showPayModal, setShowPayModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [cardNum, setCardNum] = useState('')
  const [toast, setToast] = useState('')

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

  const handlePlanSelect = (plan) => {
    if (plan.name === currentPlan) return
    if (plan.price === 0) {
      setCurrentPlan(plan.name)
      showToast(`✓ Switched to ${plan.name} plan!`)
    } else {
      setSelectedPlan(plan)
      setShowPayModal(true)
    }
  }

  const handlePayment = (method) => {
    setShowPayModal(false)
    showToast(`✓ Payment via ${method} successful! Upgraded to ${selectedPlan?.name}`)
    setCurrentPlan(selectedPlan?.name)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Billing & Subscription</h1>
        <p className="text-gray-400 text-sm">Manage your plan and payment methods</p>
      </div>

      {/* Current Plan */}
      <Card className="border border-blue-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Crown className={`w-5 h-5 ${currentPlan === 'Pro' ? 'text-yellow-400' : 'text-gray-400'}`} />
              <h3 className="text-lg font-bold">{currentPlan} Plan</h3>
              <Badge variant="success">Active</Badge>
            </div>
            <p className="text-gray-400 text-sm">
              {currentPlan === 'Free' ? 'Upgrade to unlock unlimited features' : 'Next billing: March 15, 2025'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{formatPrice(0, currency)}</p>
            <p className="text-gray-400 text-sm">per month</p>
          </div>
        </div>
      </Card>

      {/* Currency & Cycle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <label className="block text-sm font-medium mb-2">Currency</label>
          <Select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            options={currencies.map(c => ({ value: c.code, label: `${c.code} (${c.symbol})` }))}
          />
        </Card>
        <Card>
          <label className="block text-sm font-medium mb-2">Billing Cycle</label>
          <Select
            value={billingCycle}
            onChange={e => setBillingCycle(e.target.value)}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'yearly', label: 'Yearly (Save 20%)' },
            ]}
          />
        </Card>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-xl font-bold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          {plans.map(plan => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-2 border-blue-500' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="bg-blue-600 text-xs">Most Popular</Badge>
                </div>
              )}
              <div className="text-center mb-4">
                <plan.icon className={`w-8 h-8 mx-auto mb-2 ${plan.color}`} />
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mt-1">
                  <span className="text-3xl font-bold">{formatPrice(plan.price, currency)}</span>
                  <span className="text-gray-400 text-sm">/mo</span>
                </div>
              </div>
              <ul className="space-y-2 mb-5">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full"
                onClick={() => handlePlanSelect(plan)}
              >
                {currentPlan === plan.name ? '✓ Current Plan' : plan.price === 0 ? 'Get Started Free' : 'Upgrade'}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card>
        <h3 className="font-semibold mb-3">Payment Method</h3>
        <div className="flex items-center justify-between p-3 glass rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium">•••• •••• •••• 4242</p>
              <p className="text-xs text-gray-400">Expires 12/25</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowCardModal(true)}>Update</Button>
        </div>
      </Card>

      {/* Invoice History */}
      <Card>
        <h3 className="font-semibold mb-3">Invoice History</h3>
        <div className="space-y-2">
          {invoices.map(inv => (
            <div key={inv.id} className="flex items-center justify-between p-3 glass rounded-lg hover:bg-white/5 transition-colors">
              <div>
                <p className="text-sm font-medium">{inv.id}</p>
                <p className="text-xs text-gray-400">{inv.date} — {inv.plan}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold">{formatPrice(inv.amount, currency)}</p>
                <Badge variant="success" className="text-xs">{inv.status}</Badge>
                <Button variant="ghost" size="sm" aria-label="Download" onClick={() => alert(`Downloading ${inv.id}`)}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Gateway Modal */}
      <Modal isOpen={showPayModal} onClose={() => setShowPayModal(false)} title={`Upgrade to ${selectedPlan?.name}`}>
        <div className="space-y-3">
          <p className="text-gray-400 text-sm">Choose your payment method:</p>
          <Button className="w-full flex items-center justify-center gap-2" onClick={() => handlePayment('Razorpay')}>
            🇮🇳 Pay with Razorpay (INR)
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => handlePayment('Stripe')}>
            🌍 Pay with Stripe (International)
          </Button>
          <p className="text-xs text-gray-500 text-center">Secure payment • Cancel anytime</p>
        </div>
      </Modal>

      {/* Update Card Modal */}
      <Modal isOpen={showCardModal} onClose={() => setShowCardModal(false)} title="Update Payment Method">
        <div className="space-y-3">
          <Input placeholder="•••• •••• •••• ••••" value={cardNum} onChange={e => setCardNum(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="MM/YY" />
            <Input placeholder="CVV" />
          </div>
          <Button className="w-full" onClick={() => { setShowCardModal(false); showToast('✓ Card updated!') }}>Save Card</Button>
        </div>
      </Modal>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50 text-sm">
          {toast}
        </div>
      )}
    </div>
  )
}
