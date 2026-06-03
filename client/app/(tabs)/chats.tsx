import React, { useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { useGetConversations } from "@/hooks/useChatQueries";
import { useFocusEffect } from "expo-router";
import ChatListItem from "@/components/chatListItem";

const Chats = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const {
    data: conversations,
    isLoading,
    refetch,
    error,
  } = useGetConversations();

  console.log(conversations);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Ionicons name="alert-circle-outline" size={48} color={Colors.error} />
        <Text style={styles.stateTitle}>Something went wrong</Text>
        <Text style={styles.stateSubtitle}>{error.message}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          activeOpacity={0.8}
          onPress={handleRefresh}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chats</Text>
      <FlatList
        data={conversations ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatListItem item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="chatbubbles-outline"
              size={56}
              color={Colors.textMuted}
            />
            <Text style={styles.stateTitle}>No conversations yet</Text>
            <Text style={styles.stateSubtitle}>
              Start a chat from the Discover tab.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: Colors.background,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    gap: 8,
  },
  stateTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginTop: 12,
  },
  stateSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  retryText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.background,
  },
});
