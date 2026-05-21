import Header from "../Header";
import Footer from "../Footer";

function TermsOfService() {
  return (
    <div>
      <Header />
      <div className="legal-page">
        <div className="legal-container">
          <h1>Terms of Service</h1>
          <span className="legal-updated">Last updated: May 21, 2025</span>

          <h2>1. About the Application</h2>
          <p>
            Keeper App is a personal note-taking application with an AI-powered
            chatbot assistant. It is developed and maintained by Ania-Sk as a
            portfolio project. The service is provided free of charge, without
            any guarantees of uptime or continuity.
          </p>

          <h2>2. Acceptance of Terms</h2>
          <p>
            By registering an account and using Keeper App, you confirm that you
            have read, understood, and agreed to these Terms of Service and our{" "}
            <a href="/privacy-policy">Privacy Policy</a>. If you do not agree,
            please do not use the application.
          </p>

          <h2>3. Eligibility</h2>
          <p>
            You must be at least <strong>16 years old</strong> to use Keeper
            App, in accordance with Article 8 of the GDPR. By registering, you
            confirm that you meet this requirement.
          </p>

          <h2>4. User Account</h2>
          <ul>
            <li>
              You are responsible for maintaining the confidentiality of your
              password and account credentials.
            </li>
            <li>
              You are responsible for all activity that occurs under your
              account.
            </li>
            <li>
              You must provide accurate information during registration. Using
              false or misleading data is not permitted.
            </li>
            <li>You may create only one account per person.</li>
          </ul>

          <h2>5. Acceptable Use</h2>
          <p>You agree not to use Keeper App to:</p>
          <ul>
            <li>Store or share illegal, harmful, or offensive content</li>
            <li>
              Attempt to gain unauthorized access to other users' accounts or
              the application's infrastructure
            </li>
            <li>
              Reverse engineer, decompile, or otherwise attempt to extract the
              application's source code
            </li>
            <li>
              Use automated tools (bots, scrapers) to interact with the
              application
            </li>
            <li>Violate any applicable laws or regulations</li>
          </ul>

          <h2>6. AI Chatbot (Keeper Bot)</h2>
          <p>
            Keeper Bot is powered by{" "}
            <a
              href="https://groq.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Groq AI
            </a>
            . By using the chatbot, you acknowledge that:
          </p>
          <ul>
            <li>
              Messages and note content sent to the chatbot are processed by
              Groq's servers, which may be located outside the European Union
            </li>
            <li>
              AI responses are generated automatically and may be inaccurate,
              incomplete, or misleading — always verify important information
            </li>
            <li>
              We are not responsible for decisions made based on chatbot
              responses
            </li>
          </ul>

          <h2>7. Availability and Changes</h2>
          <p>
            Keeper App is a portfolio project provided on an{" "}
            <strong>"as is"</strong> basis. We do not guarantee:
          </p>
          <ul>
            <li>Continuous, uninterrupted access to the service</li>
            <li>That the service will be free of errors or bugs</li>
            <li>Long-term availability of the application or your data</li>
          </ul>
          <p>
            We reserve the right to modify, suspend, or discontinue the
            application at any time without prior notice. In the event of
            shutdown, we will make reasonable efforts to notify registered users
            via email.
          </p>

          <h2>8. Intellectual Property</h2>
          <p>
            The application's code, design, and content are the intellectual
            property of Ania-Sk. Notes and content created by users remain the
            property of their respective authors. By using the service, you do
            not transfer any intellectual property rights to us.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, Ania-Sk shall not
            be liable for any indirect, incidental, or consequential damages
            arising from your use of Keeper App, including loss of data.
          </p>
          <p>
            You use this application at your own risk. We strongly recommend
            keeping backups of any important notes.
          </p>

          <h2>10. Account Deletion</h2>
          <p>
            You may request deletion of your account and all associated data at
            any time by contacting us at{" "}
            <a href="mailto:as.tamashi@gmail.com">as.tamashi@gmail.com</a>. We
            will process your request within 30 days. See our{" "}
            <a href="/privacy-policy">Privacy Policy</a> for details on data
            retention.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms of Service are governed by the laws of{" "}
            <strong>Poland</strong> and the European Union, including the
            General Data Protection Regulation (GDPR). Any disputes shall be
            subject to the jurisdiction of Polish courts.
          </p>

          <h2>12. Changes to These Terms</h2>
          <p>
            We may update these Terms of Service from time to time. Continued
            use of the application after changes are posted constitutes
            acceptance of the updated terms. The date of the last update is
            always shown at the top of this page.
          </p>

          <h2>13. Contact</h2>
          <p>
            For any questions regarding these Terms, please contact:{" "}
            <a href="mailto:as.tamashi@gmail.com">as.tamashi@gmail.com</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TermsOfService;
