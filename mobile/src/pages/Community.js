import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

const Community = ({navigation}) => {
    const posts = [
        {
            id: 1,
            title: 'Lilium\'un yan kuruluşları iflas tehlikesiyle karşı karşıya, "pennystock" olur mu',
            author: 'Hüsnü Çoban',
            date: '10/12/2024',
            tags: ['Lilium', 'Hisse Analizi', 'Amerika'],
            content: `Alman hava taksisi geliştiricisi Lilium, bugün iki yan kuruluşunun iflas başvurusunda bulunacağını duyurdu. Bu haber, şirketin ABD borsasında işlem gören hisselerinde sert düşüşe neden oldu ve hisseler %57 değer kaybetti.`,
            graph: null, // No graph for this post
            likes: 45,
            comments: 12
        },
        {
            id: 2,
            title: 'Borsa İstanbul’da kazandıran hisse senetleri',
            author: 'Ahmet Atak',
            date: '10/12/2024',
            tags: ['BIST', 'Yatırım', 'Hisse Senedi'],
            content: `BIST 100, pozitif açılışın ardından yükselişine devam ederken gün içinde 8.920 puana kadar yükseldi.`,
            graph: 'https://via.placeholder.com/150', // Placeholder image
            likes: 32,
            comments: 8
        }
    ];

    const handleViewPost = () => {
        navigation.navigate('Post');
    }

    const handleCreatePost = () => {
        navigation.navigate('CreatePost');
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Community</Text>
            <TouchableOpacity 
                style={styles.createPostButton} 
                onPress={() => handleCreatePost()}
            >
                <Text style={styles.createPostButtonText}>Create A Post</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.searchBar}
                placeholder="Search posts..."
            />
            {posts.map((post) => (
                <View key={post.id} style={styles.postCard}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <Text style={styles.postMeta}>
                        Published on: {post.date} by {post.author}
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
                            onPress={() => handleViewPost()}
                        >
                            <Text style={styles.viewPostButtonText}>View Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
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
