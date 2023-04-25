import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import TileItem from './components/TileItem.js';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };



  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () =>
  //       <View style={{ flex: 1, alignItems: 'flex-end' }}>
  //         <Text style={styles.title}>Account Settings</Text>
  //       </View>,
  //   });
  // }, [navigation]);

  const handleIconPress = (item) => {
    navigation.push(item)
    console.log(`Icon pressed on ${item}`);
  };
  return (
    <ScrollView style={styles.container}>

      <View style={styles.container2}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.title}>Account Settings</Text>
        <TileItem
          mainText="Update account details"
          subtitle="Username, Location etc"
          iconImage={require('../assets/arrowRight.png')}
          onIconPress={() => handleIconPress('Profile')}
        />
        <TileItem
          mainText="Change login details"
          subtitle="Email, password"
          iconImage={require('../assets/arrowRight.png')}
          onIconPress={() => handleIconPress('UpdateLogin')}
        />
        <Text style={styles.title}>Others</Text>
        <TileItem
          mainText="Change quiz details"
          subtitle="Easy, medium, hard"
          iconImage={require('../assets/arrowRight.png')}
          onIconPress={() => handleIconPress('QuizSettings')}
        />
        <TileItem
          mainText="FAQ"
          subtitle="Frequently asked questions"
          iconImage={require('../assets/arrowRight.png')}
          onIconPress={() => handleIconPress('FAQ')}
        />
      </View>

      {/* <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Edit Profile</Text>
          <Image source={{ uri: 'your_right_arrow_icon_uri' }} style={styles.arrowIcon} />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Change Password</Text>
          <Image source={{ uri: 'your_right_arrow_icon_uri' }} style={styles.arrowIcon} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: '#E5E5E5', true: '#F16956' }}
            thumbColor={darkMode ? '#FFFFFF' : '#F2F2F2'}
            onValueChange={toggleDarkMode}
            value={darkMode}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.option}>
          <Text style={styles.optionText}>FAQs</Text>
          <Image source={{ uri: 'your_right_arrow_icon_uri' }} style={styles.arrowIcon} />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Contact Us</Text>
          <Image source={{ uri: 'your_right_arrow_icon_uri' }} style={styles.arrowIcon} />
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View> */}
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