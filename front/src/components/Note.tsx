import { Card, CardContent, Typography, ButtonBase, Box, Modal, Fade, Backdrop } from '@mui/material'
import { Visibility, Close, Edit, Add } from '@mui/icons-material'
import React, { useState } from 'react'
import { Note as NoteClass } from '../classes/Note'
import { theme } from '../style/theme';
import CardBackdrop from './CardBackdrop';
import NoteForm from './NoteForm';

interface Props {
    note: NoteClass;
}

function Note(props: Props) {

    const [open, setopen] = useState<boolean>(false);

    const handleOpen = () => setopen(true);
    const handleClose = () => setopen(false);


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
            <Typography variant="h5">{props.note.title}</Typography>
            <Typography variant="body1">{props.note.note}</Typography>
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
                    <NoteForm note={props.note} />
                </Box>
            </Fade>
        </Modal>
    </>
}

export default Note