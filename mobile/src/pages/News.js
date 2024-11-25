import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Mock Data for some categories
const newsData = [
    { id: '1', source: 'Economic Times', time: '2 hours ago', title: 'GDP Growth Forecasts Revised', category: 'global economy', description: 'Recent reports indicate that GDP growth forecasts for major economies have been revised upwards.', published: new Date().toISOString(), imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', source: 'Market Watch', time: '3 hours ago', title: 'Major Indices Reach All-Time Highs', category: 'stock market', description: 'The stock market sees a significant uptick as major indices reach all-time highs.', published: new Date().toISOString(), imageUrl: 'https://via.placeholder.com/150' },
    { id: '3', source: 'CoinDesk', time: '1 hour ago', title: 'Bitcoin Surges Past $60,000', category: 'cryptocurrency', description: 'Bitcoin’s value has surged past $60,000 amid increased institutional adoption.', published: new Date().toISOString(), imageUrl: 'https://via.placeholder.com/150' },
    { id: '4', source: 'Bloomberg', time: '4 hours ago', title: 'Rising Costs Impact Consumers', category: 'inflation', description: 'Inflation rates are rising, leading to increased costs for consumers on everyday items.', published: new Date().toISOString(), imageUrl: 'https://via.placeholder.com/150' },
    { id: '5', source: 'The Wall Street Journal', time: '5 hours ago', title: 'Unemployment Rates Hit Record Low', category: 'job market', description: 'Unemployment rates have hit record lows, reflecting a strengthening job market.', published: new Date().toISOString(), imageUrl: 'https://via.placeholder.com/150' },
];

// Helper Function to Calculate Time Difference
const calculateTimeDifference = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

// Helper Function to Capitalize Words
const capitalizeWords = (str) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Helper Function to Decode HTML Entities
const decodeHtmlEntities = (str) => {
    if (!str) return '';
    return str.replace(/&#(\d+);/g, (match, num) => String.fromCharCode(num));
};

// Fetch News Data from API
const fetchNews = async (feedName) => {
  try {
    const response = await fetch('http://159.223.28.163:30002/news/', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: 'Basic ZnVya2Fuc2Vua2FsOkxvc29sdmlkYWRvcy41NQ==',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feed_name: feedName }),
    });

    const data = await response.json();
    return data
      .map((item, index) => {
        const publishedDate = new Date(item.published);
        const timeDiff = calculateTimeDifference(publishedDate);

        return {
          id: `${feedName}-${index}`, // Unique ID for FlatList
          source: capitalizeWords(feedName), // Properly formatted source
          time: timeDiff, // Calculated time difference
          published: publishedDate, // Include the published date for sorting
          title: decodeHtmlEntities(item.title),
          category: feedName.toLowerCase(), // Normalize category to lowercase
          description: item.description, // Use link as description or adapt based on needs
          imageUrl: item.image, // Placeholder image
        };
      })
      .sort((a, b) => b.published - a.published); // Sort by published date (newest first)
  } catch (error) {
    console.error(`Error fetching ${feedName} news:`, error);
    return [];
  }
};

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [financialTimesData, setFinancialTimesData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Categories
  const categories = ['All', 'Financial Times', 'Cryptocurrency', 'Stock Market', 'Global Economy', 'Inflation', 'Job Market'];

  // Fetch data on page focus
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        setLoading(true); // Show loading indicator
        const [financialData, cryptoNews] = await Promise.all([
          fetchNews('financial times'),
          fetchNews('cryptocurrency'),
        ]);
        setFinancialTimesData(financialData);
        setCryptoData(cryptoNews);
        setLoading(false); // Hide loading indicator
      };

      loadData();
    }, [])
  );

  // Combine and sort all data for "All" category
  const combinedData = [
    ...financialTimesData,
    ...cryptoData,
    ...newsData,
  ].sort((a, b) => b.published - a.published); // Sort by newest first

  // Filtered data based on selected category
  const filteredData =
    selectedCategory === 'All'
      ? combinedData
      : combinedData.filter((item) => item.category === selectedCategory.toLowerCase());

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Economic News</Text>
      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.filterButton, selectedCategory === category && styles.activeFilterButton]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.filterText, selectedCategory === category && styles.activeFilterText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* News List */}
      {loading ? (
        <ActivityIndicator size="large" color="#0077B6" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardSource}>{item.source}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 5,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  activeFilterButton: {
    backgroundColor: '#0077B6',
  },
  filterText: {
    fontSize: 12,
    color: '#333',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  loader: {
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  cardSource: {
    fontSize: 14,
    color: '#0077B6',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default News;
