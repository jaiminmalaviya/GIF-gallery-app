import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
   // apiKey: 'AIzaSyDmep7waR0xUD6aioItHMxf6CkZylmrUFM',
   // authDomain: 'gif-gallery-app.firebaseapp.com',
   // projectId: 'gif-gallery-app',
   // storageBucket: 'gif-gallery-app.appspot.com',
   // messagingSenderId: '70182562426',
   // appId: '1:70182562426:web:81ac9e842d9b74fa05a9c3',

   apiKey: process.env.FIREBASE_API_KEY,
   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
   projectId: process.env.FIREBASE_PROJECT_ID,
   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
