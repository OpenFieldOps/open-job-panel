import { OutlineIconButton } from "@/components/buttons/Button";
import { MessageSquareText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ChatLinkIconButton({ chatId }: { chatId: number }) {
  const navigate = useNavigate();
  return (
    <OutlineIconButton
      w={"40px"}
      onClick={() => navigate(`/private/chat/${chatId}`)}
    >
      <MessageSquareText />
    </OutlineIconButton>
  );
}
