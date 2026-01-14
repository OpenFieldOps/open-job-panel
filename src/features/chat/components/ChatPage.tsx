import { Card, Heading, HStack, Spinner } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import PageContainer from "@/components/container/PageContainer";
import { useChats } from "../hooks/useChats";
import ChatInput from "./ChatInput";
import ChatMessages, { type ChatMessagesRef } from "./ChatMessages";

function useChatFromId(id: number) {
	const { data, isLoading } = useChats();

	if (isLoading) {
		return "loading";
	}

	return data?.data?.find((chat) => chat.id === id);
}

export default function ChatPanel() {
	const id = Number(useParams<{ id: string }>().id);

	const chat = useChatFromId(id);

	const chatMessagesRef = useRef<ChatMessagesRef>(null);

	if (chat === "loading") {
		return <Spinner />;
	}

	if (!chat) {
		return <Navigate to="/profile" />;
	}

	return (
		<ChatContainer>
			<Card.Header m={0} py={2}>
				<HStack justify="space-between" m={0} p={0}>
					<Heading size="lg">{chat.name}</Heading>
				</HStack>
			</Card.Header>

			<Card.Body
				display="flex"
				flexDirection="column"
				overflow="hidden"
				flex={1}
				py={0}
			>
				<ChatMessages ref={chatMessagesRef} chat={chat} />
			</Card.Body>
			<ChatInput chatId={chat.id} />
		</ChatContainer>
	);
}

function ChatContainer({ children }: PropsWithChildren) {
	return (
		<PageContainer>
			<Card.Root
				flex={1}
				w={"full"}
				h={"full"}
				bg="bg.subtle"
				display="flex"
				flexDirection="column"
			>
				{children}
			</Card.Root>
		</PageContainer>
	);
}
