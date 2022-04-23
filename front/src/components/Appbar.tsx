import React from 'react';
import { PRIMARY } from '../style/color';
import { ICON_SIZE, theme } from '../style/theme';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationItem } from '../classes/NavigationItem';
import { LogoutOutlined, Menu } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';
import { SessionManager } from '../managers/SessionManager';
import { logout } from '../services/user.service';
import { toastPromise } from '../utils/toast-manager';
import { LOGOUT_MESSAGES } from '../utils/utils';

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
        <div style={{ ...theme.container, ...theme.center, ...theme.column, backgroundColor: PRIMARY.MAIN, color: PRIMARY.CONTRAST }}>
            <div style={{ position: 'absolute', top: 0 }}>
                <ButtonBase style={{ ...theme.link, width: ICON_SIZE, height: ICON_SIZE, color: PRIMARY.CONTRAST }} disableRipple><Menu /></ButtonBase>
            </div>
            {props.items.map((item, index) => {
                return <>
                    <Link to={item.path} style={{ width: ICON_SIZE, height: ICON_SIZE, color: PRIMARY.CONTRAST }}>{item.icon}</Link>
                </>
            })}
            <div style={{ position: 'absolute', bottom: 0 }}>
                <ButtonBase style={{
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                    color: PRIMARY.CONTRAST,
                    borderTopLeftRadius: '100px',
                    borderBottomLeftRadius: '100px',
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
    </>
}

export default Appbar