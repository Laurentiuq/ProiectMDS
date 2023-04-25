import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import Sidebar from '../components/sidebar.js';

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
            users.push(doc.data());
        });
        // sort the list and update state
        users.sort((a, b) => b.points - a.points);
        setUsers(users);
    }

    // to call the fetchData function
    React.useEffect(() => {
        fetchData();
    }, []);


    // output the user on the screen
    const RenderUsers = () => {
        return users.map((user, index) => {
            return(
                <View key={index}>
                    <Text  style = {styles.text}>{index + 1}.  {user.displayName}: {user.points}</Text>
                </View>
            )
        })
    }
    return (
        <View style = {{backgroundColor: '#F16956', flex:1,  height: 100}}>

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

    textLeaderboard: 
    {
        textAlign:'center',
         color:'#F9E0DD', 
         fontWeight:'bold', 
         fontSize: 20, 
         margin:10}
})