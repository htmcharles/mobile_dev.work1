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
      { id: "7", title: "Stainless Water Bottle", category: "Outdoor", price: 19.99, stock: 14 },
      { id: "8", title: "Running Socks (2-Pack)", category: "Fitness", price: 9.49, stock: 18 },
      { id: "9", title: "Scented Candle", category: "Home", price: 14.0, stock: 11 },
      { id: "10", title: "Phone Stand", category: "Accessories", price: 7.99, stock: 22 },
      { id: "11", title: "USB-C Cable 2m", category: "Electronics", price: 8.5, stock: 25 },
      { id: "12", title: "Desk Organizer Tray", category: "Office", price: 16.25, stock: 10 },
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
      if (!product || product.stock <= 0) return prev; // no stock
      return { ...prev, [productId]: currentQty + 1 };
    });
  };

  const incrementQty = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stock <= 0) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: p.stock - 1 } : p))
    );
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }));
  };

  const decrementQty = (productId: string) => {
    setCart((prev) => {
      const currentQty = prev[productId] ?? 0;
      if (currentQty <= 0) return prev;
      const next = { ...prev };
      if (currentQty === 1) {
        delete next[productId];
      } else {
        next[productId] = currentQty - 1;
      }
      return next;
    });
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + 1 } : p))
    );
  };

  const removeFromCart = (productId: string) => {
    const qty = cart[productId] ?? 0;
    if (qty <= 0) return;
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + qty } : p))
    );
  };

  const submitCart = () => {
    const items = Object.entries(cart).map(([id, qty]) => {
      const product = products.find((p) => p.id === id)!;
      return { id, title: product.title, qty, price: product.price };
    });
    const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
    console.log("Submitting cart (JSON):\n", JSON.stringify(items, null, 2));
    // Helpful terminal output in Metro/devtools and device logs

    console.table(items);
    console.log(`Total: $${total.toFixed(2)}`);
    setCart({});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Products</Text>
        <TextInput
          placeholder="Search by title or category"
          placeholderTextColor="#9aa4b2"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />

        {Object.keys(cart).length > 0 && (
          <View style={styles.cartCard}>
            <Text style={styles.cartTitle}>Cart ({Object.values(cart).reduce((a, b) => a + b, 0)} items)</Text>
            {Object.entries(cart).map(([id, qty]) => {
              const product = products.find((p) => p.id === id)!;
              return (
                <View key={id} style={styles.cartRow}>
                  <Text style={styles.cartRowText} numberOfLines={1}>
                    {product.title}
                  </Text>
                  <View style={styles.cartQtyRow}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => decrementQty(id)}>
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{qty}</Text>
                    <TouchableOpacity
                      style={[styles.qtyBtn, products.find((p) => p.id === id)?.stock === 0 && styles.qtyBtnDisabled]}
                      onPress={() => incrementQty(id)}
                      disabled={products.find((p) => p.id === id)?.stock === 0}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromCart(id)}>
                      <Text style={styles.removeBtnText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
            <TouchableOpacity style={styles.submitBtn} onPress={submitCart}>
              <Text style={styles.submitBtnText}>Submit cart</Text>
            </TouchableOpacity>
          </View>
        )}

        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.priceCol}>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              </View>
              <View style={styles.cardContentRow}>
                <View style={styles.cardTextCol}>
                  <Text style={styles.cardTitle}>{product.title}</Text>
                  <Text style={styles.cardCategory}>{product.category} • In stock: {product.stock}</Text>
                </View>
                <View style={styles.cardRightCol}>
                  <TouchableOpacity
                    accessibilityRole="button"
                    onPress={() => handleAddToCart(product.id)}
                    style={[styles.addButton, product.stock === 0 && styles.addButtonDisabled]}
                    disabled={product.stock === 0}
                  >
                    <Text style={styles.addButtonText}>{product.stock === 0 ? "Out of stock" : "Add to cart"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
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
  searchInput: {
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c9dcff",
    backgroundColor: "#ffffff",
    color: "#0b1a33",
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
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  priceCol: {
    width: 86,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContentRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  cardTextCol: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0b1a33",
    marginBottom: 6,
  },
  cardCategory: {
    fontSize: 13,
    color: "#3b4a67",
  },
  cardRightCol: {
    alignItems: "flex-end",
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0b1a33",
  },
  addButton: {
    backgroundColor: "#0b1a33",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonDisabled: {
    backgroundColor: "#93a1b6",
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  cardBody: {
    fontSize: 14,
    color: "#1f3b6e",
    lineHeight: 20,
  },
  cartCard: {
    backgroundColor: "#f5fbff",
    borderRadius: 14,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#cdefff",
    gap: 12,
  },
  cartTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0b1a33",
  },
  cartRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  cartRowText: {
    flex: 1,
    minWidth: 0,
    color: "#0b1a33",
  },
  cartQtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#0b1a33",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnDisabled: {
    backgroundColor: "#93a1b6",
  },
  qtyBtnText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  qtyText: {
    minWidth: 20,
    textAlign: "center",
    color: "#0b1a33",
    fontWeight: "700",
  },
  removeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#d32f2f",
    borderRadius: 8,
  },
  removeBtnText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  submitBtn: {
    marginTop: 8,
    backgroundColor: "#0b1a33",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  submitBtnText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});
