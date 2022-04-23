import { Schema, model, Error } from 'mongoose';
import { User } from '../classes/User';
import bcrypt from "bcrypt";

const schema = new Schema<User>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'author', 'user'] },
    profile: {
        name: { type: String, required: true },
    },
}, {
    timestamps: true,
    versionKey: false
});

schema.pre("save", function (next) {
    const user: any = this;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

schema.methods.comparePassword = function (password: string, callback) {
    bcrypt.compare(password, this.password, (err: Error | undefined, isMatch: boolean) => {
        callback(err, isMatch);
    });
}

export default model<User>("User", schema);