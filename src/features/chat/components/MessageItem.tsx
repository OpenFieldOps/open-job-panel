import { Box, Flex, Image, Text } from "@chakra-ui/react";
import type { ChatModel } from "backend/modules/chat/ChatModel";
import useUser from "@/features/admin/hooks/useUser";
import { UserAvatar } from "@/features/user/components/UserAvatar";

type MessageItemProps = {
	message: ChatModel.MessageWithFiles;
	isOwnMessage: boolean;
	onImageLoad?: () => void;
};

export default function MessageItem({
	message,
	isOwnMessage,
	onImageLoad,
}: MessageItemProps) {
	const user = useUser("any", message.userId);

	return (
		<Flex
			w="100%"
			justify={isOwnMessage ? "flex-end" : "flex-start"}
			mb={3}
			gap={2}
		>
			{!isOwnMessage && user && (
				<Flex direction="column" align="center" gap={1}>
					<UserAvatar userInfo={user} size="sm" />
					<Text fontSize="xs" fontWeight="medium" color="gray.600">
						{user.firstName}
					</Text>
				</Flex>
			)}
			<Flex direction="column" maxW="70%" gap={1}>
				<Box
					bg={isOwnMessage ? "blue.500" : "gray.100"}
					color={isOwnMessage ? "white" : "black"}
					px={3}
					py={2}
					borderRadius="lg"
					boxShadow="sm"
				>
					{message.files && message.files.length > 0 && (
						<Flex direction="column" gap={2} mt={message.text ? 2 : 0}>
							{message.files.map((file) => (
								<Image
									key={file.id}
									src={file.fileName}
									alt="Attachment"
									maxW="400px"
									maxH="300px"
									borderRadius="md"
									objectFit="cover"
									onLoad={onImageLoad}
								/>
							))}
						</Flex>
					)}
					{message.text && (
						<Text fontSize="sm" whiteSpace="pre-wrap" wordBreak="break-word">
							{message.text}
						</Text>
					)}
					<Text
						fontSize="xs"
						opacity={0.7}
						mt={1}
						textAlign={isOwnMessage ? "right" : "left"}
					>
						{new Date(message.createdAt).toLocaleTimeString("en-US", {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</Text>
				</Box>
			</Flex>
			{isOwnMessage && user && (
				<Flex direction="column" align="center" gap={1}>
					<UserAvatar userInfo={user} size="sm" />
					<Text fontSize="xs" fontWeight="medium" color="gray.600">
						{user.firstName}
					</Text>
				</Flex>
			)}
		</Flex>
	);
}
