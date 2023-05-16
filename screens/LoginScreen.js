import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword, } from 'firebase/auth'

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);


    // get the navigation object from useNavigation hook
    const navigation = useNavigation();



    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleLogin = () => {
        let isValid = true;


        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return isValid = false;
        } else {
            setEmailError('');
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters');
            return isValid = false;

        } else {
            setPasswordError('');
        }
        setLoading(true);

        if (isValid) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('Logged in with', user.email);
                    setLoading(false);

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    setLoading(false);

                });

            console.log('Login ok');
        }
    };

    // Redirect to HomeScreen if user logged in
    useEffect(() => {
        const auth = getAuth();
        const unsubcribe =
            auth.onAuthStateChanged((user) => {
                if (user) {
                    // navigation.reset();
                    while (navigation.canGoBack())
                        navigation.pop();
                    navigation.replace('Home');
                }
            })
        return unsubcribe;
    }, [])


    const handlePaswordReset = () => {
        navigation.navigate('ForgotPassword');
    }

    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    return (
        <View style={styles.container}>
            {/* <ImageBackground
                source={require("../assets/mainBackground.png")}
                style={styles.imageBackground}> */}
            <Text style={styles.fmiQuiz}>FMIQUIZ</Text>

            <Text style={styles.title}>Email Address</Text>
            <View style={styles.inputContainer}>
                <Image source={require("../assets/email.png")} style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder="Introduce your email"
                />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <View style={{ height: 24 }} />

            <Text style={styles.title}>Password</Text>
            <View style={styles.inputContainer}>
                <Image source={require("../assets/password.png")} style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={secureTextEntry}
                    textContentType="password"
                    placeholder="Introduce your password"
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.showPasswordButton}>
                    <Text>{secureTextEntry ? 'Show' : 'Hide'}</Text>
                </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <View style={{ height: 24 }} />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading} testID="loginButton">
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                )}
            </TouchableOpacity>
            <View style={{ height: 24 }} />
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={handlePaswordReset} >
                    <Text style={{ color: 'white', textDecorationLine: 'underline' }}>Forgot password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E39696',
        justifyContent: 'center',
        paddingHorizontal: 20,

    },
    // imageBackground: {
    //     flex: 1,
    //     paddingHorizontal: 20,
    //     paddingTop: 60,
    //     justifyContent: 'center',
    //     backgroundColor:'#E39696'
    // },
    fmiQuiz: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9E0DD',
        borderRadius: 20,
    },
    inputIcon: {
        width: 24,
        height: 24,
        marginLeft: 32,
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        color: '#F16956',
        // textShadowColor: 'green',
    },
    showPasswordButton: {
        padding: 10,
        paddingEnd: 20,
    },
    loginButton: {
        backgroundColor: '#F16956',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        margin: 10,
    },
});
