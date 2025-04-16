import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useAuth } from 'context';
import { useNavigate} from "react-router-dom";
import React from 'react';

export const SignInForm: React.FC = () => {

    const { signIn } = useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const [error, setError] = React.useState<string>('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setError("")
        setLoading(true)

        try {
            await signIn(username, password)
            navigate("/")
        } catch (err) {
            setError("Вход не выполнен")
        } finally {
            setLoading(false)
        }
    }

    return  (
        <Box>
            <Typography variant="h6" component="h2" mb={3}>
                Вход в систему
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Имя пользователя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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

                    {error && <Typography color="error">{error}</Typography>}

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || username.length === 0 || !password.length}
                        endIcon={loading ? <CircularProgress size={20} /> : null}
                        fullWidth
                    >
                        {loading ? "Вход..." : "Войти"}
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}