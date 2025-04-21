import {Characteristics} from "models/items/DetailedItem";
import { ItemCharacteristicsNameMapper } from "services";
import Grid from "@mui/material/Grid";
import {ItemType} from "models/items";
import Box from "@mui/material/Box";
import React from "react";

interface ItemCharacteristicsProps {
    itemType: ItemType,
    characteristics: Characteristics
}

export const ItemCharacteristics: React.FC<ItemCharacteristicsProps> = ( {itemType, characteristics} ) => {
    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <Grid container spacing={2}>
                {
                    Array.from(ItemCharacteristicsNameMapper.mapCharacteristics(itemType, characteristics)).map(
                        ([k, v]) => (
                            <>
                                <Grid size={3} key={k}>
                                    {k}:
                                </Grid>
                                <Grid size={3} key={`${k}-value`}>
                                    {v}
                                </Grid>
                            </>
                        )
                    )
                }
            </Grid>
        </Box>
    )
}