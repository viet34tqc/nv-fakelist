import { useEffect } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import { moviesSlicesAction } from 'src/features/movies/moviesSlice';

type Props = {};

const Browse = (props: Props) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(moviesSlicesAction.actionMoviesStart());
	});
	return <div>Browse</div>;
};

export default Browse;
