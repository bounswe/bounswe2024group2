import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const PortfolioDetails = ({ route, navigation }) => {
  const { portfolio } = route.params;

  // Predefined colors for the first five slices
  const predefinedColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  // Helper function to generate non-black/white random colors
  const generateColor = () => {
    let color;
    do {
      color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    } while (color === '#000000' || color === '#ffffff');
    return color;
  };

  // Prepare chart data
  const chartData = portfolio.stocks.map((stock, index) => ({
    name: stock.name,
    val: stock.currentPrice * stock.quantity,
    color: index < predefinedColors.length ? predefinedColors[index] : generateColor(),
    legendFontColor: '#000',
    legendFontSize: 12,
  }));

  // Calculate portfolio metrics
  const totalInvestment = portfolio.stocks.reduce(
    (total, stock) => total + parseFloat(stock.price_bought) * stock.quantity,
    0
  );
  const currentValue = portfolio.stocks.reduce(
    (total, stock) => total + stock.currentPrice * stock.quantity,
    0
  );
  const portfolioProfitLoss = currentValue - totalInvestment;
  const portfolioProfitLossPercentage =
    totalInvestment === 0
      ? 'N/A'
      : ((portfolioProfitLoss / totalInvestment) * 100).toFixed(2);

  const isPortfolioProfit = portfolioProfitLoss >= 0;

  // Format creation date
  const formattedDate = new Date(portfolio.created_at).toLocaleDateString();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{portfolio.name}</Text>
      <Text style={styles.description}>{portfolio.description}</Text>
      <Text style={styles.dateText}>Created on: {formattedDate}</Text>

      {/* Portfolio Metrics */}
      <View style={styles.portfolioMetrics}>
        <Text style={styles.metricText}>
          Total Investment: {totalInvestment.toFixed(2)} {portfolio.stocks[0]?.currency || 'N/A'}
        </Text>
        <Text style={styles.metricText}>
          Current Value: {currentValue.toFixed(2)} {portfolio.stocks[0]?.currency || 'N/A'}
        </Text>
        <Text
          style={[
            styles.metricText,
            { color: isPortfolioProfit ? 'green' : 'red' },
          ]}
        >
          {isPortfolioProfit ? 'Total Profit' : 'Total Loss'}: {portfolioProfitLoss.toFixed(2)}{' '}
          {portfolio.stocks[0]?.currency || 'N/A'} ({portfolioProfitLossPercentage}%)
        </Text>
      </View>

      {/* Pie Chart */}
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 40} // Adjust to ensure it fits
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="val"
          backgroundColor="transparent"
          paddingLeft="15"
          hasLegend={false} // Prevent default legends
        />
      </View>

      {/* Custom Legends Below Chart */}
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

      {/* Stocks Section (Vertically Stacked) */}
      <Text style={styles.sectionHeader}>Stocks</Text>
      {portfolio.stocks.map((stock) => {
        const investment = parseFloat(stock.price_bought) * stock.quantity;
        const currentValue = stock.currentPrice * stock.quantity;
        const profitLoss = currentValue - investment;
        const profitLossPercentage =
          investment === 0 ? 'N/A' : ((profitLoss / investment) * 100).toFixed(2);
        const isProfit = profitLoss >= 0;

        return (
          <TouchableOpacity
            key={stock.stock}
            style={styles.stockCard}
            onPress={() => navigation.navigate('StockDetails', { id: stock.stock })}
          >
            <Text style={styles.stockName}>{stock.name}</Text>
            <Text style={styles.stockDetails}>
              Quantity: {stock.quantity}, Bought at: {parseFloat(stock.price_bought).toFixed(2)}{' '}
              {stock.currency}, Current: {stock.currentPrice.toFixed(2)} {stock.currency}
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
          </TouchableOpacity>
        );
      })}

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
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
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
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
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
  bottomSpace: {
    height: 20, // Space at the bottom of the page
  },
});

export default PortfolioDetails;
