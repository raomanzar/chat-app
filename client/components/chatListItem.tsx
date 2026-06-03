import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/colors";

const formatTime = (timestamp?: string) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "";
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  if (sameDay) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

interface Conversation {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  lastMessage?: {
    content?: string;
    createdAt?: string;
  } | null;
  unreadCount?: number;
}

const ChatListItem = ({ item }: { item: Conversation }) => {
  const router = useRouter();
  const hasUnread = (item.unreadCount ?? 0) > 0;

  const avatarUri =
    item.image ||
    `https://api.dicebear.com/9.x/initials/png?seed=${encodeURIComponent(item.name)}`;

  return (
    <TouchableOpacity
      style={styles.chatItem}
      activeOpacity={0.7}
      onPress={() => router.push(``)}
    >
      <Image source={{ uri: avatarUri }} style={styles.avatar} />
      ``
      <View style={styles.chatInfo}>
        <View style={styles.chatTopRow}>
          <Text style={styles.chatName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.chatTime}>
            {formatTime(item.lastMessage?.createdAt)}
          </Text>
        </View>
        <View style={styles.chatBottomRow}>
          <Text
            style={[styles.chatPreview, hasUnread && styles.chatPreviewUnread]}
            numberOfLines={1}
          >
            {item.lastMessage?.content ?? "No messages yet"}
          </Text>
          {hasUnread && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
    backgroundColor: Colors.card,
  },
  chatInfo: {
    flex: 1,
  },
  chatTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginRight: 8,
  },
  chatTime: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  chatBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  chatPreview: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    marginRight: 8,
  },
  chatPreviewUnread: {
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.background,
  },
});
