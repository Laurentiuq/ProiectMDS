import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { IconButton, handleSettingsPress } from '../screens/HomeScreen';
import { debug } from 'console';


jest.mock('expo-image-picker');
jest.mock('@react-native-firebase/storage');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('@react-native-firebase/storage', () => 'storage');
jest.mock('firebase/compat/app');
jest.mock('firebase/compat/firestore');
jest.mock('@react-navigation/native');




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

    });

    test('settings button works', async () => {
        const { getByTestId } = render(<IconButton />);
        const settingsButton = getByTestId('settings-button');
        fireEvent.press(settingsButton);
        const consoleLogSpy = jest.spyOn(console, 'log');

    });

    test('handleSettingsPress works', async () => {
        navigation = { push: jest.fn() };
        handleSettingsPress(navigation);
        const consoleLogSpy = jest.spyOn(console, 'log');
        expect(consoleLogSpy).toHaveBeenCalledWith('Settings pushed');

    });

    // test('render headerRight', async () => {
    //   const mockNavigation = { push: jest.fn() };
    //   const mockProps = {
    //       route: { params: { db: {} } },
    //       navigation: mockNavigation,
    //   };

    //   const { getByTestId, rerender } = render(<HomeScreen  {...mockProps} navigation={mockNavigation} />);
    //   // rerender(<HomeScreen  {...mockProps} navigation={mockNavigation} />)
    //   // rerender(<HomeScreen  {...mockProps} navigation={mockNavigation} />)
    //   await waitFor(() => expect(getByTestId('header-right')).toBeTruthy(), { timeout: 10000 });
    // });

  });
