import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import { setUser } from '../redux/userInfo/slice';
import { useDispatch } from 'react-redux';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isLoginButtonDisabled = !userName || !password;
  
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const creds = {
      userName,
      password,
    };

    try {
      const { data } = await userService.login(creds);
      dispatch(setUser(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        m: '0 auto',
        gap: '12px',
        textAlign: 'center',
        pt: '20px',
      }}
      onSubmit={onSubmit}
    >
      <Typography variant='h3' sx={{ mb: '12px' }}>Login</Typography>
      <TextField
        size="small"
        label="Username"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
      <TextField
        size="small"
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && (
        <Typography
          variant="p"
          sx={{ color: 'red'}}
        >
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        disabled={isLoginButtonDisabled}
      >
        Login
      </Button>
      <Box sx={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
        Don't have an account?
        <Box
          component={NavLink}
          to="/sign-in"
        >
          Sign in
        </Box>
      </Box>
    </Box>
  );
};
