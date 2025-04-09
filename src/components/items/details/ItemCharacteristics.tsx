import React from "react";
import Grid from "@mui/material/Grid";
import { ItemCharacteristicsNameMapper } from "../../../services";
import Box from "@mui/material/Box";
import {ItemType} from "../../../models/items";
import {Characteristics} from "../../../models/items/DetailedItem";

interface ItemCharacteristicsProps {
    itemType: ItemType,
    characteristics: Characteristics
}

export const ItemCharacteristics: React.FC<ItemCharacteristicsProps> = ( {itemType, characteristics} ) => {
    return <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        <Grid container spacing={2}>
            {
                Array.from(ItemCharacteristicsNameMapper.mapCharacteristics(itemType, characteristics)).map(
                    ([k, v]) => (
                        <>
                            <Grid size={3}>
                                {k}:
                            </Grid>
                            <Grid size={3}>
                                {v}
                            </Grid>
                        </>
                    )
                )
            }
        </Grid>
    </Box>
}