import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import React from 'react';

interface HavingFilterProps {
    key: string;
    name: string;
    onChange: (key: string, value: boolean) => void;
}

export const HavingFilter: React.FC< HavingFilterProps > = ( {key, name, onChange} ) => {
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number[]) => {
        setValue(newValue);
        onChange(key, newValue[0], newValue[1]);
    };

    return (
        <Box sx={{ width: 300 }}>
            <Box display="flex">
                {name}:
            </Box>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />
        </Box>
    );
}