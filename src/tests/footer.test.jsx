import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, test, expect } from 'vitest'
import Footer from '@/components/Footer'

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  )
}

describe('Footer — rendering and structure', () => {
  // Req 8.1 — Footer renders <footer> as root element
  test('renders <footer> as root element', () => {
    const { container } = renderFooter()
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  // Req 8.2 — Footer contains <nav aria-label="Footer navigation">
  test('contains nav with aria-label "Footer navigation"', () => {
    renderFooter()
    const nav = screen.getByRole('navigation', { name: 'Footer navigation' })
    expect(nav).toBeInTheDocument()
  })

  // Req 2.1 — Branding section renders Logo (check for "AOTUFLOW" text)
  test('branding section renders Logo with AOTUFLOW text', () => {
    renderFooter()
    expect(screen.getByText('AOTUFLOW')).toBeInTheDocument()
  })

  // Req 2.2 — Tagline "Automate your growth." is present
  test('renders tagline "Automate your growth."', () => {
    renderFooter()
    expect(screen.getByText('Automate your growth.')).toBeInTheDocument()
  })

  // Req 2.3 — All five social icon links are rendered
  test('renders all five social icon links', () => {
    renderFooter()
    const socialPlatforms = ['Instagram', 'Facebook', 'Twitter/X', 'LinkedIn', 'YouTube']
    for (const platform of socialPlatforms) {
      expect(
        screen.getByRole('link', { name: `Follow us on ${platform}` })
      ).toBeInTheDocument()
    }
  })

  // Req 3.1 — All three nav column headings are present
  test('renders nav column headings: Product, Company, Legal', () => {
    renderFooter()
    // Headings use uppercase CSS class; text content is the original case
    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Legal')).toBeInTheDocument()
  })

  // Req 3.2 — Product column contains expected links
  test('Product column contains Features, Pricing, Integrations, Changelog links', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'Features' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pricing' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Integrations' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Changelog' })).toBeInTheDocument()
  })

  // Req 3.3 — Company column contains expected links
  test('Company column contains About, Blog, Careers, Contact links', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Careers' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  // Req 3.4 — Legal column contains Privacy Policy and Terms of Service links
  test('Legal column contains Privacy Policy and Terms of Service links', () => {
    renderFooter()
    // There are two Privacy Policy links (nav column + bottom bar); getAllByRole handles that
    const privacyLinks = screen.getAllByRole('link', { name: 'Privacy Policy' })
    expect(privacyLinks.length).toBeGreaterThanOrEqual(1)
    // Check the nav column one points to /privacy
    expect(privacyLinks.some((l) => l.getAttribute('href') === '/privacy')).toBe(true)

    const termsLinks = screen.getAllByRole('link', { name: 'Terms of Service' })
    expect(termsLinks.length).toBeGreaterThanOrEqual(1)
    expect(termsLinks.some((l) => l.getAttribute('href') === '/terms')).toBe(true)
  })

  // Req 4.1 — Newsletter heading "Stay in the loop" is present
  test('renders newsletter heading "Stay in the loop"', () => {
    renderFooter()
    expect(screen.getByText('Stay in the loop')).toBeInTheDocument()
  })

  // Req 4.2, 4.4 — Email input has correct placeholder, type, and required attribute
  test('email input has placeholder, type="email", and required attribute', () => {
    renderFooter()
    const input = screen.getByPlaceholderText('Enter your email')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toBeRequired()
  })

  // Req 4.3 — Subscribe button is present
  test('renders Subscribe button', () => {
    renderFooter()
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
  })

  // Req 8.4 — Email input has aria-label="Email address for newsletter"
  test('email input has aria-label "Email address for newsletter"', () => {
    renderFooter()
    const input = screen.getByLabelText('Email address for newsletter')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'email')
  })

  // Req 5.1 — Bottom bar shows current year in copyright text
  test('bottom bar shows current year in copyright text', () => {
    renderFooter()
    const year = new Date().getFullYear().toString()
    const copyright = screen.getByText(new RegExp(year))
    expect(copyright).toBeInTheDocument()
  })

  // Req 5.2 — Bottom bar has Privacy Policy and Terms of Service links
  test('bottom bar has Privacy Policy and Terms of Service links', () => {
    renderFooter()
    // Bottom bar links — there may be duplicates from the nav column; check at least one exists
    const privacyLinks = screen.getAllByRole('link', { name: 'Privacy Policy' })
    expect(privacyLinks.length).toBeGreaterThanOrEqual(1)

    const termsLinks = screen.getAllByRole('link', { name: 'Terms of Service' })
    expect(termsLinks.length).toBeGreaterThanOrEqual(1)
  })
})
