import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Swipeable } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from './context/AuthContext';

const PortfolioDetails = ({ route, navigation }) => {
  const { accessToken } = useAuth();
  const { portfolio } = route.params;
  const [stocks, setStocks] = useState(portfolio.stocks);
  const [fabActive, setFabActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [priceBought, setPriceBought] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);


  const predefinedColors = ['#1E90FF', '#FFD700', '#8A2BE2', '#FF8C00', '#00CED1'];

  const generateColor = () => {
    let color;
    do {
      color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    } while (color === '#000000' || color === '#ffffff');
    return color;
  };

  const chartData = stocks.map((stock, index) => ({
    name: stock.name,
    val: stock.currentPrice * stock.quantity,
    color: index < predefinedColors.length ? predefinedColors[index] : generateColor(),
    legendFontColor: '#000',
    legendFontSize: 12,
  }));

  const totalInvestment = stocks.reduce(
    (total, stock) => total + parseFloat(stock.price_bought) * stock.quantity,
    0
  );
  const currentValue = stocks.reduce(
    (total, stock) => total + stock.currentPrice * stock.quantity,
    0
  );
  const portfolioProfitLoss = currentValue - totalInvestment;
  const portfolioProfitLossPercentage =
    totalInvestment === 0
      ? 'N/A'
      : ((portfolioProfitLoss / totalInvestment) * 100).toFixed(2);

  const isPortfolioProfit = portfolioProfitLoss >= 0;

  const formattedDate = new Date(portfolio.created_at).toLocaleDateString();

  const searchStocks = async () => {
    if (!searchTerm.trim()) return;

    setSearchLoading(true);

    try {
      const response = await fetch('http://159.223.28.163:30002/stocks/search/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          pattern: searchTerm,
          limit: 10,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      const filteredData = data.filter((stock) => stock.price !== -1);
      setSearchResults(filteredData);
    } catch (error) {
      console.error('Error searching stocks:', error);
      Alert.alert('Error', 'Unable to search stocks. Please try again later.');
    } finally {
      setSearchLoading(false);
    }
  };

  const addStockToPortfolio = async () => {
    // Validate inputs before proceeding
    if (!selectedStock) {
      Alert.alert('Error', 'Please select a stock.');
      return;
    }
    if (!priceBought || isNaN(priceBought) || parseFloat(priceBought) <= 0) {
      Alert.alert('Error', 'Please enter a valid price bought.');
      return;
    }
    if (!quantity || isNaN(quantity) || parseInt(quantity, 10) <= 0) {
      Alert.alert('Error', 'Please enter a valid quantity.');
      return;
    }
  
    try {
      const sanitizedPriceBought = priceBought; // Ensure proper formatting
      const sanitizedQuantity = parseInt(quantity, 10); // Ensure proper integer
  
      const response = await fetch(
        'http://159.223.28.163:30002/portfolio-stocks/add_stock/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            portfolio_id: portfolio.id,
            stock: selectedStock.id,
            price_bought: sanitizedPriceBought,
            quantity: sanitizedQuantity,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
  
      let newStock = await response.json();
      const stockDetailsResponse = await fetch(
        `http://159.223.28.163:30002/stocks/${selectedStock.id}/`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      if (!stockDetailsResponse.ok) {
        throw new Error(`HTTP Error: ${stockDetailsResponse.status}`);
      }
      else{
        console.log("donedone")
      }
  
      const stockDetails = await stockDetailsResponse.json();
  
      newStock = {
        stock: stockDetails.id,
        name: stockDetails.name,
        symbol: stockDetails.symbol,
        price_bought: sanitizedPriceBought,
        quantity: sanitizedQuantity,
        currentPrice: parseFloat(stockDetails.price), // Ensure currentPrice is a number
        currency: stockDetails.currency.code,
      };
      console.log(JSON.stringify(newStock))
      setStocks((prevStocks) => [...prevStocks, newStock]);
      Alert.alert('Success', 'Stock added successfully!');
      setFabActive(false);
      resetInputFields();
    } catch (error) {
      console.error('Error adding stock:', error);
      Alert.alert('Error', 'Unable to add stock. Please try again later.');
    }
  };

  const resetInputFields = () => {
    setSearchTerm('');
    setSearchResults([]);
    setPriceBought('');
    setQuantity('');
    setSelectedStock(null);
  };
  const cancelInput = () => {
    resetInputFields();
    setFabActive(false);
  };

  const removeStockFromPortfolio = async (stock) => {
    try {
      const response = await fetch(
        'http://159.223.28.163:30002/portfolio-stocks/remove_stock/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            portfolio_id: portfolio.id,
            stock: stock.stock,
            price_bought: stock.price_bought.toString(),
            quantity: stock.quantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      setStocks((prevStocks) => prevStocks.filter((s) => s.stock !== stock.stock));
      Alert.alert('Success', 'Stock removed successfully!');
    } catch (error) {
      console.error('Error removing stock:', error);
      Alert.alert('Error', 'Unable to remove stock. Please try again later.');
    }
  };

  const renderRightActions = (stock) => (
    <TouchableOpacity
      style={styles.swipeDelete}
      onPress={() => removeStockFromPortfolio(stock)}
    >
      <MaterialIcons name="delete" size={24} color="#FFF" />
      <Text style={styles.swipeDeleteText}>Remove</Text>
    </TouchableOpacity>
  );
  const renderSelectedStockCard = () => {
    if (!selectedStock) return null;

    return (
      <View style={styles.stockCard}>
        <Text style={styles.stockName}>{selectedStock.name}</Text>
        <Text style={styles.stockDetails}>
          Symbol: {selectedStock.symbol}, Current Price: {selectedStock.price}
        </Text>
      </View>
    );
  };
  const renderStockCard = (stock) => {
    const investment = parseFloat(stock.price_bought) * stock.quantity;
    const currentValue = stock.currentPrice * stock.quantity;
    const profitLoss = currentValue - investment;
    const profitLossPercentage =
      investment === 0 ? 'N/A' : ((profitLoss / investment) * 100).toFixed(2);
    const isProfit = profitLoss >= 0;

    return (
      <Swipeable
        style={styles.stockCard}
        key={stock.stock}
        renderRightActions={() => renderRightActions(stock)}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('StockDetails', { id: stock.stock })}
        >
          <View style={styles.stockCard}>
            <Text style={styles.stockName}>{stock.name}</Text>
            <Text style={styles.stockDetails}>
              Quantity: {stock.quantity}, Bought at: {parseFloat(stock.price_bought).toFixed(2)}{' '}
              {stock.currency}, Current: {parseFloat(stock.currentPrice).toFixed(2)} {stock.currency}
            </Text>
            <Text
              style={[
                styles.stockProfitLoss,
                { color: isProfit ? 'green' : 'red' },
              ]}
            >
              {isProfit ? 'Profit' : 'Loss'}: {profitLoss.toFixed(2)} {stock.currency} (
              {profitLossPercentage}%)
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{portfolio.name}</Text>
        <TouchableOpacity onPress={() => {}} style={styles.trashIcon}>
          <MaterialIcons name="delete" size={34} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>{portfolio.description}</Text>
      <Text style={styles.dateText}>Created on: {formattedDate}</Text>

      <View style={styles.portfolioMetrics}>
        <Text style={styles.metricText}>
          Total Investment: {totalInvestment.toFixed(2)} {stocks[0]?.currency || 'N/A'}
        </Text>
        <Text style={styles.metricText}>
          Current Value: {currentValue.toFixed(2)} {stocks[0]?.currency || 'N/A'}
        </Text>
        <Text
          style={[
            styles.metricText,
            { color: isPortfolioProfit ? 'green' : 'red' },
          ]}
        >
          {isPortfolioProfit ? 'Total Profit' : 'Total Loss'}: {portfolioProfitLoss.toFixed(2)}{' '}
          {stocks[0]?.currency || 'N/A'} ({portfolioProfitLossPercentage}%)
        </Text>
      </View>

      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="val"
          backgroundColor="transparent"
          paddingLeft="15"
          hasLegend={false}
        />
      </View>

      <View style={styles.legendContainer}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.val.toFixed(2)} - {item.name}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionHeader}>Stocks</Text>
      {stocks.map(renderStockCard)}

      {fabActive && (
        <View style={styles.inputSection}>
          <View style={styles.searchContainer}>
          <TextInput
            style={[styles.input, styles.flexInput]}
            placeholder="Search Stocks"
            placeholderTextColor="#000"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity style={styles.searchButton} onPress={searchStocks}>
            <MaterialIcons name="search" size={24} color="#FFF" />
          </TouchableOpacity>
          </View>
            {/* Show Loading Indicator */}
          {searchLoading && (
    <ActivityIndicator size="small" color="#0077B6" style={{ marginVertical: 10 }} />
          )}
          {searchResults.length > 0 && (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.stockResult}
                  onPress={() => {
                    setSelectedStock(item);
                    setPriceBought(item.price.toString());
                    setSearchResults([]);
                  }}
                >
                  <Text style={styles.stockResultText}>
                    {item.name} ({item.symbol})
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
          {renderSelectedStockCard()}

          <TextInput
            style={styles.input}
            placeholder={`Price Bought (${selectedStock?.currency === 2 ? 'TRY' : selectedStock?.currency === 3 ? 'USD' : ''})`}
            keyboardType="numeric"
            placeholderTextColor="#000"
            value={priceBought}
            onChangeText={setPriceBought}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            placeholderTextColor="#000"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />
        </View>
      )}

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => (fabActive ? addStockToPortfolio() : setFabActive(true))}
        >
          <MaterialIcons name={fabActive ? 'check' : 'add'} size={24} color="#FFF" />
        </TouchableOpacity>

        {fabActive && (
          <TouchableOpacity style={styles.cancelFab} onPress={cancelInput}>
            <MaterialIcons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',

  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  fab: {
    alignSelf: 'center',
    backgroundColor: '#0077B6',
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  trashIcon: {
    marginTop: 0,
    padding: 8,
    alignSelf: 'flex-end',
  },
  flexInput: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 16,
  },
  portfolioMetrics: {
    marginBottom: 20,
  },
  metricText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  legendContainer: {
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#000',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  stockCard: {
    backgroundColor: '#EFEFEF',
    padding: 5,
    marginVertical: 10,
    borderRadius: 8,
  },
  swipeDelete: {
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  swipeDeleteText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stockName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  stockDetails: {
    fontSize: 14,
    color: '#333',
  },
  stockProfitLoss: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputSection: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    backgroundColor: '#F9F9F9',
    fontSize: 14,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#0077B6',
    padding: 10,
    borderRadius: 8,

    margin: 5,
  },
  stockResult: {
    padding: 12,
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    marginVertical: 4,
  },
  stockResultText: {
    fontSize: 14,
    color: '#000',
  },
  bottomSpace: {
    height: 30,
  },
  cancelFab: {
    backgroundColor: '#EF4444',
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PortfolioDetails;
