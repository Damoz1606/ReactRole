import axios from "axios";
import { Note, noteConverter } from "../classes/Note";
import { SessionManager } from "../classes/SessionManager";
import { URI } from "../utils/utils";

export const getNotes = async () => {
    return await axios.get(`${URI}/notes`, {
        headers: {
            Authorization: SessionManager.getInstance().getToken()
        }
    });
}

export const postNote = async (note: Note) => {
    return await axios.post(`${URI}/notes`, noteConverter.toJSON(note), {
        headers: {
            Authorization: SessionManager.getInstance().getToken()
        }
    });
}

export const deleteNotes = async () => {
    return await axios.delete(`${URI}/notes`, {
        headers: {
            Authorization: SessionManager.getInstance().getToken()
        }
    });
}

export const getNote = async (id: string) => {
    return await axios.get(`${URI}/notes/${id}`, {
        headers: {
            Authorization: SessionManager.getInstance().getToken()
        }
    });
}

export const putNote = async (id: string, note: Note) => {
    return await axios.put(`${URI}/notes/${id}`, noteConverter.toJSON(note), {
        headers: {
            Authorization: SessionManager.getInstance().getToken()
        }
    });
}

export const deleteNote = async (id: string) => {
    return await axios.delete(`${URI}/notes/${id}`, {
        headers: {
            Authorization: SessionManager.getInstance().getToken()
        }
    });
}