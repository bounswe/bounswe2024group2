import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        padding:"5%",
        backgroundColor:"white",
    },
    top_container: {
        marginTop:30,
        marginBottom:20,
    },

    search_bar_container: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    search_input_style: {
        flex: 1,
        height: '100%',
        paddingLeft: 10,
        color: 'rgb(9,33,74)',
    },
   
    seperator:{
        margin:4,
    },
    movie_box:{
        padding:3,
    }
});