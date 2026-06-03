import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: `http://${process.env.EXPO_PUBLIC_BASE_URL}:4000`, // Base URL of your Better Auth backend.
  fetchOptions: { credentials: "include" },
  plugins: [
    expoClient({
      scheme: "client",
      storagePrefix: "client",
      storage: SecureStore,
    }),
  ],
});
