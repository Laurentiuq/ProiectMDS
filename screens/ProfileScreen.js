import { View, Text, TextInput, TouchableOpacity, Button, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { StyleSheet } from 'react-native';
import Sidebar from '../components/sidebar.js';



export default function ProfileScreen(props) {
    const db = props.route.params.db;
    const [email, setEmail] = React.useState('');
    const [displayName, setDisplayName] = React.useState('');
    const [points, setPoints] = React.useState('');
    const [description, setDescription] = React.useState('');
    // pentru a trece din modul de vizualizare in modul de editare
    const [editing, setEditing] = React.useState(false);

    // Pentru a modifica datele profilului in baza de date
    const handleUpdateProfile = () => {
        const auth = getAuth();
        const uid = auth.currentUser.uid;
        const userRef = db.collection('users').doc(uid);
        userRef.update({
            displayName: displayName,
            description: description
        }).then(() => {
            // setam inapoi editingul la false pentru a nu mai putea modifica datele
            setEditing(false);
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    // Functia care cauta datele despre utilizator in baza de date
    const fetchData = async () => {
        const auth = getAuth();
        const uid = auth.currentUser.uid;
        const userRef = db.collection('users').doc(uid);
        const userData = await userRef.get();
        const email = userData.data().email;
        const displayName = userData.data().displayName;
        const points = userData.data().points;
        const description = userData.data().description;
        setEmail(email);
        setDisplayName(displayName);
        setPoints(points);
        setDescription(description);
        
    }
    // Il folosim ca sa apelam functia anteriora pentru a obtine datele
    React.useEffect(() => {
        fetchData();
        console.log("useEffect");
    }, []);


    // afiseaza datele fie in modul de vizualizare, fie in modul de editare
    const EditInfo = () => {
        if(editing){
            return (
                <View>
                    <TextInput 
                        style = {styles.input}
                        defaultValue={displayName}
                        onChangeText={setDisplayName}
                        placeholder={displayName}>
                    </TextInput>
                    <TextInput
                        style = {styles.input} 
                        defaultValue={description} 
                        onChangeText={setDescription} 
                        placeholder={description}></TextInput>
                    
                </View>
            )
        }
        else{
            return (
                <View>
                    <Text>Display name: {displayName}</Text>
                    <Text>Description: {description}</Text>
                </View>
            )
        }
    }

    handleEditing = () => {
        setEditing(true);
        console.log("editing");
    }


    return (
        <View>
            {/* Edit form for profile info */}
            <Sidebar />
            
            <Text>Nr. points: {points}</Text>
            <Text>Email address: {email}</Text>

            <Button title="Edit" onPress={handleEditing}></Button>

            <EditInfo></EditInfo>


            <TouchableOpacity onPress={handleUpdateProfile}>
                <Text>Save Changes</Text>
            </TouchableOpacity>
            
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        // flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        margin: 10,
        backgroundColor: 'red',
    },
    editButton: {
        backgroundColor: 'blue',
    }
})