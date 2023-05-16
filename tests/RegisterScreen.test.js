import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import RegisterScreen from '../screens/RegisterScreen';
import { createUserWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({
      user: {
        email: 'test@example.com',
        uid: '123',
      },
    })),
  };
});

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

describe('RegisterScreen', () => {
  const navigation = { navigate: jest.fn() };
  useNavigation.mockImplementation(() => navigation);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<RegisterScreen />);

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
  });

  it('updates state on email input', () => {
    const { getByPlaceholderText } = render(<RegisterScreen />);
    const emailInput = getByPlaceholderText('Email');

    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('updates state on password input', () => {
    const { getByPlaceholderText } = render(<RegisterScreen />);
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(passwordInput, 'password123');

    expect(passwordInput.props.value).toBe('password123');
  });

  it('updates state on confirm password input', () => {
    const { getByPlaceholderText } = render(<RegisterScreen />);
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.changeText(confirmPasswordInput, 'password123');

    expect(confirmPasswordInput.props.value).toBe('password123');
  });

  it('shows alert when passwords do not match', () => {
    const mockedAlert = jest.fn();
    global.alert = mockedAlert;
  
    const { getByPlaceholderText, getByText } = render(<RegisterScreen />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'test@example.com');
  
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
  
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password321');
    fireEvent.press(getByText('Register')); 
  
    expect(mockedAlert).toHaveBeenCalledWith("Passwords don't match.");
  });

  it('calls handleSignUp function when button is pressed', async () => {
    const { getByText, getByPlaceholderText } = render(<RegisterScreen />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const button = getByText('Register');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');
    fireEvent.press(button);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
});
