# Quiz App 🫰🏻 

This is a mobile app (done in React Native) designed to provide users with a fun and interactive way to test their knowledge on various subjects they will encounter 
throughout their college years. The intention behind it is to make it easier for students at University of Bucharest to revise or learn when they are 
preparing for "sesiune".
Imagine you are studying for your next exam in Computer Networking and you'd like to evaluate yourself on how much you know so far. You can just open the
quiz app, login or register, select "join a quiz" and take as many quizzes as you feel like in order to better your understanding of the subject. The 
quizzes can either have generic questions that are meant to test your general knowledge about the basic concepts of that certain subject, or they can 
include questions from past exams. 
With this app we hope to improve our users grades and make them happy!😊 

## [App demo](https://www.youtube.com/watch?v=FWsIpYMRW84&ab_channel=Laurentiu)

## Requirements

- idk YET

## Installing
Once we are sure that our app is 100% responsive and all features are implemented and tested we will publish it on App Store/Play Store. 🧑🏼‍💻

## App description 
### 1. User stories
1. As a user, I want to see the welcome page the first time I start the app
2. As a user, I want to create an account to be able to save my progress and compare with others
3. As a user, I want to log in using my username/mail and password
4. As a user, I want to be able to reset my password if I forget it
5. As a user, I want to be able to log out of the app
6. As a user, I want to be able to create a new quiz
7. As a user, I want to be able to add questions and answers to quizzes
8. As a user, I want to be able to set a time limit or not for a quiz
9. As a user, I want to be able to edit and delete existing quizzes
10. As a user, I want to be able to search for a quiz
11. As a user, I want to be able to see all the quizzes I've taken, along with the score
12. As a user, I want to be able to view my total score
13. As a user of the quiz phone app, I want to be able to edit my profile information so that I can ensure that my personal details are accurate and up-to-date
14. As a user, I want to be able to see my quiz history, scores, and answers
15. As an admin, I want to have acces to all the actions on a quiz.

