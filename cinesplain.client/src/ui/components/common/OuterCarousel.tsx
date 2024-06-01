import { Stack, StackProps, styled } from "@mui/material";
import { ReactNode } from "react";

const StyledStack = styled(Stack)`
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: scroll;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.palette.secondary.main}20;
        border-radius: 20px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${(props) => props.theme.palette.secondary.main}10;
        border-radius: 20px;
    }
`;

interface OuterCarouselProps extends StackProps {
    children: ReactNode;
}

const OuterCarousel: React.FC<OuterCarouselProps> = ({ children, ...props }) => (
    <StyledStack className={"full center"} {...props}>
        {children}
    </StyledStack>
);

export default OuterCarousel;
