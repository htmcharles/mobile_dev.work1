import { router } from "expo-router";
import { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  type Product = { id: string; title: string; category: string; price: number; stock: number };

  const initialProducts = useMemo<Product[]>(
    () => [
      { id: "1", title: "Wireless Headphones", category: "Electronics", price: 59.99, stock: 5 },
      { id: "2", title: "Ceramic Coffee Mug", category: "Kitchen", price: 12.5, stock: 20 },
      { id: "3", title: "Yoga Mat", category: "Fitness", price: 24.0, stock: 12 },
      { id: "4", title: "Notebook A5", category: "Stationery", price: 6.75, stock: 30 },
      { id: "5", title: "LED Desk Lamp", category: "Home", price: 29.99, stock: 7 },
      { id: "6", title: "Bluetooth Speaker", category: "Electronics", price: 39.95, stock: 9 },
    ],
    []
  );

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  const handleAddToCart = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId && p.stock > 0 ? { ...p, stock: p.stock - 1 } : p))
    );
    setCart((prev) => {
      const currentQty = prev[productId] ?? 0;
      const product = products.find((p) => p.id === productId);
      if (!product || product.stock <= 0) return prev;
      return { ...prev, [productId]: currentQty + 1 };
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Products</Text>
        
        <View style={styles.navSection}>
          <Text style={styles.sectionTitle}>Quick Navigation</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/cart")}
          >
            <Text style={styles.buttonText}>Go to Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push("/navigation-demo")}
          >
            <Text style={styles.buttonText}>Navigation Demo</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />

        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productCategory}>{product.category}</Text>
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
            <Text style={styles.productStock}>Stock: {product.stock}</Text>
            
            <TouchableOpacity
              onPress={() => handleAddToCart(product.id)}
              style={[styles.addButton, product.stock === 0 && styles.disabledButton]}
              disabled={product.stock === 0}
            >
              <Text style={styles.addButtonText}>
                {product.stock === 0 ? "Out of stock" : "Add to cart"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
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
  navSection: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
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
  searchInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#ffffff",
  },
  productCard: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  productStock: {
    fontSize: 12,
    color: "#888888",
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#34C759",
    padding: 10,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  addButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
});