import React, { useEffect, useState } from 'react';

import { View, Text, TextInput, Button, Image, Alert, ScrollView, Touchable, TouchableOpacity, Switch } from 'react-native'

import { StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


export function QuizCard({ item }) {
    const { quiz, totalScore } = item;
    const [isExpanded, setIsExpanded] = useState(false);
    const navigation = useNavigation();
    const placeholderProfileImage = 'https://via.placeholder.com/250';

    const handlePress = (quiz) => {
        navigation.navigate('TakeQuiz', {
            quiz: {...quiz,totalScore},
            reviewMode: true,
        });
    };

    console.log('placeholderProfileImage ',placeholderProfileImage);
    console.log('quiz.photo ',quiz.photo);
    console.log('quiz.photo??placeholderProfileImage ',quiz.photo??placeholderProfileImage);
    const renderQuestionAnswer = (question, index) => (
        <View key={index} style={{ marginBottom: 16, flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start', }}>
            <Text>{question.question}</Text>
            {question.options.map((option, index) => (
                <Text
                    key={index}
                    style={{
                        color: question.correctAnswer[index] ? 'green' : 'red',
                    }}>
                    {option} {question.userSelectedAnswers.includes(index) ? '(Your Answer)' : ''}
                </Text>
            ))}
        </View>
    );

    return (
        <TouchableOpacity style={styles.card} onPress={() => handlePress(quiz)}>
            <Text style={styles.text}>{quiz.name}</Text>
            {quiz.photo && <Image style={styles.image} source={{ uri: quiz.photo??placeholderProfileImage }} />}
            <Text style={styles.text}>Score: {totalScore}</Text>
            {isExpanded &&
                quiz.questions.map((question, index) => renderQuestionAnswer(question, index))}
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom:10,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    text: {
        margin: 10,
    }
});
