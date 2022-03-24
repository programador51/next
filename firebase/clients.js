import { initializeApp } from "firebase/app";
import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
} from "firebase/firestore";

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
const database = getFirestore(firebaseApp);

/**
 * Map the informatino for the login application
 * @param {import("firebase/auth").User} user - Information of the user logged with git hub
 * @returns {import("../types/context/UserContext").UserAppI}
 */
const mapInfoUserGh = (user) => ({
  email: user.email,
  urlProfilePic: user.photoURL,
  id: user.uid,
});

/**
 * Get the information of the user logs in
 * @returns {import("firebase/auth").User} Information of the user
 */
export const loginWithGithub = async () => {
  const provider = new GithubAuthProvider();

  try {
    const userCredentials = await signInWithPopup(auth, provider);

    GithubAuthProvider.credentialFromResult(userCredentials);

    const user = userCredentials.user;

    return mapInfoUserGh(user);
  } catch (error) {
    console.log(error);
  }
};

export const onAuthStateChangedState = (onChange = () => {}) => {
  return onAuthStateChanged(auth, (user) => {
    if (!user) return;

    const userParsed = mapInfoUserGh(user);
    onChange(userParsed);
  });
};

/**
 * Add a devit
 * @param {object} param0
 * @returns {boolean} True if devit was added success
 */
export const addDevit = async ({ content, userId, avatar, email }) => {
  // const time = new Timestamp();
  try {
    await addDoc(collection(database, "devits"), {
      content,
      userId,
      email,
      avatar,
      createdAt: Timestamp.now(),
      likesCount: 0,
      sharedCount: 0,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * Get the devits made on the system
 * More info here {@link https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection}
 * @returns {import("../types/context/UserContext").DevitI[]} Devits
 */

// console.log(definitions);

export const fetchLatestDevits = () => {
  return getDocs(collection(database, "devits"))
    .then((devits) => {
      const devitsGot = [];
      devits.forEach((devit) => {
        const data = devit.data();

        const normalizedDate = new Date(data.createdAt.seconds * 1000);

        const formatedDate = new Intl.DateTimeFormat("es-ES").format(
          normalizedDate
        );

        devitsGot.push({
          ...data,
          id: devit.id,
          normalizedDate: formatedDate,
        });
      });
      return devitsGot;
    })
    .catch((e) => {
      console.log(e);
      return [];
    });
};
