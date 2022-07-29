import { all, call, takeLatest } from 'redux-saga/effects';
import { moviesSlicesAction } from './moviesSlice';
import { request } from './request';

function* fetchActionMovies(): any {
	// Get data from API
	// If success, dispatch action fetchSuccess
	// Else, dispatch action fetch faile
	const data: any = yield call(
		fetch(request.fetchActionMovies)
			.then((res) => {
				const actionMovies = res.data.results.map((el) => ({
					...el,
					isFavourite: false,
				}));
				dispatch(moviesSlicesAction.actionMoviesSuccess(actionMovies));
			})
			.catch((error) => {
				const errorMessage = error.message;
				dispatch(moviesSlicesAction.actionMoviesError(errorMessage));
			})
	);
}

function* onFetchActionMovies() {
	yield takeLatest(moviesSlicesAction.actionMoviesStart, fetchActionMovies);
}

export function* moviesSaga() {
	yield all([onFetchActionMovies()]);
}
