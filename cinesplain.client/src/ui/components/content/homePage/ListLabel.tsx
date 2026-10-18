import { Stack, styled, Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import CSLoadingIcon from "../../common/CSLoadingIcon";

const StyledStack = styled(Stack)`
    flex-direction: row;
    justify-content: end;
    user-select: none;
`;

/* Randomized once at module load so the rotation speed is stable across re-renders */
const randomLoadRotationMilliseconds = Math.random() * 500 + 600;

interface ListLabelProps {
    labelText: string;
    sx?: SxProps<Theme>;
}

const ListLabel: React.FC<ListLabelProps> = ({ labelText, sx }) => (
    <StyledStack sx={sx}>
        <CSLoadingIcon height={30} loadRotationMilliseconds={randomLoadRotationMilliseconds} />
        <Typography
            component="label"
            variant="h5"
            sx={{
                pl: 0.25
            }}
        >
            {labelText}
        </Typography>
    </StyledStack>
);

export default ListLabel;
