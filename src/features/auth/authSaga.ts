import { signInWithPopup } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
	auth,
	createUserProfileDocument,
	getCurrentUser,
	googleAuthProvider,
} from '../../app/firebase';
import { authActions } from './authSlice';

export function* getSnapshotFromUserAuth(
	userAuth: any,
	additionalData?: any
): any {
	try {
		const userRef = yield call(
			createUserProfileDocument,
			userAuth,
			additionalData
		);
		const userSnapshot = yield getDoc(userRef);
		yield put(
			authActions.signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
		);
	} catch (e: any) {
		yield put(authActions.failure(e.message));
	}
}

function* handleCheckIsLoggedIn(): any {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);
	} catch (e: any) {
		yield put(authActions.failure(e.message));
	}
}

function* handleGoogleSignIn() {
	try {
		const { user } = yield signInWithPopup(auth, googleAuthProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (e: any) {
		yield put(authActions.failure(e.message));
	}
}
function* onCheckUserSession() {
	yield takeLatest(authActions.checkIsLoggedIn, handleCheckIsLoggedIn);
}
function* onGoogleSignInStart() {
	yield takeLatest(authActions.googlSignInstart, handleGoogleSignIn);
}
function* onEmailSignInStart() {}
function* onSignOutStart() {}
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
