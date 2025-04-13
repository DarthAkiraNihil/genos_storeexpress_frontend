import { SignInForm } from 'components/auth/SignInForm'
import Grid from '@mui/material/Grid'
import React from 'react'

export const SignIn: React.FC = () => {
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
        </Grid>
    )
}