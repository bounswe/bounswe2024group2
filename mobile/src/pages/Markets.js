import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

const Markets = ({ navigation }) => {
  const [stocks, setStocks] = useState([]); // Store all loaded stocks
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // Loading state for pagination
  const [page, setPage] = useState(1); // Current page number
  const [hasMore, setHasMore] = useState(true); // To check if there are more pages to load

  const fetchStocks = async (pageNumber = 1) => {
    try {
      const response = await fetch(
        `http://159.223.28.163:30002/stocks/?page=${pageNumber}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Basic ZnVya2Fuc2Vua2FsOkxvc29sdmlkYWRvcy41NQ==',
            'X-CSRFToken': 'HN4gYGlxSnwtGKK91OG9c6WC6gr8091Pm5Kof3t0WoTHOe0Z2ToubTZUdlOkjR34',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data IDs:", data.map(item => item.id));

      if (!Array.isArray(data) || data.length === 0) {
        setHasMore(false); // No more data to load
        return;
      }

      // Deduplicate stocks by ID
      setStocks((prevStocks) => {
        const combinedStocks = [...prevStocks, ...data];
        const uniqueStocks = Array.from(
          new Map(combinedStocks.map((stock) => [stock.id, stock])).values()
        );
        console.log("Unique stock IDs:", uniqueStocks.map(stock => stock.id));
        return uniqueStocks;
      });
    } catch (error) {
      console.error('Error fetching stocks:', error);
      Alert.alert('Error', 'Unable to fetch stocks. Please try again later.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchStocks(); // Load the first page on component mount
  }, []);

  const loadMoreStocks = () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchStocks(nextPage);
      return nextPage;
    });
  };

  const renderStockItem = ({ item }) => (
    <TouchableOpacity
      style={styles.stockCard}
      onPress={() => navigation.navigate('StockDetails', { id: item.id })}
    >
      <View>
        <Text style={styles.stockCode}>{item.symbol || 'N/A'}</Text>
        <Text style={styles.stockName}>{item.name || 'No Name'}</Text>
      </View>
      <Text style={styles.stockPrice}>
        {parseFloat(item.price || 0).toFixed(2)} {item.currency?.code || ''}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Stock List */}
      <FlatList
        data={stocks}
        renderItem={renderStockItem}
        keyExtractor={(item) => item.id.toString()} // Ensure unique keys
        onEndReached={loadMoreStocks} // Trigger pagination when reaching the end
        onEndReachedThreshold={0.5} // Adjust how close to the bottom the user needs to be to trigger
        ListFooterComponent={
          loadingMore && (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color="#007AFF" />
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stockCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stockCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  stockName: {
    fontSize: 14,
    color: '#333333',
    marginTop: 4,
  },
  stockPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
});

export default Markets;
