import React, { useContext,useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import { useAuth } from './context/AuthContext';

const CreatePost = ({navigation}) => {
  const { user, accessToken, refreshToken } = useAuth();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [tags, setTags] = useState(["Lilium", "Hisse Analizi", "Amerika"]);

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleCreation = async () => {
    const baseURL = 'http://159.223.28.163:30002';
    const postData = {
        title: postTitle,
        content: postContent,
        liked_by:[],
        tags:tags,
        portfolios:[]
    };
    console.log('title:', postTitle);
    console.log('content:', postContent);
    console.log('tag:', tags);
    console.log('access:', accessToken);
    console.log('refresh:', refreshToken);

    const postURL = baseURL + '/posts/';

    try {
        const response = await fetch(postURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'X-CSRFToken': 'WTyfHMRCB4yI4D5IhdreWdnFDe6skYPyBbenY9Z5F5VWc7lyii9zV0qXKjtEDGRN',
            },
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            //console.log('Response:', jsonResponse);
            navigation.navigate("CommunityPage");
           
        } else {
          const errorResponse = await response.json();
          console.log('Error Response:', errorResponse);
          
          throw new Error('Network response was not ok.');
            
        }
    } catch (error) {
      
        console.error('Error:', error);
    }
  };



  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Başlık"
        value={postTitle}
        onChangeText={setPostTitle}
      />
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            style={styles.tag}
            onClose={() => removeTag(tag)}
          >
            {tag}
          </Chip>
        ))}
        <TouchableOpacity style={styles.addTagButton}>
          <Text style={styles.addTagText}>+ Tag Ekle</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.contentInput}
        placeholder="Gönderi İçeriği..."
        value={postContent}
        onChangeText={setPostContent}
        multiline
      />
      <TouchableOpacity 
        style={styles.postButton}
        onPress={() => handleCreation()}
      >
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  titleInput: {
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    padding: 8,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tag: {
    margin: 4,
  },
  addTagButton: {
    margin: 4,
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 16,
  },
  addTagText: {
    color: "#555",
  },
  contentInput: {
    flex: 1,
    fontSize: 14,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  postButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CreatePost;
