import { router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Cart() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Shopping Cart</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Cart</Text>
          <Text style={styles.cardText}>
            Your cart items will appear here. Add products from the Home tab to see them in your cart.
          </Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Navigation Examples</Text>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/")}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.buttonText}>View Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/navigation-demo")}
          >
            <Text style={styles.buttonText}>Navigation Demo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
});