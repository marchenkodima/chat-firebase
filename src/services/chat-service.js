import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB3NgIGuI59uj2Lk2tzlgdowxZfRQHl4Hk',
  authDomain: 'chat-firebase-react-redux.firebaseapp.com',
  databaseURL: 'https://chat-firebase-react-redux.firebaseio.com',
  projectId: 'chat-firebase-react-redux',
  storageBucket: 'chat-firebase-react-redux.appspot.com',
  messagingSenderId: '256838111390',
  appId: '1:256838111390:web:73c458c3b2360ce55bab8f',
  measurementId: 'G-WQN96SL832',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const createUser = async (email, password) => {
  let error = null;
  await firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((e) => { error = e; });
  if (error) throw new Error(error.message);
  const data = {
    avatar: '',
    chats: [],
    name: '',
    online: true,
  };
  db.collection('users').doc(firebase.auth().currentUser.uid).set(data);
};

export default {
  createUser,
};
