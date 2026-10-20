import { RefObject, useRef } from "react";
import { getImagePath } from "../api/moviesApi.ts";
import useImageLoaded from "./UseImageLoaded";

/*
 * Progressive image loading for server-rendered media: the SSR'd <img> src is
 * the small size, so the browser downloads and paints it almost immediately,
 * while the full-resolution source fades over it in a separately tracked
 * overlay <img> once it arrives.
 */
interface ProgressiveImage {
    lowRef: RefObject<HTMLImageElement | null>;
    highRef: RefObject<HTMLImageElement | null>;
    lowUrl: string;
    highUrl: string;
    lowLoaded: boolean;
    highLoaded: boolean;
    markLowLoaded: () => void;
    markHighLoaded: () => void;
}

const useProgressiveImage = (
    relativePath: string,
    lowSize: string,
    highSize: string
): ProgressiveImage => {
    const lowRef = useRef<HTMLImageElement>(null);
    const highRef = useRef<HTMLImageElement>(null);
    const { imageLoaded: lowLoaded, markImageLoaded: markLowLoaded } = useImageLoaded(lowRef);
    const { imageLoaded: highLoaded, markImageLoaded: markHighLoaded } = useImageLoaded(highRef);

    return {
        lowRef,
        highRef,
        lowUrl: getImagePath(relativePath, lowSize),
        highUrl: getImagePath(relativePath, highSize),
        lowLoaded,
        highLoaded,
        markLowLoaded,
        markHighLoaded
    };
};

export default useProgressiveImage;
