import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/(auth)/signin" asChild>
        <Pressable>
          <Text>Go to Signin</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 2,
  },
});
