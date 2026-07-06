import { useSEO } from '../lib/useSEO';

const TermsOfService = () => {
  useSEO('Terms of Service', 'Terms governing use of the Transform U Media Network website and TUMN Academy program.');
  return (
    <div className="bg-white">
      <section className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-neutral-400 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 prose prose-neutral">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 text-sm text-neutral-700 not-prose">
            <strong>Note:</strong> This was drafted to accurately describe how this site actually
            works. It has not been reviewed by an attorney. Given that TUMN Academy enrolls minors
            and this site processes payments-adjacent inquiries, we strongly recommend legal
            review — particularly of the liability, refund, and minors sections — before treating
            this as final.
          </div>

          <h2>Acceptance of Terms</h2>
          <p>
            By using this website, creating an account, submitting an article, enrolling in TUMN
            Academy, or submitting an advertising inquiry, you agree to these Terms of Service.
          </p>

          <h2>Accounts</h2>
          <p>
            You're responsible for maintaining the confidentiality of your account credentials and
            for all activity under your account. Notify us immediately at{' '}
            <a href="mailto:info@tumnnews.com">info@tumnnews.com</a> if you suspect unauthorized access.
          </p>

          <h2>Article Submissions</h2>
          <p>By submitting an article, you confirm that:</p>
          <ul>
            <li>It's your original work and has not been previously published elsewhere</li>
            <li>You grant TUMN a non-exclusive, worldwide license to publish, edit, and promote the content across our brands and channels</li>
            <li>You understand submissions undergo editorial review and may be edited for clarity, length, and style, or declined at our discretion</li>
          </ul>

          <h2>TUMN Academy Enrollment</h2>
          <p>
            TUMN Academy programs are open to youth ages 13–18. Enrollment applications are
            submitted by a parent or guardian, who must be authorized to enroll the student and
            agree to these terms on the student's behalf. Enrollment applications reserve a spot
            for review only and do not constitute a binding payment obligation until confirmed
            separately by TUMN Academy staff. Pricing tiers (standard, sliding-scale, and Founding
            Cohort) are described on the enrollment page and subject to change for future cohorts.
            Specific cancellation and refund terms will be communicated at the time your seat is
            confirmed.
          </p>

          <h2>Advertising & Sponsorship Inquiries</h2>
          <p>
            Submitting an advertising inquiry does not create a binding agreement. Advertising and
            sponsorship packages are finalized only through a separate written agreement between
            you and TUMN.
          </p>

          <h2>Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Submit content that is unlawful, defamatory, plagiarized, or that you don't have the rights to publish</li>
            <li>Use automated tools to scrape, flood, or abuse any form on this site</li>
            <li>Attempt to gain unauthorized access to any account, portal, or system on this site</li>
            <li>Impersonate any person or entity, including TUMN staff</li>
          </ul>

          <h2>Disclaimers</h2>
          <p>
            This site and its content are provided "as is." TUMN does not guarantee that
            article submissions will be accepted, that advertising placements will meet specific
            performance expectations, or that the site will be free of interruptions or errors.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, TUMN is not liable for indirect, incidental,
            or consequential damages arising from your use of this site or participation in TUMN
            programs.
          </p>

          <h2>Termination</h2>
          <p>
            We may suspend or terminate accounts that violate these terms, including repeated
            submission of content that violates our editorial guidelines.
          </p>

          <h2>Governing Law</h2>
          <p>These terms are governed by the laws of the State of Wisconsin, without regard to conflict-of-law principles.</p>

          <h2>Changes to These Terms</h2>
          <p>We may update these terms as the site evolves. Continued use of the site after changes constitutes acceptance of the updated terms.</p>

          <h2>Contact</h2>
          <p>Questions about these terms: <a href="mailto:info@tumnnews.com">info@tumnnews.com</a></p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