### 2. Backlog
In order to keep track of our progress and monitor our backlog we used Jira 👉🏼 [here](https://mdsproiect.atlassian.net/jira/software/projects/PRC/boards/2/backlog).
  TRE SA INSEREZ POZE DREPT DOVADA!!!!!

### 3. Starting features
- Login / Register
- See profile info (profile picture, number of points accumulated from quizzes, display name, email address, description)
- Edit profile info (profile picture, display name, description)
- Join a quiz
- See quiz history and progress
- See leaderboard 
- Create quiz
- Add title, description, picture, questions and timer to quiz
- Add answers, score and picture to questions 
- Edit quiz
- Delete quiz.

### 4. How the app works and what it does
When you open up the app you will see the welcome screen where you can either login or register. After login you will be redirected to the home screen where you can do the following: join a quiz, create quiz, view your quiz board or logout. From the home screen you can access your profile, the leaderboard and settings. Your profile will have your profile picture (editable), the number of points won from quizes, a display name (editable), your email address and a short description (editable). The leaderboard will show the users with the most number of points. When you want to join a quiz you will be redirected to JoinQuiz screen, where you can find all quizes available. When you choose to create a new quiz you will be redirected to CreateQuiz screen where you will be prompted to add a title, short description (optional), picture (optional), as many questions as you want (at least one, they cand also be multiple choice) and a timer (you can leave it turned off). The QuizBoard screen has two sections. One where you can see all info about the quizzes you created and one where you can see your quiz history and check your asnwers and your score. The settings menu allows you to update your account details, change login details and edit your own quizzes. The logout button will take you back to the welcome screen.

### 5. What we used to build our app
DE COMPLETAT!!!!!!!!!!!

### 6. App design 
We opted for a simple, VERY orange 🍊  look inspired by this design 👉🏼 [here](https://www.figma.com/file/kTc9kHRRnQmNL1vPLFNVbp/Queezy---Quiz-App-UI-Kit-(Community)?type=design&node-id=237-213). 
- **App icon**
- **Welcome screen**
- **Home screen**
- **Profile screen**
- **Leaderboard screen**
- **JoinQuiz screen**
- **CreateQuiz screen**
- **QuizBoard screen / My Quiz**
- **QuizBoard screen / General Quiz**
- **Settings screen**
TRE SA PUN POZE!!!!!!!!!!!!!

### 7. UML Use Case Diagram  
POZAAAAAAAAAA!!!

## Source control

### [Branches](https://github.com/Laurentiuq/ProiectMDS/branches/active)
CE FAC TOATE ASTEA??????????????
- feature/quiz-board
- bug_fixing
- search/else
- test/user-management
- join-quiz-feature
- tests
- feature/profile
- feature/edit-profile
- feature/login

### [Commits](https://github.com/Laurentiuq/ProiectMDS/commits)

## Testing
**1. Test welcome screen**
```
jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: jest.fn(),
        replace: jest.fn(),
    }),
}));

describe('WelcomeScreen', () => {
    it('renders correctly', () => {
        const { toJSON } = render(<WelcomeScreen />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('shows ActivityIndicator', () => {
        const { getByTestId } = render(<WelcomeScreen />);
        expect(getByTestId('activity-indicator')).toBeTruthy();
    });

    it('navigates to LoginOrSignupScreen after timeout', () => {
        const mockNavigation = { navigate: jest.fn(), replace: jest.fn() };
        jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue(mockNavigation);
        jest.spyOn(global, 'setTimeout').mockImplementation((cb) => cb());
        render(<WelcomeScreen />);
        expect(mockNavigation.replace).toHaveBeenCalledWith('LoginOrSignupScreen');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
```
**2. Test login or sign up screen**
```
jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: jest.fn(() => ({ navigate: jest.fn(), replace: jest.fn() })),
    };
});

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(() => ({
      onAuthStateChanged: jest.fn(),
    })),
  };
});

describe('LoginOrSignupScreen', () => {
    it('renders correctly', () => {
        const { toJSON } = render(<LoginOrSignupScreen />);
        expect(toJSON()).toMatchSnapshot();
    });


    it('navigates to Login screen on button press', () => {
        const mockNavigation = { navigate: jest.fn(), replace: jest.fn() };
        jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue(mockNavigation);
        const { getByTestId } = render(<LoginOrSignupScreen />);
        fireEvent.press(getByTestId('login-button'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
    });



    it('navigates to Register screen on button press', () => {
        const mockNavigation = { navigate: jest.fn(), replace: jest.fn() };
        jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue(mockNavigation);
        const { getByTestId } = render(<LoginOrSignupScreen />);
        fireEvent.press(getByTestId('register-button'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Register');
    });
});
```
**3. Test login screen**
```
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('firebase/auth', () => {
    return {
        getAuth: jest.fn(() => ({
            onAuthStateChanged: jest.fn(),
        })),
        signInWithEmailAndPassword: jest.fn(() => Promise.resolve('user')),
    };
});

describe('LoginScreen', () => {
    it('renders correctly', () => {
        const { toJSON } = render(<LoginScreen />);
        expect(toJSON()).toMatchSnapshot();
    });

    it('allows entering an email', () => {
        const { getByPlaceholderText } = render(<LoginScreen />);
        const input = getByPlaceholderText('Introduce your email');
        fireEvent.changeText(input, 'test@test.com');
        expect(input.props.value).toBe('test@test.com');
    });

    it('allows entering a password', () => {
        const { getByPlaceholderText } = render(<LoginScreen />);
        const input = getByPlaceholderText('Introduce your password');
        fireEvent.changeText(input, 'password123');
        expect(input.props.value).toBe('password123');
    });

    it('shows error for invalid email', async () => {
        const { getByPlaceholderText, getByText } = render(<LoginScreen />);
        const input = getByPlaceholderText('Introduce your email');
        fireEvent.changeText(input, 'test');


        fireEvent.press(getByText('Login'));
        await waitFor(() => {
            expect(getByText('Please enter a valid email address')).toBeDefined();
        });
    });

    it('shows error for invalid password', async () => {
        const { getByPlaceholderText, findByText, getByTestId } = render(<LoginScreen />);
        const emailInput = getByPlaceholderText('Introduce your email');
        fireEvent.changeText(emailInput, 'example@example.com');


        const input = getByPlaceholderText('Introduce your password');
        fireEvent.changeText(input, 'pass');

        fireEvent.press(getByTestId('loginButton'));
        const errorMessage = await findByText('Password must be at least 8 characters');
        expect(errorMessage).toBeDefined();
    });

    it('toggles password visibility', () => {
        const { getByText, getByPlaceholderText } = render(<LoginScreen />);
        const input = getByPlaceholderText('Introduce your password');
        expect(input.props.secureTextEntry).toBe(true);
        fireEvent.press(getByText('Show'));
        expect(input.props.secureTextEntry).toBe(false);
    });

    // it('navigates to ForgotPassword on button press', () => {
    //     const mockNavigation = jest.fn();
    //     const { getByText } = render(<LoginScreen navigation={{ navigate: mockNavigation }} />);
    //     fireEvent.press(getByText('Forgot password'));
    //     expect(mockNavigation).toHaveBeenCalledWith('ForgotPassword');
    // });
});
```
**4. Test register screen**
```
jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({
      user: {
        email: 'test@example.com',
        uid: '123',
      },
    })),
  };
});

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

describe('RegisterScreen', () => {
  const navigation = { navigate: jest.fn() };
  useNavigation.mockImplementation(() => navigation);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<RegisterScreen />);

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
  });

  it('updates state on email input', () => {
    const { getByPlaceholderText } = render(<RegisterScreen />);
    const emailInput = getByPlaceholderText('Email');

    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('updates state on password input', () => {
    const { getByPlaceholderText } = render(<RegisterScreen />);
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(passwordInput, 'password123');

    expect(passwordInput.props.value).toBe('password123');
  });

  it('updates state on confirm password input', () => {
    const { getByPlaceholderText } = render(<RegisterScreen />);
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.changeText(confirmPasswordInput, 'password123');

    expect(confirmPasswordInput.props.value).toBe('password123');
  });

  it('shows alert when passwords do not match', () => {
    const mockedAlert = jest.fn();
    global.alert = mockedAlert;
  
    const { getByPlaceholderText, getByText } = render(<RegisterScreen />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'test@example.com');
  
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
  
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password321');
    fireEvent.press(getByText('Register')); 
  
    expect(mockedAlert).toHaveBeenCalledWith("Passwords don't match.");
  });

  it('calls handleSignUp function when button is pressed', async () => {
    const { getByText, getByPlaceholderText } = render(<RegisterScreen />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const button = getByText('Register');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');
    fireEvent.press(button);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
});
```
**5. 2. Test home screen**
```
jest.mock('expo-image-picker');
jest.mock('@react-native-firebase/storage');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('@react-native-firebase/storage', () => 'storage');
jest.mock('firebase/compat/app');
jest.mock('firebase/compat/firestore');
jest.mock('@react-navigation/native');


describe('HomeScreen', () => {
    it('renders correctly with props', () => {
      const db = {
      };
      const { getByText } = render(
        <HomeScreen
          route={{ params: { db: db } }}
          navigation={{ navigate: jest.fn() }}
        />
      );
      const someText = getByText('Nume:');
      expect(someText).toBeTruthy();
    });

    test('navigates to CreateQuiz', async () => {
        const mockNavigation = { push: jest.fn() };
        const mockProps = {
            route: { params: { db: {} } },
            navigation: mockNavigation,
        };
        const { getByTestId } = render(<HomeScreen  {...mockProps} navigation={mockNavigation} />);

        debug();
        const createQuizButton = getByTestId('create-quiz-button');
        fireEvent.press(createQuizButton);
      });
    
    test('logout button works', async () => {
        const mockNavigation = { push: jest.fn() };
        const mockProps = {
            route: { params: { db: {} } },
            navigation: mockNavigation,
        };
        const { getByTestId } = render(<HomeScreen  {...mockProps} navigation={mockNavigation} />);
        const logoutButton = getByTestId('logout-button');
        fireEvent.press(logoutButton);
        const consoleLogSpy = jest.spyOn(console, 'log');

    });

    test('settings button works', async () => {
        const { getByTestId } = render(<IconButton />);
        const settingsButton = getByTestId('settings-button');
        fireEvent.press(settingsButton);
        const consoleLogSpy = jest.spyOn(console, 'log');

    });

    test('handleSettingsPress works', async () => {
        navigation = { push: jest.fn() };
        handleSettingsPress(navigation);
        const consoleLogSpy = jest.spyOn(console, 'log');
        expect(consoleLogSpy).toHaveBeenCalledWith('Settings pushed');

    });

    // test('render headerRight', async () => {
    //   const mockNavigation = { push: jest.fn() };
    //   const mockProps = {
    //       route: { params: { db: {} } },
    //       navigation: mockNavigation,
    //   };

    //   const { getByTestId, rerender } = render(<HomeScreen  {...mockProps} navigation={mockNavigation} />);
    //   // rerender(<HomeScreen  {...mockProps} navigation={mockNavigation} />)
    //   // rerender(<HomeScreen  {...mockProps} navigation={mockNavigation} />)
    //   await waitFor(() => expect(getByTestId('header-right')).toBeTruthy(), { timeout: 10000 });
    // });

  });
```
**6. Test profile screen**
```
const mockDb = {}; // Replace this with your mock database object

describe('ProfileScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText,getByTestId } = render(<ProfileScreen route={{ params: { db: mockDb } }} />);
    expect(getByText('Number of points:')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByTestId('display-name-id')).toBeTruthy();
    expect(getByTestId('description-id')).toBeTruthy();
  });

  it('updates state on display name input', () => {
    const { getByTestId } = render(<ProfileScreen route={{ params: { db: mockDb } }} />);
    const displayNameInput = getByTestId('display-name-id');
    fireEvent.changeText(displayNameInput, 'John Doe');
    expect(displayNameInput.props.value).toBe('');
  });

  it('updates state on description input', () => {
    const { getByTestId } = render(<ProfileScreen route={{ params: { db: mockDb } }} />);
    const descriptionInput = getByTestId('description-id');
    fireEvent.changeText(descriptionInput, 'Lorem ipsum dolor sit amet');
    expect(descriptionInput.props.value).toBe('');// TODO : should be the same
  });

//   it('triggers handleEditing function when edit button is pressed', () => {
//     const { getByText } = render(<ProfileScreen route={{ params: { db: mockDb } }} />);
//     const editButton = getByText('Edit');
//     const handleEditingMock = jest.fn();
//     fireEvent.press(editButton);
//     expect(handleEditingMock).toHaveBeenCalled();
//   });

//   it('triggers handleUpdateProfile function when save changes button is pressed', () => {
//     const { getByText } = render(<ProfileScreen route={{ params: { db: mockDb } }} />);
//     const saveChangesButton = getByText('Save Changes');
//     const handleUpdateProfileMock = jest.fn();
//     fireEvent.press(saveChangesButton);
//     expect(handleUpdateProfileMock).toHaveBeenCalled();
//   });
});
```
**7. Test create quiz**
```
jest.mock('expo-image-picker', () => ({
  requestCameraRollPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: jest.fn(),
}));

jest.mock()

describe('CreateQuiz', () => {
    test('render quiz name input', () => {
        const {getByPlaceholderText} = render(<CreateQuiz />);
        const quizNameInput = getByPlaceholderText('Quiz Name');
        expect(quizNameInput).not.toBeNull();
    });

    it('requests camera roll permissions and launches image library', async () => {
      ImagePicker.requestCameraRollPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
      ImagePicker.launchImageLibraryAsync.mockResolvedValueOnce({ uri: 'test-uri', cancelled: false });
      ImagePicker.MediaTypeOptions.mockResolvedValueOnce({ Images: 'test-images' });

      const setQuizPhoto = jest.fn();
      await handleAddPhoto(setQuizPhoto);
  
      expect(ImagePicker.requestCameraRollPermissionsAsync).toHaveBeenCalled();
      expect(setQuizPhoto).toHaveBeenCalledWith('test-uri');
    });

    it('outputs an alert if camera roll permissions are not granted', async () => {
      alertSpy = jest.spyOn(Alert, 'alert');
      ImagePicker.requestCameraRollPermissionsAsync.mockResolvedValueOnce({ status: 'denied' });
      ImagePicker.launchImageLibraryAsync.mockResolvedValueOnce({ uri: 'test-uri', cancelled: false });
      ImagePicker.MediaTypeOptions.mockResolvedValueOnce({ Images: 'test-images' });
      
      const setQuizPhoto = jest.fn();
      await handleAddPhoto(setQuizPhoto);
  
      expect(ImagePicker.requestCameraRollPermissionsAsync).toHaveBeenCalled();
      expect(setQuizPhoto).not.toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith('Sorry, we need camera roll permissions to make this work!');
    });

    //test setIsAddQuestion

    it('sets isAddQuestion to true', () => {
      const setIsAddQuestion = jest.fn();
      handleAddQuestion(setIsAddQuestion);
      expect(setIsAddQuestion).toHaveBeenCalledWith(true);
    });

    it('sets isAddQuestion to false', () => {
      const setIsAddQuestion = jest.fn();
      updateIsAddQuestion(false, setIsAddQuestion);
      expect(setIsAddQuestion).toHaveBeenCalledWith(false);
    });

});
```
**8. Test settings screen**
```
Enzyme.configure({ adapter: new Adapter() });

jest.mock('expo-image-picker');
jest.mock('@react-native-firebase/storage');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('@react-native-firebase/storage', () => 'storage');
jest.mock('firebase/compat/app');
jest.mock('firebase/compat/firestore');
jest.mock('@react-navigation/native');


describe('SettingsScreen', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<SettingsScreen />);
    });

    it('renders a ScrollView component', () => {
        expect(wrapper.find('ScrollView')).toHaveLength(1);
    })

    it('renders a TileItem component for updating account details', () => {
        // console.log(wrapper.find('TileItem').at(0).props());
        expect(wrapper.find('TileItem').at(0).props().mainText).toEqual('Update account details');
        expect(wrapper.find('TileItem').at(0).props().subtitle).toEqual('Username, Location etc');
        // expect(wrapper.find('TileItem').at(0).props().iconName).toEqual(require('../assets/arrowRight.png'));
        expect(wrapper.find('TileItem').at(0).props().onIconPress).toBeDefined();

    })

    it('renders a TileItem component for changing login details', () => {
        expect(wrapper.find('TileItem').at(1).prop('mainText')).toEqual('Change login details');
        expect(wrapper.find('TileItem').at(1).prop('subtitle')).toEqual('Email, password');
        expect(wrapper.find('TileItem').at(1).prop('onIconPress')).toBeDefined();

    })

    it('renders a TileItem component for changing quiz details', () => {
        expect(wrapper.find('TileItem').at(2).prop('mainText')).toEqual('Change quiz details');
        expect(wrapper.find('TileItem').at(2).prop('subtitle')).toEqual('Easy, medium, hard');
        expect(wrapper.find('TileItem').at(2).prop('onIconPress')).toBeDefined();
    })


    const navigation = {
        push: jest.fn(item => item),
        navigate: jest.fn()
    }

    it('handleIconPress function is called when icon is pressed', () => {
        handleIconPress('Profile', navigation);
        expect(navigation.push).toHaveBeenCalled();
        handleIconPress('UpdateLogin', navigation);
        expect(navigation.push).toHaveBeenCalled();
        handleIconPress('QuizSettings', navigation);
        // expect(naviagtion.navigate).toHaveBeenCalled();
    })

    it('logs the correct message to the console', () => {
        const spy = jest.spyOn(console, 'log');
        handleIconPress('Profile', navigation);
        expect(spy).toHaveBeenCalledWith('Icon pressed on Profile');
        handleIconPress('UpdateLogin', navigation);
        expect(spy).toHaveBeenCalledWith('Icon pressed on UpdateLogin');
        handleIconPress('QuizSettings', navigation);
        expect(spy).toHaveBeenCalledWith('Icon pressed on QuizSettings');
    })

    // test('calls onIconPress when icon is pressed', () => {
    //     const onIconPressMock = jest.fn();
    //     const TileItem = wrapper.find('TileItem').at(0);
    //     TileItem.props().onIconPress = onIconPressMock;
    //     TileItem.props().onIconPress();
    //     expect(onIconPress).toHaveBeenCalled();
    //     // expect(onIconPress).toHaveBeenCalled();
    //   });


    it('calls onIconPress with correct arguments when icon is pressed', () => {
        const wrapper = shallow(<SettingsScreen />);
        const TileItem = wrapper.find('TileItem').at(0);
        const TouchableOpacity = TileItem.children().find('TouchableOpacity');
        console.log(TileItem.children().debug());
      });
      
})
```
**9. Test sidebar**
```

jest.mock("react-native-vector-icons/MaterialIcons", () => "Icon");
jest.mock("@react-navigation/native")


describe("<Navbar />", () => {
    it("renders correctly", () => {
        const tree = renderer.create("<Navbar />").toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it("should render the Home, Profile, and Leaderboard buttons", () => {
        const { getByText } = render(<Navbar />);
        expect(getByText("Home")).not.toBeNull();
        expect(getByText("Profile")).not.toBeNull();
        expect(getByText("Leaderboard")).not.toBeNull();
    });

    test('goToProfile', () => {
        const navigation = { navigate: jest.fn() };
        goToProfile(navigation);
        expect(navigation.navigate).toHaveBeenCalledWith('Profile');
    });

    test('goToLeaderboard', () => {
        const navigation = { navigate: jest.fn() };
        goToLeaderboard(navigation);
        expect(navigation.navigate).toHaveBeenCalledWith('Leaderboard');
    });

    test('goToHome', () => {
        const navigation = { navigate: jest.fn() };
        goToHome(navigation);
        expect(navigation.navigate).toHaveBeenCalledWith('Home');
    });




    test('onPress', () => {
        const navigation = { navigate: jest.fn() };
        const wrapper = shallow(<Navbar />);
        wrapper.find('TouchableOpacity').at(0).props().onPress();
        wrapper.find('TouchableOpacity').at(1).props().onPress();
        wrapper.find('TouchableOpacity').at(2).props().onPress();

    });

});
```
**10. Test title item**
```
describe('<TileItem />', () => {
    it('renders correctly', () => {
        const tree = renderer.create('<TileItem />').toJSON();
        expect(tree).toMatchSnapshot();
    });
    const mainText = 'mainText';
    const subtitle = 'subtitle';

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the mainText and subtitle', () => {
        const { getByText } = render(<TileItem mainText={mainText} subtitle={subtitle} />);
        expect(getByText(mainText)).not.toBeNull();
        expect(getByText(subtitle)).not.toBeNull();
    });

});
```

## Bugs and conflicts
### For fixing bugs we created a different brach, [bug_fixing](https://github.com/Laurentiuq/ProiectMDS/tree/bug_fixing), where we would commit the code with the bug fixed, we would look over the changes and finally merge the pull request to the main branch. Here's an example of a bug we fixed:
[Edit profile only one character input solved](https://github.com/Laurentiuq/ProiectMDS/commit/67170c8e6f4b54412016cef959bf2bdf440a74da).
### Conflicts 
- [first conflict on Apr 25](https://github.com/Laurentiuq/ProiectMDS/commit/c798095d295db0e71140fabb4e7ea69f9a1c444a)
- [second conflict on Apr 25](https://github.com/Laurentiuq/ProiectMDS/commit/cb7eff7718275e2160287c64cbd68342a4a694d3)

## Refactoring, code standarts
For refactoring we extracted methods or functions by breaking down large, complex methods into smaller, more manageable pieces that perform specific tasks, we renamed variables, functions, or classes using descriptive and meaningful names to improve code readability and understandability, we removed code duplication etc. A few examples:
- [tests and refactorization](https://github.com/Laurentiuq/ProiectMDS/commit/bf0f7ce8d70dbc913557b733ffbdccced8f2cb49?diff=split#diff-cdb19b464fb98e7a322bdc831382ebcc18323fd8a428cc9c9df6c9ee68023a93)
- [refactoring with __mocks__](https://github.com/Laurentiuq/ProiectMDS/commit/8fcacb5a86903d98c00f497d19c809d8226e1483#diff-8154eceaddecad29e1feba5c605ce8707e4e446e760e342f04073575bd21de16)
- [settingsScreen tests and refactoring](https://github.com/Laurentiuq/ProiectMDS/commit/62a42ba4e19e09bb0698d1fd8074071614fa4cef#diff-cdb19b464fb98e7a322bdc831382ebcc18323fd8a428cc9c9df6c9ee68023a93)

## Comments explaining the code
### In order to make our code more readable and easy to understand we sprinkled 🧚🏼‍♀️ useful comments. Here's a few examples:
- ProfileScreen.js
```
// Pentru a modifica datele profilului in baza de date
    const handleUpdateProfile = async () => {
        setIsLoading(true);
        const auth = getAuth();
        const uid = auth.currentUser.uid;
        const userRef = db.collection('users').doc(uid);
        const imageResult = await uploadImage(profileImage);
        console.log('uploadProfileImage imageResult ', imageResult)
        if (!imageResult) imageResult = null;

        userRef.update({
            displayName: displayName,
            description: description,
            profileImage: imageResult,
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
```
- LoginOrSignupScreen.js
```

    // get the navigation object from useNavigation hook
    const navigation = useNavigation();


    // Redirect to HomeScreen if user logged in
    useEffect(() => {
        const auth = getAuth();
        const unsubcribe =
            auth.onAuthStateChanged((user) => {
                if (user) {
                    navigation.replace('Home');
                }
            })
        return unsubcribe;
    }, [])

    // GO to register screen when press register button
    const goToRegister = () => {
        navigation.navigate('Register');
    }

```
- TakeQuizScrenn.js
```
 // At every second, decrease the timer by 1
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(interval);
        onTimeout();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, onTimeout]);

  // Time is passed in seconds, this function formats it to minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

```

## The usage of an AI tool meant to help with software development 
In order to better our code, understand the sintax for React Native and fix bugs we used both GitHub Copilot and chatGPT 🦾🤖
DOVEZZIIIIIIIIIIIIIIIIIIIII!!!!!!!!!










