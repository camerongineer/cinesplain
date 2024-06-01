import { getImagePath } from "../api/moviesApi.ts";

export const getOverlaidImage = (overlayColor: string, imageUrl: string, imageSize: string) => {
    const bgOverlay = `linear-gradient(${overlayColor}80, ${overlayColor}50, ${overlayColor}80), `;
    return (
        bgOverlay +
        (imageUrl
            ? `linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url(${getImagePath(imageUrl, imageSize)})`
            : "")
    );
};
