import { Card, CardContent } from '@mui/material';
import React, { createRef, RefObject, useEffect } from 'react'
import { theme } from '../style/theme';

type Props = {
    children: React.ReactNode;
    backdropContent: React.ReactNode;
}

function CardBackdrop(props: Props) {

    const backdrop: RefObject<HTMLDivElement> = createRef()

    useEffect(() => {
        return () => { }
    }, []);

    const activeBackdrop = () => {
        if (backdrop.current) backdrop.current.style.opacity = '1';
    }

    const diableBackdrop = () => {
        if (backdrop.current) backdrop.current.style.opacity = '0';
    }

    return <>
        <Card
            elevation={5}
            style={{
                margin: '0.5rem 0.25rem',
                cursor: 'pointer'
            }}
            onMouseEnter={activeBackdrop}
            onMouseLeave={diableBackdrop}>
            <CardContent
                style={{
                    display: 'flex',
                    position: 'relative',
                    width: '250px',
                    height: '150px',
                }}>
                <div style={{ margin: '1rem' }}>
                    {props.children}
                </div>
                <div className='backdrop' style={{ ...theme.center, opacity: 0 }} ref={backdrop}>
                    {props.backdropContent}
                </div>
            </CardContent>
        </Card>
    </>
}

export default CardBackdrop