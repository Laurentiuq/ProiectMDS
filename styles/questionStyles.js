import { StyleSheet } from "react-native-web";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        width: '85%',
        borderRadius: 20,
        padding: 20,
        backgroundColor: '#F16956',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelText: {
        fontSize: 15,
        fontWeight: 'bold',
        color:'white',
    },
    inputText: {
        backgroundColor: 'rgba(0,0,0,0)',
        fontWeight: 'bold',
        opacity: 0.5,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: 'white',
        color: 'white',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    answerContainer: {  
        backgroundColor: 'rgba(0,0,0,0)',
        fontWeight: 'bold',
        opacity: 0.5,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: 'white',
        color: 'white',
        padding: 5,
        marginTop: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputTextNoBorder: {
        backgroundColor: 'rgba(0,0,0,0)',
        opacity: 0.5,
        color: 'white',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // make the text start from the middle of the input
        textAlignVertical: 'center',
    },
    button: {
        backgroundColor: '#E39696',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'white',
        color: 'white',
        padding: 10,
        marginBottom: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default styles;