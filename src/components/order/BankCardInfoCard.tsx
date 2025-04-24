import  React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { BankCard } from 'models/orders/BankCard';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import {Review} from "../../models/items";
import {ReviewFormModal} from "../items";
import {BankCardFormModal} from "./BankCardFormModal";


interface BankCardInfoCardProps {
    card: BankCard;
}


export const BankCardInfoCard: React.FC<BankCardInfoCardProps> = ({
    card
})=> {

    const [isFormOpen, setIsFormOpen] = React.useState(false);

    return (
        <Card sx={{ display: 'flex', padding: '20px' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>

                    <Typography variant="h5" component="div">
                        Банковская карта №{ card.id }
                    </Typography>

                    <Box sx={{ display: 'flex' }}>

                        <Typography variant="h6" padding={2}>
                            Номер: { card.number }
                        </Typography>

                        <Typography variant="h6" padding={2}>
                            Срок действия: {card.valid_thru_month} / {card.valid_thru_year}
                        </Typography>

                    </Box>

                    <Box sx={{ display: 'flex' }}>

                        <Typography variant="h6" padding={2}>
                            Владелец: { card.owner }
                        </Typography>

                        <Typography variant="h6" padding={2}>
                            СVC: {card.cvc}
                        </Typography>

                        <Typography variant="h6" padding={2}>
                            Банковская система: {card.bank_system}
                        </Typography>

                    </Box>

                    <Grid container spacing={2}>

                        <Grid size={6}>
                            <Button variant="contained" color="primary" fullWidth startIcon={<Edit />} onClick={() => {
                                setIsFormOpen(true);
                            }}>
                                Редактировать
                            </Button>
                        </Grid>

                        <Grid size={6}>
                            <Button variant="outlined" color="error" fullWidth startIcon={<DeleteIcon />}>
                                Удалить
                            </Button>
                        </Grid>

                        <BankCardFormModal card={card} edit={true} open={isFormOpen} onClose={
                            () => {
                                setIsFormOpen(false)
                            }
                        } />

                    </Grid>

                </CardContent>
            </Box>

        </Card>
    );
}