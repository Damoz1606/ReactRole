import { AccountCircleOutlined } from '@mui/icons-material';
import { ButtonBase, Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SessionManager } from '../../classes/SessionManager';
import { login } from '../../services/user.service';
import { PRIMARY } from '../../style/color';
import { ICON_SIZE, theme } from '../../style/theme';
import { toastPromise } from '../../utils/toast-manager';
import { LOGIN_MESSAGES } from '../../utils/utils';

const TITLE_PAGE = "Log in"

function Login() {

  const [loginState, setloginState] = useState<any>({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toastPromise({
      success: LOGIN_MESSAGES.SUCCESS,
      pending: LOGIN_MESSAGES.PENDING,
      error: LOGIN_MESSAGES.ERROR,
    }, handleAccess());
  }

  const handleAccess = async () => {
    const response = (await login(loginState)).data;
    SessionManager.getInstance().setUser(response.user);
    SessionManager.getInstance().setToken(response.token);
    navigate('/home');
    return true;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setloginState({ ...loginState, [event.target.name]: event.target.value });
  }

  return <>
    <Card elevation={0} sx={{ width: "500px" }}>
      <CardContent>
        <div style={{ ...theme.container, ...theme.column, ...theme.center, height: '500px' }}>
          <div style={{ ...theme.column, ...theme.center, marginBottom: '1rem' }}>
            <AccountCircleOutlined style={{ color: PRIMARY.MAIN, width: ICON_SIZE, height: ICON_SIZE }} />
            <Typography variant='h5' color={PRIMARY.MAIN} style={{ textTransform: 'uppercase' }}>{TITLE_PAGE}</Typography>
          </div>
          <form style={theme.column} onSubmit={handleSubmit} >
            <input type="email" name="email" id="email" style={theme.input} placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" id="password" style={theme.input} placeholder="Password" onChange={handleChange} required />
            <ButtonBase type='submit' style={theme.button}>{TITLE_PAGE}</ButtonBase>
          </form>
          <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
            You don't have an account?<Link style={theme.link} to="/signup">Sign up</Link>
          </div>
        </div>
      </CardContent>
    </Card>

  </>;
}

export default Login