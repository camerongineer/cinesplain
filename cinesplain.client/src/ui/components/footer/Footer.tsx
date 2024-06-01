import { Stack, styled } from "@mui/material";
import CopyrightDisplay from "./CopyrightDisplay.tsx";
import DataCreditDisplay from "./DataCreditDisplay.tsx";
import FooterLogoDisplay from "./FooterLogoDisplay.tsx";
import LibraryIconDisplay from "./LibraryIconDisplay.tsx";
import SourceCodeDisplay from "./SourceCodeDisplay.tsx";

const StyledContainer = styled(Stack)`
    justify-content: center;
    align-content: center;
    min-height: 100px;
    width: 100%;
    margin-top: auto;
    padding: 2em 2em 0.5em;
    background: linear-gradient(
        180deg,
        #ffffff00,
        ${(props) => props.theme.palette.background.paper},
        ${(props) => props.theme.palette.background.paper},
        ${(props) => props.theme.palette.background.paper}
    );
`;

const StyledContentWrapper = styled(Stack)`
    justify-content: space-between;
    align-content: center;
    max-width: ${(props) => props.theme.breakpoints.values.xl}px;
    padding: 2em 1em 0;
    width: 100%;
    gap: 1em;
`;

const Footer: React.FC = () => (
    <StyledContainer className="center">
        <StyledContentWrapper direction={{ md: "row" }}>
            <SourceCodeDisplay />
            <Stack justifyContent="space-evenly" spacing={0.5} margin=".5em 1em" order={{ xs: 1, md: 0 }}>
                <FooterLogoDisplay />
                <CopyrightDisplay />
                <LibraryIconDisplay />
            </Stack>
            <DataCreditDisplay />
        </StyledContentWrapper>
    </StyledContainer>
);

export default Footer;
