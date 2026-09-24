import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SessionProvider } from "@/core/session/SessionProvider";
import { AuthDraftProvider } from "@/features/auth/store/AuthDraftProvider";
import { colors } from "@/shared/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SessionProvider>
        <AuthDraftProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
              animation: "fade",
            }}
          />
        </AuthDraftProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
