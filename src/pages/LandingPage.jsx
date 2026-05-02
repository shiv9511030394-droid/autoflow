import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, Check, Star, ChevronDown, 
  MessageSquare, Mail, Workflow, BarChart3, Users, Crown
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Footer from '@/components/Footer'
import Logo from '@/components/Logo'
import { currencies, formatPrice } from '@/lib/utils'

const features = [
  { icon: Workflow, title: 'Visual Automation Builder', description: 'Drag-and-drop workflow builder with no coding required' },
  { icon: MessageSquare, title: 'Multi-Channel Messaging', description: 'Instagram, Facebook, WhatsApp, Email in one platform' },
  { icon: BarChart3, title: 'Advanced Analytics', description: 'Track performance and optimize your campaigns' },
  { icon: Users, title: 'CRM & Pipeline', description: 'Manage leads and deals in one place' },
]

const testimonials = [
  { name: 'Sarah Johnson', role: 'Marketing Director', company: 'TechCorp', rating: 5, text: 'Aotuflow transformed our lead generation. We saw 300% increase in conversions!' },
  { name: 'Mike Chen', role: 'Founder', company: 'StartupXYZ', rating: 5, text: 'The automation saves us 20+ hours per week. Best investment we made!' },
  { name: 'Emma Davis', role: 'Sales Manager', company: 'GrowthCo', rating: 5, text: 'Finally, all our channels in one place. The ROI is incredible!' },
]

const faqs = [
  { q: 'How does the free trial work?', a: 'Start with a 14-day free trial, no credit card required. Cancel anytime.' },
  { q: 'Can I change plans later?', a: 'Yes! Upgrade or downgrade your plan at any time from your billing dashboard.' },
  { q: 'What integrations do you support?', a: 'We integrate with Instagram, Facebook, WhatsApp, YouTube, email providers, and more.' },
  { q: 'Is my data secure?', a: 'Absolutely. We use enterprise-grade encryption and comply with GDPR and SOC 2 standards.' },
]

export default function LandingPage() {
  const [currency, setCurrency] = useState('USD')
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const link = document.querySelector("link[rel='canonical']") || document.createElement('link')
    link.rel = 'canonical'
    link.href = 'https://aotuflow-ecru.vercel.app/'
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 glass border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size="md" />
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">Sign Up</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '30px 30px'}} />
        
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">Trusted by 10,000+ businesses</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            5 Tools in One
            <br />
            <span className="gradient-text">Powerful Platform</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Automate Instagram, Facebook, WhatsApp, and Email campaigns. 
            Build funnels, manage leads, and grow your business on autopilot.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/signup">
              <Button size="lg" className="flex items-center gap-2 text-lg px-8">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Watch Demo
            </Button>
          </div>

          <div className="glass rounded-2xl p-2 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-8 aspect-video flex items-center justify-center">
              <p className="text-2xl font-semibold">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Problem</h2>
            <p className="text-xl text-gray-400">Manual replies waste time and lose leads</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Slow Response Time', desc: 'Lose 80% of leads waiting for replies' },
              { title: 'Multiple Tools', desc: 'Juggling 5+ platforms daily' },
              { title: 'No Automation', desc: 'Repeating the same tasks manually' },
            ].map((problem, idx) => (
              <Card key={idx} className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">❌</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                <p className="text-gray-400">{problem.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Flow */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Solution</h2>
            <p className="text-xl text-gray-400">Automated customer journey from comment to sale</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['Comment', 'Auto DM', 'WhatsApp', 'Email', 'Offer', 'Sale'].map((step, idx) => (
              <div key={step} className="flex items-center">
                <Card className="px-6 py-4">
                  <p className="font-semibold text-lg">{step}</p>
                </Card>
                {idx < 5 && <ArrowRight className="w-6 h-6 mx-2 text-blue-400" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-400">All-in-one platform for growth</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} hover className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Thousands</h2>
            <p className="text-xl text-gray-400">See what our customers say</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} hover>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400 mb-6">Choose your currency</p>
            <select
              id="currency-selector"
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="glass rounded-lg px-4 py-2 text-white"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code} className="bg-gray-900">
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Limited', price: 0, features: ['300 messages/day', 'Basic automation', '1 user'] },
              { name: 'Pro', price: 0, features: ['Unlimited messages', 'Advanced automation', 'Unlimited users', 'All integrations', 'Priority support'], popular: true },
              { name: 'Unlimited', price: 0, features: ['Everything in Pro', 'White-label', 'Dedicated manager', 'Custom development'] },
            ].map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${plan.popular ? 'border-2 border-blue-500 scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">{formatPrice(plan.price, currency)}</div>
                  <p className="text-gray-400">per month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">
                    Start Free Trial
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card
                key={idx}
                className="cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{faq.q}</h3>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                  />
                </div>
                {openFaq === idx && (
                  <p className="mt-4 text-gray-400">{faq.a}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">10x Your Growth?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 10,000+ businesses automating their success
          </p>
          <Link to="/signup">
            <Button size="lg" className="text-lg px-12">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
