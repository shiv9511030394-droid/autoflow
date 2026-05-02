import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from '@/components/Footer'
import Logo from '@/components/Logo'

export default function Terms() {
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
          <h1 className="text-4xl font-bold gradient-text mb-3">Terms of Service</h1>
          <p className="text-gray-400 text-sm">Last updated: January 1, 2025</p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Acceptance of Terms</h2>
            <p className="text-gray-400 leading-relaxed">
              By accessing or using Aotuflow, you agree to be bound by these Terms of Service and all
              applicable laws and regulations. If you do not agree with any of these terms, you are
              prohibited from using or accessing this platform. These terms apply to all visitors,
              users, and others who access or use the service. We reserve the right to update or
              modify these terms at any time without prior notice. Your continued use of the platform
              following any changes constitutes your acceptance of the revised terms.
            </p>
          </section>

          {/* 2. Use of Service */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Use of Service</h2>
            <p className="text-gray-400 leading-relaxed">
              You may use Aotuflow only for lawful purposes and in accordance with these Terms. You
              agree not to use the platform in any way that violates applicable local, national, or
              international laws or regulations. You are responsible for maintaining the confidentiality
              of your account credentials and for all activities that occur under your account. You
              agree to notify us immediately of any unauthorized use of your account. We reserve the
              right to terminate or suspend your access to the service at our sole discretion, without
              notice, for conduct that we believe violates these Terms or is harmful to other users,
              us, or third parties.
            </p>
          </section>

          {/* 3. Prohibited Activities */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Prohibited Activities</h2>
            <p className="text-gray-400 leading-relaxed">
              You agree not to engage in any of the following activities: transmitting spam, unsolicited
              messages, or any form of automated bulk messaging without recipient consent; attempting to
              gain unauthorized access to any portion of the platform or its related systems; using the
              service to distribute malware, viruses, or any other malicious code; scraping, crawling,
              or otherwise extracting data from the platform without our express written permission;
              impersonating any person or entity or misrepresenting your affiliation with any person or
              entity; or using the platform in any manner that could disable, overburden, or impair the
              proper functioning of the service.
            </p>
          </section>

          {/* 4. Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Intellectual Property</h2>
            <p className="text-gray-400 leading-relaxed">
              The platform and its original content, features, and functionality are and will remain
              the exclusive property of Aotuflow and its licensors. Our trademarks and trade dress may
              not be used in connection with any product or service without the prior written consent
              of Aotuflow. You retain ownership of any content you submit, post, or display on or
              through the service. By submitting content, you grant us a worldwide, non-exclusive,
              royalty-free license to use, reproduce, and distribute that content solely for the
              purpose of providing and improving the service. We respect intellectual property rights
              and expect our users to do the same.
            </p>
          </section>

          {/* 5. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Limitation of Liability</h2>
            <p className="text-gray-400 leading-relaxed">
              To the maximum extent permitted by applicable law, Aotuflow and its officers, directors,
              employees, and agents shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to loss of profits, data,
              goodwill, or other intangible losses, resulting from your access to or use of (or
              inability to access or use) the service. In no event shall our total liability to you
              for all claims arising out of or relating to these Terms or the service exceed the
              greater of one hundred dollars ($100) or the amount you paid us in the twelve months
              preceding the claim. Some jurisdictions do not allow the exclusion of certain warranties
              or limitation of liability, so some of the above limitations may not apply to you.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
