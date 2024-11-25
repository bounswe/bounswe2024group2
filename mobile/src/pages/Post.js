import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Post = ({route}) => {
    const { postId } = route.params;
    const [post, setPost] = useState(null);
    const [user, setUser] = useState({});
    


    const fetchPost = async () => {
        const baseURL = 'http://159.223.28.163:30002';
        const postURL = `${baseURL}/posts/${postId}/`;
    
        try {
            const response = await fetch(postURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': 'WTyfHMRCB4yI4D5IhdreWdnFDe6skYPyBbenY9Z5F5VWc7lyii9zV0qXKjtEDGRN',
                },
            });
            if (response.ok) {
                const postData = await response.json();
                setPost(postData);
    
                // Kullanıcı bilgisi çekme
                const authorId = postData.author;
                fetchUser(authorId);
            } else {
                console.error('Error fetching post:', response.status);
            }
        } catch (error) {
            console.error('Error fetching post:', error.message, error.stack);
        }
    };
    
    const fetchUser = async (authorId) => {
        const baseURL = 'http://159.223.28.163:30002';
        const userURL = `${baseURL}/users/${authorId}/`;
    
        try {
            const response = await fetch(userURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': 'WTyfHMRCB4yI4D5IhdreWdnFDe6skYPyBbenY9Z5F5VWc7lyii9zV0qXKjtEDGRN',
                },
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                console.log('Error fetching user:', response);
                console.error('Error fetching user:', response.status);
            }
        } catch (error) {
            console.error('Error fetching user:', error.message, error.stack);
        }
    };
    

    useEffect(() => {
        fetchPost();
        
    }, []);
    
    if (!post) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.author}>{user.username}</Text>
            <Text style={styles.date}>{post.created_at}</Text>
            <Text style={styles.content}>{post.content}</Text>
        </View>
    );

    
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
