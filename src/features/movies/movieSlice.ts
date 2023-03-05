import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";

interface initialStateValue {
    movies: any[],
    genres: any[],
    recommendedMovies: [],
    movie: object,
    isLoading: boolean
}

interface stateValue {
    movies: {
        genres: any;
        movies: any[],
        movie: object,
        recommendedMovies: any[],
        isLoading: boolean
    }
}

const initialState: initialStateValue = {
    movies: [],
    genres: [],
    recommendedMovies: [],
    movie: {},
    isLoading: true
}

/**
 * Get the genres based on the current movies on the DB (With a DB configured this would be get from a table avoiding this load of data)
 * @param movieData {Array} - Movie data to get the genres of
 * @returns genres {Array} - Genres filtered
 */
const getGenresFilter = (movieData: Array<any>): Array<any> => {
    let genres: Array<any> = [];

    movieData.forEach((movie: any) => {
        movie.genres.forEach((genre: string) => {
            if (genres.indexOf(genre) < 0) {
                genres.push(genre);
            }
        });
    });

    return genres;
}

/**
 * @param params {Object} - Filters {term - genre} to filter movies
 * @return {movies, genres} - Movies and genres from DB 
 */
export const fetchAsyncMovies: any = createAsyncThunk(
    "movies/fetchAsyncMovies",
    async (params: { term: string, genre: string }) => {
        const { term, genre } = params;

        let url_params = '';

        if (term && genre) {
            url_params += `?name_like=${term}&genres_like=${genre}`;
        } else {
            if (genre) {
                url_params += `?genres_like=${genre}`;
            }

            if (term) {
                url_params += `?name_like=${term}`;
            }
        }

        const response: any = await movieApi.get(url_params);
        let genres: Array<any> = [];

        if (response.data.length > 0) {
            genres = getGenresFilter(response.data);
        }

        return {movies: response.data, genres: genres};
    }
);

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addRecommendedMovies: (state, action) => {
            state.recommendedMovies = action.payload;
        },
        addMovie: (state, action) => {
            state.movie = action.payload;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncMovies.pending, (state) => {
                return { ...state, loading: true };
            })
            .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
                return { ...state, movies: payload.movies, genres: payload.genres, loading: false };
            })
            .addCase(fetchAsyncMovies.rejected, (state) => {
                return { ...state, loading: true };
            })
    }
});

export const { addRecommendedMovies, addMovie } = movieSlice.actions;
export const getAllMovies = (state: stateValue) => state.movies.movies;
export const getAllGenres = (state: stateValue) => state.movies.genres;

export const getMovieDetail = (state: stateValue) => state.movies.movie;
export const getRecommendedMovies = (state: stateValue) => state.movies.recommendedMovies;

export default movieSlice.reducer;