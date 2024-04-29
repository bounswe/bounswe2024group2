import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {mockFilms, mockUsers} from '../fakeData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Movie from '../components/Movie';
import RecentPost from '../components/RecentPost';
import {useNavigation} from '@react-navigation/native';

function Main() {
  const {
    topContainer,
    nameText,
    profilePhoto,
    profilePhotoContainer,
    safeAreaStyle,
    searchBarContainer,
    searchInputStyle,
    moviesContainer,
    midContainer,
    sectionHeaderText,
  } = styles;
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={safeAreaStyle}>
        <View style={topContainer}>
          <Text style={nameText}>Hello {mockUsers[0].name}!</Text>
          <View style={profilePhotoContainer}>
            <Pressable onPress={() => navigation.navigate('Profile')}>
            <Image
              style={profilePhoto}
              source={require('../img/mockUserProfilePhoto.png')}
            />
            </Pressable>
          </View>
        </View>
        <View style={searchBarContainer}>
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color="rgb(9,33,74)"
          />
          <TextInput style={searchInputStyle} placeholder="Search" />
        </View>
        <View style={midContainer}>
          <Text style={[sectionHeaderText, {marginBottom: 10}]}>
            Recent Posts
          </Text>
          <RecentPost postData={mockFilms[1]} />
        </View>
        <View style={moviesContainer}>
          <Text style={sectionHeaderText}>Popular Movies</Text>
          <ScrollView
            style={{marginTop: 10}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <Movie movieIndex={1} />
            <Movie movieIndex={1} />
            <Movie movieIndex={2} />
            <Movie movieIndex={0} />
            <Movie movieIndex={1} />
            <Movie movieIndex={2} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 20,
  },
  topContainer: {
    height: 60,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    color: 'rgb(9,33,74)',
    fontSize: 24,
    flex: 1,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  profilePhoto: {
    width: 60,
    height: '100%',
    borderRadius: 100,
    alignSelf: 'center',
  },
  profilePhotoContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignSelf: 'center',
  },
  searchBarContainer: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(9,33,74,0.5)',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  searchInputStyle: {
    flex: 1,
    height: '100%',
    paddingLeft: 10,
    color: 'rgb(9,33,74)',
  },
  sectionHeaderText: {
    color: 'rgb(9,33,74)',
    fontSize: 20,
    fontWeight: 'bold',
  },
  recentPostContainer: {
    marginTop: 20,
  },
  moviesContainer: {
    marginTop: 20,
  },
  midContainer: {
    marginTop: 50,
    height: 200,
    marginBottom: 20,
  },
  movie: {
    width: 150,
    height: 250,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingContainer: {
    width: '40%',
    height: 30,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 60,
    right: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  starStyle: {
    width: 24,
    height: 24,
  },
  movieTitleStyle: {
    color: 'rgb(9,33,74)',
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  movieTitleContainer: {
    width: '100%',
    height: 50,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
