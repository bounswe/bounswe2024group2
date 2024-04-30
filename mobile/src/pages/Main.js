import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Platform,
  StyleSheet,
  ScrollView,

  TouchableOpacity,
  Pressable,

} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {mockFilms, mockUsers} from '../fakeData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Movie from '../components/Movie';
import RecentPost from '../components/RecentPost';

import styles from "./styles/MainStyle"

function Main({navigation}) {
    const [searchInput, setSearchInput] = useState("");
    console.log(mockFilms[0]);

    function handleSearch(){
        navigation.navigate("Search", {searchInput: searchInput});
    }
    

    return (
    <SafeAreaView style={styles.safeAreaStyle}>
        <View style={styles.topContainer}>
            <Text style={styles.nameText}>Hello {mockUsers[0].name}!</Text>
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
            <RecentPost postData={mockFilms[1]}/>
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
    </SafeAreaView>


  );
}



export default Main;
