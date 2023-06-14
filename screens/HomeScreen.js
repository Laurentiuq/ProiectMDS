import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/sidebar.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

const handleQuizBoard = (navigation) => {
  navigation.push('QuizBoard');

}

const handleLogout = (navigation) => {
  const auth = getAuth();
  auth.signOut().then(() => {
    navigation.replace('LoginOrSignupScreen');
  })
}

const IconButton = ({ onPress }) => (
  <TouchableOpacity testID="settings-button" onPress={onPress} style={{ padding: 8 }}>
    <Icon name="settings" size={24} color="#000" />
  </TouchableOpacity>
);

const handleSettingsPress = (navigation) => {
  navigation.push('Settings');
  console.log('Settings pushed');

};

export { handleLogout, IconButton, handleSettingsPress }

export default function HomeScreen(props) {

  const db = props.route.params.db;
  const [displayName, setDisplayName] = React.useState('');
  const navigation = useNavigation();

  // Functia care cauta datele despre utilizator in baza de date
  const fetchData = async () => {
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    const userRef = db.collection('users').doc(uid);
    const userData = await userRef.get();
    const displayName = userData.data().displayName;
    setDisplayName(displayName);

    // const db = firebase.firestore();
    const quizHistoryRef = db.collection('quiz_history');
    quizHistoryRef.get().then((quizHistory) => {
      quizHistory.docs.forEach((quiz) => {
        console.log('nabil alhafez ', JSON.stringify(quiz.data()))
      });
    });
  }
  // Il folosim ca sa apelam functia anteriora pentru a obtine datele
  React.useEffect(() => {
    fetchData();
    console.log("useEffectthis?");
  }, []);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        <View testID='header-right' style={{ flex: 1, alignItems: 'flex-end' }}>
          <IconButton onPress={() => handleSettingsPress(navigation)} />
        </View>,
    });
  }, [navigation]);


  return (
    <>
      <View style={styles.container}>
        <Sidebar />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <View style={styles.inputContainer}>

            <Text style={{ color: 'rgb(225, 105, 86)' }}>Nume:{displayName}</Text>

            <Text style={{ color: 'rgb(225, 105, 86)', fontWeight: 'bold', textAlign: 'left' }}>What do you want to do?</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('JoinQuiz')
                }}
                style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Join a quiz</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity testID='create-quiz-button'
                onPress={() => {
                  navigation.navigate('CreateQuiz')
                }}
                style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Create a quiz</Text>
              </TouchableOpacity>

              <View style={styles.buttonContainer}>
                <TouchableOpacity testID='quiz-board-button'
                  onPress={() => handleQuizBoard(navigation)}
                  style={[styles.button, styles.buttonOutline]}>
                  <Text style={styles.buttonOutlineText}>Quiz Board</Text>
                </TouchableOpacity>

              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity testID='logout-button'
                  onPress={() => handleLogout(navigation)}
                  style={[styles.button, styles.buttonOutline]}>
                  <Text style={styles.buttonOutlineText}>Logout</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </View>
      </View>
    </>

  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(225, 105, 86)',
    flex: 1
  },

  inputContainer: {
    width: '90%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgb(249, 224, 221)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

  },

  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,

  },
  button: {
    backgroundColor: 'rgb(249, 224, 221)',
    width: '90%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'rgb(241, 105, 86)',
    marginTop: 5,
    borderColor: 'rgb(241, 105, 86)',
    borderWidth: 2,
  },
  buttonText: {
    color: 'rgb(249, 224, 221)',
    fontWeight: '800',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: 'rgb(249, 224, 221)',
    fontWeight: '800',
    fontSize: 16,
  },


})

// test1@info.ro
// A123456@