import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import config from './config/config';
import { useAuth } from './context/AuthContext';

const Post = ({ navigation, route }) => {
    const { postId, author, userMap, post } = route.params;
    const { baseURL } = config;
    const { accessToken } = useAuth();
    

    const [likes, setLikes] = useState(0);
    const [tooltip, setTooltip] = useState(null);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [stockData, setStockData] = useState([]); // Stores Close prices
    const [stockDates, setStockDates] = useState([]); // Stores formatted dates
    const [loading, setLoading] = useState(true);
    const [interval, setInterval] = useState('1d'); // Default interval
    const [timeRange, setTimeRange] = useState('1mo'); // Default time range
    const [hasStockData, setHasStockData] = useState(false);

    useEffect(() => {
        if(post.stocks.length != 0){
            setHasStockData(true);
            fetchStockData();
        }    
        fetchComments();
    }, [postId, timeRange]);


    const fetchComments = async () => {
        const postURL = `${baseURL}/comments/post-comments/${postId}/`;
        try {
            const response = await fetch(postURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log("response", response);
                const commentsList = await response.json();
                setComments(commentsList);
                
            } else {
                console.error(`Failed to fetch comments: ${response}`);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const postComment = async (comment) => {
        const commentURL = `${baseURL}/comments/`;
        try {
            const response = await fetch(commentURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(comment),
            });
            if (response.ok) {
                const commentResponse = await response.json();
                setComments([...comments, commentResponse]);    
                setCommentText('');
                Alert.alert('Comment added successfully');
            } else {
                console.error(response);
                console.error(`Failed to post comment: ${response.status}`);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const fetchStockData = async () => {
        setLoading(true); // Show loader
        try {
            const response = await fetch(`${baseURL}/stocks/${post.stocks[0]}/get_historical_data/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    period: timeRange, // Use selected period
                    interval: interval, // Use selected interval
                }),
            });
            const data = await response.json();
            if (data.Close && data.Date) {
                setStockData(data.Close); // Set Close prices for Y-axis
                setStockDates(
                    data.Date.map((date) =>
                        new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    ) // Format dates for X-axis
                );
            } else {
                console.error('Unexpected response structure:', data);
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
        } finally {
            setLoading(false); // Hide loader
        }
    };

    const renderUsername = (comment) => {
        if(userMap[comment.user_id]){
            return userMap[comment.user_id].username;
        }else{
            return comment.user_id;
        }
    }


    const handleLike = () => {
        setLikes((prevLikes) => prevLikes + 1);
    };
    
    const handleAddCommentButton = () => {
        if(accessToken == null){
            navigation.navigate('Login&Register');
            Alert.alert('Please login to add a comment');
            return;
        }else{
            setShowCommentInput(true);
            
        }
    };

    const handleAddComment = () => {
    
        if (commentText.trim() === '') {
            return; // Ignore empty comments
        }
        const newComment = {
            post_id: postId,
            content: commentText,
        };
        postComment(newComment);
        setShowCommentInput(false);
    };




    const intervals = ['1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h', '1wk', '1mo', '3mo'];
    const timeRanges = ['1mo', '1y', '5y', '1wk'];


    if (!post) {
        return <Text>Loading...</Text>;
    }

    return (
        //console.log("stockData", stockData),
        //console.log("stockDates", stockDates),
    <ScrollView style={styles.container}>
        <View>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.author}>Author: {author ? author : 'Unknown'}</Text>
            <Text style={styles.date}>
                {new Date(post.created_at).toLocaleDateString()} at {new Date(post.created_at).toLocaleTimeString()}
            </Text>
            <View style={styles.tagsContainer}>
                {post.tags.length > 0 ? (
                    post.tags.map((tag) => (
                        <Text key={tag.id} style={styles.tag}>
                            {tag.name}
                        </Text>
                    ))
                ) : (
                    <Text style={styles.noTags}>No tags available</Text>
                )}
            </View>
            <Text style={styles.content}>{post.content}</Text>
            
            <View>
            {hasStockData ? (
                <><View>
                {loading ? (
                    <ActivityIndicator size="large" color="#007BFF" />
                ) : stockData.length > 0 && stockDates.length > 0 ? (
                    <View>
                        <Text style={styles.graphTitle}>Stock Price Chart</Text>
                    <LineChart
                        data={{
                            labels: stockDates, // Use formatted dates for X-axis
                            datasets: [
                                {
                                    data: stockData, // Use Close prices for Y-axis
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width - 20} // Adjust to screen width
                        height={300}
                        yAxisLabel="$"
                        verticalLabelRotation={60}
                        chartConfig={{
                            backgroundColor: 'white',
                            backgroundGradientFrom: 'white',
                            backgroundGradientTo: 'white',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            propsForDots: {
                                r: '2',
                                strokeWidth: '2',
                            },
                        }}
                        bezier={false} // Ensure sharp lines
                        style={styles.chart} />
                    </View>

                    
                ) : (
                    <Text>No stock data available.</Text>
                )}

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
            </View><View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.changeIntervalButton}
                        onPress={() => {
                            setTimeRange('5d');
                            setInterval('1d');
                        } }
                    >
                        <Text style={styles.buttonText}>5d</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.changeIntervalButton}
                        onPress={() => {
                            setTimeRange('1mo');
                            setInterval('1d');
                        } }
                    >
                        <Text style={styles.buttonText}>1mo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.changeIntervalButton}
                        onPress={() => {
                            setTimeRange('1y');
                            setInterval('1mo');
                        } }
                    >
                        <Text style={styles.buttonText}>1y</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.changeIntervalButton}
                        onPress={() => {
                            setTimeRange('5y');
                            setInterval('3mo');
                        } }
                    >
                        <Text style={styles.buttonText}>5y</Text>
                    </TouchableOpacity>
                </View></>
            ) : null}

            </View>
            
            


            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
                    <Text style={styles.buttonText}>👍 Like ({likes})</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.commentButton}
                    onPress={handleAddCommentButton}
                >
                    <Text style={styles.buttonText}>💬 Add Comment</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.comments}>

                <Text style={styles.commentsTitle}>Comments</Text>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <View key={comment.id} style={styles.commentContainer}>
                            <Text style={styles.commentAuthor}>{renderUsername(comment)}</Text>
                            <Text style={styles.commentText}>{comment.content}</Text>
                            
                        </View>
                    ))
                ) : (
                    <Text style={styles.noComments}>No comments yet.</Text>
                )}
            </View>


            <Modal visible={showCommentInput} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.commentInput}
                            value={commentText}
                            onChangeText={setCommentText}
                            placeholder="Write a comment..."
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.submitButton} onPress={handleAddComment}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setShowCommentInput(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    comments: {
        marginBottom: 20,
    },
    commentsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    commentContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    commentAuthor: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    commentText: {
        marginBottom: 5,
    },
    commentDate: {
        fontSize: 12,
        color: '#999',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    commentInput: {
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    submitButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
    },
    cancelButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
    },
    noComments: {
        fontSize: 14,
        color: '#aaa',
        marginTop: 10,
    },
    tooltip: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background for contrast
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tooltipText: {
        color: '#ffffff', // White text for visibility
        fontSize: 12,
        fontWeight: 'bold',
    },
    changeIntervalButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
});

export default Post;
