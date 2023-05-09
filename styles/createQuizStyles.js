import { StyleSheet } from "react-native-web";

const styles = StyleSheet.create({
    containerMain:{
        backgroundColor: '#F16956',
        width: '100%',
        height: '100%',

    },
    container: {
        // width: '100%',
        // height: '100%',
        backgroundColor: '#F16956',

    },
    containerQuestionForm: {
        marginTop: 10,
        flex: 1,
        borderColor: '#F16956',
        padding: 20,
        borderWidth: 15,
        borderRadius: 40,
        width: '100%',
        height: '100%',
        backgroundColor: '#E39696',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: 'rgba(0,0,0,0)',
        opacity: 0.5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        color: 'white',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        // flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        fontWeight: 'bold',
        opacity: 0.5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
        color: 'white',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        // flex: 1,
        width: 200,
        height: 50,
        backgroundColor: 'rgb(249,224,221)',
        // opacity: 0.5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#F16956',
        color: '#F16956',

        marginTop: 10,
        // marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    questionsScroll: {
        flex: 1,
        minWidth: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        borderRadius: 25,
        borderWidth: 1.5,
        borderColor: 'white',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    questionText: {
        flex: 1,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 20,
        backgroundColor: 'rgb(249,224,221)',
        opacity: 0.5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#F16956',
        color: 'red',
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'scroll',
    },

    answers: {
        fontWeight: 'bold',
        color:'white',
    }

});

export default styles;