import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Hey there 👋</Text>

        {Array.from({ length: 17 }).map((_, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>Tip {index + 1}</Text>
            <Text style={styles.cardBody}>Content {index + 1}.</Text>
          </View>
        ))}
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
  },
  subtitle: {
    fontSize: 16,
    color: "#3b4a67",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#eef3ff",
    borderRadius: 14,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c9dcff",
    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    // Android elevation
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0b1a33",
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 14,
    color: "#1f3b6e",
    lineHeight: 20,
  },
});
