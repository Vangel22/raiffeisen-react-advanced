import { useRef } from "react";

// Controlled Form - using useState

export const ExampleTwo = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent the default form submission to refresh the page
    alert(`${emailRef.current?.value} ${passwordRef.current?.value}`);
  };

  // We are using forms for these two operations
  // Create - POST
  // Update - PUT

  return (
    <>
      <h1>Example Two</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <label htmlFor="email">Email</label>
        <input type="email" ref={emailRef} />
        <label htmlFor="password">Password</label>
        <input type="password" ref={passwordRef} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
