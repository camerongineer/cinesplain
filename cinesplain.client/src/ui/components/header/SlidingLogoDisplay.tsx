import { Box, styled } from "@mui/material";
import CSLoadingIcon from "../common/CSLoadingIcon";
import CSLogoText from "../common/CSLogoText.tsx";

const SlidingLogo = styled(Box)`
    position: relative;
    width: 225px;

    @keyframes slideIn {
        0% {
            left: -1000%;
        }

        25% {
            left: -1000%;
        }

        100% {
            left: 0;
        }
    }
`;

interface SlidingLogoDisplayProps {
    animateLogo: boolean;
}

const SlidingLogoDisplay: React.FC<SlidingLogoDisplayProps> = ({ animateLogo }) => (
    <SlidingLogo
        display="flex"
        alignItems="center"
        sx={{
            animation: `${animateLogo ? "slideIn 2s forwards" : "none"}`
        }}
    >
        <CSLogoText />
        <CSLoadingIcon height={40} loadRotationMilliseconds={900} />
    </SlidingLogo>
);

export default SlidingLogoDisplay;
