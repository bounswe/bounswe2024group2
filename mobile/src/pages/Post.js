import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import config from './config/config';

const Post = ({ route }) => {
    const { postId, author } = route.params;
    const { baseURL } = config;

    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState(0);
    const [tooltip, setTooltip] = useState(null);
    //const [author, setAuthor] = useState(null);

    useEffect(() => {
        fetchPost();
    }, [postId]);
    
    const fetchPost = async () => {
        const postURL = `${baseURL}/posts/${postId}/`;
        try {
            const response = await fetch(postURL);
            if (response.ok) {
                const postData = await response.json();
    
                // Use postData directly to fetch the author
                setPost(postData);
                setLikes(postData.liked_by.length || 0);
    
                // Fetch author data based on postData.author
                /* if (postData.author) {
                    fetchAuthor(postData.author);
                } else {
                    console.warn('Post does not contain an author field.');
                } */
            } else {
                console.error(`Failed to fetch post: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };



    const fetchAuthor = async (authorId) => {
        const authorURL = `${baseURL}/users/${authorId}/`; // Replace with your API's author endpoint
        try {
            const response = await fetch(authorURL);
            if (response.ok) {
                const authorData = await response.json();
                setAuthor(authorData);
            } else {
                console.error(`Failed to fetch author: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching author:', error);
        }
    };

    const handleLike = () => {
        setLikes((prevLikes) => prevLikes + 1);
    };

    const stockData = [142, 145, 143, 141, 144, 140, 138, 139];

    if (!post) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.author}>Author: {author ? author : 'Unknown'}</Text>
            <Text style={styles.date}>
                {new Date(post.created_at).toLocaleDateString()} at {new Date(post.created_at).toLocaleTimeString()}
            </Text>
            <View style={styles.tagsContainer}>
                {post.tags.length > 0 ? (
                    post.tags.map((tag) => (
                        <Text key={tag.id} style={styles.tag}>
                            #{tag.name}
                        </Text>
                    ))
                ) : (
                    <Text style={styles.noTags}>No tags available</Text>
                )}
            </View>
            <Text style={styles.content}>{post.content}</Text>

           

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
                    <Text style={styles.buttonText}>👍 Like ({likes})</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.commentButton}>
                    <Text style={styles.buttonText}>💬 Add Comment</Text>
                </TouchableOpacity>
            </View>

            {/* Chart Section */}
            <Text style={styles.graphTitle}>Stock Price Chart</Text>
            <LineChart
                data={{
                    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8'],
                    datasets: [{ data: stockData }],
                }}
                width={Dimensions.get('window').width - 20}
                height={300}
                yAxisLabel="$"
                chartConfig={{
                    backgroundColor: '#1e2923',
                    backgroundGradientFrom: '#1e2923',
                    backgroundGradientTo: '#08130d',
                    decimalPlaces: 2,
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
                onDataPointClick={({ value, x, y }) => setTooltip({ value, x, y })}
            />
            {tooltip && (
                <View
                    style={[
                        styles.tooltip,
                        {
                            left: tooltip.x - 20,
                            top: tooltip.y - 40,
                        },
                    ]}
                >
                    <Text style={styles.tooltipText}>${tooltip.value}</Text>
                </View>
            )}
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
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    tag: {
        backgroundColor: '#e0f7fa',
        color: '#007BFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight: 5,
        marginBottom: 5,
    },
    noTags: {
        fontSize: 14,
        color: '#aaa',
    },
});

export default Post;
