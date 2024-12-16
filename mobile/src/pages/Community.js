import React from 'react';
import { View, Text, FlatList, ScrollView, Modal, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import config from './config/config';
import { useAuth } from './context/AuthContext';


const Community = ({navigation}) => {
    const { userId, accessToken } = useAuth();
    const { baseURL } = config;
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [userMap, setUserMap] = useState([]);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [selectedTag, setSelectedTag] = useState(''); // Selected tag for filtering
    const [allTags, setAllTags] = useState([]); // List of all available tags
    const [searchQuery, setSearchQuery] = useState('');


    const fetchPosts = async () => {
        const postURL = baseURL + '/posts/?page=1';
    
        try {
            const response = await fetch(postURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const jsonResponse = await response.json();
                setPosts(jsonResponse);
            } else {
                const errorResponse = await response.json();
                console.log('Error Response:', errorResponse);
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
      };

      const fetchTags = async () => {
        try {
          const response = await fetch(`${baseURL}/tags/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            setAllTags(data);
          } else {
            console.error("Failed to fetch tags");
          }
        } catch (error) {
          console.error("Error fetching tags:", error);
        }
      };

      const fetchUsers = async () => {
        const postURL = baseURL + '/users/';
    
        try {
            const response = await fetch(postURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const jsonResponse = await response.json();
                setUsers(jsonResponse);
                const map = {};
                jsonResponse.forEach((user) => {
                    map[user.id] = user;
                });
                setUserMap(map);

               
            } else {
                const errorResponse = await response.json();
                console.log('Error Response:', errorResponse);
              
                throw new Error('Network response was not ok.');
                
            }
        } catch (error) {
            console.error('Error:', error);
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

    const postLike = async (postId) => {
        const likeURL = `${baseURL}/like`;
        try {
            const response = await fetch(likeURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ post_id: postId }),
            });
            if (response.ok) {
                fetchPosts();
                Alert.alert('Liked successfully!');
            } else {
                console.error(`Failed to like the post: ${response.status}`);
            }
        } catch (error) {
            console.error('Error liking the post:', error);
        }
    };

    const handleLike = (postId) => {
        if (!accessToken) {
            navigation.navigate('Login&Register');
            Alert.alert('Please login to like the post');
            return;
        }
        postLike(postId);
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchPosts();
            fetchUsers();
            fetchTags();
        }, [])
    );



    const handleViewPost = (post) => {
        navigation.navigate('Post', { 
            postId: post.id, 
            author: userMap[post.author] ? userMap[post.author].username : post.author,
            userMap: userMap,
            post: post,
        });
    };

    const handleCreatePost = () => {
        if(!userId){
            Alert.alert('Please login to create a post');
            navigation.navigate('Login&Register');
        }else{
            navigation.navigate('CreatePost');
        }
        
    }

    const handleAddCommentButton = () => {
        if(accessToken == null){
            navigation.navigate('Login&Register');
            Alert.alert('Please login to add a comment');
            return;
        }else{
            setShowCommentInput(true);
            
        }
    };

    const handleAddComment = (postId) => {
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

    const renderUsername = (post) => {
        if(userMap[post.author]){
            return userMap[post.author].username;
        }else{
            return post.author;
        }
    }
    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
        const matchesTag = selectedTag === 'All' || post.tags.some(tag => tag.name === selectedTag);
    
        return matchesSearch && matchesTag;
    });
    
    


    const renderItem = ({ item: post }) => (
        console.log(allTags),
        <View key={post.id} style={styles.postCard}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postMeta}>
                Published on: {new Date(post.created_at).toLocaleDateString()} by {renderUsername(post)}
            </Text>
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.tagsContainer}>
                {post.tags.map((tag) => (
                    <Text key={tag.id} style={styles.tag}>{tag.name}</Text>
                ))}
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={post.liked_by.includes(userId) ? styles.likedButton : styles.actionButton} onPress={() => handleLike(post.id)}>
                    <Text style={post.liked_by.includes(userId) ? styles.likedButtonText : styles.buttonText}>👍 {post.liked_by.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.actionButton} 
                    onPress={handleAddCommentButton} 
                    accessibilityLabel="Add Comment Button"
                    testID="add-comment-button"
                >
                    <Text>💬</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.viewPostButton}
                    onPress={() => handleViewPost(post)}
                >
                    <Text style={styles.viewPostButtonText}>View Post</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Community</Text>
            <TouchableOpacity 
                style={styles.createPostButton} 
                onPress={handleCreatePost}
            >
                <Text style={styles.createPostButtonText}>Create A Post</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.searchBar}
                placeholder="Search posts..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <View style={styles.filterContainer}>
                <Text style={styles.filterLabel}>Filter by Tag:</Text>
                <Picker
                    selectedValue={selectedTag}
                    onValueChange={(itemValue) => setSelectedTag(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="All Tags" value="" />
                    {allTags.map((tag) => (
                        <Picker.Item key={tag.id} label={tag.name} value={tag.name} />
                    ))}
                </Picker>
            </View>
            <FlatList
                data={filteredPosts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />

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
                                <Text style={styles.commentButtonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setShowCommentInput(false)}
                            >
                                <Text style={styles.commentButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: 'black',
    },
    createPostButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 10,
    },
    createPostButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    searchBar: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    postCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
    },
    postMeta: {
        color: 'black',
        marginBottom: 10,
    },
    postContent: {
        fontSize: 16,
        marginBottom: 10,
        color: 'black',
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
    graph: {
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionButton: {
        backgroundColor: '#e0f7fa',
        padding: 10,
        borderRadius: 5,
    },
    likedButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    viewPostButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    viewPostButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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
    buttonText: {
        color: '#007BFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    likedButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    commentButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        color: 'black',
    },
    picker: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    
});

export default Community;
