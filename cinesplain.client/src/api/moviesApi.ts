import { SECURE_BASE_IMAGE_URL } from "../constants/ImageSizes.ts";
import Credits from "../types/credits.ts";
import Movie from "../types/movie.ts";
import OmdbMovieDetails from "../types/OmdbMovieDetails.ts";
import Person from "../types/person.ts";
import Video from "../types/video.ts";
import { retrieveData } from "./common.ts";

export const retrieveMovie = async (movieId: number): Promise<Movie | null> => {
    try {
        return await retrieveData(getMoviePath(movieId));
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const retrieveOmdbMovieDetails = async (imdbId: string): Promise<OmdbMovieDetails | null> => {
    try {
        return await retrieveData(getOmdbMovieDetailsPath(imdbId));
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const retrieveMovies = async (url: string): Promise<Movie[]> => {
    try {
        const res = await retrieveData(url);
        return res.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const retrievePopularMovieTitles = async (): Promise<string[] | null> => {
    try {
        const res = await retrieveData(getTop200MovieTitlesPath());
        return res.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const retrievePerson = async (personId: number): Promise<Person | null> => {
    try {
        return await retrieveData(getPersonPath(personId));
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const retrieveMovieTrailers = async (movieId: string): Promise<Video[] | null> => {
    try {
        const res = await retrieveData(getMovieTrailersPath(movieId));
        return res.data.results;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const retrieveCredits = async (movieId: number): Promise<Credits | null> => {
    try {
        return await retrieveData(getMovieCastPath(movieId));
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getImagePath = (relativePath: string, imageSize: string) =>
    `${SECURE_BASE_IMAGE_URL}${imageSize}${relativePath}`;

export const getMoviePath = (movieId: number) => `/api/movies/${movieId}`;
export const getOmdbMovieDetailsPath = (imdbId: string) => `/api/movies/omdb${imdbId}`;
export const getMovieTrailersPath = (movieId: string) => `/api/movies/${movieId}/trailers`;

export const getYouTubeTrailerPath = (videoKey: string) => `https://www.youtube.com/embed/${videoKey}`;
export const getImdbMoviePath = (imdbId: string) => `https://www.imdb.com/title/${imdbId}`;
export const getImdbPersonPath = (imdbId: string) => `https://www.imdb.com/name/${imdbId}`;

export const getMoviesSearchPath = (searchQuery: string) => `/api/movies/search?query=${searchQuery}`;
export const getPopularMoviesPath = (page: number) => `/api/movies/discover?page=${page}`;
export const getHomePageMoviesListsPath = () => "/api/movies/home_page_lists";
export const getTop200MovieTitlesPath = () => "/api/movies/top_200_titles";
export const getNowPlayingMoviesPath = () => "/api/movies/nowPlaying";
export const getUpcomingMoviesPath = () => "/api/movies/upcoming";
export const getClassicMoviesPath = () => "/api/movies/classics";
export const getMostLovedMoviesPath = () => "/api/movies/mostLoved";
export const getMostHatedMoviesPath = () => "/api/movies/mostHated";
export const getMovieCastPath = (movieId: number) => `/api/movies/${movieId}/credits`;
export const getSimilarMoviesPath = (movieId: number) => `/api/movies/${movieId}/similar`;
export const getRecommendedMoviesPath = (movieId: number) => `/api/movies/${movieId}/recommended`;
export const getPersonPath = (personId: number) => `/api/people/${personId}`;
