import React from 'react';
import { View, Text, Image, StyleSheet, FlatList,ScrollView, TouchableOpacity } from 'react-native';


const ProfilePage = () => {
  const badges = [
    { id: 1, title: 'Highliked' },
    { id: 2, title: 'Cretagor' },
    
  ];

  const portfolios = [
    {
        id: 1,
        name: 'Tech Portfolio',
        incrementRate: '15%',
        stocks: ['ASELS', 'TUPRS', 'THYAO'], // Example Turkish stocks
      },
      {
        id: 2,
        name: 'Green Energy',
        incrementRate: '10%',
        stocks: ['ENKA', 'PETKM', 'SISE'],
      },
      {
        id: 3,
        name: 'Real Estate',
        incrementRate: '5%',
        stocks: ['GYO', 'EGEEN', 'KENT'],
      },
  ];

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/stock-logos/Profile.png")} // Replace with your profile image URL
          style={styles.profilePhoto}
        />
        <Text style={styles.username}>@YourUsername</Text>
        <Text style={styles.followerCount}>Followers: 150</Text>
        <TouchableOpacity >
            <Text style={styles.seePost} > See posts</Text>
        </TouchableOpacity>
      </View>

      {/* Badges Section */}
      <View style={styles.badgesContainer}>
        <Text style={styles.sectionTitle}>Badges</Text>
        <FlatList
          data={badges}
          renderItem={({ item }) => (
            <View style={styles.badge}>
              <Image source={require("../../assets/stock-logos/badge-60.png")} height={10} width={10} resizeMode="stretch"></Image>  
              <Text style={styles.badgeText}>{item.title}</Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Portfolio Section */}
      <ScrollView>
        <View style={styles.portfolioContainer}>
            <Text style={styles.sectionTitle}>My Portfolios</Text>
            <FlatList
            data={portfolios}
            renderItem={({ item }) => (
                <View style={styles.portfolioBox}>
                <Text style={styles.portfolioName}>{item.name}</Text>
                <View style={styles.incrementRateContainer}>
                    <Text style={styles.incrementRate}>{item.incrementRate}</Text>
                </View>
                <Text style={styles.stocksTitle}>Stocks:</Text>
                <View style={styles.stockList}>
                    {item.stocks.map((stock, index) => (
                    <Text key={index} style={styles.stockText}>{stock}</Text>
                    ))}
                </View>
                </View>
            )}
            keyExtractor={item => item.id.toString()}
            />
        </View>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  followerCount: {
    fontSize: 16,
    color: '#555',
  },
  badgesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  badgeText: {
    fontSize: 14,
  },
  portfolioContainer: {
    marginBottom: 20,
  },
  portfolioBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  portfolioName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  incrementRateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  incrementRate: {
    fontSize: 14,
    color: '#28a745', // Green color for increment rate
  },
  stocksTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  stockList: {
    marginTop: 5,
  },
  stockText: {
    fontSize: 12,
    color: '#555',
  },
  seePost: {
    color: '#005AAB',
    textDecorationLine: 'underline',
  },
});

export default ProfilePage;
