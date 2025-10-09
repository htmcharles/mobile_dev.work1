import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from "react-native";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Settings</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notifications</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#e5e5e7", true: "#1f6feb" }}
              thumbColor="#ffffff"
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Email Updates</Text>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: "#e5e5e7", true: "#1f6feb" }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Appearance</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#e5e5e7", true: "#1f6feb" }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data & Storage</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Auto-sync</Text>
            <Switch
              value={autoSync}
              onValueChange={setAutoSync}
              trackColor={{ false: "#e5e5e7", true: "#1f6feb" }}
              thumbColor="#ffffff"
            />
          </View>
          <Text style={styles.settingDescription}>
            Automatically sync your data across devices
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Version:</Text>
            <Text style={styles.value}>1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Build:</Text>
            <Text style={styles.value}>2024.1.1</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0b1a33",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#eef3ff",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#c9dcff",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0b1a33",
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: "#0b1a33",
    fontWeight: "500",
  },
  settingDescription: {
    fontSize: 12,
    color: "#3b4a67",
    marginTop: -8,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#3b4a67",
    fontWeight: "600",
  },
  value: {
    fontSize: 14,
    color: "#0b1a33",
    fontWeight: "500",
  },
});