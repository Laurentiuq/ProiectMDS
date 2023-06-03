import { View, Text, TextInput, Button, Switch, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/questionStyles';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Question(props) {
    const [question, setQuestion] = React.useState('');
    const [options, setOptions] = React.useState(['']);
    // const [correctAnswer, setCorrectAnswer] = React.useState([]);
    // const [timerEnabled, setTimerEnabled] = React.useState(false);
    const [timer, setTimer] = React.useState(0);
    const [points, setPoints] = React.useState(0);
    const [photo, setPhoto] = React.useState('');
    const [multipleAnswers, setMultipleAnswers] = React.useState(false);
    // after the add question form is completed and submitted, the isAddQuestion variable is set to false so that the form is not rendered
    const [isAddQuestion, setIsAddQuestion] = React.useState(props.isAddQuestion);

    const onLocalIsAddQuestion = (newValue) => {
        setIsAddQuestion(newValue);
        props.onUpdate(newValue);
    }
    const handleDeleteOption = (index) => {
        if (options.length > 1) {
            setOptions(options.filter((_, i) => i !== index));
            setCorrectAnswer(correctAnswer.filter((_, i) => i !== index));
        }
    }
    const setMultipleAnswersChoice = (newValue) => {
        setMultipleAnswers(newValue);
        correctAnswer.forEach((answer, index) => correctAnswer[index] = false)
        setCorrectAnswer(correctAnswer);
    }

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;

        if (index === options.length - 1 && value !== '') {
            newOptions.push('');
        }

        setOptions(newOptions);
    }


    const handleCorrectAnswerChange = (index, value) => {
        const newCorrectAnswer = [...correctAnswer];
        newCorrectAnswer[index] = value;
        setCorrectAnswer(newCorrectAnswer);

        if (!multipleAnswers) {
            newCorrectAnswer.forEach((val, idx) => {
                if (idx !== index) newCorrectAnswer[idx] = false;
            })
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
        for (let i = 0; i < options.length; i++) {
            if (options[i] === '') {
                options.splice(i, 1);
            }
        }

        console.log('correctAnswer ----- ', correctAnswer, ' ----- ');
     
        const newQuestion = {
            question,
            options,
            correctAnswer: correctAnswer,
            // timerEnabled,
            // timer,
            points,
            photo,
            isMultipleChoice: (multipleAnswers && correctAnswer.filter(answer => answer).length > 1)
        }
        // set the isAddQuestion variable to false so that the form is not rendered
        // onLocalIsAddQuestion(false);
        // add qurstion to the questions array

        // props.setQuestions([...props.questions, newQuestion]);
        props.setQuestions(prevQuestions => [...prevQuestions, newQuestion]);

        console.log("props.questions ", props.questions)

        console.log("newQuestion ", newQuestion);
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.labelText}>Question</Text>
            <TextInput style={styles.inputText}
                value={question}
                onChangeText={setQuestion}
                placeholder="Question"
            />
            <Text style={styles.labelText}>Multiple Correct Answers</Text>
            <Switch
                value={multipleAnswers}
                onValueChange={(value) => setMultipleAnswersChoice(value)}
            />

            <Text style={styles.labelText}>Options</Text>

            {options.map((option, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>


                    <TextInput style={styles.answerContainer}
                        value={option}
                        onChangeText={(value) => handleOptionChange(index, value)}
                        placeholder={`Option ${index + 1}`}
                    />

                    {(options?.length > 1) ?
                        <Icon
                            name="delete"
                            size={24}
                            color="red"
                            onPress={() => handleDeleteOption(index)}
                        />
                        :
                        <View />
                    }
                    <RadioButton
                        value="first"
                        status={correctAnswer[index] ? 'checked' : 'unchecked'}
                        onPress={() => handleCorrectAnswerChange(index, !correctAnswer[index])}
                    />

                </View>
            ))}


            {/* {answerType === 'multiple' ? (
                options.map((option, index) => (
                    <CheckBox
                        key={index}
                        title={`Option ${index + 1}`}
                        checked={correctAnswers.includes(index)}
                        onPress={() => handleCorrectAnswerChange(index, !correctAnswers.includes(index))}
                    />
                ))
            ) : (
                <>
                    <Text style={styles.labelText}>Correct Answer</Text>
                    <TextInput style={styles.inputTextNoBorder}
                        value={correctAnswer}
                        onChangeText={handleCorrectAnswerChange}
                        placeholder="Correct Answer"
                    />
                </>
            )} */}
            {/* {options.map((option, index) => (
                <TextInput style={styles.answerContainer}
                    key={index}
                    value={option}
                    onChangeText={(value) => handleOptionChange(index, value)}
                    onSubmitEditing={() => this.correctAnswer.focust()}
                    placeholder={`Option ${index + 1}`}
                />
            ))} */}

            {/* <Text style={styles.labelText}>Timer Enabled</Text>
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
            )} */}
            <Text style={styles.labelText}>Points</Text>
            <TextInput
                value={points}
                onChangeText={setPoints}
                placeholder="Points"
            />
            {photo ? <Image source={{ uri: photo }} style={{ width: 200, height: 200, marginBottom: 10 }} /> :
                // <Button title="Add Photo" onPress={() => handleAddPhoto()} />
                <TouchableOpacity style={styles.button} title="Submit" onPress={handleAddPhoto}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Photo</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity style={styles.button} title="Submit" onPress={() => handleSubmit()}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Add the question</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    )
}