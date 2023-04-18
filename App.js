import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import WelcomScreen from './screens/WelcomScreen';
import ForgotPassword from './screens/ForgotPassword';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen.js';
import LeaderboardScreen from './screens/LeaderboardScreen';
import firebase from 'firebase/compat';
import 'firebase/compat/firestore';

const Stack = createNativeStackNavigator();
const db = firebase.firestore();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options = {{headerShown: false }} name="Welcome" component={WelcomScreen} />
        <Stack.Screen options = {{headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options = {{headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Profile" component={ProfileScreen} initialParams={{db:db}}/>
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} initialParams={{db:db}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
