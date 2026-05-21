import Header from "../Header";
import Footer from "../Footer";

function PrivacyPolicy() {
  return (
    <div>
      <Header />
      <div className="legal-page">
        <div className="legal-container">
          <h1>Privacy Policy</h1>
          <span className="legal-updated">Last updated: May 21, 2025</span>

          <h2>1. Administrator of Personal Data</h2>
          <p>
            The administrator of your personal data is Ania-Sk, reachable at{" "}
            <a href="mailto:as.tamashi@gmail.com">as.tamashi@gmail.com</a>.
          </p>
          <p>
            Keeper App is a personal portfolio project. If you have any
            questions about how your data is processed, please contact the
            administrator directly.
          </p>

          <h2>2. What Data We Collect</h2>
          <p>When you use Keeper App, we collect the following data:</p>
          <ul>
            <li>
              <strong>Email address</strong> — used to create and identify your
              account
            </li>
            <li>
              <strong>Username</strong> — displayed within the application
            </li>
            <li>
              <strong>Password</strong> — stored in hashed form (bcrypt); we
              never store your plain-text password
            </li>
            <li>
              <strong>Notes</strong> — titles and content of notes you create
            </li>
            <li>
              <strong>Chat messages</strong> — messages you send to Keeper Bot
              exist only in your browser session memory and are never stored in
              our database; they are permanently lost when you close or refresh
              the page
            </li>
          </ul>

          <h2>3. Legal Basis for Processing</h2>
          <p>
            Your data is processed on the basis of{" "}
            <strong>Article 6(1)(b) GDPR</strong> — processing is necessary for
            the performance of a contract (providing the service). By
            registering an account, you enter into an agreement to use the
            application.
          </p>

          <h2>4. Purpose of Processing</h2>
          <ul>
            <li>Creating and managing your user account</li>
            <li>Storing and displaying your notes</li>
            <li>Providing AI-powered suggestions via the chatbot</li>
            <li>Securing access to your data through authentication (JWT)</li>
          </ul>

          <h2>5. Data Processors (Third Parties)</h2>
          <p>
            Your data may be processed by the following third-party service
            providers acting as data processors:
          </p>
          <ul>
            <li>
              <strong>DigitalOcean LLC</strong> (USA) — cloud hosting and
              PostgreSQL database. DigitalOcean is certified under the EU–US
              Data Privacy Framework and provides a Data Processing Agreement.
              See their{" "}
              <a
                href="https://www.digitalocean.com/legal/data-processing-agreement"
                target="_blank"
                rel="noopener noreferrer"
              >
                DPA
              </a>
              .
            </li>
            <li>
              <strong>Groq, Inc.</strong> (USA) — AI inference engine powering
              Keeper Bot. When you use the chatbot, your messages and associated
              note content are sent to Groq's servers located in the United
              States. This constitutes a transfer of personal data to a third
              country. By accepting the chatbot notice, you explicitly consent
              to this transfer. See Groq's{" "}
              <a
                href="https://groq.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              .
            </li>
          </ul>
          <p>
            We do not sell, rent, or share your personal data with any other
            third parties.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            Your data is retained for as long as your account exists. When you
            delete your account, all associated data — including your email,
            username, and notes — is permanently deleted from our database. Chat
            messages are never stored — neither in our database nor on our
            servers. They exist solely in your browser's memory for the duration
            of the session.
          </p>

          <h2>7. Your Rights Under GDPR</h2>
          <p>As a data subject, you have the right to:</p>
          <ul>
            <li>
              <strong>Access</strong> — request a copy of the personal data we
              hold about you (Art. 15)
            </li>
            <li>
              <strong>Rectification</strong> — correct inaccurate data (Art. 16)
            </li>
            <li>
              <strong>Erasure</strong> — request deletion of your account and
              all associated data (Art. 17)
            </li>
            <li>
              <strong>Data portability</strong> — receive your data in a
              structured, machine-readable format (Art. 20)
            </li>
            <li>
              <strong>Objection</strong> — object to processing in certain
              circumstances (Art. 21)
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:as.tamashi@gmail.com">as.tamashi@gmail.com</a>. We
            will respond within 30 days.
          </p>
          <p>
            You also have the right to lodge a complaint with the Polish
            supervisory authority:{" "}
            <strong>Urząd Ochrony Danych Osobowych (UODO)</strong>,{" "}
            <a
              href="https://uodo.gov.pl"
              target="_blank"
              rel="noopener noreferrer"
            >
              uodo.gov.pl
            </a>
            .
          </p>

          <h2>8. Cookies and Local Storage</h2>
          <p>
            Keeper App does not use tracking cookies or analytics tools. We
            store a <strong>JWT authentication token</strong> in your browser's{" "}
            <code>localStorage</code> solely to keep you logged in. This token
            expires after 4 hours. No advertising or profiling cookies are used.
          </p>

          <h2>9. Data Security</h2>
          <p>
            We apply appropriate technical measures to protect your data,
            including:
          </p>
          <ul>
            <li>Password hashing with bcrypt</li>
            <li>JWT-based authentication with expiry</li>
            <li>HTTPS encryption in transit</li>
            <li>Access control — each user can only access their own notes</li>
          </ul>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected on this page with an updated date. We encourage
            you to review this page periodically.
          </p>

          <h2>11. Contact</h2>
          <p>
            For any privacy-related questions or requests, please contact:{" "}
            <a href="mailto:as.tamashi@gmail.com">as.tamashi@gmail.com</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
