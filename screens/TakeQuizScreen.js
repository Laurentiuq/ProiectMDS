import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function TakeQuizScreen({ route }) {
  const { quiz } = route.params;
  const [selectedAnswers, setSelectedAnswers] = useState(Array(quiz.questions.length).fill([]));
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleAnswerSelection = (questionIndex, optionIndex) => {
    setSelectedAnswers(prevSelectedAnswers => {
      const updatedAnswers = [...prevSelectedAnswers];
      updatedAnswers[questionIndex] = updatedAnswers[questionIndex].includes(optionIndex)
        ? updatedAnswers[questionIndex].filter(i => i !== optionIndex)
        : [...updatedAnswers[questionIndex], optionIndex];
      return updatedAnswers;
    });
  };

  const handleSubmitQuiz = () => {
    setShowAnswers(true);

    let totalScore = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i];
      const selectedOptionIndexes = selectedAnswers[i];

      if (selectedOptionIndexes.length > 0) {
        const correctAnswerIndexes = question.correctAnswer.split(' ');
        const isCorrectAnswer = selectedOptionIndexes.every(index => correctAnswerIndexes.includes(index.toString()));
        if (isCorrectAnswer) {
          totalScore += parseInt(question.points);
        }
      }
    }

    setScore(totalScore);
  };

  return (
    <View style={styles.container}>
    <ScrollView >
      <Text style={styles.title}>{quiz.name}</Text>
      <Text style={styles.description}>{quiz.description}</Text>

      {quiz.questions.map((question, questionIndex) => {
        const correctAnswerIndexes = question.correctAnswer.split(' ');

        return (
          <View key={questionIndex} style={styles.questionContainer}>
            <Text style={styles.questionText}>Question: {question.question}</Text>

            {question.options.map((option, optionIndex) => {
              const isSelected = selectedAnswers[questionIndex].includes(optionIndex);
              const isCorrectAnswer = correctAnswerIndexes.includes(optionIndex.toString());
              const shouldHighlightAnswer = showAnswers && isSelected;
              const shouldHighlightCorrectNotSelected =
                showAnswers && !isSelected && isCorrectAnswer;

              let borderColor = isSelected ? styles.selectedBorderColor : 'transparent';
              let backgroundColor = 'transparent';
              if (shouldHighlightAnswer) {
                backgroundColor = isCorrectAnswer ? styles.correctBackgroundColor : styles.incorrectBackgroundColor;
              } else if (shouldHighlightCorrectNotSelected) {
                backgroundColor = styles.correctNotSelectedBackgroundColor;
              }

              return (
                <TouchableOpacity
                  key={optionIndex}
                  onPress={() => handleAnswerSelection(questionIndex, optionIndex)}
                  style={[styles.optionButton, { borderColor, backgroundColor }]}
                  disabled={showAnswers} // Disable selection after the submit button is pressed
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}

            {showAnswers && selectedAnswers[questionIndex].length === 0 && (
              <View style={styles.correctAnswerContainer}>
                <Text style={styles.correctAnswerText}>Correct Answer(s):</Text>
                {correctAnswerIndexes.map((index) => (
                  <Text key={index} style={styles.correctAnswerOption}>
                    {question.options[index]}
                  </Text>
                ))}
              </View>
            )}
          </View>
        );
      })}

      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: showAnswers ? styles.disabledButtonColor : styles.submitButtonColor }]}
        onPress={handleSubmitQuiz}
        disabled={showAnswers}
        >
        <Text style={styles.submitButtonText}>Submit Quiz</Text>
    </TouchableOpacity>
        <Text style={styles.scoreText}>Score: {score}</Text>

        {/* Add other UI elements as needed */}
    </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9E0DD',
        padding: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F16956',
        marginBottom: 10,
    },

    description: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
    },

    questionContainer: {
        
    },

    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    optionButton: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        color: 'black',
    },
    
    selectedBorderColor: '#F16956',
    
    correctBackgroundColor: 'green',
    incorrectBackgroundColor: 'red',
    correctNotSelectedBackgroundColor: 'yellow',

    correctAnswerContainer: {
        marginTop: 10,
        backgroundColor: '#FEDF5C',
        padding: 10,
        borderRadius: 8,
    },

    correctAnswerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F16956',
        marginBottom: 5,
    },

    correctAnswerOption: {
        
    },

    submitButton: {
        backgroundColor: '#F16956',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },

    disabledButtonColor: 'gray',
    submitButtonColor: 'blue',

    submitButtonText: {
        color: 'white',
        textAlign: 'center',
    },

    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F16956',
    },
});