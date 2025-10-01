import { Dashboard } from "./Dashboard";
import { withAuth } from "../hoc/withAuth";

export const ProtectedDashboard = withAuth(Dashboard, "/login");
