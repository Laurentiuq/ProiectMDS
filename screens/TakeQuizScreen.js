import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
    <View>
      <Text>{quiz.name}</Text>
      <Text>{quiz.description}</Text>

      {quiz.questions.map((question, questionIndex) => {
        const correctAnswerIndexes = question.correctAnswer.split(' ');

        return (
          <View key={questionIndex}>
            <Text>Question: {question.question}</Text>

            {question.options.map((option, optionIndex) => {
              const isSelected = selectedAnswers[questionIndex].includes(optionIndex);
              const isCorrectAnswer = correctAnswerIndexes.includes(optionIndex.toString());
              const shouldHighlightAnswer = showAnswers && isSelected;
              const shouldHighlightCorrectNotSelected =
                showAnswers && !isSelected && isCorrectAnswer;

              let borderColor = isSelected ? 'black' : 'transparent';
              let backgroundColor = 'transparent';
              if (shouldHighlightAnswer) {
                backgroundColor = isCorrectAnswer ? 'green' : 'red';
              } else if (shouldHighlightCorrectNotSelected) {
                backgroundColor = 'yellow';
              }

              return (
                <TouchableOpacity
                  key={optionIndex}
                  onPress={() => handleAnswerSelection(questionIndex, optionIndex)}
                  style={{ borderColor, borderWidth: 2, backgroundColor }}
                  disabled={showAnswers} // Disable selection after the submit button is pressed
                >
                  <Text>{option}</Text>
                </TouchableOpacity>
              );
            })}

            {showAnswers && selectedAnswers[questionIndex].length === 0 && (
              <View style={{ marginTop: 10 }}>
                <Text>Correct Answer(s):</Text>
                {correctAnswerIndexes.map((index) => (
                  <Text key={index}>{question.options[index]}</Text>
                ))}
              </View>
            )}
          </View>
        );
      })}

      <TouchableOpacity
        style={{ backgroundColor: showAnswers ? 'gray' : 'blue', padding: 10 }}
        onPress={handleSubmitQuiz}
        disabled={showAnswers}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Submit Quiz</Text>
      </TouchableOpacity>

      <Text>Score: {score}</Text>

      {/* Add other UI elements as needed */}
    </View>
  );
}
