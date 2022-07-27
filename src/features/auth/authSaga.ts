import {
	signInWithEmailAndPassword,
	signInWithPopup,
	User,
} from 'firebase/auth';
import { DocumentReference, getDoc } from 'firebase/firestore';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
	auth,
	createUserProfileDocument,
	getCurrentUser,
	googleAuthProvider,
} from '../../app/firebase';
import { authActions } from './authSlice';

export function* getSnapshotFromUserAuth(
	userAuth: User,
	additionalData?: any
): any {
	try {
		const userRef: DocumentReference = yield call(
			createUserProfileDocument,
			userAuth,
			additionalData
		);
		const userSnapshot: any = yield getDoc(userRef);
		yield put(
			authActions.signInSuccess({
				...userSnapshot.data(),
				id: userSnapshot.id,
				createdAt: JSON.stringify(userSnapshot?.data().createdAt),
			})
		);
	} catch (e) {
		yield put(authActions.failure((e as Error).message));
	}
}

function* handleCheckIsLoggedIn() {
	try {
		const userAuth: User = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);
	} catch (e) {
		yield put(authActions.failure((e as Error).message));
	}
}

function* handleGoogleSignIn() {
	try {
		const { user } = yield signInWithPopup(auth, googleAuthProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (e) {
		yield put(authActions.failure((e as Error).message));
	}
}

function* handleEmailSignIn({ payload: { email, password } }: any) {
	try {
		const { user } = yield signInWithEmailAndPassword(auth, email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (e) {
		yield put(authActions.failure((e as Error).message));
	}
}

function* handleSignOut() {
	try {
		yield auth.signOut();
		yield put(authActions.signOutSuccess());
	} catch (e) {
		yield put(authActions.failure((e as Error).message));
	}
}
function* onCheckUserSession() {
	yield takeLatest(authActions.checkIsLoggedIn, handleCheckIsLoggedIn);
}
function* onGoogleSignInStart() {
	yield takeLatest(authActions.googlSignInstart, handleGoogleSignIn);
}
function* onEmailSignInStart() {
	yield takeLatest(authActions.emailSignInstart, handleEmailSignIn);
}
function* onSignOutStart() {
	yield takeLatest(authActions.signOutStart, handleSignOut);
}
function* onSignUpStart() {}
function* onSignUpSuccess() {}

export function* authSaga() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
	]);
}
