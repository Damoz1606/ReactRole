import { Close, Visibility } from '@mui/icons-material';
import { Box, ButtonBase, Fade, Modal, Typography } from '@mui/material'
import React, { CSSProperties, useEffect, useState } from 'react'
import { Image as ImageClass } from '../classes/Image';
import CardBackdrop from './CardBackdrop'
import ImageForm from './ImageForm';

const image: CSSProperties = {
    width: '100%',
    borderRadius: '5px',
}

interface Props {
    image: ImageClass;
}

function Image(props: Props) {

    const [open, setopen] = useState<boolean>(false);

    const handleOpen = () => setopen(true);
    const handleClose = () => setopen(false);

    useEffect(() => {
        return () => { }
    }, [])

    const backdropContent = () => {
        return <>
            <ButtonBase style={{ borderRadius: '100%', padding: '0.5rem' }} onClick={handleOpen}><Visibility /></ButtonBase>
            <ButtonBase style={{ borderRadius: '100%', padding: '0.5rem' }} onClick={handleDelete}><Close /></ButtonBase>
        </>
    }

    const handleDelete = () => {

    }

    return <>
        <CardBackdrop backdropContent={backdropContent()}>
            <img style={image} src={`data:${props.image.image.contentType};base64,${Buffer.from(props.image.image.data).toString('base64')}`} />
        </CardBackdrop>
        <Modal open={open}
            onClose={handleClose}
            closeAfterTransition>
            <Fade in={open}>
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '500px',
                    width: '100%',
                }}>
                    <ImageForm image={props.image} />
                </Box>
            </Fade>
        </Modal>
    </>
}

export default Image