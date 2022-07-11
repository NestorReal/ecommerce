import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme();

export default function SignIn(props) {
  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') === 'admin' && data.get('password') === 'test') {
      localStorage.setItem(
        'tk',
        '"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2NjMsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE2NTQ4MjUxNzUsImVtYWlsIjoiaGVsbG9Ac2Vuc2FpbWV0cmljcy5pbyIsIm9yaWdfaWF0IjoxNjU0ODEwNzc1LCJjb21wYW55X2lkIjo5ODd9.wMMyc5PFZ--FPUIus2aVjIzvYz1Fii6KpbyUk9CwLW4"',
      );
      props.history.push('/');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          style={{ marginTop: '50%' }}
        >
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
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
              label="Usuario"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
            >
              Inicia sesión
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

SignIn.propTypes = {
  history: PropTypes.object,
};
