import { SignInForm } from 'components/auth/SignInForm'
import Grid from '@mui/material/Grid'
import React from 'react'
import Button from "@mui/material/Button";
import {ImageBase64} from "../../components/common";
import {ItemTypeNames, ItemTypeNamesPrural} from "../../const";
import {Link} from "react-router-dom";

export const SignInPage: React.FC = () => {
    return  (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '80vh' }}
        >
            <Grid size={3}>
                <SignInForm />

            </Grid>
            <Grid size={3} sx={{paddingTop: 4}}>
                <Link to={"/sign_up"}>
                    <Button variant="outlined" color="secondary" sx={{color: "black"}} fullWidth>
                        Нет аккаунта? Зарегистрироваться
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}