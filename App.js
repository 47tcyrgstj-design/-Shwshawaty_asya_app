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

const accountingData = {
  todaySales: 1250000,
  todayProfit: 340000,
  todayExpenses: 120000,
  customerDebts: 2180000,
  lowStock: 7,
};

const money = (value) =>
  new Intl.NumberFormat("ku-IQ").format(value) + " د.ع";

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
          <Text style={styles.back}>‹ گەڕانەوە</Text>
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

  if (screen === "dashboard") {
    return (
      <Dashboard
        onBack={() => setScreen("main")}
      />
    );
  }

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

  if (screen === "manager") {
    return (
      <ManagerPanel
        onBack={() => setScreen("main")}
      />
    );
  }

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

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.brand}>ASYA</Text>

        <Text style={styles.sub}>
          Welcome Shwshawaty ASYA
        </Text>
      </View>

      {tab === "home" && (
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
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
        <ScrollView
          contentContainerStyle={styles.pad}
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
}import React, { useMemo, useState } from "react";
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

const accountingData = {
  todaySales: 1250000,
  todayProfit: 340000,
  todayExpenses: 120000,
  customerDebts: 2180000,
  lowStock: 7,
};

const money = (value) =>
  new Intl.NumberFormat("ku-IQ").format(value) + " د.ع";

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
          <Text style={styles.back}>‹ گەڕانەوە</Text>
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

  if (screen === "dashboard") {
    return (
      <Dashboard
        onBack={() => setScreen("main")}
      />
    );
  }

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

  if (screen === "manager") {
    return (
      <ManagerPanel
        onBack={() => setScreen("main")}
      />
    );
  }

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

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.brand}>ASYA</Text>

        <Text style={styles.sub}>
          Welcome Shwshawaty ASYA
        </Text>
      </View>

      {tab === "home" && (
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
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
        <ScrollView
          contentContainerStyle={styles.pad}
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
}
