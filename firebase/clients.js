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
  query,
  orderBy,
} from "firebase/firestore";

import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

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
 * @param {object} props - Props of parameter
 * @param {string} props.content - Content of the devit
 * @param {string} props.userId - Id of the user who created devit
 * @param {string} props.avatar - Avatar image of the user (profile pic)
 * @param {string} props.email - Email of the user
 * @param {string?} props.img - Attached image to devit
 * @returns {boolean} True if devit was added success
 */
export const addDevit = async ({
  content,
  userId,
  avatar,
  email,
  img = "",
}) => {
  // const time = new Timestamp();
  try {
    await addDoc(collection(database, "devits"), {
      content,
      userId,
      email,
      img,
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
 * Documentation get documents {@link https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection}
 * Documentation sort documents {@link https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection}
 * @returns {import("../types/context/UserContext").DevitI[]} Devits
 */

export const fetchLatestDevits = () => {
  const queryGetDevits = query(
    collection(database, "devits"),
    orderBy("createdAt", "desc")
  );

  return getDocs(queryGetDevits)
    .then((devits) => {
      const devitsGot = [];
      devits.forEach((devit) => {
        const data = devit.data();
        devitsGot.push({
          ...data,
          id: devit.id,
          normalizedDate: +data.createdAt.toDate(),
        });
      });
      return devitsGot;
    })
    .catch((e) => {
      console.log(e);
      return [];
    });
};

const storage = getStorage();

/**
 * More info about firebase method on {@link https://firebase.google.com/docs/storage/web/upload-files#upload_from_a_blob_or_file}
 * @param {File} file - File to upload
 * @returns {Promise<import("firebase/storage").UploadTaskSnapshot>} Upload result of the file image
 */
export const uploadImage = (file) => {
  const imageRef = ref(storage, `images/${file.name}`);

  return uploadBytesResumable(imageRef, file)
    .then((snapshoot) => {
      return snapshoot;
    })
    .catch((e) => console.log(e));
};
