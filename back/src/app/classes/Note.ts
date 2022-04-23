import { Document } from "mongoose";

export interface Note extends Document {
    _id?: string;
    author: string;
    title?: string;
    note: string;
}