import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Post = () => {
    // Sample stock data (Replace this with dynamic data)
    const stockData = [142, 145, 143, 141, 144, 140, 138, 139]; // Closing prices
    const [tooltip, setTooltip] = useState(null); // State for tooltip info

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>NVIDIA Stock Analysis</Text>
            <Text style={styles.author}>By: Elif Demir</Text>
            <Text style={styles.date}>Published on: 2024-10-12</Text>
            <View style={styles.tagsContainer}>
                <Text style={styles.tag}>NVIDIA</Text>
                <Text style={styles.tag}>Stock Analysis</Text>
                <Text style={styles.tag}>Investments</Text>
            </View>
            <Text style={styles.content}>
                NVIDIA stocks have recently seen a sharp decline, raising concerns among investors. Here's the latest trend for better understanding.
            </Text>
            <Text style={styles.graphTitle}>Stock Price Chart</Text>

            {/* Line Chart */}
            <View>
                <LineChart
                    data={{
                        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8'], // X-axis labels
                        datasets: [
                            {
                                data: stockData, // Stock prices for the Y-axis
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 20} // Adjust to screen width
                    height={300}
                    yAxisLabel="$"
                    chartConfig={{
                        backgroundColor: '#1e2923',
                        backgroundGradientFrom: '#1e2923',
                        backgroundGradientTo: '#08130d',
                        decimalPlaces: 2, // Rounds values to 2 decimal places
                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#ffa726',
                        },
                    }}
                    bezier
                    style={styles.chart}
                    onDataPointClick={({ value, x, y, index }) => {
                        setTooltip({
                            value: `$${value}`,
                            x,
                            y,
                            index,
                        });
                    }}
                />

                {/* Tooltip for the clicked point */}
                {tooltip && (
                    <View
                        style={[
                            styles.tooltip,
                            {
                                left: tooltip.x - 20, // Center tooltip horizontally
                                top: tooltip.y - 40, // Position tooltip above the point
                            },
                        ]}
                    >
                        <Text style={styles.tooltipText}>{tooltip.value}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    author: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    tagsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    tag: {
        backgroundColor: '#e0f7fa',
        color: '#007BFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight: 5,
    },
    content: {
        fontSize: 16,
        marginBottom: 20,
    },
    graphTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    tooltip: {
        position: 'absolute',
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    tooltipText: {
        color: '#fff',
        fontSize: 12,
    },
});

export default Post;
