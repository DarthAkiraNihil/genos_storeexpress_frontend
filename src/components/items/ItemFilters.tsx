import React, {useContext, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { ItemContext } from 'context/ItemContext'

import 'styles/items/ItemListCard.css'
import {FilterDescription, ItemFilter, FilterType} from "models/filter";
import { ItemType } from 'models/items/ItemType';
import Grid from "@mui/material/Grid";
import {ChoiceFilterComponent, RangeFilterComponent, HavingFilterComponent} from "components/filters";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import 'styles/Common.css'


interface ItemFiltersProps {
    type: ItemType;

    applyFiltersCallback: (filter: ItemFilter) => void;
    resetFiltersCallback: () => void;
}


export const ItemFilters: React.FC<ItemFiltersProps> = ( { type, applyFiltersCallback, resetFiltersCallback })=> {

    const context = useContext(ItemContext);
    const [filters, setFilters] = React.useState<FilterDescription[]>([]);
    const [builtFilter, setBuiltFilter] = React.useState<ItemFilter>();
    const [itemName, setItemName] = React.useState<string>();

    const onHavingFilterChange = (key: string, value: boolean) => {
        setBuiltFilter({...builtFilter, [key]: value});
    }

    const onRangeFilterChange = (key: string, _from: number, _to: number) => {
        setBuiltFilter({...builtFilter, [key]: {from: _from, to: _to}});
    }

    const onChoiceFilterChange = (key: string, selected: string[]) => {
        setBuiltFilter({...builtFilter, [key]: {selected: selected}});
    }

    useEffect(() => {
        context?.getFilterData(type).then((response) => { setFilters(response) })
    }, [type, context]);

    if (!context) {
        return <>No filters available</>
    }

    if (!filters) {
        return (
            <Card sx={{ display: 'flex', padding: '20px' }}>

                <Box display="flex" justifyContent="center">
                    <h2>
                        Для данного товара нет фильтров
                    </h2>
                </Box>

            </Card>
        );
    }

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
            >
                <h2>
                    Фильтры
                </h2>
            </AccordionSummary>
            <AccordionDetails>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    sx={{
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}>
                    <Grid size={12}>
                        <TextField
                            fullWidth
                            label="Поиск"
                            placeholder={"Введите название товара"}
                            value={itemName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setItemName(event.target.value);
                                setBuiltFilter({...builtFilter, ["name"]: event.target.value});
                            }}
                        />
                    </Grid>
                    {
                        filters.map((filter) => {
                            switch (filter.type) {
                                case FilterType.Choice: {
                                    return (
                                        <Grid size={6}>
                                            <ChoiceFilterComponent
                                                propertyKey={filter.name}
                                                name={filter.verbose_name}
                                                choices={filter.choices!}
                                                onChange={onChoiceFilterChange} />
                                        </Grid>
                                    )
                                }
                                case FilterType.Range: {
                                    return (
                                        <Grid size={6}>
                                            <RangeFilterComponent
                                                propertyKey={filter.name}
                                                name={filter.verbose_name}
                                                onChange={onRangeFilterChange} />
                                        </Grid>
                                    )
                                }
                                case FilterType.Having: {
                                    return (
                                        <Grid size={6}>
                                            <HavingFilterComponent
                                                propertyKey={filter.name}
                                                name={filter.verbose_name}
                                                onChange={onHavingFilterChange} />
                                        </Grid>
                                    )
                                }
                                default:
                                    return (<div />);
                            }
                        })
                    }
                </Grid>
            </AccordionDetails>
            <AccordionActions>
                <Button
                    onClick={() => {
                        setBuiltFilter({});
                        resetFiltersCallback();
                    }}
                >
                    Сбросить фильтры
                </Button>
                <Button onClick={() => {
                    if (!builtFilter) {
                        console.warn("something went wrong 'cause filter is undefined");
                        return;
                    }
                    applyFiltersCallback(builtFilter);
                }}>
                    Применить фильтры
                </Button>
            </AccordionActions>
        </Accordion>
    );
}