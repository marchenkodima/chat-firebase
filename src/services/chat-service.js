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

const signUpUser = async (email, password, name) => {
  let error = null;
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((e) => {
      error = e;
    });
  if (error) throw new Error(error.message);
  const data = {
    avatar: '',
    chats: [],
    name,
    online: true,
  };
  await db.collection('users')
    .doc(firebase.auth().currentUser.uid)
    .set(data);
  return firebase.auth().currentUser.uid;
};

const signInUser = async (email, password) => {
  let error = null;
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((e) => {
      error = e;
    });
  if (error) throw new Error(error.message);
  return firebase.auth().currentUser.uid;
};

const signOutUser = async () => {
  let error = null;
  await firebase
    .auth()
    .signOut()
    .catch((e) => {
      error = e;
    });
  if (error) throw new Error(error.message);
};

const getLatestMessage = async (chatId) => {
  let error = null;
  const messagesRef = db.collection('chats').doc(chatId).collection('messages');
  const messagesSnapshot = await messagesRef.orderBy('time')
    .limit(1)
    .get()
    .catch((e) => {
      error = e;
    });
  if (error) throw new Error(error.message);
  return messagesSnapshot.docs[0].data();
};

const getChatName = async (chatId) => {
  let error = null;
  const doc = await db.collection('chats')
    .doc(chatId)
    .get()
    .catch((e) => {
      error = e;
    });
  if (error) throw new Error(error.message);
  return doc.data().name;
};

const getUserData = async () => {
  let error = null;
  const doc = await db.collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .catch((e) => {
      error = e;
    });
  if (error) throw new Error(error.message);
  const chatsId = doc.data().chats;
  const chats = chatsId.map(async (chatId) => ({
    name: await getChatName(chatId),
    latestMessage: await getLatestMessage(chatId),
    chatId,
  }));
  return {
    ...doc.data(),
    chats: await Promise.all(chats),
  };
};

export default {
  signUpUser,
  signInUser,
  signOutUser,
  getUserData,
};
