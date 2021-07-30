import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

// TODO: refactor to environment variables
const firebaseConfig = {
  apiKey: "AIzaSyAVyy0l7H9cN2TQe1Wxdq95bBQytP22b1o",
  authDomain: "link-agregator.firebaseapp.com",
  projectId: "link-agregator",
  storageBucket: "link-agregator.appspot.com",
  messagingSenderId: "478862145664",
  appId: "1:478862145664:web:4a63fcd386917c09438e65"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()
const database = firebase.database()

export { firebase, auth, database }