import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfileScreen from '../screens/ProfileScreen.js';
import HomeScreen from '../screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  goToProfile = () => {
    navigation.navigate('Profile')
    }
  goToLeaderboard = () => {
    navigation.navigate('Leaderboard')
    }
  goToHome = () => {
    navigation.navigate('Home')
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}
        onPress={goToHome}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={goToProfile}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={goToLeaderboard}>
        <Text style={styles.buttonText}>Leaderboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'rgb(225, 105, 86)',
    paddingHorizontal: 20,
    borderBottomColor: 'rgb(249, 224, 221)',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: 'rgb(249, 224, 221)',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'rgb(241, 105, 86)',
  },
});


export default Navbar;