import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

/* =========================
   PRODUCTS
========================= */

const products = [
  {
    id: "1",
    name: "کۆمەڵە خواردن 25 پارچە",
    price: 75000,
    category: "کۆمەڵە خواردن",
    image:
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800",
  },
  {
    id: "2",
    name: "سێتی پیاڵە 12 پارچە",
    price: 45000,
    category: "پیاڵە و پیاڵەخانە",
    image:
      "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=800",
  },
  {
    id: "3",
    name: "کاسە سێتە 6 پارچە",
    price: 30000,
    category: "کاسە و جام",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800",
  },
  {
    id: "4",
    name: "کۆمەڵە دیاری",
    price: 90000,
    category: "کۆمەڵە دیاری",
    image:
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=800",
  },
];

const categories = [
  "هەموو",
  "کۆمەڵە خواردن",
  "پیاڵە و پیاڵەخانە",
  "کاسە و جام",
  "کالای ماڵ",
  "کۆمەڵە دیاری",
];

/* =========================
   ACCOUNTING
========================= */

const accountingData = {
  todaySales: 1250000,
  todayProfit: 340000,
  todayExpenses: 120000,
  customerDebts: 2180000,
  lowStock: 7,
};

const money = (value) =>
  new Intl.NumberFormat("ku-IQ").format(value) + " د.ع";

/* =========================
   PASSWORD SCREEN
========================= */

