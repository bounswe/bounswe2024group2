import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
     
      backgroundColor: 'white',
      padding: 20,
    },
    image: {
      width: 230,
      height: 350,
      marginBottom: 20,
      borderRadius: 10,

    },
    infoContainer: {
      flex:1,
     
      minWidth:350,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color:"black",
      
    },
    description: {
      fontSize: 17,
      marginBottom: 20,
      color:"black",
      
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color:"black",
    },
    film: {
      fontSize: 17,
      marginBottom: 5,
      color:"black",
    },
  });