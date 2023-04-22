import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import  {  useState } from 'react'

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
