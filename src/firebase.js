import firebase from 'firebase'

const app = firebase.initializeApp({
	apiKey: "AIzaSyCbK8x65LtEf3F-D3Q6-91Qm0TBvYz-Zfo",
	authDomain: "dahn-games.firebaseapp.com",
	databaseURL: "https://dahn-games.firebaseio.com",
	projectId: "dahn-games",
	storageBucket: "dahn-games.appspot.com",
	messagingSenderId: "196867413085",
	appId: "1:196867413085:web:55b1ccd1017b90fdd2e9b4",
	measurementId: "G-MRLW0W9FXX"
})

export default app