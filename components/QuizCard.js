import React, { useEffect, useState } from 'react';

import { View, Text, TextInput, Button, Image, Alert, ScrollView, Touchable, TouchableOpacity, Switch } from 'react-native'

import { StyleSheet } from 'react-native';


export function QuizCard({ item }) {
    const { quiz, totalScore } = item;
    const [isExpanded, setIsExpanded] = useState(false);

    const handlePress = () => setIsExpanded(!isExpanded);

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
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <Text style={styles.text}>{quiz.name}</Text>
            {quiz.photo && <Image style={styles.image} source={{ uri: quiz.photo }} />}
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
        elevation: 5
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