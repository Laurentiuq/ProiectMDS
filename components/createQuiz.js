import { View, Text, TextInput, Button, Image, Alert, ScrollView } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import Question from './question';
import firebase from 'firebase/compat/app';
// import { Firestore } from 'react-native-firebase/firestore';



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

// add quizz to the database
const handleAddQuizz = (quizName, quizDescription, quizPhoto, questions) => {
    console.log('add quizz to the database');
    const db = firebase.firestore();
    db.collection('quizzes').add({
        name: quizName,
        description: quizDescription,
        photo: quizPhoto,
        questions: questions
    })

}
 

export { handleAddPhoto, handleAddQuestion, updateIsAddQuestion}

export default function CreateQuiz() {
    const [quizName, setQuizName] = React.useState('');
    const [quizDescription, setQuizDescription] = React.useState('');
    const [quizPhoto, setQuizPhoto] = React.useState('');
    const [isAddQuestion, setIsAddQuestion] = React.useState(false);
    const [questions, setQuestions] = React.useState([]);


    return (
    <ScrollView>
        {/* <Text>CreateScreen</Text> */}
        <TextInput value={quizName} onChangeText={setQuizName} placeholder="Quiz Name" />

        <TextInput value={quizDescription} onChangeText={setQuizDescription} placeholder="Quiz Description" />
        {quizPhoto ? <Image source={{ uri: quizPhoto }} style={{ width: 200, height: 200 }} /> : 
        <Button title="Add Photo" onPress={() => handleAddPhoto(setQuizPhoto)} />}
        <Button title='Add Question' onPress={() => handleAddQuestion(setIsAddQuestion)} />
        {isAddQuestion ? <Question questions={questions} setQuestions={setQuestions} isAddQuestion = {isAddQuestion} setIsAddQuestion={setIsAddQuestion} onUpdate={() => updateIsAddQuestion(setIsAddQuestion)} /> : null}
        
        {questions.map((question, index) => {
            return (
                <ScrollView key={index}>
                    <Text>{question.question}</Text>
                    <Text>{question.options[0]}</Text>
                    <Text>{question.options[1]}</Text>
                    <Text>{question.options[2]}</Text>
                    <Text>{question.options[3]}</Text>
                    <Text>{question.correctAnswer}</Text>
                    <Text>{question.timerEnabled}</Text>
                    <Text>{question.timer}</Text>
                    <Text>{question.points}</Text>
                    {question.photo ? <Image source={{ uri: question.photo }} style={{ width: 200, height: 200 }} /> : null}
                </ScrollView>
            )
        }
        )}
    
        <Button title="Add Quiz" onPress={() => handleAddQuizz(quizName, quizDescription, quizPhoto, questions)} />

    </ScrollView>
    )
}