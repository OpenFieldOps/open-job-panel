import { useEffect, useLayoutEffect, useRef } from "react";

type UseChatScrollProps = {
  messages: unknown[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  chatId?: number;
};

export default function useChatScroll({
  messages,
  isLoading,
  hasMore,
  onLoadMore,
  chatId,
}: UseChatScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousScrollHeightRef = useRef<number>(0);
  const previousMessagesLengthRef = useRef(0);
  const isFirstLoadRef = useRef(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: isFirstLoadRef should reset on chatId change
  useEffect(() => {
    isFirstLoadRef.current = true;
    previousMessagesLengthRef.current = 0;
  }, [chatId]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const currentMessagesLength = messages.length;

    if (isFirstLoadRef.current && currentMessagesLength > 0 && !isLoading) {
      container.scrollTop = container.scrollHeight;
      isFirstLoadRef.current = false;
      previousMessagesLengthRef.current = currentMessagesLength;
      return;
    }

    if (currentMessagesLength > previousMessagesLengthRef.current) {
      if (previousScrollHeightRef.current > 0) {
        const newScrollHeight = container.scrollHeight;
        const scrollDiff = newScrollHeight - previousScrollHeightRef.current;
        container.scrollTop += scrollDiff;
        previousScrollHeightRef.current = 0;
      } else {
        const isNearBottom =
          container.scrollHeight -
            container.scrollTop -
            container.clientHeight <
          100;
        if (isNearBottom) {
          container.scrollTop = container.scrollHeight;
        }
      }
    }

    previousMessagesLengthRef.current = currentMessagesLength;
  }, [messages, isLoading]);

  const handleScroll = () => {
    if (!containerRef.current || isLoading || !hasMore) {
      return;
    }

    const { scrollTop } = containerRef.current;

    if (scrollTop < 50) {
      previousScrollHeightRef.current = containerRef.current.scrollHeight;
      onLoadMore();
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  return {
    containerRef,
    handleScroll,
    scrollToBottom,
  };
}
