import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


export default function JoinQuizScreen(props) {
  const [quizzes, setQuizzes] = useState([]);

  const db = props.route.params.db;
  const navigation = useNavigation();

  // fetches all the quizzes from the database
  const fetchQuizzes = async () => {
    const quizzesRef = db.collection('quizzes');
    const snapshot = await quizzesRef.get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    let quizzes = [];
    snapshot.forEach(doc => {
      quizzes.push({ id: doc.id, ...doc.data() });
    });
    setQuizzes(quizzes);
  };

  // Used to search for quizzes (searches by name)
  const handleSearch = async (query) => {
    query = query.toLowerCase();
    const quizzesRef = db.collection('quizzes');
    const snapshot = await quizzesRef
      .where('lowercaseName', '>=', query)
      .where('lowercaseName', '<=', query + '\uf8ff')
      .get();
  
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
  
    let quizzes = [];
    snapshot.forEach(doc => {
      quizzes.push(doc.data());
    });
  
    setQuizzes(quizzes);
  }
  

  const handleQuizDelete = async (quizId) => {
    try {
      await db.collection('quizzes').doc(quizId).delete();
      console.log('Quiz deleted successfully.', quizId);
      // Refresh the quizzes list
      fetchQuizzes();
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };
  

  const handleQuizStart = (quiz) => {
    // Navigate to the QuizScreen
    const quizData = quiz;
    navigation.navigate('TakeQuiz', { quiz: quizData });
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const RenderQuizzes = () => {
    return quizzes.map((quiz, index) => {
      return (
        <View key={index} style={styles.quizContainer}>
          <Text style={styles.quizName}>{quiz.name}</Text>
          <TouchableOpacity onPress={() => handleQuizStart(quiz)} style={styles.startButton}>
            <Text style={styles.buttonText}>Take Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleQuizDelete(quiz.id)} style={styles.startButton}>
            <Text style={styles.buttonText}>Delete Quiz</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };
  

  return <ScrollView style={styles.container}>
    <TextInput placeholder="Search..." onChangeText={text => handleSearch(text)}/>
    {RenderQuizzes()}
  </ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9E0DD',
    padding: 20,
  },
  quizContainer: {
    marginBottom: 20,
    backgroundColor: '#F16956',
    padding: 10,
    borderRadius: 8,
  },
  quizName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  startButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#F16956',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
