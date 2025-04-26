import  React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import 'styles/items/ItemListCard.css'
import { LegalEntity } from 'models/user';
import Grid from "@mui/material/Grid";
import {Cancel, Check} from "@mui/icons-material";
import {ConfirmDialog} from "../common";


interface LegalEntityCardProps {
    legalEntity: LegalEntity;
    verified: boolean;
    verify: (id: string) => void;
    revoke: (id: string) => void;
}


export const LegalEntityCard: React.FC<LegalEntityCardProps> = ( { legalEntity, verified, verify, revoke })=> {

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

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
                                <>
                                    <Grid size={12}>
                                        <Button variant="contained" color="error" fullWidth startIcon={<Cancel />} onClick={() => {
                                            setIsDeleteDialogOpen(true)
                                        }}>
                                            Отозвать подтверждение
                                        </Button>
                                    </Grid>
                                    <ConfirmDialog
                                        onConfirm={() => {
                                            revoke(legalEntity.id)
                                            setIsDeleteDialogOpen(false);
                                        }}
                                        onClose={() => {
                                            setIsDeleteDialogOpen(false)
                                        }}
                                        open={isDeleteDialogOpen}
                                        title={"Вы уверены?"}
                                        confirmText={`Вы действительно хотите отозвать подтверждение для юридического лица ${legalEntity.email} (${legalEntity.id})?`} />
                                </>

                            ) : (
                                <>
                                    <Grid size={6}>
                                        <Button variant="contained" color="primary" fullWidth startIcon={<Check />} onClick={() => {
                                            verify(legalEntity.id);
                                        }}>
                                            Подтвердить
                                        </Button>
                                    </Grid>
                                    <Grid size={6}>
                                        <Button variant="contained" color="error" fullWidth startIcon={<Cancel />} onClick={() => {
                                            setIsDeleteDialogOpen(true);
                                        }}>
                                            Отклонить
                                        </Button>
                                    </Grid>
                                    <ConfirmDialog
                                        onConfirm={() => {
                                            revoke(legalEntity.id)
                                            setIsDeleteDialogOpen(false);
                                        }}
                                        onClose={() => {
                                            setIsDeleteDialogOpen(false)
                                        }}
                                        open={isDeleteDialogOpen}
                                        title={"Вы уверены?"}
                                        confirmText={`Вы действительно хотите отозвать подтверждение для юридического лица ${legalEntity.email} (${legalEntity.id})?`} />
                                </>
                            )
                        }

                    </Grid>

                </CardContent>
            </Box>

        </Card>
    );
}