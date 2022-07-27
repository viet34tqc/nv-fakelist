import { PayloadAction } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	User,
} from 'firebase/auth';
import { DocumentSnapshot } from 'firebase/firestore';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
	auth,
	createUserProfileDocument,
	getCurrentUser,
	getSnapshotFromUserAuth,
	googleAuthProvider,
} from '../../app/firebase';
import { authActions } from './authSlice';
import { RegisterData } from './types';

function* handleCheckIsLoggedIn(): any {
	try {
		const userAuth: User = yield getCurrentUser();
		if (!userAuth) return;
		const userSnapshot = yield getSnapshotFromUserAuth(userAuth);
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

function* handleGoogleSignIn() {
	try {
		const { user } = yield signInWithPopup(auth, googleAuthProvider);
		yield createUserProfileDocument(user);
		const userSnapshot: DocumentSnapshot = yield getSnapshotFromUserAuth(user);
		yield put(
			authActions.signInSuccess({
				...userSnapshot.data(),
				id: userSnapshot.id,
				createdAt: JSON.stringify(userSnapshot?.data()?.createdAt),
			})
		);
	} catch (e) {
		yield put(authActions.failure((e as Error).message));
	}
}

function* handleEmailSignIn({ payload: { email, password } }: any) {
	try {
		const { user } = yield signInWithEmailAndPassword(auth, email, password);
		const userSnapshot: DocumentSnapshot = yield getSnapshotFromUserAuth(user);
		yield put(
			authActions.signInSuccess({
				...userSnapshot.data(),
				id: userSnapshot.id,
				createdAt: JSON.stringify(userSnapshot?.data()?.createdAt),
			})
		);
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

function* handleSignUp({
	payload: { email, password, displayName },
}: PayloadAction<RegisterData>) {
	try {
		const { user } = yield createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		yield createUserProfileDocument(user, displayName);
		const userSnapshot: DocumentSnapshot = yield getSnapshotFromUserAuth(user);
		yield put(
			authActions.signInSuccess({
				...userSnapshot.data(),
				id: userSnapshot.id,
				createdAt: JSON.stringify(userSnapshot?.data()?.createdAt),
			})
		);
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
function* onSignUpStart() {
	yield takeLatest(authActions.signUpStart, handleSignUp);
}
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
