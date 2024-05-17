import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container:{
        flex:1,
        padding:"4%",
        backgroundColor:"white",
    },
    top_container:{
        flex:0.1,
        

        justifyContent:"center",
        marginBottom:20,
    },
    mid_container:{
        alignItems:"flex-start",
        flex:1,
        
    },
    title_box:{
        borderWidth:1,
        minWidth:350,
        marginBottom:20,
        borderRadius:10,
    },
    review_box:{
        borderWidth:1,
        minWidth:350,
        minHeight:350,
        borderRadius:10,
        
    },
    title:{
        fontWeight:"bold",
        fontSize:20,
        color:"black",
    },
    submit_box:{
        alignItems:"center",
        justifyContent:"center",
        minWidth:350,
        minHeight:50,
        borderRadius:10,
       
        backgroundColor:"#DC143C",
    },
    submit_text:{
        color:"white",
        fontSize:20,
        fontWeight:"bold",
    }

})