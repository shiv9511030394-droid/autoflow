import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from '@/components/Logo'
import Button from '@/components/ui/Button'

// ─── Task 2.1: Static data arrays ────────────────────────────────────────────

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#060d1a" />
  </svg>
)

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/aotuflow',          Icon: InstagramIcon },
  { label: 'Facebook',  href: 'https://facebook.com/aotuflow',           Icon: FacebookIcon  },
  { label: 'Twitter/X', href: 'https://twitter.com/aotuflow',            Icon: TwitterIcon   },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/aotuflow',   Icon: LinkedInIcon  },
  { label: 'YouTube',   href: 'https://youtube.com/@aotuflow',           Icon: YouTubeIcon   },
]

const NAV_COLUMNS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features',     href: '/#features',        external: false },
      { label: 'Pricing',      href: '/#pricing',         external: false },
      { label: 'Integrations', href: '/app/integrations', external: false },
      { label: 'Changelog',    href: '#',                 external: false },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',   href: '#',                           external: false },
      { label: 'Blog',    href: '#',                           external: false },
      { label: 'Careers', href: '#',                           external: false },
      { label: 'Contact', href: 'mailto:support@aotuflow.com', external: true  },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy',   href: '/privacy', external: false },
      { label: 'Terms of Service', href: '/terms',   external: false },
      { label: 'Cookie Policy',    href: '#',        external: false },
    ],
  },
]

// ─── Task 2.2: Branding Section ───────────────────────────────────────────────

function BrandingSection() {
  return (
    <div className="flex flex-col gap-4">
      <Logo size="sm" />
      <p className="text-gray-400 text-sm">Automate your growth.</p>
      <div className="flex items-center gap-3">
        {SOCIAL_LINKS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on ${label}`}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  )
}

// ─── Task 2.3: Navigation Columns ────────────────────────────────────────────

function NavColumns() {
  return (
    <nav aria-label="Footer navigation" className="contents">
      {NAV_COLUMNS.map(({ heading, links }) => (
        <div key={heading}>
          <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
            {heading}
          </h3>
          <ul className="flex flex-col gap-2">
            {links.map(({ label, href, external }) => (
              <li key={label}>
                {external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    to={href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

// ─── Task 2.4: Newsletter Form ────────────────────────────────────────────────

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'success' | 'error'

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => setStatus('idle'), 3000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      // Optimistic success — no backend endpoint yet
      setEmail('')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
        Stay in the loop
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
          placeholder="Enter your email"
          aria-label="Email address for newsletter"
          className="bg-white/5 border border-white/10 backdrop-blur-xl text-white placeholder-gray-500 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:border-white/30 transition-colors duration-200"
        />
        <Button type="submit" variant="primary" size="sm" className="w-full">
          Subscribe
        </Button>
        {status === 'success' && (
          <p className="text-green-400 text-xs">Thanks for subscribing!</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  )
}

// ─── Task 2.5: Bottom Bar ─────────────────────────────────────────────────────

function BottomBar() {
  const year = new Date().getFullYear()
  return (
    <div className="border-t border-white/10 pt-6 mt-8 flex flex-col md:flex-row md:justify-between gap-3">
      <p className="text-gray-500 text-xs">
        © {year} Aotuflow. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <Link
          to="/privacy"
          className="text-gray-500 hover:text-white transition-colors duration-200 text-xs"
        >
          Privacy Policy
        </Link>
        <Link
          to="/terms"
          className="text-gray-500 hover:text-white transition-colors duration-200 text-xs"
        >
          Terms of Service
        </Link>
      </div>
    </div>
  )
}

// ─── Task 2.6: Footer root ────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060d1a]">
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6">
        {/* Main grid: 1 col mobile → 2 col tablet → 5 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Branding spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <BrandingSection />
          </div>
          {/* Nav columns — each 1 col on lg */}
          <NavColumns />
          {/* Newsletter — 1 col on lg */}
          <NewsletterForm />
        </div>
        <BottomBar />
      </div>
    </footer>
  )
}
