import {
    useEffect,
    useState
} from "react";
import { getImagePath } from "../api/moviesApi.ts";
import { BACKDROP_SIZE } from "../constants/ImageSizes";
import Movie from "../types/movie.ts";

const useMovieBackdrop = (movie: Movie, imageSize: string = BACKDROP_SIZE.MAX): [string, boolean] => {
    const [backgroundImage, setBackgroundImage] = useState<string>("");
    const [backgroundImageLoading, setBackgroundImageLoading] = useState<boolean>(true);
    
    useEffect(() => {
        if (!movie) return;
        if (movie.backdropPath) {
            const backgroundImageUrl = backgroundImage;
            const backgroundImg = new Image();
            backgroundImg.src = backgroundImageUrl;
            backgroundImg.alt = `${movie.title} backdrop`;
            backgroundImg.onload = () => setBackgroundImageLoading(false);
        } else {
            setBackgroundImageLoading(false);
        }
    }, [backgroundImage, movie]);
    
    useEffect(() => {
        if (movie && movie.backdropPath) {
            setBackgroundImage(getImagePath(movie.backdropPath, imageSize));
        }
    }, [movie, imageSize]);
    return [backgroundImage, backgroundImageLoading];
};

export default useMovieBackdrop;