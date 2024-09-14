import SearchIcon from "@mui/icons-material/Search";
import { Grid2, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SlidingLogoDisplay from "./SlidingLogoDisplay";

interface NavBarProps {
    onSearchButtonClicked: () => void;
    animateLogo: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ onSearchButtonClicked, animateLogo }) => {
    return (
        <Grid2 container spacing={1} width="100%">
            <Grid2 size={{ xs: 4, sm: 4, lg: 2 }}>
                <Link to="/">
                    <SlidingLogoDisplay animateLogo={animateLogo} />
                </Link>
            </Grid2>
            <Grid2 size={{ xs: 4, sm: 4 }} />
            <Grid2 size={{ xs: 3, sm: 3, lg: 5 }} />
            <Grid2 size={{ xs: 1 }} display="flex" justifyContent="end">
                <IconButton sx={{ marginLeft: "auto" }} onClick={onSearchButtonClicked} title="search">
                    <SearchIcon />
                </IconButton>
            </Grid2>
        </Grid2>
    );
};

export default NavBar;
