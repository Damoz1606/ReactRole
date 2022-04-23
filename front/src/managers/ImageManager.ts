import { Image } from "../classes/Image";

export class ImageManager {
    private static instance: ImageManager;
    static getInstance(): ImageManager {
        if (!ImageManager.instance) {
            ImageManager.instance = new ImageManager();
        }
        return ImageManager.instance;
    }

    private images: Image[] = [];
    private constructor() {}

    getImages = (): Image[] => {
        return this.images;
    }

    setImages = (images: Image[]) => {
        this.images = images;
    }

    addImage = (image: Image) => {
        this.images.push(image);
    }

    removeImage = (image: Image) => {
        this.images = this.images.filter(img => `${img._id}` !== `${image._id}`);
    }
}