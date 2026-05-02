import { TrendingUp, Users, DollarSign, Target } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const leadGrowth = [
  { month: 'Jan', leads: 400, revenue: 1200 },
  { month: 'Feb', leads: 600, revenue: 1800 },
  { month: 'Mar', leads: 800, revenue: 2400 },
  { month: 'Apr', leads: 1200, revenue: 3600 },
  { month: 'May', leads: 1600, revenue: 4800 },
  { month: 'Jun', leads: 2000, revenue: 6000 },
]

const campaignData = [
  { name: 'Instagram', value: 35 },
  { name: 'Facebook', value: 28 },
  { name: 'WhatsApp', value: 22 },
  { name: 'Email', value: 15 },
]

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-gray-400">Track your performance metrics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '$28,450', icon: DollarSign, bgColor: '#10b98120', textColor: '#34d399' },
          { label: 'Total Leads', value: '12,458', icon: Users, bgColor: '#3b82f620', textColor: '#60a5fa' },
          { label: 'Avg Conversion', value: '34.2%', icon: Target, bgColor: '#8b5cf620', textColor: '#a78bfa' },
          { label: 'Growth Rate', value: '+23.1%', icon: TrendingUp, bgColor: '#ec489920', textColor: '#f472b6' },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-3">
              <div style={{ backgroundColor: stat.bgColor }} className="w-10 h-10 rounded-lg flex items-center justify-center">
                <stat.icon style={{ color: stat.textColor }} className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Lead Growth & Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={leadGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)' }} />
              <Legend />
              <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} name="Leads" />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={campaignData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
              >
                {campaignData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
        <div className="space-y-4">
          {[
            { name: 'Welcome Automation', sent: 5420, opened: 4230, clicked: 2890, conversions: 1240 },
            { name: 'Lead Nurture', sent: 3200, opened: 2560, clicked: 1920, conversions: 890 },
            { name: 'Re-engagement', sent: 2100, opened: 1470, clicked: 840, conversions: 420 },
          ].map((campaign) => (
            <div key={campaign.name} className="glass p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{campaign.name}</h4>
                <Badge variant="success">{((campaign.conversions / campaign.sent) * 100).toFixed(1)}% CVR</Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Sent</p>
                  <p className="font-semibold">{campaign.sent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Opened</p>
                  <p className="font-semibold">{campaign.opened.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Clicked</p>
                  <p className="font-semibold">{campaign.clicked.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Conversions</p>
                  <p className="font-semibold text-green-400">{campaign.conversions.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
