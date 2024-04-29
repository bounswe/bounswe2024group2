import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        padding:"5%",
        backgroundColor:"white",
    },
    top_container:{
        alignItems:"center",
        justifyContent:"center",
        flex:0.8,
        minWidth:"100%",
        maxWidth:"100%",
   
    },
    mid_title:{
        fontWeight:"bold",
        fontSize:30,
        color:"black",
    },
    mid_text:{
        fontSize:15,
        fontWeight:"500",
        textAlign:"center",
    },
    mid_container:{
        alignItems:"center",
        flex:0.3,
    },
    title_box:{
        alignItems:"center",
        marginBottom:"7%",
    },
    text_box:{
        alignItems:"center",
        justifyContent:"center"
    },
    bottom_container:{
        alignItems:"center",
        justifyContent:"center",
        flex:0.7,

    },
    email_input_box:{
        flexDirection:"row",
        alignItems:"center",
        borderWidth:1,
        borderRadius:10,
        shadowColor:'black',
        shadowRadius: 5,
        minWidth:"100%",
        margin:"2%",
        marginBottom:"10%",
    },
    icon_box:{
        padding:"2%",
        marginRight:"1%",
    },
    
    verification_view:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#DC143C",
        minWidth:"100%",
        padding:"2%",
        borderRadius:10,
        marginBottom:"3%",

    },
    verification_button:{
        alignItems:"center",
        justifyContent:"center",
        minWidth:"100%",
        padding:"3%",
        borderRadius:10,
    },
    verification_text:{
        fontWeight:"bold",
        color:"white",
        fontSize:18,
    },
    input_text:{
        fontWeight:"bold"
    },
   
    
})