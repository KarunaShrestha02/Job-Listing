
import { initializeApp } from "firebase/app";

import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBNjG97t6HhRi_IAXh2k-U3TbBlf3tupWg",
  authDomain: "job-listing-application-b0aa7.firebaseapp.com",
  databaseURL: "https://job-listing-application-b0aa7-default-rtdb.firebaseio.com",
  projectId: "job-listing-application-b0aa7",
  storageBucket: "job-listing-application-b0aa7.firebasestorage.app",
  messagingSenderId: "343590740082",
  appId: "1:343590740082:web:2ec17860a90407fc14a2eb",
  measurementId: "G-YC1V3M305R"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set };
