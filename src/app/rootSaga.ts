import { all, call } from 'redux-saga/effects';
import { moviesSaga } from 'src/features/movies/moviesSaga';
import { authSaga } from '../features/auth/authSaga';

export default function* rootSaga() {
	yield all([call(authSaga), call(moviesSaga)]);
}
