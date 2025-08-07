function AuthForm({ email, password, setEmail, setPassword }) {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="example@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
    </div>
  );
}
export default AuthForm;
