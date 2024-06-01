import { Autocomplete, styled, TextField } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { ChangeEvent, SyntheticEvent } from "react";

const StyledTextField = styled(TextField)`
    fieldset {
        background: rgb(240, 240, 240, 0.5);
        z-index: -1;
    }
`;

interface SearchFieldProps {
    formId: string;
    searchQuery: string;
    autoCompleteList: string[];
    onQueryChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onQuerySubmit: (query: string) => void;
    labelText: string;
    sx?: SxProps<Theme>;
}

const SearchField: React.FC<SearchFieldProps> = ({
    formId,
    searchQuery,
    autoCompleteList,
    onQueryChange,
    onQuerySubmit,
    labelText,
    sx
}) => {
    const handleQuerySubmit = (event: SyntheticEvent<Element, Event>, value: string | null) => {
        event.preventDefault();
        onQuerySubmit(value || "");
    };

    return (
        <Autocomplete
            id={formId + "-autoComplete"}
            freeSolo
            options={autoCompleteList}
            onChange={handleQuerySubmit}
            renderInput={(params) => (
                <StyledTextField
                    value={searchQuery}
                    {...params}
                    id={formId}
                    component="form"
                    onChange={onQueryChange}
                    onSubmit={(event: { preventDefault: () => void }) => event.preventDefault()}
                    placeholder={labelText}
                    sx={sx}
                    variant="outlined"
                    fullWidth
                    autoFocus
                />
            )}
        />
    );
};

export default SearchField;
