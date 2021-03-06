import { Note } from "../classes/Note";

export class NoteManager {
    private static instance: NoteManager;
    static getInstance(): NoteManager {
        if (!NoteManager.instance) {
            NoteManager.instance = new NoteManager();
        }
        return NoteManager.instance;
    }

    private notes: Note[]|null = null;

    private constructor() {}

    getNotes = () => {
        return this.notes;
    }

    setNotes = (notes: Note[]) => {
        this.notes = notes;
    }

    addNote = (note: Note) => {
        this.notes && this.notes.push(note);
    }

    removeNote = (note: Note) => {
        if(!this.notes) return;
        this.notes = this.notes.filter(n => `${n._id}` !== `${note._id}`);
    }
}