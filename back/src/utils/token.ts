import jwt from "jsonwebtoken";
import config from "../config/config";

export const generateJWT = (data: any) => {
    return jwt.sign({
        data,
        exp: config.EXPIRES
    },
        config.TOKEN_SECRET);
}

export const decodeJWT = (token: string) => {
    return jwt.verify(token, config.TOKEN_SECRET);
}