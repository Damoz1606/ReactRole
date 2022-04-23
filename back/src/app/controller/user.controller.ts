import { NextFunction, Request, Response } from 'express';
import { User } from '../classes/User';
import userShema from '../schemas/user.schema';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { generateJWT } from '../../utils/token';
import { createSession, destroySession } from './session.controller';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, async (err: Error, user: User, info: IVerifyOptions) => {
        if (err) {
            return res.status(500).json({ message: 'Something went wrong', error: err });
        }
        if (!user) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        const session = await createSession(user._id);
        const token = generateJWT({
            email: user.email,
            sessionID: session,
        });
        return res.json({ success: true, user, token });
    })(req, res, next);
}

export const signup = async (req: Request, res: Response) => {
    const user: User = req.body;
    try {
        const exists = await userShema.findOne({ email: user.email });
        if (exists) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            const newUser = new userShema(user);
            await newUser.save();
            return res.status(201).json({ message: "User created" });
        }
    } catch (error: any) {
        return res.status(500).json({ message: "Error", error: error.message });
    }
}

export const logout = (req: Request, res: Response) => {
    try {
        const payload: any = req.params.payload;
        destroySession(payload.sessionID);
        return res.status(200).json({ success: true, message: "Logged out" });
    } catch (error: any) {
        return res.status(500).json({ message: "Error", error: error.message });
    }
}