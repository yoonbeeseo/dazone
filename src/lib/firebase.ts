import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

firebase.initializeApp(config);

const firestore = firebase.firestore;
const db = firestore();

const fireauth = firebase.auth;
const auth = fireauth();

const firestorage = firebase.storage;
const storage = firestorage();

export { firebase, firestore, db, fireauth, auth, firestorage, storage };

export enum FBCollection {
  USERS = "users",
  PRODUCTS = "products",
  ORDERS = "orders",
  CART = "cart",
}
