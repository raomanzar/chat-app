import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import Toast from "react-native-toast-message";
import { Link } from "expo-router";
import { useAuth } from "@/contexts/auth-context";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill all the fields",
      });
      return;
    }
    try {
      setLoading(true);
      const result = await signIn(email, password);
      Toast.show({
        type: result === null ? "success" : "error",
        text1: result === null ? "Success" : "Error",
        text2: result === null ? "Sign in successful!" : result,
      });
    } finally {
      setLoading(false);
      return;
    }
  };

  // useEffect(() => {
  //  Toast.show({
  //   type: "error",
  //   text1: "Error",
  //   text2: "Something went wrong",
  //  });
  // }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            alignItems: "center",
            gap: 15,
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          {/* Logo */}
          <View
            style={{
              backgroundColor: Colors.primary,
              width: 80,
              height: 80,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
            }}
          >
            <Ionicons
              name="chatbubbles-outline"
              size={40}
              color={Colors.textPrimary}
            />
          </View>

          <Text
            style={{
              fontSize: 24,
              lineHeight: 26,
              fontWeight: "bold",
              color: Colors.textPrimary,
            }}
          >
            Welcome Back
          </Text>
          <Text
            style={{
              color: Colors.textSecondary,
              fontSize: 14,
              lineHeight: 16,
              marginBottom: 8,
            }}
          >
            Sign in to continue chatting
          </Text>

          {/* Email */}
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: Colors.card,
              borderColor: Colors.border,
              borderWidth: 1,
              borderRadius: 10,
              justifyContent: "center",
              paddingHorizontal: 12,
            }}
          >
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor={Colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              style={{ color: Colors.textPrimary, fontSize: 16 }}
            />
          </View>

          {/* Password */}
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: Colors.card,
              borderColor: Colors.border,
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 12,
            }}
          >
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={Colors.textMuted}
              secureTextEntry={showPassword}
              autoComplete="off"
              autoCorrect={false}
              autoCapitalize="none"
              style={{ flex: 1, color: Colors.textPrimary, fontSize: 16 }}
            />
            <Pressable onPress={() => setShowPassword((p) => !p)} hitSlop={8}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={Colors.textMuted}
              />
            </Pressable>
          </View>

          {/* Sign In button */}
          <Pressable
            onPress={handleSignIn}
            disabled={loading}
            style={{
              width: "100%",
              height: 50,
              backgroundColor: Colors.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <ActivityIndicator color={Colors.textPrimary} />
            ) : (
              <Text
                style={{
                  color: Colors.textPrimary,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Sign In
              </Text>
            )}
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: Colors.textSecondary,
                fontSize: 14,
                lineHeight: 16,
              }}
            >
              Dont have an account?
            </Text>
            <Link href="/(auth)/signup" asChild>
              <Pressable>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 14,
                    lineHeight: 16,
                    fontWeight: "600",
                  }}
                >
                  Sign Up
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
