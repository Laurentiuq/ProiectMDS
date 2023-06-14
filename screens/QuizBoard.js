import React, { useEffect, useState } from 'react';

import { StyleSheet,View, Text, FlatList, ActivityIndicator} from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase/compat/app';
import { QuizCard } from '../components/QuizCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();

export default function QuizBoard() {
  return (
    <Tab.Navigator
    // screenOptions={{ headerShown: false }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'My Quiz') {
            iconName = focused
              ? 'book-open-page-variant' 
              : 'book-open-page-variant-outline'; 
          } else if (route.name === 'General Quiz') {
            iconName = focused ? 'clipboard-text' : 'clipboard-text-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        headerShown: false, 

      })}
      tabBarOptions={{
        activeTintColor: '#F16956', 
        inactiveTintColor: 'gray', 
        
      }}
      
    >
      <Tab.Screen name="My Quiz" component={MyQuizScreen} />
      <Tab.Screen name="General Quiz" component={GeneralQuizScreen} />
    </Tab.Navigator>
  );
}


export function MyQuizScreen() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const quizRef = firebase.firestore().collection('quiz_history');

    const unsubscribe = quizRef.where('quiz.quizCreator', '==', userId).onSnapshot(snapshot => {
      const fetchedQuizzes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuizzes(fetchedQuizzes);
      setIsLoading(false);  
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => <QuizCard item={item} />;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F16956" />
      </View>
    );
  }

  if (quizzes.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No quizzes found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        contentContainerStyle={styles.list}
        data={quizzes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

export function GeneralQuizScreen() {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const quizRef = firebase.firestore().collection('quiz_history');

    const unsubscribe = quizRef.where('userId', '==', userId).where('quiz.quizCreator', '!=', userId).onSnapshot(snapshot => {
      const fetchedQuizzes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuizzes(fetchedQuizzes);
      setIsLoading(false);  
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => <QuizCard item={item} />;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F16956" />
      </View>
    );
  }

  if (quizzes.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No quizzes found</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        contentContainerStyle={styles.list}
        data={quizzes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  list: {
    width: '100%',
    padding: 10,
  }
});
