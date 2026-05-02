import { useState } from 'react'
import { CreditCard, Download, Check, Crown } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import { currencies, formatPrice } from '@/lib/utils'

const plans = [
  {
    name: 'Limited',
    price: 0,
    features: ['300 messages/day', 'Basic automation', '1 user', 'Email support'],
    popular: false,
  },
  {
    name: 'Pro',
    price: 49,
    features: ['Unlimited messages', 'Advanced automation', 'Unlimited users', 'Priority support', 'All integrations', 'Custom branding'],
    popular: true,
  },
  {
    name: 'Unlimited',
    price: 99,
    features: ['Everything in Pro', 'White-label solution', 'Dedicated account manager', 'Custom development', 'SLA guarantee'],
    popular: false,
  },
]

const invoices = [
  { id: 'INV-001', date: '2024-01-15', amount: 49, status: 'paid' },
  { id: 'INV-002', date: '2024-02-15', amount: 49, status: 'paid' },
  { id: 'INV-003', date: '2024-03-15', amount: 49, status: 'paid' },
]

export default function Billing() {
  const [currency, setCurrency] = useState('USD')
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [currentPlan, setCurrentPlan] = useState('Pro')
  const [showCardModal, setShowCardModal] = useState(false)
  const [cardNum, setCardNum] = useState('')
  const [showPlanMsg, setShowPlanMsg] = useState('')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
        <p className="text-gray-400">Manage your plan and payment methods</p>
      </div>

      {/* Current Plan */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-bold">Pro Plan</h3>
              <Badge variant="success">Active</Badge>
            </div>
            <p className="text-gray-400">Next billing date: March 15, 2024</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{formatPrice(0, currency)}</p>
            <p className="text-gray-400">per month</p>
          </div>
        </div>
      </Card>

      {/* Currency & Billing Cycle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <label htmlFor="billing-currency" className="block text-sm font-medium mb-2">Currency</label>
          <Select
            id="billing-currency"
            name="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            options={currencies.map(c => ({ value: c.code, label: `${c.code} (${c.symbol})` }))}
          />
        </Card>
        <Card>
          <label htmlFor="billing-cycle" className="block text-sm font-medium mb-2">Billing Cycle</label>
          <Select
            id="billing-cycle"
            name="billingCycle"
            value={billingCycle}
            onChange={(e) => setBillingCycle(e.target.value)}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'yearly', label: 'Yearly (Save 20%)' },
            ]}
          />
        </Card>
      </div>

      {/* Pricing Plans */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? 'border-2 border-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="bg-blue-600">Most Popular</Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{formatPrice(plan.price, currency)}</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full"
                onClick={() => { setCurrentPlan(plan.name); setShowPlanMsg(plan.name); setTimeout(() => setShowPlanMsg(''), 2000) }}
              >
                {currentPlan === plan.name ? '✓ Current Plan' : 'Get Started Free'}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card>
        <h3 className="font-semibold mb-4">Payment Method</h3>
        <div className="flex items-center justify-between p-4 glass rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-400">Expires 12/25</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowCardModal(true)}>Update</Button>
        </div>
      </Card>

      {/* Invoice History */}
      <Card>
        <h3 className="font-semibold mb-4">Invoice History</h3>
        <div className="space-y-2">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 glass rounded-lg hover:bg-white/10 transition-colors"
            >
              <div>
                <p className="font-medium">{invoice.id}</p>
                <p className="text-sm text-gray-400">{invoice.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold">{formatPrice(invoice.amount, currency)}</p>
                <Badge variant="success">{invoice.status}</Badge>
                <Button variant="ghost" size="sm" aria-label="Download invoice" onClick={() => alert(`Downloading ${invoice.id}...`)}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      {showPlanMsg && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          ✓ Switched to {showPlanMsg} plan!
        </div>
      )}

      <Modal isOpen={showCardModal} onClose={() => setShowCardModal(false)} title="Update Payment Method">
        <div className="space-y-4">
          <div>
            <label htmlFor="card-number" className="block text-sm font-medium mb-2">Card Number</label>
            <Input id="card-number" name="cardNumber" placeholder="•••• •••• •••• ••••" value={cardNum} onChange={(e) => setCardNum(e.target.value)} autoComplete="cc-number" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="card-expiry" className="block text-sm font-medium mb-2">Expiry</label>
              <Input id="card-expiry" name="cardExpiry" placeholder="MM/YY" autoComplete="cc-exp" />
            </div>
            <div>
              <label htmlFor="card-cvv" className="block text-sm font-medium mb-2">CVV</label>
              <Input id="card-cvv" name="cardCvv" placeholder="•••" autoComplete="cc-csc" />
            </div>
          </div>
          <Button className="w-full" onClick={() => setShowCardModal(false)}>Save Card</Button>
        </div>
      </Modal>
    </div>
  )
}
