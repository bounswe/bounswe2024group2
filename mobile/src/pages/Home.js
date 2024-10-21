import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
//import { CartesianChart, Line } from 'victory-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import thyLogo from "../../assets/stock-logos/thy.png";
import akbnkLogo from "../../assets/stock-logos/akbank.png";
import ykbnkLogo from "../../assets/stock-logos/ykbnk.png";
import ereglLogo from "../../assets/stock-logos/eregl.png";
import gubrfLogo from "../../assets/stock-logos/gubrf.png";
import bist100 from "../../assets/stock-logos/bist-100.png";
import bist50 from "../../assets/stock-logos/bist-50.png";
import bist30 from "../../assets/stock-logos/bist-30.png";
import bist from "../../assets/stock-logos/bist.png";

const Home = ({navigation, route}) => {
  const username = route.params;  

  const posts = [
    {
      id: 1,
      username: "BullAlways",
      title: 'THYAO Stock Analysis',
      tag: 'StockAnalysis',
      content: 'THYAO has shown a strong uptrend in the last month...',
      lineChartData: [
        { day: 1, price: 273.5 },
        { day: 2, price: 274.2 },
        { day: 3, price: 275.0 },
        { day: 4, price: 276.3 },
        { day: 5, price: 275.8 },
        { day: 6, price: 274.0 },
        { day: 7, price: 273.0 },
      ],
    },
    {
      id: 2,
      username: "Stocker",
      title: 'Market Insights',
      tag: 'MarketNews',
      content: 'BIST 100 index has gained momentum recently...',
      lineChartData: [
        { day: 1, price: 8450 },
        { day: 2, price: 8452 },
        { day: 3, price: 8460 },
        { day: 4, price: 8440 },
        { day: 5, price: 8455 },
        { day: 6, price: 8462 },
        { day: 7, price: 8458 },
      ],
    },
    {
      id: 3,
      username: "TraderJoe",
      title: 'Forex Trading Strategies',
      tag: 'CurrencyTrading',
      content: 'Learn effective strategies for trading major currency pairs...',
      lineChartData: [
        { day: 1, price: 1.1050 }, // Example exchange rate for EUR/USD
        { day: 2, price: 1.1075 },
        { day: 3, price: 1.1060 },
        { day: 4, price: 1.1085 },
        { day: 5, price: 1.1090 },
        { day: 6, price: 1.1100 },
        { day: 7, price: 1.1115 },
      ],
    },
    {
      id: 4,
      username: "FinanceGuru",
      title: 'Investing in Renewable Energy',
      tag: 'InvestmentTips',
      content: 'Renewable energy stocks are on the rise. Here are some to watch...',
      lineChartData: [
        { day: 1, price: 55.0 },
        { day: 2, price: 56.2 },
        { day: 3, price: 57.5 },
        { day: 4, price: 58.0 },
        { day: 5, price: 57.0 },
        { day: 6, price: 58.5 },
        { day: 7, price: 59.0 },
      ],
    },
    {
      id: 5,
      username: "MarketMaven",
      title: 'Tech Stocks to Buy Now',
      tag: 'TechTrends',
      content: 'The tech sector is showing signs of recovery. Here are some top picks...',
      lineChartData: [
        { day: 1, price: 150.0 },
        { day: 2, price: 151.5 },
        { day: 3, price: 152.0 },
        { day: 4, price: 153.0 },
        { day: 5, price: 154.5 },
        { day: 6, price: 155.0 },
        { day: 7, price: 156.0 },
      ],
    },
  ];
  
    const stocks = [
      {
          id: 1,
          name: 'TÜRK HAVA YOLLARI A.O.',
          ticker: 'THYAO',
          price: 273.50,
          change: 1.58,
          logoPath: thyLogo,
      },
      {
          id: 2,
          name: 'EREĞLİ DEMİR VE ÇELİK FABRİKALARI T.A.Ş.',
          ticker: 'EREGL',
          price: 49.02,
          change: -0.85,
          logoPath: ereglLogo,
      },
      {
          id: 3,
          name: 'AKBANK T.A.Ş.',
          ticker: 'AKBNK',
          price: 53.25,
          change: -2.29,
          logoPath: akbnkLogo,
      },
      {
          id: 4,
          name: 'YAPI VE KREDİ BANKASI A.Ş.',
          ticker: 'YKBNK',
          price: 26.54,
          change: -2.07,
          logoPath: ykbnkLogo,
      },
      {
          id: 5,
          name: 'GÜBRE FABRİKALARI T.A.Ş.',
          ticker: 'GUBRF',
          price: 192.70,
          change: 3.77,
          logoPath: gubrfLogo,
      },
  ];
  
    const indexes = [
        {
            id: 1,
            name: 'BIST 100',
            ticker: 'XU100',
            price: 8452.45,
            change: 0.72,
            logoPath: bist100, 
        },
        {
            id: 2,
            name: 'BIST 30',
            ticker: 'XU030',
            price: 9305.10,
            change: -1.25,
            logoPath: bist30,
        },
        {
            id: 3,
            name: 'BIST BANKA',
            ticker: 'XBANK',
            price: 4652.80,
            change: -0.85,
            logoPath: bist,
        },
        {
            id: 4,
            name: 'BIST SINAİ',
            ticker: 'XUSIN',
            price: 11524.32,
            change: 0.38,
            logoPath: bist,
        },
        {
            id: 5,
            name: 'BIST HİZMETLER',
            ticker: 'XUHIZ',
            price: 4321.78,
            change: 1.12,
            logoPath: bist,
        },
    ];

    

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postTag}>#{item.tag}</Text>
          </View>
            <Text style={styles.postTag}>@{item.username}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
            {/* <View style={{ height: 300 }}>
                <CartesianChart
                    data={item.lineChartData} // 👈 specify your data
                    xKey="day" // 👈 specify data key for x-axis
                    yKeys={["lowTmp", "highTmp"]} // 👈 specify data keys used for y-axis
                    
                >
                    
                    {({ points }) => (
                    // 👇 and we'll use the Line component to render a line path.
                        <Line points={points.highTmp} color="red" strokeWidth={3} />
                    )}
                </CartesianChart>
            </View> */}
            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="thumb-up" size={24} color="#0077B6" />
                <Text style={styles.actionText}>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="comment" size={24} color="#0077B6" />
                <Text style={styles.actionText}>Comment</Text>
              </TouchableOpacity>
            </View>
        </View>
    );
    

    const renderItem = ({ item }) => {
     
      return (
        <View style={styles.itemContainer}>
            <Image source={item.logoPath} style={styles.logo} />
            <View style={styles.infoContainer}>
                <Text style={styles.companyName}>{item.name}</Text>
                <Text style={styles.ticker}>{item.ticker}</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.price}>{item.price.toFixed(2)} TRY</Text>
                <Text
                    style={[
                        styles.change,
                        { color: item.change > 0 ? 'green' : 'red' },
                    ]}
                >
                    {item.change > 0 ? `+${item.change}%` : `${item.change}%`}
                </Text>
            </View>
        </View>
      );
    };

    return (
        <View>
            <ScrollView>
                <View style={styles.feedContainer}>
                    <Text style={styles.header}>Feed</Text>
                    <FlatList
                        data={posts}
                        renderItem={renderPost}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    <Text style={styles.seeMore}>See More </Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.header}>Stock Prices</Text>
                    <FlatList
                        data={stocks}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    <Text style={styles.seeMore}>See More </Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.header}>Indexes</Text>
                    <FlatList
                        data={indexes}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    <Text style={styles.seeMore}>See More </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    feedContainer: {
        padding: 16,
        backgroundColor: '#fff',
    },
    postContainer: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    topContainer:{
      flexDirection:"row",
      justifyContent:"space-between"
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color:"black",
    },
    postTag: {
        fontSize: 14,
        color: '#888',
        
        fontWeight: 'bold',
    },
    postContent: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    seeMore:{
        alignSelf:"flex-end",
        fontSize:15,
        fontWeight:"bold",
        color:"black"
    },
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:"black"
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    companyName: {
        fontSize: 16,
        fontWeight: '600',
        color:"black"
    },
    ticker: {
        fontSize: 14,
        color: '#555',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
    },
    change: {
        fontSize: 14,
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    actionText: {
      marginLeft: 5,
    },
});

export default Home;
