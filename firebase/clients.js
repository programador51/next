// import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCzrJXjggDjrBHzPQ-li5WGUFjTG2VfXY",

  authDomain: "devter-23058.firebaseapp.com",

  projectId: "devter-23058",

  storageBucket: "devter-23058.appspot.com",

  messagingSenderId: "635237544064",

  appId: "1:635237544064:web:9171a1193eed2180b27665",

  measurementId: "G-NL0R1XY79K",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

/**
 * Map the informatino for the login application
 * @param {import("firebase/auth").User} user - Information of the user logged with git hub
 * @returns {import("../types/context/UserContext").UserAppI}
 */
const mapInfoUserGh = (user) => ({
  email: user.email,
  urlProfilePic: user.photoURL,
});

/**
 * Get the information of the user logs in
 * @returns {import("firebase/auth").User} Information of the user
 */
export const loginWithGithub = async () => {
  const provider = new GithubAuthProvider();

  try {
    const userCredentials = await signInWithPopup(auth, provider);

    const credential = GithubAuthProvider.credentialFromResult(userCredentials);
    const token = credential.accessToken;

    const user = userCredentials.user;

    return mapInfoUserGh(user);
  } catch (error) {
    console.log(error);
  }
};

export const onAuthStateChangedState = (onChange = () => {}) => {
  return onAuthStateChanged(auth, (user) => {
    const userParsed = mapInfoUserGh(user);
    onChange(userParsed);
  });
  //   return onAuthStateChanged((user) => {
  //     const userParsed = mapInfoUserGh(user.user);
  //     onChange(userParsed);
  //   });
};
