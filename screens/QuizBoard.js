import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import firebase from 'firebase';

const Tab = createBottomTabNavigator();

export default function QuizBoard() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Quiz" component={MyQuizScreen} />
      <Tab.Screen name="General Quiz" component={GeneralQuizScreen} />
    </Tab.Navigator>
  );
}

export function MyQuizScreen() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Retrieve your quizzes from Firestore and set them in the state.
    // This is dependent on your Firestore data structure.
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList 
        data={quizzes} 
        renderItem={({item}) => <Text>{item.title}, Score: {item.score}</Text>} 
        keyExtractor={item => item.id} />
    </View>
  );
}

export function GeneralQuizScreen() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Retrieve your quizzes from Firestore and set them in the state.
    // This is dependent on your Firestore data structure.
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList 
        data={quizzes} 
        renderItem={({item}) => <Text>{item.title}, Score: {item.score}</Text>} 
        keyExtractor={item => item.id} />
    </View>
  );
}
