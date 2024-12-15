import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';

const Markets = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [stocks, setStocks] = useState([]); // Store all loaded stocks
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // Loading state for pagination
  const [page, setPage] = useState(1); // Current page number
  const [hasMore, setHasMore] = useState(true); // To check if there are more pages to load

  const fetchStocks = async (pageNumber = 1) => {
    try {
      const response = await fetch(`http://159.223.28.163:30002/stocks/?page=${pageNumber}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Basic ZnVya2Fuc2Vua2FsOkxvc29sdmlkYWRvcy41NQ==',
          'X-CSRFToken': 'HN4gYGlxSnwtGKK91OG9c6WC6gr8091Pm5Kof3t0WoTHOe0Z2ToubTZUdlOkjR34',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Fetched stocks for page ${pageNumber}:`, data);

      if (!Array.isArray(data) || data.length === 0) {
        setHasMore(false); // No more data to load
        return;
      }

      setStocks((prevStocks) => [...prevStocks, ...data]); // Append new stocks to the list
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
      style={styles.stockItem}
      onPress={() => setSelectedStock(item)}
    >
      <Text style={styles.stockCode}>{item.symbol || 'N/A'}</Text>
      <Text style={styles.stockName}>{item.name || 'No Name'}</Text>
      <Text style={styles.stockPrice}>
        ${parseFloat(item.price || 0).toFixed(2)}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
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
        keyExtractor={(item) => item.id.toString()}
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

      {/* Stock Details */}
      {selectedStock && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>{selectedStock.symbol || 'No Symbol'}</Text>
          <Text style={styles.detailsName}>{selectedStock.name || 'No Name'}</Text>
          <Text style={styles.detailsPrice}>
            Price: ${parseFloat(selectedStock.price || 0).toFixed(2)}
          </Text>
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
  footer: {
    padding: 10,
    alignItems: 'center',
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
});

export default Markets;
