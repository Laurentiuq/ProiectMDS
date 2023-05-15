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
import LoginOrSignupScreen from './screens/LoginOrSignupScreen';
import SettingsScreen from './screens/SettingsScreen';
import CreateScreen from './screens/CreateScreen';
import JoinQuizScreen from './screens/JoinQuizScreen';
import firebase from 'firebase/compat';
import 'firebase/compat/firestore';
import TakeQuizScreen from './screens/TakeQuizScreen';

const Stack = createNativeStackNavigator();
const db = firebase.firestore();

export default function App() {

  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomScreen} />
        <Stack.Screen options={{ headerShown: false }} name="LoginOrSignupScreen" component={LoginOrSignupScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: '', headerShadowVisible: false, headerStyle: { backgroundColor: 'rgb(241, 105, 86)' }, headerTintColor: 'rgb(249, 224, 221)' }} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{ db: db }} options={{ headerStyle: { backgroundColor: 'rgb(241, 105, 86)' }, headerTintColor: 'rgb(249, 224, 221)' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerStyle: { backgroundColor: 'rgb(241, 105, 86)' }, headerTintColor: 'rgb(249, 224, 221)' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} initialParams={{ db: db }} options={{ headerShadowVisible: false, headerStyle: { backgroundColor: 'rgb(241, 105, 86)' }, headerTintColor: 'rgb(249, 224, 221)' }} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} initialParams={{ db: db }} options={{ headerStyle: { backgroundColor: 'rgb(241, 105, 86)' }, headerTintColor: 'rgb(249, 224, 221)' }} />
        <Stack.Screen name="CreateQuiz" component={CreateScreen} initialParams={{ db: db }} options={{ headerStyle: { backgroundColor: 'rgb(241, 105, 86)' }, headerTintColor: 'rgb(249, 224, 221)' }} />
        <Stack.Screen name="JoinQuiz" component={JoinQuizScreen} initialParams={{ db: db }} options={{ headerStyle: { backgroundColor: 'rgb(241, 105, 86)' }, headerTintColor: 'rgb(249, 224, 221)' }} />
        <Stack.Screen name="TakeQuiz" component={TakeQuizScreen} initialParams={{ db: db }} options={{ headerStyle: { backgroundColor: 'rgb(241, 105, 86)' }, headerTintColor: 'rgb(249, 224, 221)' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// npm install --legacy-peer-deps