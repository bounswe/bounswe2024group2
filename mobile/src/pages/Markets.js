import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Using MaterialIcons for the magnifying glass

const Markets = ({ navigation }) => {
  const [stocks, setStocks] = useState([]); // Store all loaded stocks
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // Loading state for pagination
  const [searchLoading, setSearchLoading] = useState(false); // Loading state for search
  const [searchQuery, setSearchQuery] = useState(''); // Current search input
  const [searchResults, setSearchResults] = useState([]); // Search results
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
            
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Filter out stocks with a price of -1
      const filteredData = data.filter((stock) => stock.price !== -1);
  
      console.log(`Fetched stocks for page ${pageNumber}:`, filteredData);
  
      if (!Array.isArray(filteredData) || filteredData.length === 0) {
        setHasMore(false); // No more data to load
        return;
      }
  
      setStocks((prevStocks) => [
        ...prevStocks,
        ...filteredData.filter((stock) => !prevStocks.find((s) => s.id === stock.id)), // Ensure unique stocks
      ]);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      Alert.alert('Error', 'Unable to fetch stocks. Please try again later.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };
  
  const searchStocks = async (query) => {
    if (!query) {
      setSearchResults([]); // Clear search results if query is empty
      return;
    }
  
    setSearchLoading(true);
  
    try {
      const response = await fetch('http://159.223.28.163:30002/stocks/search/', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
          pattern: query,
          limit: 10,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Filter out stocks with a price of -1
      const filteredData = data.filter((stock) => stock.price !== -1);
  
      console.log('Search results:', filteredData);
  
      setSearchResults(filteredData);
    } catch (error) {
      console.error('Error searching stocks:', error);
      Alert.alert('Error', 'Unable to search stocks. Please try again later.');
    } finally {
      setSearchLoading(false);
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
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#007AFF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            searchStocks(text); // Trigger search on input change
          }}
        />
      </View>

      {/* Loading Indicator for Search */}
      {searchLoading && (
        <ActivityIndicator size="small" color="#007AFF" style={styles.searchLoader} />
      )}

      {/* Stock List */}
      <FlatList
        data={searchQuery ? searchResults : stocks} // Show search results or default stocks
        renderItem={renderStockItem}
        keyExtractor={(item) => item.id.toString()} // Ensure unique keys
        onEndReached={searchQuery ? null : loadMoreStocks} // Disable pagination during search
        onEndReachedThreshold={0.5} // Adjust how close to the bottom the user needs to be to trigger
        ListFooterComponent={
          loadingMore && !searchQuery && (
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  searchLoader: {
    marginBottom: 10,
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
