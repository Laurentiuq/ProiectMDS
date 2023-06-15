import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const Timer = ({ duration, onTimeout }) => {
  const [timer, setTimer] = useState(duration);

  // At every second, decrease the timer by 1
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(interval);
        onTimeout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, onTimeout]);

  // Time is passed in seconds, this function formats it to minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <View>
      <Text>Time Remaining: {formatTime(timer)}</Text>
    </View>
  );
};

export default function TakeQuizScreen({ route}) {
  const { reviewMode = false } = route.params; 

  const { quiz } = route.params;
  // Initialize selectedAnswers depending on whether it's review mode or not
  const [selectedAnswers, setSelectedAnswers] = useState(
    reviewMode
      ? quiz.questions.map((q) => q.userSelectedAnswers)
      : Array(quiz.questions.length).fill([])
  );

  // Similar changes for other states
  const [showAnswers, setShowAnswers] = useState(reviewMode);
  const [quizTimeout, setQuizTimeout] = useState(false);
  const [score, setScore] = useState(reviewMode?quiz.totalScore:0);

  const handleAnswerSelection = (questionIndex, optionIndex) => {
    // adds or removes the optionIndex from the selectedAnswers array
    // prevSelectedAnswers is the previous state of the selectedAnswers array
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedAnswers = [...prevSelectedAnswers];
      updatedAnswers[questionIndex] = updatedAnswers[questionIndex].includes(optionIndex)
        ? updatedAnswers[questionIndex].filter((i) => i !== optionIndex)
        : [...updatedAnswers[questionIndex], optionIndex];
      return updatedAnswers;
    });
  };

  // This function is called when the user presses the submit button or the timer runs out
  // It checks if the selected answers are correct and updates the score
  // It also sets the showAnswers variable to true, which will highlight the correct answers
  const handleSubmitQuiz = () => {
    setShowAnswers(true);

    let totalScore = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      const question = quiz.questions[i];
      const selectedOptionIndexes = selectedAnswers[i];

      if (selectedOptionIndexes.length > 0) {
        const correctAnswerIndexes = question.correctAnswer.reduce(function (a, e, i) {
          if (e === true) a.push(i.toString());
          return a;
        }, []);;
        const isCorrectAnswer = selectedOptionIndexes.every((index) =>
          correctAnswerIndexes.includes(index.toString())
        );
        if (isCorrectAnswer) {
          totalScore += parseInt(question.points);
        }
      }
    }

    setScore(totalScore);
    try {
      handleSaveQuizHistory(totalScore);
    } catch (e) {
      console.log(`error rrrrrrrr: ${e}`);
    }
  };

  const handleSaveQuizHistory = async (totalScore) => {
    const db = firebase.firestore();
    const uuid = firebase.auth().currentUser.uid;
    if (totalScore > 0) {
      console.log('uuid ', uuid);
      const userRef = db.collection('users').doc(uuid);

      await userRef.update({
        points: firebase.firestore.FieldValue.increment(totalScore)
      })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
    const quizHistoryRef = db.collection('quiz_history');
    const mapOfLists = new Map();

    selectedAnswers.forEach((item, index) => {
      mapOfLists.set(index, item);
    });

    quiz.questions.forEach((question, index) => {
      quiz.questions[index] = { ...question, userSelectedAnswers: selectedAnswers[index] }
    });
    const data = {
      userId: uuid,  
      quiz: quiz, // Store all the quiz data
      dateTaken: firebase.firestore.FieldValue.serverTimestamp(),  // current time
      totalScore: totalScore,  // final score
      // You might want to store other information too
    };
    await quizHistoryRef.add(data)
      .then((docRef) => {
        console.log(`Quiz history added with ID: ${docRef.id}`);
      })
      .catch((error) => {
        console.error("Error adding quiz history: ", error);
      });
  };

  // This function is called when the timer runs out
  // It sets the showAnswers variable to true, which will highlight the correct answers

  const handleTimeout = () => {
    handleSubmitQuiz();
    setQuizTimeout(true);
  };
  return (

    <View style={styles.container}>
      <ScrollView>
        {quiz.photo && <Image source={{ uri: quiz.photo }} style={{ width: 200, height: 200, alignSelf:"center" }} />}
        <Text style={styles.title}>{quiz.name}</Text>
        <Text style={styles.description}>{quiz.description}</Text>

        {/* Uses the timer defined above */}
        {!reviewMode && <Timer duration={quiz.timer} onTimeout={handleTimeout} />}

        {/* For each question  */}
        {quiz.questions.map((question, questionIndex) => {
          const correctAnswerIndexes = question.correctAnswer.reduce(function (a, e, i) {
            if (e === true) a.push(i.toString());
            return a;
          }, []);

          return (
            <View key={questionIndex} style={styles.questionContainer}>
              {question.photo && <Image source={{ uri: question.photo }} style={{ width: 300, height: 200, alignSelf: 'center' }} />}
              <Text style={styles.questionText}>Question: {question.question}</Text>
              {/*For each option we verifiy if it's selected and create a specific output.  */}
              {question.options.map((option, optionIndex) => {
                // Check if the option is selected
                const isSelected = selectedAnswers[questionIndex].includes(optionIndex);
                // Check if the option is correct
                const isCorrectAnswer = correctAnswerIndexes.includes(optionIndex.toString());
                // Check if the option should be highlighted(means it's selected and the quiz was submitted)
                const shouldHighlightAnswer = showAnswers && isSelected;
                // Check if the option should be highlighted as correct but not selected (means it's not selected and the quiz was submitted)
                const shouldHighlightCorrectNotSelected =
                  showAnswers && !isSelected && isCorrectAnswer;
                // Initialize the border color and background color
                let borderColor = isSelected ? styles.selectedBorderColor : 'transparent';
                let backgroundColor = 'transparent';
                // If the quiz was submitted, set the background color to green or red depending on the answer
                // If the quiz was submitted and the option is correct but not selected, set the background color to yellow
                if (shouldHighlightAnswer) {
                  backgroundColor = isCorrectAnswer
                    ? styles.correctBackgroundColor
                    : styles.incorrectBackgroundColor;
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
              {/* If the quiz was submitted and the question was not answered, show the correct answer. */}
          
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


        {/* If the quiz was submited disable the Submit Quiz button and update the style */}
        {/* If the quiz was submited disable the Submit Quiz button and update the style */}
        {!reviewMode && (
          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: showAnswers ? styles.disabledButtonColor : styles.submitButtonColor },
            ]}
            onPress={handleSubmitQuiz}
            disabled={showAnswers}
          >
            <Text style={styles.submitButtonText}>Submit Quiz</Text>
          </TouchableOpacity>
        )}

        {quizTimeout && <Text style={styles.timeoutText}>Time's up! Quiz submitted.</Text>}
        <Text style={styles.scoreText}>Score: {score}</Text>
      </ScrollView>
    </View>
  );
}

import styles from '../styles/takeQuizStyles';
