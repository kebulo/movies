import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { MovieCard } from '../MovieCard/MovieCard';
import 'swiper/css';
import './MovieRecommendations.scss';

const MovieRecommendations = (props: any) => {
    const { recommendedMovies } = props;

    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false
            }}
            breakpoints={{
                500: {
                    slidesPerView: 1
                },
                700: {
                    slidesPerView: 2
                },
                800: {
                    slidesPerView: 3
                }
            }}
        >
            {recommendedMovies && recommendedMovies.length && recommendedMovies.map((movie: { id: React.Key | null | undefined; }) => {
                return <SwiperSlide key={movie.id}><MovieCard class="swiper-slide" key={movie.id} data={movie} /></SwiperSlide>
            })}
        </Swiper>
    );
}

export default MovieRecommendations