const navigation = jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: () => {
            return {
                navigate: jest.fn(),
                setOptions: jest.fn(),
            };
        },
        push: () => jest.fn(),

    };
});

const useNavigation = () => {
    return {
        navigate: jest.fn(),
        setOptions: jest.fn(),
    };
}

const push = () => jest.fn();
export { useNavigation, push };
export default navigation;