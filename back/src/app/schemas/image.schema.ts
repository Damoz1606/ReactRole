import { Schema, model, Error } from 'mongoose';
import { Image } from '../classes/Image';

const schema = new Schema<Image>({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    image: {
        data: Buffer,
        contentType: String
    }
});

export default model<Image>("Image", schema);