import Dashboard from "@/features/dashboard/components/Dashboard";
import DashboardIncomeStatistics from "../components/DashboardIncomeStatistics";
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
			<DashboardJobsBlock
				title="Jobs without applicants"
				query={{
					broadcast: true,
				}}
			/>
			<DashboardOperatorsBlock title="Operators" />

			<DashboardIncomeStatistics />
		</Dashboard>
	);
}
