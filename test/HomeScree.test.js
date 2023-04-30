import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { Text, useAnimatedValue } from 'react-native';
import { IconButton, handleSettingsPress } from '../screens/HomeScreen';
import { debug } from 'console';
import { handleLogout } from '../screens/HomeScreen';
import { Icon } from 'react-native-vector-icons/MaterialIcons';

jest.mock('firebase/compat/app');
jest.mock('firebase/compat/firestore');
// Mock the Icon component
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: () => {
            return {
                navigate: jest.fn(),
                setOptions: jest.fn(),
            };
        }

    };
});

jest.mock('firebase/auth', () => {
    return {
        getAuth: () => {
            return {
                currentUser: {
                    uid: '12345',
                },
                signOut: () =>{
                    return Promise.resolve();
                }
            };
        },
        
    };
});




describe('HomeScreen', () => {
    it('renders correctly with props', () => {
      const db = {
       
      };
      const { getByText } = render(
        <HomeScreen
          route={{ params: { db: db } }}
          navigation={{ navigate: jest.fn() }}
        />
      );
      const someText = getByText('Nume:');
      expect(someText).toBeTruthy();
    });

    test('navigates to CreateQuiz', async () => {
        const mockNavigation = { push: jest.fn() };
        const mockProps = {
            route: { params: { db: {} } },
            navigation: mockNavigation,
        };
        const { getByTestId } = render(<HomeScreen  {...mockProps} navigation={mockNavigation} />);

        debug();
        const createQuizButton = getByTestId('create-quiz-button');
        fireEvent.press(createQuizButton);
      });
    
    test('logout button works', async () => {
        const mockNavigation = { push: jest.fn() };
        const mockProps = {
            route: { params: { db: {} } },
            navigation: mockNavigation,
        };
        const { getByTestId } = render(<HomeScreen  {...mockProps} navigation={mockNavigation} />);
        const logoutButton = getByTestId('logout-button');
        fireEvent.press(logoutButton);
        const consoleLogSpy = jest.spyOn(console, 'log');
        // handleLogout();
        // expect(handleLogout).toHaveBeenCalled();
    });

    test('settings button works', async () => {
        const { getByTestId } = render(<IconButton />);
        const settingsButton = getByTestId('settings-button');
        fireEvent.press(settingsButton);
        const consoleLogSpy = jest.spyOn(console, 'log');
        // handleSettingsPress();
        // expect(handleSettingsPress).toHaveBeenCalled();
    });

    test('handleSettingsPress works', async () => {
        navigation = { push: jest.fn() };
        handleSettingsPress();
        const consoleLogSpy = jest.spyOn(console, 'log');
        expect(consoleLogSpy).toHaveBeenCalledWith('Settings pushed');

    });

  });
