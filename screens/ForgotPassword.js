import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import auth from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { sendCustomPasswordResetEmail} from 'firebase/auth'
import { sendPasswordResetEmail } from 'firebase/auth'

export default function LoginScreen() {
    const [email, setEmail] = useState('')


    // get the navigation object from useNavigation hook
    const navigation = useNavigation();

    const actionCodeSettings = {
        url: 'https://github.com/senisioi/computer-networks',
        handleCodeInApp: true,
        iOS: {
            bundleId: 'ttps://github.com/senisioi/computer-networks.ios'
        },
        android: {
            packageName: 'https://github.com/senisioi/computer-networks',
            installApp: true,
            minimumVersion: '12'
        },
        dynamicLinkDomain: 'https://github.com/senisioi/computer-networks'
    };

  
    const handlePasswordReset2 = () => {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('Password reset email sent');
        }
        )
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
    <Text style={{fontSize: 14, color: 'rgb(249, 224, 221)', marginBottom: 5, fontWeight:'bold'}}>Introduce your email address:</Text>
        <TextInput
            placeholder="Email"
            value = {email}
            // This is used to update the state of email so that when user types in email, it is updated in state
            onChangeText = {text => setEmail(text)}
            style={styles.input}
        />
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress = {handlePasswordReset2}
          style = {styles.button}>
            <Text style={styles.buttonText}>Send resetation link</Text>
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
        color : 'rgb(241, 105, 86)'
    },
    input: {
        backgroundColor: 'rgb(249, 224, 221)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop:5
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItmes: 'center',
        marginTop: 40,
       

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
        textAlign: 'center'
    },
    buttonOutlineText: {
        color:'white',
        fontWeight: '800',
        fontSize: 16,
    },
    
})