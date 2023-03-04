import { useNavigate } from 'react-router-dom';
import './MovieCard.scss';

export const MovieCard = (props: any) => {
	const { data } = props;
	const cover = require("./../../images/" + data.img);
	const navigate = useNavigate();

	return (
		<article className="card" onClick={e => navigate(`/movie/${data.id}`)}>
			<img src={cover} className="thumb" alt={data.name} />
			<div className="infos">
				<h2 className="title">{data.name}</h2>
				<h3 className="movie-lenght"><i className='fas fa-clock'></i> {data.length}</h3>
				<h3 className="rating"><i className='fas fa-star'></i> {data.rate}</h3>
				<p className="txt">{data.description}</p>
				<h3 className="details">See more</h3>
			</div>
		</article>
	)
}
