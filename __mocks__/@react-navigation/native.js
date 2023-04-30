const navigation = jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: () => {
            return {
                navigate: jest.fn(),
                setOptions: jest.fn(),
            };
        }

    };
});

const useNavigation = () => {
    return {
        navigate: jest.fn(),
        setOptions: jest.fn(),
    };
}

export { useNavigation };
export default navigation;