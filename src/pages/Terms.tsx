import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using PhyNews, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">2. Service Description</h2>
            <p>
              PhyNews provides AI-powered summaries and audio versions of scientific research papers across multiple disciplines including Physics, Economics, Computer Science, Electrical Engineering, Statistics, Quantitative Finance, Quantitative Biology, and Mathematics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">3. Subscription and Payments</h2>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Subscription fees are charged on a monthly basis</li>
              <li>You may cancel your subscription at any time</li>
              <li>Refunds are handled in accordance with our refund policy</li>
              <li>Free trials are available for new users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">4. User Accounts</h2>
            <p>
              You are responsible for:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">5. Intellectual Property</h2>
            <p>
              All content provided through PhyNews, including but not limited to audio summaries, text summaries, and translations, is protected by copyright and other intellectual property laws. Users may not reproduce, distribute, or create derivative works without our express permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">6. Content Usage</h2>
            <p>
              Our summaries and audio content are for personal, non-commercial use only. Users agree not to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Redistribute or sell our content</li>
              <li>Use our service for commercial purposes</li>
              <li>Attempt to reverse engineer our AI systems</li>
              <li>Share account access with others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">7. Service Availability</h2>
            <p>
              While we strive for 24/7 availability, we do not guarantee uninterrupted access to our service. We reserve the right to modify, suspend, or discontinue any part of our service without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">8. User Feedback</h2>
            <p>
              By providing feedback through our platform, you grant us the right to use such feedback for improving our service. We may implement user suggestions without compensation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">9. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including breach of Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform. Continued use of our service after such modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">11. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:support@phynews.com" className="text-blue-400 hover:text-blue-300">
                support@phynews.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}