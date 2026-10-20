import { getImagePath } from "../api/moviesApi.ts";
import { BACKDROP_SIZE } from "../constants/ImageSizes";
import Movie from "../types/movie.ts";

/*
 * Resolves the full-bleed backdrop for a movie in two sizes: the preview size
 * (fast to download) is displayed right away while the large backdrop is
 * delivered for the decorated high-resolution layer to fade in over the
 * preview.
 */
const useMovieBackdrop = (
    movie: Movie,
    imageSize: string = BACKDROP_SIZE.LG_W1280,
    previewSize: string = BACKDROP_SIZE.SM_W300
): [string, string] => {
    const backdrop = movie?.backdropPath ? getImagePath(movie.backdropPath, imageSize) : "";
    const backdropPreview = movie?.backdropPath
        ? getImagePath(movie.backdropPath, previewSize)
        : "";
    return [backdrop, backdropPreview];
};

export default useMovieBackdrop;
