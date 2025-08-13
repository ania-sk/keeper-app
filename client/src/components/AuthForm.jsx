import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
function AuthForm({
  email,
  password,
  setEmail,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  formType,
  formMessage,
  onSubmit,
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
      </div>
      <button className="auth-button" type="submit">
        {formType}
      </button>
      <p className="auth-error">{formMessage}</p>
    </form>
  );
}
export default AuthForm;
