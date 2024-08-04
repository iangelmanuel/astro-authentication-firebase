import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDDmLnxliYqNtzDYFBOIaOxwwmhn6QhvBs",
  authDomain: "astro-authentication-ac09a.firebaseapp.com",
  projectId: "astro-authentication-ac09a",
  storageBucket: "astro-authentication-ac09a.appspot.com",
  messagingSenderId: "759202694462",
  appId: "1:759202694462:web:b57409bdec5f1c0ac6986f"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export const firebase = { app, auth }
