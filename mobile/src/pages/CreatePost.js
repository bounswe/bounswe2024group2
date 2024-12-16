import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { Chip } from "react-native-paper";
import { useAuth } from "./context/AuthContext";
import config from "./config/config";

const CreatePost = ({ navigation }) => {
  const { baseURL } = config;
  const { accessToken, userId } = useAuth();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    console.log("CreatePost access", userId);
    fetchTags();
  }, []);

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
        setAvailableTags(data);
        
      } else {
        console.error("Failed to fetch tags");
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const addTag = async () => {
    if (newTag.trim() === "") return;
    const tagData = {
      name: newTag,
    };
    try {
      const response = await fetch(`${baseURL}/tags/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(tagData),
      });
      if (response.ok) {
        const tag = await response.json();
        setAvailableTags([...availableTags, tag]);
        setNewTag("");
        Alert.alert("Tag added successfully");
        fetchTags();
      } else {
        console.error(response);
        console.error("Failed to add tag");
      }
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  const toggleTagSelection = (tag) => {
    if (selectedTags.includes(tag.id)) {
      setSelectedTags(selectedTags.filter((id) => id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag.id]);
    }
  };

  const handleCreation = async () => {
    const postData = { 
      title: postTitle, 
      content: postContent, 
      liked_by: [],
      tags: selectedTags,
      portfolios: [], 
    };
    try {
      const response = await fetch(`${baseURL}/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        Alert.alert("Post created successfully");
        navigation.navigate("CommunityPage");
      } else {
        console.error(response);
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={postTitle}
        onChangeText={setPostTitle}
      />
      <ScrollView style={styles.tagScrollView} horizontal>
        {availableTags.map((tag) => (
          <Chip
            key={tag.id}
            style={[
              styles.tag,
              selectedTags.includes(tag.id) && styles.selectedTag,
            ]}
            onPress={() => toggleTagSelection(tag)}
          >
            {tag.name}
          </Chip>
        ))}
      </ScrollView>
      <View style={styles.addTagRow}>
        <TextInput
          style={styles.newTagInput}
          placeholder="Add a tag..."
          value={newTag}
          onChangeText={setNewTag}
        />
        <TouchableOpacity style={styles.addTagButton} onPress={addTag}>
          <Text style={styles.addTagText}>+ Add Tag</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.contentInput}
        placeholder="Content..."
        value={postContent}
        onChangeText={setPostContent}
        multiline
      />
      <TouchableOpacity style={styles.postButton} onPress={handleCreation}>
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
  tagScrollView: {
    maxHeight: 50, // Limit height for vertical scrolling
    marginBottom: 16,
  },
  tag: {
    margin: 4,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#e0e0e0",
  },
  selectedTag: {
    backgroundColor: "#007BFF",
  },
  addTagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  newTagInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    padding: 4,
  },
  addTagButton: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    padding: 8,
  },
  addTagText: {
    color: "#fff",
    fontWeight: "bold",
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
