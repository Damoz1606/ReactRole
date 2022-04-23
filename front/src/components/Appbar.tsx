import React from 'react';
import { PRIMARY } from '../style/color';
import { ICON_SIZE, theme } from '../style/theme';
import { Link } from 'react-router-dom';
import { NavigationItem } from '../classes/NavigationItem';
import { Menu } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';

interface Props {
    items: NavigationItem[];
}

function Appbar(props: Props) {
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
        </div>
    </>
}

export default Appbar