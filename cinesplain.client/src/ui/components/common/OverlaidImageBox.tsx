import { Box, Stack, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactNode } from "react";

interface OverlaidImageBoxProps {
    overlayColor: string;
    overlayOpacity?: number;
    backgroundImageUrl: string;
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
    imageGrayScalePercentage = 80,
    imageAlt,
    borderRadius = "0px",
    bottomLabelText = "",
    sx,
    children
}) => {
    const colorOverlayStyle = {
        backgroundColor: overlayColor,
        opacity: overlayOpacity,
        zIndex: 1,
        borderRadius: borderRadius
    };

    const backgroundImageStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        alt: imageAlt,
        filter: `grayscale(${imageGrayScalePercentage}%)`,
        borderRadius: borderRadius
    };

    return (
        <Stack position="relative" sx={sx}>
            <Stack className="full" position="absolute" style={colorOverlayStyle} />
            <Stack className="full" position="absolute" style={backgroundImageStyle} />
            <Box
                display="block"
                position="absolute"
                width="100%"
                textAlign="right"
                bottom={0}
                style={{ userSelect: "none" }}
            >
                <Typography variant="overline" color="white" fontSize="x-small" fontWeight="bolder" pr={2}>
                    {bottomLabelText}
                </Typography>
            </Box>
            {children}
        </Stack>
    );
};

export default OverlaidImageBox;
