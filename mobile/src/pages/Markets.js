import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const mockStocks = {
    "BIST30": [// BIST 30
        { code: 'AKBNK', name: 'Akbank T.A.Ş.', price: 8.76, about: 'Akbank is one of the largest banks in Turkey, offering a wide range of banking services.' },
        { code: 'ALARK', name: 'Alarko Holding A.Ş.', price: 6.78, about: 'Alarko is a major Turkish conglomerate involved in construction, energy, and tourism.' },
        { code: 'ARCLK', name: 'Arçelik A.Ş.', price: 29.56, about: 'Arçelik is a global home appliances manufacturer, known for brands like Beko and Grundig.' },
        { code: 'ASELS', name: 'Aselsan Elektronik Sanayi ve Ticaret A.Ş.', price: 23.67, about: 'Aselsan is Turkey’s leading defense electronics company, producing advanced technology solutions.' },
        { code: 'BIMAS', name: 'BİM Birleşik Mağazalar A.Ş.', price: 14.89, about: 'BIM is a prominent Turkish retail chain, offering low-cost consumer products.' },
        { code: 'DOHOL', name: 'Doğan Holding A.Ş.', price: 3.12, about: 'Doğan Holding is active in various sectors, including media, energy, and finance.' },
        { code: 'EKGYO', name: 'Emlak Konut Gayrimenkul Yatırım Ortaklığı A.Ş.', price: 3.78, about: 'Emlak Konut is a leading real estate investment trust in Turkey, primarily focused on housing projects.' },
        { code: 'ENJSA', name: 'Enerjisa Enerji A.Ş.', price: 13.22, about: 'Enerjisa operates in Turkey’s energy market, providing electricity distribution and sales.' },
        { code: 'EREGL', name: 'Ereğli Demir ve Çelik Fabrikaları T.A.Ş.', price: 9.47, about: 'Ereğli is one of Turkey’s largest steel producers, supplying a wide range of industries.' },
        { code: 'FROTO', name: 'Ford Otosan A.Ş.', price: 25.45, about: 'Ford Otosan is a joint venture between Ford and Koç Holding, producing commercial vehicles in Turkey.' },
        { code: 'GARAN', name: 'Türkiye Garanti Bankası A.Ş.', price: 11.23, about: 'Garanti is one of Turkey’s leading private banks, known for its innovative banking services.' },
        { code: 'ISCTR', name: 'Türkiye İş Bankası A.Ş.', price: 6.35, about: 'İşbank is Turkey’s largest private bank, providing a broad range of financial services.' },
        { code: 'KCHOL', name: 'Koç Holding A.Ş.', price: 18.90, about: 'Koç Holding is the largest industrial conglomerate in Turkey, with interests in energy, automotive, and finance.' },
        { code: 'KOZAA', name: 'Koza Altın İşletmeleri A.Ş.', price: 10.22, about: 'Koza Altın is Turkey’s largest gold mining company, engaged in exploration and production of gold.' },
        { code: 'KRDMD', name: 'Kardemir Karabük Demir Çelik Sanayi ve Ticaret A.Ş.', price: 4.56, about: 'Kardemir is a major Turkish steel producer, primarily serving the construction and automotive industries.' },
        { code: 'ODAS', name: 'Odaş Elektrik Üretim Sanayi Ticaret A.Ş.', price: 1.82 },
        { code: 'PETKM', name: 'Petkim Petrokimya Holding A.Ş.', price: 6.78 },
        { code: 'PGSUS', name: 'Pegasus Hava Taşımacılığı A.Ş.', price: 20.50 },
        { code: 'SAHOL', name: 'Hacı Ömer Sabancı Holding A.Ş.', price: 12.67 },
        { code: 'SISE', name: 'Şişecam A.Ş.', price: 10.33 },
        { code: 'SODA', name: 'Soda Sanayii A.Ş.', price: 7.44 },
        { code: 'TAVHL', name: 'TAV Havalimanları Holding A.Ş.', price: 19.05 },
        { code: 'TCELL', name: 'Turkcell İletişim Hizmetleri A.Ş.', price: 14.32 },
        { code: 'THYAO', name: 'Türk Hava Yolları A.O.', price: 15.56 },
        { code: 'TOASO', name: 'Tofaş Türk Otomobil Fabrikası A.Ş.', price: 20.87 },
        { code: 'TTKOM', name: 'Türk Telekomünikasyon A.Ş.', price: 7.68 },
        { code: 'TUPRS', name: 'Tüpraş-Türkiye Petrol Rafinerileri A.Ş.', price: 31.23 },
        { code: 'VAKBN', name: 'Türkiye Vakıflar Bankası T.A.O.', price: 7.12 },
        { code: 'YKBNK', name: 'Yapı ve Kredi Bankası A.Ş.', price: 8.23 }],
    "S&P50": [ // S&P top 50
        { code: 'AAPL', name: 'Apple Inc.', price: 175.00, about: 'Apple is a global technology company known for its consumer electronics, including the iPhone, Mac, and Apple Watch.' },
        { code: 'MSFT', name: 'Microsoft Corporation', price: 350.00, about: 'Microsoft is a multinational technology company, best known for its Windows operating system and Office suite.' },
        { code: 'AMZN', name: 'Amazon.com, Inc.', price: 145.00, about: 'Amazon is the world’s largest online retailer, also heavily involved in cloud computing and artificial intelligence.' },
        { code: 'GOOGL', name: 'Alphabet Inc. (Class A)', price: 120.00, about: 'Alphabet is the parent company of Google, specializing in internet-related services and products.' },
        { code: 'FB', name: 'Meta Platforms, Inc.', price: 300.00, about: 'Meta (formerly Facebook) operates the world’s largest social media platforms, including Facebook and Instagram.' },
        { code: 'TSLA', name: 'Tesla, Inc.', price: 720.00, about: 'Tesla is a leading electric vehicle manufacturer, also involved in renewable energy and battery technology.' },
        { code: 'BRK.B', name: 'Berkshire Hathaway Inc. (Class B)', price: 325.00, about: 'Berkshire Hathaway is a multinational conglomerate headed by Warren Buffett, with diverse holdings in various industries.' },
        { code: 'NVDA', name: 'NVIDIA Corporation', price: 480.00, about: 'NVIDIA is a global leader in graphics processing units (GPUs) and AI computing technology.' },
        { code: 'JPM', name: 'JPMorgan Chase & Co.', price: 140.00, about: 'JPMorgan Chase is one of the largest global financial services companies, providing investment banking and financial services.' },
        { code: 'JNJ', name: 'Johnson & Johnson', price: 160.00, about: 'Johnson & Johnson is a multinational healthcare company, known for its pharmaceutical, medical device, and consumer health products.' },
        { code: 'V', name: 'Visa Inc.', price: 250.00, about: 'Visa is a global payments technology company, facilitating electronic funds transfers worldwide.' },
        { code: 'PG', name: 'Procter & Gamble Co.', price: 145.00, about: 'Procter & Gamble is a multinational consumer goods company, known for brands like Tide, Pampers, and Gillette.' },
        { code: 'UNH', name: 'UnitedHealth Group Incorporated', price: 490.00, about: 'UnitedHealth Group is a healthcare company, offering insurance services and healthcare products.' },
        { code: 'HD', name: 'The Home Depot, Inc.', price: 330.00, about: 'Home Depot is the largest home improvement retailer in the US, selling tools, construction products, and services.' },
        { code: 'DIS', name: 'The Walt Disney Company', price: 120.00, about: 'Disney is a global entertainment conglomerate, known for its film studios, theme parks, and media networks.' },
        { code: 'PYPL', name: 'PayPal Holdings, Inc.', price: 80.00 },
        { code: 'MA', name: 'Mastercard Incorporated', price: 380.00 },
        { code: 'CMCSA', name: 'Comcast Corporation', price: 40.00 },
        { code: 'VZ', name: 'Verizon Communications Inc.', price: 35.00 },
        { code: 'NFLX', name: 'Netflix, Inc.', price: 490.00 },
        { code: 'PEP', name: 'PepsiCo, Inc.', price: 190.00 },
        { code: 'T', name: 'AT&T Inc.', price: 15.00 },
        { code: 'CSCO', name: 'Cisco Systems, Inc.', price: 55.00 },
        { code: 'INTC', name: 'Intel Corporation', price: 30.00 },
        { code: 'IBM', name: 'International Business Machines Corporation', price: 135.00 },
        { code: 'TXN', name: 'Texas Instruments Incorporated', price: 185.00 },
        { code: 'LLY', name: 'Eli Lilly and Company', price: 560.00 },
        { code: 'MDT', name: 'Medtronic plc', price: 90.00 },
        { code: 'COST', name: 'Costco Wholesale Corporation', price: 500.00 },
        { code: 'NOW', name: 'ServiceNow, Inc.', price: 550.00 },
        { code: 'QCOM', name: 'QUALCOMM Incorporated', price: 120.00 },
        { code: 'NKE', name: 'Nike, Inc.', price: 150.00 },
        { code: 'MRK', name: 'Merck & Co., Inc.', price: 110.00 },
        { code: 'AMGN', name: 'Amgen Inc.', price: 250.00 },
        { code: 'ISRG', name: 'Intuitive Surgical, Inc.', price: 300.00 },
        { code: 'LMT', name: 'Lockheed Martin Corporation', price: 420.00 },
        { code: 'SPGI', name: 'S&P Global Inc.', price: 400.00 },
        { code: 'MDLZ', name: 'Mondelez International, Inc.', price: 62.00 },
        { code: 'HON', name: 'Honeywell International Inc.', price: 220.00 },
        { code: 'TMO', name: 'Thermo Fisher Scientific Inc.', price: 550.00 },
        { code: 'ADBE', name: 'Adobe Inc.', price: 550.00 },
        { code: 'CAT', name: 'Caterpillar Inc.', price: 260.00 },
        { code: 'SYK', name: 'Stryker Corporation', price: 280.00 },
        { code: 'SYY', name: 'Sysco Corporation', price: 80.00 },
        { code: 'FIS', name: 'Fidelity National Information Services, Inc.', price: 70.00 },
        { code: 'C', name: 'Citigroup Inc.', price: 55.00 },
        { code: 'AXP', name: 'American Express Company', price: 180.00 },
        { code: 'MCO', name: 'Moody\'s Corporation', price: 360.00 },
        { code: 'BKNG', name: 'Booking Holdings Inc.', price: 2200.00 },
        { code: 'SCHW', name: 'The Charles Schwab Corporation', price: 90.00 },
        { code: 'DHR', name: 'Danaher Corporation', price: 310.00 },
        { code: 'ZTS', name: 'Zoetis Inc.', price: 200.00 },
        { code: 'LRCX', name: 'Lam Research Corporation', price: 600.00 },
        { code: 'FISV', name: 'FISV', price: 120.00 },
        { code: 'ADP', name: 'Automatic Data Processing, Inc.', price: 240.00 }],
    };

