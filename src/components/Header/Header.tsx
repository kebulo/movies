import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.scss";
import Filters from '../Filters/Filters';

class Header extends React.Component {
	
	render() {
		return (
			<header className='header'>
				<Link to="/">
					<div className='logo'><i className='fas fa-film'></i>	Movie App</div>
				</Link>

				<Filters />
			</header>
		)
	}
}


export default Header;
