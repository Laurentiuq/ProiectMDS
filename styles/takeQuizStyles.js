import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9E0DD',
        padding: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F16956',
        marginBottom: 10,
    },

    description: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
    },

    questionContainer: {
        
    },

    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    optionButton: {
        padding: 10,
        borderColor: 'black',
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        color: 'black',
        borderColor: 'black',
    },
    
    selectedBorderColor: '#F16956',
    borderColor: 'black',
    correctBackgroundColor: 'green',
    incorrectBackgroundColor: 'red',
    correctNotSelectedBackgroundColor: 'yellow',

    correctAnswerContainer: {
        marginTop: 10,
        backgroundColor: '#FEDF5C',
        padding: 10,
        borderRadius: 8,
    },

    correctAnswerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F16956',
        marginBottom: 5,
    },

    correctAnswerOption: {
        
    },

    submitButton: {
        backgroundColor: '#F16956',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },

    disabledButtonColor: 'gray',
    submitButtonColor: 'blue',

    submitButtonText: {
        color: 'white',
        textAlign: 'center',
    },

    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F16956',
    },
});

export default styles;