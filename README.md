# AotuflowPilot - Chat Automation Funnel Builder

A production-ready, full-featured SaaS application for automating chat workflows, building funnels, and managing customer relationships across multiple platforms.

## 🚀 Features

### Core Functionality
- **Visual Automation Builder** - Drag-and-drop workflow creation with ReactFlow
- **Multi-Channel Support** - Instagram, Facebook, WhatsApp, Email, Telegram
- **Chat Flow Builder** - Conversational AI with smart replies
- **Funnel Builder** - Landing pages, opt-ins, sales pages
- **CRM & Pipeline** - Kanban-style lead management
- **Email Marketing** - Campaign builder with analytics
- **Broadcasts** - Mass messaging across platforms
- **Templates** - Reusable message templates
- **Analytics Dashboard** - Real-time performance metrics
- **Multi-Currency Billing** - Support for USD, EUR, GBP, INR, AUD, CAD, JPY

### Design Features
- Dark modern UI with glassmorphism
- Neon gradient accents
- Smooth animations & micro-interactions
- Fully responsive & mobile-first
- Premium $49/month SaaS aesthetic

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Shadcn UI patterns
- **Routing**: React Router v6
- **Charts**: Recharts
- **Workflow**: ReactFlow
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Installation

1. **Install dependencies**
```bash
npm install
```

2. **Start development server**
```bash
npm run dev
```

3. **Build for production**
```bash
npm run build
```

4. **Preview production build**
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   └── ui/              # Reusable UI components
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Modal.jsx
│       ├── Input.jsx
│       ├── Select.jsx
│       └── Badge.jsx
├── layouts/
│   └── DashboardLayout.jsx  # Main app layout with sidebar
├── pages/
│   ├── auth/            # Authentication pages
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ForgotPassword.jsx
│   │   └── Onboarding.jsx
│   ├── Dashboard.jsx    # Main dashboard with KPIs
│   ├── AutomationBuilder.jsx  # Visual workflow builder
│   ├── ChatFlows.jsx    # Chat conversation builder
│   ├── Funnels.jsx      # Funnel management
│   ├── CRM.jsx          # Lead & pipeline management
│   ├── EmailCampaigns.jsx
│   ├── Broadcasts.jsx
│   ├── Templates.jsx
│   ├── Integrations.jsx
│   ├── Analytics.jsx
│   ├── Billing.jsx      # Multi-currency pricing
│   ├── Settings.jsx
│   └── LandingPage.jsx  # Marketing landing page
├── lib/
│   └── utils.js         # Utility functions
├── App.jsx              # Main app with routing
├── main.jsx            # Entry point
└── index.css           # Global styles

```

## 🎨 Design System

### Colors
- Primary: Blue (#3b82f6)
- Secondary: Purple (#8b5cf6)
- Accent: Pink (#ec4899)
- Success: Green (#10b981)
- Warning: Yellow (#f59e0b)
- Danger: Red (#ef4444)

### Components
All components use the glassmorphism effect with:
- `bg-white/5` background
- `backdrop-blur-xl` blur effect
- `border border-white/10` subtle borders

### Animations
- Gradient animations on text and backgrounds
- Hover scale effects on cards
- Smooth transitions on all interactive elements

## 🔐 Authentication Flow

1. **Landing Page** → Marketing page with pricing
2. **Signup** → Create account with social login options
3. **Onboarding** → 3-step wizard (Company, Team Size, Goals)
4. **Dashboard** → Main application

## 💳 Billing & Pricing

### Plans
- **Limited**: Free - 1,000 messages/month
- **Pro**: $49/month - Unlimited (Most Popular)
- **Unlimited**: $49/month - Enterprise features

### Supported Currencies
- USD ($), EUR (€), GBP (£), INR (₹), AUD (A$), CAD (C$), JPY (¥)

### Payment Gateways (Ready for Integration)
- Razorpay for INR
- Stripe for international payments

## 🔌 Integrations (Mock Data Ready)

- Instagram - Comment & DM automation
- Facebook - Messenger automation
- YouTube - Comment automation
- WhatsApp - Business API
- SMTP - Email delivery
- Webhooks - Custom integrations
- Telegram - Bot automation

## 📊 Mock Data

All pages use realistic mock data for:
- Dashboard KPIs and charts
- Lead management
- Campaign performance
- Automation workflows
- User profiles
- Billing history

## 🚀 Backend Integration Points

The app is structured for easy backend integration:

### API Endpoints Needed
```javascript
// Authentication
POST /api/auth/login
POST /api/auth/signup
POST /api/auth/forgot-password

// Automations
GET /api/automations
POST /api/automations
PUT /api/automations/:id
DELETE /api/automations/:id

// Leads
GET /api/leads
POST /api/leads
PUT /api/leads/:id

// Campaigns
GET /api/campaigns
POST /api/campaigns
GET /api/campaigns/:id/analytics

// Billing
GET /api/billing/plans
POST /api/billing/subscribe
GET /api/billing/invoices
```

### State Management
Currently uses React useState. Ready for:
- Redux Toolkit
- Zustand
- React Query for API calls

## 🎯 Key Features Implementation

### Automation Builder
- Uses ReactFlow for visual node-based workflows
- Supports triggers, conditions, delays, actions
- Real-time node editing with settings panel

### CRM Pipeline
- Kanban board with drag-and-drop (ready for react-beautiful-dnd)
- Lead scoring system
- Conversation history tracking

### Analytics
- Recharts for data visualization
- Real-time metrics
- Campaign performance tracking

### Multi-Currency
- Dynamic price conversion
- Currency selector in billing
- Stored in user preferences

## 🔧 Customization

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add menu item in `src/layouts/DashboardLayout.jsx`

### Styling
- Modify `tailwind.config.js` for theme changes
- Update CSS variables in `src/index.css`
- Use utility classes from Tailwind

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible sidebar on mobile
- Touch-friendly UI elements

## ⚡ Performance

- Lazy loading ready (add React.lazy for routes)
- Optimized bundle size with Vite
- Skeleton loaders for better UX
- Efficient re-renders with React best practices

## 🔒 Security Considerations

- Input validation needed on all forms
- XSS protection (sanitize user inputs)
- CSRF tokens for API calls
- Secure authentication flow
- Environment variables for API keys

## 🚀 Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📝 Environment Variables

Create `.env` file:
```env
VITE_API_URL=https://api.aotuflowpilot.com
VITE_STRIPE_KEY=pk_test_...
VITE_RAZORPAY_KEY=rzp_test_...
```

## 🤝 Contributing

This is a production-ready template. Customize as needed for your use case.

## 📄 License

MIT License - Free to use for commercial projects

## 🎉 Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:5173
5. Login with any credentials (mock auth)
6. Explore the full application!

---

Built with ❤️ using React + Tailwind CSS + Vite
