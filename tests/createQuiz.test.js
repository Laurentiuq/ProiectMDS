import React from "react";
import { useCallback } from "react";
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import CreateQuiz from '../components/createQuiz.js';
import { handleAddPhoto, handleAddQuestion, updateIsAddQuestion} from "../components/createQuiz.js";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
// jest.mock('expo-image-picker');


jest.mock('expo-image-picker', () => ({
  requestCameraRollPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: jest.fn(),
}));

jest.mock()

describe('CreateQuiz', () => {
    test('render quiz name input', () => {
        const {getByPlaceholderText} = render(<CreateQuiz />);
        const quizNameInput = getByPlaceholderText('Quiz Name');
        expect(quizNameInput).not.toBeNull();
    });

    it('requests camera roll permissions and launches image library', async () => {
      ImagePicker.requestCameraRollPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
      ImagePicker.launchImageLibraryAsync.mockResolvedValueOnce({ uri: 'test-uri', cancelled: false });
      ImagePicker.MediaTypeOptions.mockResolvedValueOnce({ Images: 'test-images' });

      const setQuizPhoto = jest.fn();
      await handleAddPhoto(setQuizPhoto);
  
      expect(ImagePicker.requestCameraRollPermissionsAsync).toHaveBeenCalled();
      expect(setQuizPhoto).toHaveBeenCalledWith('test-uri');
    });

    it('outputs an alert if camera roll permissions are not granted', async () => {
      alertSpy = jest.spyOn(Alert, 'alert');
      ImagePicker.requestCameraRollPermissionsAsync.mockResolvedValueOnce({ status: 'denied' });
      ImagePicker.launchImageLibraryAsync.mockResolvedValueOnce({ uri: 'test-uri', cancelled: false });
      ImagePicker.MediaTypeOptions.mockResolvedValueOnce({ Images: 'test-images' });
      
      const setQuizPhoto = jest.fn();
      await handleAddPhoto(setQuizPhoto);
  
      expect(ImagePicker.requestCameraRollPermissionsAsync).toHaveBeenCalled();
      expect(setQuizPhoto).not.toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith('Sorry, we need camera roll permissions to make this work!');
    });

    //test setIsAddQuestion

    it('sets isAddQuestion to true', () => {
      const setIsAddQuestion = jest.fn();
      handleAddQuestion(setIsAddQuestion);
      expect(setIsAddQuestion).toHaveBeenCalledWith(true);
    });

    it('sets isAddQuestion to false', () => {
      const setIsAddQuestion = jest.fn();
      updateIsAddQuestion(false, setIsAddQuestion);
      expect(setIsAddQuestion).toHaveBeenCalledWith(false);
    });





});