import { ButtonBase, Card, CardContent, TextareaAutosize, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { Note } from '../classes/Note';
import { BACKGROUND, PRIMARY } from '../style/color';
import { theme } from '../style/theme';

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit && props.onSubmit(note);
    }

    return <>
        <Card elevation={0}>
            <CardContent>
                <form onSubmit={handleSubmit} style={{ ...theme.container, ...theme.column }}>
                    <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                        <ButtonBase style={{ width: 'auto', backgroundColor: '#FFF', color: PRIMARY.MAIN, padding: '0.5rem', borderRadius: '10px' }}>
                            <Typography variant='subtitle2'>
                                {props.note ? 'Update' : 'Create'}
                            </Typography>
                        </ButtonBase>
                    </div>
                    <input type="text" style={{ ...input, fontSize: '1.5rem', fontWeight: 'bold' }} value={props.note && props.note.title} placeholder='Title' />
                    <textarea
                        style={{ ...input, resize: 'none', height: '10rem' }}
                        placeholder='Note'
                        value={props.note && props.note.note} />
                </form>
            </CardContent>
        </Card>
    </>
}

export default NoteForm