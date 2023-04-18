import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import auth from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'



export default function RegisterScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    // This is used in onpress event of signup button
    const handleSignUp = () => {
        const auth = getAuth();
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Registered with', user.email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

  return (
    <View
        style={styles.container}
        behavior="padding">
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Email"
                value = {email}
                // This is used to update the state of email so that when user types in email, it is updated in state
                onChangeText = {text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Pasword"
                value = {password}
                // This is used to update the state of password
                onChangeText = {text => setPassword(text)} 
                style={styles.input}
                secureTextEntry
            />
            <TextInput
                placeholder="Confirm Pasword"
                value = {confirmPassword}
                // This is used to update the state of password
                onChangeText = {text => setConfirmPassword(text)}
                style={styles.input}
                secureTextEntry
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress = {handleSignUp}
                style = {[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}






const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop:5
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItmes: 'center',
        marginTop: 40,

    },
    button: {
        backgroundColor: '#2C6BED',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#2C6BED',
        borderWidth: 2,
    },
    buttonText:  {
        color:'white',
        fontWeight: '800',
        fontSize: 16,
    },
    buttonOutlineText: {
        color:'#2C6BED',
        fontWeight: '800',
        fontSize: 16,
    },
    
})