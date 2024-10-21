import React from 'react';
import { View, Text, StyleSheet, Image, SectionList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import thyLogo from "../../assets/stock-logos/thy.png";
import akbnkLogo from "../../assets/stock-logos/akbank.png";
import ykbnkLogo from "../../assets/stock-logos/ykbnk.png";
import ereglLogo from "../../assets/stock-logos/eregl.png";
import gubrfLogo from "../../assets/stock-logos/gubrf.png";
import bist100 from "../../assets/stock-logos/bist-100.png";
import bist30 from "../../assets/stock-logos/bist-30.png";
import bist from "../../assets/stock-logos/bist.png";


const Home = () => {
  const sections = [

    {
      title: 'Feed',
      data: [
        { id: 1, type: 'post', username: "BullAlways", title: 'THYAO Stock Analysis', tag: 'StockAnalysis', content: 'THYAO has shown a strong uptrend in the last month...' },
        { id: 2, type: 'post', username: "Stocker", title: 'Market Insights', tag: 'MarketNews', content: 'BIST 100 index has gained momentum recently...' },
        { id: 3, type: 'post', username: "TraderJoe", title: 'Forex Trading Strategies', tag: 'CurrencyTrading', content: 'Learn effective strategies for trading major currency pairs...' },
        { id: 4, type: 'post', username: "FinanceGuru", title: 'Investing in Renewable Energy', tag: 'InvestmentTips', content: 'Renewable energy stocks are on the rise. Here are some to watch...' },
        { id: 5, type: 'post', username: "MarketMaven", title: 'Tech Stocks to Buy Now', tag: 'TechTrends', content: 'The tech sector is showing signs of recovery. Here are some top picks...' },
      ],
    },
    {
      title: 'Stock Prices',
      data: [
        { id: 1, type: 'stock', name: 'TÜRK HAVA YOLLARI A.O.', ticker: 'THYAO', price: 273.50, change: 1.58, logoPath: thyLogo },
        { id: 2, type: 'stock', name: 'EREĞLİ DEMİR VE ÇELİK FABRİKALARI T.A.Ş.', ticker: 'EREGL', price: 49.02, change: -0.85, logoPath: ereglLogo },
        { id: 3, type: 'stock', name: 'AKBANK T.A.Ş.', ticker: 'AKBNK', price: 53.25, change: -2.29, logoPath: akbnkLogo },
        { id: 4, type: 'stock', name: 'YAPI VE KREDİ BANKASI A.Ş.', ticker: 'YKBNK', price: 26.54, change: -2.07, logoPath: ykbnkLogo },
        { id: 5, type: 'stock', name: 'GÜBRE FABRİKALARI T.A.Ş.', ticker: 'GUBRF', price: 192.70, change: 3.77, logoPath: gubrfLogo },
      ],
    },
    {
      title: 'Indexes',
      data: [
        { id: 1, type: 'index', name: 'BIST 100', ticker: 'XU100', price: 8452.45, change: 0.72, logoPath: bist100 },
        { id: 2, type: 'index', name: 'BIST 30', ticker: 'XU030', price: 9305.10, change: -1.25, logoPath: bist30 },
        { id: 3, type: 'index', name: 'BIST BANKA', ticker: 'XBANK', price: 4652.80, change: -0.85, logoPath: bist },
        { id: 4, type: 'index', name: 'BIST SINAİ', ticker: 'XUSIN', price: 11524.32, change: 0.38, logoPath: bist },
        { id: 5, type: 'index', name: 'BIST HİZMETLER', ticker: 'XUHIZ', price: 4321.78, change: 1.12, logoPath: bist },
      ],
    },
  ];


  const renderItem = ({ item }) => {
    if (item.type === 'post') {
      return (

        <View style={styles.postContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postTag}>#{item.tag}</Text>
          </View>
          <Text style={styles.postTag}>@{item.username}</Text>
          <Text style={styles.postContent}>{item.content}</Text>
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
    } else {

      return (
        <View style={styles.itemContainer}>
          <Image source={item.logoPath} style={styles.logo} />
          <View style={styles.infoContainer}>
            <Text style={styles.companyName}>{item.name}</Text>
            <Text style={styles.ticker}>{item.ticker}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price.toFixed(2)} TRY</Text>
            <Text style={[styles.change, { color: item.change > 0 ? 'green' : 'red' }]}>
              {item.change > 0 ? `+${item.change}%` : `${item.change}%`}
            </Text>
          </View>
        </View>
      );

    }
  };

  const renderSectionFooter = ({ section: { title } }) => {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See More {title}</Text>
        </TouchableOpacity>
      </View>
      
    );
  };
  return (
    <View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
        contentContainerStyle={styles.container}
        renderSectionFooter={renderSectionFooter}
      />
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  postContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  postTag: {
    fontSize: 14,
    color: '#888',
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
    color: 'black',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
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
    color: 'black',
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
    color: 'black',
  },
  footerContainer:{
    alignItems:"flex-end",

  },
  seeMore:{
    alignSelf:"flex-end",
    fontSize:15,
    fontWeight:"bold",
    color:"black"
  },
});

export default Home;
