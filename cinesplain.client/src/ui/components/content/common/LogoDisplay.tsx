import { Box, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { getImagePath } from "../../../../api/moviesApi.ts";
import { LOGO_SIZE } from "../../../../constants/ImageSizes";
import Image from "../../../../types/image.ts";

interface LogoDisplayProps {
    logos: Image[];
    sx?: SxProps<Theme>;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ logos, sx }) => {
    const theme = useTheme();
    return (
        <Box
            component="img"
            width={{
                xs: "90%",
                md: theme.breakpoints.values.md,
                lg: theme.breakpoints.values.lg
            }}
            maxWidth={{
                md: 350,
                lg: "100%"
            }}
            maxHeight={{
                xs: 150,
                sm: 200
            }}
            mb={{
                xs: 3,
                sm: 2
            }}
            mt={{
                xs: 3,
                sm: 0
            }}
            sx={{
                ...sx,
                objectFit: "contain"
            }}
            src={getImagePath(logos[0].filePath, LOGO_SIZE.LG_W500)}
            alt="logo"
        />
    );
};

export default LogoDisplay;
