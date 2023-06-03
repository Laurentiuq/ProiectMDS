import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';

export async function uploadImage(uri) {
    if(!uri || uri == null || uri == '' || uri == ' ') return null;
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    // Create a reference in your storage
    const ref = firebase.storage().ref().child("quiz_images/" + filename);
    // const storageRef = ref(storage, "quiz_images/" + filename);
 
    return await ref.put(blob)
        .then((snapshot) => {
            // Once the upload is complete, retrieve the download URL.
            return snapshot.ref.getDownloadURL();
        })
        .then((downloadURL) => {
            console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
            return downloadURL;
        })
        .catch((error) => {
            console.log(`Failed to upload file and get link - ${error}`);
        });
}
