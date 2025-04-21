import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import React from 'react';

interface RangeFilterProps {
    propertyKey: string;
    name: string;
    onChange: (key: string, _from: number, _to: number) => void;
}

export const RangeFilterComponent: React.FC< RangeFilterProps > = ({propertyKey, name, onChange} ) => {
    const [value, setValue] = React.useState<number[]>([0, 999999]);

    const handleChange = (event: Event, newValue: number[]) => {
        setValue(newValue);
        onChange(propertyKey, newValue[0], newValue[1]);
    };

    return (
        <Box>
            <Box display="flex">
                {name}:
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    'marginTop': '16px',
                    'marginBottom': '8px',
                }}
            >
                <TextField
                    label="От"
                    type={"number"}
                    value={value[0]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const first = parseInt(event.target.value, 10);
                        if (first >= 0) {
                            setValue([first, value[1]]);
                        }
                    }}
                />
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    min={0}
                    max={999999}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    sx={{
                        'marginLeft': '16px',
                        'marginRight': '16px',
                    }}
                />
                <TextField
                    label="До"
                    type={"number"}
                    value={value[1]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const second = parseInt(event.target.value, 10);
                        if (second >= 0) {
                            setValue([value[0], second]);
                        }
                    }}
                />
            </Box>

        </Box>
    );
}