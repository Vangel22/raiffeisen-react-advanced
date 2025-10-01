import React from "react";

interface WithAuthProps {
  isAuthenticated: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const withAuth = <T extends object>(
  Component: React.ComponentType<T>,
  redirectTo: string = "/login"
) => {
  return (props: T & WithAuthProps) => {
    const { isAuthenticated, user, ...restProps } = props;
    console.log(user);
    if (!isAuthenticated) {
      return (
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please log in to access this content.</p>
          <button onClick={() => (window.location.href = redirectTo)}>
            Go to Login
          </button>
          <div>
            <h4>Extra Props:</h4>
            <ul>
              {Object.entries(restProps).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {String(value)}
                </li>
              ))}
            </ul>
          </div>{" "}
        </div>
      );
    }

    return <Component {...(restProps as T)} />;
  };
};
