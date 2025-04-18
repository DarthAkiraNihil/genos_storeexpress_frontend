import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import { ItemContext } from 'context/ItemContext';
import { useParams, useSearchParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';

import { Item, ItemType } from "../../models/items";
import { ItemListCard } from "components/items/ItemListCard";

import 'styles/items/ItemList.css'
import {PaginatedList} from "../../models";
import Stack from "@mui/material/Stack";
import {textAlign} from "@mui/system";
import Box from '@mui/material/Box';

export const ItemListPage: React.FC = ( ) => {

    const [items, setItems] = useState<PaginatedList<Item>>();
    const [params, setParams] = useSearchParams();

    const { type } = useParams<{ type: ItemType }>();

    const context = useContext(ItemContext);

    useEffect(() => {
        if (params.has('pageNumber')) {
            context?.getList(type!, parseInt(params.get('pageNumber')!), 10).then((response) => {
                setItems(response);
            })
        } else {
            context?.getList(type!, 0, 10).then((response) => {
                setItems(response);
            })
        }
    }, [params, context, type]);

    const handleChangePage = (event: ChangeEvent<unknown>, page: number): void => {
        setItems(undefined);
        context?.getList(type!, page, 10).then((response) => {
            setItems(response);
        })
    }

    if (!context) {
        return <div>No context is available!</div>
    }

    if (!type) {
        return <div>No item type is specified</div>
    }

    if (!items || items.count === 0) {
        return <h1>
            Найдено 0 товаров типа {type}
        </h1>
    }

    return (
        <Stack className="list" spacing={8} >
            <Box display="flex" justifyContent="center">
                <h1>
                    Найдено {items.count} товаров типа {type}
                </h1>
            </Box>

            <Box display="flex" justifyContent="center">
                {
                    items.items.map((item) => {
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
                                    />
                                </div>
                            )
                        }
                    )}
            </Box>

            <Box display="flex" justifyContent="center">
                <Pagination count={Math.floor(items.count / 10) + 1} shape="rounded" onChange={handleChangePage}
                            sx={{justifyContent: "center", alignItems: "center"}} />
            </Box>

        </Stack>
    );
};
