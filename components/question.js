import { View, Text, TextInput, Button, Switch, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/questionStyles';
export default function Question(props) {
    const [question, setQuestion] = React.useState('');
    const [options, setOptions] = React.useState(['']);
    const [correctAnswer, setCorrectAnswer] = React.useState('');

    const [points, setPoints] = React.useState(0);
    const [photo, setPhoto] = React.useState('');


    // after the add question form is completed and submitted, the isAddQuestion variable is set to false so that the form is not rendered
    const [isAddQuestion, setIsAddQuestion] = React.useState(props.isAddQuestion);
    const onLocalIsAddQuestion = (newValue) => {
        setIsAddQuestion(newValue);
        props.onUpdate(newValue);
    }

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);


        if(index === options.length - 1 && value !== ''){
            setOptions([...options, '']);
        }

    }

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
                setPhoto(result.uri);
            }
        }
    }

    const handleSubmit = () => {
        // remove the last element of the options array if it is empty
        for(let i = 0; i < options.length; i++){
            if(options[i] === ''){
                options.splice(i, 1);
            }
        }

        const newQuestion = {
            question,
            options,
            correctAnswer,
            points,
            photo
        }
        // set the isAddQuestion variable to false so that the form is not rendered
        // onLocalIsAddQuestion(false);
        // add qurstion to the questions array
        props.setQuestions([...props.questions, newQuestion]);

        console.log(props.questions)
        console.log(newQuestion);
    }

    return (
    <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.labelText}>Question</Text>
        <TextInput style={styles.inputText}
            value={question}
            onChangeText={setQuestion}
            placeholder="Question"
        />

        <Text style = {styles.labelText}>Options</Text>
        {options.map((option, index) => (
            <TextInput style={styles.answerContainer}
                key={index}
                value={option}
                onChangeText={(value) => handleOptionChange(index, value)}
                onSubmitEditing={() => this.correctAnswer.focust()}
                placeholder={`Option ${index + 1}`}
            />
        ))}
        <Text style={styles.labelText}>Correct Answer</Text>
        <TextInput style={styles.inputTextNoBorder}
            value={correctAnswer}
            onChangeText={setCorrectAnswer}
            placeholder="Correct Answer"
        />
        
        <Text style={styles.labelText}>Points</Text>
        <TextInput
            value={points}
            onChangeText={setPoints}
            placeholder="Points"
        />
        {photo ? <Image source={{ uri: photo }} style={{ width: 200, height: 200, marginBottom: 10 }} /> :
            // <Button title="Add Photo" onPress={() => handleAddPhoto()} />
            <TouchableOpacity style={styles.button} title="Submit" onPress={handleAddPhoto}>
                <Text style = {{color:'white', fontWeight:'bold'}}>Add Photo</Text>
            </TouchableOpacity>
        }
        <TouchableOpacity style={styles.button} title="Submit" onPress={() => handleSubmit()}>
            <Text style = {{color:'white', fontWeight:'bold'}}>Add the question</Text>
        </TouchableOpacity>

    </KeyboardAvoidingView>
    )
}