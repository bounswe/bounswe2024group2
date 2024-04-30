import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        padding:"5%",
        flex:1,
        backgroundColor:"white",
    },
    item_container:{
        flexDirection:"row",
        padding:"3%",
        borderWidth:1,
        borderRadius:10,
        alignItems:"flex-start",
        justifyContent:"flex-start",
        marginBottom:10,
       
        
    },
    image_box:{
       maxHeight:150,
       maxWidth:150,
       marginRight:10,
    },
    image:{
        width:100,
        height:100,
        resizeMode:"contain"
        
    },
    text_box:{
        alignItems:"baseline",
        justifyContent:"center",
        minHeight:100,
        maxWidth:"50%",
    },
    item_title:{
        fontWeight:"bold",
        fontSize:17,
        color:"black",
    },

})