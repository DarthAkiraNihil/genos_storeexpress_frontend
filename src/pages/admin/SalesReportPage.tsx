import React, {useContext} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ru';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import {ReportContext, useAuth} from "../../context";
import {FieldChangeHandlerContext} from "@mui/x-date-pickers/modern/internals";
import {DateValidationError} from "@mui/x-date-pickers";
import {PickerValue} from "@mui/x-date-pickers/internals";
import Grid from '@mui/material/Grid';

export const SalesReportPage = () => {

    const { token } = useAuth();

    const [error, setError] = React.useState<string>("");
    const [loading, setLoading] = React.useState(false);

    const [startDate, setStartDate] = React.useState<Date>();
    const [endDate, setEndDate] = React.useState<Date>();

    const context = useContext(ReportContext);

    const onStartDateChanged = (value: PickerValue, context: FieldChangeHandlerContext<DateValidationError>) => {
        console.log(value)
        if (value) {
            setStartDate(value.toDate())
        }
    }

    const onEndDateChanged = (value: PickerValue, context: FieldChangeHandlerContext<DateValidationError>) => {
        console.log(value)
        if (value) {
            setEndDate(value.toDate())
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setError("")
        setLoading(true)

        try {
            await context?.generateSalesReport(token!, startDate!, endDate!);
        } catch (err) {
            setError("Что-то пошло не так")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '80vh' }}
        >
            <Grid size={3}>
                <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <Typography variant="h6" component="h2" mb={3}>
                                    Генерация отчёта по продажам
                                </Typography>
                                <DatePicker label="Начало периода продаж:" onChange={onStartDateChanged} />
                                <DatePicker label="Конец периода продаж:" onChange={onEndDateChanged} />

                                {error && <Typography color="error">{error}</Typography>}

                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading || !startDate || !endDate}
                                    endIcon={loading ? <CircularProgress size={20} /> : null}
                                    fullWidth
                                >
                                    {loading ? "Генерация..." : "Сгенерировать!"}
                                </Button>
                            </Stack>
                        </form>
                    </LocalizationProvider>
                </Box>
            </Grid>
        </Grid>

    )

}