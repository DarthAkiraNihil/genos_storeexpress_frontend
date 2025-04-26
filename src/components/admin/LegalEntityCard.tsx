import  React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';

import 'styles/items/ItemListCard.css'
import { LegalEntity } from 'models/user';
import Grid from "@mui/material/Grid";
import {Edit} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {BankCardFormModal} from "../order";


interface LegalEntityCardProps {
    legalEntity: LegalEntity;
    verified: boolean;
    verify: (id: string) => void;
    revoke: (id: string) => void;
}


export const LegalEntityCard: React.FC<LegalEntityCardProps> = ( { legalEntity, verified, verify, revoke })=> {
    return (
        <Card sx={{ display: 'flex', padding: '20px' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>

                    <Typography variant="h5" component="div">
                        { legalEntity.email }
                    </Typography>

                    <Box sx={{ display: 'flex' }}>

                        <Typography variant="h6" padding={2}>
                            ИНН: { legalEntity.inn }
                        </Typography>

                        <Typography variant="h6" padding={2}>
                            КПП: { legalEntity.kpp }
                        </Typography>

                    </Box>

                    <Box sx={{ display: 'flex' }}>

                        <Typography variant="h6" padding={2}>
                            Физический адрес: { legalEntity.physical_address }
                        </Typography>

                        <Typography variant="h6" padding={2}>
                            Юридический адрес: { legalEntity.legal_address }
                        </Typography>

                    </Box>

                    <Grid container spacing={2}>

                        {
                            verified ? (
                                <Grid size={12}>
                                    <Button variant="contained" color="error" fullWidth startIcon={<Edit />} onClick={() => {
                                        revoke(legalEntity.id);
                                    }}>
                                        Отозвать подтверждение
                                    </Button>
                                </Grid>
                            ) : (
                                <>
                                    <Grid size={6}>
                                        <Button variant="contained" color="primary" fullWidth startIcon={<Edit />} onClick={() => {
                                            verify(legalEntity.id);
                                        }}>
                                            Подтвердить
                                        </Button>
                                    </Grid>
                                    <Grid size={6}>
                                        <Button variant="contained" color="error" fullWidth startIcon={<Edit />} onClick={() => {
                                            revoke(legalEntity.id);
                                        }}>
                                            Отклонить
                                        </Button>
                                    </Grid>
                                </>
                            )
                        }

                    </Grid>

                </CardContent>
            </Box>

        </Card>
    );
}