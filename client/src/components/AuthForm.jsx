import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";

function AuthForm({
  email,
  username,
  password,
  setEmail,
  setPassword,
  setUsername,
  confirmPassword,
  setConfirmPassword,
  formType,
  formMessage,
  onSubmit,
  consentChecked,
  setConsentChecked,
}) {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2>{formType}</h2>
      <div className="auth-content">
        <div className="auth-box email">
          <label htmlFor="email">Email</label>
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="example@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <AlternateEmailIcon className="auth-icon" />
        </div>
        {formType === "Register" && (
          <div className="auth-box">
            <label htmlFor="user-name">Username</label>
            <input
              className="auth-input"
              type="text"
              name="user-name"
              placeholder="your name"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <SentimentSatisfiedAltRoundedIcon className="auth-icon" />
          </div>
        )}
        <div className="auth-box">
          <label htmlFor="password">Password</label>
          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <KeyIcon className="auth-icon" />
        </div>
        {formType === "Register" && (
          <div className="auth-box">
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              className="auth-input"
              type="password"
              name="confirm-password"
              placeholder="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
            <KeyIcon className="auth-icon" />
          </div>
        )}

        {formType === "Register" && (
          <div className="auth-box consent-box">
            <label className="consent-label">
              <input
                type="checkbox"
                className="consent-checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
              />
              <span>
                I have read and accept the{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>
                . I understand that my data (email, notes, chat messages) will
                be processed to provide the service, including by Groq AI.
              </span>
            </label>
          </div>
        )}
      </div>

      <button className="auth-button" type="submit">
        {formType}
      </button>
      <p className="auth-error">{formMessage}</p>
    </form>
  );
}

export default AuthForm;
