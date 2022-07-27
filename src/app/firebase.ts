import {
	doc,
	DocumentReference,
	getDoc,
	getFirestore,
	setDoc,
} from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, User } from 'firebase/auth';

const {
	REACT_APP_FIREBASE_API_KEY,
	REACT_APP_FIREBASE_AUTH_DOMAIN,
	REACT_APP_FIREBASE_PROJECT_ID,
	REACT_APP_FIREBASE_STORAGE_BUCKET,
	REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	REACT_APP_FIREBASE_APP_ID,
} = process.env;

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: REACT_APP_FIREBASE_API_KEY,
	authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const getSnapshotFromUserAuth = async (userAuth: User) => {
	const userRef: DocumentReference = doc(firestore, `users/${userAuth.uid}`);
	return await getDoc(userRef);
};

// argument displayName is used only when signUp with email
export const createUserProfileDocument = async (userAuth: User, username?: string) => {
	const snapShot = await getSnapshotFromUserAuth(userAuth);

	if (!snapShot.exists()) {
		const { displayName, email, photoURL } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(doc(firestore, `users/${userAuth.uid}`), {
				displayName: displayName ?? username,
				email,
				photoURL,
				createdAt,
			});
		} catch (error) {
			console.log('error creating user', (error as Error).message);
		}
	}
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};
