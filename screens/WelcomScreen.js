import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


export default function WelcomScreen() {
    const navigation = useNavigation()
    const goToLogin = () => {
        setTimeout(() => {
            navigation.replace('LoginOrSignupScreen');
        }, 2500)
    }
    goToLogin()

    return (
        <ImageBackground source={require("../assets/mainBackground.png")} resizeMode="cover" style={styles.container}>
            <Image source={require('../assets/AppLogo.png')}
                style={styles.logo} />
            <Text>
                <Text>We quiz therfore we are</Text>
            </Text>
            <View height={16} />
            <ActivityIndicator testID="activity-indicator" size="large" color={styles.loader.color} />
        </ImageBackground>
    )
}

// export default WelcomScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        // backgroundColor: '#F16956',
    },
    logo: {
        // width: 155,
        // height: 136,
        // top: -20,
        left: -10,
    },
    loader: {
        color: '#FFFFFF'
    },
    // ca sa dam 100% peste tot sa putem apasa oriunde pentru login
    toLogin: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },

})