import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies } from '../../features/movies/movieSlice';
import MovieListing from '../MovieListing/MovieListing';
import './Home.scss';

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAsyncMovies(""));
	}, []);


	return (
		<>
			<div>
				<iframe
					src="https://www.youtube.com/embed/hebWYacbdvc"
					title="Main page cover"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen></iframe>
			</div>

			<MovieListing />
		</>
	)
}

export default Home
