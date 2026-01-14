import { Separator } from "@chakra-ui/react";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { OutlineIconButton } from "@/components/buttons/Button";
import PageContainer from "@/components/container/PageContainer";
import { ChatLinkIconButton } from "@/features/chat/components/ChatLink";
import JobDialogContent from "../components/JobDialogContent/JobDialogContent";
import useJob from "../hooks/useJob";

export default function JobPage() {
	const { jobId } = useParams<"jobId">();
	const navigate = useNavigate();
	const job = useJob({ jobId: Number(jobId) });
	return (
		<PageContainer
			toolbar={{
				title: "Job Details",
				toolbar: (
					<>
						{job.job ? <ChatLinkIconButton chatId={job.job.chatId} /> : null}
						<OutlineIconButton onClick={() => navigate(-1)}>
							<X />
						</OutlineIconButton>
					</>
				),
			}}
		>
			<JobDialogContent jobId={Number(jobId)} onSave={() => navigate(-1)} />
			<Separator />
		</PageContainer>
	);
}
