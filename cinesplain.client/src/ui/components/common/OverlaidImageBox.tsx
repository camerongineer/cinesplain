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
            />
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
