import OmdbMovieRating from "./OmdbMovieRating.ts";
import OmdbMovieRatingDetails from "./OmdbMovieRatingDetails.ts";

type OmdbMovieDetails = {
    title: string;
    year: string;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    poster: string;
    ratings: OmdbMovieRating[];
    ratingDetails: OmdbMovieRatingDetails;
    metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    type: string;
    dvd: string;
    boxOffice: string;
    production: string;
    website: string;
    response: string;
};

export default OmdbMovieDetails;