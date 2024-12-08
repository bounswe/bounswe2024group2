import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, Dimensions, Button, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import config from './config/config';


const Post = ({ route }) => {
    const { postId } = route.params;
    const { baseURL } = config;
    const [post, setPost] = useState(null);
    const [user, setUser] = useState({});
    const [likes, setLikes] = useState(0); // State to manage like count

    const fetchPost = async () => {
        const postURL = `${baseURL}/posts/${postId}/`;

        try {
            const response = await fetch(postURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    /* 'X-CSRFToken': 'WTyfHMRCB4yI4D5IhdreWdnFDe6skYPyBbenY9Z5F5VWc7lyii9zV0qXKjtEDGRN', */
                },
            });
            if (response.ok) {
                const postData = await response.json();
                setPost(postData);
                setLikes(postData.likes || 0); // Set likes from post data
            } else {
                console.error('Error fetching post:', response.status);
            }
        } catch (error) {
            console.error('Error fetching post:', error.message, error.stack);
        }
    };

    const handleLike = () => {
        setLikes(likes + 1);
    
    };

    const handleAddComment = () => {
        console.log('Add Comment button pressed');
    };

    useEffect(() => {
        fetchPost();
    }, []);

    if (!post) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.author}>{user.username}</Text>
            <Text style={styles.date}>{post.created_at}</Text>
            <Text style={styles.content}>{post.content}</Text>

            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
                    <Text style={styles.buttonText}>👍 Like ({likes})</Text>
                </TouchableOpacity>

               
                <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
                    <Text style={styles.buttonText}>💬 Add Comment</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
                        color: (opacity = 1) => rgba(26, 255, 146, `${opacity}`),
                        labelColor: (opacity = 1) => rgba(255, 255, 255, `${opacity}`),
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
                            value: `${value}`,
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
        backgroundColor: '#ffffff',
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
    },
    author: {
        fontSize: 16,
        color: '#555555',
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: '#999999',
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444444',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    likeButton: {
        backgroundColor: '#0073e6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    commentButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Post;
