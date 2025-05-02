import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import { ItemContext } from 'context/ItemContext';
import { useParams, useSearchParams } from "react-router";
import Pagination from '@mui/material/Pagination';

import { Item, ItemType } from "models/items";
import { ItemListCard } from "components/items/ItemListCard";

import 'styles/Common.css'
import {PaginatedList} from "models";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import { ItemFilters } from "components/items";
import { ItemFilter } from 'models/filter/ItemFilter'
import Card from '@mui/material/Card';
import Typography from "@mui/material/Typography";

export const ItemListPage: React.FC = ( ) => {

    const [items, setItems] = useState<PaginatedList<Item>>();
    const [filters, setFilters] = useState<ItemFilter | undefined>();
    const [params] = useSearchParams();

    const { type } = useParams<{ type: ItemType }>();

    const context = useContext(ItemContext);

    useEffect(() => {
        console.log("item list use effect");
        if (params.has('pageNumber')) {
            context?.getList(type!, parseInt(params.get('pageNumber')!), 10, filters).then((response) => {
                setItems(response);
            })
        } else {
            context?.getList(type!, 0, 10, filters).then((response) => {
                setItems(response);
            })
        }
    }, [params, context, type, filters]);

    const handleChangePage = (event: ChangeEvent<unknown>, page: number): void => {
        setItems(undefined);
        context?.getList(type!, page, 10, filters).then((response) => {
            setItems(response);
        })
    }

    const applyFilters = (filter: ItemFilter): void => {

        /*const clean = (filter: ItemFilter): ItemFilter => {
            let cleaned: ItemFilter = {};
            for (const key in filter) {
                if ((filter[key] as ChoiceFilter)) {
                    if ((filter[key] as ChoiceFilter).selected.length !== 0) {
                        cleaned = {...cleaned, [key]: filter[key]};
                    }
                } else if (filter[key] as RangeFilter) {
                    cleaned = {...cleaned, [key]: filter[key]};
                } else if (filter[key] as boolean) {
                    cleaned = {...cleaned, [key]: filter[key]};
                }
            }
            return cleaned;
        }*/

        setFilters(filter);
        console.log(JSON.stringify(filter));
    }

    const resetFilters = (): void => {
        setFilters(undefined);
        console.log("resetFilters");
    }

    if (!context) {
        return <div>No context is available!</div>
    }

    if (!type) {
        return <div>No item type is specified</div>
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
                <ItemFilters
                    type={type}
                    resetFiltersCallback={resetFilters}
                    applyFiltersCallback={applyFilters}
                />
            </Box>

            <Card sx={{ display: 'flex', padding: '20px', justifyContent: "center", alignItems: "center" }} >
                <Stack className="list" spacing={8} >
                    <Box display="flex" justifyContent="center" alignItems="center">
                        {
                            items.items.length > 0 ? items.items.map((item) => {
                                    console.log(item);
                                    return (
                                        <div key={item.id} className="card">
                                            < ItemListCard
                                                id={item.id}
                                                name={item.name}
                                                model={item.model}
                                                price={item.price}
                                                imageUrl={context.getImageUrl(item.id)}
                                                rating={item.overall_rating}
                                                reviewsCount={item.reviews_count}
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
