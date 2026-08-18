import React, {useMemo, useState} from "react";
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
  Alert
} from "react-native";

const products = [
  {
    id:"1",
    name:"کۆمەڵە خواردن 25 پارچە",
    price:75000,
    category:"کۆمەڵە خواردن",
    image:"https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800"
  },
  {
    id:"2",
    name:"سێتی پیاڵە 12 پارچە",
    price:45000,
    category:"پیاڵە و پیاڵەخانە",
    image:"https://images.unsplash.com/photo-1572119865084-43c285814d63?w=800"
  },
  {
    id:"3",
    name:"کاسە سێتە 6 پارچە",
    price:30000,
    category:"کاسە و جام",
    image:"https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800"
  },
  {
    id:"4",
    name:"کۆمەڵە دیاری",
    price:90000,
    category:"کۆمەڵە دیاری",
    image:"https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=800"
  },
];

const cats = [
  "هەموو",
  "کۆمەڵە خواردن",
  "پیاڵە و پیاڵەخانە",
  "کاسە و جام",
  "کالای ماڵ",
  "کۆمەڵە دیاری"
];

/* =========================
   ACCOUNTING DEMO DATA
========================= */

const accountingData = {
  todaySales:1250000,
  todayProfit:340000,
  todayExpenses:120000,
  customerDebts:2180000,
  lowStock:7
};

const money = value =>
  new Intl.NumberFormat("ku-IQ").format(value) + " د.ع";


/* =========================
   PASSWORD SCREEN
========================= */

