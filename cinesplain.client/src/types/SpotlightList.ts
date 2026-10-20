import Movie from "./movie.ts";

/*
 * A movie list accompanied by the spotlight seed used by the random-section
 * hooks. The seed is picked randomly on every fetch, so the server render and
 * the first client render agree (no swapped backdrop at hydration) while each
 * page load still features a different movie.
 */
type SpotlightList = {
    movies: Movie[];
    spotlightSeed: number;
};

export default SpotlightList;
