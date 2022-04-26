import React from 'react';
import { PRIMARY } from '../style/color';
import { ICON_SIZE, theme } from '../style/theme';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavigationItem } from '../classes/NavigationItem';
import { LogoutOutlined, Menu } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';
import { SessionManager } from '../managers/SessionManager';
import { logout } from '../services/user.service';
import { toastPromise } from '../utils/toast-manager';
import { LOGOUT_MESSAGES } from '../utils/utils';
import { CSSProperties } from '@mui/styled-engine';

const appbar: any = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: ICON_SIZE * 2,
    height: '100vh',
    zIndex: 1000,
}

const innerContainer: any = {
    background: PRIMARY.MAIN,
    height: '100vh',
    width: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
}

const outerContainer: any = {
    height: '100vh',
    width: '90%',
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

interface Props {
    items: NavigationItem[];
}

function Appbar(props: Props) {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            SessionManager.getInstance().logout();
            navigate('/login');
        } catch (error) {
            throw error;
        }
    }

    return <>
        <div style={appbar}>
            <div style={{ position: 'relative' }}>
                <div style={innerContainer}></div>
                <div style={outerContainer}>
                    <div style={{ position: 'absolute', top: 0 }}>
                        <ButtonBase style={{ 
                            ...theme.link, 
                            width: ICON_SIZE, 
                            height: ICON_SIZE, 
                            color: PRIMARY.CONTRAST,
                            padding: '1rem',
                            borderRadius: '100%',
                            }}><Menu /></ButtonBase>
                    </div>
                    <span style={{
                        margin: '0 0.5rem',
                        padding: '0.5rem',
                        width: ICON_SIZE,
                        background: PRIMARY.MAIN,
                        height: '100%',
                    }} />
                    {props.items.map((item, index) => {
                        return <>
                            <NavLink
                                to={item.path}
                                style={({ isActive }) => ({
                                    margin: '0 0.5rem',
                                    padding: '0.5rem',
                                    width: ICON_SIZE,
                                    height: ICON_SIZE,
                                    backgroundColor: !isActive ? PRIMARY.MAIN : PRIMARY.CONTRAST,
                                    color: !isActive ? PRIMARY.CONTRAST : PRIMARY.MAIN,
                                    borderBottomLeftRadius: isActive ? '100px' : '0',
                                    borderTopLeftRadius: isActive ? '100px' : '0',
                                })}
                                key={index}>{item.icon}</NavLink>
                        </>
                    })}
                    <span style={{
                        margin: '0 0.75rem',
                        padding: '1.25rem',
                        height: '100%',
                        right: 0,
                        background: PRIMARY.MAIN,
                    }} />
                    <div style={{ position: 'absolute', bottom: 0 }}>
                        <ButtonBase style={{
                            width: ICON_SIZE, 
                            height: ICON_SIZE, 
                            color: PRIMARY.CONTRAST,
                            padding: '1rem',
                            borderRadius: '100%',
                        }}
                            onClick={() => toastPromise({
                                success: LOGOUT_MESSAGES.SUCCESS,
                                pending: LOGOUT_MESSAGES.PENDING,
                                error: LOGOUT_MESSAGES.ERROR
                            },
                                handleLogout())}
                        ><LogoutOutlined /></ButtonBase>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Appbar