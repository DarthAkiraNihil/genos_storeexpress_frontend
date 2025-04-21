import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';

interface HavingFilterProps {
    key: string;
    name: string;
    onChange: (key: string, value: boolean) => void;
}

export const HavingFilterComponent: React.FC< HavingFilterProps > = ({key, name, onChange} ) => {
    const [checked, setChecked] = React.useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        onChange(key, event.target.checked);
    };

    return (
        <Box sx={{ width: 300 }}>
            {name}:
            <Checkbox
                checked={checked}
                onChange={handleChange}
            />
        </Box>
    );
}