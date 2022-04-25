import { User, userConverter } from "./User";

export class Note {
    _id?: string;
    title?: string;
    author?: User;
    note: string;

    constructor(note: string, _id?: string, title?: string, author?: User) {
        this.note = note;
        this.title = title;
        this._id = _id;
        this.author = author;
    }
}

export const noteConverter = {
    toJSON: (note: Note) => {
        return {
            _id: note._id,
            // author: userConverter.toJSON(note.author),
            title: note.title,
            note: note.note
        }
    },
    toObject: (json: any) => {
        return new Note(
            json.note,
            json._id,
            json.title,
            json.author && userConverter.toObject(json.author),
        );
    }
}