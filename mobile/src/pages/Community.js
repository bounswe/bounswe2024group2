import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import config from './config/config';
import { useAuth } from './context/AuthContext';



const Community = ({navigation}) => {
    const { user } = useAuth();
    const { baseURL } = config;
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [userMap, setUserMap] = useState([]);
    const fetchPosts = async () => {
        const postURL = baseURL + '/posts/';
    
        try {
            const response = await fetch(postURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    /* 'X-CSRFToken': 'WTyfHMRCB4yI4D5IhdreWdnFDe6skYPyBbenY9Z5F5VWc7lyii9zV0qXKjtEDGRN' ,*/
                },
            });
    
            if (response.ok) {
                const jsonResponse = await response.json();
                //console.log('Response:', jsonResponse);
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


      const fetchUsers = async () => {
        const postURL = baseURL + '/users/';
    
        try {
            const response = await fetch(postURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    /* 'X-CSRFToken': 'WTyfHMRCB4yI4D5IhdreWdnFDe6skYPyBbenY9Z5F5VWc7lyii9zV0qXKjtEDGRN' ,*/
                },
            });
    
            if (response.ok) {
                const jsonResponse = await response.json();
                //console.log('Response:', jsonResponse);
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
    useFocusEffect(
    React.useCallback(() => {
        fetchPosts();
        fetchUsers();
    }, [])
    );



    const handleViewPost = (post) => {
        navigation.navigate('Post', { postId: post.id });
    };

    const handleCreatePost = () => {
        if(!user){
            Alert.alert('Please login to create a post');
            navigation.navigate('Login&Register');
        }else{
            navigation.navigate('CreatePost');
        }
        
    }

    const renderItem = ({ item: post }) => (
        console.log(post),
        <View key={post.id} style={styles.postCard}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postMeta}>
                Published on: {post.date} by {userMap[post.author].username}
            </Text>
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.tagsContainer}>
                {post.tags.map((tag) => (
                    <Text key={tag} style={styles.tag}>{tag}</Text>
                ))}
            </View>
            {post.graph && (
                <Image source={{ uri: post.graph }} style={styles.graph} />
            )}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text>👍 {post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text>💬 {post.comments}</Text>
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
            />
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
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
    },
    postMeta: {
        color: '#777',
        marginBottom: 10,
    },
    postContent: {
        fontSize: 16,
        marginBottom: 10,
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
        backgroundColor: '#f0f0f0',
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
});

export default Community;
