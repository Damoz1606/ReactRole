import { NativeError } from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { User } from '../app/classes/User';
import userShema from '../app/schemas/user.schema';
import { NextFunction, Response } from 'express';

passport.serializeUser<any, any>((req, user, done) => done(undefined, user));

passport.deserializeUser((id, done) => {
    console.log(id)
    userShema.findById(id, (err: NativeError, user: User) => done(err, user));
});

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    userShema.findOne({ email: email.toLowerCase() }, (err: NativeError, user: User) => {
        if (err) { return done(err); }
        if (!user) { return done(undefined, false, { message: 'Incorrect email.' }); }
        user.comparePassword(password, (err: NativeError, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: 'Invalid password.' });
        });
    });
}));