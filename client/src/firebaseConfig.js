import { initializeApp, getFirestore } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAHJRxkRCdk_K3mt4sfVI828J4-VGQOzjc",
  authDomain: "caregivingally.firebaseapp.com",
  projectId: "caregivingally",
  storageBucket: "caregivingally.firebasestorage.app",
  messagingSenderId: "573438037536",
  appId: "1:573438037536:web:6cf856808cfe139c41b645",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
