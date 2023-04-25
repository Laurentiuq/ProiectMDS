import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import App from '../App';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('firebase/compat/app');
jest.mock('firebase/compat/firestore');



describe('App', () => {
  it('renders the welcome screen', () => {
    const { getByText } = render(<App />);
    expect(getByText('We quiz therfore we are')).toBeTruthy();
  });

//   it('navigates to LoginOrSignupScreen after the welcome screen', async () => {
//     const { findByText, getByTestId } = render(
//       <NavigationContainer>
//         <App />
//       </NavigationContainer>,
//     );

//     fireEvent.press(await findByText('Login'));
//     expect(await findByText('Sign up')).toBeTruthy();
//   });
});
