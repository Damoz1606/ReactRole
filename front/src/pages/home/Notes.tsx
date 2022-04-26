import { Add } from '@mui/icons-material';
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import { Note } from '../../classes/Note';
import ButtonIncrese from '../../components/ButtonIncrese';
import Float from '../../components/Float';
import NoteComponent from '../../components/Note';
import NoteForm from '../../components/NoteForm';
import { NoteManager } from '../../managers/NoteManager';
import { RoleGate } from '../../providers/PermissionGate';
import { getNotes } from '../../services/note.service';
import { theme } from '../../style/theme'
import { toastError, toastPromise } from '../../utils/toast-manager';
import { NOTE_MESSAGES, ROLE } from '../../utils/utils'

function Notes() {

  const [notes, setnotes] = useState<Note[]>([]);
  const [open, setopen] = useState<boolean>(false);

  useEffect(() => {
    getAllNotes();
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
      toastError(NOTE_MESSAGES.GETTING_ERROR);
    }
  }

  const handleSubmit = (note: Note) => {
    setnotes([...notes, note]);
    handleClose();
  }

  const handleDelete = (note: Note) => {
    setnotes(notes.filter(n => `${n._id}` !== `${note._id}`));
  }

  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);

  return <>
    <div style={{ ...theme.column, ...theme.center, width: '100%', height: '100%' }}>
      <Typography variant="h4">Notes</Typography>
      <div style={{ ...theme.spaceEvenly, ...theme.row, width: '100%', marginTop: '1rem', flexWrap: 'wrap' }}>
        {notes.map((note, index) => {
          return <>
            <NoteComponent
              note={note} key={index}
              onDelete={handleDelete} />
          </>
        })}
      </div>
      <RoleGate roles={[ROLE.admin, ROLE.author]}>
        <Float position='bottom-right'>
          <ButtonIncrese
            icon={<Add />}
            onClick={handleOpen}>
            <Typography variant="subtitle1">Add Note</Typography>
          </ButtonIncrese>
        </Float>
      </RoleGate>
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
          <NoteForm onSubmit={handleSubmit} />
        </Box>
      </Fade>
    </Modal>
  </>
}

export default Notes