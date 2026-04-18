import { TrendingUp, Users, MessageSquare, Target, DollarSign, Activity } from 'lucide-react'
import Card from '@/components/ui/Card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const kpiData = [
  { label: 'Total Leads', value: '12,458', change: '+12.5%', icon: Users, color: 'blue', bgColor: '#3b82f6', textColor: '#60a5fa' },
  { label: 'Active Automations', value: '24', change: '+3', icon: Activity, color: 'purple', bgColor: '#8b5cf6', textColor: '#a78bfa' },
  { label: 'Messages Sent', value: '45,892', change: '+23.1%', icon: MessageSquare, color: 'green', bgColor: '#10b981', textColor: '#34d399' },
  { label: 'Conversion Rate', value: '34.2%', change: '+5.4%', icon: Target, color: 'yellow', bgColor: '#f59e0b', textColor: '#fcd34d' },
  { label: 'Revenue Generated', value: '$28,450', change: '+18.2%', icon: DollarSign, color: 'pink', bgColor: '#ec4899', textColor: '#f472b6' },
]

const leadGrowthData = [
  { month: 'Jan', leads: 400 },
  { month: 'Feb', leads: 600 },
  { month: 'Mar', leads: 800 },
  { month: 'Apr', leads: 1200 },
  { month: 'May', leads: 1600 },
  { month: 'Jun', leads: 2000 },
]

const automationPerformance = [
  { name: 'Welcome Flow', conversions: 85 },
  { name: 'Lead Nurture', conversions: 72 },
  { name: 'Cart Abandon', conversions: 68 },
  { name: 'Re-engagement', conversions: 54 },
  { name: 'Upsell', conversions: 45 },
]

const recentActivity = [
  { action: 'New lead captured', user: 'Sarah Johnson', time: '2 min ago', type: 'lead' },
  { action: 'Automation completed', user: 'Welcome Flow', time: '5 min ago', type: 'automation' },
  { action: 'Email campaign sent', user: 'Newsletter #42', time: '12 min ago', type: 'email' },
  { action: 'New subscriber', user: 'Mike Chen', time: '18 min ago', type: 'lead' },
  { action: 'Payment received', user: '$49.00 from Pro Plan', time: '25 min ago', type: 'payment' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.label} hover className="relative overflow-hidden">
            <div style={{ backgroundColor: `${kpi.bgColor}20`, position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', borderRadius: '50%', filter: 'blur(40px)' }} />
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon style={{ color: kpi.textColor }} className="w-5 h-5" />
                <span className="text-green-400 text-sm font-medium">{kpi.change}</span>
              </div>
              <p className="text-2xl font-bold mb-1">{kpi.value}</p>
              <p className="text-sm text-gray-400">{kpi.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Lead Growth
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={leadGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            Automation Performance
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={automationPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <Bar dataKey="conversions" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 glass rounded-lg hover:bg-white/10 transition-colors">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'lead' ? 'bg-blue-500' :
                activity.type === 'automation' ? 'bg-purple-500' :
                activity.type === 'email' ? 'bg-green-500' :
                'bg-yellow-500'
              }`} />
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-400">{activity.user}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
