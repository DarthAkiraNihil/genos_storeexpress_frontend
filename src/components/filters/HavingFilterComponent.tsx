import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';

interface HavingFilterProps {
    propertyKey: string;
    name: string;
    onChange: (key: string, value: boolean) => void;
}

export const HavingFilterComponent: React.FC< HavingFilterProps > = ({propertyKey, name, onChange} ) => {
    const [checked, setChecked] = React.useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        onChange(propertyKey, event.target.checked);
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