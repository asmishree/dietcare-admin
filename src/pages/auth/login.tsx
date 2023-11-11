import  { useState } from 'react';
import { TextField, FormControlLabel, Checkbox, Link, Button, Box, Grid } from '@mui/material';
import AuthLayout from '../../components/Auth/AuthLayout';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event:any) => {
    event.preventDefault();
    
    if (email === 'admin@admin.com' && password === 'admin') {
      const authToken = 'your-auth-token';
      localStorage.setItem('authToken', authToken);
      navigate('/');
      toast.success("Login Successful");
    } else {
      toast.error("Please check your credentials.");
    }
  };

  return (
    <AuthLayout title="Login">
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleLogin}>
        <TextField
          margin="normal"
          required
          fullWidth
          variant="filled"
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          variant="filled"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        >
          Login
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default Login;
