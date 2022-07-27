import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { LoginData } from './types';

export interface AuthState {
	loading: boolean;
	error: string | null;
	currentUser: any;
}

const initialState: AuthState = {
	loading: false,
	error: null,
	currentUser: null,
};

/*
- Define parent actions
signIn
signUp
signOut

- Define child actions
signInSuccess
signInFailure
signUpSuccess
signUpFailure
signOutSuccess
signOutFailure

*/

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		checkIsLoggedIn: (state) => {
			state.loading = true;
		},
		emailSignInstart: (state, action: PayloadAction<LoginData>) => {
			state.loading = true;
		},
		googlSignInstart: (state) => {
			state.loading = true;
		},
		signOutStart: (state) => {
			state.loading = true;
		},
		signUpStart: (state, action: PayloadAction<any>) => {
			state.loading = true;
		},
		signInSuccess: (state, action: PayloadAction<any>) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = null;
		},
		signOutSuccess: (state) => {
			state.currentUser = null;
			state.loading = false;
			state.error = null;
		},
		failure: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectAuthError = (state: RootState) => state.auth.error;

export const authActions = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
