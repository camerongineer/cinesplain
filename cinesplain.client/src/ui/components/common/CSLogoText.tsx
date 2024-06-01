import CSText from "@assets/cinesplain_text_logo.svg?react";
import { alpha, styled } from "@mui/material";
import { SVGProps } from "react";

const StyledCSText = styled(CSText)<CSLogoTextProps>`
    .cls-cine {
        fill: ${({ theme, color }) => (color ? color : alpha(theme.palette.text.primary, 0.85))};
    }
`;

interface CSLogoTextProps extends SVGProps<any> {
    color?: string;
}

const CSLogoText: React.FC<CSLogoTextProps> = (props) => {
    return <StyledCSText {...props} />;
};

export default CSLogoText;
