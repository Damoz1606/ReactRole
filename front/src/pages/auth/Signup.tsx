import { AccountCircleOutlined } from '@mui/icons-material';
import { ButtonBase, Card, CardContent, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { PRIMARY } from '../../style/color';
import { ICON_SIZE, theme } from '../../style/theme';

const TITLE_PAGE = "Sign up"

function Signup() {
    return <>
        <Card elevation={0} sx={{ width: "500px" }}>
            <CardContent>
                <div style={{ ...theme.container, ...theme.column, ...theme.center, height: '500px' }}>
                    <div style={{ ...theme.column, ...theme.center, marginBottom: '1rem' }}>
                        <AccountCircleOutlined style={{ color: PRIMARY.MAIN, width: ICON_SIZE, height: ICON_SIZE }} />
                        <Typography variant='h5' color={PRIMARY.MAIN} style={{ textTransform: 'uppercase' }}>{TITLE_PAGE}</Typography>
                    </div>
                    <form style={theme.column}>
                        <input type="email" name="email" id="email" style={theme.input} placeholder="Email" required />
                        <input type="password" name="password" id="password" style={theme.input} placeholder="Password" required />
                        <input type="password" name="check" id="check" style={theme.input} placeholder="Confirm Password" required />
                        <ButtonBase type='submit' style={theme.button}>{TITLE_PAGE}</ButtonBase>
                    </form>
                    <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
                        You already have an account?<Link style={theme.link} to="/login">Login</Link>
                    </div>
                </div>
            </CardContent>
        </Card>

    </>;
}

export default Signup