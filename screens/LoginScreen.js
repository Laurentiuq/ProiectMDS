import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from 'firebase/auth'
// export default function LoginScreen() {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')


//     // get the navigation object from useNavigation hook
//     const navigation = useNavigation();


//     // Redirect to HomeScreen if user logged in
//     useEffect(() => {
//         const auth = getAuth();
//         const unsubcribe =
//             auth.onAuthStateChanged((user) => {
//                 if (user) {
//                     navigation.replace('Home');
//                 }
//             })
//         return unsubcribe;
//     }, [])


//     // This is used in onpress event of signup button
//     const handleSignUp = () => {
//         const auth = getAuth();
//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 console.log('Registered with', user.email);
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.log(errorCode, errorMessage);
//             });
//     }

//     // GO to register screen when press register button
//     const goToRegister = () => {
//         navigation.navigate('Register');
//     }



//     // This is used in onpress event of login button
//     const handleLogin = () => {
//         const auth = getAuth();
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 console.log('Logged in with', user.email);
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.log(errorCode, errorMessage);
//             });
//     }
//     const handlePaswordReset = () => {
//         navigation.navigate('ForgotPassword');
//     }

//     const handlePasswordReset2 = () => {
//         const auth = getAuth();
//         auth.sendPasswordResetEmail(email)
//             .then(() => {
//                 console.log('Password reset email sent');
//             }
//             )
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.log(errorCode, errorMessage);
//             });
//     }

//     return (
//         <View
//             style={styles.container}
//             behavior="padding">
//             <ImageBackground source={require("../assets/mainBackground.png")}  style={styles.container}>
//             <Image source={require('../assets/AppLogo.png')}
//                 style={styles.logo} />
//                 <View style={{height:16}}/>
//                 <View style={styles.inputContainer}>

//                     <TextInput
//                         placeholder="Email"
//                         value={email}
//                         // This is used to update the state of email so that when user types in email, it is updated in state
//                         onChangeText={text => setEmail(text)}
//                         style={styles.input}
//                     />
//                     <TextInput
//                         placeholder="Pasword"
//                         value={password}
//                         // This is used to update the state of password
//                         onChangeText={text => setPassword(text)}
//                         style={styles.input}
//                         secureTextEntry
//                     />
//                 </View>
//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity
//                         onPress={handleLogin}
//                         style={styles.button}>
//                         <Text style={styles.buttonText}>Login</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity
//                         onPress={goToRegister}
//                         style={[styles.button, styles.buttonOutline]}>
//                         <Text style={styles.buttonOutlineText}>Register</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity
//                         onPress={handlePaswordReset}
//                         style={[styles.button, styles.buttonOutline]}>
//                         <Text style={styles.buttonOutlineText}>Forgot password</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ImageBackground>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100%',
//         width: '100%',

//         backgroundColor: 'transparent'
//     },
//     inputContainer: {
//         width: '80%'
//     },
//     input: {
//         backgroundColor: 'rgb(249, 224, 221)',
//         paddingHorizontal: 15,
//         paddingVertical: 10,
//         borderRadius: 10,
//         marginTop: 5
//     },
//     buttonContainer: {
//         width: '60%',
//         justifyContent: 'center',
//         alignItmes: 'center',
//         marginTop: 20,

//     },
//     button: {
//         backgroundColor: 'rgb(241, 105, 86)',
//         width: '100%',
//         padding: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     buttonOutline: {
//         backgroundColor: 'white',
//         marginTop: 5,
//         borderColor: 'rgb(241, 105, 86)',
//         borderWidth: 2,
//     },
//     buttonText: {
//         color: 'white',
//         fontWeight: '800',
//         fontSize: 16,
//     },
//     buttonOutlineText: {
//         color: 'rgb(241, 105, 86)',
//         fontWeight: '800',
//         fontSize: 16,
//     },
//     logo: {
//         width: 92,
//         height: 92,
//         // top: -20,
//         // left: -10,
//         // justifyContent: 'center',
//         // alignItems: 'center',
//     },
// })
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';

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
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
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
