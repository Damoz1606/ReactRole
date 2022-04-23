import { ROLE } from "../utils/utils";

export class User {
    _id?: string;
    email: string;
    role: ROLE;
    profile: {
        name: string
    }

    constructor(email: string, role: ROLE, profile: { name: string }, _id?: string) {
        this.email = email;
        this.role = role;
        this.profile = profile;
        this._id = _id;
    }
}

export const userConverter = {
    toJSON: (user: User) => {
        return {
            email: user.email,
            role: user.role,
            profile: user.profile,
            _id: user._id
        }
    },
    toObject: (json: any) => {
        return new User(
            json.email,
            json.role,
            json.profile,
            json._id
        );
    }
}