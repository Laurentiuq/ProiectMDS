
const imagePicker = jest.mock('expo-image-picker', () => ({
    launchImageLibraryAsync: jest.fn(),
    requestMediaLibraryPermissionsAsync: jest.fn(),
}));

export default imagePicker;