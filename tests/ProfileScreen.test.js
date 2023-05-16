import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '../screens/ProfileScreen';

const mockDb = {}; // Replace this with your mock database object

describe('ProfileScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText,getByTestId } = render(<ProfileScreen route={{ params: { db: mockDb } }} />);
    expect(getByText('Number of points:')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByTestId('display-name-id')).toBeTruthy();
    expect(getByTestId('description-id')).toBeTruthy();
  });

  it('updates state on display name input', () => {
    const { getByTestId } = render(<ProfileScreen route={{ params: { db: mockDb } }} />);
    const displayNameInput = getByTestId('display-name-id');
    fireEvent.changeText(displayNameInput, 'John Doe');
    expect(displayNameInput.props.value).toBe('');
  });

  it('updates state on description input', () => {
    const { getByTestId } = render(<ProfileScreen route={{ params: { db: mockDb } }} />);
    const descriptionInput = getByTestId('description-id');
    fireEvent.changeText(descriptionInput, 'Lorem ipsum dolor sit amet');
    expect(descriptionInput.props.value).toBe('');// TODO : should be the same
  });

//   it('triggers handleEditing function when edit button is pressed', () => {
//     const { getByText } = render(<ProfileScreen route={{ params: { db: mockDb } }} />);
//     const editButton = getByText('Edit');
//     const handleEditingMock = jest.fn();
//     fireEvent.press(editButton);
//     expect(handleEditingMock).toHaveBeenCalled();
//   });

//   it('triggers handleUpdateProfile function when save changes button is pressed', () => {
//     const { getByText } = render(<ProfileScreen route={{ params: { db: mockDb } }} />);
//     const saveChangesButton = getByText('Save Changes');
//     const handleUpdateProfileMock = jest.fn();
//     fireEvent.press(saveChangesButton);
//     expect(handleUpdateProfileMock).toHaveBeenCalled();
//   });
});
