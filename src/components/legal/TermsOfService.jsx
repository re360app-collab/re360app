import React from 'react';
import { FileText } from 'lucide-react';
import { Helmet } from 'react-helmet';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - RE360App</title>
        <meta name="description" content="Read the RE360App Terms of Service. By using our services, you agree to these terms." />
      </Helmet>
      <div className="bg-gray-50 dark:bg-slate-950 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <FileText className="mx-auto h-16 w-16 text-blue-600 dark:text-blue-500" />
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Please read these terms carefully before using our service.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last updated: June 20, 2025</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 sm:p-12 space-y-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-500">
                <p className="font-bold text-yellow-800 dark:text-yellow-300">Disclaimer</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  This is a template Terms of Service and is not legal advice. You should consult with a legal professional to ensure these terms are appropriate and legally binding for your business.
                </p>
              </div>

              <h2>1. Agreement to Terms</h2>
              <p>
                By using RE360App ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
              </p>

              <h2>2. User Accounts</h2>
              <p>
                When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
              </p>

              <h2>3. User Responsibilities</h2>
              <p>
                You are responsible for the legality, reliability, and appropriateness of all data and content you input into the Service. You agree to use the Service in compliance with all applicable laws and regulations, including local, state, national, and international laws.
              </p>

              <h2>4. Prohibited Activities</h2>
              <p>You agree not to use the Service for any unlawful purpose or to engage in any of the following prohibited activities:</p>
              <ul>
                <li>Uploading or transmitting viruses, worms, or any other malicious code.</li>
                <li>Attempting to gain unauthorized access to our servers, user accounts, or computer systems.</li>
                <li>Engaging in any automated use of the system, such as using scripts to send comments or messages.</li>
                <li>Interfering with, disrupting, or creating an undue burden on the Service or the networks or services connected to the Service.</li>
              </ul>

              <h2>5. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of RE360App and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>

              <h2>6. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
              </p>

              <h2>7. Disclaimer of Warranties</h2>
              <p>
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. RE360App makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              
              <h2>8. Limitation of Liability</h2>
              <p>
                In no event shall RE360App, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>

              <h2>9. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is established, without regard to its conflict of law provisions.
              </p>

              <h2>10. Changes to These Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:support@re360app.com" className="text-blue-600 hover:underline dark:text-blue-400">support@re360app.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;