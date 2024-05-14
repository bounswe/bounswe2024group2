import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        padding:"5%",
        backgroundColor:"white",
    },
    topContainer: {
        height: 60,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    searchBarContainer: {
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
    searchInputStyle: {
        flex: 1,
        height: '100%',
        paddingLeft: 10,
        color: 'rgb(9,33,74)',
    },
    
});