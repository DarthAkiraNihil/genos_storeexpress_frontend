import Grid from '@mui/material/Grid'
import React from 'react'
import Button from "@mui/material/Button";
import {Link} from "react-router";
import { useAuth } from 'context';
import {SignUpIndividualForm, SignUpLegalForm} from "../../components/auth";

export const SignUpPage: React.FC = () => {

    const { signUp } = useAuth()

    const [isLegal, setIsLegal] = React.useState<boolean>(false)

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
                {
                    isLegal ? (
                        <SignUpLegalForm signUp={signUp} />
                    ) : (
                        <SignUpIndividualForm signUp={signUp} />
                    )
                }
            </Grid>
            <Grid size={3} sx={{paddingTop: 4}}>
                <Button variant="outlined" color="secondary" sx={{color: "black"}} onClick={() => setIsLegal(!isLegal)} fullWidth>
                    { isLegal ? "Я - физическое лицо" : "Я - юридическое лицо" }
                </Button>
            </Grid>
            <Grid size={3} sx={{paddingTop: 4}}>
                <Link to={"/sign_in"}>
                    <Button variant="outlined" color="secondary" sx={{color: "black"}} fullWidth>
                        На страницу входа
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}