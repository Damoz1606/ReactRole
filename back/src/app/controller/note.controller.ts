import { Request, Response } from 'express';
import { Note } from '../classes/Note';
import noteSchema from '../schemas/note.schema';
import userSchema from '../schemas/user.schema';
import { getSession } from './session.controller';

export const getAll = async (req: Request, res: Response) => {
    try {
        const notes = await noteSchema.find({})
            .populate("author");
        return res.status(200).json({ success: true, notes: notes });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const postNote = async (req: Request, res: Response) => {
    try {
        const payload: any = req.params.payload;
        const data: Note = req.body;
        data.author = payload.user._id;
        const response = await noteSchema.create(data);
        if (response) {
            const note = await noteSchema.findOne({ _id: response._id })
                .populate("author");
            return res.status(200).json({ success: true, note: note });
        }
        return res.status(400).json({ success: false, message: "Something went wrong" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteAll = async (req: Request, res: Response) => {
    try {
        const response = await noteSchema.deleteMany({});
        if (response) {
            return res.status(200).json({ success: true, notes: [] });
        }
        return res.status(400).json({ success: false, message: "Something went wrong" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getNote = async (req: Request, res: Response) => {
    try {
        const note = await noteSchema.findOne({ _id: req.params.id }).populate("author");
        if (note) {
            return res.status(200).json({ success: true, note: note });
        }
        return res.status(400).json({ success: false, message: "Not found" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const putNote = async (req: Request, res: Response) => {
    try {
        const note: Note = req.body;
        const response = await noteSchema.findOneAndUpdate({ _id: req.params.id }, note, { new: true })
            .populate("author");
        if (response) {
            return res.status(200).json({ success: true, note: note });
        }
        return res.status(400).json({ success: false, message: "Something went wrong" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteNote = async (req: Request, res: Response) => {
    try {
        const response = await noteSchema.findOneAndDelete({ _id: req.params.id });
        if (response) {
            return res.status(200).json({ success: true });
        }
        return res.status(400).json({ success: false, message: "Something went wrong" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}