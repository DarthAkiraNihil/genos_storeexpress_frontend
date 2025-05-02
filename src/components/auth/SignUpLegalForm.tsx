import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import React from 'react';
import { SignUpData } from 'models/auth'
import {useNavigate} from "react-router";


interface SignUpLegalFormProps {
    signUp: (data: SignUpData) => Promise<any>,
}

export const SignUpLegalForm: React.FC<SignUpLegalFormProps> = ({ signUp }) => {

    const navigate = useNavigate()

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [repeatPassword, setRepeatPassword] = React.useState<string>('');

    const [inn, setInn] = React.useState<number>(0);
    const [kpp, setKpp] = React.useState<number>(0);

    const [physicalAddress, setPhysicalAddress] = React.useState<string>('');
    const [legalAddress, setLegalAddress] = React.useState<string>('');

    const [error, setError] = React.useState<string>('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setError("")
        setLoading(true)

        try {
            await signUp({
                email: email,
                password: password,
                user_type: "legal_entity",
                additional_data: {
                    inn: inn,
                    kpp: kpp,
                    physical_address: physicalAddress,
                    legal_address: legalAddress,
                }
            }).then((response) => {
                console.log(response)
                if (response.message === `Юридическое лицо ${email} было успешно создано. Ожидайте верификации`) {
                    alert(response.message);
                    navigate("/sign_in")
                }
            });
        } catch (err) {
            setError("Регистрация не выполнена")
        } finally {
            setLoading(false)
        }
    }

    return  (
        <Box>
            <Typography variant="h6" component="h2" mb={3}>
                Регистрация юридического лица
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Электронная почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Повторите пароль"
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        label="ИНН"
                        type={"number"}
                        value={inn}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setInn(parseInt(event.target.value, 10));
                        }}
                    />

                    <TextField
                        label="КПП"
                        type={"number"}
                        value={kpp}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setKpp(parseInt(event.target.value, 10));
                        }}
                    />

                    <TextField
                        label="Физический адрес"
                        value={physicalAddress}
                        onChange={(e) => setPhysicalAddress(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Юридический адрес"
                        value={legalAddress}
                        onChange={(e) => setLegalAddress(e.target.value)}
                        required
                        fullWidth
                    />


                    {error && <Typography color="error">{error}</Typography>}

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !email.length || !password.length || !repeatPassword.length || repeatPassword !== password || !physicalAddress.length || !legalAddress.length}
                        endIcon={loading ? <CircularProgress size={20} /> : null}
                        fullWidth
                    >
                        {loading ? "Регистрация..." : "Регистрация"}
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}