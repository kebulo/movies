import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchAsyncMovies } from '../../features/movies/movieSlice';
import "./Header.scss";

const Header = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const dispatch = useDispatch();

	const submitHandler = (e: { preventDefault: () => void; }) => {
		e.preventDefault();

		dispatch(fetchAsyncMovies(searchTerm));

		setSearchTerm("");
	};

	return (
		<header className='header'>
			<Link to="/">
				<div className='logo'>Movie App</div>
			</Link>

			<div className="search-bar">
				<form role="search" onSubmit={submitHandler}>
					<label htmlFor="search">Search for stuff</label>
					<input id="search" type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
					<button type="submit"><i className="fa fa-search"></i></button>
				</form>
			</div>
		</header>
	)
}

export default Header;
