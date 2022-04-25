import { ButtonBase, Card, CardContent, TextareaAutosize, Typography } from '@mui/material';
import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import { Note, noteConverter } from '../classes/Note';
import { postNote, putNote } from '../services/note.service';
import { BACKGROUND, PRIMARY } from '../style/color';
import { theme } from '../style/theme';
import { toastPromise } from '../utils/toast-manager';
import { NOTE_MESSAGES } from '../utils/utils';

const input = {
    padding: "0.5rem 1rem",
    margin: "0.5rem 0",
    border: 'none',
    background: BACKGROUND.DEFAULT,
}

type Props = {
    onSubmit?: (note: Note) => void;
    note?: Note;
}

function NoteForm(props: Props) {
    const [note, setNote] = React.useState<Note | any>();

    useEffect(() => {
        if (props.note) {
            setNote(props.note);
        }
        return () => { }
    }, [props.note]);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.note) {
            toastPromise({
                success: NOTE_MESSAGES.UPDATE_SUCCESS,
                pending: NOTE_MESSAGES.UPDATE_PENDING,
                error: NOTE_MESSAGES.UPDATE_ERROR 
            }, updateNote(note));
        } else {
            toastPromise({
                success: NOTE_MESSAGES.ADDING_SUCCESS,
                pending: NOTE_MESSAGES.ADDING_PENDING,
                error: NOTE_MESSAGES.ADDING_ERROR 
            }, createNote(note));
        }
    }

    const createNote = async (note: Note) => {
        try {
            const response = (await postNote(note)).data;
            props.onSubmit && props.onSubmit(noteConverter.toObject(response.note));
        } catch (error: any) {
            throw error;
        }
    }

    const updateNote = async (note: Note) => {
        try {
            const response = (await putNote(note._id as string, note)).data;
            props.onSubmit && props.onSubmit(noteConverter.toObject(response.note));
        } catch (error: any) {
            throw error;
        }
    }

    return <>
        <Card elevation={0}>
            <CardContent>
                <form onSubmit={handleSubmit} style={{ ...theme.container, ...theme.column }}>
                    <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                        <ButtonBase type='submit' style={{ width: 'auto', backgroundColor: '#FFF', color: PRIMARY.MAIN, padding: '0.5rem', borderRadius: '10px' }}>
                            <Typography variant='subtitle2'>
                                {note ? 'Update' : 'Create'}
                            </Typography>
                        </ButtonBase>
                    </div>
                    <input
                        type="text"
                        name="title"
                        style={{ ...input, fontSize: '1.5rem', fontWeight: 'bold' }}
                        value={note && note.title}
                        onChange={handleChange}
                        placeholder='Title' />
                    <textarea
                        style={{ ...input, resize: 'none', height: '10rem' }}
                        name="note"
                        placeholder='Note'
                        onChange={handleChange}
                        value={note && note.note} required />
                </form>
            </CardContent>
        </Card>
    </>
}

export default NoteForm