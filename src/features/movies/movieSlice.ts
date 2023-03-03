import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";

interface initialStateValue {
    movies: any[],
    recommendedMovies: [],
    movie: object,
    isLoading: boolean,
    search: string
}

interface stateValue {
    movies: {
        movies: any[],
        movie: object,
        recommendedMovies: any[],
        isLoading: boolean,
        search: string
    }
}

const initialState: initialStateValue = {
    movies: [],
    recommendedMovies: [],
    movie: {},
    isLoading: true,
    search: ""
}

export const fetchAsyncMovies: any = createAsyncThunk(
    "movies/fetchAsyncMovies",
    async (term) => {
        const response: any = await movieApi.get(`?name_like=${term}`);
        return response.data;
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
            .addCase(fetchAsyncMovies.fulfilled, (state, {payload}) => {
                return { ...state, movies: payload, loading: false };
            })
            .addCase(fetchAsyncMovies.rejected, (state) => {
                return { ...state, loading: true };
            })
    }
});

export const { addRecommendedMovies, addMovie } = movieSlice.actions;
export const getAllMovies = (state: stateValue) => state.movies.movies;
export const getMovieDetail = (state: stateValue) => state.movies.movie;
export const getRecommendedMovies = (state: stateValue) => state.movies.recommendedMovies;

export default movieSlice.reducer;