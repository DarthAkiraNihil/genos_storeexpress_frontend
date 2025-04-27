import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {ItemContext} from 'context/ItemContext';
import Pagination from '@mui/material/Pagination';

import {Item, ItemType} from "models/items";

import 'styles/Common.css'
import {PaginatedList} from "models";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import {DiscountItemListCard} from "components/items";
import Card from '@mui/material/Card';
import Typography from "@mui/material/Typography";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const DiscountManagementPage: React.FC = ( ) => {

    const [items, setItems] = useState<PaginatedList<Item>>();
    const [type, setType] = useState<ItemType>(ItemType.ComputerCase);
    const [loading, setLoading] = useState<boolean>(true);

    const context = useContext(ItemContext);

    useEffect(() => {
        if (type) {
            context?.getList(type, 0, 10, {}).then((response) => {
                setItems(response);
                setLoading(false);
            })
        }
    }, [context, type]);

    const handleChangePage = (event: ChangeEvent<unknown>, page: number): void => {
        setLoading(true);
        context?.getList(type!, page, 10, {}).then((response) => {
            setItems(response);
            setLoading(false);
        })
    }

    const handleChangeSelect = (event: SelectChangeEvent) => {
        console.log(event.target.value);
        setType(event.target.value as ItemType);
    };

    if (!context) {
        return <div>No context is available!</div>
    }

    if (!items) {
        return <h1>
            Найдено 0 товаров типа {type}
        </h1>
    }

    return (
        <Stack className="list" spacing={8} sx={{marginTop: '32px'}}>
            <Box display="flex" justifyContent="center">
                <Typography variant="h4">
                    Найдено {items.count} товаров типа {type}
                </Typography>
            </Box>

            <Box display="flex" justifyContent="center">
                <Select
                    value={`${type}`}
                    label="Выберите вид товара"
                    onChange={handleChangeSelect}
                    fullWidth
                >
                    {
                        Object.values(ItemType).map((val) => (
                            <MenuItem value={val} key={val}> { val }</MenuItem>
                        ))
                    }
                </Select>

            </Box>

            <Card sx={{ display: 'flex', padding: '20px', justifyContent: "center", alignItems: "center" }} >
                <Stack className="list" spacing={8} >
                    <Box display="flex" justifyContent="center" alignItems="center">
                        {
                            items.items.length > 0 ? items.items.map((item) => {
                                    console.log(item);
                                    return (
                                        <div key={item.id} className="card">
                                            < DiscountItemListCard
                                                itemId={item.id}
                                                name={item.name}
                                                model={item.model}
                                                imageUrl={context.getImageUrl(item.id)}
                                                discount={item.active_discount}
                                            />
                                        </div>
                                    )
                                }
                            ) : (
                                <h3>
                                    Ничего не найдено :(
                                </h3>
                            )
                        }
                    </Box>

                    <Box display="flex" justifyContent="center">
                        <Pagination count={Math.floor(items.count / 10) + 1} shape="rounded" onChange={handleChangePage}
                                    sx={{justifyContent: "center", alignItems: "center"}} />
                    </Box>
                </Stack>
            </Card>

        </Stack>
    );
};
