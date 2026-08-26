import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Linking,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import AddProduct from "./AddProduct";

/* =========================
   ACCOUNTING DEMO DATA
========================= */

const accountingData = {
  todaySales: 1250000,
  todayProfit: 340000,
  todayExpenses: 120000,
  customerDebts: 2180000,
  lowStock: 7,
};

const money = (value) =>
  new Intl.NumberFormat("ku-IQ").format(Number(value) || 0) + " د.ع";

/* =========================
   SAFE ALERT
========================= */

const showMessage = (title, message) => {
  if (Platform.OS === "web") {
    if (typeof window !== "undefined") {
      window.alert(`${title}\n\n${message}`);
    }
  } else {
    Alert.alert(title, message);
  }
};

/* =========================
   PASSWORD SCREEN
========================= */

function PasswordScreen({
  title,
  passwordCorrect,
  onSuccess,
  onBack,
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    if (password === passwordCorrect) {
      setError("");
      onSuccess();
    } else {
      setError("پاسۆردەکە هەڵەیە.");
      setPassword("");
    }
  };

  return (
<SafeAreaView style={styles.managerSafe}>
      <ScrollView contentContainerStyle={styles.passwordContainer}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹ گەڕانەوە</Text>
        </TouchableOpacity>

        <View style={styles.lockBox}>
          <Text style={styles.lockIcon}>🔐</Text>

          <Text style={styles.passwordTitle}>{title}</Text>

          <Text style={styles.passwordSubtitle}>
            بۆ چوونەژوورەوە پاسۆردەکە بنووسە
          </Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="پاسۆرد"
            placeholderTextColor="#777"
            secureTextEntry
            style={styles.passwordInput}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={login}
          />

          {error !== "" && (
            <Text style={styles.passwordError}>{error}</Text>
          )}

          <TouchableOpacity style={styles.goldBtn} onPress={login}>
            <Text style={styles.goldText}>چوونەژوورەوە</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================
   TRANSACTION
========================= */

function Transaction({ name, date, value, income }) {
  return (
    <View style={styles.transaction}>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionName}>{name}</Text>
        <Text style={styles.transactionDate}>{date}</Text>
      </View>

      <Text style={income ? styles.income : styles.expense}>
        {value}
      </Text>
    </View>
  );
}

/* =========================
   DASHBOARD
========================= */
function Dashboard({
  onBack,
  onNavigate,
  orders,
  onConfirmOrder,
}) {
  
  const cards = [
    ["💰", "فرۆشتنی ئەمڕۆ", money(accountingData.todaySales)],
    ["📈", "قازانجی ئەمڕۆ", money(accountingData.todayProfit)],
    ["💸", "خەرجی ئەمڕۆ", money(accountingData.todayExpenses)],
    ["👥", "قەرزی کڕیاران", money(accountingData.customerDebts)],
  ];

  const menu = [
    ["🧾", "فرۆشتن"],
    ["🛍️", "کڕین"],
    ["📦", "کۆگا"],
    ["👥", "کڕیارەکان"],
    ["🏭", "دابینکەرەکان"],
    ["💸", "خەرجییەکان"],
    ["📈", "قازانج و زیان"],
    ["📊", "ڕاپۆرتەکان"],
  ];
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.accountingContainer}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹ گەڕانەوە</Text>
        </TouchableOpacity>

        <Text style={styles.accountingTitle}>
          📊 Dashboard ـی Shwshawaty ASYA
        </Text>

        <Text style={styles.accountingDate}>
          کورتەی حساباتی ئەمڕۆ
        </Text>

        <View style={styles.accountingGrid}>
          {cards.map((card, index) => (
            <View style={styles.accountingCard} key={index}>
              <Text style={styles.accountingIcon}>{card[0]}</Text>

              <Text style={styles.accountingCardTitle}>
                {card[1]}
              </Text>

              <Text style={styles.accountingCardValue}>
                {card[2]}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.accountingSection}>
          <Text style={styles.accountingSectionTitle}>
            🧾 دوایین مامەڵەکان
          </Text>

          <Transaction
            name="فرۆشتنی طقم جام"
            date="ئەمڕۆ • 08:45"
            value="+ 125,000 د.ع"
            income
          />

          <Transaction
            name="خەرجی گەیاندن"
            date="ئەمڕۆ • 10:20"
            value="- 35,000 د.ع"
          />

          <Transaction
            name="کڕینی کاڵا"
            date="دوێنێ • 15:10"
            value="- 280,000 د.ع"
          />
        </View>

        <View style={styles.accountingSection}>
          <View style={styles.warningHeader}>
            <Text style={styles.accountingSectionTitle}>
              📦 کۆگای کەم
            </Text>

            <Text style={styles.warningNumber}>
              {accountingData.lowStock}
            </Text>
          </View>

          <Text style={styles.warningText}>
            {accountingData.lowStock} بەرهەم نزیکن لە تەواوبوون.
          </Text>
        </View>
<View style={styles.accountingSection}> 
<Text style={{ color: "red", fontSize: 16 }}>
  TEST ORDERS: {orders?.length || 0}
</Text>

<Text
style={styles.accountingSectionTitle}>
    📋 داواکارییە نوێکان
  </Text>

  {(!orders || orders.filter(order => order.status === "pending").length === 0) ? (
    <Text style={styles.accountingNoteText}>
      هیچ داواکارییەکی نوێ نییە.
    </Text>
  ) : (
    orders
      .filter(order => order.status === "pending")
      .map((order) => (
        <View
          key={order.id}
          style={styles.accountingNote}
        >
          <Text style={styles.accountingNoteTitle}>
            👤 {order.customerName}
          </Text>

          <Text style={styles.accountingNoteText}>
            📱 {order.phone}
          </Text>

          <Text style={styles.accountingNoteText}>
            💰 کۆی گشتی: {money(order.total)}
          </Text>

  <Text style={styles.warningText}>
            🟡 چاوەڕوانی پشتڕاستکردنەوە
</Text>
<TouchableOpacity
  style={styles.goldBtn}
onPress={() => onConfirmOrder(order)}
  
  >
  <Text style={styles.goldText}>
    ✅ پشتڕاستکردنەوەی داواکاری
  </Text>
</TouchableOpacity>
        </View>
      ))
  )}

  <View style={styles.accountingSection}>
    <Text style={styles.accountingSectionTitle}>
      ✅ داواکارییە پشتڕاستکراوەکان
    </Text>

    {(!orders ||
      orders.filter(order => order.status === "confirmed").length === 0) ? (
      <Text style={styles.accountingNoteText}>
        هیچ داواکارییەکی پشتڕاستکراو نییە.
      </Text>
    ) : (
      orders
        .filter(order => order.status === "confirmed")
        .map((order) => (
          <View
            key={order.id}
            style={styles.accountingNote}
          >
            <Text style={styles.accountingNoteTitle}>
              👤 {order.customerName}
            </Text>

            <Text style={styles.accountingNoteText}>
              📱 {order.phone}
            </Text>

            <Text style={styles.accountingNoteText}>
              💰 کۆی گشتی: {money(order.total)}
            </Text>

            <Text style={styles.income}>
              🟢 پشتڕاستکراوە
            </Text>
            <TouchableOpacity
  style={styles.goldBtn}
  onPress={() => onShipOrder(order)}
>
  <Text style={styles.goldText}>
    🚚 ناردرا
  </Text>
</TouchableOpacity>
          </View>
        ))
    )}
  </View>

<Text style={styles.menuTitle}>بەشەکانی حسابات</Text>
</View>

<Text style={styles.menuTitle}>بەشەکانی حسابات</Text>

        <View style={styles.menuGrid}>
          {menu.map(([icon, title], index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuButton}
             onPress={() => {
if (title === "بەڕێوبەرایەتی بەرهەمەکان") {
  onManageProducts();

} else if (title === "زیادکردنی بەرهەم") {
  onAddProduct();

} else if (title === "سڕینەوەی بەرهەم") {
  showMessage(
    "سڕینەوەی بەرهەم",
    "بەرهەمێک هەڵبژێرە بۆ سڕینەوە."
  );

} else if (title === "بەڕێوبەرایەتی کڕیارەکان") {
  setScreen("customers");

} else if (title.trim() === "فرۆشتن") {
  onNavigate?.("sales");

} else if (title === "کۆگا") {
  setScreen("inventory");

} else {
  showMessage(
    title,
    "ئەم بەشە ئامادەیە بۆ زیادکردنی سیستەمی ڕاستەقینە."
  );
}
}}
>
              <Text style={styles.menuIcon}>{icon}</Text>
              <Text style={styles.menuText}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.accountingNote}>
          <Text style={styles.accountingNoteTitle}>🔐 تێبینی</Text>

          <Text style={styles.accountingNoteText}>
            ئەم Dashboard ـە قۆناغی یەکەمی سیستەمی حساباتە.
            ژمارەکان لە ئێستادا Demo ـن. Database و حساباتی
            ڕاستەقینە لە قۆناغی داهاتوودا زیاد دەکرێن.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================
   MANAGER PANEL
========================= */
function ManagerPanel({
  onBack,
  onAddProduct,
  onManageProducts,
  products,
  orders,
  onDeleteProduct,
  onNavigate,
  setScreen,
}) {
    const [saleQuantity, setSaleQuantity] = useState("");
    const items = [
 ["📦", "بەڕێوبەرایەتی بەرهەمەکان"],
  ["📦", "کۆگا"],
      ["➕", "زیادکردنی بەرهەم"],
    ["✏️", "دەستکاریکردنی بەرهەم"],
    ["🗑️", "سڕینەوەی بەرهەم"],
    ["👥", "بەڕێوبەرایەتی کڕیارەکان"],
    ["🏭", "دابینکەرەکان"],
    ["📊", "ڕاپۆرتەکانی فرۆشتن"],
    ["⚙️", "ڕێکخستنەکان"],
  ];
  return (
<SafeAreaView style={styles.managerSafe}>
    <ScrollView
      style={styles.managerScroll}
contentContainerStyle={styles.accountingContainer}
    showsVerticalScrollIndicator={false}
    >
        <TouchableOpacity onPress={onBack}>
<Text style={styles.back}>‹ گەڕانەوە</Text>
        </TouchableOpacity>

<Text
  style={{
    color: "#d7a52b",
    fontSize: 30,
    backgroundColor: "#0b0b0b",
    padding: 20,
  }}
>
  👨‍💼 بەشی بەڕێوبەر
</Text>

<Text style={styles.accountingDate}>
          بەخێربێیت بۆ بەشی بەڕێوبەرایەتی
        </Text>

        <View style={styles.managerWelcome}>
          <Text style={styles.managerWelcomeIcon}>👨‍💼</Text>

          <Text style={styles.managerWelcomeTitle}>
            بەڕێوبەری Shwshawaty ASYA
          </Text>

          <Text style={styles.managerWelcomeText}>
            لێرە دەتوانیت بەشەکانی بەڕێوبەرایەتی کۆنترۆڵ بکەیت.
          </Text>
        </View>

        <Text style={styles.menuTitle}>
          بەشەکانی بەڕێوبەر
        </Text>
        

        <View style={styles.menuGrid}>
          {items.map(([icon, title], index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuButton}
              onPress={() => {
  if (title === "بەڕێوبەرایەتی بەرهەمەکان") {
  onManageProducts();
  } else if (title === "فرۆشتن") {
  onNavigate?.("sales");
  } else if (title === "کۆگا") {
  setScreen("inventory");
} else if (title === "زیادکردنی بەرهەم") {
  onAddProduct();
} else if (title === "سڕینەوەی بەرهەم") {
  showMessage(
    "سڕینەوەی بەرهەم",
    "بەرهەمێک هەڵبژێرە بۆ سڕینەوە."
  );
} else if (title === "بەڕێوبەرایەتی کڕیارەکان") {
  setScreen("customers");
} else {
  showMessage(
    title,
    "ئەم بەشە ئامادەیە بۆ زیادکردنی سیستەمی ڕاستەقینە."
  );
}
  }}
 >
              <Text style={styles.menuIcon}>{icon}</Text>
              <Text style={styles.menuText}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.menuTitle}>
  🗑️ سڕینەوەی بەرهەم
</Text>

{products.map((product) => (
  <TouchableOpacity
    key={product.id}
    style={styles.menuButton}
    onPress={() => onDeleteProduct(product)}
  >
<Image
  source={{ uri: product.image }}
  style={{
    width: 100,
    height: 100,
    borderRadius: 10,
  }}
  resizeMode="cover"
/>

<Text style={styles.menuText}>
  {product.name}
</Text>

<Text style={styles.stockText}>
  📦 کۆگا: {product.stock ?? 0} دانە
</Text>

<TextInput
  value={saleQuantity}
  onChangeText={setSaleQuantity}
  placeholder="ژمارەی دانە"
  placeholderTextColor="#777"
  keyboardType="numeric"
  style={styles.passwordInput}
/>
<View style={styles.stockControls}>
  <TouchableOpacity
    style={styles.stockButton}
    onPress={async () => {
      const newStock = Math.max(0, (product.stock ?? 0) - 1);

      await updateDoc(doc(db, "products", product.id), {
        stock: newStock,
      });
    }}
  >
    <Text style={styles.stockButtonText}>−</Text>
  </TouchableOpacity>

  <Text style={styles.stockNumber}>
    {product.stock ?? 0}
  </Text>

  <TouchableOpacity
    style={styles.stockButton}
    onPress={async () => {
      const newStock = (product.stock ?? 0) + 1;

      await updateDoc(doc(db, "products", product.id), {
        stock: newStock,
      });
    }}
  >
    <Text style={styles.stockButtonText}>+</Text>
  </TouchableOpacity>
</View>

  </TouchableOpacity>
))}

        <View style={styles.accountingNote}>
          <Text style={styles.accountingNoteTitle}>
            🔒 تێبینی ئەمنی
          </Text>

          <Text style={styles.accountingNoteText}>
            ئەم بەشە تەنها بۆ بەڕێوبەرە و بە پاسۆردی جیاواز پارێزراوە.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================
   MAIN APP
========================= */

export default function App() {
  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState("home");
  const [saleQuantity, setSaleQuantity] = useState("1");
  const [category, setCategory] = useState("هەموو");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [cartError, setCartError] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [productName, setProductName] = useState("");
const [customerTotal, setCustomerTotal] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [selected, setSelected] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [screen, setScreen] = useState("main");

const [products, setProducts] = useState([]);
const [orders, setOrders] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState("");
const [payingCustomer, setPayingCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
const [customersLoading, setCustomersLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");

  /* =========================
     FIRESTORE PRODUCTS
  ========================= */
useEffect(() => {
  let unsubscribe = null;
  let unsubscribeCustomers = null;

  try {
    const productsRef = collection(db, "products");

    unsubscribe = onSnapshot(
      productsRef,
      (snapshot) => {
        const firestoreProducts = snapshot.docs.map((doc) => {
          const data = doc.data() || {};

          return {
            id: doc.id,
            name: data.name || "بەرهەم",
            price: Number(data.price) || 0,
            category: data.category || "کالای ماڵ",
            image: data.image || "",
            stock: Number(data.stock) || 0,
          };
        });

        setProducts(firestoreProducts);
        setProductsLoading(false);
        setProductsError("");
      },
      (error) => {
        console.error("Firestore products error:", error);

        setProducts([]);
        setProductsLoading(false);
        setProductsError(
          "کێشەیەک هەیە لە پەیوەندی بە Database."
        );
      }
    );

    const customersRef = collection(db, "customers");

    unsubscribeCustomers = onSnapshot(
      customersRef,
      (snapshot) => {
        const firestoreCustomers = snapshot.docs.map((doc) => {
          const data = doc.data() || {};

          return {
            id: doc.id,
            name: data.name || "کڕیار",
            phone: data.phone || "",
            address: data.address || "",
            totalPurchases: Number(data.totalPurchases) || 0,
            paid: Number(data.paid) || 0,
            debt: Number(data.debt) || 0,
          };
        });

        setCustomers(firestoreCustomers);
        setCustomersLoading(false);
      },
      (error) => {
        console.error("Firestore customers error:", error);

        setCustomers([]);
        setCustomersLoading(false);
      }
    );
  } catch (error) {
    console.error("Firestore setup error:", error);

    setProducts([]);
    setProductsLoading(false);
    setProductsError(
      "کێشەیەک هەیە لە ڕێکخستنی Database."
    );
  }

  return () => {
    if (typeof unsubscribe === "function") {
      unsubscribe();
    }

    if (typeof unsubscribeCustomers === "function") {
      unsubscribeCustomers();
    }
  };
}, []);

useEffect(() => {
  const ordersRef = collection(db, "orders");

  const unsubscribeOrders = onSnapshot(
    ordersRef,
    (snapshot) => {
      console.log("🔥 FIREBASE PROJECT:", db.app.options.projectId);
      console.log("🔥 ORDERS FOUND:", snapshot.docs.length);

      const firestoreOrders = snapshot.docs.map((doc) => {
        const data = doc.data() || {};

        return {
          id: doc.id,
          customerName: data.customerName || "کڕیار",
          phone: data.customerPhone || "",
          items: data.items || [],
          total: Number(data.total) || 0,
          status: data.status || "pending",
          createdAt: data.createdAt || null,
        };
      });

      setOrders(firestoreOrders);
    },
    (error) => {
      console.error("🔥 ORDERS ERROR:", error);
      console.error("🔥 ERROR CODE:", error?.code);
      console.error("🔥 ERROR MESSAGE:", error?.message);

      setOrders([]);
    }
  );

  return () => {
    unsubscribeOrders();
  };
}, []);
  /* =========================
     CATEGORIES
  ========================= */

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return ["هەموو", ...uniqueCategories];
  }, [products]);

  /* =========================
     FILTER
  ========================= */

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "هەموو" ||
        product.category === category;

      const matchesSearch =
        search === "" ||
        String(product.name)
          .toLowerCase()
          .includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [products, category, query]);

  /* =========================
     CART
  ========================= */

const deleteProduct = async (product) => {
  if (Platform.OS === "web") {
    const ok = window.confirm(
      `دڵنیایت لە سڕینەوەی "${product.name}"؟`
    );

    if (!ok) return;
  }

  try {
    await deleteDoc(doc(db, "products", product.id));

    showMessage(
      "سڕایەوە",
      `${product.name} بە سەرکەوتوویی سڕایەوە.`
    );
  } catch (error) {
    console.error("Delete product error:", error);

    showMessage(
      "هەڵە",
      "نەتوانرا بەرهەمەکە بسڕدرێتەوە."
    );
    }
};

const updateProduct = async () => {
  if (!selectedProduct) return;

  try {
    await updateDoc(
      doc(db, "products", selectedProduct.id),
      {
        name: selectedProduct.name,
        price: selectedProduct.price,
      }
    );

    showMessage(
      "پاشەکەوت کرا",
      "زانیارییەکانی بەرهەم بە سەرکەوتوویی نوێکرانەوە."
    );

    setScreen("manageProducts");
    setSelectedProduct(null);
  } catch (error) {
    console.error("Update product error:", error);

    showMessage(
      "هەڵە",
      "نەتوانرا گۆڕانکارییەکان پاشەکەوت بکرێن."
    );
  }
};
const sellProduct = async (product) => {
  if (!product) return;

  const currentStock = Number(product.stock) || 0;

  if (currentStock <= 0) {
    showMessage(
      "کۆگا بەتاڵە",
      "ئەم بەرهەمە لە کۆگا نەماوە."
    );
    return;
  }

  try {
    const newStock = currentStock - 1;

    await updateDoc(
      doc(db, "products", product.id),
      {
        stock: newStock,
      }
    );

    showMessage(
      "فرۆشتن سەرکەوتوو بوو",
      `${product.name}\nکۆگای ماوە: ${newStock} دانە`
    );
  } catch (error) {
    console.error("Sell product error:", error);

    showMessage(
      "هەڵە",
      "نەتوانرا کۆگای بەرهەم کەم بکرێتەوە."
    );
  }
};
const confirmOrder = async (order) => {
  if (!order) return;

  if (order.status !== "pending") {
    showMessage(
      "ئاگاداری",
      "ئەم داواکارییە پێشتر پشتڕاست کراوەتەوە."
    );
    return;
  }

  try {
    for (const item of order.items || []) {
      const productRef = doc(db, "products", item.productId);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        throw new Error(`بەرهەم نەدۆزرایەوە: ${item.name}`);
      }

      const product = productSnap.data() || {};
      const currentStock = Number(product.stock) || 0;
      const quantity = Number(item.quantity) || 0;

      if (currentStock < quantity) {
        showMessage(
          "کۆگا بەس نییە",
          `${product.name}\nکۆگای ماوە: ${currentStock} دانە`
        );
        return;
      }
    }

    for (const item of order.items || []) {
      const productRef = doc(db, "products", item.productId);
      const productSnap = await getDoc(productRef);
      const product = productSnap.data() || {};

      const newStock =
        (Number(product.stock) || 0) -
        (Number(item.quantity) || 0);

await updateDoc(productRef, {
  stock: newStock,
});
    }

    await updateDoc(
      doc(db, "orders", order.id),
      {
        status: "confirmed",
      }
    );

    showMessage(
      "سەرکەوتوو",
      "داواکاری پشتڕاست کرایەوە و کۆگا نوێکرایەوە."
    );
  } catch (error) {
    console.error("Confirm order error:", error);

    showMessage(
      "هەڵە",
      error?.message || "نەتوانرا داواکاری پشتڕاست بکرێتەوە."
    );
  }
};
const shipOrder = async (order) => {
  if (!order) return;

  if (order.status !== "confirmed") {
    showMessage(
      "ئاگاداری",
      "ئەم داواکارییە هێشتا پشتڕاست نەکراوەتەوە."
    );
    return;
  }

  try {
    await updateDoc(
      doc(db, "orders", order.id),
      {
        status: "shipped",
      }
    );

    showMessage(
      "سەرکەوتوو",
      "داواکارییەکە نێردرا."
    );
  } catch (error) {
    console.error("Ship order error:", error);

    showMessage(
      "هەڵە",
      error?.message || "نەتوانرا داواکارییەکە بنێردرێت."
    );
  }
  };

const deliverOrder = async (order) => {
  // ...
};

const payCustomerDebt = async () => {
  if (!payingCustomer) return;

  const amount = Number(paymentAmount) || 0;

  if (amount <= 0) {
    showMessage("ئاگاداری", "بڕی پارە بنووسە.");
    return;
  }

  const currentDebt = Number(payingCustomer.debt) || 0;

  if (amount > currentDebt) {
    showMessage(
      "ئاگاداری",
      "بڕی پارە لە قەرزی کڕیار زیاترە."
    );
    return;
  }

  try {
    const newPaid =
      (Number(payingCustomer.paid) || 0) + amount;

    const newDebt =
      currentDebt - amount;

    await updateDoc(
      doc(db, "customers", payingCustomer.id),
      {
        paid: newPaid,
        debt: newDebt,
      }
    );

    setPaymentAmount("");
    setPayingCustomer(null);

    showMessage(
      "سەرکەوتوو",
      `پارەدان تۆمار کرا.\nقەرزی ماوە: ${newDebt.toLocaleString()} د.ع`
    );
  } catch (error) {
    console.error("Payment error:", error);

    showMessage(
      "هەڵە",
      error?.message || "نەتوانرا پارەدان تۆمار بکرێت."
    );
  }
};
const deleteCustomer = async (customer) => {
  if (Platform.OS === "web") {
    const ok = window.confirm(
      `دڵنیایت لە سڕینەوەی "${customer.name}"؟`
    );

    if (!ok) return;
  }

  try {
    await deleteDoc(
      doc(db, "customers", customer.id)
    );

    showMessage(
      "سڕایەوە",
      `${customer.name} بە سەرکەوتوویی سڕایەوە.`
    );
  } catch (error) {
    console.error("Delete customer error:", error);

    showMessage(
      "هەڵە",
      "نەتوانرا کڕیارەکە بسڕدرێتەوە."
    );
  }
};
const addToCart = (product) => {
  console.log("🛒 PRODUCT TO CART:", product);
  
   setCart((current) => [...current, product]);

    showMessage(
      "زیادکرا",
      `${product.name} خرایە ناو سەبەتەکە.`
    );
  };

  /* =========================
     WELCOME
  ========================= */

  if (!started) {
    return (
      <SafeAreaView style={styles.welcomeSafe}>
        <View style={styles.welcomeContainer}>
       <Text style={styles.welcomeBrand}>
  {"\u0628\u06d5\u062e\u06ce\u0631\u0628\u06ce\u0646\u0020\u0628\u06c6\u0020\u0634\u0648\u0634\u06d5\u0648\u0627\u062a\u06cc\u0020\u0626\u0627\u0633\u06cc\u0627"}
</Text>

          <Text style={styles.welcomeText}>
            بۆ بینینی بەرهەمەکان کلیک لە بەشی خوارەوە بکە
          </Text>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => setStarted(true)}
          >
            <Text style={styles.startButtonText}>
              دەستپێکردنی کڕین
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* =========================
     DASHBOARD PASSWORD
  ========================= */

  if (screen === "dashboardPassword") {
    return (
      <PasswordScreen
        title="Dashboard"
        passwordCorrect="gardunali"
        onSuccess={() => setScreen("dashboard")}
        onBack={() => setScreen("main")}
      />
    );
  }

  /* =========================
     DASHBOARD
  ========================= */

  if (screen === "dashboard") {
  return (
<Dashboard
  onBack={() => setScreen("main")}
  onNavigate={(nextScreen) => setScreen(nextScreen)}
  orders={orders}
  onConfirmOrder={confirmOrder}
  onShipOrder={shipOrder}
/>
  );
}

      if (screen === "customers") {
    return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.accountingContainer}
      >
        <TouchableOpacity
          onPress={() => setScreen("manager")}
        >
          <Text style={styles.back}>
            ‹ گەڕانەوە
          </Text>
        </TouchableOpacity>

        <Text style={styles.managerTitle}>
          👥 بەڕێوبەرایەتی کڕیارەکان
        </Text>
        <View style={styles.accountingNote}>
  <Text style={styles.accountingNoteTitle}>
    ➕ زیادکردنی کڕیار
  </Text>

  <TextInput
    placeholder="ناوی کڕیار"
    placeholderTextColor="#777"
    value={customerName}
    onChangeText={setCustomerName}
    style={styles.input}
  />

  <TextInput
    placeholder="ژمارەی تەلەفۆن"
    placeholderTextColor="#777"
    value={customerPhone}
    onChangeText={setCustomerPhone}
    style={styles.input}
    keyboardType="phone-pad"
  />

  <TextInput
    placeholder="ناوی مادە / بەرهەم"
    placeholderTextColor="#777"
    value={productName}
    onChangeText={setProductName}
    style={styles.input}
  />

  <TextInput
    placeholder="کۆی نرخی کڕین"
    placeholderTextColor="#777"
    value={customerTotal}
    onChangeText={setCustomerTotal}
    style={styles.input}
    keyboardType="numeric"
  />

  <TouchableOpacity
    style={styles.startButton}
    onPress={async () => {
      if (!customerName.trim()) {
        Alert.alert("ئاگاداری", "ناوی کڕیار بنووسە.");
        return;
      }

      const total = Number(customerTotal) || 0;

      try {
        await addDoc(collection(db, "customers"), {
          name: customerName.trim(),
          phone: customerPhone.trim(),
          productName: productName.trim(),
          totalPurchases: total,
          paid: 0,
          debt: total,
        });

        setCustomerName("");
        setCustomerPhone("");
        setProductName("");
        setCustomerTotal("");

        Alert.alert("سەرکەوتوو", "کڕیار بە سەرکەوتوویی زیاد کرا.");
      } catch (error) {
  console.error("Add customer error:", error);

  Alert.alert(
    "هەڵەی Firebase",
    error?.message || "هەڵەیەکی نەناسراو ڕوویدا."
  );
}
}}
>
    <Text style={styles.startButtonText}>
      زیادکردنی کڕیار
    </Text>
  </TouchableOpacity>
</View>
{customersLoading ? (
  <Text style={styles.accountingNoteText}>
    چاوەڕێ بکە...
  </Text>
) : customers.length === 0 ? (
  <View style={styles.accountingNote}>
    <Text style={styles.accountingNoteTitle}>
      👤 هیچ کڕیارێک نییە
    </Text>

    <Text style={styles.accountingNoteText}>
      هێشتا هیچ کڕیارێک تۆمار نەکراوە.
    </Text>
  </View>
) : (
  customers.map((customer) => (
    <View
      key={customer.id}
      style={styles.accountingNote}
    >
      <Text style={styles.accountingNoteTitle}>
        👤 {customer.name}
      </Text>

      <Text style={styles.accountingNoteText}>
        📞 {customer.phone || "ژمارە نییە"}
      </Text>

      <Text style={styles.accountingNoteText}>
        💰 کۆی کڕین: {customer.totalPurchases.toLocaleString()} د.ع
      </Text>

      <Text style={styles.accountingNoteText}>
        💵 پارەی دراو: {customer.paid.toLocaleString()} د.ع
      </Text>

      <Text style={styles.accountingNoteText}>
        🔴 قەرزی ماوە: {customer.debt.toLocaleString()} د.ع
      </Text>
      <Text style={styles.accountingNoteText}>
  🔴 قەرزی ماوە: {customer.debt.toLocaleString()} د.ع
</Text>

<TouchableOpacity
  style={styles.yourStyle}
  onPress={async () => {
    setPayingCustomer(customer);
    setPaymentAmount("");
  }}
>
  <Text style={styles.goldText}>
    💵 پارەدان
  </Text>
</TouchableOpacity>
      
      <TouchableOpacity
  style={styles.startButton}
  onPress={() => deleteCustomer(customer)}
>
  <Text style={styles.startButtonText}>
    🗑️ سڕینەوەی کڕیار
  </Text>
  
</TouchableOpacity>
<TouchableOpacity
  style={styles.goldBtn}
  onPress={() => {
    setSelected(customer);
    setScreen("editCustomer");
  }}
>
  <Text style={styles.goldText}>
    ✏️ دەستکاریکردن
  </Text>
</TouchableOpacity>
      <TouchableOpacity
  style={styles.goldBtn}
  onPress={() => {
    setPayingCustomer(customer);
    setPaymentAmount("");
  }}
>
  <Text style={styles.goldText}>
    💵 پارەدان
  </Text>
</TouchableOpacity>

{payingCustomer?.id === customer.id && (
  <View style={{ marginTop: 10 }}>
    <TextInput
      value={paymentAmount}
      onChangeText={setPaymentAmount}
      placeholder="بڕی پارە"
      placeholderTextColor="#777"
      keyboardType="numeric"
      style={styles.input}
    />

    <TouchableOpacity
      style={styles.startButton}
      onPress={payCustomerDebt}
    >
      <Text style={styles.startButtonText}>
        ✅ تۆمارکردنی پارەدان
      </Text>
    </TouchableOpacity>
  </View>
)}
    </View>
  ))
)}
        <View style={styles.accountingNote}>
          <Text style={styles.accountingNoteTitle}>
            👤 کڕیارەکان
          </Text>

          <Text style={styles.accountingNoteText}>
            لەم بەشەدا دەتوانین کڕیار زیاد بکەین و ناوی بەرهەمەکانی کڕیوە، کۆی کڕین، پارەی دراو و قەرزی ماوەی هەر کڕیارێک تۆمار بکەین.
          </Text>
        </View>
          </ScrollView>
    </SafeAreaView>
  );
}
if (screen === "editCustomer") {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.accountingContainer}
      >
        <TouchableOpacity
          onPress={() => {
            setSelected(null);
            setScreen("customers");
            
          }}
        >
          <Text style={styles.back}>
            ‹ گەڕانەوە
          </Text>
        </TouchableOpacity>

        <Text style={styles.managerTitle}>
          ✏️ دەستکاریکردنی کڕیار
        </Text>

        {selected && (
          <View style={styles.accountingNote}>

            <TextInput
              value={selected.name}
              onChangeText={(text) =>
                setSelected({
                  ...selected,
                  name: text,
                })
              }
              placeholder="ناوی کڕیار"
              placeholderTextColor="#777"
              style={styles.input}
            />

            <TextInput
              value={selected.phone}
              onChangeText={(text) =>
                setSelected({
                  ...selected,
                  phone: text,
                })
              }
              placeholder="ژمارەی تەلەفۆن"
              placeholderTextColor="#777"
              keyboardType="phone-pad"
              style={styles.input}
            />

            <TextInput
              value={selected.address}
              onChangeText={(text) =>
                setSelected({
                  ...selected,
                  address: text,
                })
              }
              placeholder="ناونیشان"
              placeholderTextColor="#777"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.goldBtn}
              onPress={async () => {
                try {
                  await updateDoc(
                    doc(db, "customers", selected.id),
                    {
                      name: selected.name,
                      phone: selected.phone,
                      address: selected.address,
                    }
                  );

                  showMessage(
                    "سەرکەوتوو",
                    "زانیارییەکانی کڕیار نوێ کرانەوە."
                  );

                  setSelected(null);
                  setScreen("customers");
                } catch (error) {
                  console.error(
                    "Update customer error:",
                    error
                  );

                  showMessage(
                    "هەڵە",
                    "نەتوانرا زانیارییەکانی کڕیار نوێ بکرێنەوە."
                  );
                }
              }}
            >
              <Text style={styles.goldText}>
                💾 پاشەکەوتکردن
              </Text>
            </TouchableOpacity>

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
if (screen === "inventory") {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.accountingContainer}
      >
        <TouchableOpacity
          onPress={() => setScreen("manager")}
        >
          <Text style={styles.back}>
            ‹ گەڕانەوە
          </Text>
        </TouchableOpacity>

        <Text style={styles.managerTitle}>
          📦 کۆگا
        </Text>

        {products.length === 0 ? (
          <Text style={styles.accountingNoteText}>
            هیچ بەرهەمێک نییە.
          </Text>
        ) : (
   products.map((product) => (
  <TouchableOpacity
    key={product.id}
    style={styles.accountingNote}
    onPress={() => sellProduct(product)}
  >
              <Text style={styles.accountingNoteTitle}>
                📦 {product.name}
              </Text>

              <Text style={styles.accountingNoteText}>
                💰 نرخ: {money(product.price)}
              </Text>
              
              <Text style={styles.accountingNoteText}>
  📦 کۆگا: {product.stock ?? 0} دانە
</Text>
           </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
if (screen === "sales") {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.accountingContainer}
      >
        <TouchableOpacity
          onPress={() => setScreen("dashboard")}
        >
          <Text style={styles.back}>
            ‹ گەڕانەوە
          </Text>
        </TouchableOpacity>

        <Text style={styles.managerTitle}>
          🧾 فرۆشتن
        </Text>

        <Text style={styles.accountingDate}>
          بەرهەمێک هەڵبژێرە بۆ فرۆشتن
        </Text>

        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.accountingNote}
            onPress={() => sellProduct(product)}
          >
            <Text style={styles.accountingNoteTitle}>
              📦 {product.name}
            </Text>

            <Text style={styles.accountingNoteText}>
              💰 نرخ: {money(product.price)}
            </Text>

            <Text style={styles.accountingNoteText}>
              📦 کۆگا: {product.stock ?? 0} دانە
            </Text>

            <Text style={styles.goldText}>
              ➜ فرۆشتن
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
if (screen === "manageProducts") {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.accountingContainer}
      >
        <TouchableOpacity
          onPress={() => setScreen("manager")}
        >
          <Text style={styles.back}>
            ‹ گەڕانەوە
          </Text>
        </TouchableOpacity>

        <Text style={styles.managerTitle}>
          📦 بەڕێوبەرایەتی بەرهەمەکان
        </Text>

        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.menuButton}
            onPress={() => {
  setSelectedProduct(product);
  setScreen("editProduct");
}}
          >
          {product.image ? (
  <Image
    source={{ uri: product.image }}
    style={{
      width: 80,
      height: 80,
      borderRadius: 12,
    }}
    resizeMode="cover"
  />
) : (
  <Text style={styles.menuIcon}>
    📦
  </Text>
)}

<Text style={styles.menuText}>
  {product.name}
</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
  
 if (screen === "editProduct") {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.accountingContainer}
      >
        <TouchableOpacity
          onPress={() => {
            setSelectedProduct(null);
            setScreen("manageProducts");
          }}
        >
          <Text style={styles.back}>
            ‹ گەڕانەوە
          </Text>
        </TouchableOpacity>

        <Text style={styles.managerTitle}>
          ✏️ دەستکاریکردنی بەرهەم
        </Text>

        {selectedProduct && (
          <View style={styles.accountingNote}>
            <Text style={styles.accountingNoteTitle}>
              📦 {selectedProduct.name}
            </Text>
            <TextInput
  value={selectedProduct.name}
  onChangeText={(text) =>
    setSelectedProduct({
      ...selectedProduct,
      name: text,
    })
  }
  placeholder="ناوی بەرهەم"
  placeholderTextColor="#777"
  style={styles.passwordInput}
/>
<TextInput
  value={String(selectedProduct.price ?? "")}
  onChangeText={(text) =>
    setSelectedProduct({
      ...selectedProduct,
      price: text,
    })
  }
  placeholder="نرخی بەرهەم"
  placeholderTextColor="#777"
  keyboardType="numeric"
  style={styles.passwordInput}
/>
<TouchableOpacity
  style={styles.goldBtn}
  onPress={updateProduct}
>
  <Text style={styles.goldText}>
    💾 پاشەکەوتکردن
  </Text>
</TouchableOpacity>

            <Text style={styles.accountingNoteText}>
              ئەم بەشە بۆ دەستکاریکردنی زانیارییەکانی بەرهەمە.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

if (screen === "addProduct") {
  return (
    <AddProduct
      onBack={() => setScreen("manager")}
    />
  );
}
  
    /* =========================
   CHECKOUT
========================= */

if (screen === "checkout") {
  const total = cart.reduce(
    (sum, product) => sum + Number(product.price || 0),
    0
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.pad}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => setScreen("main")}
        >
          <Text style={styles.back}>
            ‹ گەڕانەوە
          </Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: "#FFD700",
            borderRadius: 20,
            padding: 20,
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            تەواوکردنی کڕین 🛒
          </Text>

          <TextInput
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              height: 55,
              paddingHorizontal: 15,
              marginBottom: 12,
              fontSize: 17,
              textAlign: "right",
            }}
            placeholder="ناو"
            placeholderTextColor="#777"
            value={customerName}
            onChangeText={setCustomerName}

            
          />

          <TextInput
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              height: 55,
              paddingHorizontal: 15,
              marginBottom: 12,
              fontSize: 17,
              textAlign: "right",
            }}
            placeholder="ژمارەی تەلەفون"
            placeholderTextColor="#777"
            keyboardType="phone-pad"
            value={customerPhone}
            onChangeText={setCustomerPhone}
          />

          <TextInput
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              minHeight: 75,
              paddingHorizontal: 15,
              paddingVertical: 12,
              marginBottom: 12,
              fontSize: 17,
              textAlign: "right",
            }}
            placeholder="ناونیشان"
            placeholderTextColor="#777"
            value={customerAddress}
            onChangeText={setCustomerAddress}
          />

          <TextInput
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              minHeight: 100,
              paddingHorizontal: 15,
              paddingVertical: 12,
              marginBottom: 20,
              fontSize: 17,
              textAlign: "right",
            }}
            placeholder="تێبینی"
            placeholderTextColor="#777"
            value={customerNote}
            onChangeText={setCustomerNote}
          />

          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 15,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              کۆی گشتی: {money(total)}
            </Text>
          </View>

         
<TouchableOpacity
  style={styles.goldBtn}
  onPress={async () => {
    const message =
      "🛍️ داواکاری نوێ\n\n" +
      "Shwshawaty ASYA\n\n" +
      "👤 ناو: " + customerName +
      "\n📱 ژمارەی تەلەفون: " + customerPhone +
      "\n📍 ناونیشان: " + customerAddress +
      "\n📝 تێبینی: " + customerNote +
      "\n\n🛒 بەرهەمەکان:\n" +
      cart
        .map(
          (product, index) =>
            `${index + 1}. ${product.name} - ${money(product.price)}`
        )
        .join("\n") +
      "\n\n💰 کۆی گشتی: " + money(total);

    const url =
      "https://wa.me/9647718758585?text=" +
      encodeURIComponent(message);

    // یەکەم: WhatsApp بکەرەوە
    Linking.openURL(url).catch(() => {
      Alert.alert(
        "هەڵە",
        "نەتوانرا WhatsApp بکرێتەوە."
      );
    });

    // دووەم: داواکاری لە Firebase تۆمار بکە
    try {
      await addDoc(collection(db, "orders"), {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAddress: customerAddress.trim(),
        customerNote: customerNote.trim(),

        items: cart.map((product) => ({
          productId: product.id,
          name: product.name,
          price: Number(product.price) || 0,
          quantity: 1,
        })),

        total: Number(total) || 0,
        status: "pending",
        createdAt: new Date(),
      });

      console.log("ORDER SAVED");

    } catch (error) {
      console.error("ORDER ERROR:", error);

      Alert.alert(
        "هەڵەی Firebase",
        error?.message ||
          "داواکاری لە Database تۆمار نەکرا."
      );
    }
  }}
>
  <Text style={styles.goldText}>
    ناردنی داواکاری
  </Text>
</TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================
   MANAGER PASSWORD
========================= */

if (screen === "managerPassword") {
  return (
    <PasswordScreen
      title="بەشی بەڕێوبەر"
      passwordCorrect="1993"
      onSuccess={() => setScreen("manager")}
      onBack={() => setScreen("main")}
    />
  );
}

/* =========================
   DASHBOARD PASSWORD
========================= */

if (screen === "dashboardPassword") {
  return (
    <PasswordScreen
      title="Dashboard"
      passwordCorrect="gardunali"
      onSuccess={() => setScreen("dashboard")}
      onBack={() => setScreen("main")}
    />
  );
}

  /* =========================
   MANAGER
========================= */
if (screen === "managerPassword") {
  return (
    <PasswordScreen
      title="بەشی بەڕێوبەر"
      passwordCorrect="gardunali"
      onSuccess={() => setScreen("manager")}
      onBack={() => setScreen("main")}
    />
  );
}
if (screen === "manager") {
  return (
<ManagerPanel
  onBack={() => setScreen("main")}
  onAddProduct={() => setScreen("addProduct")}
  onManageProducts={() => setScreen("manageProducts")}
  products={products}
  orders={orders}
  onDeleteProduct={deleteProduct}
  setScreen={setScreen}
  onNavigate={(nextScreen) => setScreen(nextScreen)}
/>
);
}
  /* =========================
     PRODUCT DETAILS
  ========================= */

  if (selected) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => setSelected(null)}
          >
            <Text style={styles.back}>
              ‹ گەڕانەوە
            </Text>
          </TouchableOpacity>

          {selected.image ? (
            <Image
              source={{ uri: selected.image }}
              style={styles.hero}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.noImage}>
              <Text style={styles.noImageText}>
                وێنەی بەرهەم بەردەست نییە
              </Text>
            </View>
          )}

          <View style={styles.pad}>
            <Text style={styles.title}>
              {selected.name}
            </Text>

            <Text style={styles.price}>
              {money(selected.price)}
            </Text>

            <Text style={styles.desc}>
              بەرهەمێکی جوان و کوالێتی بۆ ماڵەکەت.
              بۆ زانیاری زیاتر پەیوەندیمان پێوە بکە.
            </Text>

                      <TouchableOpacity
              style={styles.goldBtn}
              onPress={() => addToCart(selected)}
            >
              <Text style={styles.goldText}>
                🛒 زیادکردن بۆ سەبەت
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

