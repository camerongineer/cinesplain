import DownIcon from "@assets/cinesplain_logo_down.svg?react";
import UpIcon from "@assets/cinesplain_logo_up.svg?react";
import { Box, BoxProps, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

interface CSLoadingIconProps extends BoxProps {
    loadRotationMilliseconds?: number;
}

const StyledDownIcon = styled(DownIcon)`
    height: 100%;
`;

const StyledUpIcon = styled(UpIcon)`
    height: 100%;
`;

const CSLoadingIcon: React.FC<CSLoadingIconProps> = ({ loadRotationMilliseconds = 600, ...props }) => {
    const navigation = useNavigation();
    const [iconIndex, setIconIndex] = useState(0);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (navigation.state === "loading") {
            intervalId = setInterval(() => {
                setIconIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
            }, loadRotationMilliseconds / 3);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [navigation.state, loadRotationMilliseconds]);

    const getAnimationStyle = () => {
        if (navigation.state === "loading") {
            return {
                animation: `wobble infinite ${loadRotationMilliseconds}ms alternate`,
                "@keyframes wobble": {
                    "0%": {
                        transform: "rotate(0deg)"
                    },
                    "100%": {
                        transform: "rotate(4deg)"
                    }
                }
            };
        } else {
            return {};
        }
    };

    return (
        <Box sx={getAnimationStyle()} {...props}>
            {navigation.state === "loading" && iconIndex === 1 ? <StyledDownIcon /> : <StyledUpIcon />}
        </Box>
    );
};

export default CSLoadingIcon;
