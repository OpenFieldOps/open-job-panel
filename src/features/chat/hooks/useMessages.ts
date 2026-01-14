import { useQuery } from "@tanstack/react-query";
import type { ChatModel } from "backend/modules/chat/ChatModel";
import { useCallback, useEffect, useRef, useState } from "react";
import { QueryCacheKey } from "@/app/queryClient";
import { apiClient } from "@/lib/apiClient";

export default function useMessages(chatId: number) {
  const [page, setPage] = useState(1);
  const [allMessages, setAllMessages] = useState<ChatModel.MessageWithFiles[]>(
    []
  );
  const previousChatIdRef = useRef(chatId);

  const { data, isLoading } = useQuery({
    queryKey: [QueryCacheKey.Chat, chatId, page],
    queryFn: async () =>
      await apiClient.chat({ chatId }).messages.get({
        query: {
          page,
          limit: 10,
        },
      }),
  });

  const addMessage = useCallback((message: ChatModel.MessageWithFiles) => {
    setAllMessages((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    if (previousChatIdRef.current !== chatId) {
      setPage(1);
      setAllMessages([]);
      previousChatIdRef.current = chatId;
    }
  });

  useEffect(() => {
    if (data?.data?.messages) {
      const newMessages = [...data.data.messages].reverse();

      if (page === 1) {
        setAllMessages(newMessages);
      } else {
        setAllMessages((prev) => [...newMessages, ...prev]);
      }
    }
  }, [data, page]);

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return {
    messages: allMessages,
    isLoading,
    loadMore,
    hasMore: (data?.data?.totalPages || 1) > page,
    addMessage,
  };
}
