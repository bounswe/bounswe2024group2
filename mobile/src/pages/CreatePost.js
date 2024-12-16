import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal, FlatList, ActivityIndicator } from "react-native";
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
  const [availableStocks, setAvailableStocks] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [isStockModalVisible, setIsStockModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchingStocks, setIsFetchingStocks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    console.log("CreatePost access", userId);
    fetchTags();
    fetchStocks(1); 
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

  const fetchStocks = async (page) => {
    if (isFetchingStocks) return; // Prevent multiple fetches at once

    setIsFetchingStocks(true);
    try {
      const response = await fetch(`${baseURL}/stocks?page=${page}&limit=20`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAvailableStocks(data);
        setCurrentPage(page);
      } else {
        console.error("Failed to fetch stocks");
      }
    } catch (error) {
      console.error("Error fetching stocks:", error);
    } finally {
      setIsFetchingStocks(false);
    }
  };

  const fetchSearchStocks = async (query) => {
    if (!query.trim()) {
      fetchStocks(1); // Reset to default stocks if query is empty
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`${baseURL}/stocks/search/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          /* Authorization: `Bearer ${accessToken}`, */
        },
        body: JSON.stringify({ pattern: query, limit: 10 }),
      });
      if (response.ok) {
        const data = await response.json();
        setAvailableStocks(data);
      } else {
        console.log(response);
        console.error("Failed to search stocks");
      }
    } catch (error) {
      console.error("Error searching stocks:", error);
    } finally {
      setIsSearching(false);
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

  const toggleStockSelection = (stock) => {
    if (selectedStocks.includes(stock.id)) {
      setSelectedStocks(selectedStocks.filter((id) => id !== stock.id));
    } else {
      setSelectedStocks([...selectedStocks, stock.id]);
    }
  };

  const handleCreation = async () => {
    const postData = { 
      title: postTitle, 
      content: postContent, 
      tags: selectedTags,
      portfolios: [],
      stocks: selectedStocks, 
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

  const renderStockItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.stockItem,
        selectedStocks.includes(item.id) && styles.selectedStockItem,
      ]}
      onPress={() => toggleStockSelection(item)}
    >
      <Text style={styles.stockName}>{item.name} ({item.symbol})</Text>
      <Text style={styles.stockPrice}>Price: {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    console.log("selectedStocks", selectedStocks),
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
      <TouchableOpacity
        style={styles.selectStocksButton}
        onPress={() => setIsStockModalVisible(true)}
      >
        <Text style={styles.selectStocksButtonText}>Select Stocks</Text>
      </TouchableOpacity>
      <Modal
        visible={isStockModalVisible}
        animationType="slide"
        onRequestClose={() => setIsStockModalVisible(false)}
      >
      <View style={styles.modalContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search stocks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={styles.magnifierButton}
            onPress={() => fetchSearchStocks(searchQuery)}
          >
            <Text style={styles.magnifierIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
        {isSearching ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <FlatList
            data={availableStocks}
            renderItem={renderStockItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => fetchStocks(currentPage - 1)}
              disabled={currentPage === 1 || isFetchingStocks}
            >
              {isFetchingStocks ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.paginationButtonText}>Previous</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => fetchStocks(currentPage + 1)}
              disabled={isFetchingStocks}
            >
              {isFetchingStocks ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.paginationButtonText}>Next</Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setIsStockModalVisible(false)}
          >
            <Text style={styles.closeModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity style={styles.createPostButton} onPress={handleCreation}>
        <Text style={styles.createPostButtonText}>Create Post</Text>
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
    maxHeight: 50,
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
  selectStocksButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 16,
  },
  selectStocksButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
  modalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  stockItem: {
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  selectedStockItem: {
    backgroundColor: "#007BFF",
  },
  stockName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stockPrice: {
    fontSize: 14,
    color: "#555",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  paginationButton: {
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
  },
  paginationButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeModalButton: { marginTop: 20, alignItems: "center" },
  closeModalButtonText: { color: "#007BFF", fontWeight: "bold" },
  createPostButton: { marginTop: 20, backgroundColor: "#007BFF", padding: 15, borderRadius: 5, alignItems: "center" },
  createPostButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    
    justifyContent:"center",
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    
    shadowColor: "black",  // Shadow color
    shadowOffset: { width: 0, height: 4 },  // Increased shadow offset
    shadowOpacity: 0.5,  // Increased shadow opacity
    shadowRadius: 8,  // Increased shadow blur radius
    flexDirection: "row",
    alignItems: "center",
    flex:0.9,
  },
  magnifierButton: {
    flex:0.1,
    padding: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
  magnifierIcon: {
    fontSize: 30,
  },
});

export default CreatePost;

