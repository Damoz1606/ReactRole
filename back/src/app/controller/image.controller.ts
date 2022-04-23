import { Request, Response } from 'express';
import { Image } from '../classes/Image';
import imageSchema from '../schemas/image.schema';
import noteSchema from '../schemas/note.schema';
import userSchema from '../schemas/user.schema';

export const getAll = async (req: Request, res: Response) => {
    try {
        const images = await imageSchema.find({})
            .populate("author");
        return res.status(200).json({ success: true, images });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}
export const postImage = async (req: Request, res: Response) => {
    try {
        const payload: any = req.params.payload;
        if (req.file) {
            const response = await imageSchema.create({
                author: payload.user._id,
                name: req.file.originalname,
                image: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                }
            });
            if (response) {
                const image = await imageSchema.findOne({ _id: response._id })
                    .populate("author");
                return res.status(200).json({ success: true, image: image });
            }
            return res.status(400).json({ success: false, message: "Something went wrong" });
        }
        return res.status(500).json({ success: false, message: "Something went wrong" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}
export const deleteAll = async (req: Request, res: Response) => {
    try {
        const response = await imageSchema.deleteMany({});
        if (response) {
            return res.status(200).json({ success: true, images: [] });
        }
        return res.status(400).json({ success: false, message: "Something went wrong" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}
export const getImage = async (req: Request, res: Response) => {
    try {
        const image = await imageSchema.findOne({ _id: req.params.id })
            .populate("author");;
        if (image) {
            return res.status(200).json({ success: true, image });
        }
        return res.status(400).json({ success: false, message: "Not found" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}
export const putImage = async (req: Request, res: Response) => {
    try {
        if (req.file) {
            const image = {
                name: req.file.originalname,
                image: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                }
            }
            const response = await imageSchema.findOneAndUpdate({ _id: req.params.id }, image, { new: true })
                .populate("author");
            if (response) {
                return res.status(200).json({ success: true, images: image });
            }
            return res.status(400).json({ success: false, message: "Something went wrong" });
        }
        return res.status(500).json({ success: false, message: "Something went wrong" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}
export const deleteImage = async (req: Request, res: Response) => {
    try {
        const response = await imageSchema.findOneAndDelete({ _id: req.params.id });
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