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
  await db
    .collection('users')
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
  const messagesRef = db
    .collection('chats')
    .doc(chatId)
    .collection('messages');
  const messagesSnapshot = await messagesRef
    .orderBy('time', 'desc')
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
  const doc = await db
    .collection('chats')
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
  const doc = await db
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .catch((e) => {
      error = e;
    });
  if (error) throw new Error(error.message);
  const { avatar, name, online } = doc.data();
  return {
    avatar,
    name,
    online,
  };
};

const getChatsList = async () => {
  let error = null;
  const doc = await db
    .collection('users')
    .doc(firebase.auth().currentUser.uid)
    .get()
    .catch((e) => {
      error = e;
    });
  if (error) throw new Error(error.message);
  const chatsArray = doc.data().chats;
  const chats = chatsArray.map(async (chat) => ({
    name: await getChatName(chat.id),
    latestMessage: await getLatestMessage(chat.id),
    read: chat.read,
    chatId: chat.id,
  }));
  const chatsData = await Promise.all(chats);

  return chatsData.sort(
    (chat1, chat2) => chat1.latestMessage.time.seconds - chat2.latestMessage.time.seconds,
  );
};

const getChatData = async (chatId) => {
  let error = null;
  const chatRef = db.collection('chats').doc(chatId);

  const chatDoc = await chatRef.get().catch((e) => {
    error = e;
  });
  const chatData = chatDoc.data();

  if (error) throw new Error(error.message);

  const messagesSnapshot = await chatRef
    .collection('messages')
    .orderBy('time')
    .limit(50)
    .get()
    .catch((e) => {
      error = e;
    });
  const messages = messagesSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  if (error) throw new Error(error.message);

  const usersSnapshot = await chatRef
    .collection('users')
    .get()
    .catch((e) => {
      error = e;
    });
  const users = usersSnapshot.docs.map((doc) => doc.id);

  if (error) throw new Error(error.message);

  return {
    ...chatData,
    id: chatDoc.id,
    messages,
    users,
  };
};

const subscribeToLatestMessageChange = (chatId) => {
  const messagesRef = db
    .collection('chats')
    .doc(chatId)
    .collection('messages');

  return {
    on: (updateHandler) => {
      let firstUpdate = true;
      messagesRef.onSnapshot((messagesSnapshot) => {
        if (firstUpdate) {
          firstUpdate = false;
        } else {
          const messages = messagesSnapshot
            .docChanges()
            .map((changed) => changed.doc.data());
          const latestMessage = messages.sort(
            (msg1, msg2) => msg2.time.seconds - msg1.time.seconds,
          )[0];
          updateHandler({
            latestMessage,
            chatId,
          });
        }
      });
    },
  };
};

const postMessage = async (message, chatId) => {
  await db.collection('chats')
    .doc(chatId)
    .collection('messages')
    .add({
      document: '',
      message,
      read: false,
      sender: firebase.auth().currentUser.uid,
      time: firebase.firestore.Timestamp.now(),
    })
    .catch((e) => throw new Error(e));
};

export default {
  signUpUser,
  signInUser,
  signOutUser,
  getUserData,
  getChatData,
  getChatsList,
  subscribeToLatestMessageChange,
  postMessage,
};
