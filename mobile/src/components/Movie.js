import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {mockFilms} from '../fakeData';

export default function Movie({movieIndex}) {
  const {movie, ratingContainer, starStyle, movieTitleStyle, movieTitleContainer} = styles
  const exp = '../img/shawshankPoster.jpg'
  return (
    <View style={movie}>
            <Image
              source={mockFilms[movieIndex].poster}
              style={{width: '100%', height: 200, borderRadius: 10,flex:10}}
            //   imageStyle={{borderRadius: 10}}
              ></Image>
            <View style={ratingContainer}>
              <Image style={starStyle} source={require('../img/star.png')} />
              <Text
                style={{
                  fontSize: 16,
                  color: 'rgb(9,33,74)',
                  fontWeight: 'bold',
                }}>
                {mockFilms[movieIndex].rating}
              </Text>
            </View>
            <View style={movieTitleContainer}>
              <Text style={movieTitleStyle}>{mockFilms[movieIndex].title}</Text>
            </View>
          </View>
  )
}

const styles = StyleSheet.create({
  movie: {
    width: 150,
    height: 250,
    // backgroundColor: 'red',
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
        flex:2,
        justifyContent: 'center',
        alignItems: 'center',
    },
})