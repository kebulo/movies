import React from 'react'
import { useSelector } from 'react-redux'
import { getAllMovies } from '../../features/movies/movieSlice'
import { MovieCard } from '../MovieCard/MovieCard';
import './MovieListing.scss'

const MovieListing = () => {
    const movies = useSelector(getAllMovies);

    return (
        <>
            <iframe 
                src="https://www.youtube.com/embed/hebWYacbdvc" 
                title="Main page cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen></iframe>

            <div className='movie-wrapper'>
                <div className='movie-list'>
                    <h2>Best movies at the best site</h2>
                    <div className='movie-container'>
                        {movies && movies.length && movies.map((movie: { id: React.Key | null | undefined; }) => <MovieCard key={movie.id} data={movie} />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieListing