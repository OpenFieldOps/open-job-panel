import Dashboard from "@/features/dashboard/components/Dashboard";
import DashboardJobsBlock from "../components/DashboardJobsBlock";
import DashboardOperatorsBlock from "../components/DashboardOperatorsBlock";

export default function AdminDashboard() {
  return (
    <Dashboard>
      <DashboardJobsBlock
        title="Jobs in progress"
        query={{
          status: "inProgress",
        }}
      />
      <DashboardJobsBlock
        title="Jobs in pending"
        query={{
          status: "pending",
        }}
      />
      <DashboardOperatorsBlock title="Operators" />
    </Dashboard>
  );
}
