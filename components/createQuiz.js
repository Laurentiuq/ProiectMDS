import { View, Text, TextInput, Button, Image } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import Question from './question';

export default function CreateQuiz() {
    const [quizName, setQuizName] = React.useState('');
    const [quizDescription, setQuizDescription] = React.useState('');
    const [quizPhoto, setQuizPhoto] = React.useState('');
    const [isAddQuestion, setIsAddQuestion] = React.useState(false);

    const handleAddPhoto = async () => {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setQuizPhoto(result.uri);
            }
        }
    }

    const handleAddQuestion = () => {
        setIsAddQuestion(true); 
    }

    const updateIsAddQuestion = (newValue) => {
        setIsAddQuestion(newValue);
    }


    return (
    <View>
        {/* <Text>CreateScreen</Text> */}
        <TextInput value={quizName} onChangeText={setQuizName} placeholder="Quiz Name" />
        <TextInput value={quizDescription} onChangeText={setQuizDescription} placeholder="Quiz Description" />
        {quizPhoto ? <Image source={{ uri: quizPhoto }} style={{ width: 200, height: 200 }} /> : 
        <Button title="Add Photo" onPress={handleAddPhoto} />}
        <Button title='Add Question' onPress={handleAddQuestion} />
        {isAddQuestion ? <Question isAddQuestion = {isAddQuestion} onUpdate={updateIsAddQuestion} /> : null}
    </View>
    )
}