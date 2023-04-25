// import React from 'react';
// import { render, waitFor } from '@testing-library/react-native';
// import WelcomeScreen from '../screens/WelcomScreen';
// import { useNavigation } from '@react-navigation/native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import firebase from 'firebase/compat';

// const Stack = createNativeStackNavigator();

// const db = firebase.firestore();

// // export default function App() {

// // }

 

// jest.mock('@react-navigation/native', () => ({
//   useNavigation: jest.fn(),
// }));

// describe('WelcomeScreen', () => {
//   it('renders the welcome screen', () => {
//     const { getByText, getByTestId } = render(<WelcomeScreen />);

//     expect(getByText('We quiz therfore we are')).toBeTruthy();
//     expect(getByTestId('activity-indicator')).toBeTruthy();
//   });

//   it('navigates to LoginOrSignupScreen after 2.5 seconds', async () => {
//     const navigation = { replace: jest.fn() };
//     useNavigation.mockReturnValue(navigation);

//     render (
//       <NavigationContainer >
//         <Stack.Navigator>
          
//           <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
 
//     await waitFor(() => expect(navigation.replace).toHaveBeenCalledWith('LoginOrSignupScreen'), {
//       timeout: 3000,
//     });
//   });
// });
