import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB8YMeVVmdjWFEqiz9VkbMp8fIdqdiN3RE",
    authDomain: "itec-monitor.firebaseapp.com",
    projectId: "itec-monitor",
    storageBucket: "itec-monitor.appspot.com",
    messagingSenderId: "385979151657",
    appId: "1:385979151657:web:a3ade0c7ea28aae2db7338",
    measurementId: "G-F7RG7SFCH1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export {
    auth
}
