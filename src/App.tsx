import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { Footer } from './components/Footer/Footer';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import MovieDetail from './components/MovieDetail/MovieDetail';
import './App.scss';


function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/movie/:movieId' element={<MovieDetail />} />
					<Route element={<PageNotFound />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
