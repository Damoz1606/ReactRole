import config from "../../config/config";
import sessionSchema from "../schemas/session.schema";

export const createSession = async (user: String) => {
    const session = await sessionSchema.create({ user: user, expires: new Date(config.EXPIRES) });
    return session._id;
}

export const sessionExists = async (id: string) => {
    const session = await sessionSchema.findOne({ _id: id });
    // const session = await sessionSchema.findOne({ user: user });
    return !!session;
}

export const getSession = async (id: string) => {
    try {
        const session = await sessionSchema.findOne({ _id: id })
            .populate("user");
        return session;
    } catch (error: any) {
        return null;
    }
}

export const destroySession = async (id: string) => {
    try {
        await sessionSchema.findByIdAndDelete(id)
        return true;
    } catch (error: any) {
        return false;
    }
}