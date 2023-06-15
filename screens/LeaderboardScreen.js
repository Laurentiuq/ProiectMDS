import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import Sidebar from '../components/sidebar.js';
import LottieView from 'lottie-react-native';
import animation from '../assets/4768-trophy.json';
import { getAuth } from 'firebase/auth';

export default function LeaderboardScreen(props) {
    const db = props.route.params.db;
    const [users, setUsers] = React.useState([]); // a list with all the users in the database

    // Takes user data from db and sorts users by number of points
    const fetchData = async () => {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        // get every user from db and add it to the users list
        let users = [];
        snapshot.forEach(doc => {
            if(doc.data().email !== "admin@info.ro"){
                users.push(doc.data());
            }
        });
        // sort the list and update state
        users.sort((a, b) => b.points - a.points);
        setUsers(users);
        console.log("users ", users)
    }

    // to call the fetchData function
    let currentUser;
    React.useEffect(() => {
        fetchData();
        currentUser = getAuth().currentUser;
        console.log("currentUser ", currentUser)
    }, []);

    // output the user on the screen
    const RenderUsers = () => {
        const currentUserIndex = users.findIndex(currentUser => currentUser.email === getAuth().currentUser.email);
        return users.map((user, index) => {
            const isCurrentUser = index === currentUserIndex;
            return(
                <View key={index}>
                    <Text  style={[styles.text, isCurrentUser && styles.currentUser]}>
                        {index + 1}.  {user.displayName}: {user.points}</Text>
                </View>
            )
        })
    }
    return (
        <View style = {{backgroundColor: '#F16956', flex:1,  height: 100}}>
            <View style={styles.animationContainer}>
              <LottieView source={animation} autoPlay loop />
            </View>

            <View style = {styles.textContainer}>
            <Text style = {styles.textLeaderboard}>  {String.fromCodePoint(0x1F3C6)} Quizzez Leaderboard  {String.fromCodePoint(0x1F3C6)}</Text> 
           
              <RenderUsers />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   
    textContainer: {
        backgroundColor: '#F16956',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },

    text: {
        color: '#F9E0DD',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },

    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        marginVertical: 20,
      },

    textLeaderboard: 
    {
        textAlign:'center',
         color:'#F9E0DD', 
         fontWeight:'bold', 
         fontSize: 20, 
         margin:10},
        
    currentUser: {
        color: '#F9E000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    }
})