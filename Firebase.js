import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDmep7waR0xUD6aioItHMxf6CkZylmrUFM',
    authDomain: 'gif-gallery-app.firebaseapp.com',
    projectId: 'gif-gallery-app',
    storageBucket: 'gif-gallery-app.appspot.com',
    messagingSenderId: '70182562426',
    appId: '1:70182562426:web:81ac9e842d9b74fa05a9c3',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
