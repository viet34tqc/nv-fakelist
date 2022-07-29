import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type moviesSliceData = {
	[key: string]: {
		loading: boolean;
		error: string;
		data: [];
	};
};

const initialState: moviesSliceData = {
	actionMovies: {
		loading: false,
		error: '',
		data: [],
	},
};

export const moviesSlices = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		actionMoviesStart(state) {
			state.actionMovies.loading = true;
		},
		actionMoviesSuccess(state, action: PayloadAction<[]>) {
			state.actionMovies.data = action.payload;
			state.actionMovies.loading = false;
			state.actionMovies.error = '';
		},
		actionMoviesError(state, action: PayloadAction<string>) {
			state.actionMovies.loading = false;
			state.actionMovies.error = action.payload;
		},
	},
});

export const moviesSlicesAction =  moviesSlices.actions;
export default moviesSlices.reducer
