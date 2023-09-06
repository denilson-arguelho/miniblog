import { initializeApp } from "firebase/app";
import{getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDQPC6favPbMEVGgQgZDzQrxmVL6o-qFh4",
  authDomain: "miniblog-3444f.firebaseapp.com",
  projectId: "miniblog-3444f",
  storageBucket: "miniblog-3444f.appspot.com",
  messagingSenderId: "423090387998",
  appId: "1:423090387998:web:9ef99b7ff1936e2bff820f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {db};
