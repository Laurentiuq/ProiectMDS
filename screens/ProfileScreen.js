import { View, Text, TextInput, TouchableOpacity, Button} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { StyleSheet } from 'react-native';


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
        console.log(email);
        console.log(displayName);
        console.log(points);
        setEmail(email);
        setDisplayName(displayName);
        setPoints(points);
        setDescription(description);
        
    }
    // Il folosim ca sa apelam functia anteriora pentru a obtine datele
    React.useEffect(() => {
        fetchData();
    }, []);


    // afiseaza datele fie in modul de vizualizare, fie in modul de editare
    const EditInfo = () => {
        if(editing){
            return (
                <View>
                    <TextInput style = {styles.input} value={displayName} onChangeText={setDisplayName} placeholder={displayName}></TextInput>
                    <TextInput style = {styles.input} value={description} onChangeText={setDescription} placeholder={description}></TextInput>
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


  return (
    <View>
        {/* Edit form for profile info */}
        
        <Text>Nr. points: {points}</Text>
        <Text>Email address: {email}</Text>

        <Button title="Edit" onPress={() => setEditing(true)}></Button>
        <EditInfo></EditInfo>
        <TouchableOpacity onPress={handleUpdateProfile}>
            <Text>Save Changes</Text>
        </TouchableOpacity>
        
    </View>
  )
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200
    }
})