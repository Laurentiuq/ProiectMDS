
const ImagePicker = jest.mock('expo-image-picker', () => ({
    launchImageLibraryAsync: jest.fn(),
    requestMediaLibraryPermissionsAsync: jest.fn(),
    requestCameraRollPermissionsAsync: jest.fn(),
    MediaTypeOptions: jest.fn(),
}));

export default ImagePicker;