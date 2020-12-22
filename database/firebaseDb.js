import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

const firebaseConfig = {
apiKey: 'AIzaSyCM7ktse3xCVSv0dLdQHP7k8E1bv11RTzY',
  authDomain: 'information-app-bd882.firebaseapp.com',
  databaseURL: 'https://information-app-bd882.firebaseio.com',
  projectId: 'information-app-bd882',
  storageBucket: 'information-app-bd882.appspot.com',
  messagingSenderId: '1062286162394',
  appId: '1:1062286162394:ios:bf1bab344c1091149568e3',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.firestore();

export default firebase;






