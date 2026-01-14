import { Flex, Spinner, Text } from "@chakra-ui/react";
import type { ChatModel } from "backend/modules/chat/ChatModel";
import { useAtom } from "jotai";
import { useImperativeHandle } from "react";
import { userAtom, useUserAuth } from "@/atoms/userAtom";
import { useWs } from "@/hooks/useWs";
import { apiClient } from "@/lib/apiClient";
import useChatScroll from "../hooks/useChatScroll";
import useMessages from "../hooks/useMessages";
import MessageItem from "./MessageItem";

type ChatMessagesProps = {
	chat: ChatModel.Chat;
	ref?: React.Ref<ChatMessagesRef>;
};

export type ChatMessagesRef = {
	scrollToBottom: () => void;
};

export default function ChatMessages({ chat, ref }: ChatMessagesProps) {
	const { messages, isLoading, hasMore, loadMore, addMessage } = useMessages(
		chat.id,
	);

	const currentUser = useUserAuth();

	const { containerRef, handleScroll, scrollToBottom } = useChatScroll({
		messages,
		isLoading,
		hasMore,
		onLoadMore: loadMore,
		chatId: chat.id,
	});

	useImperativeHandle(ref, () => ({
		scrollToBottom,
	}));

	const token = useAtom(userAtom)[0]?.token as string;

	useWs(
		() =>
			apiClient.chat["new-message"].subscribe({
				query: {
					token,
					chatId: chat.id,
				},
			}),
		(payload: ChatModel.MessageWithFiles) => {
			addMessage(payload);
			scrollToBottom();
		},
	);

	if (!currentUser) {
		return (
			<Flex
				direction="column"
				gap={4}
				overflowY="auto"
				flex={1}
				p={4}
				justify="center"
				align="center"
			>
				<Text>User not authenticated</Text>
			</Flex>
		);
	}

	return (
		<Flex
			ref={containerRef}
			direction="column"
			gap={2}
			overflowY="auto"
			flex={1}
			minH={0}
			maxH={{
				md: "65vh",
				base: "55vh",
			}}
			px={{
				md: 52,
				base: 0,
			}}
			p={4}
			onScroll={handleScroll}
		>
			{isLoading && hasMore && (
				<Flex justify="center" py={2}>
					<Spinner size="sm" />
				</Flex>
			)}

			{!hasMore && messages.length > 0 && (
				<Flex justify="center" py={2}>
					<Text fontSize="sm" color="gray.500">
						Beginning of conversation
					</Text>
				</Flex>
			)}

			{messages.map((message, index) => (
				<MessageItem
					key={message.id}
					message={message}
					isOwnMessage={message.userId === currentUser.id}
					onImageLoad={
						index === messages.length - 1 ? scrollToBottom : undefined
					}
				/>
			))}

			{messages.length === 0 && !isLoading && (
				<Flex justify="center" align="center" flex={1}>
					<Text color="gray.500">No messages</Text>
				</Flex>
			)}
		</Flex>
	);
}
