import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { useAuth } from "@/contexts/auth-context";
import { useFriends } from "@/hooks/useFriendQueries";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const Profile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();
  const { data: friends } = useFriends();
  const friendCount = Array.isArray(friends) ? friends.length : 0;

  const handleFriendChat = (friendId: string) => {
    router.push(`/chats/${friendId}`);
  };

  const handleSignOut = () => {
    queryClient.clear();
    signOut();
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const name = user?.name ?? "Guest";
  const email = user?.email ?? "Not signed in";
  const avatarUri =
    user?.image ??
    `https://api.dicebear.com/9.x/initials/png?seed=${encodeURIComponent(name)}`;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
          <View style={styles.onlineDot} />
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>

        {/* <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
            <Ionicons name="create-outline" size={16} color={Colors.primary} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity> */}
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{friendCount}</Text>
          <Text style={styles.statLabel}>Friends</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: Colors.online }]}>
            Online
          </Text>
          <Text style={styles.statLabel}>Status</Text>
        </View>
      </View>

      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <View style={styles.friendInfo}>
              <Image
                source={{
                  uri:
                    item.image ||
                    `https://api.dicebear.com/9.x/initials/png?seed=${encodeURIComponent(item.name)}`,
                }}
                style={styles.friendAvatar}
              />
              <Text style={styles.friendName} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
            <Pressable onPress={() => handleFriendChat(item.id)}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={22}
                color={Colors.primary}
              />
            </Pressable>
          </View>
        )}
      />

      {/* Sign out */}
      <TouchableOpacity
        style={styles.signOutButton}
        activeOpacity={0.8}
        onPress={handleSignOut}
      >
        <Ionicons name="log-out-outline" size={20} color={Colors.error} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  // Header
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 14,
  },
  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 3,
    borderColor: Colors.primary,
    backgroundColor: Colors.card,
  },
  onlineDot: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.online,
    borderWidth: 3,
    borderColor: Colors.background,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  email: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
    paddingVertical: 16,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
  },

  // Friends list
  // Friends list
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  friendInfo: {
    flex: 1, // ← claims all space except the icon
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12, // ← gap between name and icon
  },
  friendAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: Colors.card,
  },
  friendName: {
    flex: 1, // ← truncates instead of overflowing
    fontSize: 15,
    fontWeight: "500",
    color: Colors.textPrimary,
  },

  // Sign out
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 20,
    marginTop: 28,
    paddingVertical: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.errorMuted,
    backgroundColor: "rgba(239, 68, 68, 0.08)",
  },
  signOutText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.error,
  },
});
