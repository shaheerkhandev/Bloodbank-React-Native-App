/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBPAEj0ku0YBF1DzCc1b6mGpEKz0Bhn9Fk",
    authDomain: "bloodbank-pro.firebaseapp.com",
    projectId: "bloodbank-pro",
    storageBucket: "bloodbank-pro.appspot.com",
    messagingSenderId: "533183192799",
    appId: "1:533183192799:web:82b1a608af84d64e6d536a",
    measurementId: "G-06F49XSLF4"
  };
  firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);
