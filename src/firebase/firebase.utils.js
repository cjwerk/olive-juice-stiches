import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBbYkUNetCdFYhm1bNfg5hmZ0_pO_YeZWE",
  authDomain: "olive-juice-stiches.firebaseapp.com",
  projectId: "olive-juice-stiches",
  storageBucket: "olive-juice-stiches.appspot.com",
  messagingSenderId: "966595714393",
  appId: "1:966595714393:web:36fbf00c0a46fb1f4f8048",
  measurementId: "G-8R4QT8P52M"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
