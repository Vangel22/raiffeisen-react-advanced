export default function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // fake login
    const success = Math.random() < 0.5 ? true : false;

    if (success) {
      alert("Login successful");
    }
    {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
