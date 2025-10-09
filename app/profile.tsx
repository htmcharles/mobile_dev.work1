import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Profile</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>User Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>John Doe</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>john.doe@example.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Member since:</Text>
            <Text style={styles.value}>January 2024</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order History</Text>
          <Text style={styles.cardText}>• 12 orders completed</Text>
          <Text style={styles.cardText}>• $324.50 total spent</Text>
          <Text style={styles.cardText}>• Last order: 3 days ago</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Preferences</Text>
          <Text style={styles.cardText}>• Email notifications: Enabled</Text>
          <Text style={styles.cardText}>• Preferred category: Electronics</Text>
          <Text style={styles.cardText}>• Language: English</Text>
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
  cardText: {
    fontSize: 14,
    color: "#3b4a67",
    lineHeight: 20,
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