const BASE_URL = import.meta.env.VITE_API_URL || 'https://autoflow-backend.vercel.app/api'

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('af_token')
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

export const api = {
  // Auth
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  signup: (firstName, lastName, email, password) =>
    request('/auth/signup', { method: 'POST', body: JSON.stringify({ firstName, lastName, email, password }) }),

  getProfile: () => request('/auth/profile'),

  updateProfile: (data) =>
    request('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),

  // Email
  sendEmail: (to, subject, html) =>
    request('/email/send', { method: 'POST', body: JSON.stringify({ to, subject, html }) }),

  sendCampaign: (recipients, subject, html) =>
    request('/email/campaign', { method: 'POST', body: JSON.stringify({ recipients, subject, html }) }),

  // AI
  chatAI: (messages) =>
    request('/ai/chat', { method: 'POST', body: JSON.stringify({ messages }) }),

  // Integrations
  integrations: {
    getStatus: () => request('/integrations/meta/status'),
    getConnectUrl: (platform) => {
      // Returns a URL string so the caller can set window.location.href to trigger the OAuth redirect
      const baseUrl = import.meta.env.VITE_API_URL || 'https://autoflow-api.vercel.app/api'
      return `${baseUrl}/integrations/meta/connect?platform=${platform}`
    },
    disconnect: (platform) => request(`/integrations/meta/${platform}`, { method: 'DELETE' }),
  },
}
