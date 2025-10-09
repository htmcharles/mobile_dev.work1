import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";

const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.text}>🏠 Welcome to Home</Text>
    </SafeAreaView>
  );
}

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.text}>👤 Your Profile</Text>
    </SafeAreaView>
  );
}

function CartScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.text}>🛒 Your Cart</Text>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.text}>⚙️ Settings</Text>
    </SafeAreaView>
  );
}

export default function NavigationDemo() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
          drawerActiveTintColor: "#007AFF",
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Cart" component={CartScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
});
