import React, { SyntheticEvent } from 'react';
import Checkbox from "@mui/material/Checkbox";
import TextField from '@mui/material/TextField';
import {Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Box from "@mui/material/Box";

interface ChoiceFilterProps {
    key: string;
    name: string;
    choices: string[];
    onChange: (key: string, value: string[]) => void;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const ChoiceFilterComponent: React.FC<ChoiceFilterProps> = ({key, name, choices, onChange}) => {

    const handleChange = (
        event: SyntheticEvent<Element, Event>,
        value: string[],
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<string> | undefined): void => {
        console.log(value);
        onChange(key, value);
    }

    return (
        <Box sx={{ width: 300 }}>
            {name}:
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={choices}
                disableCloseOnSelect
                getOptionLabel={(option: string) => option}
                onChange={handleChange}
                renderOption={(props, option, { selected }) => {
                    const { key, ...optionProps } = props;
                    return (
                        <li key={key} {...optionProps}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option}
                        </li>
                    );
                }}
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} label={name} placeholder={name} sx={{marginTop: '16px'}} />
                )}
            />
        </Box>
    );
}