import { View, Text, TextInput, Button, Image, Alert, ScrollView, Touchable, TouchableOpacity, Switch } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import Question from './question';
import firebase from 'firebase/compat/app';
// import { Firestore } from 'react-native-firebase/firestore';
import styles from '../styles/createQuizStyles';


const handleAddPhoto = async (setQuizPhoto) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(status);
    // if (status !=='granted') TODO: fix this
    if (status !== 'denied') {
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


const handleAddQuestion = (setIsAddQuestion, isAddQuestion) => {
    if (isAddQuestion) {
        setIsAddQuestion(false);
    }
    else {
        setIsAddQuestion(true);
    }

}

    
const updateIsAddQuestion = (newValue, setIsAddQuestion) => {
    setIsAddQuestion(newValue);
}

// add quizz to the database
const handleAddQuizz = (quizName, quizDescription, quizPhoto, questions, timerEnabled, timer, allSet, allStates) => {
    console.log('add quizz to the database');
    const db = firebase.firestore();
    db.collection('quizzes').add({
        quizCreator: firebase.auth().currentUser.uid,
        name: quizName,
        lowercaseName: quizName.toLowerCase(),
        description: quizDescription,
        photo: quizPhoto,
        questions: questions,
        timerEnabled: timerEnabled,
        timer: timer
    })
    for (let i = 0; i < allSet.length; i++) {
        if(typeof allStates[i] === 'boolean'){
            allSet[i](false);
        }
        if(typeof allStates[i] === 'string'){
            allSet[i]('');
        }
        if(Array.isArray(allStates[i])){
            allSet[i]([]);
        }
    }

}
 

export { handleAddPhoto, handleAddQuestion, updateIsAddQuestion}

export default function CreateQuiz() {

    const [quizName, setQuizName] = React.useState('');
    const [quizDescription, setQuizDescription] = React.useState('');
    const [quizPhoto, setQuizPhoto] = React.useState('');
    const [isAddQuestion, setIsAddQuestion] = React.useState(false);
    const [questions, setQuestions] = React.useState([]);
    const [timerEnabled, setTimerEnabled] = React.useState(false);
    const [timer, setTimer] = React.useState(0);
    // am creat liste cu state-urile si functiile de setare ale acestora pentru a le putea reseta dupa ce am adaugat un quiz
    // sunt folosite ca parametrii in functia handleAddQuizz
    const allSet = [setIsAddQuestion, setQuestions, setQuizName, setQuizDescription, setQuizPhoto, setTimerEnabled, setTimer];
    const allStates = [isAddQuestion, questions, quizName, quizDescription, quizPhoto, timerEnabled, timer];
    

    return (
        <View style={styles.containerMain}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.containerQuestionForm}>
                {/* <Text>CreateScreen</Text> */}
                    <TextInput style={styles.title} value={quizName} onChangeText={setQuizName} placeholder="Quiz Name" />

                    <TextInput multiline={true} style={styles.description} value={quizDescription} onChangeText={setQuizDescription} placeholder="Quiz Description" />
                    {quizPhoto ? <Image source={{ uri: quizPhoto }} style={{ width: 200, height: 200 }} /> : 
                    <TouchableOpacity style={styles.button} title="Add Photo" onPress={() => handleAddPhoto(setQuizPhoto)} >
                        <Text style = {{color:'#F16956', fontWeight:'bold'}}>Add Photo</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity style={styles.button} title='Add Question' onPress={() => handleAddQuestion(setIsAddQuestion, isAddQuestion)} >
                        <Text style = {{color:'#F16956', fontWeight:'bold'}}>Add Question</Text>
                    </TouchableOpacity>
                    <Text style={styles.labelText}>Timer Enabled</Text>
                    <Switch
                        value={timerEnabled}
                        onValueChange={setTimerEnabled}
                    />
                    {timerEnabled && (
                        <>
                            <Text style={styles.labelText}>Timer</Text>
                            <TextInput
                                value={timer}
                                onChangeText={setTimer}
                                placeholder="Timer"
                            />
                        </>
                    )}
                    {isAddQuestion ? <Question questions={questions} setQuestions={setQuestions} isAddQuestion = {isAddQuestion} setIsAddQuestion={setIsAddQuestion} onUpdate={() => updateIsAddQuestion(setIsAddQuestion)} /> : null}
                    
                    {questions.map((question, index) => {
                        return (
                            <ScrollView contentContainerStyle={styles.questionsScroll} key={index}>
                                <Text style={styles.questionText}>Question: {question.question}</Text>
                                {
                                    question.options.map((option, index) => {
                                        return (
                                            <Text style={styles.answers} key={index}>Option {index + 1}: {option}</Text>
                                        )
                                    }
                                    )
                                }
                                <Text style = {styles.answers}>Answer: {question.correctAnswer}</Text>
                                {/* <Text style = {styles.answers}>Timer: {question.timerEnabled}</Text>
                                <Text style = {styles.answers}>Sec: {question.timer}</Text> */}
                                <Text style = {styles.answers}>Points: {question.points}</Text>
                                {question.photo ? <Image source={{ uri: question.photo }} style={{ width: 200, height: 200 }} /> : null}
                                <TouchableOpacity style={styles.button} title="Delete Question" onPress={() => {
                                    const newQuestions = [...questions];
                                    newQuestions.splice(index, 1);
                                    setQuestions(newQuestions);
                                }}>
                                    <Text style = {{color:'#F16956', fontWeight:'bold'}}>Delete Question</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        )
                    }
                    )}
                
                    <TouchableOpacity style={styles.button} title="Add Quiz" onPress={() => handleAddQuizz(quizName, quizDescription, quizPhoto, questions, timerEnabled, timer, allSet, allStates)} >
                        <Text style = {{color:'#F16956', fontWeight:'bold'}}>Add Quiz</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView> 
        </View>
    )
}