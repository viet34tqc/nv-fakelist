import { all, call, put, takeLatest } from 'redux-saga/effects';
import moviesApi from './moviesApi';
import { moviesSlicesAction } from './moviesSlice';

function* fetchActionMovies(): any {
	// Get data from API
	// If success, dispatch action fetchSuccess
	// Else, dispatch action fetch faile
	try {
		const data = yield call(moviesApi.getActionMovies);
		const actionMovies = data.data.results.map((el: any) => ({
			...el,
			isFavourite: false,
		}));
		yield put(moviesSlicesAction.actionMoviesSuccess(actionMovies));
	} catch (error) {
		yield put(moviesSlicesAction.actionMoviesError((error as Error).message));
	}
}

function* onFetchActionMovies() {
	yield takeLatest(moviesSlicesAction.actionMoviesStart, fetchActionMovies);
}

export function* moviesSaga() {
	yield all([onFetchActionMovies()]);
}
