import {Characteristics} from "models/items/DetailedItem";
import { ItemCharacteristicsNameMapper } from "services";
import Grid from "@mui/material/Grid";
import {ItemType} from "models/items";
import React from "react";
import Card from "@mui/material/Card";

interface ItemCharacteristicsProps {
    itemType: ItemType,
    characteristics: Characteristics
}

export const ItemCharacteristics: React.FC<ItemCharacteristicsProps> = ( {itemType, characteristics} ) => {
    return (
        <Card sx={{ display: 'flex', padding: '20px', alignItems: "center" }} aria-label={"characteristics"}>
            <Grid container spacing={2}>
                {
                    Array.from(ItemCharacteristicsNameMapper.mapCharacteristics(itemType, characteristics)).map(
                        ([k, v]) => (
                            <>
                                <Grid size={3} key={k} aria-label={`${k}-characteristic-key`}>
                                    {k}:
                                </Grid>
                                <Grid size={3} key={`${k}-value`} aria-label={`${k}-characteristic-value`}>
                                    {v}
                                </Grid>
                            </>
                        )
                    )
                }
            </Grid>
        </Card>
    )
}