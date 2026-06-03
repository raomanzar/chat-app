import { authClient } from "@/lib/auth-client";
const API_URL = `http://${process.env.EXPO_PUBLIC_BASE_URL}:4000/api/friend`;

export const getheaders = () => {
  const cookie = authClient.getCookie();
  return {
    "content-type": "application/json",
    ...(cookie ? { Cookie: cookie } : {}),
  };
};

export const friendService = {
  discoverUsers: async (query: string) => {
    const headers = getheaders();
    const response = await fetch(
      `${API_URL}/discover?search=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers,
      },
    );
    let data;
    try {
      data = await response.clone().json();
    } catch (error) {
      data = await response.json();
    }
    if (!response.ok) {
      throw new Error(data?.message || "Failed to discover users");
    }
    return data;
  },
  getFriends: async () => {
    const headers = getheaders();
    const response = await fetch(`${API_URL}/friendList`, {
      method: "GET",
      headers,
    });
    let data;
    try {
      data = await response.clone().json();
    } catch (error) {
      data = await response.json();
    }
    if (!response.ok) {
      throw new Error(data?.message || "Failed to discover users");
    }
    return data;
  },
  sendFriendRequest: async (receiverId: string) => {
    const headers = getheaders();
    const response = await fetch(`${API_URL}/request`, {
      method: "POST",
      headers,
      body: JSON.stringify({ receiverId }),
    });
    let data;
    try {
      data = await response.clone().json();
    } catch (error) {
      data = await response.json();
    }
    if (!response.ok) {
      throw new Error(data?.message || "Failed to discover users");
    }
    return data;
  },
  acceptFriendRequest: async (requestId: string) => {
    const headers = getheaders();
    const response = await fetch(`${API_URL}/request/${requestId}/accept`, {
      method: "POST",
      headers,
    });
    let data;
    try {
      data = await response.clone().json();
    } catch (error) {
      data = await response.json();
    }
    if (!response.ok) {
      throw new Error(data?.message || "Failed to discover users");
    }
    return data;
  },
  rejectFriendRequest: async (requestId: string) => {
    const headers = getheaders();
    const response = await fetch(`${API_URL}/request/${requestId}/reject`, {
      method: "POST",
      headers,
    });
    let data;
    try {
      data = await response.clone().json();
    } catch (error) {
      data = await response.json();
    }
    if (!response.ok) {
      throw new Error(data?.message || "Failed to discover users");
    }
    return data;
  },
  cancelFriendRequest: async (requestId: string) => {
    const headers = getheaders();
    const response = await fetch(`${API_URL}/request/${requestId}/cancel`, {
      method: "POST",
      headers,
    });
    let data;
    try {
      data = await response.clone().json();
    } catch (error) {
      data = await response.json();
    }
    if (!response.ok) {
      throw new Error(data?.message || "Failed to discover users");
    }
    return data;
  },
};
