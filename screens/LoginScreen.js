import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import auth from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    // get the navigation object from useNavigation hook
    const navigation = useNavigation();


    // Redirect to HomeScreen if user logged in
    useEffect(() => {
        const auth = getAuth();
        const unsubcribe = 
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace('Home');
            }
        })
        return unsubcribe;
    }, [])


    // This is used in onpress event of signup button
    const handleSignUp = () => {
        const auth = getAuth();
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

    // GO to register screen when press register button
    const goToRegister = () => {
        navigation.navigate('Register');
    }



    // This is used in onpress event of login button
    const handleLogin = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Logged in with', user.email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
    const handlePaswordReset = () => {
        navigation.navigate('ForgotPassword');
    }

    const handlePasswordReset2 = () => {
        const auth = getAuth();
        auth.sendPasswordResetEmail(email)
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
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress = {handleLogin}
          style = {styles.button}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress = {goToRegister}
          style = {[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress = {handlePaswordReset}
          style = {[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Forgot password</Text>
        </TouchableOpacity>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(227, 150, 150)'
    },
    inputContainer: {
        width: '80%'
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
        marginTop: 20,

    },
    button: {
        backgroundColor: 'rgb(241, 105, 86)',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
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
        color:'rgb(241, 105, 86)',
        fontWeight: '800',
        fontSize: 16,
    },
    
})