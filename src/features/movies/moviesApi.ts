import axiosClient from 'src/app/axiosClient';
import { request } from './request';

const moviesApi = {
	getActionMovies() {
		return axiosClient.get(request.fetchActionMovies);
	},
};

export default moviesApi;
