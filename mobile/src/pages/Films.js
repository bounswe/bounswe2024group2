import React, {useState, useEffect} from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView, FlatList} from "react-native";
import styles from "./styles/FilmsStyle"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FilmBox from "../components/films/FilmBox";

function Films({navigation}){
    const [searchInput, setSearchInput] = useState("");

    function handleSearch(){
        if(searchInput == ""){
            Alert.alert("Please write what you want to search.")
        }
        else{
            navigation.navigate("Search", {searchInput: searchInput});
        }
        
    }

    const a = [
        {
          "id": "http://www.wikidata.org/entity/Q121290006",
          "label": "Alex/October"
        },
        {
          "id": "http://www.wikidata.org/entity/Q104876373",
          "label": "Above the Knee"
        },
        {
          "id": "http://www.wikidata.org/entity/Q117475163",
          "label": "Ang Tipo Kong Lalake"
        },
        {
          "id": "http://www.wikidata.org/entity/Q11354489",
          "label": "A Tale of Archery at the Sanjusangendo"
        },
        {
          "id": "http://www.wikidata.org/entity/Q104876233",
          "label": "A Gentleman's Game"
        },
        {
          "id": "http://www.wikidata.org/entity/Q110099675",
          "label": "Armugan"
        },
        {
          "id": "http://www.wikidata.org/entity/Q116051203",
          "label": "Autumn Beat"
        },
        {
          "id": "http://www.wikidata.org/entity/Q1129547",
          "label": "And God Created Woman"
        },
        {
          "id": "http://www.wikidata.org/entity/Q123303460",
          "label": "Awkward Customers"
        },
        {
          "id": "http://www.wikidata.org/entity/Q114220980",
          "label": "A Woman from Cairo"
        }
      ];


    const renderFilm = ({item}) =>{
        console.log(item);
        return(
            <FilmBox film={item} />
        )
    }

    return(
        <View style={styles.container}>
            <View>
                <View style={styles.searchBarContainer}>
                    <TouchableOpacity onPress={handleSearch}>
                        <MaterialCommunityIcons name="magnify" size={20} color="rgb(9,33,74)" />
                    </TouchableOpacity>
                    <TextInput style={styles.searchInputStyle} placeholder="Search" value={searchInput} onChangeText={setSearchInput}/>
                </View>
            </View>
            <View>
        
                <FlatList data={a}
                    renderItem={renderFilm}
                    numColumns={3}
                />
            
            </View>
            
        </View>
    )
}

export default Films;