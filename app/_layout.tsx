import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: "#1f6feb" },
          headerTintColor: "#ffffff",
          drawerActiveTintColor: "#1f6feb",
          drawerInactiveTintColor: "#8e8e93",
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="cart"
          options={{
            title: "Cart",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="cart" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="profile"
          options={{
            title: "Profile",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            title: "Settings",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="navigation-demo"
          options={{
            title: "Nav Demo",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="navigate" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </>
  );
}
