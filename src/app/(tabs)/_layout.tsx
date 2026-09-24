import { Tabs } from "expo-router";
import { Text } from "react-native";
import { colors } from "@/shared/theme";

const TabIcon = ({ symbol, focused }: { symbol: string; focused: boolean }) => (
  <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{symbol}</Text>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0D0F18",
          borderTopColor: colors.border,
          height: 68,
          paddingTop: 6,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: ({ focused }) => <TabIcon symbol="⌂" focused={focused} /> }}
      />
      <Tabs.Screen
        name="discover"
        options={{ title: "Discover", tabBarIcon: ({ focused }) => <TabIcon symbol="◉" focused={focused} /> }}
      />
      <Tabs.Screen
        name="messages"
        options={{ title: "Messages", tabBarIcon: ({ focused }) => <TabIcon symbol="✉" focused={focused} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Me", tabBarIcon: ({ focused }) => <TabIcon symbol="♙" focused={focused} /> }}
      />
    </Tabs>
  );
}
