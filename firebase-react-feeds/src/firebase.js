import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCI468gTSxF22gRWd9UqIiTo2j1CKW6xUM",
    authDomain: "react-redux-feed.firebaseapp.com",
    databaseURL: "https://react-redux-feed.firebaseio.com",
    projectId: "react-redux-feed",
    storageBucket: "react-redux-feed.appspot.com"
};

firebase.initializeApp(firebaseConfig);