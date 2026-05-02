import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from '@/components/Footer'
import Logo from '@/components/Logo'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#060d1a] text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-[#060d1a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo size="sm" />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-3">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: January 1, 2025</p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {/* 1. Data Collection */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Data Collection</h2>
            <p className="text-gray-400 leading-relaxed">
              We collect information you provide directly to us, such as when you create an account,
              subscribe to our newsletter, or contact us for support. This may include your name,
              email address, billing information, and any other details you choose to share. We also
              collect usage data automatically when you interact with our platform, including log data,
              device information, IP addresses, and browser type. This information helps us understand
              how our services are used and improve your experience.
            </p>
          </section>

          {/* 2. Data Usage */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Data Usage</h2>
            <p className="text-gray-400 leading-relaxed">
              The information we collect is used to provide, maintain, and improve our services,
              process transactions, send you technical notices and support messages, and respond to
              your comments and questions. We may also use your data to send promotional communications,
              such as information about products, services, and events offered by Aotuflow, subject to
              your communication preferences. We do not sell your personal information to third parties.
              Your data is used solely to deliver and enhance the services you have signed up for.
            </p>
          </section>

          {/* 3. Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Cookies</h2>
            <p className="text-gray-400 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our platform and
              hold certain information. Cookies are files with a small amount of data that may include
              an anonymous unique identifier. You can instruct your browser to refuse all cookies or to
              indicate when a cookie is being sent. However, if you do not accept cookies, some portions
              of our service may not function properly. We use session cookies to operate our service,
              preference cookies to remember your settings, and analytics cookies to understand how you
              interact with our platform.
            </p>
          </section>

          {/* 4. Third-Party Services */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Third-Party Services</h2>
            <p className="text-gray-400 leading-relaxed">
              Our platform integrates with third-party services such as payment processors, analytics
              providers, and social media platforms. These third parties have their own privacy policies
              governing the use of your information. We encourage you to review the privacy policies of
              any third-party services you connect to through Aotuflow. We are not responsible for the
              privacy practices of these external services. When you connect a third-party account, we
              only request the permissions necessary to provide the features you have enabled.
            </p>
          </section>

          {/* 5. User Rights */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">User Rights</h2>
            <p className="text-gray-400 leading-relaxed">
              You have the right to access, update, or delete the personal information we hold about
              you at any time. You may also request that we restrict the processing of your data or
              object to its use for certain purposes. To exercise any of these rights, please contact
              us at support@aotuflow.com. We will respond to your request within 30 days. If you are
              located in the European Economic Area, you have additional rights under the General Data
              Protection Regulation (GDPR), including the right to data portability and the right to
              lodge a complaint with your local data protection authority.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
