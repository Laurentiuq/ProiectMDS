import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';
// import Sidebar from '../components/Sidebar.js';
import Sidebar from '../components/sidebar.js';

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
    <>
    <View style = {styles.container}>
    <Sidebar />
    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

    <View style = {styles.inputContainer}>

      <Text style = {{color:'rgb(225, 105, 86)'}}>Nume:{getAuth().currentUser?.displayName}</Text>
    
      <Text style = {{color:'rgb(225, 105, 86)', fontWeight: 'bold', textAlign:'left'}}>What do you want to do?</Text>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
       onPress = {() => {}}
        style = {[styles.button, styles.buttonOutline]}>
        <Text style={styles.buttonOutlineText}>Join a quiz</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress = {() => {}}
        style = {[styles.button, styles.buttonOutline]}>
        <Text style={styles.buttonOutlineText}>Create a quiz</Text>
        </TouchableOpacity>
      
      <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress = {handleLogout}
        style = {[styles.button, styles.buttonOutline]}>
        <Text style={styles.buttonOutlineText}>Logout</Text>
        </TouchableOpacity>
      
     </View>
     </View>
   </View>
   </View>
   </View>
   </>
   
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(225, 105, 86)',
    flex : 1
  },

  inputContainer: {
    width: '90%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgb(249, 224, 221)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

  },

  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,

},
button: {
    backgroundColor: 'rgb(249, 224, 221)',
    width: '90%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
},
buttonOutline: {
    backgroundColor: 'rgb(241, 105, 86)',
    marginTop: 5,
    borderColor: 'rgb(241, 105, 86)',
    borderWidth: 2,
},
buttonText:  {
    color:'rgb(249, 224, 221)',
    fontWeight: '800',
    fontSize: 16,
},
buttonOutlineText: {
    color:'rgb(249, 224, 221)',
    fontWeight: '800',
    fontSize: 16,
},


})