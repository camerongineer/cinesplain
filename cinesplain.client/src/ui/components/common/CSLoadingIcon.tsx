import DownIcon from "@assets/cinesplain_logo_down.svg?react";
import UpIcon from "@assets/cinesplain_logo_up.svg?react";
import { Box, styled } from "@mui/material";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface CSLoadingIconProps {
    width?: number | string | { [breakpoint: string]: number | string };
    height?: number | string;
    loadRotationMilliseconds?: number;
}

const StyledDownIcon = styled(DownIcon)`
    height: 100%;
`;

const StyledUpIcon = styled(UpIcon)`
    height: 100%;
`;

const CSLoadingIcon: React.FC<CSLoadingIconProps> = ({ loadRotationMilliseconds = 600, ...props }) => {
    const isPending = useRouterState({ select: (state) => state.status === "pending" });
    const [iconIndex, setIconIndex] = useState(0);

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | null = null;

        if (isPending) {
            intervalId = setInterval(() => {
                setIconIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
            }, loadRotationMilliseconds / 3);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isPending, loadRotationMilliseconds]);

    const getAnimationStyle = () => {
        if (isPending) {
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
            {isPending && iconIndex === 1 ? <StyledDownIcon /> : <StyledUpIcon />}
        </Box>
    );
};

export default CSLoadingIcon;
