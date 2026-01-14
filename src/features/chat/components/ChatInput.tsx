import {
	Card,
	FileUpload,
	Flex,
	Float,
	IconButton,
	InputGroup,
	Textarea,
	useFileUpload,
} from "@chakra-ui/react";
import { LucideX, Paperclip, SendHorizonal } from "lucide-react";
import { type KeyboardEvent, useRef } from "react";
import { OutlineIconButton } from "@/components/buttons/Button";
import { apiClient } from "@/lib/apiClient";

const INPUT_HEIGHT = 120;

async function sendMessage(
	chatId: number,
	content: string,
	files: File[] = [],
) {
	return await apiClient.chat({ chatId }).message.post({
		text: content,
		files,
	});
}

type ChatInputProps = {
	chatId: number;
};

export default function ChatInput({ chatId }: ChatInputProps) {
	const inputRef = useRef<HTMLTextAreaElement>(null);

	const filesUpload = useFileUpload({
		maxFiles: 5,
		accept: ["image/jpeg", "image/png", "image/webp"],
	});

	const onSend = async () => {
		const message = inputRef.current?.value;
		if (!message?.trim() && filesUpload.acceptedFiles.length === 0) {
			return;
		}

		if (inputRef.current) {
			inputRef.current.value = "";
		}

		filesUpload.clearFiles();
		sendMessage(chatId, message || "", filesUpload.acceptedFiles);
	};

	const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSend();
		}
	};

	return (
		<FileUpload.RootProvider value={filesUpload}>
			<Flex
				gap={2}
				px={6}
				w={"full"}
				flexWrap={"wrap"}
				minH={"75px"}
				maxH={"75px"}
				mt={"-75px"}
			>
				<FileUpload.ItemGroup display={"flex"} flexDirection={"row"} w={"full"}>
					{filesUpload.acceptedFiles.map((file) => (
						<FileUpload.Item boxSize="20" p="2" file={file} key={file.name}>
							<FileUpload.ItemPreviewImage />
							<Float placement="top-end">
								<FileUpload.ItemDeleteTrigger
									boxSize="4"
									layerStyle="fill.solid"
									borderRadius={2}
								>
									<LucideX />
								</FileUpload.ItemDeleteTrigger>
							</Float>
						</FileUpload.Item>
					))}
				</FileUpload.ItemGroup>
			</Flex>

			<Card.Footer w={"full"}>
				<InputGroup
					endElement={
						<Flex
							gap={2}
							transform={`translateY(calc(${INPUT_HEIGHT / 2 - 10}px - 50%))`}
						>
							<FileUpload.HiddenInput />
							<FileUpload.Trigger asChild>
								<OutlineIconButton size={"sm"}>
									<Paperclip />
								</OutlineIconButton>
							</FileUpload.Trigger>

							<IconButton size={"sm"} onClick={onSend}>
								<SendHorizonal />
							</IconButton>
						</Flex>
					}
				>
					<Textarea
						ref={inputRef}
						fontSize={16}
						resize={"none"}
						h={`${INPUT_HEIGHT}px`}
						placeholder="Send a chat"
						onKeyDown={onKeyDown}
					/>
				</InputGroup>
			</Card.Footer>
		</FileUpload.RootProvider>
	);
}
