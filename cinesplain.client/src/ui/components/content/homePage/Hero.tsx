import { Stack, styled, Typography } from "@mui/material";
import CSLoadingIcon from "../../common/CSLoadingIcon";
import CSLogoText from "../../common/CSLogoText.tsx";

const StyledStack = styled(Stack)`
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1em;
    gap: 1em;
    margin: 2em 0 0;
    user-select: none;
    overflow-x: clip;
`;

const Hero: React.FC = () => {
    return (
        <StyledStack
            direction={{
                xs: "column",
                sm: "row"
            }}
        >
            <CSLoadingIcon
                width={{
                    xs: 110,
                    sm: 150
                }}
                loadRotationMilliseconds={1250}
            />
            <Stack alignItems="center" width="clamp(220px, 50%, 500px)">
                <CSLogoText width="90%" />
                <Typography variant="h6" pt={1}>
                    Your home for all-things cinema
                </Typography>
                <Typography variant="subtitle2">We've got some 'splaining to do...</Typography>
            </Stack>
        </StyledStack>
    );
};

export default Hero;
