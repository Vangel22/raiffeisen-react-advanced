import { withLoading } from "../hoc/withLoading";
import { withAuth } from "../hoc/withAuth";

interface ProfileProps {
  name: string;
  email: string;
}

const Profile = ({ name, email }: ProfileProps) => {
  return (
    <div>
      <h1>User profile</h1>
      <h1>{name}</h1>
      <p>{email}</p>
    </div>
  );
};

const EhnancedProfile = withAuth(withLoading(Profile));

export const ExampleThree = () => {
  return (
    <div>
      <EhnancedProfile
        isLoading={true}
        name="John Doe"
        email="john.doe@example.com"
        isAuthenticated={true}
        user={{ id: "1", name: "John Doe", email: "john.doe@example.com" }}
      />
    </div>
  );
};
