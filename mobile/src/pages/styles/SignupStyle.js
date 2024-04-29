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
        flex:0.5,
        minWidth:"100%",
        maxWidth:"100%",

 
    },
    mid_text:(isKeyboardOpen)=>{
        return{
        fontWeight:"bold",
        fontSize:30,
        color:"black",
        zIndex:0,
        opacity:isKeyboardOpen?0:1,
        }
    },
    mid_container:{
        alignItems:"center",
        flex:0.08,
     
        
    },
    bottom_container:{
        alignItems:"center",
        justifyContent:"center",
        flex:0.7,
        backgroundColor:'white',
        opacity:1,

    },
    input_box:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        borderWidth:1,
        borderRadius:10,
        shadowColor:'black',
        shadowRadius: 5,
        minWidth:"100%",
        margin:"2%",
        zIndex:2,
        backgroundColor:"white",
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
        fontWeight:"bold",
        width:"80%",
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