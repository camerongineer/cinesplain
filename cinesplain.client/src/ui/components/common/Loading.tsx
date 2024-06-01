import DownIcon from "@assets/cinesplain_logo_down.svg?react";
import UpIcon from "@assets/cinesplain_logo_up.svg?react";
import CsLogoText from "@assets/cinesplain_text_logo.svg?react";
import { Stack, styled, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const StyledStack = styled(Stack)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
`;

const WobblingStack = styled(Stack)`
    width: clamp(200px, 50%, 500px);
    max-height: 80%;
    align-items: center;
    animation: wobble 4000ms infinite alternate;
    @keyframes wobble {
        0%,
        25% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(2deg);
        }
    }
`;

const StyledLogo = styled(CsLogoText)`
    width: clamp(230px, 80%, 800px);
    max-height: 20%;
    padding-top: 10px;
`;

const Loading = () => {
    const [degrees, setDegrees] = useState(0);
    const [initialState, setInitialState] = useState(true);
    const [splainingState, setSplainingState] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        setTimeout(() => {
            setInitialState(false);
        }, 150);
    }, []);

    useEffect(() => {
        const degreesIntervalId = setInterval(() => {
            setDegrees((prevDegrees) => (prevDegrees - 1) % 360);
        }, 10);

        const splainingIntervalId = setInterval(() => {
            setSplainingState((prevWagState) => !prevWagState);
        }, 450);

        return () => {
            clearInterval(degreesIntervalId);
            clearInterval(splainingIntervalId);
        };
    }, []);

    const getLoadingStyle = () => {
        return {
            minHeight: "100vh",
            alignItems: "center",
            background: `linear-gradient(${degrees}deg,
                  ${theme.palette.secondary.main}80,
                  ${theme.palette.secondary.main}55,
                  ${theme.palette.secondary.main}45,
                  ${theme.palette.secondary.main}55,
                  ${theme.palette.secondary.main}80),
                  ${theme.palette.background.default}`
        };
    };

    return (
        <StyledStack className="full center" style={getLoadingStyle()}>
            <WobblingStack>{splainingState || initialState ? <UpIcon /> : <DownIcon />}</WobblingStack>
            <StyledLogo />
        </StyledStack>
    );
};

export default Loading;
