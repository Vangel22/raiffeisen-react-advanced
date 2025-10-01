import { withLoading } from "../hoc/withLoading";

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

export const ExampleTwo = withLoading(Profile);
