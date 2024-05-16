import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Pressable,
  FlatList,

} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {mockFilms, mockUsers} from '../fakeData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Movie from '../components/Movie';
import RecentPost from '../components/RecentPost';
import config from '../config';
import styles from "./styles/MainStyle"

function Main({navigation, route}) {
    const [searchInput, setSearchInput] = useState("");
    const [posts, setPosts] = useState([]);


    // console.log(mockFilms[0]);
    const username = route.params;
  
    function handleSearch(){
        if(searchInput == ""){
            Alert.alert("Please write what you want to search.")
        }
        else{
            navigation.navigate("Search", {searchInput: searchInput});
        }
        
    }

    const baseURL = 'http://207.154.242.6:8020';
    async function fetchPosts() {
        const postURL = baseURL + '/post/';
        
        try {
            const response = await fetch(postURL, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.token}`
              },
            });
            console.log(await response.json())
            if (response.ok) {
              const json = await response.json();
              setPosts(json); // Verileri güncelle
            } else {
              throw new Error('Network response was not ok.');
            }
          } catch (error) {
            console.error(error);
            Alert.alert('hata');
          }
      } 

      useEffect(() => {
        fetchPosts();
      }, []);

    
    
    
    return (
    <SafeAreaView style={styles.safeAreaStyle}>
        <ScrollView>
        <View style={styles.topContainer}>
            <Text style={styles.nameText}>Hello {username.username}!</Text>
            <View style={styles.profilePhotoContainer}>
                <Pressable onPress={() => navigation.navigate('Profile')}>
                  <Image
                    style={styles.profilePhoto}
                    source={require('../img/mockUserProfilePhoto.png')}
                  />
                </Pressable>
            </View>
        </View>
        <View style={styles.searchBarContainer}>
            <TouchableOpacity onPress={handleSearch}>
                <MaterialCommunityIcons name="magnify" size={20} color="rgb(9,33,74)" />
            </TouchableOpacity>
            <TextInput style={styles.searchInputStyle} placeholder="Search" value={searchInput} onChangeText={setSearchInput}/>
        </View>
        <View style={styles.midContainer}>
            <Text style={[styles.sectionHeaderText,{marginBottom:10}]}>Recent Posts</Text>
            <FlatList 

            />
            {/* <RecentPost postData={mockFilms[1]}/> */}
        </View>
        <View style={styles.moviesContainer}>
            <Text style={styles.sectionHeaderText}>Popular Movies</Text>
            <ScrollView
                style={{marginTop: 10}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <Movie movieIndex={0} />
                <Movie movieIndex={1} />
                <Movie movieIndex={2} />
                <Movie movieIndex={0} />
                <Movie movieIndex={1} />
                <Movie movieIndex={2} />
            </ScrollView>
        </View>
        </ScrollView>
    </SafeAreaView>


  );
}



export default Main;
