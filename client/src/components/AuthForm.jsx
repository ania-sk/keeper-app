function AuthForm({
  email,
  password,
  setEmail,
  setPassword,
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
        </div>
      </div>
      <button className="auth-button" type="submit">
        {formType}
      </button>
      <p>{formMessage}</p>
    </form>
  );
}
export default AuthForm;
