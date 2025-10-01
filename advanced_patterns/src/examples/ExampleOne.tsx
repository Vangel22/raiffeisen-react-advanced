import { ProtectedDashboard } from "../components/ProtectedDashboard";

export const ExampleOne = () => {
  return (
    <div>
      <ProtectedDashboard
        title="Protected Dashboard"
        isAuthenticated={false}
        user={{
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
        }}
      />
    </div>
  );
};
