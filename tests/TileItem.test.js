import React from 'react';
import TileItem from '../components/TileItem';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';

describe('<TileItem />', () => {
    it('renders correctly', () => {
        const tree = renderer.create('<TileItem />').toJSON();
        expect(tree).toMatchSnapshot();
    });
    const mainText = 'mainText';
    const subtitle = 'subtitle';

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the mainText and subtitle', () => {
        const { getByText } = render(<TileItem mainText={mainText} subtitle={subtitle} />);
        expect(getByText(mainText)).not.toBeNull();
        expect(getByText(subtitle)).not.toBeNull();
    });


});
