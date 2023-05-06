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
    },
    inputText: {
        backgroundColor: 'rgba(0,0,0,0)',
        opacity: 0.5,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: 'black',
        color: 'black',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    answerContainer: {  
        backgroundColor: 'rgba(0,0,0,0)',
        opacity: 0.5,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: 'black',
        color: 'black',
        padding: 5,
        marginTop: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputTextNoBorder: {
        backgroundColor: 'rgba(0,0,0,0)',
        opacity: 0.5,
        color: 'black',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // make the text start from the middle of the input
        textAlignVertical: 'center',
    },
    button: {
        backgroundColor: '#E39696',
        borderRadius: 11,
        borderWidth: 1,
        borderColor: 'black',
        color: 'black',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default styles;