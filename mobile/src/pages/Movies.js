import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, TextInput, FlatList} from 'react-native';
import styles from './styles/MoviesStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MovieBox from '../components/movies/MovieBox';
import EmptyMovieBox from '../components/movies/EmptyMovieBox';
import {Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SelectList} from 'react-native-dropdown-select-list';

function Movies({navigation}) {
  const [searchInput, setSearchInput] = useState('');
  const [recentMovies, setRecentMovies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedMovies, setSelectedMovies] = useState([]);

  const limit = 50;

  function handleSearch() {
    if (searchInput == '') {
      Alert.alert('Please write what you want to search.');
    } else {
      navigation.navigate('Search', {searchInput: searchInput});
    }
  }

  const baseURL = 'http://207.154.242.6:8020';
  async function fetchMoviesByGenre(genre) {
    const genreURL = baseURL + '/get-films-by-genre/';
    try {
      const response = await fetch(genreURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: genre,
        }),
      })
        .then(response => response.json())
        .then(json => setSelectedMovies(json))
        .catch(error => console.error(error));
      console.log(selectedMovies);
    } catch (error) {
      console.log(error);
      Alert.alert(error);
    }
  }
  async function fetchRecentMovies() {
    const recentURL = baseURL + '/recently-release-films/';

    try {
      const response = await fetch(recentURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          limit: limit,
        }),
      })
        .then(response => response.json())
        .then(json => setRecentMovies(json))
        .catch(error => console.error(error));
    } catch (error) {
      console.log(error);
      Alert.alert(error);
    }
  }

  useEffect(() => {
    fetchRecentMovies();
  }, []);
  useEffect(() => {
    if (!selected) {
      console.log(selectedMovies);
      return;
    }
    fetchMoviesByGenre(selected);
    console.log(selectedMovies);
  }, [selected]);

  const renderFilm = ({item}) => {
    function handleMovie() {
      navigation.navigate('Movie', item);
    }

    return (
      <View style={styles.movie_box}>
        <TouchableOpacity onPress={handleMovie}>
          <MovieBox film={item} />
        </TouchableOpacity>
      </View>
    );
  };
  const renderFilmEmpty = ({item}) => {

    return (
      <View style={styles.movie_box}>
        <TouchableOpacity>
          <EmptyMovieBox name={item} />
        </TouchableOpacity>
      </View>
    );
  };
  const itemSeparator = <View style={styles.seperator} />;

  const data = [
    {key: '1', value: 'Drama'},
    {key: '2', value: 'Sci-Fi'},
    {key: '3', value: 'Action'},
    {key: '4', value: 'Comedy'},
    {key: '5', value: 'Horror'},
  ];
  const sortdata = [
    {key: '1', value: 'A to Z'},
    {key: '2', value: 'Z to A'},
    {key: '3', value: 'Rating'},
  ];
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.container}>
        <View style={styles.top_container}>
          <View style={styles.search_bar_container}>
            <TouchableOpacity onPress={handleSearch}>
              <MaterialCommunityIcons
                name="magnify"
                size={20}
                color="rgb(9,33,74)"
              />
            </TouchableOpacity>
            <TextInput
              style={styles.search_input_style}
              placeholder="Search"
              value={searchInput}
              onChangeText={setSearchInput}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              setSelected(null);
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>All Movies</Text>
          </TouchableOpacity>
          <SelectList
            setSelected={val => {
              setSelected(val);
            }}
            data={data}
            save="value"
            placeholder="Genre"
            boxStyles={styles.buttonStyle}
            search={false}
            inputStyles={{color: 'white', fontWeight: 'bold'}}
            maxHeight={100}
            dropdownStyles={{width: 120}}
          />
          <SelectList
            setSelected={val => setSelected(val)}
            data={sortdata}
            save="value"
            placeholder="Sort By"
            boxStyles={styles.buttonStyle}
            search={false}
            inputStyles={{color: 'white', fontWeight: 'bold'}}
            maxHeight={100}
            dropdownStyles={{width: 120}}
          />
        </View>
        <View
          style={{
            paddingVertical: 30,
          }}>
          {selected ? (
            <FlatList
              data={selectedMovies}
              renderItem={renderFilmEmpty}
              numColumns={3}
              ItemSeparatorComponent={itemSeparator}
              columnWrapperStyle={{}}
            />
          ) : (
            <FlatList
              data={recentMovies}
              renderItem={renderFilm}
              numColumns={3}
              ItemSeparatorComponent={itemSeparator}
              columnWrapperStyle={{}}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Movies;
