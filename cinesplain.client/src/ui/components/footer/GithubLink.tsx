import github from "@assets/github_logo.svg";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface GithubLinkProps {
    link: string;
    title: string;
}

const GithubLink: React.FC<GithubLinkProps> = ({ link, title }) => (
    <Stack component={Link} to={link} target="_blank" rel="noopener noreferrer" alignItems="center" direction="row">
        <Box component="img" height={15} pr={0.5} src={github as unknown as string} alt={`Link to ${title}`} />
        <Typography component="span" variant="overline" color="text.secondary" lineHeight={2}>
            {title}
        </Typography>
    </Stack>
);

export default GithubLink;
