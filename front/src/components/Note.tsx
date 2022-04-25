import { Card, CardContent, Typography, ButtonBase, Box, Modal, Fade, Backdrop } from '@mui/material'
import { Visibility, Close, Edit, Add } from '@mui/icons-material'
import React, { createRef, RefObject, useState } from 'react'
import { Note as NoteClass } from '../classes/Note'
import { deleteNote } from '../services/note.service';
import { theme } from '../style/theme';
import CardBackdrop from './CardBackdrop';
import { toastError, toastPromise } from '../utils/toast-manager';
import NoteForm from './NoteForm';
import { NOTE_MESSAGES } from '../utils/utils';

interface Props {
    note: NoteClass;
    onDelete?: (note: NoteClass) => void;
}

function Note(props: Props) {

    const [open, setopen] = useState<boolean>(false);
    const [note, setnote] = useState<NoteClass>(props.note);

    const container: RefObject<HTMLDivElement> = createRef();

    const handleOpen = () => setopen(true);
    const handleClose = () => setopen(false);

    const backdropContent = () => {
        return <>
            <ButtonBase style={{ borderRadius: '100%', padding: '0.5rem' }} onClick={handleOpen}><Visibility /></ButtonBase>
            <ButtonBase style={{ borderRadius: '100%', padding: '0.5rem' }} onClick={() => toastPromise({
                success: 'Note deleted successfully',
                pending: 'Deleting note',
                error: 'Error deleting note'
            }, handleDelete())}><Close /></ButtonBase>
        </>
    }

    const handleUpdate = (data: NoteClass) => {
        setnote(data);
        handleClose();
    }

    const handleDelete = async () => {
        try {
            await deleteNote(note._id as string);
            if (container.current) {
                container.current.style.transition = 'all 0.5s ease-in-out';
                container.current.style.transform = 'scale(0)';
            }
            setTimeout(() => {
                props.onDelete && props.onDelete(note);
            }, 500);
        } catch (error: any) {
            toastError(NOTE_MESSAGES.DELETE_ERROR);
        }
    }

    return <>
        <div ref={container}>
            <CardBackdrop backdropContent={backdropContent()}>
                <Typography variant="h5">{note.title}</Typography>
                <Typography variant="body1">{note.note}</Typography>
            </CardBackdrop>
        </div>
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
                    <NoteForm note={note} onSubmit={handleUpdate} />
                </Box>
            </Fade>
        </Modal>
    </>
}

export default Note