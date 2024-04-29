import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {mockFilms} from '../fakeData';
import {mockPosts} from '../fakeData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RecentPost = ({postData}) => {
  const {
    container,
    leftContainer,
    rightContainer,
    imageStyle,
    imageContainer,
    dataContainer,
    titleStyle,
    headerContainer,
    starStyle,
    contentContainer,
    contentStyle,
    profileContainer,
    commentContainer,
    likeContainer,
    interactionAmount,
    profilePhoto,
  } = styles;

  return (
    <View style={container}>
      <View style={leftContainer}>
        <View style={headerContainer}>
          <View style={imageContainer}>
            <Image style={imageStyle} source={postData.poster} />
          </View>
          <View style={dataContainer}>
            <Text style={titleStyle}>{postData.title}</Text>
            <View style={{flexDirection: 'row'}}>
              {Array.from({length: postData.rating}, (_, index) => (
                <Image
                  key={index}
                  style={starStyle}
                  source={require('../img/star.png')}
                />
              ))}
              {Array.from(
                {length: 5 - Math.floor(postData.rating)},
                (_, index) => (
                  <Image
                    key={index}
                    style={starStyle}
                    source={require('../img/black_star.png')}
                  />
                ),
              )}
            </View>
          </View>
        </View>
        <View style={contentContainer}>
          <Text style={contentStyle}>{mockPosts[0].content}</Text>
        </View>
      </View>
      <View style={rightContainer}>
        <View style={profileContainer}>
          <Image
            style={profilePhoto}
            source={require('../img/mockUserProfilePhoto.png')}
          />
        </View>
        <View style={commentContainer}>
          <Text style={interactionAmount}>8.6k</Text>
          <MaterialCommunityIcons name="comment-text-outline" size={30} color="white" />
        </View>
        <View style={likeContainer}>
          <Text style={interactionAmount}>8.6k</Text>
          <MaterialCommunityIcons name="thumb-up-outline" size={30} color="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(9,33,74)',
    height: '100%',
    borderRadius: 12,
  },
  leftContainer: {
    flex: 3,
    height: '100%',
    flexDirection: 'column',
    width: '60%',
    display: 'flex',
  },
  headerContainer: {
    flexDirection: 'row',
  },
  rightContainer: {
    flex: 1,
    height: '100%',
  },
  imageStyle: {
    height: 100,
    width: 80,
    borderRadius: 12,
    marginLeft: 10,
    marginTop: 10,
  },
  imageContainer: {
    flex: 2,
  },
  dataContainer: {
    margin: 10,
    width: 100,
    flex: 3,
  },
  titleStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  starStyle: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginHorizontal: 2,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  contentStyle: {
    color: 'white',
    fontSize: 16,
  },
  profileContainer: {
    flex: 1,
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  likeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  interactionAmount: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 10,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignSelf: 'center',
  },
});

export default RecentPost;
