import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';

import {
    View,
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
    StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';



export default function ProfileScreen(props) {
    const db = props.route.params.db;
    const [email, setEmail] = React.useState('');
    const [displayName, setDisplayName] = React.useState('');
    // const [displayNameResult, setDisplayNameResult] = React.useState('');
    const [points, setPoints] = React.useState('');
    const [description, setDescription] = React.useState('');
    // const [descriptionResult, setDescriptionResult] = React.useState('');
    // pentru a trece din modul de vizualizare in modul de editare
    const [editing, setEditing] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const placeholderProfileImage = 'https://via.placeholder.com/150';

    const [profileImage, setProfileImage] = useState(placeholderProfileImage);


    const handlePhoto = async () => {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                handleEditing();
                setProfileImage(result.uri);
            }
        }
    }
    const uploadProfileImage = async (uri) => {
        // Get the current user's UID
        const auth = getAuth();
        const uid = auth.currentUser.uid;

        // Create a reference to the user's profile image in Firebase Storage
        const profileImageRef = storage().ref(`profileImages/${uid}`);

        // Upload the image to Firebase Storage
        await profileImageRef.putFile(uri);

        // Get the uploaded image URL
        const profileImageUrl = await profileImageRef.getDownloadURL();

        return profileImageUrl;
    };
    // Pentru a modifica datele profilului in baza de date
    const handleUpdateProfile = async () => {
        setIsLoading(true);
        const auth = getAuth();
        const uid = auth.currentUser.uid;
        const userRef = db.collection('users').doc(uid);
        // const imageResult = await uploadProfileImage(profileImage).then(e => {
        //     console.log('uploadProfileImage ', e)
        // });

        userRef.update({
            displayName: displayName,
            description: description,
            // profileImage: imageResult,
        }).then(() => {
            // setam inapoi editingul la false pentru a nu mai putea modifica datele
            setEditing(false);
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });
        setIsLoading(false);
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
        const profileImage = userData.data().profileImage;
        setEmail(email);
        setDisplayName(displayName);
        setPoints(points);
        setDescription(description);
        if (profileImage)
            setProfileImage(profileImage);

    }
    // Il folosim ca sa apelam functia anteriora pentru a obtine datele
    React.useEffect(() => {
        fetchData();
        console.log("useEffect");
    }, []);

    const handleEditing = () => {
        setEditing(true);
        console.log("editing");
    }

    // afiseaza datele fie in modul de vizualizare, fie in modul de editare

        return (
            <View style={styles.container}>
                <View style={styles.profileImageContainer}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: profileImage }}
                    />
                    {/* <Image
                        style={styles.profileImage}
                        source={{ uri: placeholderProfileImage }}
                    /> */}
                    <TouchableOpacity
                        style={styles.editProfileImageButton}
                        onPress={handlePhoto}>
                        <Text style={styles.editProfileImageText}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 16 }} ></View>
                <Text style={{
                    textAlign: 'left', width: '100%', color: 'white', fontWeight : 'bold'
                }}>Number of points: {points}</Text>
                <View style={{ height: 8 }} ></View>

                {/* Edit form for profile info */}
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Display Name</Text>
                    <TextInput
                        style={styles.input}
                        multiline={true}
                        onChangeText={text => setDisplayName(text)}
                        value={displayName}
                        placeholder='Display Name'
                        testID='display-name-id'
                        editable={editing}
                        autoFocus={true}
                    />

                    <Text style={styles.title}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        placeholder="Email"
                        editable={false}
                    />

                    <Text style={styles.title}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={description}
                        testID='description-id'
                        onChangeText={text => setDescription(text)}
                        editable={editing}
                    />
                </View>


                <View style={{ height: 16 }} ></View>

                <TouchableOpacity
                    style={[styles.save, {
                        borderColor: 'white',
                        backgroundColor: '#F16956',
                        borderWidth: 3,
                        borderRadius: 20,
                        color: '#F16956',
                    }]}
                    disabled={editing}
                    onPress={handleEditing}>
                    <Text style = {{color: 'white', fontWeight:'bold'}}>Edit</Text>

                </TouchableOpacity>


                <View style={{ height: 32 }} ></View>

                <TouchableOpacity
                    style={styles.save}
                    disabled={!editing}
                    onPress={handleUpdateProfile}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color={styles.loader.color} />
                    ) : (
                        <Text style = {{color: '#F16956', fontWeight: 'bold'}}>Save Changes</Text>
                    )}



                </TouchableOpacity>
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F16956',
        paddingLeft: 12,
        paddingRight: 12,
    },
    profileImageContainer: {
        marginTop: 10,
        position: 'relative',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    editProfileImageButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'blue',
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    editProfileImageText: {
        color: 'white',
        fontSize: 12,
    },
    formContainer: {
        width: '100%',
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 12,

    },
    input: {
        height: 40,
        borderColor: '#F9E0DD',
        backgroundColor: '#F9E0DD',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        width: '100%',
        marginVertical: 8,

    },
    save: {
        backgroundColor: '#F9E0DD',
        borderRadius: 20,
        padding: 10,
        width: '100%',
        alignItems: 'center',

    },
    loader: {
        color: '#FFFFFF'
    },
});