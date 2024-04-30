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
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {mockUsers} from '../fakeData';
import Movie from '../components/Movie';
import {useNavigation} from '@react-navigation/native';
import RecentPost from '../components/RecentPost';
import {mockFilms} from '../fakeData';
const Profile = () => {
  const {
    topContainer,
    nameText,
    profilePhoto,
    profilePhotoContainer,
    safeAreaStyle,
    moviesContainer,
    sectionHeaderText,
    buttonContainer,
    buttonStyle,
    buttonText,
    profileDataContainer,
    headerContainer,
    statsContainer,
    statContainer,
    statText,
    midContainer,
  } = styles;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={topContainer}>
        <View style={profileDataContainer}>
          <View style={headerContainer}>
            <Text style={nameText}>{mockUsers[0].name}</Text>
          </View>
          <View style={buttonContainer}>
            <TouchableOpacity
              style={[buttonStyle, {backgroundColor: 'rgb(234,61,83)'}]}>
              <Text style={buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[buttonStyle, {backgroundColor: '#DC143C'}]}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={profilePhotoContainer}>
          <Image
            style={profilePhoto}
            source={require('../img/mockUserProfilePhoto.png')}
          />
        </View>
      </View>
      <View style={statsContainer}>
        <View style={statContainer}>
          <Text style={statText}>99</Text>
          <Text style={statText}>Followers</Text>
        </View>
        <View style={statContainer}>
          <Text style={statText}>45</Text>
          <Text style={statText}>Following</Text>
        </View>
        <View style={statContainer}>
          <Text style={statText}>23</Text>
          <Text style={statText}>Posts</Text>
        </View>
        <View style={statContainer}>
          <Text style={statText}>30</Text>
          <Text style={statText}>Lists</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={moviesContainer}>
          <Text style={sectionHeaderText}>Favourite Films</Text>
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
        <View style={moviesContainer}>
          <Text style={sectionHeaderText}>Recently Watched</Text>
          <ScrollView
            style={{marginTop: 10}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <Movie movieIndex={0} />
            <Movie movieIndex={2} />
            <Movie movieIndex={1} />
            <Movie movieIndex={2} />
            <Movie movieIndex={0} />
            <Movie movieIndex={2} />
          </ScrollView>
        </View>
        <View style={midContainer}>
          <Text style={[sectionHeaderText, {marginBottom: 10}]}>
            Recent Posts
          </Text>
          <RecentPost postData={mockFilms[1]} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 10,
    paddingHorizontal: 20,
  },
  topContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  nameText: {
    color: 'rgb(9,33,74)',
    fontSize: 24,
    flex: 1,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
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
  sectionHeaderText: {
    color: 'rgb(9,33,74)',
    fontSize: 20,
    fontWeight: 'bold',
  },
  moviesContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileDataContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonStyle: {
    borderRadius: 30,
    height: 45,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '24%',
    justifyContent: 'center',
    backgroundColor: 'rgb(9,33,74)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  statText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  midContainer: {
    height: 200,
    marginBottom: 20,
  },
});
export default Profile;
