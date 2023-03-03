import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import movieApi from '../../common/apis/movieApi';
import { addMovie, addRecommendedMovies, getMovieDetail, getRecommendedMovies } from '../../features/movies/movieSlice';
import MovieRecommendations from '../MovieRecommendations/MovieRecommendations';
import './MovieDetail.scss';


const MovieDetail = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch();

    /**
     * Fetch and store recommended movies
     */
    const fetchRecommendedMovies = async () => {
        const response: any = await movieApi.get("");
        const shuffled = [...response.data].sort(() => 0.5 - Math.random());
        dispatch(addRecommendedMovies(shuffled.slice(0, 4)));
    }

    const fetchMovieDetailData = async (movieId: string) => {
        const response = await movieApi.get(`/${movieId}`);
        dispatch(addMovie(response.data));
    }

    useEffect(() => {
        if (movieId && movieId !== "") {
            fetchMovieDetailData(movieId);
            fetchRecommendedMovies();
        }
    }, [movieId]);

    const movie: any = useSelector(getMovieDetail);
    const recommendedMovies = useSelector(getRecommendedMovies);

    if (!('id' in movie)) {
        return <div>Is loading...</div>
    }

    const cover = require("./../../images/" + movie.img);

    return (
        <div className='movie-detail-main-container'>
            <h1>{movie.name}</h1>

            <div className='movie-detail-container'>
                <aside className='movie-cover'>
                    <img src={cover} alt={movie.name} />
                </aside>
                <section className='movie-info'>
                    <div>
                        <h3>Genres</h3>
                        <p>
                            {(movie.genres) ? movie.genres.map((genre: string) => genre + ' ') : 'Not Available'}
                        </p>
                    </div>

                    <div>
                        <h3>Duration</h3>
                        <p>{movie.length}</p>
                    </div>

                    <div>
                        <h3>Rate</h3>
                        <p>{movie.rate}</p>
                    </div>

                    <div>
                        <h3>Overview</h3>
                        <p>
                            {movie.description}
                        </p>
                    </div>
                </section>
            </div>
            <section className='movie-recommended-section'>
                <h2>Recommended Movies</h2>
                <MovieRecommendations recommendedMovies={recommendedMovies} />
            </section>
        </div>
    )
}

export default MovieDetail