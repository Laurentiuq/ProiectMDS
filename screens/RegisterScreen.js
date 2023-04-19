import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import {auth} from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


export default function RegisterScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    // const firebase = require('firebase');
    const db = firebase.firestore();

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

            // Create a profile for the user
            const userRef = db.collection('users');
            console.log("ceva")
            const userDoc = userRef.doc(user.uid);
            userDoc.set({
                email: user.email,
                displayName: user.email.split('@')[0],
                points: 0,
                // photoURL: 'https://firebasestorage.googleapis.com/v0/b/fmi-quiz.appspot.com/o/avatars%2Fdefault.png?alt=media&token=2b2b0b0f-0b5a-4b0f-9b0f-2b2b0b0f0b5a',
                description: "Hi there!"
            }).then(() => {
                console.log('Profile created successfully');
            }).catch((error) => {
                console.log('Error creating profile', error);
            });



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
        <View style={styles.inputContainer} >
         <Text style={{fontSize: 14, color: 'rgb(249, 224, 221)', marginBottom: 5, fontWeight:'bold'}}>Introduce your email address:</Text>
            <TextInput 
                placeholder="Email"
                value = {email}
                // This is used to update the state of email so that when user types in email, it is updated in state
                onChangeText = {text => setEmail(text)}
                style={styles.input}
            />
          <Text style={{fontSize: 14, color: 'rgb(249, 224, 221)', marginTop: 5, marginBottom: 5, fontWeight:'bold'}}>Introduce your password:</Text>
            <TextInput
                placeholder="Password"
                value = {password}
                // This is used to update the state of password
                onChangeText = {text => setPassword(text)} 
                style={styles.input}
                secureTextEntry
            />
            <Text style={{fontSize: 10, color: 'rgb(225, 105, 86)', marginTop: 5, marginBottom: 10, fontWeight:'bold', textAlign: 'left'}}>Must contain at least 8 characters, one upper case, 
a numeric case and a special character.</Text> 
          <Text style={{fontSize: 14, color: 'rgb(249, 224, 221)', marginTop: 5, marginBottom: 5, fontWeight:'bold'}}>Confirm your password:</Text>
            <TextInput
                placeholder="Confirm Password"
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
        backgroundColor: 'rgb(227, 150, 150)'
    },
    inputContainer: {
        width: '80%',
        marginTop: 10,
        marginBottom: 10


    },

    input: {
        backgroundColor: 'rgb(249, 224, 221)',
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
        color : 'rgb(241, 105, 86)'

    },
    button: {
        backgroundColor: 'rgb(241, 105, 86)',
        width: '100%',
        padding: 15,
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
        color:'white',
        fontWeight: '800',
        fontSize: 16,
    },
    buttonOutlineText: {
        color:'white',
        fontWeight: '800',
        fontSize: 16,
    },
    
})