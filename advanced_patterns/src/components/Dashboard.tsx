interface DashboardProps {
  title: string;
}

export const Dashboard = ({ title }: DashboardProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Welocme to your dashboard</p>
    </div>
  );
};
