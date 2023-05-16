import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen'
;
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('firebase/auth', () => {
    return {
        getAuth: jest.fn(() => ({
            onAuthStateChanged: jest.fn(),
        })),
        signInWithEmailAndPassword: jest.fn(() => Promise.resolve('user')),
    };
});

describe('LoginScreen', () => {
    it('renders correctly', () => {
        const { toJSON } = render(<LoginScreen />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('allows entering an email', () => {
        const { getByPlaceholderText } = render(<LoginScreen />);
        const input = getByPlaceholderText('Introduce your email');
        fireEvent.changeText(input, 'test@test.com');
        expect(input.props.value).toBe('test@test.com');
    });

    it('allows entering a password', () => {
        const { getByPlaceholderText } = render(<LoginScreen />);
        const input = getByPlaceholderText('Introduce your password');
        fireEvent.changeText(input, 'password123');
        expect(input.props.value).toBe('password123');
    });

    it('shows error for invalid email', async () => {
        const { getByPlaceholderText, getByText } = render(<LoginScreen />);
        const input = getByPlaceholderText('Introduce your email');
        fireEvent.changeText(input, 'test');


        fireEvent.press(getByText('Login'));
        await waitFor(() => {
            expect(getByText('Please enter a valid email address')).toBeDefined();
        });
    });

    it('shows error for invalid password', async () => {
        const { getByPlaceholderText, findByText, getByTestId } = render(<LoginScreen />);
        const emailInput = getByPlaceholderText('Introduce your email');
        fireEvent.changeText(emailInput, 'example@example.com');


        const input = getByPlaceholderText('Introduce your password');
        fireEvent.changeText(input, 'pass');

        fireEvent.press(getByTestId('loginButton'));
        const errorMessage = await findByText('Password must be at least 8 characters');
        expect(errorMessage).toBeDefined();
    });

    it('toggles password visibility', () => {
        const { getByText, getByPlaceholderText } = render(<LoginScreen />);
        const input = getByPlaceholderText('Introduce your password');
        expect(input.props.secureTextEntry).toBe(true);
        fireEvent.press(getByText('Show'));
        expect(input.props.secureTextEntry).toBe(false);
    });

    // it('navigates to ForgotPassword on button press', () => {
    //     const mockNavigation = jest.fn();
    //     const { getByText } = render(<LoginScreen navigation={{ navigate: mockNavigation }} />);
    //     fireEvent.press(getByText('Forgot password'));
    //     expect(mockNavigation).toHaveBeenCalledWith('ForgotPassword');
    // });
});

// npm test -- -u 