import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import { useAuth } from './context/AuthContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';

const CreatePortfolio = ({ navigation }) => {
  const { accessToken } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

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
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching stocks:', error);
      Alert.alert('Error', 'Unable to search stocks. Please try again later.');
    } finally {
      setSearchLoading(false);
    }
  };

  const addStockToPortfolio = (stock) => {
    if (selectedStocks.some((s) => s.id === stock.id)) {
      Alert.alert('Warning', 'This stock is already added.');
      return;
    }

    setSelectedStocks((prev) => [
      ...prev,
      {
        ...stock,
        price_bought: stock.price === -1 ? '0' : stock.price.toString(),
        currency: 'TRY', // Fixed currency to TRY
        quantity: '', // Default to empty for user input
      },
    ]);
  };

  const removeStockFromPortfolio = (stockId) => {
    setSelectedStocks((prev) => prev.filter((stock) => stock.id !== stockId));
  };

  const updateStockDetails = (stockId, field, value) => {
    setSelectedStocks((prev) =>
      prev.map((stock) =>
        stock.id === stockId ? { ...stock, [field]: value } : stock
      )
    );
  };

  const createPortfolio = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name for the portfolio.');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description for the portfolio.');
      return;
    }

    if (selectedStocks.length === 0) {
      Alert.alert('Error', 'Please add at least one stock to the portfolio.');
      return;
    }

    const invalidStocks = selectedStocks.some(
      (stock) => !stock.price_bought || isNaN(stock.quantity) || stock.quantity <= 0
    );
    if (invalidStocks) {
      Alert.alert('Error', 'Please fill in the price and quantity for all selected stocks.');
      return;
    }

    const formattedStocks = selectedStocks.map((stock) => ({
      stock: stock.id,
      price_bought: stock.price_bought,
      quantity: parseInt(stock.quantity, 10),
    }));

    setLoading(true);

    try {
      const response = await fetch('http://159.223.28.163:30002/portfolios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
          description,
          stocks: formattedStocks,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP Error: ${response.status}`);
      }

      Alert.alert('Success', 'Portfolio created successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating portfolio:', error);
      Alert.alert('Error', 'Unable to create portfolio. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderStockCard = (stock) => {
    const renderRightActions = () => (
      <TouchableOpacity
        style={styles.swipeDelete}
        onPress={() => removeStockFromPortfolio(stock.id)}
      >
        <MaterialIcons name="delete" size={24} color="#FFF" />
        <Text style={styles.swipeDeleteText}>Remove</Text>
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={renderRightActions} key={stock.id}>
        <View style={styles.stockCard}>
          <Text style={styles.stockName}>{stock.name} ({stock.symbol})</Text>
          <TextInput
            style={styles.inputSmall}
            placeholder={`Price Bought (TRY)`} // Fixed currency
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={stock.price_bought.toString()}
            onChangeText={(value) => updateStockDetails(stock.id, 'price_bought', value)}
          />
          <TextInput
            style={styles.inputSmall}
            placeholder="Quantity"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={stock.quantity.toString()}
            onChangeText={(value) => updateStockDetails(stock.id, 'quantity', value)}
          />
        </View>
      </Swipeable>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create Portfolio</Text>

      <TextInput
        style={styles.input}
        placeholder="Portfolio Name"
        placeholderTextColor="#666"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Portfolio Description"
        placeholderTextColor="#666"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.sectionHeader}>Search and Add Stocks</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input, styles.searchInput]}
          placeholder="Search Stocks (e.g., ATA)"
          placeholderTextColor="#666"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchStocks}>
          <MaterialIcons name="search" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {searchLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      )
        :
        searchResults.length > 0 ? (<FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.stockResult}
            onPress={() => addStockToPortfolio(item)}
          >
            <Text style={styles.stockResultText}>{item.name} ({item.symbol})</Text>
          </TouchableOpacity>
        )}
      />): (<Text style={styles.message}>No stocks found.</Text>)}

      <Text style={styles.sectionHeader}>Selected Stocks</Text>
      {selectedStocks.map(renderStockCard)}

      <TouchableOpacity style={styles.button} onPress={createPortfolio} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Create Portfolio'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    color: '#111',
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    color: '#111',
    width: '45%',
    marginRight: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#0077B6',
    borderRadius: 50,
    padding: 10,
    marginLeft: 8,
  },
  stockResult: {
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    marginVertical: 5,
  },
  stockResultText: {
    fontSize: 16,
    color: '#333',
  },
  stockCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    position: 'relative',
  },
  swipeDelete: {
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 12,
    marginVertical: 8,
  },
  swipeDeleteText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  stockName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  button: {
    backgroundColor: '#0077B6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
    color: '#555',
  },
});

export default CreatePortfolio;
