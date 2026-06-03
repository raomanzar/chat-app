import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { chatService } from "@/services/chat-service";

export const CHAT_KEYS = {
  all: ["chats"] as const,
  conversations: () => [...CHAT_KEYS.all, "discover"] as const,
  messages: (otherUserId: string) =>
    [...CHAT_KEYS.all, "messages", otherUserId] as const,
};

export const useGetConversations = () => {
  return useQuery({
    queryKey: CHAT_KEYS.conversations(),
    queryFn: () => chatService.getConversations(),
    staleTime: 1000 * 30,
  });
};

export const useGetMessages = (otherUserId: string) => {
  return useQuery({
    queryKey: CHAT_KEYS.messages(otherUserId),
    queryFn: () => chatService.getMessages(otherUserId),
    staleTime: 1000 * 60,
    enabled: !!otherUserId,
  });
};

export const useGetInfiniteMessages = (otherUserId: string) => {
  return useInfiniteQuery({
    queryKey: CHAT_KEYS.messages(otherUserId),
    queryFn: ({ pageParam }) =>
      chatService.getMessages(otherUserId, 50, pageParam),
    enabled: !!otherUserId,
    staleTime: 1000 * 60,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      messages: data.pages.flatMap((page) => page.messages),
    }),
  });
};

const useSendMessage = () => {
  return useMutation({
    mutationFn: ({
      receiverId,
      content,
    }: {
      receiverId: string;
      content: string;
    }) => chatService.sendMessage(receiverId, content),
  });
};
