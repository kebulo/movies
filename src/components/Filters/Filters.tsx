import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncMovies, getAllGenres } from '../../features/movies/movieSlice';
import './Filters.scss';

const Filters = () => {
    const genres = useSelector(getAllGenres);

    const [searchTerm, setSearchTerm] = useState("");
    const [genreTerm, setGenreTerm] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        dispatch(fetchAsyncMovies({ term: searchTerm, genre: genreTerm }));

        setSearchTerm("");
    };

    return (
        <div className='filter-container'>
            <form className='filter-form' role="search" onSubmit={submitHandler}>
                <div className="search-bar">
                    <input id="search" type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search Movie" />
                </div>

                <div className='select-genre'>
                    <select value={genreTerm} onChange={(e) => setGenreTerm(e.target.value)} name="genre" id="genre">
                        <option value="">All Genres</option>
                        {genres.map((genre: string) => (<option key={genre} value={genre}>{genre}</option>))}
                    </select>
                    <button>
                        <i className='fas fa-search'></i>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Filters