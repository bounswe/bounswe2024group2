import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        padding:"5%",
        borderWidth:1,
    },
    top_container:{
        alignItems:"center",
        justifyContent:"center",
        flex:0.5,
        minWidth:"100%",
        maxWidth:"100%",
 
    },
    mid_text:{
        fontWeight:"bold",
        fontSize:30,
        color:"black",
    },
    mid_container:{
        alignItems:"center",
        flex:0.08,
     
        
    },
    bottom_container:{
        alignItems:"center",
        justifyContent:"center",
        flex:0.7,

    },
    input_box:{
        flexDirection:"row",
        alignItems:"flex-end",
        borderWidth:1,
        borderRadius:10,
        shadowColor:'black',
        shadowRadius: 5,
        minWidth:"100%",
        margin:"2%",
    },
    icon_box:{
        padding:"2%",
        marginRight:"1%",
    },
    signup_view:{
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#DC143C",
        minWidth:"100%",
        padding:"2%",
        borderRadius:10,
        marginBottom:"2%",
        marginTop:"5%",
    },
    signup_button:{
        alignItems:"center",
        justifyContent:"center",
        minWidth:"100%",
        padding:"3%",
        borderRadius:10,
    },
    signup_text:{
        fontWeight:"bold",
        color:"white",
        fontSize:18
    },
    input_text:{
        fontWeight:"bold"
    },
    login_view:{
        alignItems:"stretch",
        justifyContent:"space-between",
        flexDirection:"row",
        minWidth:"100%",
        padding:"1%",
        borderRadius:10,
        marginBottom:"3%",
        
    },
    login_text:{
        fontWeight:"bold",
        fontSize:16,
        color:"black",
    },
    
})