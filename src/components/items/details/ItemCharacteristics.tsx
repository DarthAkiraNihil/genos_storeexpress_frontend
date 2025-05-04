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

    console.log(Array.from(ItemCharacteristicsNameMapper.mapCharacteristics(itemType, characteristics)))

    return (
        <Card sx={{ display: 'flex', padding: '20px', alignItems: "center" }} aria-label={"characteristics"}>
            <Grid container spacing={2}>
                {
                    Array.from(ItemCharacteristicsNameMapper.mapCharacteristics(itemType, characteristics)).map(
                        (value) => {
                            console.log(value)
                            return (
                                <>
                                    <Grid size={3} key={value[0]} aria-label={`${value[0]}-characteristic-key`}>
                                        {value[0]}:
                                    </Grid>
                                    <Grid size={3} key={`${value[0]}-value`}
                                          aria-label={`${value[0]}-characteristic-value`}>
                                        {value[1].toString()}
                                    </Grid>
                                </>
                            )
                        }
                    )
                }
            </Grid>
        </Card>
    )
}