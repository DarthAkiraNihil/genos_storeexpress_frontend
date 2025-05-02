
import React from 'react';
import { Link } from "react-router";
import { Grid } from "@mui/system";
import 'styles/Common.css'
import 'styles/items/ItemCatalogue.css'
import { ItemTypeIcons, ItemTypeNamesPrural, ItemTypeNames } from "../../const";
import { ImageBase64 } from "components/common";
import Button from "@mui/material/Button";


export const ItemCataloguePage: React.FC = () => {

    return (
        <div className="center itemCatalogueRoot">

            <Grid container spacing={2}>
                {
                    Array.from(ItemTypeIcons.entries()).map( ([type, value])  => (
                        <Grid size={4}>
                            <Link to={`${type}`}>
                                <Button variant="outlined" style={{maxWidth: '50%', maxHeight: '100%', minWidth: '50%', minHeight: '100%'}}>
                                    <p>
                                        <ImageBase64 source={value} alt={ItemTypeNames.get(type)!} />
                                    </p>
                                    <p>
                                        { ItemTypeNamesPrural.get(type) }
                                    </p>
                                </Button>
                            </Link>
                        </Grid>
                    ))
                }
            </Grid>

        </div>
    );
};
