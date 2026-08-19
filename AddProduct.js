import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export default function AddProduct({ onBack }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [saving, setSaving] = useState(false);

  const saveProduct = async () => {
    if (!name.trim()) {
      Alert.alert("ئاگاداری", "ناوی بەرهەم بنووسە.");
      return;
    }

    if (!price.trim()) {
      Alert.alert("ئاگاداری", "نرخی بەرهەم بنووسە.");
      return;
    }

    if (!category.trim()) {
      Alert.alert("ئاگاداری", "کەتەگۆری دیاری بکە.");
      return;
    }

    try {
      setSaving(true);

      await addDoc(collection(db, "products"), {
        name: name.trim(),
        price: Number(price) || 0,
        category: category.trim(),
        image: image.trim(),
        stock: Number(stock) || 0,
        createdAt: new Date().toISOString(),
      });

      Alert.alert(
        "سەرکەوتوو بوو ✅",
        "بەرهەمەکە بە سەرکەوتوویی زیاد کرا."
      );

      setName("");
      setPrice("");
      setCategory("");
      setImage("");
      setStock("");
    } catch (error) {
      console.error("Add product error:", error);

      Alert.alert(
        "هەڵە",
        "نەتوانرا بەرهەمەکە لە Database پاشەکەوت بکرێت."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>‹ گەڕانەوە</Text>
      </TouchableOpacity>

      <Text style={styles.title}>➕ زیادکردنی بەرهەم</Text>

      <Text style={styles.subtitle}>
        بەرهەمێکی نوێ بۆ کۆگا زیاد بکە
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>ناوی بەرهەم</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="ناوی بەرهەم"
          placeholderTextColor="#777"
          style={styles.input}
          textAlign="right"
        />

        <Text style={styles.label}>نرخ</Text>

        <TextInput
          value={price}
          onChangeText={setPrice}
          placeholder="نرخ بە دینار"
          placeholderTextColor="#777"
          keyboardType="numeric"
          style={styles.input}
          textAlign="right"
        />

        <Text style={styles.label}>کەتەگۆری</Text>

        <TextInput
          value={category}
          onChangeText={setCategory}
          placeholder="بۆ نموونە: کالای ماڵ"
          placeholderTextColor="#777"
          style={styles.input}
          textAlign="right"
        />

        <Text style={styles.label}>بڕی کۆگا</Text>

        <TextInput
          value={stock}
          onChangeText={setStock}
          placeholder="ژمارەی بەرهەم"
          placeholderTextColor="#777"
          keyboardType="numeric"
          style={styles.input}
          textAlign="right"
        />

        <Text style={styles.label}>لینکی وێنە</Text>

        <TextInput
          value={image}
          onChangeText={setImage}
          placeholder="https://..."
          placeholderTextColor="#777"
          autoCapitalize="none"
          keyboardType="url"
          style={styles.input}
          textAlign="left"
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveProduct}
          disabled={saving}
        >
          <Text style={styles.saveText}>
            {saving ? "پاشەکەوت دەکرێت..." : "💾 پاشەکەوتکردنی بەرهەم"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },

  content: {
    paddingBottom: 40,
  },

  back: {
    color: "#d7a52b",
    fontSize: 18,
    padding: 16,
    textAlign: "right",
  },

  title: {
    color: "#d7a52b",
    fontSize: 27,
    fontWeight: "800",
    textAlign: "right",
    paddingHorizontal: 18,
    marginTop: 5,
  },

  subtitle: {
    color: "#999",
    fontSize: 14,
    textAlign: "right",
    paddingHorizontal: 18,
    marginTop: 7,
    marginBottom: 18,
  },

  card: {
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#1c1c1c",
    borderWidth: 1,
    borderColor: "#292929",
  },

  label: {
    color: "#d7a52b",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "right",
    marginTop: 12,
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#fff",
    color: "#111",
    borderRadius: 11,
    padding: 13,
    fontSize: 16,
  },

  saveButton: {
    backgroundColor: "#d7a52b",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 25,
  },

  saveText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "800",
  },
});