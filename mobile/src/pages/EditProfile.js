import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
export default function EditProfile({navigation}) {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const {
    container,
    text,
    safeAreaStyle,
    topContainer,
    profilePhotoContainer,
    profilePhoto,
    midContainer,
    sectionContainer,
    sectionHeader,
    inputStyle,
    usernameText,
    bottomContainer,
    buttonStyle,
    buttonText,
  } = styles;
  const username = 'johndoe';
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={safeAreaStyle}>
        <View style={container}>
          <View style={topContainer}>
            <Text style={text}>Edit Profile</Text>
          </View>
          <View style={profilePhotoContainer}>
            <Image
              style={profilePhoto}
              source={require('../img/mockUserProfilePhoto.png')}
            />
            {/* <Text style={usernameText}>{username}</Text> */} 
          </View>
          <View style={midContainer}>
            <View style={sectionContainer}>
              <Text style={sectionHeader}>Change Username</Text>
              <TextInput
                style={inputStyle}
                placeholder="New Username"
                value={newUsername}
                autoCapitalize="none"
                onChangeText={setNewUsername}
              />
            </View>

            <View style={sectionContainer}>
              <Text style={sectionHeader}>Change Password</Text>
              <TextInput
                style={inputStyle}
                placeholder="New Password"
                value={newPassword}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={setNewPassword}
              />
            </View>
            <View style={sectionContainer}>
              <Text style={sectionHeader}>Confirm Password</Text>
              <TextInput
                style={inputStyle}
                placeholder="New Password"
                value={confirmedPassword}
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={setConfirmedPassword}
              />
            </View>
          </View>
          <View style={bottomContainer}>
            <TouchableOpacity
              style={buttonStyle(false)}
              onPress={() => navigation.goBack()}>
              <Text style={buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyle(true)}
              onPress={() => {
                if (newPassword === confirmedPassword) {
                  // Save the new username and password
                  Keyboard.dismiss();
                  navigation.goBack();
                  console.log('Username has been changed:', newUsername);
                  console.log('Password has been changed:', newPassword);
                } else {
                  alert('Passwords do not match.');
                }
              }}>
              <Text style={buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  container: {
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgb(9,33,74)',
  },
  usernameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(9,33,74)',
    marginTop: 10,
  },
  topContainer: {
    marginBottom: 20,
  },
  profilePhotoContainer: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
    alignItems: 'center',
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  midContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 70,
    paddingTop: 20,
  },
  sectionContainer: {
    width: '100%',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(9,33,74)',
    marginBottom: 10,
  },
  inputStyle: {
    width: 300,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'rgb(9,33,74)',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgb(9,33,74)',
  },
  bottomContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width / 1.7,
    justifyContent: 'space-between',
    // backgroundColor:'green'
    paddingVertical: 20,
  },
  buttonStyle: save => {
    return {
      backgroundColor: '#DC143C',
      padding: 10,
      borderRadius: 10,
      marginVertical: 10,
      width: 100,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: save ? 1 : 0.7,
    };
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
