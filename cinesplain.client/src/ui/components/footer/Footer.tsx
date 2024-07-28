import CopyrightDisplay from "@camerongineer/reuse/components/CopywriteDisplay.tsx";
import { Stack, styled } from "@mui/material";
import DataCreditDisplay from "./DataCreditDisplay.tsx";
import FooterLogoDisplay from "./FooterLogoDisplay.tsx";
import LibraryIconDisplay from "./LibraryIconDisplay.tsx";
import SourceCodeDisplay from "./SourceCodeDisplay.tsx";

const StyledContainer = styled(Stack)(({ theme }) => ({
    justifyContent: "center",
    alignContent: "center",
    minHeight: "100px",
    width: "100%",
    marginTop: "auto",
    padding: "2em 2em 0.5em",
    background: `linear-gradient(180deg, #ffffff00, ${theme.palette.background.paper}, ${theme.palette.background.paper}, ${theme.palette.background.paper})`,
}));

const StyledContentWrapper = styled(Stack)(({ theme }) => ({
    justifyContent: "space-between",
    alignContent: "center",
    maxWidth: `${theme.breakpoints.values.xl}px`,
    padding: "2em 1em 0",
    width: "100%",
    gap: "1em",
}));

const Footer: React.FC = () => (
    <StyledContainer className="center">
        <StyledContentWrapper direction={{ md: "row" }}>
            <SourceCodeDisplay />
            <Stack justifyContent="space-evenly" spacing={0.5} margin=".5em 1em" order={{ xs: 1, md: 0 }}>
                <FooterLogoDisplay />
                <CopyrightDisplay startYear={2023} endYear={2024} onLogoClick={() => window.open("https://www.linkedin.com/in/c-em/", "_blank")} />
                <LibraryIconDisplay />
            </Stack>
            <DataCreditDisplay />
        </StyledContentWrapper>
    </StyledContainer>
);

export default Footer;
