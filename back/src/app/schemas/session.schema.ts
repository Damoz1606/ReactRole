import { Schema, model, Error } from 'mongoose';
import { Session } from '../classes/Session';

const schema = new Schema<Session>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    expires: { type: Date, required: true },
});
export default model<Session>("Session", schema);