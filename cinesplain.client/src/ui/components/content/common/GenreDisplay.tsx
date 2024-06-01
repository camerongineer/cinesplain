import { Button, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Genre from "../../../../types/genre.ts";

interface GenreDisplayProps {
    genres: Genre[];
    sx?: SxProps<Theme>;
}

const GenreDisplay: React.FC<GenreDisplayProps> = ({ genres, sx }) => (
    <>
        {genres.length > 0 && (
            <Typography sx={sx}>
                {genres.map((genre) => {
                    return (
                        <Button variant="contained" size="small" sx={{ m: 2 }} key={genre.name}>
                            {genre.name}
                        </Button>
                    );
                })}
            </Typography>
        )}
    </>
);

export default GenreDisplay;
