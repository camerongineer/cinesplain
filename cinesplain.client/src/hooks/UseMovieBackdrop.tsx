import { useEffect, useState } from "react";
import { getImagePath } from "../api/moviesApi.ts";
import { BACKDROP_SIZE } from "../constants/ImageSizes";
import Movie from "../types/movie.ts";

/*
 * Resolves the full-bleed backdrop for a movie in two sizes: the preview size
 * (fast to download) drives the "no longer loading" state so sections become
 * visible almost immediately, while the large backdrop is delivered for the
 * decorated high-resolution layer to fade in over the preview.
 */
const useMovieBackdrop = (
    movie: Movie,
    imageSize: string = BACKDROP_SIZE.LG_W1280,
    previewSize: string = BACKDROP_SIZE.SM_W300
): [string, string, boolean] => {
    const [backdropLoaded, setBackdropLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (!movie) return;
        if (movie.backdropPath) {
            const previewImg = new Image();
            previewImg.src = getImagePath(movie.backdropPath, previewSize);
            previewImg.onload = () => setBackdropLoaded(true);
        } else {
            // setState here preserves the original instant-show behavior for movies without a backdrop
            // oxlint-disable-next-line react/set-state-in-effect
            setBackdropLoaded(true);
        }
    }, [movie, previewSize]);

    const backdrop = movie?.backdropPath ? getImagePath(movie.backdropPath, imageSize) : "";
    const backdropPreview = movie?.backdropPath
        ? getImagePath(movie.backdropPath, previewSize)
        : "";
    return [backdrop, backdropPreview, backdropLoaded];
};

export default useMovieBackdrop;
