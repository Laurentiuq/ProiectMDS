import { View, Text, TextInput, Button, Image, Alert } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import Question from './question';



const handleAddPhoto = async (setQuizPhoto) => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
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


const handleAddQuestion = (setIsAddQuestion) => {
    setIsAddQuestion(true); 
}

    
const updateIsAddQuestion = (newValue, setIsAddQuestion) => {
    setIsAddQuestion(newValue);
}


export { handleAddPhoto, handleAddQuestion, updateIsAddQuestion}

export default function CreateQuiz() {
    const [quizName, setQuizName] = React.useState('');
    const [quizDescription, setQuizDescription] = React.useState('');
    const [quizPhoto, setQuizPhoto] = React.useState('');
    const [isAddQuestion, setIsAddQuestion] = React.useState(false);



    return (
    <View>
        {/* <Text>CreateScreen</Text> */}
        <TextInput value={quizName} onChangeText={setQuizName} placeholder="Quiz Name" />

        <TextInput value={quizDescription} onChangeText={setQuizDescription} placeholder="Quiz Description" />
        {quizPhoto ? <Image source={{ uri: quizPhoto }} style={{ width: 200, height: 200 }} /> : 
        <Button title="Add Photo" onPress={() => handleAddPhoto(setQuizPhoto)} />}
        <Button title='Add Question' onPress={() => handleAddQuestion(setIsAddQuestion)} />
        {isAddQuestion ? <Question isAddQuestion = {isAddQuestion} onUpdate={() => updateIsAddQuestion(setIsAddQuestion)} /> : null}
    </View>
    )
}