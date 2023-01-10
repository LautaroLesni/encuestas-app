// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();

export const saveEncuesta = ({full_name, email, birth_date, country_of_origin, terms_and_conditions}) =>{
   addDoc(collection(db, 'encuesta'), {full_name, email, birth_date, country_of_origin, terms_and_conditions})
}

export const getEncuesta = async(callback) =>{
  const encuestas = []
  const querySnapshot = await getDocs(collection(db, 'encuesta'))

  querySnapshot?.forEach(doc =>{
    const encuesta = {...doc.data()}
    encuestas.push(encuesta)
  })
  return encuestas

}

export const onGetEncuesta = async(callback) =>{

 onSnapshot(collection(db,'encuesta'), callback)

}