function PasswordScreen({title, correctPassword, onSuccess, onBack}) {

  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const checkPassword = () => {

    if(password === correctPassword){

      setError("");
      onSuccess();

    } else {

      setError("پاسۆردەکە هەڵەیە.");

    }
  };

  return (
    <SafeAreaView style={s.safe}>

      <ScrollView contentContainerStyle={s.passwordContainer}>

        <TouchableOpacity onPress={onBack}>
          <Text style={s.back}>
            ‹ گەڕانەوە
          </Text>
        </TouchableOpacity>

        <View style={s.passwordBox}>

          <Text style={s.passwordIcon}>
            🔐
          </Text>

          <Text style={s.passwordTitle}>
            {title}
          </Text>

          <Text style={s.passwordSub}>
            بۆ چوونەژوورەوە پاسۆرد بنووسە
          </Text>

          <TextInput
            value={password}
            onChangeText={(text)=>{
              setPassword(text);
              setError("");
            }}
            placeholder="پاسۆرد"
            placeholderTextColor="#777"
            secureTextEntry
            style={s.passwordInput}
            autoCapitalize="none"
          />

          {error !== "" && (
            <Text style={s.passwordError}>
              {error}
            </Text>
          )}

          <TouchableOpacity
            style={s.goldBtn}
            onPress={checkPassword}
          >

            <Text style={s.goldText}>
              چوونەژوورەوە
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}


/* =========================
   ACCOUNTING DASHBOARD
========================= */

function AccountingDashboard({onBack}) {

  const cards = [
    ["💰","فرۆشتنی ئەمڕۆ",money(accountingData.todaySales)],
    ["📈","قازانجی ئەمڕۆ",money(accountingData.todayProfit)],
    ["💸","خەرجی ئەمڕۆ",money(accountingData.todayExpenses)],
    ["👥","قەرزی کڕیاران",money(accountingData.customerDebts)]
  ];

  const menu = [
    ["🧾","فرۆشتن"],
    ["🛍️","کڕین"],
    ["📦","کۆگا"],
    ["👥","کڕیارەکان"],
    ["🏭","دابینکەرەکان"],
    ["💸","خەرجییەکان"],
    ["📈","قازانج و زیان"],
    ["📊","ڕاپۆرتەکان"]
  ];

  return (
    <SafeAreaView style={s.safe}>

      <ScrollView
        contentContainerStyle={s.accountingContainer}
        showsVerticalScrollIndicator={false}
      >

        <TouchableOpacity onPress={onBack}>
          <Text style={s.back}>
            ‹ گەڕانەوە
          </Text>
        </TouchableOpacity>

        <Text style={s.accountingTitle}>
          📊 Dashboard ـی Shwshawaty ASYA
        </Text>

        <Text style={s.accountingDate}>
          کورتەی حساباتی ئەمڕۆ
        </Text>


        <View style={s.accountingGrid}>

          {cards.map((card,index)=>(
            <View
              style={s.accountingCard}
              key={index}
            >

              <Text style={s.accountingIcon}>
                {card[0]}
              </Text>

              <Text style={s.accountingCardTitle}>
                {card[1]}
              </Text>

              <Text style={s.accountingCardValue}>
                {card[2]}
              </Text>

            </View>
          ))}

        </View>


        <View style={s.accountingSection}>

          <Text style={s.accountingSectionTitle}>
            🧾 دوایین مامەڵەکان
          </Text>

          <View style={s.transaction}>

            <View style={s.transactionInfo}>

              <Text style={s.transactionName}>
                فرۆشتنی طقم جام
              </Text>

              <Text style={s.transactionDate}>
                ئەمڕۆ • 08:45
              </Text>

            </View>

            <Text style={s.income}>
              + 125,000 د.ع
            </Text>

          </View>


          <View style={s.transaction}>

            <View style={s.transactionInfo}>

              <Text style={s.transactionName}>
                خەرجی گەیاندن
              </Text>

              <Text style={s.transactionDate}>
                ئەمڕۆ • 10:20
              </Text>

            </View>

            <Text style={s.expense}>
              - 35,000 د.ع
            </Text>

          </View>


          <View style={s.transactionLast}>

            <View style={s.transactionInfo}>

              <Text style={s.transactionName}>
                کڕینی کاڵا
              </Text>

              <Text style={s.transactionDate}>
                دوێنێ • 15:10
              </Text>

            </View>

            <Text style={s.expense}>
              - 280,000 د.ع
            </Text>

          </View>

        </View>


        <View style={s.accountingSection}>

          <View style={s.warningHeader}>

            <Text style={s.accountingSectionTitle}>
              📦 کۆگای کەم
            </Text>

            <Text style={s.warningNumber}>
              {accountingData.lowStock}
            </Text>

          </View>

          <Text style={s.warningText}>
            {accountingData.lowStock} بەرهەم نزیکن لە تەواوبوون.
          </Text>

        </View>


        <Text style={s.menuTitle}>
          بەشەکانی Dashboard
        </Text>


        <View style={s.menuGrid}>

          {menu.map(([icon,title],index)=>(
            <TouchableOpacity
              key={index}
              style={s.menuButton}
              onPress={() =>
                Alert.alert(
                  title,
                  "ئەم بەشە لە قۆناغی داهاتوودا بە سیستەمی ڕاستەقینەی حسابات چالاک دەکرێت."
                )
              }
            >

              <Text style={s.menuIcon}>
                {icon}
              </Text>

              <Text style={s.menuText}>
                {title}
              </Text>

            </TouchableOpacity>
          ))}

        </View>


        <View style={s.accountingNote}>

          <Text style={s.accountingNoteTitle}>
            🔐 تێبینی
          </Text>

          <Text style={s.accountingNoteText}>
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
   MANAGER DASHBOARD
========================= */

function ManagerDashboard({onBack}) {

  return (
    <SafeAreaView style={s.safe}>

      <ScrollView
        contentContainerStyle={s.managerContainer}
        showsVerticalScrollIndicator={false}
      >

        <TouchableOpacity onPress={onBack}>
          <Text style={s.back}>
            ‹ گەڕانەوە
          </Text>
        </TouchableOpacity>

        <Text style={s.managerTitle}>
          👨‍💼 بەشی بەڕێوبەر
        </Text>

        <Text style={s.managerSub}>
          بەخێربێیت بۆ بەشی بەڕێوبەری Shwshawaty ASYA
        </Text>


        <View style={s.managerCard}>

          <Text style={s.managerCardIcon}>
            📦
          </Text>

          <Text style={s.managerCardTitle}>
            بەڕێوبەرایەتی بەرهەمەکان
          </Text>

          <Text style={s.managerCardText}>
            لە قۆناغی داهاتوودا دەتوانیت بەرهەم زیاد بکەیت،
            دەستکاری بکەیت و بیسڕیتەوە.
          </Text>

        </View>


        <View style={s.managerCard}>

          <Text style={s.managerCardIcon}>
            👥
          </Text>

          <Text style={s.managerCardTitle}>
            بەڕێوبەرایەتی کڕیاران
          </Text>

          <Text style={s.managerCardText}>
            زانیاری کڕیاران و مێژووی داواکارییەکان لێرە کۆدەکرێنەوە.
          </Text>

        </View>


        <View style={s.managerCard}>

          <Text style={s.managerCardIcon}>
            📊
          </Text>

          <Text style={s.managerCardTitle}>
            ڕاپۆرتەکان
          </Text>

          <Text style={s.managerCardText}>
            ڕاپۆرتی فرۆشتن، کڕین و قازانج لە وەشانی داهاتوودا زیاد دەکرێت.
          </Text>

        </View>


        <View style={s.managerCard}>

          <Text style={s.managerCardIcon}>
            ⚙️
          </Text>

          <Text style={s.managerCardTitle}>
            ڕێکخستنەکانی سیستەم
          </Text>

          <Text style={s.managerCardText}>
            بەشی ڕێکخستنەکان بۆ بەڕێوبەر لە قۆناغی داهاتوودا چالاک دەکرێت.
          </Text>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}


/* =========================
   MAIN APP
========================= */

export default function App(){

  const [started,setStarted] = useState(false);

  const [tab,setTab] = useState("home");

  const [category,setCategory] =
    useState("هەموو");

  const [query,setQuery] =
    useState("");

  const [cart,setCart] =
    useState([]);

  const [selected,setSelected] =
    useState(null);

  const [page,setPage] =
    useState(null);


  const filtered = useMemo(
    () =>
      products.filter(p =>
        (category==="هەموو" || p.category===category) &&
        p.name
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [category,query]
  );


  const addToCart = p => {

    setCart(c => [...c,p]);

    Alert.alert(
      "زیادکرا",
      `${p.name} خرایە ناو سەبەتەکە.`
    );

  };


  /* =========================
     WELCOME
  ========================= */

  if(!started){

    return (

      <SafeAreaView style={s.welcomeSafe}>

        <View style={s.welcomeContainer}>

          <Text style={s.welcomeBrand}>
            Welcome Shwshawaty ASYA
          </Text>

          <Text style={s.welcomeText}>
            بۆ بینینی بەرهەمەکان کلیک لە بەشی خوارەوە بکە
          </Text>

          <TouchableOpacity
            style={s.startButton}
            onPress={()=>setStarted(true)}
          >

            <Text style={s.startButtonText}>
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

  if(page==="dashboardPassword"){

    return (
      <PasswordScreen
        title="📊 Dashboard"
        correctPassword="gardunali"
        onSuccess={()=>setPage("dashboard")}
        onBack={()=>setPage(null)}
      />
    );
  }


  /* =========================
     MANAGER PASSWORD
  ========================= */

  if(page==="managerPassword"){

    return (
      <PasswordScreen
        title="👨‍💼 بەشی بەڕێوبەر"
        correctPassword="1993"
        onSuccess={()=>setPage("manager")}
        onBack={()=>setPage(null)}
      />
    );
  }


  /* =========================
     DASHBOARD
  ========================= */

  if(page==="dashboard"){

    return (
      <AccountingDashboard
        onBack={()=>setPage(null)}
      />
    );
  }


  /* =========================
     MANAGER
  ========================= */

  if(page==="manager"){

    return (
      <ManagerDashboard
        onBack={()=>setPage(null)}
      />
    );
  }


  /* =========================
     PRODUCT DETAILS
  ========================= */

  if(selected){

    return (

      <SafeAreaView style={s.safe}>

        <ScrollView>

          <TouchableOpacity
            onPress={()=>setSelected(null)}
          >

            <Text style={s.back}>
              ‹ گەڕانەوە
            </Text>

          </TouchableOpacity>


          <Image
            source={{uri:selected.image}}
            style={s.hero}
          />


          <View style={s.pad}>

            <Text style={s.title}>
              {selected.name}
            </Text>

            <Text style={s.price}>
              {selected.price.toLocaleString()} IQD
            </Text>

            <Text style={s.desc}>
              بەرهەمێکی جوان و کوالێتی بۆ ماڵەکەت.
              بۆ زانیاری زیاتر پەیوەندیمان پێوە بکە.
            </Text>


            <TouchableOpacity
              style={s.goldBtn}
              onPress={()=>addToCart(selected)}
            >

              <Text style={s.goldText}>
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

    <SafeAreaView style={s.safe}>


      <View style={s.header}>

        <Text style={s.brand}>
          ASYA
        </Text>

        <Text style={s.sub}>
          Welcome Shwshawaty ASYA
        </Text>

      </View>


      {/* HOME */}

      {tab==="home" && (

        <ScrollView>

          <View style={s.banner}>

            <Text style={s.bannerTitle}>
              کۆمەڵە خواردن
            </Text>

            <Text style={s.bannerSub}>
              نوێ و تایبەت بۆ تۆ
            </Text>

          </View>


          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="بگەڕێ بۆ بەرهەم..."
            placeholderTextColor="#777"
            style={s.search}
          />


          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={s.cats}
          >

            {cats.map(c=>(

              <TouchableOpacity
                key={c}
                onPress={()=>setCategory(c)}
                style={[
                  s.cat,
                  category===c && s.catActive
                ]}
              >

                <Text
                  style={
                    category===c
                      ? s.catTextActive
                      : s.catText
                  }
                >
                  {c}
                </Text>

              </TouchableOpacity>

            ))}

          </ScrollView>


          <Text style={s.section}>
            بەرهەمە نوێکان
          </Text>


          <FlatList
            data={filtered}
            numColumns={2}
            scrollEnabled={false}
            keyExtractor={x=>x.id}
            columnWrapperStyle={{gap:12}}
            contentContainerStyle={s.grid}

            renderItem={({item})=>(

              <TouchableOpacity
                style={s.card}
                onPress={()=>setSelected(item)}
              >

                <Image
                  source={{uri:item.image}}
                  style={s.cardImg}
                />

                <Text
                  style={s.cardName}
                  numberOfLines={2}
                >
                  {item.name}
                </Text>

                <Text style={s.cardPrice}>
                  {item.price.toLocaleString()} IQD
                </Text>


                <TouchableOpacity
                  style={s.smallBtn}
                  onPress={()=>addToCart(item)}
                >

                  <Text style={s.smallBtnText}>
                    + سەبەت
                  </Text>

                </TouchableOpacity>

              </TouchableOpacity>

            )}

          />

        </ScrollView>

      )}


      {/* CART */}

      {tab==="cart" && (

        <View style={s.pad}>

          <Text style={s.pageTitle}>
            سەبەت 🛒
          </Text>


          {cart.length===0 ? (

            <Text style={s.empty}>
              سەبەتەکەت بەتاڵە.
            </Text>

          ) : (

            <>

              {cart.map((p,i)=>(

                <View
                  style={s.row}
                  key={`${p.id}-${i}`}
                >

                  <Text style={s.rowName}>
                    {p.name}
                  </Text>

                  <Text style={s.cartPrice}>
                    {p.price.toLocaleString()} IQD
                  </Text>

                </View>

              ))}


              <TouchableOpacity
                style={s.goldBtn}
                onPress={() =>
                  Alert.alert(
                    "داواکاری",
                    "لە وەشانی داهاتوودا داواکارییەکە بە سیستەمی فرۆشتن نێردراوە."
                  )
                }
              >

                <Text style={s.goldText}>
                  تەواوکردنی داواکاری
                </Text>

              </TouchableOpacity>

            </>

          )}

        </View>

      )}


      {/* PROFILE */}

      {tab==="profile" && (

        <ScrollView
          contentContainerStyle={s.pad}
          showsVerticalScrollIndicator={false}
        >

          <Text style={s.pageTitle}>
            پڕۆفایل 👤
          </Text>


          <Text style={s.desc}>
            بەخێربێیت بۆ پڕۆفایلی Shwshawaty ASYA
          </Text>


          {/* DASHBOARD */}

          <TouchableOpacity
            style={s.profileOption}
            onPress={()=>setPage("dashboardPassword")}
          >

            <Text style={s.profileOptionIcon}>
              📊
            </Text>

            <View style={s.profileOptionText}>

              <Text style={s.profileOptionTitle}>
                Dashboard
              </Text>

              <Text style={s.profileOptionSub}>
                داشبۆردی حسابات و ڕاپۆرتەکان
              </Text>

            </View>

            <Text style={s.profileArrow}>
              ‹
            </Text>

          </TouchableOpacity>


          {/* MANAGER */}

          <TouchableOpacity
            style={s.profileOption}
            onPress={()=>setPage("managerPassword")}
          >

            <Text style={s.profileOptionIcon}>
              👨‍💼
            </Text>

            <View style={s.profileOptionText}>

              <Text style={s.profileOptionTitle}>
                بەشی بەڕێوبەر
              </Text>

              <Text style={s.profileOptionSub}>
                بەڕێوبەرایەتی و ڕێکخستنی سیستەم
              </Text>

            </View>

            <Text style={s.profileArrow}>
              ‹
            </Text>

          </TouchableOpacity>


          <View style={s.profileInfo}>

            <Text style={s.profileInfoTitle}>
              🔐 پاراستنی بەشەکان
            </Text>

            <Text style={s.profileInfoText}>
              Dashboard و بەشی بەڕێوبەر هەر یەکەیان پاسۆردی تایبەتی خۆیان هەیە.
            </Text>

          </View>

        </ScrollView>

      )}


      {/* NAVIGATION */}

      <View style={s.nav}>

        <TouchableOpacity
          onPress={()=>setTab("home")}
        >

          <Text
            style={
              tab==="home"
                ? s.navOn
                : s.navOff
            }
          >
            ⌂{"\n"}سەرەکی
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          onPress={()=>setTab("cart")}
        >

          <Text
            style={
              tab==="cart"
                ? s.navOn
                : s.navOff
            }
          >
            🛒{"\n"}سەبەت ({cart.length})
          </Text>

        </TouchableOpacity>


        <TouchableOpacity
          onPress={()=>setTab("profile")}
        >

          <Text
            style={
              tab==="profile"
                ? s.navOn
                : s.navOff
            }
          >
            👤{"\n"}پڕۆفایل
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );

}


/* =========================
   STYLES
========================= */

const s=StyleSheet.create({

  welcomeSafe:{
    flex:1,
    backgroundColor:"#0f0f0f"
  },

  welcomeContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:25
  },

  welcomeBrand:{
    fontSize:30,
    fontWeight:"800",
    color:"#d7a52b",
    textAlign:"center"
  },

  welcomeText:{
    color:"#fff",
    fontSize:16,
    textAlign:"center",
    marginTop:18,
    lineHeight:28
  },

  startButton:{
    backgroundColor:"#d7a52b",
    paddingVertical:16,
    paddingHorizontal:45,
    borderRadius:14,
    marginTop:35,
    minWidth:220,
    alignItems:"center"
  },

  startButtonText:{
    color:"#111",
    fontSize:17,
    fontWeight:"800"
  },

  safe:{
    flex:1,
    backgroundColor:"#0f0f0f"
  },

  header:{
    padding:18,
    alignItems:"center",
    borderBottomWidth:1,
    borderBottomColor:"#292929"
  },

  brand:{
    fontSize:30,
    fontWeight:"800",
    color:"#d7a52b"
  },

  sub:{
    color:"#fff",
    fontSize:12,
    marginTop:2
  },

  banner:{
    margin:16,
    padding:22,
    borderRadius:18,
    backgroundColor:"#1d1d1d"
  },

  bannerTitle:{
    fontSize:28,
    fontWeight:"800",
    color:"#e1b63e"
  },

  bannerSub:{
    color:"#fff",
    marginTop:6,
    fontSize:16
  },

  search:{
    marginHorizontal:16,
    backgroundColor:"#fff",
    borderRadius:12,
    padding:12,
    fontSize:15,
    color:"#111"
  },

  cats:{
    paddingHorizontal:16,
    marginVertical:12
  },

  cat:{
    paddingHorizontal:13,
    paddingVertical:9,
    borderRadius:20,
    borderWidth:1,
    borderColor:"#555",
    marginRight:8
  },

  catActive:{
    backgroundColor:"#d7a52b",
    borderColor:"#d7a52b"
  },

  catText:{
    color:"#ddd"
  },

  catTextActive:{
    color:"#111",
    fontWeight:"700"
  },

  section:{
    color:"#fff",
    fontSize:20,
    fontWeight:"700",
    paddingHorizontal:16,
    paddingVertical:8
  },

  grid:{
    padding:16,
    gap:12
  },

  card:{
    backgroundColor:"#1c1c1c",
    borderRadius:14,
    padding:9,
    flex:1
  },

  cardImg:{
    width:"100%",
    height:145,
    borderRadius:10
  },

  cardName:{
    color:"#fff",
    fontSize:14,
    fontWeight:"700",
    marginTop:8
  },

  cardPrice:{
    color:"#d7a52b",
    fontWeight:"800",
    marginTop:5
  },

  smallBtn:{
    backgroundColor:"#d7a52b",
    borderRadius:9,
    padding:8,
    marginTop:8,
    alignItems:"center"
  },

  smallBtnText:{
    color:"#111",
    fontWeight:"800"
  },

  nav:{
    height:68,
    borderTopWidth:1,
    borderTopColor:"#333",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    backgroundColor:"#101010"
  },

  navOn:{
    color:"#d7a52b",
    textAlign:"center",
    fontWeight:"800"
  },

  navOff:{
    color:"#aaa",
    textAlign:"center"
  },

  pad:{
    padding:18
  },

  pageTitle:{
    fontSize:26,
    fontWeight:"800",
    color:"#fff",
    marginBottom:20
  },

  empty:{
    color:"#aaa",
    fontSize:17
  },

  row:{
    padding:14,
    borderBottomWidth:1,
    borderBottomColor:"#333",
    flexDirection:"row",
    justifyContent:"space-between"
  },

  rowName:{
    color:"#fff",
    flex:1,
    marginRight:10
  },

  cartPrice:{
    color:"#d7a52b",
    fontWeight:"700"
  },

  goldBtn:{
    backgroundColor:"#d7a52b",
    padding:15,
    borderRadius:12,
    alignItems:"center",
    marginTop:20
  },

  goldText:{
    color:"#111",
    fontWeight:"800",
    fontSize:16
  },

  back:{
    color:"#d7a52b",
    fontSize:18,
    padding:16
  },

  hero:{
    width:"100%",
    height:330
  },

  title:{
    fontSize:25,
    fontWeight:"800",
    color:"#fff"
  },

  price:{
    fontSize:22,
    color:"#d7a52b",
    fontWeight:"800",
    marginTop:10
  },

  desc:{
    color:"#ccc",
    fontSize:16,
    lineHeight:26,
    marginTop:15
  },


  /* =========================
     PASSWORD
  ========================= */

  passwordContainer:{
    flexGrow:1,
    padding:16
  },

  passwordBox:{
    backgroundColor:"#1c1c1c",
    borderRadius:20,
    padding:25,
    marginTop:80,
    borderWidth:1,
    borderColor:"#292929"
  },

  passwordIcon:{
    fontSize:45,
    textAlign:"center"
  },

  passwordTitle:{
    color:"#d7a52b",
    fontSize:25,
    fontWeight:"800",
    textAlign:"center",
    marginTop:15
  },

  passwordSub:{
    color:"#aaa",
    fontSize:14,
    textAlign:"center",
    marginTop:8,
    marginBottom:20
  },

  passwordInput:{
    backgroundColor:"#fff",
    borderRadius:12,
    padding:14,
    fontSize:16,
    color:"#111",
    textAlign:"center"
  },

  passwordError:{
    color:"#ff6262",
    textAlign:"center",
    marginTop:10,
    fontWeight:"700"
  },


  /* =========================
     PROFILE OPTIONS
  ========================= */

  profileOption:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#1c1c1c",
    borderRadius:16,
    padding:16,
    marginTop:15,
    borderWidth:1,
    borderColor:"#292929"
  },

  profileOptionIcon:{
    fontSize:32,
    marginRight:12
  },

  profileOptionText:{
    flex:1
  },

  profileOptionTitle:{
    color:"#fff",
    fontSize:17,
    fontWeight:"800",
    textAlign:"right"
  },

  profileOptionSub:{
    color:"#999",
    fontSize:12,
    marginTop:5,
    textAlign:"right"
  },

  profileArrow:{
    color:"#d7a52b",
    fontSize:30,
    marginLeft:8
  },

  profileInfo:{
    backgroundColor:"#171717",
    borderRadius:15,
    padding:16,
    marginTop:25,
    borderWidth:1,
    borderColor:"#333"
  },

  profileInfoTitle:{
    color:"#d7a52b",
    fontSize:15,
    fontWeight:"800",
    textAlign:"right"
  },

  profileInfoText:{
    color:"#999",
    fontSize:13,
    lineHeight:22,
    marginTop:7,
    textAlign:"right"
  },


  /* =========================
     ACCOUNTING
  ========================= */

  accountingContainer:{
    padding:16,
    paddingBottom:45
  },

  accountingTitle:{
    color:"#d7a52b",
    fontSize:25,
    fontWeight:"800",
    textAlign:"right",
    marginTop:4
  },

  accountingDate:{
    color:"#999",
    fontSize:14,
    textAlign:"right",
    marginTop:6,
    marginBottom:18
  },

  accountingGrid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between"
  },

  accountingCard:{
    width:"48%",
    backgroundColor:"#1c1c1c",
    borderRadius:16,
    padding:15,
    marginBottom:12,
    borderWidth:1,
    borderColor:"#292929"
  },

  accountingIcon:{
    fontSize:25,
    textAlign:"right"
  },

  accountingCardTitle:{
    color:"#aaa",
    fontSize:13,
    textAlign:"right",
    marginTop:10
  },

  accountingCardValue:{
    color:"#fff",
    fontSize:16,
    fontWeight:"800",
    textAlign:"right",
    marginTop:6
  },

  accountingSection:{
    backgroundColor:"#1c1c1c",
    borderRadius:16,
    padding:16,
    marginTop:14,
    borderWidth:1,
    borderColor:"#292929"
  },

  accountingSectionTitle:{
    color:"#fff",
    fontSize:18,
    fontWeight:"800",
    textAlign:"right"
  },

  transaction:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingVertical:14,
    borderBottomWidth:1,
    borderBottomColor:"#292929"
  },

  transactionLast:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingTop:14
  },

  transactionInfo:{
    flex:1,
    marginRight:10
  },

  transactionName:{
    color:"#fff",
    fontSize:14,
    fontWeight:"700",
    textAlign:"right"
  },

  transactionDate:{
    color:"#888",
    fontSize:12,
    marginTop:4,
    textAlign:"right"
  },

  income:{
    color:"#45d483",
    fontWeight:"800"
  },

  expense:{
    color:"#ff6262",
    fontWeight:"800"
  },

  warningHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },

  warningNumber:{
    color:"#ff6262",
    fontSize:24,
    fontWeight:"900"
  },

  warningText:{
    color:"#aaa",
    textAlign:"right",
    marginTop:8
  },

  menuTitle:{
    color:"#d7a52b",
    fontSize:20,
    fontWeight:"800",
    textAlign:"right",
    marginTop:24,
    marginBottom:12
  },

  menuGrid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between"
  },

  menuButton:{
    width:"48%",
    backgroundColor:"#1c1c1c",
    borderRadius:14,
    paddingVertical:18,
    marginBottom:12,
    alignItems:"center",
    borderWidth:1,
    borderColor:"#292929"
  },

  menuIcon:{
    fontSize:25
  },

  menuText:{
    color:"#fff",
    fontSize:14,
    fontWeight:"700",
    marginTop:7
  },

  accountingNote:{
    backgroundColor:"#171717",
    borderRadius:14,
    borderWidth:1,
    borderColor:"#333",
    padding:15,
    marginTop:8
  },

  accountingNoteTitle:{
    color:"#d7a52b",
    fontSize:15,
    fontWeight:"800",
    textAlign:"right"
  },

  accountingNoteText:{
    color:"#999",
    fontSize:13,
    lineHeight:22,
    textAlign:"right",
    marginTop:7
  },


  /* =========================
     MANAGER
  ========================= */

  managerContainer:{
    padding:16,
    paddingBottom:45
  },

  managerTitle:{
    color:"#d7a52b",
    fontSize:27,
    fontWeight:"800",
    textAlign:"right",
    marginTop:5
  },

  managerSub:{
    color:"#999",
    fontSize:14,
    textAlign:"right",
    marginTop:8,
    marginBottom:20
  },

  managerCard:{
    backgroundColor:"#1c1c1c",
    borderRadius:18,
    padding:20,
    marginBottom:14,
    borderWidth:1,
    borderColor:"#292929"
  },

  managerCardIcon:{
    fontSize:32,
    textAlign:"right"
  },

  managerCardTitle:{
    color:"#fff",
    fontSize:18,
    fontWeight:"800",
    textAlign:"right",
    marginTop:10
  },

  managerCardText:{
    color:"#999",
    fontSize:13,
    lineHeight:22,
    textAlign:"right",
    marginTop:7
  }

});
