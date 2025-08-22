import React from 'react';
import { Shield, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - RE360App</title>
        <meta name="description" content="Read the RE360App Privacy Policy to understand how we collect, use, and protect your data." />
      </Helmet>
      <div className="bg-gray-50 dark:bg-slate-950 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Shield className="mx-auto h-16 w-16 text-blue-600 dark:text-blue-500" />
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Your privacy is important to us.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last updated: June 20, 2025</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 sm:p-12 space-y-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-500">
                <p className="font-bold text-yellow-800 dark:text-yellow-300">Disclaimer</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  This is a template Privacy Policy and is not legal advice. You should consult with a legal professional to ensure this policy meets the specific needs and legal requirements of your business.
                </p>
              </div>

              <h2>1. Introduction</h2>
              <p>
                Welcome to RE360App ("we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
              </p>

              <h2>2. Information We Collect</h2>
              <p>
                We may collect personal information that you voluntarily provide to us when you register on the application, express an interest in obtaining information about us or our products and services, when you participate in activities on the application, or otherwise when you contact us.
              </p>
              <p>The personal information we collect may include the following:</p>
              <ul>
                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, etc.</li>
                <li><strong>Professional Information:</strong> License number, brokerage name, professional experience, etc.</li>
                <li><strong>User-Generated Content:</strong> Information about leads, clients, loans, and other data you input into the service.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage data collected through cookies and similar technologies.</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use the information we collect for various business purposes, including to:</p>
              <ul>
                <li>Create and manage your account.</li>
                <li>Provide, operate, and maintain our services.</li>
                <li>Improve, personalize, and expand our services.</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the application, and for marketing and promotional purposes.</li>
                <li>Process your transactions.</li>
                <li>Find and prevent fraud.</li>
              </ul>

              <h2>4. How We Share Your Information</h2>
              <p>We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: data analysis, email delivery, hosting services, and customer service.</p>
              <p>We may also share your information in the following situations:</p>
              <ul>
                <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                <li><strong>Legal Obligations:</strong> When we are legally required to do so to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
              </ul>

              <h2>5. Data Security</h2>
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
              </p>

              <h2>6. Your Data Protection Rights</h2>
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul>
                <li>The right to access, update, or delete the information we have on you.</li>
                <li>The right of rectification.</li>
                <li>The right to object.</li>
                <li>The right of restriction.</li>
                <li>The right to data portability.</li>
                <li>The right to withdraw consent.</li>
              </ul>

              <h2>7. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date. We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information.
              </p>

              <h2>8. Contact Us</h2>
              <p>
                If you have questions or comments about this policy, you may email us at <a href="mailto:privacy@re360app.com" className="text-blue-600 hover:underline dark:text-blue-400">privacy@re360app.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;