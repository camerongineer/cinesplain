import { Box, CardMedia, Stack, Typography, useTheme } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactNode, useRef } from "react";
import useImageLoaded from "../../../hooks/UseImageLoaded";

interface OverlaidImageBoxProps {
    overlayColor: string;
    overlayOpacity?: number;
    backgroundImageUrl: string;
    /** Cheap preview of the backdrop that paints while the large one fades in. */
    lowResolutionImageUrl?: string;
    imageGrayScalePercentage?: number;
    imageAlt: string;
    borderRadius?: string;
    bottomLabelText?: string;
    sx?: SxProps;
    children: ReactNode;
}

const OverlaidImageBox: React.FC<OverlaidImageBoxProps> = ({
    overlayColor,
    overlayOpacity = 0.35,
    backgroundImageUrl,
    lowResolutionImageUrl,
    imageGrayScalePercentage = 80,
    imageAlt,
    borderRadius = "0px",
    bottomLabelText = "",
    sx,
    children
}) => {
    const theme = useTheme();
    const highResolutionImageRef = useRef<HTMLImageElement>(null);
    const { imageLoaded: highResolutionImageLoaded, markImageLoaded: markHighResolutionImageLoaded } =
        useImageLoaded(highResolutionImageRef);

    const usesPreview = !!lowResolutionImageUrl && !!backgroundImageUrl;
    const colorOverlayStyle = {
        backgroundColor: overlayColor,
        opacity: overlayOpacity,
        zIndex: 1,
        borderRadius: borderRadius
    };

    const backgroundImageStyle = {
        backgroundImage: `url(${usesPreview ? lowResolutionImageUrl : backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: `grayscale(${imageGrayScalePercentage}%)`,
        borderRadius: borderRadius,
        overflow: "hidden"
    };

    return (
        <Stack
            sx={[
                {
                    position: "relative"
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            <Stack
                className="full"
                style={colorOverlayStyle}
                sx={{
                    position: "absolute"
                }}
            />
            <Stack
                className="full"
                style={backgroundImageStyle}
                sx={{
                    position: "absolute"
                }}
                role="img"
                aria-label={imageAlt}
            >
                {usesPreview && (
                    <CardMedia
                        component="img"
                        ref={highResolutionImageRef}
                        image={backgroundImageUrl}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        onLoad={markHighResolutionImageLoaded}
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: highResolutionImageLoaded ? 1 : 0,
                            transition: `opacity ${theme.transitions.duration.standard}ms ease-in-out`
                        }}
                    />
                )}
            </Stack>
            <Box
                style={{ userSelect: "none" }}
                sx={{
                    display: "block",
                    position: "absolute",
                    width: "100%",
                    textAlign: "right",
                    bottom: 0
                }}
            >
                <Typography
                    variant="overline"
                    color="white"
                    sx={{
                        fontSize: "x-small",
                        fontWeight: "bolder",
                        pr: 2
                    }}
                >
                    {bottomLabelText}
                </Typography>
            </Box>
            {children}
        </Stack>
    );
};

export default OverlaidImageBox;
