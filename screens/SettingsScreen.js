import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import  {  useState } from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
        navigation.replace('Login');
        console.log('Logged out');
    })
} 
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    containerDark: {
      backgroundColor: darkMode  ? '#F16956':'#F9E0DD' ,
  
    }, 
    textDark: {
      color: darkMode ? '#F9E0DD' : '#F16956',
    },
  
    header: {
      paddingTop: 60,
      paddingBottom: 20,
      paddingHorizontal: 20,
      backgroundColor: '#F16956',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
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
  
  });
  

  return (
    <ScrollView style={[styles.container, styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, styles.textDark]}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, styles.textDark]}>Account</Text>
        <View style={styles.option}>
          <Text style={[styles.optionText, styles.textDark]}>Edit Profile</Text>
          <Image source={{ uri: 'your_right_arrow_icon_uri' }} style={styles.arrowIcon} />
        </View>
        <View style={styles.option}>
          <Text style={[styles.optionText, styles.textDark]}>Change Password</Text>
          <Image source={{ uri: 'your_right_arrow_icon_uri' }} style={styles.arrowIcon} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, styles.textDark]}>App Settings</Text>
        <View style={styles.option}>
          <Text style={[styles.optionText, styles.textDark]}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, styles.textDark]}>Support</Text>
        <View style={styles.option}>
          <Text style={[styles.optionText, styles.textDark]}>FAQs</Text>
          <Image source={{ uri: 'your_right_arrow_icon_uri' }} style={styles.arrowIcon} />
        </View>
        <View style={styles.option}>
          <Text style={[styles.optionText, styles.textDark]}>Contact Us</Text>
          <Image source={{ uri: 'your_right_arrow_icon_uri' }} style={styles.arrowIcon} />
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>

        <Text style={[styles.logoutButtonText]}>Logout</Text> 

        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}



