import { Schema, model, Error } from 'mongoose';
import { Note } from '../classes/Note';

const schema = new Schema<Note>({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        required: false,
    },
    note: String
});

export default model<Note>("Note", schema);