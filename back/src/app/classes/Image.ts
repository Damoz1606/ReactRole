import { Document } from "mongoose";

export interface Image extends Document {
    _id?: string;
    author: string;
    image: {
        data: Buffer;
        contentType: string;
    };
    name: string;
}