const Markets = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [activeCategory, setActiveCategory] = useState('BIST30');

  const renderStockItem = ({ item }) => (
    <TouchableOpacity
      style={styles.stockItem}
      onPress={() => setSelectedStock(item)}
    >
      <Text style={styles.stockCode}>{item.code}</Text>
      <Text style={styles.stockName}>{item.name}</Text>
      <Text style={styles.stockPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Categories */}
      <View style={styles.header}>
        {Object.keys(mockStocks).map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              activeCategory === category && styles.activeCategory,
            ]}
            onPress={() => {
              setActiveCategory(category);
              setSelectedStock(null);
            }}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stock List */}
      <View style={styles.listContainer}>
        <FlatList
          data={mockStocks[activeCategory]}
          renderItem={renderStockItem}
          keyExtractor={(item) => item.code}
        />
      </View>

      {/* Stock Details */}
      {selectedStock && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>{selectedStock.code}</Text>
          <Text style={styles.detailsName}>{selectedStock.name}</Text>
          <Text style={styles.detailsPrice}>Price: ${selectedStock.price.toFixed(2)}</Text>
          <Text style={styles.detailsAbout}>{selectedStock.about}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  categoryButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  activeCategory: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  stockCode: {
    fontWeight: 'bold',
    color: '#333333',
  },
  stockName: {
    color: '#555555',
  },
  stockPrice: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  detailsName: {
    fontSize: 16,
    color: '#333333',
  },
  detailsPrice: {
    fontSize: 14,
    marginTop: 5,
    color: '#555555',
  },
  detailsAbout: {
    fontSize: 14,
    marginTop: 10,
    color: '#666666',
  },
});

export default Markets;