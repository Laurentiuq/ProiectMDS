import React from 'react';
import { shallow } from 'enzyme';
import SettingsScreen from '../SettingsScreen';
import TileItem from '../components/TileItem';
import { handleIconPress } from '../screens/SettingsScreen';

describe('SettingsScreen', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SettingsScreen />);
  });

  it('renders a ScrollView component', () => {
    expect(wrapper.find('ScrollView')).toHaveLength(1);
  });

  it('renders a TileItem component for updating account details', () => {
    expect(wrapper.find(TileItem).at(0).prop('mainText')).toEqual('Update account details');
    expect(wrapper.find(TileItem).at(0).prop('subtitle')).toEqual('Username, Location etc');
    expect(wrapper.find(TileItem).at(0).prop('iconImage')).toEqual(require('../assets/arrowRight.png'));
    expect(wrapper.find(TileItem).at(0).prop('onIconPress')).toBeDefined();
  });

  it('renders a TileItem component for changing login details', () => {
    expect(wrapper.find(TileItem).at(1).prop('mainText')).toEqual('Change login details');
    expect(wrapper.find(TileItem).at(1).prop('subtitle')).toEqual('Email, password');
    expect(wrapper.find(TileItem).at(1).prop('iconImage')).toEqual(require('../assets/arrowRight.png'));
    expect(wrapper.find(TileItem).at(1).prop('onIconPress')).toBeDefined();
  });

  it('renders a TileItem component for changing quiz details', () => {
    expect(wrapper.find(TileItem).at(2).prop('mainText')).toEqual('Change quiz details');
    expect(wrapper.find(TileItem).at(2).prop('subtitle')).toEqual('Easy, medium, hard');
    expect(wrapper.find(TileItem).at(2).prop('iconImage')).toEqual(require('../assets/arrowRight.png'));
    expect(wrapper.find(TileItem).at(2).prop('onIconPress')).toBeDefined();
  });

  it('renders a TileItem component for displaying the FAQ', () => {
    expect(wrapper.find(TileItem).at(3).prop('mainText')).toEqual('FAQ');
    expect(wrapper.find(TileItem).at(3).prop('subtitle')).toEqual('Frequently asked questions');
    expect(wrapper.find(TileItem).at(3).prop('iconImage')).toEqual(require('../assets/arrowRight.png'));
    expect(wrapper.find(TileItem).at(3).prop('onIconPress')).toBeDefined();
  });

  it('handleIconPress function is called when icon is pressed', () => {
    const 
  });

});
