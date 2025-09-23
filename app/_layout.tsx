import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1f6feb" },
          headerTintColor: "#ffffff",
          headerTitleStyle: { color: "#ffffff" },
          contentStyle: { backgroundColor: "#ffffff" },
        }}
      />
    </>
  );
}
