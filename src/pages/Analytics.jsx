import { BarChart3, TrendingUp, Users, Mail, Target, DollarSign } from 'lucide-react'
import Card from '@/components/ui/Card'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'

const leadGrowth = [
  { month: 'Jan', leads: 400, conversions: 120 },
  { month: 'Feb', leads: 600, conversions: 180 },
  { month: 'Mar', leads: 800, conversions: 260 },
  { month: 'Apr', leads: 1200, conversions: 380 },
  { month: 'May', leads: 1600, conversions: 520 },
  { month: 'Jun', leads: 2000, conversions: 680 },
  { month: 'Jul', leads: 2400, conversions: 820 },
]

const campaignData = [
  { name: 'Welcome Email', opens: 68, clicks: 42, conversions: 28 },
  { name: 'Flash Sale', opens: 82, clicks: 61, conversions: 44 },
  { name: 'Newsletter', opens: 54, clicks: 31, conversions: 18 },
  { name: 'Re-engage', opens: 45, clicks: 22, conversions: 12 },
  { name: 'Upsell', opens: 71, clicks: 48, conversions: 35 },
]

const revenueData = [
  { month: 'Jan', revenue: 2400 },
  { month: 'Feb', revenue: 3600 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Apr', revenue: 6200 },
  { month: 'May', revenue: 7800 },
  { month: 'Jun', revenue: 9400 },
  { month: 'Jul', revenue: 11200 },
]

const channelData = [
  { name: 'Instagram', value: 38, color: '#e1306c' },
  { name: 'WhatsApp', value: 28, color: '#25d366' },
  { name: 'Email', value: 20, color: '#3b82f6' },
  { name: 'Facebook', value: 14, color: '#1877f2' },
]

const tooltipStyle = { backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }

const stats = [
  { label: 'Total Leads', value: '12,458', change: '+12.5%', icon: Users, color: '#60a5fa' },
  { label: 'Email Open Rate', value: '64.2%', change: '+8.1%', icon: Mail, color: '#34d399' },
  { label: 'Conversion Rate', value: '34.2%', change: '+5.4%', icon: Target, color: '#fcd34d' },
  { label: 'Total Revenue', value: '$45,200', change: '+22.3%', icon: DollarSign, color: '#f472b6' },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Analytics</h1>
        <p className="text-gray-400 text-sm">Track your growth and campaign performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} hover>
            <div className="flex items-center justify-between mb-2">
              <s.icon style={{ color: s.color }} className="w-5 h-5" />
              <span className="text-green-400 text-xs font-medium">{s.change}</span>
            </div>
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Lead Growth */}
      <Card>
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-400" /> Lead Growth & Conversions
        </h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={leadGrowth}>
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="#555" tick={{ fontSize: 11 }} />
            <YAxis stroke="#555" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="leads" stroke="#3b82f6" fill="url(#lg1)" strokeWidth={2} name="Leads" />
            <Area type="monotone" dataKey="conversions" stroke="#10b981" fill="url(#lg2)" strokeWidth={2} name="Conversions" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance */}
        <Card>
          <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-purple-400" /> Campaign Performance
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={campaignData} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#555" tick={{ fontSize: 10 }} />
              <YAxis stroke="#555" tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="opens" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Opens %" />
              <Bar dataKey="clicks" fill="#8b5cf6" radius={[2, 2, 0, 0]} name="Clicks %" />
              <Bar dataKey="conversions" fill="#10b981" radius={[2, 2, 0, 0]} name="Conversions %" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Channel Distribution */}
        <Card>
          <h3 className="text-base font-semibold mb-4">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={channelData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {channelData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
              <Legend formatter={(v) => <span style={{ fontSize: 12, color: '#aaa' }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Revenue */}
      <Card>
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-400" /> Revenue Tracking
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="#555" tick={{ fontSize: 11 }} />
            <YAxis stroke="#555" tick={{ fontSize: 11 }} tickFormatter={v => `$${v/1000}k`} />
            <Tooltip contentStyle={tooltipStyle} formatter={v => [`$${v.toLocaleString()}`, 'Revenue']} />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
