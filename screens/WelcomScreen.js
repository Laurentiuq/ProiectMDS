import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


export default function WelcomScreen() {

  const navigation = useNavigation(); 
  const goToLogin = () => {
    navigation.navigate('Login');
    }
  return (
    // <View style = {styles.container}>
        <ImageBackground source={require("../assets/mainBackground.png")} resizeMode="cover" style={styles.container}>
            <TouchableOpacity
            onPress = {goToLogin}
            style = {styles.toLogin}>
                <Image source = {require('../assets/AppLogo.png')}
                style = {styles.logo} />
                <Text>
                        <Text style = {styles.motto}>We quiz therfore we are</Text>
                </Text>
        </TouchableOpacity>
       </ImageBackground>
    // </View>
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
    logo : {
        // width: 155,
        // height: 136,
        // top: -20,
        left: -10,
    },
    // ca sa dam 100% peste tot sa putem apasa oriunde pentru login
    toLogin: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height  : '100%',
    },
    motto: {
        // position: absolute,
            flex: 1,
            color: '#FFFFFF',
            width: 185,
            height: 24,
            left: 138,
            top: 176,
            fontFamily: 'Nunito',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 16,
            // lineHeight: 150,
            alignItems: 'center',
            textAlign: 'center',
    }
    
})