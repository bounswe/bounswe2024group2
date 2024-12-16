import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const StockDetails = ({ route }) => {
  const { id } = route.params; // Get the stock ID from navigation params
  const [stockDetails, setStockDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState([]);
  const [stockDates, setStockDates] = useState([]);
  const [graphLoading, setGraphLoading] = useState(false);

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
  // Fetch historical stock data
  const fetchStockData = async () => {
    setGraphLoading(true);
    try {
      const response = await fetch(
        `http://159.223.28.163:30002/stocks/${id}/get_historical_data/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ZnVya2Fuc2Vua2FsOkxvc29sdmlkYWRvcy41NQ==',
          },
          body: JSON.stringify({
            period: '1mo', // Default time range
            interval: '1d', // Default interval
          }),
        }
      );

      const data = await response.json();
      if (data.Close && data.Date) {
        setStockData(data.Close); // Set closing prices
        setStockDates(
          data.Date.map((date) =>
            new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          )
        );
      } else {
        console.error('Unexpected response structure:', data);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      Alert.alert('Error', 'Unable to fetch historical stock data.');
    } finally {
      setGraphLoading(false);
    }
  };

  useEffect(() => {
    fetchStockDetails();
    fetchStockData();
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
      {/* Historical Stock Data Graph */}
      <View style={[styles.section, styles.graphSection]}>
      <Text style={styles.sectionTitle}>Stock Price History</Text>
        {graphLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
        ) : stockData.length > 0 && stockDates.length > 0 ? (
        <View style={styles.graphContainer}>
        <LineChart
        data={{
          labels: stockDates,
          datasets: [{ data: stockData }],
        }}
        width={Dimensions.get('window').width - 50} // Adjust width with padding
        height={300}
        yAxisLabel= {`${currencyCode}`}
        verticalLabelRotation={60}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#007AFF',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  ) : (
    <Text style={styles.noDataText}>No historical stock data available.</Text>
  )}
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  graphSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  graphContainer: {
    alignSelf: 'center', // Center the graph horizontally
    paddingHorizontal: 8, // Add padding for the graph container
    marginTop: 10,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 10,
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
