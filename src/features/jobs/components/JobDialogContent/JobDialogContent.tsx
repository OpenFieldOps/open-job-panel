import { Box, Button, Heading, HStack, Tabs, VStack } from "@chakra-ui/react";
import { Edit, Eye, Folder, SquareCheck, Users } from "lucide-react";
import { useUserIs } from "@/atoms/userAtom";
import { OnDesktop } from "@/components/container/OnMobile";
import { ChatLinkIconButton } from "@/features/chat/components/ChatLink";
import { WithRole } from "@/features/guard/WithRole";
import OperatorJobEditForm from "@/features/operator/components/OperatorJobEdit";
import useJob from "../../hooks/useJob";
import { JobEditForm } from "../JobEditForm";
import { JobDialogAssignementTab } from "./tabs/JobDialogAssignmentTab";
import { JobDialogDocumentsTab } from "./tabs/JobDialogDocumentsTab";
import { JobDialogTasksTab } from "./tabs/JobDialogTaskTab";

type JobDialogContantProps = {
	jobId: number;
	onSave: () => void;
};

export default function JobDialogContent({
	jobId,
	onSave,
}: JobDialogContantProps) {
	const { job, isLoading } = useJob({ jobId });

	const isBroadcast = job?.broadcast === true;
	const isAdmin = useUserIs("admin");

	if (isLoading) {
		return null;
	}

	if (!job) {
		return (
			<VStack>
				<Heading size="lg" textAlign={"center"} mb={4}>
					Job Deleted
				</Heading>
				<Button
					onClick={() => {
						onSave();
					}}
				>
					Close
				</Button>
			</VStack>
		);
	}

	return (
		<>
			<OnDesktop>
				<HStack justifyContent={"space-between"} w={"full"} mb={2}>
					{!isBroadcast ? <ChatLinkIconButton chatId={job.chatId} /> : null}
					<Heading size="lg" textAlign={"center"}>
						Job Details
					</Heading>
					<Box w={"40px"} />
				</HStack>
			</OnDesktop>
			<Tabs.Root lazyMount defaultValue="edit" w={"full"}>
				<Tabs.List justifyContent={"center"}>
					<Tabs.Trigger value="edit">
						{isBroadcast ? (
							<>
								<Eye />
								View
							</>
						) : (
							<>
								<Edit />
								Edit
							</>
						)}
					</Tabs.Trigger>
					{!isBroadcast || isAdmin ? (
						<>
							<WithRole.admin>
								<Tabs.Trigger value="assignment">
									<Users />
									Assignments
								</Tabs.Trigger>
							</WithRole.admin>
							<Tabs.Trigger value="documents">
								<Folder />
								Documents
							</Tabs.Trigger>
							<Tabs.Trigger value="tasks">
								<SquareCheck />
								Tasks
							</Tabs.Trigger>
						</>
					) : null}
				</Tabs.List>
				<Tabs.Content value="edit" justifyContent={"center"} w={"full"}>
					<WithRole.admin>
						<JobEditForm job={job} onSave={onSave} />
					</WithRole.admin>

					<WithRole.operator>
						<OperatorJobEditForm jobId={jobId} onSave={onSave} />
					</WithRole.operator>
				</Tabs.Content>
				<Tabs.Content value="assignment">
					<WithRole.admin>
						<JobDialogAssignementTab jobId={jobId} />
					</WithRole.admin>
				</Tabs.Content>
				<Tabs.Content value="documents">
					<JobDialogDocumentsTab jobId={jobId} />
				</Tabs.Content>
				<Tabs.Content value="tasks">
					<JobDialogTasksTab jobId={jobId} />
				</Tabs.Content>
			</Tabs.Root>
		</>
	);
}
