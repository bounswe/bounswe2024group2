import { StyleSheet } from "react-native";


export default StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        paddingHorizontal: 20,
    },
    topContainer: {
        height: 60,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameText: {
        color: 'rgb(9,33,74)',
        fontSize: 24,
        flex: 1,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },
    profilePhoto: {
        width: 60,
        height: '100%',
        borderRadius: 100,
        alignSelf: 'center',
    },
    profilePhotoContainer: {
        width: 60,
        height: 60,
        borderRadius: 100,
        alignSelf: 'center',
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
    sectionHeaderText: {
        color: 'rgb(9,33,74)',
        fontSize: 20,
        fontWeight: 'bold',
    },
    recentPostContainer: {
        marginTop: 20,
    },
    moviesContainer: {
        marginTop: 20,
    },
    midContainer: {
        marginTop: 50,
        height: 200,
        marginBottom: 20,
    },
    movie: {
        width: 150,
        height: 250,
        borderRadius: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingContainer: {
        width: '40%',
        height: 30,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 60,
        right: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    starStyle: {
        width: 24,
        height: 24,
    },
    movieTitleStyle: {
        color: 'rgb(9,33,74)',
        fontSize: 16,
        fontWeight: 'bold',
        flexWrap: 'wrap',
    },
    movieTitleContainer: {
        width: '100%',
        height: 50,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});