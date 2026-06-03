import { Colors } from "@/constants/colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import { useEffect } from "react";
import * as SystemUI from "expo-system-ui";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Layout />
        </QueryClientProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function Layout() {
  const { user, token } = useAuth();
  const isLoggedIn = Boolean(user && token);

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(Colors.background);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)/chats" />
        </Stack.Protected>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
      <Toast />
    </SafeAreaView>
  );
}
