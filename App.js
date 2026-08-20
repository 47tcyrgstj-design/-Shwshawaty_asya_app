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

import { collection, onSnapshot } from "firebase/firestore";
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
    <SafeAreaView style={styles.safe}>
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

function Dashboard({ onBack }) {
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

        <Text style={styles.menuTitle}>بەشەکانی حسابات</Text>

        <View style={styles.menuGrid}>
          {menu.map(([icon, title], index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuButton}
              onPress={() =>
                showMessage(
                  title,
                  "ئەم بەشە لە قۆناغی داهاتوودا چالاک دەکرێت."
                )
              }
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

function ManagerPanel({ onBack, onAddProduct}) {
  const items = [
    ["📦", "بەڕێوبەرایەتی بەرهەمەکان"],
    ["➕", "زیادکردنی بەرهەم"],
    ["✏️", "دەستکاریکردنی بەرهەم"],
    ["🗑️", "سڕینەوەی بەرهەم"],
    ["👥", "بەڕێوبەرایەتی کڕیارەکان"],
    ["🏭", "دابینکەرەکان"],
    ["📊", "ڕاپۆرتەکانی فرۆشتن"],
    ["⚙️", "ڕێکخستنەکان"],
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

        <Text style={styles.managerTitle}>
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
                 if (title === "زیادکردنی بەرهەم") {
                   onAddProduct();
                 } else {
                   Alert.alert(
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
  const [category, setCategory] = useState("هەموو");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [selected, setSelected] = useState(null);
  const [screen, setScreen] = useState("main");

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");

  /* =========================
     FIRESTORE PRODUCTS
  ========================= */

  useEffect(() => {
    let unsubscribe = null;

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

  const addToCart = (product) => {
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
            Welcome Shwshawaty ASYA
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
      />
    );
  }
  if (screen === "manager") {
  return (
    <ManagerPanel
      onBack={() => setScreen("main")}
      onAddProduct={() => setScreen("addProduct")}
    />
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
            onPress={() => {
const message =
  "🛍️ داواکاری نوێ\n\n" +
  "Shwshawaty ASYA\n\n" +
  "👤 ناو: " +
  customerName +
  "\n📱 ژمارەی تەلەفون: " +
  customerPhone +
  "\n📍 ناونیشان: " +
  customerAddress +
  "\n📝 تێبینی: " +
  customerNote +
  "\n\n🛒 بەرهەمەکان:\n" +
  cart
    .map(
      (product, index) =>
        `${index + 1}. ${product.name} - ${money(product.price)}`
    )
    .join("\n") +
  "\n\n💰 کۆی گشتی: " +
  money(total);

  const url =
    "https://wa.me/9647708758585?text=" +
    encodeURIComponent(message);

  Linking.openURL(url).catch(() => {
  Alert.alert("هەڵە", "نەتوانرا WhatsApp بکرێتەوە.");
});
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
     MANAGER
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
});