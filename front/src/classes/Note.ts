import { User, userConverter } from "./User";

export class Note {
    _id?: string;
    author: User;
    title?: string;
    note: string;

    constructor(author: User, name: string, note: string, _id?: string, title?: string) {
        this.author = author;
        this.note = note;
        this.title = title;
        this._id = _id;
    }
}

export const noteConverter = {
    toJSON: (note: Note) => {
        return {
            _id: note._id,
            author: userConverter.toJSON(note.author),
            title: note.title,
            note: note.note
        }
    },
    toObject: (json: any) => {
        return new Note(
            userConverter.toObject(json.author),
            json.note,
            json.title,
            json._id
        );
    }
}