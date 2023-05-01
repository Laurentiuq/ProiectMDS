import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import { debug } from 'console';
import { shallow } from 'enzyme';
import SettingsScreen from '../screens/SettingsScreen';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { handleIconPress } from '../screens/SettingsScreen';
import { useAnimatedValue } from 'react-native';
import { useNavigation } from '@react-navigation/native';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('expo-image-picker');
jest.mock('@react-native-firebase/storage');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('@react-native-firebase/storage', () => 'storage');
jest.mock('firebase/compat/app');
jest.mock('firebase/compat/firestore');
jest.mock('@react-navigation/native');


describe('SettingsScreen', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<SettingsScreen />);
    });

    it('renders a ScrollView component', () => {
        expect(wrapper.find('ScrollView')).toHaveLength(1);
    })

    it('renders a TileItem component for updating account details', () => {
        console.log(wrapper.find('TileItem').at(0).props());
        expect(wrapper.find('TileItem').at(0).props().mainText).toEqual('Update account details');
        expect(wrapper.find('TileItem').at(0).props().subtitle).toEqual('Username, Location etc');
        // expect(wrapper.find('TileItem').at(0).props().iconName).toEqual(require('../assets/arrowRight.png'));
        expect(wrapper.find('TileItem').at(0).props().onIconPress).toBeDefined();

    })

    it('renders a TileItem component for changing login details', () => {
        expect(wrapper.find('TileItem').at(1).prop('mainText')).toEqual('Change login details');
        expect(wrapper.find('TileItem').at(1).prop('subtitle')).toEqual('Email, password');
        expect(wrapper.find('TileItem').at(1).prop('onIconPress')).toBeDefined();

    })

    it('renders a TileItem component for changing quiz details', () => {
        expect(wrapper.find('TileItem').at(2).prop('mainText')).toEqual('Change quiz details');
        expect(wrapper.find('TileItem').at(2).prop('subtitle')).toEqual('Easy, medium, hard');
        expect(wrapper.find('TileItem').at(2).prop('onIconPress')).toBeDefined();
    })

    // const naviagtion = {
    //     navigate: jest.fn()
    // }
    const navigation = {
        push: jest.fn(),
        navigate: jest.fn()
    }

    it('handleIconPress function is called when icon is pressed', () => {
        handleIconPress('Profile', navigation);
        expect(navigation.push).toHaveBeenCalled();
        handleIconPress('UpdateLogin', navigation);
        expect(navigation.push).toHaveBeenCalled();
        handleIconPress('QuizSettings', navigation);
        // expect(naviagtion.navigate).toHaveBeenCalled();
    })

    it('logs the correct message to the console', () => {
        const spy = jest.spyOn(console, 'log');
        handleIconPress('Profile', navigation);
        expect(spy).toHaveBeenCalledWith('Icon pressed on Profile');
        handleIconPress('UpdateLogin', navigation);
        expect(spy).toHaveBeenCalledWith('Icon pressed on UpdateLogin');
        handleIconPress('QuizSettings', navigation);
        expect(spy).toHaveBeenCalledWith('Icon pressed on QuizSettings');
    })

    it('onIconPress works', () => {
        const tileItem = wrapper.find('TileItem').at(0);
        tileItem.props().onIconPress(navigation);
        expect(navigation.push).toHaveBeenCalled();
        const tileItem2 = wrapper.find('TileItem').at(1);
        tileItem2.props().onIconPress(navigation);
        expect(navigation.push).toHaveBeenCalled();
        const tileItem3 = wrapper.find('TileItem').at(2);
        tileItem3.props().onIconPress(navigation);
        expect(navigation.push).toHaveBeenCalled();

      });

})