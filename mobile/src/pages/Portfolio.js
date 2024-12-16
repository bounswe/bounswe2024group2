import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from './context/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

const Portfolio = ({ navigation }) => {
  const { userId, accessToken } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [fetchingPortfolios, setFetchingPortfolios] = useState(true);

  // Fetch portfolios from the API
  const fetchUserPortfolios = async () => {
    setFetchingPortfolios(true);

    try {
      const response = await fetch(
        `http://159.223.28.163:30002/portfolios/portfolios-by-user/${userId}/`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      const enrichedPortfolios = await Promise.all(
        data.map(async (portfolio) => {
          const stocksWithDetails = await Promise.all(
            portfolio.stocks.map(async (stockItem) => {
              const stockDetails = await fetchStockDetails(stockItem.stock);
              return {
                ...stockItem,
                currentPrice: stockDetails?.price || 0,
                name: stockDetails?.name || 'N/A',
                symbol: stockDetails?.symbol || 'N/A',
                currency: stockDetails?.currency?.code || 'N/A',
              };
            })
          );

          const totalInvestment = stocksWithDetails.reduce(
            (total, stock) => total + parseFloat(stock.price_bought) * stock.quantity,
            0
          );

          const currentValue = stocksWithDetails.reduce(
            (total, stock) => total + stock.currentPrice * stock.quantity,
            0
          );

          const totalProfitOrLoss = currentValue - totalInvestment;
          const totalProfitOrLossPercentage =
            totalInvestment === 0
              ? 'N/A'
              : ((totalProfitOrLoss / totalInvestment) * 100).toFixed(2);

          return {
            ...portfolio,
            stocks: stocksWithDetails,
            totalProfitOrLoss,
            totalProfitOrLossPercentage,
          };
        })
      );

      setPortfolios(enrichedPortfolios);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      Alert.alert('Error', 'Unable to fetch portfolios. Please try again later.');
    } finally {
      setFetchingPortfolios(false);
    }
  };

  // Fetch stock details by ID
  const fetchStockDetails = async (stockId) => {
    try {
      const response = await fetch(`http://159.223.28.163:30002/stocks/${stockId}/`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching stock details for stockId ${stockId}:`, error);
      return null;
    }
  };

  // Use useFocusEffect to fetch portfolios when the screen is focused
  useFocusEffect(
    useCallback(() => {
      if (userId && accessToken) {
        fetchUserPortfolios();
      }
    }, [userId, accessToken])
  );

  const renderPortfolio = ({ item }) => {
    const isProfit = item.totalProfitOrLoss >= 0;
    return (
      <TouchableOpacity
        style={styles.portfolioCard}
        onPress={() => navigation.navigate('PortfolioDetails', { portfolio: item })}
      >
        <Text style={styles.portfolioTitle}>{item.name}</Text>
        <Text
          style={[
            styles.totalProfitOrLoss,
            { color: isProfit ? 'green' : 'red' },
          ]}
        >
          {isProfit ? 'Total Profit' : 'Total Loss'}: {parseFloat(item.totalProfitOrLoss).toFixed(2)}{' '}
          {item.stocks[0]?.currency || 'N/A'} ({item.totalProfitOrLossPercentage}%)
        </Text>

        <FlatList
          data={item.stocks}
          horizontal
          keyExtractor={(stock) => stock.stock.toString()}
          renderItem={({ item: stock }) => (
            <TouchableOpacity
              style={styles.stockCard}
              onPress={() => navigation.navigate('StockDetails', { id: stock.stock })}
            >
              <Text style={styles.stockSymbol}>{stock.symbol}</Text>
              <Text style={styles.stockDetail}>
                {stock.name}: {stock.quantity} shares
              </Text>
              <Text style={styles.stockDetail}>
                Bought at: {parseFloat(stock.price_bought).toFixed(2)} {stock.currency} | Current:{' '}
                {stock.currentPrice.toFixed(2)} {stock.currency}
              </Text>
            </TouchableOpacity>
          )}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Portfolios</Text>
      {fetchingPortfolios ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : portfolios.length > 0 ? (
        <FlatList
          data={portfolios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPortfolio}
        />
      ) : (
        <Text style={styles.message}>You have no portfolios yet.</Text>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePortfolio')}
      >
        <MaterialIcons name="add" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  portfolioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  portfolioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  totalProfitOrLoss: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stockCard: {
    backgroundColor: '#EFEFEF',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
  },
  stockSymbol: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  stockDetail: {
    fontSize: 12,
    color: '#333',
  },
  fab: {
    alignSelf: 'center',
    backgroundColor: '#0077B6',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#555',
  },
});

export default Portfolio;
