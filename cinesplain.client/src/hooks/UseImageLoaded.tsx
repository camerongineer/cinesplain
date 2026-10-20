import { RefObject, useEffect, useState } from "react";

/*
 * Images server-rendered into the HTML can finish downloading before React
 * hydrates and attaches onLoad, so the callback never fires. Tracks both
 * fresh loads on the client and images that are already complete at
 * hydration time.
 */
const useImageLoaded = (imageRef: RefObject<HTMLImageElement | null>) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const image = imageRef.current;
        if (!image || !image.complete || image.naturalWidth === 0) {
            return;
        }
        setImageLoaded(true);
    }, [imageRef]);

    const markImageLoaded = () => {
        setImageLoaded(true);
    };

    return { imageLoaded, markImageLoaded };
};

export default useImageLoaded;
