import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import TileItem from '../components/TileItem.js';



const handleIconPress = (item, navigation) => {
  navigation.push(item)
  console.log(`Icon pressed on ${item}`);
};
export { handleIconPress}


export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation();

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  // };


  return (
    <ScrollView style={styles.container}>

      <View style={styles.container2}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.title}>Account Settings</Text>
        <TileItem
          mainText="Update account details"
          subtitle="Username, Location etc"
          iconImage={require('../assets/arrowRight.png')}
          onIconPress={() => handleIconPress('Profile', navigation)}
        />
        <TileItem
          mainText="Change login details"
          subtitle="Email, password"
          iconImage={require('../assets/arrowRight.png')}
          onIconPress={() => handleIconPress('UpdateLogin', navigation)}
        />
        <Text style={styles.title}>Others</Text>
        <TileItem 
          mainText="Change quiz details"
          subtitle="Easy, medium, hard"
          iconImage={require('../assets/arrowRight.png')}
          onIconPress={() => handleIconPress('QuizSettings', navigation)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F16956',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F16956',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#F16956',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container2: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 50,
    marginStart: 16,
    color: 'white',
  },
    loginButton: {
        backgroundColor: '#F16956',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
    },
});