import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

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

const getServerTime = () => firebase
  .database()
  .ref('/.info/serverTimeOffset')
  .once('value')
  .then(
    (date) => new firebase.firestore.Timestamp(
      Math.floor((date.val() + Date.now()) / 1000),
      0,
    ),
  );

const signUpUser = async (email, password, name) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);

  const data = {
    avatar: '',
    chats: [],
    name,
    online: true,
  };
  await db
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .set(data);

  return firebase.auth().currentUser.uid;
};

const signInUser = async (email, password) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);

  return firebase.auth().currentUser.uid;
};

const signOutUser = async () => {
  await firebase.auth().signOut();
};

const getUserData = async () => {
  const doc = await db
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get();
  const { avatar, name, online } = doc.data();
  return {
    avatar,
    name,
    online,
  };
};

const getChatMembers = async (chatId) => (await db
  .collection('chats')
  .doc(chatId)
  .collection('users')
  .get()).docs.map((doc) => doc.id);

const getChatData = async (chatId) => {
  const chatRef = db.collection('chats').doc(chatId);

  const chatData = (await chatRef.get()).data();
  const users = await getChatMembers(chatId);

  return {
    ...chatData,
    id: chatId,
    users,
  };
};

const getChatsList = async () => {
  const userChats = (await db
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()).data().chats;
  return Promise.all(userChats.map((chat) => getChatData(chat.id)));
};

const postMessage = async (message, chatId) => {
  db.collection('chats')
    .doc(chatId)
    .collection('messages')
    .add({
      document: '',
      message,
      read: false,
      sender: firebase.auth().currentUser.uid,
      time: await getServerTime(),
    });
};

const loadMessages = (chatId) => {
  const messagesRef = db
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .orderBy('time', 'desc');

  const query = messagesRef.limit(1);
  let last = null;

  return {
    onChange: (callback, errorHandler) => {
      query.onSnapshot((snapshot) => {
        last = last || snapshot.docs[snapshot.docs.length - 1];
        const messages = snapshot
          .docChanges()
          .filter((changed) => changed.type === 'added')
          .map((changed) => ({
            ...changed.doc.data(),
            id: changed.doc.id,
          }));
        callback({
          messages,
          id: chatId,
        });
      }, errorHandler);
    },
    loadMore: async () => {
      const { docs } = await messagesRef
        .startAfter(last)
        .limit(50)
        .get();
      if (docs.length === 0) throw new Error('All messages received');
      last = docs[docs.length - 1];
      const messages = docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .reverse();
      return {
        messages,
        id: chatId,
      };
    },
  };
};

export default {
  signUpUser,
  signInUser,
  signOutUser,
  getUserData,
  getChatData,
  postMessage,
  loadMessages,
  getChatsList,
};