function PasswordScreen({
  title,
  correctPassword,
  onSuccess,
  onBack,
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const checkPassword = () => {
    if (password === correctPassword) {
      setError("");
      onSuccess();
    } else {
      setError("پاسۆردەکە هەڵەیە.");
      setPassword("");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.passwordContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹ گەڕانەوە</Text>
        </TouchableOpacity>

        <View style={styles.lockBox}>
          <Text style={styles.lockIcon}>🔐</Text>

          <Text style={styles.passwordTitle}>
            {title}
          </Text>

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
            onSubmitEditing={checkPassword}
          />

          {error !== "" && (
            <Text style={styles.passwordError}>
              {error}
            </Text>
          )}

          <TouchableOpacity
            style={styles.goldBtn}
            onPress={checkPassword}
          >
            <Text style={styles.goldText}>
              چوونەژوورەوە
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
          <Text style={styles.back}>
            ‹ گەڕانەوە
          </Text>
        </TouchableOpacity>

        <Text style={styles.accountingTitle}>
          📊 Dashboard ـی Shwshawaty ASYA
        </Text>

        <Text style={styles.accountingDate}>
          کورتەی حساباتی ئەمڕۆ
        </Text>

        <View style={styles.accountingGrid}>
          {cards.map((card, index) => (
            <View
              style={styles.accountingCard}
              key={index}
            >
              <Text style={styles.accountingIcon}>
                {card[0]}
              </Text>

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

          <View style={styles.transaction}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>
                فرۆشتنی طقم جام
              </Text>

              <Text style={styles.transactionDate}>
                ئەمڕۆ • 08:45
              </Text>
            </View>

            <Text style={styles.income}>
              + 125,000 د.ع
            </Text>
          </View>

          <View style={styles.transaction}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>
                خەرجی گەیاندن
              </Text>

              <Text style={styles.transactionDate}>
                ئەمڕۆ • 10:20
              </Text>
            </View>

            <Text style={styles.expense}>
              - 35,000 د.ع
            </Text>
          </View>

          <View style={styles.transactionLast}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>
                کڕینی کاڵا
              </Text>

              <Text style={styles.transactionDate}>
                دوێنێ • 15:10
              </Text>
            </View>

            <Text style={styles.expense}>
              - 280,000 د.ع
            </Text>
          </View>
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

        <Text style={styles.menuTitle}>
          بەشەکانی حسابات
        </Text>

        <View style={styles.menuGrid}>
          {menu.map(([icon, title], index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuButton}
              onPress={() =>
                Alert.alert(
                  title,
                  "ئەم بەشە لە قۆناغی داهاتوودا بە سیستەمی ڕاستەقینەی حسابات چالاک دەکرێت."
                )
              }
            >
              <Text style={styles.menuIcon}>
                {icon}
              </Text>

              <Text style={styles.menuText}>
                {title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.accountingNote}>
          <Text style={styles.accountingNoteTitle}>
            🔐 تێبینی
          </Text>

          <Text style={styles.accountingNoteText}>
            ئەم Dashboard ـە قۆناغی یەکەمی سیستەمی حساباتە.
            ژمارەکان لە ئێستادا Demo ـن.
            Database و حساباتی ڕاستەقینە لە قۆناغی داهاتوودا زیاد دەکرێن.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================
   MANAGER
========================= */

function ManagerPanel({ onBack }) {
  const managerItems = [
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
          <Text style={styles.back}>
            ‹ گەڕانەوە
          </Text>
        </TouchableOpacity>

        <Text style={styles.managerTitle}>
          👨‍💼 بەشی بەڕێوبەر
        </Text>

        <Text style={styles.accountingDate}>
          بەخێربێیت بۆ بەشی بەڕێوبەرایەتی
        </Text>

        <View style={styles.managerWelcome}>
          <Text style={styles.managerWelcomeIcon}>
            👨‍💼
          </Text>

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
          {managerItems.map(([icon, title], index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuButton}
              onPress={() =>
                Alert.alert(
                  title,
                  "ئەم بەشە ئامادەیە بۆ زیادکردنی سیستەمی ڕاستەقینە."
                )
              }
            >
              <Text style={styles.menuIcon}>
                {icon}
              </Text>

              <Text style={styles.menuText}>
                {title}
              </Text>
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
  const [selected, setSelected] = useState(null);

  const [screen, setScreen] = useState("main");

  const filtered = useMemo(() => {
    return products.filter(
      (product) =>
        (category === "هەموو" ||
          product.category === category) &&
        product.name
          .toLowerCase()
          .includes(query.toLowerCase())
    );
  }, [category, query]);

  const addToCart = (product) => {
    setCart((current) => [...current, product]);

    Alert.alert(
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
        correctPassword="gardunali"
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

  /* =========================
     MANAGER PASSWORD
========================= */

  if (screen === "managerPassword") {
    return (
      <PasswordScreen
        title="بەشی بەڕێوبەر"
        correctPassword="1993"
        onSuccess={() => setScreen("manager")}
        onBack={() => setScreen("main")}
      />
    );
  }

  /* =========================
     MANAGER
========================= */

  if (screen === "manager") {
    return (
      <ManagerPanel
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
        <ScrollView>
          <TouchableOpacity
            onPress={() => setSelected(null)}
          >
            <Text style={styles.back}>
              ‹ گەڕانەوە
            </Text>
          </TouchableOpacity>

          <Image
            source={{ uri: selected.image }}
            style={styles.hero}
          />

          <View style={styles.pad}>
            <Text style={styles.title}>
              {selected.name}
            </Text>

            <Text style={styles.price}>
              {selected.price.toLocaleString()} IQD
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
     MAIN
========================= */

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.brand}>ASYA</Text>

        <Text style={styles.sub}>
          Welcome Shwshawaty ASYA
        </Text>
      </View>

      {tab === "home" && (
        <ScrollView showsVerticalScrollIndicator={false}>
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
            autoCapitalize="none"
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.cats}
          >
            {categories.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setCategory(item)}
                style={[
                  styles.cat,
                  category === item && styles.catActive,
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

          <FlatList
            data={filtered}
            numColumns={2}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={styles.column}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => setSelected(item)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.cardImg}
                />

                <Text
                  style={styles.cardName}
                  numberOfLines={2}
                >
                  {item.name}
                </Text>

                <Text style={styles.cardPrice}>
                  {item.price.toLocaleString()} IQD
                </Text>

                <TouchableOpacity
                  style={styles.smallBtn}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.smallBtnText}>
                    + سەبەت
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      )}

      {tab === "cart" && (
        <ScrollView contentContainerStyle={styles.pad}>
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
                    {product.price.toLocaleString()} IQD
                  </Text>
                </View>
              ))}

              <TouchableOpacity
                style={styles.goldBtn}
                onPress={() =>
                  Alert.alert(
                    "داواکاری",
                    "لە وەشانی داهاتوودا داواکارییەکە بە سیستەمی فرۆشتن نێردراوە."
                  )
                }
              >
                <Text style={styles.goldText}>
                  تەواوکردنی داواکاری
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      )}

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
            onPress={() => setScreen("dashboardPassword")}
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
            onPress={() => setScreen("managerPassword")}
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
    </SafeAreaView>
  );
}/* =========================
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
  },

  bannerSub: {
    color: "#fff",
    marginTop: 6,
    fontSize: 16,
  },

  search: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: "#111",
  },

  cats: {
    paddingHorizontal: 16,
    marginVertical: 12,
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
  },

  grid: {
    padding: 16,
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
  },

  cardImg: {
    width: "100%",
    height: 145,
    borderRadius: 10,
  },

  cardName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
  },

  cardPrice: {
    color: "#d7a52b",
    fontWeight: "800",
    marginTop: 5,
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
  },

  empty: {
    color: "#aaa",
    fontSize: 17,
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
  },

  hero: {
    width: "100%",
    height: 330,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#fff",
  },

  price: {
    fontSize: 22,
    color: "#d7a52b",
    fontWeight: "800",
    marginTop: 10,
  },

  desc: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 26,
    marginTop: 15,
  },

  /* PASSWORD */

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

  /* PROFILE */

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

  /* DASHBOARD */

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

  transactionLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 14,
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

  /* MANAGER */

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
