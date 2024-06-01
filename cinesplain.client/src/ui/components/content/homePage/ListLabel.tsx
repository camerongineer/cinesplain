import { Stack, StackProps, styled, Typography } from "@mui/material";
import CSLoadingIcon from "../../common/CSLoadingIcon";

const StyledStack = styled(Stack)`
    flex-direction: row;
    justify-content: end;
    user-select: none;
`;

interface ListLabelProps extends StackProps {
    labelText: string;
}

const ListLabel: React.FC<ListLabelProps> = ({ labelText, ...props }) => (
    <StyledStack {...props}>
        <CSLoadingIcon height={30} loadRotationMilliseconds={Math.random() * 500 + 600} />
        <Typography component="label" variant="h5" pl={0.25}>
            {labelText}
        </Typography>
    </StyledStack>
);

export default ListLabel;
