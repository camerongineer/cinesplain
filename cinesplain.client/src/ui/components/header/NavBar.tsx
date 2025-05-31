import SearchIcon from "@mui/icons-material/Search";
import { Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import SlidingLogoDisplay from "./SlidingLogoDisplay";

interface NavBarProps {
    onSearchButtonClicked: () => void;
    animateLogo: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ onSearchButtonClicked, animateLogo }) => {
    return (
        <Grid container spacing={1} width="100%">
            <Grid size={{ xs: 4, sm: 4, lg: 2 }}>
                <Link to="/">
                    <SlidingLogoDisplay animateLogo={animateLogo} />
                </Link>
            </Grid>
            <Grid size={{ xs: 4, sm: 4 }} />
            <Grid size={{ xs: 3, sm: 3, lg: 5 }} />
            <Grid size={1} display="flex" justifyContent="end">
                <IconButton sx={{ marginLeft: "auto" }} onClick={onSearchButtonClicked} title="search">
                    <SearchIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default NavBar;
