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
        marginBottom:10,
        minHeight:300,
        minWidth:100,
       
    },
    image:{
        height:500,
        width:350,
        resizeMode:"contain"
    },
    mid_container: {
        minWidth:350,
        flex:0.8,
        
        padding:"%5",
        justifyContent:"space-evenly",

    },
    inner_container: {
        marginTop:15,

    },
    seperator:{
        margin:4,
    },
    bottom_container: {
        minWidth:350,
        flex:0.8,
        borderWidth:1,
        padding:"%5",
        justifyContent:"space-evenly",

    },
    title:{
        fontWeight:"bold",
        fontSize:30,
        color:"black",
    },
    subtitle:{
        fontWeight:"bold",
        fontSize:25,
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
        marginTop:20,
        
    },
});