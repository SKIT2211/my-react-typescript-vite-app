import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  styled,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from '../assets/logo.svg';
import { loginApi } from '../services/authentication';
import LoadingSpinner from '../components/LoadingSpinner';

const StyledLink = styled(Link)(() => ({
  color: '#0281b0',
  fontSize: '14px',
  textDecoration: 'none',
  '&:hover': {
    color: '#CB3066',
  },
}));

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateEmptyField = (text: string): boolean => text.trim() !== '';

  const handleOnChangeFormData = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: !validateEmptyField(value),
      }));
    } else if (name === 'password') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: !validateEmptyField(value),
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const passwordValid = validateEmptyField(formData.password);
    const emailValid = validateEmptyField(formData.email);
    setFormErrors({
      email: !emailValid,
      password: !passwordValid,
    });

    if (emailValid && passwordValid) {
      setIsLoading(true);
      const loggedInUser = await loginApi(formData);
      if (loggedInUser) {
        const roleData = loggedInUser?.roles[0];
        if (roleData) {
          navigate('/dashboard');
        }
      }
      setIsLoading(false);
    }
  };
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(to left, #CB3066, #16BFFD)',
      }}
    >
      <Container
        // component="main"
        // maxWidth="xs"
        sx={{
          maxHeight: {
            xs: '600px',
            md: '450px',
            lg: '500px',
            xl: '600px',
          },
          width: {
            xs: '450px',
          },
          overflow: 'auto',
          background: '#ffffff',
          borderRadius: '5px',
        }}
      >
        <Box
          sx={{
            pt: {
              xs: 4,
              md: 3,
              lg: 5,
              xl: 8,
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              m: 1,
              transition: 'transform 0.5s ease, box-shadow 0.5s ease',
              '&:hover': {
                transform: 'rotate(360deg)',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
              },
            }}
            src={Logo}
          />
          <Typography component="h1" variant="h5" color="#0281b0">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleOnChangeFormData}
              value={formData.email}
              error={formErrors.email}
              helperText={formErrors.email ? 'Email is required' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={handleOnChangeFormData}
              value={formData.password}
              error={formErrors.password}
              helperText={formErrors.password ? 'Password is required' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: {
                  xs: 2,
                  md: 2,
                  lg: 1.5,
                  xl: 3,
                },
                mb: {
                  xs: 2,
                  md: 1.5,
                  lg: 1.5,
                  xl: 2,
                },
                background: '#0281b0',
                '&:hover': {
                  background: '#ed5384',
                },
              }}
            >
              {isLoading ? <LoadingSpinner /> : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs>
                <StyledLink to="/login">Forgot password?</StyledLink>
              </Grid>
              <Grid item>
                <StyledLink to="/login">
                  Don't have an account? Sign Up
                </StyledLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            pt: {
              xs: 5,
              md: 6,
              lg: 8,
            },
            pb: {
              xs: 3,
              md: 3.5,
              lg: 4,
            },
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            my-react-typescript-vite-app {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SignIn;
