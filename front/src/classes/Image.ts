import { User, userConverter } from "./User";

export class Image {
    _id?: string;
    author?: User;
    name: string;
    image: {
        data: Buffer;
        contentType: string;
    };

    constructor(
        name: string, image: { data: Buffer, contentType: string, }, _id?: string, author?: User) {
        this.author = author;
        this.image = image;
        this.name = name;
        this._id = _id;
    }
}

export const imageConverter = {
    toJSON: (image: Image) => {
        return {
            _id: image._id,
            // author: userConverter.toJSON(image.author),
            name: image.name,
            image: {
                data: image.image.data,
                contentType: image.image.contentType
            }
        }
    },
    toObject: (json: any) => {
        return new Image(
            json.name,
            {
                data: json.image.data,
                contentType: json.image.contentType
            },
            json._id,
            json.author && userConverter.toObject(json.author),
        );
    }
}