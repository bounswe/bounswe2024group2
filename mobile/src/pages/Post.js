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
    //const [userMap, setUserMap] = useState([]);

    useEffect(() => {
        //fetchPost();
        fetchComments();
    }, [postId]);

    const fetchPost = async () => {
        const postURL = `${baseURL}/posts/${postId}/`;
        try {
            const response = await fetch(postURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const postData = await response.json();
                setPost(postData);
                setLikes(postData.liked_by.length || 0);
            } else {
                console.error(`Failed to fetch post: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

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

    const stockData = [142, 145, 143, 141, 144, 140, 138, 139];

    if (!post) {
        return <Text>Loading...</Text>;
    }

    return (
        //console.log("comment", comments),
        //console.log("userMap", userMap),
        //console.log(accessToken),
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
                            {tag.name}
                        </Text>
                    ))
                ) : (
                    <Text style={styles.noTags}>No tags available</Text>
                )}
            </View>
            <Text style={styles.content}>{post.content}</Text>
            <Text style={styles.graphTitle}>Stock Price Chart</Text>
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
                        backgroundColor: 'white',
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`, // Blue line color
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black label color
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                           
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
});

export default Post;
