import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "secondary.main",
                paddingTop: "2rem",
                paddingBottom: "1rem",
                bottom: 0,
            }}
        >
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    <Grid size={12}>
                        <Typography color="black" variant="h5">
                            GenosStorExpress
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Typography color="textSecondary" variant="subtitle1">
                            {`${new Date().getFullYear()} | GS CO., powered by D.A.N. Corporation Alliance | Akira Nihil | All Rights Reserved`}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};