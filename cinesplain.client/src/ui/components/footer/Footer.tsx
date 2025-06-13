import CopyrightDisplay from "@camerongineer/reuse/components/CopywriteDisplay.tsx";
import { Stack, styled } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import DataCreditDisplay from "./DataCreditDisplay.tsx";
import FooterLogoDisplay from "./FooterLogoDisplay.tsx";
import LibraryIconDisplay from "./LibraryIconDisplay.tsx";
import SourceCodeDisplay from "./SourceCodeDisplay.tsx";

const StyledContainer = styled(Stack)<{ 'data-visible'?: boolean }>`
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
    opacity: ${(props) => (props['data-visible'] ? 1 : 0)};
    transition: opacity 0.8s ease;
`;

const StyledContentWrapper = styled(Stack)`
    justify-content: space-between;
    align-content: center;
    max-width: ${(props) => props.theme.breakpoints.values.xl}px;
    padding: 2em 1em 0;
    width: 100%;
    gap: 1em;
`;


const Footer: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const queryClient = useQueryClient();
    
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (!visible && !queryClient.isFetching()) {
            timeoutId = setTimeout(() => {
                setVisible(true);
            }, 1000);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [visible, queryClient]);

    return (
        <StyledContainer className="center" data-visible={visible}>
            <StyledContentWrapper direction={{ md: "row" }}>
                <SourceCodeDisplay />
                <Stack justifyContent="space-evenly" spacing={0.5} margin=".5em 1em" order={{ xs: 1, md: 0 }}>
                    <FooterLogoDisplay />
                    <CopyrightDisplay startYear={2023} endYear={2025} onLogoClick={() => window.open("https://www.linkedin.com/in/c-em/", "_blank")} />
                    <LibraryIconDisplay />
                </Stack>
                <DataCreditDisplay />
            </StyledContentWrapper>
        </StyledContainer>
    );
};

export default Footer;
