import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies } from '../../features/movies/movieSlice';
import MovieListing from '../MovieListing/MovieListing';

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAsyncMovies(""));
	}, []);


	return (
		<>
			<MovieListing />
		</>
	)
}

export default Home
