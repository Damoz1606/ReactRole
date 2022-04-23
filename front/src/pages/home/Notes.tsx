import { Add } from '@mui/icons-material';
import { Backdrop, Box, Card, CardContent, Fade, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Note } from '../../classes/Note';
import ButtonIncrese from '../../components/ButtonIncrese';
import Float from '../../components/Float';
import NoteComponent from '../../components/Note';
import NoteForm from '../../components/NoteForm';
import { theme } from '../../style/theme'
import { ROLE } from '../../utils/utils'

function Notes() {

  const [notes, setnotes] = useState<Note[]>([{
    _id: '1',
    title: 'Note 1',
    note: 'This is note 1',
    author: {
      _id: '1',
      email: '',
      role: ROLE.admin,
      profile: {
        name: 'John Doe',
      }
    },
  },
  {
    _id: '1',
    title: 'Note 1',
    note: 'This is note 1',
    author: {
      _id: '1',
      email: '',
      role: ROLE.admin,
      profile: {
        name: 'John Doe',
      }
    },
  },
  {
    _id: '1',
    title: 'Note 1',
    note: 'This is note 1',
    author: {
      _id: '1',
      email: '',
      role: ROLE.admin,
      profile: {
        name: 'John Doe',
      }
    },
  }, {
    _id: '1',
    title: 'Note 1',
    note: 'This is note 1',
    author: {
      _id: '1',
      email: '',
      role: ROLE.admin,
      profile: {
        name: 'John Doe',
      }
    },
  }]);

  const [open, setopen] = useState<boolean>(false);

  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);

  return <>
    <div style={{ ...theme.column, ...theme.center, width: '100%', height: '100%' }}>
      <Typography variant="h4">Notes</Typography>
      <div style={{ ...theme.spaceEvenly, ...theme.row, width: '100%', marginTop: '1rem', flexWrap: 'wrap' }}>
        {notes.map((note, index) => {
          return <>
            <NoteComponent note={note} />
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