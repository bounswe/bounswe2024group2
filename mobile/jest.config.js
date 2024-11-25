module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native-vector-icons|react-native|@react-native|@react-navigation)/)"
  ],
  preset: 'react-native',
  
};
