import { Document } from "mongoose";
import { Role } from "../../utils/utils";
import { AuthToken } from "./AuthToken";
import { Image } from "./Image";
import { Note } from "./Note";

export interface User extends Document {
    email: string,
    password: string,
    role: Role,

    tokens: AuthToken[],

    profile: {
        name: string
    },

    comparePassword(password: string, callback: (err: any, isMatch: boolean) => void): void
}