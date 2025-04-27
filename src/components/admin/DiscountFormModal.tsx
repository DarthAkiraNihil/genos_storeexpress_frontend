import React, {useContext, useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, Modal, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import {DiscountContext, useAuth} from "../../context";
import { Discount } from 'models/orders';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {PickerValue} from "@mui/x-date-pickers/internals";
import {FieldChangeHandlerContext} from "@mui/x-date-pickers/modern/internals";
import {DateValidationError, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/ru';


interface DiscountFormModalProps {
    itemId: number;
    discount: Discount | null;
    open: boolean;
    edit: boolean;
    onClose: () => void;
}

export const DiscountFormModal: React.FC<DiscountFormModalProps> = ({itemId, discount, open, edit, onClose}) => {

    const { token } = useAuth();

    const [currentDiscount, setCurrentDiscount] = useState<Discount>(discount ? discount : {value: 0, ends_at: new Date(), id: 0});

    const [discountValue, setDiscountValue] = useState<string>("0");

    const [error, setError] = React.useState<string>('');
    const [loading, setLoading] = React.useState(false);

    const context = useContext(DiscountContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setError("")
        setLoading(true)

        try {
            if (edit) {
                await context?.edit(discount!.id, {...currentDiscount, value: parseFloat(discountValue)}, token!);
            } else {
                await context?.activate(itemId, {...currentDiscount, value: parseFloat(discountValue)}, token!);
            }
        } catch (err) {
            setError("Что-то пошло не так");
        } finally {
            setLoading(false);
            onClose();
        }
    }

    const onEndsAtChange = (value: PickerValue, context: FieldChangeHandlerContext<DateValidationError>) => {
        console.log(value)
        if (value) {
            setCurrentDiscount({...currentDiscount, ends_at: value.toDate()});
        }
    }

    if (!context) {
        return (
            <div>
                No context is available
            </div>
        );
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                p: 4,
            }}>
                <Typography id="modal-modal-title" variant="h6" component="h2" mb={3}>
                    {
                        edit ? "Редактирование скидки" : "Активация скидки"
                    }
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label="Величина скидки"
                                value={discountValue}
                                onChange={(e) => {
                                    setDiscountValue(e.target.value)
                                }}
                                required
                                fullWidth
                            />
                            <DatePicker label="Дата окончания скидки:" onChange={onEndsAtChange} />

                            {error && <Typography color="error">{error}</Typography>}

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                endIcon={loading ? <CircularProgress size={20} /> : null}
                                fullWidth
                            >
                                {edit ? loading ? "Применение изменений..." : "Применить изменения" : loading ? "Активация..." : "Активировать скидку" }
                            </Button>
                        </Stack>
                    </form>
                </LocalizationProvider>
            </Box>
        </Modal>
    )
}