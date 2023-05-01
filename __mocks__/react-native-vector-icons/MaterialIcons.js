import { exp } from "react-native/Libraries/Animated/Easing";

const imagePicker = jest.mock('expo-image-picker', () => ({
    launchImageLibraryAsync: jest.fn(),
    requestMediaLibraryPermissionsAsync: jest.fn(),
}));

const Icon = jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

export { imagePicker, Icon} 