/* MANAGER PASSWORD */

  /* =========================
     MAIN APP
  ========================= */

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.appContainer}>
        <View style={styles.header}>
          <Text style={styles.brand}>ASYA</Text>

         <Text style={styles.sub}>
  بەخێربێن بۆ شوشەواتی ئاسیا
</Text>
        </View>

        {/* HOME */}

        {tab === "home" && (
          <FlatList
            data={filtered}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.column}
            contentContainerStyle={styles.grid}
            ListHeaderComponent={
              <View>
                <View style={styles.banner}>
                  <Text style={styles.bannerTitle}>
                    کۆمەڵە خواردن
                  </Text>

                  <Text style={styles.bannerSub}>
                    نوێ و تایبەت بۆ تۆ
                  </Text>
                </View>

                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="بگەڕێ بۆ بەرهەم..."
                  placeholderTextColor="#777"
                  style={styles.search}
                />

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.cats}
                >
                  {categories.map((item) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => setCategory(item)}
                      style={[
                        styles.cat,
                        category === item &&
                          styles.catActive,
                      ]}
                    >
                      <Text
                        style={
                          category === item
                            ? styles.catTextActive
                            : styles.catText
                        }
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={styles.section}>
                  بەرهەمە نوێکان
                </Text>

                {productsLoading && (
                  <Text style={styles.loadingText}>
                    بەرهەمەکان دەهێنرێن...
                  </Text>
                )}

                {productsError !== "" && (
                  <Text style={styles.errorText}>
                    {productsError}
                  </Text>
                )}

                {!productsLoading &&
                  products.length === 0 && (
                    <Text style={styles.emptyProducts}>
                      هیچ بەرهەمێک لە Database نەدۆزرایەوە.
                    </Text>
                  )}

                {!productsLoading &&
                  products.length > 0 &&
                  filtered.length === 0 && (
                    <Text style={styles.emptyProducts}>
                      هیچ بەرهەمێک بۆ ئەم گەڕانە نەدۆزرایەوە.
                    </Text>
                  )}
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setSelected(item)}
                >
                  {item.image ? (
                    <Image
                      source={{ uri: item.image }}
                      style={styles.cardImg}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.cardImgPlaceholder}>
                      <Text style={styles.cardImgPlaceholderText}>
                        وێنە نییە
                      </Text>
                    </View>
                  )}

                  <Text
                    style={styles.cardName}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>

                  <Text style={styles.cardPrice}>
                    {money(item.price)}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.smallBtn}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.smallBtnText}>
                    + سەبەت
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {/* CART */}

        {tab === "cart" && (
          <ScrollView
            contentContainerStyle={styles.pad}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.pageTitle}>
              سەبەت 🛒
            </Text>

            {cart.length === 0 ? (
              <Text style={styles.empty}>
                سەبەتەکەت بەتاڵە.
              </Text>
            ) : (
              <>
                {cart.map((product, index) => (
                  <View
                    style={styles.row}
                    key={`${product.id}-${index}`}
                  >
                    <Text style={styles.rowName}>
                      {product.name}
                    </Text>

                    <Text style={styles.cartPrice}>
                      {money(product.price)}
                    </Text>
                  </View>
                ))}

                <TouchableOpacity
                  style={styles.goldBtn}
                  onPress={() => setScreen("checkout")}
                >
                  <Text style={styles.goldText}>
                    تەواوکردنی داواکاری
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        )}

        {/* PROFILE */}

        {tab === "profile" && (
          <ScrollView
            contentContainerStyle={styles.pad}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.pageTitle}>
              پڕۆفایل 👤
            </Text>

            <Text style={styles.desc}>
              بەخێربێیت بۆ پڕۆفایلی Shwshawaty ASYA.
            </Text>

            <TouchableOpacity
              style={styles.profileEntry}
              onPress={() =>
                setScreen("dashboardPassword")
              }
            >
              <Text style={styles.profileEntryIcon}>
                📊
              </Text>

              <View style={styles.profileEntryText}>
                <Text style={styles.profileEntryTitle}>
                  Dashboard
                </Text>

                <Text style={styles.profileEntrySub}>
                  داشبۆرد و حساباتی Shwshawaty ASYA
                </Text>
              </View>

              <Text style={styles.profileArrow}>
                ‹
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileEntry}
              onPress={() =>
                setScreen("managerPassword")
              }
            >
              <Text style={styles.profileEntryIcon}>
                👨‍💼
              </Text>

              <View style={styles.profileEntryText}>
                <Text style={styles.profileEntryTitle}>
                  بەشی بەڕێوبەر
                </Text>

                <Text style={styles.profileEntrySub}>
                  بەڕێوبەرایەتی و کۆنترۆڵی ئەپ
                </Text>
              </View>

              <Text style={styles.profileArrow}>
                ‹
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {/* NAVIGATION */}

        <View style={styles.nav}>
          <TouchableOpacity
            onPress={() => setTab("home")}
            style={styles.navButton}
          >
            <Text
              style={
                tab === "home"
                  ? styles.navOn
                  : styles.navOff
              }
            >
              ⌂{"\n"}سەرەکی
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTab("cart")}
            style={styles.navButton}
          >
            <Text
              style={
                tab === "cart"
                  ? styles.navOn
                  : styles.navOff
              }
            >
              🛒{"\n"}سەبەت ({cart.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTab("profile")}
            style={styles.navButton}
          >
            <Text
              style={
                tab === "profile"
                  ? styles.navOn
                  : styles.navOff
              }
            >
              👤{"\n"}پڕۆفایل
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  welcomeSafe: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
managerSafe: {
  flex: 1,
  backgroundColor: "#0b0b0b",
},

  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  welcomeBrand: {
    fontSize: 30,
    fontWeight: "800",
    color: "#d7a52b",
    textAlign: "center",
  },

  welcomeText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 18,
    lineHeight: 28,
  },

  startButton: {
    backgroundColor: "#d7a52b",
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 14,
    marginTop: 35,
    minWidth: 220,
    alignItems: "center",
  },

  startButtonText: {
    color: "#111",
    fontSize: 17,
    fontWeight: "800",
  },

  safe: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },

  appContainer: {
    flex: 1,
  },

  header: {
    padding: 18,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#292929",
  },

  brand: {
    fontSize: 30,
    fontWeight: "800",
    color: "#d7a52b",
  },

  sub: {
    color: "#fff",
    fontSize: 12,
    marginTop: 2,
  },

  banner: {
    margin: 16,
    padding: 22,
    borderRadius: 18,
    backgroundColor: "#1d1d1d",
  },

  bannerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#e1b63e",
    textAlign: "right",
  },

  bannerSub: {
    color: "#fff",
    marginTop: 6,
    fontSize: 16,
    textAlign: "right",
  },

  search: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: "#111",
    textAlign: "right",
  },

  cats: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  cat: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#555",
    marginRight: 8,
  },

  catActive: {
    backgroundColor: "#d7a52b",
    borderColor: "#d7a52b",
  },

  catText: {
    color: "#ddd",
  },

  catTextActive: {
    color: "#111",
    fontWeight: "700",
  },

  section: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingVertical: 8,
    textAlign: "right",
  },

  loadingText: {
    color: "#d7a52b",
    textAlign: "center",
    fontSize: 16,
    padding: 30,
  },

  errorText: {
    color: "#ff6262",
    textAlign: "center",
    fontSize: 15,
    padding: 20,
  },

  emptyProducts: {
    color: "#aaa",
    textAlign: "center",
    fontSize: 16,
    padding: 30,
  },

  grid: {
    paddingHorizontal: 16,
    paddingBottom: 25,
  },

  column: {
    gap: 12,
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#1c1c1c",
    borderRadius: 14,
    padding: 9,
    flex: 1,
    minWidth: 0,
  },

  cardImg: {
    width: "100%",
    height: 145,
    borderRadius: 10,
  },

  cardImgPlaceholder: {
    width: "100%",
    height: 145,
    borderRadius: 10,
    backgroundColor: "#292929",
    alignItems: "center",
    justifyContent: "center",
  },

  cardImgPlaceholderText: {
    color: "#888",
  },

  cardName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
    textAlign: "right",
  },

  cardPrice: {
    color: "#d7a52b",
    fontWeight: "800",
    marginTop: 5,
    textAlign: "right",
  },

  smallBtn: {
    backgroundColor: "#d7a52b",
    borderRadius: 9,
    padding: 8,
    marginTop: 8,
    alignItems: "center",
  },

  smallBtnText: {
    color: "#111",
    fontWeight: "800",
  },

  nav: {
    height: 68,
    borderTopWidth: 1,
    borderTopColor: "#333",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#101010",
  },

  navButton: {
    minWidth: 80,
    alignItems: "center",
  },

  navOn: {
    color: "#d7a52b",
    textAlign: "center",
    fontWeight: "800",
  },

  navOff: {
    color: "#aaa",
    textAlign: "center",
  },

  pad: {
    padding: 18,
    paddingBottom: 30,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 20,
    textAlign: "right",
  },

  empty: {
    color: "#aaa",
    fontSize: 17,
    textAlign: "right",
  },

  row: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rowName: {
    color: "#fff",
    flex: 1,
    marginRight: 10,
    textAlign: "right",
  },

  cartPrice: {
    color: "#d7a52b",
    fontWeight: "700",
  },

  goldBtn: {
    backgroundColor: "#d7a52b",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  goldText: {
    color: "#111",
    fontWeight: "800",
    fontSize: 16,
  },

  back: {
    color: "#d7a52b",
    fontSize: 18,
    padding: 16,
    textAlign: "right",
  },

  hero: {
    width: "100%",
    height: 330,
  },

  noImage: {
    width: "100%",
    height: 330,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    alignItems: "center",
  },

  noImageText: {
    color: "#888",
    fontSize: 16,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#fff",
    textAlign: "right",
  },

  price: {
    fontSize: 22,
    color: "#d7a52b",
    fontWeight: "800",
    marginTop: 10,
    textAlign: "right",
  },

  desc: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 26,
    marginTop: 15,
    textAlign: "right",
  },

  passwordContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  lockBox: {
    margin: 20,
    padding: 25,
    borderRadius: 20,
    backgroundColor: "#1c1c1c",
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
  },

  lockIcon: {
    fontSize: 50,
    marginBottom: 15,
  },

  passwordTitle: {
    color: "#d7a52b",
    fontSize: 27,
    fontWeight: "800",
    textAlign: "center",
  },

  passwordSubtitle: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  passwordInput: {
    width: "100%",
    backgroundColor: "#fff",
    color: "#111",
    borderRadius: 12,
    padding: 14,
    fontSize: 17,
    textAlign: "center",
  },
