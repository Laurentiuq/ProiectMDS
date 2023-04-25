import { View, Text } from 'react-native'
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
                    <Text>{index + 1}.{user.displayName}: {user.points}</Text>
                </View>
            )
        })
    }
    return (
        <View>
            {/* <Text>LeaderboardScreen</Text> */}
            <Sidebar />
            <RenderUsers />
        </View>
    )
}

