import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useNavigate} from "react-router";
import React from 'react';
import { SignUpData } from 'models/auth'


interface SignUpIndividualFormProps {
    signUp: (data: SignUpData) => Promise<any>,
}

export const SignUpIndividualForm: React.FC<SignUpIndividualFormProps> = ({ signUp }) => {

    const navigate = useNavigate()

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [repeatPassword, setRepeatPassword] = React.useState<string>('');

    const [name, setName] = React.useState<string>('');
    const [surname, setSurname] = React.useState<string>('');
    const [phone, setPhone] = React.useState<string>('');

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
                user_type: "individual_entity",
                additional_data: {
                    name: name,
                    surname: surname,
                    phone_number: phone,
                }}).then((response) => {
                if (response.status === 200) {
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
                Регистрация физического лица
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
                        label="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Фамилия"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Номер телефона"
                        type={"number"}
                        value={phone}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setPhone(event.target.value)
                        }}
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

                    {error && <Typography color="error">{error}</Typography>}

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !email.length || !password.length || !repeatPassword.length || repeatPassword !== password || !phone.length || !name.length || !surname.length}
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