input: {
  width: "100%",
  backgroundColor: "#1c1c1c",
  color: "#fff",
  borderRadius: 12,
  padding: 14,
  fontSize: 16,
  marginTop: 10,
  textAlign: "right",
  borderWidth: 1,
  borderColor: "#333",
},
  passwordError: {
    color: "#ff6262",
    marginTop: 12,
    fontSize: 14,
    fontWeight: "700",
  },

  profileEntry: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 16,
    padding: 16,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#292929",
  },

  profileEntryIcon: {
    fontSize: 31,
    marginRight: 12,
  },

  profileEntryText: {
    flex: 1,
  },

  profileEntryTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    textAlign: "right",
  },

  profileEntrySub: {
    color: "#999",
    fontSize: 12,
    marginTop: 5,
    textAlign: "right",
  },

  profileArrow: {
    color: "#d7a52b",
    fontSize: 30,
    marginLeft: 8,
  },

  accountingContainer: {
    padding: 16,
    paddingBottom: 45,
  },

  accountingTitle: {
    color: "#d7a52b",
    fontSize: 25,
    fontWeight: "800",
    textAlign: "right",
    marginTop: 4,
  },

  accountingDate: {
    color: "#999",
    fontSize: 14,
    textAlign: "right",
    marginTop: 6,
    marginBottom: 18,
  },

  accountingGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  accountingCard: {
    width: "48%",
    backgroundColor: "#1c1c1c",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#292929",
  },

  accountingIcon: {
    fontSize: 25,
    textAlign: "right",
  },

  accountingCardTitle: {
    color: "#aaa",
    fontSize: 13,
    textAlign: "right",
    marginTop: 10,
  },

  accountingCardValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "right",
    marginTop: 6,
  },

  accountingSection: {
    backgroundColor: "#1c1c1c",
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#292929",
  },

  accountingSectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "right",
  },

  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#292929",
  },

  transactionInfo: {
    flex: 1,
    marginRight: 10,
  },

  transactionName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "right",
  },

  transactionDate: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
    textAlign: "right",
  },

  income: {
    color: "#45d483",
    fontWeight: "800",
  },

  expense: {
    color: "#ff6262",
    fontWeight: "800",
  },

  warningHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  warningNumber: {
    color: "#ff6262",
    fontSize: 24,
    fontWeight: "900",
  },

  warningText: {
    color: "#aaa",
    textAlign: "right",
    marginTop: 8,
  },

  menuTitle: {
    color: "#d7a52b",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "right",
    marginTop: 24,
    marginBottom: 12,
  },

  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  menuButton: {
    width: "48%",
    backgroundColor: "#1c1c1c",
    borderRadius: 14,
    paddingVertical: 18,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#292929",
  },

  menuIcon: {
    fontSize: 25,
  },

  menuText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 7,
    textAlign: "center",
  },

  accountingNote: {
    backgroundColor: "#171717",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#333",
    padding: 15,
    marginTop: 8,
  },

  accountingNoteTitle: {
    color: "#d7a52b",
    fontSize: 15,
    fontWeight: "800",
    textAlign: "right",
  },

  accountingNoteText: {
    color: "#999",
    fontSize: 13,
    lineHeight: 22,
    textAlign: "right",
    marginTop: 7,
  },

  managerTitle: {
    color: "#d7a52b",
    fontSize: 27,
    fontWeight: "800",
    textAlign: "right",
    marginTop: 4,
  },

  managerWelcome: {
    backgroundColor: "#1c1c1c",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#292929",
    padding: 20,
    alignItems: "center",
  },

  managerWelcomeIcon: {
    fontSize: 50,
  },

  managerWelcomeTitle: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 10,
    textAlign: "center",
  },

  managerWelcomeText: {
    color: "#aaa",
    fontSize: 14,
    lineHeight: 23,
    marginTop: 8,
    textAlign: "center",
  },
  stockText: {
    color: "#d7a52b",
    fontSize: 13,
    marginTop: 4,
    textAlign: "right",
  },

  stockControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    gap: 15,
  },

  stockButton: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#d7a52b",
    alignItems: "center",
    justifyContent: "center",
  },

  stockButtonText: {
    color: "#111",
    fontSize: 25,
    fontWeight: "800",
  },

  stockNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    minWidth: 35,
    textAlign: "center",
  },
});