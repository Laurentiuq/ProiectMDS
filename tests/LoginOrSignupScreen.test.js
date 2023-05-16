import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginOrSignupScreen from '../screens/LoginOrSignupScreen.js';





jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: jest.fn(() => ({ navigate: jest.fn(), replace: jest.fn() })),
    };
});

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(() => ({
      onAuthStateChanged: jest.fn(),
    })),
  };
});

describe('LoginOrSignupScreen', () => {
    it('renders correctly', () => {
        const { toJSON } = render(<LoginOrSignupScreen />);
        expect(toJSON()).toMatchSnapshot();
    });


    it('navigates to Login screen on button press', () => {
        const mockNavigation = { navigate: jest.fn(), replace: jest.fn() };
        jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue(mockNavigation);
        const { getByTestId } = render(<LoginOrSignupScreen />);
        fireEvent.press(getByTestId('login-button'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
    });



    it('navigates to Register screen on button press', () => {
        const mockNavigation = { navigate: jest.fn(), replace: jest.fn() };
        jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue(mockNavigation);
        const { getByTestId } = render(<LoginOrSignupScreen />);
        fireEvent.press(getByTestId('register-button'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Register');
    });
});
