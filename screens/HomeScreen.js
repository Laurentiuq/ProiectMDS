import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {

    const navigation = useNavigation();
    const handleLogout = () => {
        const auth = getAuth();
        auth.signOut().then(() => {
            navigation.replace('Login');
            console.log('Logged out');
        })
    } 

  return (
    <View>
      <Text>Email: {getAuth().currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleLogout} >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})