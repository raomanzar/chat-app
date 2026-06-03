import { authClient } from "@/lib/auth-client";
const API_URL = `http://${process.env.EXPO_PUBLIC_BASE_URL}:4000/api/chat`;

export const getheaders = () => {
  const cookie = authClient.getCookie();
  return {
    "content-type": "application/json",
    ...(cookie ? { Cookie: cookie } : {}),
  };
};

interface Message {
  id: String;
  senderId: String;
  receiverId: String;
  content: String;
  isRead: Boolean;
  createdAt: String;
}

interface chatMessage {
  id: String;
  name: String;
  image: String;
  lastMessage: Message | null;
  unreadCount: number;
}

export const chatService = {
  sendMessage: async (receiverId: string, content: string) => {
    const headers = getheaders();
    const response = await fetch(`${API_URL}/send`, {
      method: "POST",
      headers,
      body: JSON.stringify({ receiverId, content }),
    });
    const data = await response.clone().json();
    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    return data;
  },
  getMessages: async (otherUserId: string, limit?: number, cursor?: number) => {
    const headers = getheaders();
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (cursor) params.append("cursor", cursor.toString());
    const queryString = params.toString();
    const response = await fetch(
      `${API_URL}/messages/${otherUserId}?${queryString ? `?${queryString}` : ""}`,
      {
        method: "GET",
        headers,
      },
    );
    const data = await response.clone().json();
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    return data;
  },
  markMessageAsRead: async (senderId: string) => {
    const headers = getheaders();
    const response = await fetch(`${API_URL}/markRead`, {
      method: "POST",
      headers,
      body: JSON.stringify({ senderId }),
    });
    const data = await response.clone().json();
    if (!response.ok) {
      throw new Error("Failed to mark message as read");
    }
    return data;
  },
  getConversations: async () => {
    const headers = getheaders();
    const response = await fetch(`${API_URL}/conversations`, {
      method: "GET",
      headers,
    });
    const data = await response.clone().json();
    if (!response.ok) {
      throw new Error("Failed to fetch conversations");
    }
    return data;
  },
};
