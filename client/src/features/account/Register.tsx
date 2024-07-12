import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';

export default function Register() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm();

    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes("Password"))
                    setError("password", { message: error })
                else if (error.includes("Email"))
                    setError("email", { message: error })
                else if (error.includes("Username"))
                    setError("username", { message: error })
            })
        }
    }

    return (
        <Container component={Paper} maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4, mt: 20 }}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(data => agent.Account.register(data)
                    .then(() => {
                        toast.success("Registration successful - you can now login");
                        navigate("/login");
                    })
                    .catch(error => handleApiErrors(error)))}
                noValidate sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    {...register("username",
                        {
                            required: "Username is required",

                        })}
                    error={!!errors.username}
                    helperText={errors?.username?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    {...register("email", {
                        required: "Email is required",
                        pattern:
                        {
                            // eslint-disable-next-line no-useless-escape
                            value: /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
                            message: "Not a valid email address"
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        pattern:
                        {
                            // eslint-disable-next-line no-useless-escape
                            value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                            message: "password does not meet complexity requirements"
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors?.password?.message as string}
                />
                <LoadingButton
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to="/login"> {"Already have an account? Sign Up"} </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}