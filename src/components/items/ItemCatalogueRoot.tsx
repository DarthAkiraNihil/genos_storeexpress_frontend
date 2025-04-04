
import React from 'react';
import { Link } from "react-router-dom";
import { Grid } from "@mui/system";
import 'styles/Common.css'
import { ItemTypeIcons, ItemTypeNamesPrural, ItemTypeNames } from "const";
import { ImageBase64 } from "../common";
import Button from "@mui/material/Button";




export const ItemCatalogueRoot: React.FC = () => {

    return (
        <div className="center">

            <Grid container spacing={2} className="whyUs">
                {
                    Array.from(ItemTypeIcons.entries()).map( ([type, value])  => (
                        <Grid size={4}>
                            <Link to={`${type}`}>
                                <Button variant="contained" style={{maxWidth: '50%', maxHeight: '100%', minWidth: '50%', minHeight: '100%'}}>
                                    <ImageBase64 source={value} alt={ItemTypeNames.get(type)!} />
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
