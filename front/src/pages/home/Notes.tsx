import { Add } from '@mui/icons-material';
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Note } from '../../classes/Note';
import ButtonIncrese from '../../components/ButtonIncrese';
import Float from '../../components/Float';
import NoteComponent from '../../components/Note';
import NoteForm from '../../components/NoteForm';
import { NoteManager } from '../../managers/NoteManager';
import { getNotes } from '../../services/note.service';
import { theme } from '../../style/theme'
import { toastPromise } from '../../utils/toast-manager';
import { NOTE_MESSAGES } from '../../utils/utils'

function Notes() {

  const [notes, setnotes] = useState<Note[]>([]);
  const [open, setopen] = useState<boolean>(false);

  useEffect(() => {
    toastPromise({
      success: NOTE_MESSAGES.GETTING_SUCCESS,
      pending: NOTE_MESSAGES.GETTING_PENDING,
      error: NOTE_MESSAGES.GETTING_ERROR
    }, getAllNotes());
    return () => { }
  }, [])


  const getAllNotes = async () => {
    if (NoteManager.getInstance().getNotes()) {
      setnotes(NoteManager.getInstance().getNotes() as Note[]);
      return;
    }
    try {
      const response = (await getNotes()).data;
      setnotes(response.notes);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);

  return <>
    <div style={{ ...theme.column, ...theme.center, width: '100%', height: '100%' }}>
      <Typography variant="h4">Notes</Typography>
      <div style={{ ...theme.spaceEvenly, ...theme.row, width: '100%', marginTop: '1rem', flexWrap: 'wrap' }}>
        {notes.map((note, index) => {
          return <>
            <NoteComponent note={note} key={index} />
          </>
        })}
      </div>
      <Float position='bottom-right'>
        <ButtonIncrese
          icon={<Add />}
          onClick={handleOpen}>
          <Typography variant="subtitle1">Add Note</Typography>
        </ButtonIncrese>
      </Float>
    </div>
    <Modal open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
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
          <NoteForm />
        </Box>
      </Fade>
    </Modal>
  </>
}

export default Notes