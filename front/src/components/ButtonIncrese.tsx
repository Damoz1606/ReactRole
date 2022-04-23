import { ButtonBase, Typography } from '@mui/material';
import React, { createRef, RefObject, useEffect, useRef } from 'react'
import { theme } from '../style/theme';
import { PRIMARY } from '../style/color';

const BUTTON_SIZE = '40px';

type Props = {
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
}

function ButtonIncrese(props: Props) {

    const content: RefObject<HTMLDivElement> = createRef();
    const icon: RefObject<HTMLDivElement> = createRef();

    useEffect(() => {
        return () => { }
    }, []);

    const showContent = () => {
        if (content.current) {
            content.current.style.opacity = '1';
            content.current.style.transform = 'scaleX(1)';
        }
    }

    const rotateIcon = (flag: boolean) => {
        if (icon.current) (flag) ? icon.current.style.transform = 'rotate(0deg)' : icon.current.style.transform = 'rotate(90deg)';
    }

    const hideContent = () => {
        if (content.current) {
            content.current.style.opacity = '0';
            content.current.style.transform = 'scaleX(0)';
        }
    }

    return <>
        <div style={{ ...theme.row, ...theme.center }}>
            <div style={{ opacity: 0, transform: `scaleX(0)`, transformOrigin: 'right' }} ref={content}>
                <Typography variant='subtitle1' style={{ color: PRIMARY.MAIN }}>
                    {props.children}
                </Typography>
            </div>
            <div style={{ ...theme.center, position: 'relative', margin: '1rem' }}>
                <div ref={icon} style={{ transformOrigin: 'center' }}>
                    <ButtonBase style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: PRIMARY.MAIN,
                        color: PRIMARY.CONTRAST,
                        width: BUTTON_SIZE,
                        height: BUTTON_SIZE,
                        borderRadius: '100%',
                    }}
                        onClick={() => props.onClick && props.onClick()}
                        onMouseOver={() => { showContent(); rotateIcon(true) }}
                        onMouseOut={() => { hideContent(); rotateIcon(false) }}
                    >
                        {props.icon}
                    </ButtonBase>
                </div>
            </div>
        </div >
    </>
}

export default ButtonIncrese