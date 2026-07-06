import { useSEO } from '../lib/useSEO';

const PrivacyPolicy = () => {
  useSEO('Privacy Policy', 'How Transform U Media Network collects, uses, and protects your information.');
  return (
    <div className="bg-white">
      <section className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-neutral-400 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 prose prose-neutral">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 text-sm text-neutral-700 not-prose">
            <strong>Note:</strong> This policy was drafted to accurately describe how this site
            actually works. It has not been reviewed by an attorney. Given that TUMN Academy
            collects information from and about minors (ages 13–18), we strongly recommend legal
            review before this is treated as final, binding policy.
          </div>

          <h2>Who We Are</h2>
          <p>
            Transform U Media Network ("TUMN," "we," "us") operates this website, including its
            Urban News Journal, Transform U! Live Show, Kinetic PE MIXX, and Warrior Mandate
            brands, and the TUMN Academy youth media program. Contact us at{' '}
            <a href="mailto:info@tumnnews.com">info@tumnnews.com</a> with any privacy questions or requests.
          </p>

          <h2>Information We Collect</h2>
          <p>We collect information directly from you through the following:</p>
          <ul>
            <li><strong>Account registration</strong> — name and email address, when you create a member, TUMN Academy student/parent, or Program-in-a-Box partner account.</li>
            <li><strong>Article submissions</strong> — your name, email, bio, website, and the content you submit for editorial review.</li>
            <li><strong>TUMN Academy enrollment</strong> — student name and age, program level, and parent/guardian name, email, and phone number, submitted through our enrollment form.</li>
            <li><strong>Advertising inquiries</strong> — company name, contact name, email, and details about your advertising interests.</li>
            <li><strong>Newsletter signups</strong> — your email address.</li>
          </ul>

          <h2>Children's Privacy — TUMN Academy</h2>
          <p>
            TUMN Academy serves youth ages 13–18. Enrollment information (student name and age) is
            submitted by a parent or guardian through our enrollment form, alongside the parent or
            guardian's own contact information. We do not knowingly collect personal information
            directly from children under 13. If you believe a child under 13 has provided us
            information without parental involvement, contact us at{' '}
            <a href="mailto:info@tumnnews.com">info@tumnnews.com</a> and we will delete it.
          </p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To create and manage your account and provide access to the relevant portal (student, parent, or Program-in-a-Box partner)</li>
            <li>To review and, if accepted, publish article submissions under your byline</li>
            <li>To process TUMN Academy enrollment applications and communicate with you about your student's progress</li>
            <li>To respond to advertising inquiries</li>
            <li>To send newsletter content you've signed up to receive</li>
            <li>To notify our team internally when a new submission or inquiry needs review</li>
          </ul>

          <h2>Third-Party Services We Use</h2>
          <p>We rely on the following service providers to operate this site. Each has access only to the data necessary to perform its function:</p>
          <ul>
            <li><strong>Supabase</strong> — our database and authentication provider. All account data, submissions, and form data are stored here.</li>
            <li><strong>Netlify</strong> — our website host, and the processor for our enrollment form submissions.</li>
            <li><strong>Resend</strong> — our email delivery provider, used to send account confirmation emails and internal notifications.</li>
            <li><strong>Cal.com</strong> — used for scheduling info-session calls; if you book a session, Cal.com's own privacy practices apply to that booking.</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We retain account and submission data for as long as your account is active. You may
            request deletion of your account and associated data at any time by emailing{' '}
            <a href="mailto:info@tumnnews.com">info@tumnnews.com</a>.
          </p>

          <h2>Your Rights</h2>
          <p>You may contact us at any time to:</p>
          <ul>
            <li>Request a copy of the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your account and associated data</li>
            <li>Unsubscribe from newsletter emails (a link is included in every newsletter email)</li>
          </ul>

          <h2>Security</h2>
          <p>
            We use industry-standard practices to protect your information, including encrypted
            connections and access controls that restrict data to only what each part of the
            system needs to see.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy as the site evolves. Material changes will be reflected by
            updating the "Last updated" date above.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy or your data: <a href="mailto:info@tumnnews.com">info@tumnnews.com</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
