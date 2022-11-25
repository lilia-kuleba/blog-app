import { useState } from 'react';
import { userService } from '../services/userService';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userInfo/slice';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [realName, setRealName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [secretWord, setSecretWord] = useState('');
  const [sex, setSex] = useState('female');
  const [isAdmin, setIsAdmin] = useState(false);

  const [errors, setErrors] = useState({});

  const isSignInButtonDisabled =
    !realName ||
    !userName ||
    !password ||
    isAdmin && !secretWord;

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      realName,
      userName,
      secretWord,
      sex,
      password,
    };

    try {
      setErrors({});
      const { data } = await userService.registerUser(newUser);
      dispatch(setUser(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <Box
      component="form"
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
      <Typography variant="h3" sx={{ mb: '12px' }}>Sign Up</Typography>
      <FormLabel sx={{ textAlign: 'start' }}>Gender</FormLabel>
      <RadioGroup
        row
        value={sex}
        onChange={event => setSex(event.target.value)}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
      <TextField
        size="small"
        label="Real Name"
        value={realName}
        onChange={e => setRealName(e.target.value)}
        error={errors.realName}
        helperText={errors.realName}
      />
      <TextField
        size="small"
        label="Username"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        error={errors.userName}
        helperText={errors.userName}
      />
      <TextField
        size="small"
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={errors.password}
        helperText={errors.password}
      />
      <FormControlLabel
        control={
          <Checkbox
            value={isAdmin}
            onChange={() => setIsAdmin(prevState => !prevState)}
          />
      }
        label="Admin role"
      />
      <TextField
        size="small"
        label="Secret word"
        value={secretWord}
        type="password"
        onChange={e => setSecretWord(e.target.value)}
        disabled={!isAdmin}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isSignInButtonDisabled}
      >
        Sign In
      </Button>
      <Box sx={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
        Already have an account?
        <Box
          component={NavLink}
          to="/login"
        >
          Login
        </Box>
      </Box>
    </Box>
  );
};