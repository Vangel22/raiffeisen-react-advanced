import { Suspense, Component, type ReactNode } from "react";
import UserList from "./UserList";
import { userResourceManager } from "./UserResource";

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class UserErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("UserErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    userResourceManager.clearCache();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            border: "2px solid #dc3545",
            borderRadius: "8px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
          }}
        >
          <h2 style={{ color: "#721c24", marginTop: "0" }}>
            ⚠️ Error Loading Users
          </h2>
          <p>
            {this.state.error?.message ||
              "Something went wrong while fetching users."}
          </p>
          <button
            onClick={this.handleRetry}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function UserDataFetcher() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#1f1f1f",
        minHeight: "100vh",
      }}
    >
      <div style={{ padding: "20px" }}>
        <h1 style={{ color: "white" }}>Data Fetching with Suspense</h1>
        <p style={{ color: "#ccc", marginBottom: "20px" }}>
          This component demonstrates how to use Suspense with data fetching.
          The users are loaded from the JSONPlaceholder API.
        </p>
      </div>

      <UserErrorBoundary>
        <Suspense
          fallback={
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                border: "2px dashed #007bff",
                borderRadius: "8px",
                backgroundColor: "#2a2a2a",
                margin: "20px",
                color: "white",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>
                🔄 Loading users...
              </div>
              <div style={{ color: "#ccc" }}>
                Fetching data from JSONPlaceholder API
              </div>
            </div>
          }
        >
          <UserList />
        </Suspense>
      </UserErrorBoundary>

      <div
        style={{
          margin: "20px",
          padding: "15px",
          backgroundColor: "#2a2a2a",
          borderRadius: "4px",
          fontSize: "14px",
          color: "white",
        }}
      >
        <h4 style={{ color: "white" }}>What's happening:</h4>
        <ul style={{ margin: "10px 0", paddingLeft: "20px", color: "white" }}>
          <li>
            Data is fetched from{" "}
            <code
              style={{
                backgroundColor: "#444",
                padding: "2px 4px",
                borderRadius: "3px",
              }}
            >
              https://jsonplaceholder.typicode.com/users
            </code>
          </li>
          <li>Suspense shows fallback while the API call is in progress</li>
          <li>Error Boundary catches and handles any fetch errors</li>
          <li>Data is cached to prevent unnecessary re-fetches</li>
          <li>Users can retry if an error occurs</li>
        </ul>
      </div>
    </div>
  );
}
