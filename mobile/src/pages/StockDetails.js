import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';

const StockDetails = ({ route }) => {
  const { id } = route.params; // Get the stock ID from navigation params
  const [stockDetails, setStockDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStockDetails = async () => {
    const url = `http://159.223.28.163:30002/stocks/${id}/`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Basic ZnVya2Fuc2Vua2FsOkxvc29sdmlkYWRvcy41NQ==',
          'X-CSRFToken': 'HN4gYGlxSnwtGKK91OG9c6WC6gr8091Pm5Kof3t0WoTHOe0Z2ToubTZUdlOkjR34',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched Stock Details:', data); // Debugging log
      setStockDetails(data);
    } catch (error) {
      console.error('Error fetching stock details:', error);
      Alert.alert('Error', 'Unable to fetch stock details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!stockDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load stock details.</Text>
      </View>
    );
  }

  const {
    name,
    symbol,
    currency,
    detail,
  } = stockDetails;

  const {
    currentPrice,
    marketCap,
    fiftyTwoWeekHigh,
    fiftyTwoWeekLow,
    volume,
    averageVolume,
    open,
    dayLow,
    dayHigh,
    sector,
    industry,
    longBusinessSummary,
  } = detail || {};

  const currencyCode = currency?.code || 'N/A';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Stock Overview */}
      <View style={styles.header}>
        <Text style={styles.title}>{name || 'N/A'}</Text>
        <Text style={styles.symbol}>{symbol || 'N/A'}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>
          {currencyCode} {currentPrice || 'N/A'}
        </Text>
        <Text style={styles.subDetail}>Current Price</Text>
      </View>

      {/* Stock Highlights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stock Highlights</Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Market Cap:</Text> {currencyCode} {marketCap || 'N/A'}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>52-Week High:</Text> {currencyCode} {fiftyTwoWeekHigh || 'N/A'}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>52-Week Low:</Text> {currencyCode} {fiftyTwoWeekLow || 'N/A'}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Volume:</Text> {volume || 'N/A'}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Average Volume:</Text> {averageVolume || 'N/A'}
        </Text>
      </View>

      {/* Financial Highlights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Financial Highlights</Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Open:</Text> {currencyCode} {open || 'N/A'}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Day Low:</Text> {currencyCode} {dayLow || 'N/A'}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Day High:</Text> {currencyCode} {dayHigh || 'N/A'}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Sector:</Text> {sector || 'N/A'}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Industry:</Text> {industry || 'N/A'}
        </Text>
      </View>

      {/* Business Summary */}
      {longBusinessSummary && (
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Business Summary</Text>
          <Text style={styles.summary}>{longBusinessSummary}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  container: {
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  scrollContent: {
    paddingBottom: 40, // Add padding to ensure space for the last element
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  symbol: {
    fontSize: 20,
    color: '#555',
    marginTop: 5,
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  subDetail: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  section: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lastSection: {
    marginBottom: 40, // Add extra margin for the last section
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#000',
  },
  summary: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginTop: 10,
  },
});

export default StockDetails;
