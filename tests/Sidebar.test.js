import Navbar from "../components/sidebar";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";
import {goToProfile, goToLeaderboard, goToHome} from "../components/sidebar";

import { shallow } from "enzyme";


jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");
jest.mock("@react-navigation/native")


describe("<Navbar />", () => {
    it("renders correctly", () => {
        const tree = renderer.create("<Navbar />").toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it("should render the Home, Profile, and Leaderboard buttons", () => {
        const { getByText } = render(<Navbar />);
        expect(getByText("Home")).not.toBeNull();
        expect(getByText("Profile")).not.toBeNull();
        expect(getByText("Leaderboard")).not.toBeNull();
    });

    test('goToProfile', () => {
        const navigation = { navigate: jest.fn() };
        goToProfile(navigation);
        expect(navigation.navigate).toHaveBeenCalledWith('Profile');
    });

    test('goToLeaderboard', () => {
        const navigation = { navigate: jest.fn() };
        goToLeaderboard(navigation);
        expect(navigation.navigate).toHaveBeenCalledWith('Leaderboard');
    });

    test('goToHome', () => {
        const navigation = { navigate: jest.fn() };
        goToHome(navigation);
        expect(navigation.navigate).toHaveBeenCalledWith('Home');
    });




    test('onPress', () => {
        const navigation = { navigate: jest.fn() };
        const wrapper = shallow(<Navbar />);
        wrapper.find('TouchableOpacity').at(0).props().onPress();
        wrapper.find('TouchableOpacity').at(1).props().onPress();
        wrapper.find('TouchableOpacity').at(2).props().onPress();

    });

});
