import { StyleSheet } from "react-native";


export default StyleSheet.create({
    safeareaStyle:{
        flex:1,
        backgroundColor:"white",
    },
    container:{
        alignItems:"center",
        justifyContent:"center",
        padding:"5%",
        backgroundColor:"white",
        
    },
    top_container: {
        marginTop:70,
        paddingHorizontal:22,
        marginBottom:5
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
    },
    buttonStyle: {
        backgroundColor: 'rgb(9,33,74)',
        width: 100,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    modal: {
        justifyContent: 'center',
        margin: 0, // This helps the modal cover the whole width
      },
      
});