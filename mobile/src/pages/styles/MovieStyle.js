import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        flex:1,
       
        backgroundColor:"white",
    },
    top_container: {
        flex:1,
        marginBottom:10,
        borderWidth:1
    },
    image:{
        height:370,
        width:250,
        resizeMode:"contain"
    },
    bottom_container: {
        minWidth:350,
        flex:0.8,
      
        padding:"%5",
        justifyContent:"space-evenly",

    },
    title:{
        fontWeight:"bold",
        fontSize:30,
        color:"black",
    },
    description:{
        fontSize:18,
        color:"black",
    },
    post_button:{
        justifyContent:"center",
        alignItems:"center",
  
        height:50,
        width:150,
        borderRadius:10,
        backgroundColor:"#DC143C",
        
    },
    post_text:{
        fontSize:18,
        color:"white",
        fontWeight:"bold",
    },
    button_container:{
        flex:0.5,
        alignItems:"flex-end",
     
        
    },
});