import { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<string | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  user: null,
  token: null,
  signIn: async () => null,
  signUp: async () => null,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = authClient.useSession();
  const session = data?.session;
  const token = session?.token!;
  const user: AuthUser | null = data?.user || null;
  const isLoading = isPending;

  const signIn = async (
    email: string,
    password: string,
  ): Promise<string | null> => {
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      return error ? (error?.message ?? "Sign in failed") : null;
    } catch (error) {
      console.log("Sign in error:", error);
      return error instanceof Error ? error.message : "Sign in failed";
    }
  };
  const signUp = async (
    name: string,
    email: string,
    password: string,
  ): Promise<string | null> => {
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });
      return error ? (error?.message ?? "Sign up failed") : null;
    } catch (error: any) {
      console.log("Sign up error:", error);
      return error instanceof Error ? error.message : "Sign up failed";
    }
  };
  const signOut = async () => {
    await authClient.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
