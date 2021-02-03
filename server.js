
const firestore = require("firebase/firestore");
const firebase = require("firebase/app");
const firebaseConfig = {
  apiKey: "AIzaSyApAiVRRq3SfSKO6t9DjOeedTmY2xyRGaw",
  authDomain: "weatherapp-90a38.firebaseapp.com",
  databaseURL: "https://weatherapp-90a38-default-rtdb.firebaseio.com",
  projectId: "weatherapp-90a38",
  storageBucket: "weatherapp-90a38.appspot.com",
  messagingSenderId: "593248064220",
  appId: "1:593248064220:web:8a1fc733985cda292fda19",
  measurementId: "G-8XJ0PBCY0F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const express = require('express');
var cors = require('cors');
var https = require('https');
var crypto = require('crypto');
const fs = require('firebase-admin');
const db = firebase.firestore();

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.post('/login', async function (req, res) {
  try {
    const password = crypto.createHash('md5').update(req.body.password).digest('hex');
    const user = await db.collection('users')
    .where('username', '==', req.body.username)
    .where('password', '==', password)
    .get();
    if (user.empty) {
      return res.status(400).send('Cannot find user.');
    }
    user.forEach((user) => {
      console.log(user.data())
        res.json(user.data())
        res.status(200);
    });
  } catch (e) {
    res.end(e.message || e.toString());
  }
})

app.listen(3000)