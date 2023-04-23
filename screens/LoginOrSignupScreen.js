import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth'
export default function LoginOrSignupScreen() {

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

    // GO to register screen when press register button
    const goToRegister = () => {
        navigation.navigate('Register');
    }

    // Go to Login screen when press register button
    const goToLogin = () => {
        navigation.navigate('Login');

    }
    return (
        <View
            style={styles.container}
            behavior="padding">

            <ImageBackground source={require("../assets/mainBackground.png")} style={styles.imageBackground}>

                <View style={styles.images}>
                    <Image source={require('../assets/AppLogo.png')} style={styles.logo} />
                    <View style={{ height: 16 }} />
                    <Image source={require('../assets/persons.png')} style={styles.persons} resizeMode="center" />
                    <View style={{ height: 32 }} />
                    <View style={{ height: 32 }} />
                </View>
                <View style={{ height: 64 }} />
                <View style={styles.squareShape}>
                    <View style={styles.buttonContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                            Login or Sign Up</Text>
                        <View style={{ height: 8 }} />
                        <Text style={{ fontWeight: '300', fontSize: 14, textAlign: 'center' }}>
                            Login or create an account to take quiz, take part in challenge, and more.</Text>
                    </View>
                    <View style={{ height: 16 }} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={goToLogin}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={goToRegister}
                            style={[styles.button, styles.buttonOutline]}>
                            <Text style={styles.buttonOutlineText}>Create an account</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    images: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    squareShape: {
        borderRadius: 20,
        padding: 20,
        width: '80%',
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: 'white'

    },

    buttonContainer: {
        width: '100%',
        alignContent: 'center',
        marginTop: 20,

    },

    button: {
        backgroundColor: '#F16956',
        width: '100%',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: '#E6E6E6',
        marginTop: 5,
        // borderColor: 'rgb(241, 105, 86)',
        // borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: 'rgb(241, 105, 86)',
        fontWeight: '800',
        fontSize: 16,
    },
    logo: {
        width: 92,
        height: 92,
  
    },
    persons: {
        height: 92,
 
    },


})