import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';

import WelcomeScreen from '../screens/WelcomScreen';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: jest.fn(),
        replace: jest.fn(),
    }),
}));

describe('WelcomeScreen', () => {
    it('renders correctly', () => {
        const { toJSON } = render(<WelcomeScreen />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('shows ActivityIndicator', () => {
        const { getByTestId } = render(<WelcomeScreen />);
        expect(getByTestId('activity-indicator')).toBeTruthy();
    });

    it('navigates to LoginOrSignupScreen after timeout', () => {
        const mockNavigation = { navigate: jest.fn(), replace: jest.fn() };
        jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue(mockNavigation);
        jest.spyOn(global, 'setTimeout').mockImplementation((cb) => cb());
        render(<WelcomeScreen />);
        expect(mockNavigation.replace).toHaveBeenCalledWith('LoginOrSignupScreen');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
