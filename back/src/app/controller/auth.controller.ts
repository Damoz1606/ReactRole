import { NextFunction, Request, Response } from "express";
import { decodeJWT } from "../../utils/token";
import { getSession, sessionExists } from "./session.controller";

const getHeaderAuthorization = (req: Request) => {
    return req.headers.authorization?.split(" ")[1];
}

export const isAuthenticated = async (req: Request, res: Response | any, next: NextFunction) => {
    const token = getHeaderAuthorization(req);
    if (token) {
        const decoded: any = decodeJWT(token);
        const isLogged = await getSession(decoded.data.sessionID);
        if (!!isLogged) {
            const payload: any = { sessionID: decoded.data.sessionID, user: isLogged.user };
            req.params.payload = payload;
            return next();
        }
    }
    return res.status(401).json({ message: 'Unauthorized' });
}

export const isAuthorized = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const roles = role.split("|");
        const payload: any = req.params.payload;
        if (roles.includes(payload.user.role)) {
            return next();
        }
        return res.status(403).json({ message: 'Unauthorized' });
    }
}